#!/usr/bin/env python3
"""Launcher script for the Shoreline Detector GUI application"""

import sys
import os
import logging
from pathlib import Path

# Add parent directory to path to allow imports
parent_dir = str(Path(__file__).resolve().parent.parent.parent)
sys.path.insert(0, parent_dir)

def setup_logging():
    """Configure logging"""
    log_dir = Path.home() / '.cvic' / 'logs'
    log_dir.mkdir(parents=True, exist_ok=True)

    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_dir / 'shoreline_detector.log'),
            logging.StreamHandler()
        ]
    )

def main():
    """Main entry point"""
    setup_logging()
    logger = logging.getLogger('shoreline_detector')

    try:
        # Import here to catch any import errors after logging is set up
        from modules.shoreline.gui.main_window import ShorelineDetectorGUI
        from PyQt6.QtWidgets import QApplication
        import ee

        # Initialize Earth Engine
        try:
            ee.Initialize()
        except Exception as e:
            logger.error(f"Failed to initialize Earth Engine: {e}")
            print("Error: Failed to initialize Google Earth Engine.")
            print("Please make sure you are authenticated with Google Earth Engine.")
            print("Run 'earthengine authenticate' in terminal if needed.")
            sys.exit(1)

        # Start application
        logger.info("Starting Shoreline Detector GUI")
        app = QApplication(sys.argv)
        window = ShorelineDetectorGUI()
        window.show()
        sys.exit(app.exec())

    except ImportError as e:
        logger.error(f"Import error: {e}")
        print("Error: Failed to import required modules.")
        print("Please ensure all dependencies are installed:")
        print("pip install -r requirements.txt")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
