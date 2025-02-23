"""Graphical User Interface for Shoreline Detection

This package provides a PyQt6-based GUI for the shoreline detection module,
integrating with Google Earth Engine for data access and processing.
"""

from .main_window import ShorelineDetectorGUI
from .processing_manager import ProcessingManager
from .processor import ShorelineProcessor
from .gee_interface import GEEInterface

__all__ = [
    "ShorelineDetectorGUI",
    "ProcessingManager",
    "ShorelineProcessor",
    "GEEInterface"
]
