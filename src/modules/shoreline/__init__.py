"""Shoreline detection module for CVIc

This module provides functionality for automated shoreline detection from
satellite imagery. It supports multiple satellite sources (Sentinel-1 SAR,
Sentinel-2, and Landsat) and various water detection methods.

Example:
    Basic usage:

    ```python
    from coastal_erosion_accretion.shoreline import ShorelineDetector, ShorelineConfig

    # Configure detector
    config = ShorelineConfig(
        satellite={
            "source": "sentinel2",
            "water_index": "MNDWI",
            "cloud_cover": 20,
            "date_range": {
                "start": "2024-01-01",
                "end": "2024-02-22"
            }
        },
        processing={
            "water_detection": {
                "threshold_method": "otsu",
                "smooth_kernel": 3,
                "min_area": 100
            },
            "vectorization": {
                "simplify_tolerance": 10,
                "smooth_factor": 0.5
            }
        },
        output={
            "format": "geojson",
            "crs": "EPSG:4326",
            "attributes": ["length", "area"]
        }
    )

    # Create detector
    detector = ShorelineDetector(config)

    # Process imagery
    shoreline = detector.detect_from_satellite(bands, metadata)
    ```
"""

from .detector import ShorelineDetector
from .config import (
    ShorelineConfig,
    SatelliteConfig,
    WaterDetectionConfig,
    VectorizationConfig,
    OutputConfig
)
from .exceptions import (
    ShorelineError,
    ValidationError,
    ProcessingError,
    ExportError,
    DataLoadError
)

__version__ = "0.1.0"
__author__ = "CVIc Development Team"
__all__ = [
    "ShorelineDetector",
    "ShorelineConfig",
    "SatelliteConfig",
    "WaterDetectionConfig",
    "VectorizationConfig",
    "OutputConfig",
    "ShorelineError",
    "ValidationError",
    "ProcessingError",
    "ExportError",
    "DataLoadError"
]
