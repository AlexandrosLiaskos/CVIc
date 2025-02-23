#!/usr/bin/env python3
"""Launcher script for the Shoreline Detector GUI application"""

import sys
import os
import logging
from pathlib import Path
import subprocess

def ensure_venv():
    """Ensure we're running in the virtual environment"""
    venv_dir = Path('.venv')
    if not venv_dir.exists():
        print("Virtual environment not found. Please run setup.sh first.")
        sys.exit(1)

    # Check if we're already in the venv
    if sys.prefix == sys.base_prefix:
        # We're not in the venv, so activate it
        venv_python = str(venv_dir / 'bin' / 'python3')
        os.execl(venv_python, venv_python, *sys.argv)

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
    ensure_venv()
    setup_logging()
    logger = logging.getLogger('shoreline_detector')

    try:
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
        print("Run './setup.sh' to set up the environment")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
