from typing import Dict, Optional, Union
import numpy as np
from datetime import datetime

from .config import ShorelineConfig
from .water_detection import WaterDetector
from .vectorizer import Vectorizer
from .exceptions import ValidationError, ProcessingError

class ShorelineDetector:
    """Main class for shoreline detection and extraction"""

    def __init__(self, config: Union[Dict, ShorelineConfig]):
        """Initialize shoreline detector with configuration

        Args:
            config: Configuration dictionary or ShorelineConfig object
        """
        # Convert dict to ShorelineConfig if needed
        self.config = config if isinstance(config, ShorelineConfig) else ShorelineConfig(**config)

        # Initialize sub-components
        self.water_detector = WaterDetector(self.config.processing['water_detection'].dict())
        self.vectorizer = Vectorizer(self.config.processing['vectorization'].dict())

        # Processing state
        self.water_mask = None
        self.ocean_mask = None
        self.shoreline = None

    def detect_from_satellite(self, bands: Dict[str, np.ndarray], metadata: Optional[Dict] = None) -> Dict:
        """Detect shoreline from satellite imagery

        Args:
            bands: Dictionary of satellite bands as numpy arrays
            metadata: Optional metadata about the imagery

        Returns:
            Dictionary containing shoreline vectors in GeoJSON format
        """
        try:
            # Extract metadata or use defaults
            pixel_size = metadata.get('pixel_size', 30.0) if metadata else 30.0
            satellite = metadata.get('satellite', self.config.satellite.source)

            # Detect water bodies
            self.water_mask = self._detect_water(bands, satellite)

            # Extract ocean
            self.ocean_mask = self.vectorizer.extract_ocean_water(
                self.water_mask,
                boundary_width=max(1, int(100 / pixel_size))  # At least 100m boundary
            )

            # Vectorize shoreline
            self.shoreline = self.vectorizer.vectorize(self.ocean_mask, pixel_size)

            # Add metadata to output
            self.shoreline['properties'].update({
                'timestamp': datetime.now().isoformat(),
                'satellite': satellite,
                'pixel_size': pixel_size,
                'water_detection_method': (
                    self.config.satellite.water_index
                    if satellite in ['sentinel2', 'landsat']
                    else 'SAR'
                )
            })

            if metadata:
                self.shoreline['properties']['source_metadata'] = metadata

            return self.shoreline

        except Exception as e:
            raise ProcessingError(f"Error in shoreline detection: {str(e)}")

    def _detect_water(self, bands: Dict[str, np.ndarray], satellite: str) -> np.ndarray:
        """Detect water bodies using appropriate method based on satellite

        Args:
            bands: Dictionary of satellite bands
            satellite: Satellite identifier

        Returns:
            Binary water mask
        """
        if satellite == 'sentinel1':
            if 'VV' not in bands:
                raise ValidationError("VV band required for Sentinel-1 water detection")
            return self.water_detector.detect_from_sar(
                bands['VV'],
                bands.get('VH')  # VH band is optional
            )
        elif satellite in ['sentinel2', 'landsat']:
            if not self.config.satellite.water_index:
                raise ValidationError("Water index must be specified for optical imagery")
            return self.water_detector.detect_from_optical(
                bands,
                method=self.config.satellite.water_index
            )
        else:
            raise ValidationError(f"Unsupported satellite: {satellite}")

    def export_result(self, output_path: str) -> None:
        """Export shoreline detection result

        Args:
            output_path: Path to save the output

        Raises:
            ValidationError: If no shoreline has been detected yet
        """
        if self.shoreline is None:
            raise ValidationError("No shoreline detected. Run detect_from_satellite first.")

        # TODO: Implement export functionality based on file extension
        # This will be implemented in a future update to support various
        # export formats (GeoJSON, Shapefile, etc.)
        raise NotImplementedError("Export functionality coming soon")

    def get_water_mask(self) -> Optional[np.ndarray]:
        """Get the current water mask

        Returns:
            Binary water mask or None if not yet processed
        """
        return self.water_mask

    def get_ocean_mask(self) -> Optional[np.ndarray]:
        """Get the current ocean mask

        Returns:
            Binary ocean mask or None if not yet processed
        """
        return self.ocean_mask
