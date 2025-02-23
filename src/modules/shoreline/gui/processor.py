from typing import Dict, Optional
from PyQt6.QtCore import QObject, pyqtSignal, pyqtSlot
import ee
import json

from .gee_interface import GEEInterface
from ..detector import ShorelineDetector
from ..exceptions import ProcessingError, DataLoadError

class ShorelineProcessor(QObject):
    """Worker class for processing shoreline detection tasks"""

    # Signal definitions
    progress = pyqtSignal(int)  # Progress percentage
    status = pyqtSignal(str)    # Status message
    error = pyqtSignal(str)     # Error message
    finished = pyqtSignal(dict) # Results

    def __init__(self, config: dict, geometry: dict):
        """Initialize processor

        Args:
            config: Shoreline detection configuration
            geometry: GeoJSON geometry of area of interest
        """
        super().__init__()
        self.config = config
        self.geometry = geometry
        self.gee = GEEInterface()
        self.detector = ShorelineDetector(config)

    @pyqtSlot()
    def process(self):
        """Main processing method to run in separate thread"""
        try:
            self.status.emit("Initializing...")
            self.progress.emit(0)

            # Convert geometry to EE format
            ee_geometry = self.gee.geometry_from_geojson(self.geometry)

            # Fetch satellite data
            self.status.emit("Fetching satellite data...")
            self.progress.emit(20)

            bands = self.gee.get_satellite_data(
                geometry=ee_geometry,
                start_date=self.config['satellite']['date_range']['start'],
                end_date=self.config['satellite']['date_range']['end'],
                source=self.config['satellite']['source'],
                cloud_cover=self.config['satellite'].get('cloud_cover', 20)
            )

            # Process shoreline detection
            self.status.emit("Detecting shoreline...")
            self.progress.emit(50)

            metadata = {
                'satellite': self.config['satellite']['source'],
                'pixel_size': 10.0 if self.config['satellite']['source'] in ['sentinel1', 'sentinel2'] else 30.0,
                'acquisition_date': self.config['satellite']['date_range']['end']
            }

            shoreline = self.detector.detect_from_satellite(bands, metadata)

            # Compute statistics
            self.status.emit("Computing statistics...")
            self.progress.emit(80)

            stats = self._compute_statistics(shoreline)

            # Prepare results
            self.status.emit("Finalizing results...")
            self.progress.emit(90)

            results = {
                'shoreline': shoreline,
                'statistics': stats,
                'metadata': metadata
            }

            self.progress.emit(100)
            self.status.emit("Processing complete")
            self.finished.emit(results)

        except DataLoadError as e:
            self.error.emit(f"Data loading error: {str(e)}")
        except ProcessingError as e:
            self.error.emit(f"Processing error: {str(e)}")
        except Exception as e:
            self.error.emit(f"Unexpected error: {str(e)}")

    def _compute_statistics(self, shoreline: dict) -> dict:
        """Compute statistics from shoreline result

        Args:
            shoreline: GeoJSON shoreline feature

        Returns:
            Dictionary of computed statistics
        """
        stats = {
            'length_km': shoreline['properties']['length'] / 1000,
            'segments': shoreline['properties']['segments']
        }

        # Add additional statistics as needed

        return stats

    @staticmethod
    def format_results(results: dict) -> str:
        """Format results for display

        Args:
            results: Dictionary of processing results

        Returns:
            Formatted string for display
        """
        stats = results['statistics']
        metadata = results['metadata']

        return (
            f"Shoreline Detection Results\n"
            f"-------------------------\n"
            f"Total Length: {stats['length_km']:.2f} km\n"
            f"Segments: {stats['segments']}\n"
            f"\n"
            f"Processing Details:\n"
            f"Satellite: {metadata['satellite'].upper()}\n"
            f"Resolution: {metadata['pixel_size']} m\n"
            f"Date: {metadata['acquisition_date']}\n"
        )
