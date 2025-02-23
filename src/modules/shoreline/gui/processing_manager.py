from PyQt6.QtCore import QThread
from .processor import ShorelineProcessor

class ProcessingManager:
    """Manages shoreline detection processing in a separate thread"""

    def __init__(self, main_window):
        """Initialize processing manager

        Args:
            main_window: Parent main window instance
        """
        self.main_window = main_window
        self.thread = None
        self.processor = None

    def start_processing(self, config: dict, geometry: dict):
        """Start processing in a new thread

        Args:
            config: Shoreline detection configuration
            geometry: GeoJSON geometry of area of interest
        """
        # Create new thread
        self.thread = QThread()

        # Create processor
        self.processor = ShorelineProcessor(config, geometry)
        self.processor.moveToThread(self.thread)

        # Connect signals
        self.thread.started.connect(self.processor.process)
        self.processor.finished.connect(self.thread.quit)
        self.processor.finished.connect(self._on_processing_complete)
        self.processor.progress.connect(self._on_progress_update)
        self.processor.status.connect(self._on_status_update)
        self.processor.error.connect(self._on_error)

        # Clean up when done
        self.thread.finished.connect(self.thread.deleteLater)
        self.processor.finished.connect(self.processor.deleteLater)

        # Start processing
        self.thread.start()

    def _on_processing_complete(self, results: dict):
        """Handle processing completion

        Args:
            results: Dictionary containing processing results
        """
        # Update GUI with results
        self.main_window.processing_complete(results)

        # Enable export button
        self.main_window.export_btn.setEnabled(True)

        # Update results panel
        formatted_results = ShorelineProcessor.format_results(results)
        self.main_window.stats_label.setText(formatted_results)

        # Display shoreline on map
        self.main_window.display_shoreline(results['shoreline'])

    def _on_progress_update(self, value: int):
        """Update progress bar

        Args:
            value: Progress percentage (0-100)
        """
        self.main_window.progress.setValue(value)

    def _on_status_update(self, message: str):
        """Update status message

        Args:
            message: Status message to display
        """
        self.main_window.status.setText(message)

    def _on_error(self, message: str):
        """Handle processing errors

        Args:
            message: Error message
        """
        # Reset GUI
        self.main_window.progress.setVisible(False)
        self.main_window.process_btn.setEnabled(True)

        # Show error message
        self.main_window.show_error("Processing Error", message)

    def cancel(self):
        """Cancel current processing"""
        if self.thread and self.thread.isRunning():
            self.thread.quit()
            self.thread.wait()
