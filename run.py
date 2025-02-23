#!/usr/bin/env python3
"""
CVIc - Coastal Vulnerability Index Compiler
Main application entry point
"""

import sys
import os
from pathlib import Path
import logging

def setup_logging():
    """Configure logging"""
    log_dir = Path.home() / '.cvic' / 'logs'
    log_dir.mkdir(parents=True, exist_ok=True)

    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_dir / 'cvic.log'),
            logging.StreamHandler()
        ]
    )

def main():
    """Main entry point"""
    setup_logging()
    logger = logging.getLogger('cvic')

    try:
        from src.modules.shoreline.gui.main_window import ShorelineDetectorGUI
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
        logger.info("Starting CVIc")
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
