#!/usr/bin/env python3
import os
import sys
from pathlib import Path

from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
    QLabel, QPushButton, QMessageBox, QFrame
)
from PyQt6.QtCore import Qt
from PyQt6.QtGui import QFont

# Add src directory to Python path
src_dir = Path(__file__).parent.parent
sys.path.insert(0, str(src_dir))

# Core imports
from core.config.config import ConfigManager

# Import available modules
try:
    from modules.shoreline.gui import ShorelineDetectorGUI
    SHORELINE_AVAILABLE = True
except ImportError as e:
    print(f"Failed to import shoreline module: {e}", file=sys.stderr)
    SHORELINE_AVAILABLE = False

class CVIcApp(QMainWindow):
    """Main application class for the Coastal Vulnerability Index Compiler."""

    def __init__(self):
        super().__init__()
        self.setWindowTitle("CVIc - Coastal Vulnerability Index Compiler")
        self.setMinimumSize(1200, 800)

        # Initialize configuration
        self.config_manager = ConfigManager()

        # Setup UI
        self.setup_ui()

    def setup_ui(self):
        """Setup the main user interface."""
        # Create central widget and main layout
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout(central_widget)
        main_layout.setContentsMargins(20, 20, 20, 20)

        # Title
        title_label = QLabel("CVIc - Coastal Vulnerability Index Compiler")
        title_label.setFont(QFont('Helvetica', 16, QFont.Weight.Bold))
        title_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        main_layout.addWidget(title_label)
        main_layout.addSpacing(20)

        # Modules section
        modules_frame = QFrame()
        modules_frame.setFrameStyle(QFrame.Shape.Box | QFrame.Shadow.Raised)
        modules_layout = QVBoxLayout(modules_frame)

        # Module title
        module_title = QLabel("Available Modules")
        module_title.setFont(QFont('Helvetica', 12, QFont.Weight.Bold))
        modules_layout.addWidget(module_title)

        # Launch button
        launch_btn = QPushButton("Launch Shoreline Detection Module")
        launch_btn.setEnabled(SHORELINE_AVAILABLE)
        launch_btn.clicked.connect(self.run_shoreline_module)
        launch_btn.setMinimumHeight(40)
        modules_layout.addWidget(launch_btn)

        # Module description
        desc = """Shoreline Detection Module

• Detect and extract shorelines from satellite imagery
• Support for multiple data sources (Sentinel-2, Landsat)
• Automated water detection algorithms
• Interactive visualization and editing"""
        desc_label = QLabel(desc)
        desc_label.setWordWrap(True)
        modules_layout.addWidget(desc_label)
        modules_layout.addSpacing(10)

        # Status
        status_text = "Module Status: " + ("Available" if SHORELINE_AVAILABLE else "Not Available")
        status_label = QLabel(status_text)
        modules_layout.addWidget(status_label)

        main_layout.addWidget(modules_frame)
        main_layout.addStretch()

    def check_gee_auth(self):
        """Check if GEE is authenticated."""
        try:
            import ee
            try:
                ee.Initialize()
                return True
            except ee.EEException:
                return False
        except ImportError:
            return False

    def ensure_gee_auth(self) -> bool:
        """Ensure Google Earth Engine is authenticated.

        Returns:
            bool: True if authenticated, False otherwise
        """
        try:
            import ee
            try:
                ee.Initialize()
                return True
            except ee.EEException:
                # Need to authenticate
                response = QMessageBox.question(
                    self,
                    "Authentication Required",
                    "Google Earth Engine authentication is required.\n\n"
                    "Would you like to authenticate now?\n\n"
                    "This will open a web browser where you can sign in with your Google account.",
                    QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No
                )
                if response == QMessageBox.StandardButton.Yes:
                    try:
                        ee.Authenticate()
                        ee.Initialize()
                        return True
                    except Exception as e:
                        QMessageBox.critical(
                            self,
                            "Authentication Error",
                            f"Failed to authenticate with Google Earth Engine: {str(e)}\n\n"
                            "Please ensure you have a Google account with Earth Engine access."
                        )
                return False
        except ImportError:
            QMessageBox.critical(
                self,
                "Module Error",
                "Google Earth Engine Python API is not installed."
            )
            return False
        except Exception as e:
            QMessageBox.critical(
                self,
                "GEE Error",
                f"Failed to initialize Google Earth Engine: {str(e)}"
            )
            return False

    def run_shoreline_module(self):
        """Initialize and display the shoreline detection module in the main window."""
        if not SHORELINE_AVAILABLE:
            QMessageBox.critical(self, "Module Error",
                               "Shoreline module is not available")
            return

        # Ensure GEE authentication first
        if not self.ensure_gee_auth():
            return

        try:
            # Clear the central widget
            if self.centralWidget():
                self.centralWidget().deleteLater()

            # Create and set the shoreline detector as the central widget
            shoreline_widget = ShorelineDetectorGUI()
            self.setCentralWidget(shoreline_widget)

            # Update window title
            self.setWindowTitle("CVIc - Shoreline Detection Module")

            # Ensure the window is properly sized
            self.setMinimumSize(1200, 800)

        except Exception as e:
            QMessageBox.critical(
                self,
                "Module Error",
                f"Failed to initialize shoreline module: {str(e)}"
            )

    def run(self):
        """Start the application."""
        self.show()

def main():
    """Main entry point for the application."""
    try:
        # Initialize QApplication first
        app = QApplication(sys.argv)

        # Create and run main window
        window = CVIcApp()
        window.run()

        # Start Qt event loop
        sys.exit(app.exec())
    except Exception as e:
        print(f"Failed to start application: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
