from typing import Optional, Dict, Any, List, Tuple
import sys
import os
import json
import tempfile
import logging
from pathlib import Path

from PyQt6.QtWidgets import (
    QApplication,
    QMainWindow,
    QWidget,
    QVBoxLayout,
    QHBoxLayout,
    QLabel,
    QPushButton,
    QComboBox,
    QDateEdit,
    QSpinBox,
    QMessageBox,
    QFileDialog,
    QProgressBar,
    QStatusBar,
    QTextEdit
)
from PyQt6.QtCore import Qt, QDate, QDateTime, QUrl, QTimer, QObject, pyqtSlot, pyqtSignal
from PyQt6.QtGui import QIcon
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtWebEngineCore import QWebEngineSettings, QWebEnginePage
from PyQt6.QtWebChannel import QWebChannel
import qtawesome as qta
import ee
import folium
from folium.plugins import Draw
import geopandas as gpd
from shapely.geometry import shape, mapping

from .processing_manager import ProcessingManager
from ..config import ShorelineConfig
from ..detector import ShorelineDetector
from ..exceptions import ValidationError, GEEAuthenticationError, MapInitializationError
from .map_widget import MapWidget

# Set up logging
logger = logging.getLogger(__name__)

class WebChannelHandler(QObject):
    """Handler for JavaScript-Python communication"""

    featureDrawn = pyqtSignal(str)  # Signal for when a feature is drawn
    featureEdited = pyqtSignal(str)  # Signal for when a feature is edited
    featureDeleted = pyqtSignal()    # Signal for when a feature is deleted

    def __init__(self, parent: Optional[QObject] = None):
        super().__init__(parent)
        self.parent = parent

    @pyqtSlot()
    def check_drawn_features(self) -> None:
        """Called from JavaScript when features are drawn/edited/deleted"""
        logger.debug("check_drawn_features called from JavaScript")
        if self.parent and hasattr(self.parent, '_web_view'):
            self.parent._web_view.page().runJavaScript(
                """
                (function() {
                    try {
                        return window.drawnFeatures || null;
                    } catch (e) {
                        console.error('Error getting drawn features:', e);
                        return null;
                    }
                })();
                """,
                self._handle_js_response
            )

    def _handle_js_response(self, result: Any) -> None:
        """Handle JavaScript response with proper error handling"""
        try:
            if result:
                self.featureDrawn.emit(str(result))
            else:
                self.featureDeleted.emit()
        except Exception as e:
            logger.error(f"Error handling JavaScript response: {e}")
            if self.parent:
                self.parent.show_error("JavaScript Error", str(e))

class ShorelineDetectorGUI(QWidget):
    """Widget for the Shoreline Detector application"""

    def __init__(self, parent: Optional[QWidget] = None):
        super().__init__(parent)

        # Initialize logging
        self._setup_logging()

        # Initialize state
        self.detector: Optional[ShorelineDetector] = None
        self.config: Optional[ShorelineConfig] = None
        self.map: Optional[folium.Map] = None
        self.processing_manager = ProcessingManager(self)
        self.current_shoreline: Optional[Dict[str, Any]] = None
        self.drawn_features: Optional[Dict[str, Any]] = None
        self._map_html_path: Optional[str] = None

        # Initialize web channel with proper error handling
        try:
            self._setup_web_channel()
            self._setup_ui()
            self._setup_gee()
        except Exception as e:
            logger.error(f"Error during initialization: {e}")
            self.show_error("Initialization Error", str(e))

    def _setup_logging(self) -> None:
        """Set up logging configuration"""
        logging.basicConfig(
            level=logging.DEBUG,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )

    def _setup_web_channel(self) -> None:
        """Initialize web channel with error handling"""
        try:
            self._web_channel = QWebChannel(self)
            self._channel_handler = WebChannelHandler(self)
            self._web_channel.registerObject('qt', self._channel_handler)

            # Connect signals
            self._channel_handler.featureDrawn.connect(self._on_feature_drawn)
            self._channel_handler.featureEdited.connect(self._on_feature_edited)
            self._channel_handler.featureDeleted.connect(self._on_feature_deleted)
        except Exception as e:
            raise MapInitializationError(f"Failed to setup web channel: {e}")

    def _setup_ui(self):
        """Initialize the user interface"""
        # Create main vertical layout
        main_layout = QVBoxLayout(self)

        # Create horizontal layout for panels
        panels_layout = QHBoxLayout()

        # Create control panel (left side)
        control_panel = self._create_control_panel()
        panels_layout.addWidget(control_panel, stretch=2)

        # Create map view (center)
        map_widget = self._create_map_widget()
        panels_layout.addWidget(map_widget, stretch=5)

        # Create results panel (right side)
        results_panel = self._create_results_panel()
        panels_layout.addWidget(results_panel, stretch=2)

        # Add panels layout to main layout
        main_layout.addLayout(panels_layout)

        # Add status bar at the bottom
        self.status = QStatusBar()
        main_layout.addWidget(self.status)
        self.status.showMessage("Ready")

    def _create_control_panel(self) -> QWidget:
        """Create the control panel with input options"""
        panel = QWidget()
        layout = QVBoxLayout(panel)
        layout.setAlignment(Qt.AlignmentFlag.AlignTop)

        # Header
        header = QLabel("Control Panel")
        header.setStyleSheet("font-size: 16px; font-weight: bold;")
        layout.addWidget(header)

        # GEE Authentication Button
        self.auth_btn = QPushButton("Authenticate GEE")
        self.auth_btn.clicked.connect(self._setup_gee)
        layout.addWidget(self.auth_btn)
        layout.addSpacing(10)

        # Data Source Selection
        layout.addWidget(QLabel("Data Source:"))
        self.source_combo = QComboBox()
        self.source_combo.addItems(["Sentinel-1", "Sentinel-2", "Landsat"])
        self.source_combo.currentTextChanged.connect(self._on_source_changed)
        layout.addWidget(self.source_combo)

        # Date Range
        layout.addWidget(QLabel("Date Range:"))
        date_layout = QHBoxLayout()

        self.start_date = QDateEdit()
        self.start_date.setCalendarPopup(True)
        self.start_date.setDate(QDate.currentDate().addMonths(-1))

        self.end_date = QDateEdit()
        self.end_date.setCalendarPopup(True)
        self.end_date.setDate(QDate.currentDate())

        date_layout.addWidget(QLabel("From:"))
        date_layout.addWidget(self.start_date)
        date_layout.addWidget(QLabel("To:"))
        date_layout.addWidget(self.end_date)
        layout.addLayout(date_layout)

        # Cloud Cover (for optical imagery)
        self.cloud_label = QLabel("Max Cloud Cover (%):")
        layout.addWidget(self.cloud_label)
        self.cloud_spin = QSpinBox()
        self.cloud_spin.setRange(0, 100)
        self.cloud_spin.setValue(20)
        layout.addWidget(self.cloud_spin)

        # Water Index (for optical imagery)
        self.index_label = QLabel("Water Index:")
        layout.addWidget(self.index_label)
        self.index_combo = QComboBox()
        self.index_combo.addItems([
            "MNDWI",
            "NDWI",
            "AWEI",
            "AWEIsh",
            "SMBWI"
        ])
        layout.addWidget(self.index_combo)

        # Initially hide optical-specific controls
        self._update_optical_controls()

        # Processing Options
        layout.addWidget(QLabel("Processing Options:"))

        self.smooth_spin = QSpinBox()
        self.smooth_spin.setRange(1, 9)
        self.smooth_spin.setValue(3)
        self.smooth_spin.setSingleStep(2)
        layout.addWidget(QLabel("Smooth Kernel Size:"))
        layout.addWidget(self.smooth_spin)

        # Action Buttons
        layout.addSpacing(20)

        self.process_btn = QPushButton("Process")
        self.process_btn.clicked.connect(self._on_process)
        self.process_btn.setEnabled(False)  # Disabled until GEE is authenticated
        layout.addWidget(self.process_btn)

        self.cancel_btn = QPushButton("Cancel")
        self.cancel_btn.clicked.connect(self._on_cancel)
        self.cancel_btn.setEnabled(False)
        layout.addWidget(self.cancel_btn)

        self.export_btn = QPushButton("Export Results")
        self.export_btn.clicked.connect(self._on_export)
        self.export_btn.setEnabled(False)
        layout.addWidget(self.export_btn)

        # Progress Bar
        self.progress = QProgressBar()
        self.progress.setVisible(False)
        layout.addWidget(self.progress)

        layout.addStretch()
        return panel

    def _create_map_widget(self) -> QWidget:
        """Create the map widget with drawing capabilities"""
        try:
            # Create container widget
            widget = QWidget()
            layout = QVBoxLayout(widget)
            layout.setContentsMargins(0, 0, 0, 0)

            # Create map widget
            self.map_widget = MapWidget()

            # Connect signals
            self.map_widget.map_clicked.connect(self._on_map_clicked)
            self.map_widget.shape_drawn.connect(self._on_shape_drawn)

            layout.addWidget(self.map_widget)

            # Add toolbar for map controls
            toolbar_layout = QHBoxLayout()

            # Clear drawings button
            clear_btn = QPushButton("Clear Drawings")
            clear_btn.clicked.connect(self.map_widget.clear_drawings)
            toolbar_layout.addWidget(clear_btn)

            # Export button
            export_btn = QPushButton("Export Drawn Features")
            export_btn.clicked.connect(self._export_drawn_features)
            toolbar_layout.addWidget(export_btn)

            toolbar_layout.addStretch()
            layout.addLayout(toolbar_layout)

            return widget

        except Exception as e:
            logger.error(f"Failed to create map widget: {str(e)}")
            self._handle_map_creation_error(widget, layout)
            return widget

    def _handle_map_creation_error(self, widget: QWidget, layout: QVBoxLayout) -> None:
        """Handle map creation errors by displaying a fallback interface

        Args:
            widget (QWidget): The parent widget for the error display
            layout (QVBoxLayout): The layout to add error components to
        """
        # Clear any existing widgets from the layout
        while layout.count():
            item = layout.takeAt(0)
            if item.widget():
                item.widget().deleteLater()

        # Create error message display
        error_widget = QWidget()
        error_layout = QVBoxLayout(error_widget)

        # Add error icon
        error_icon = QLabel()
        error_icon.setPixmap(qta.icon('fa5s.exclamation-triangle', color='red').pixmap(64, 64))
        error_layout.addWidget(error_icon, alignment=Qt.AlignmentFlag.AlignCenter)

        # Add error message
        error_label = QLabel("Failed to initialize map view")
        error_label.setStyleSheet("color: red; font-size: 14px; font-weight: bold;")
        error_label.setWordWrap(True)
        error_layout.addWidget(error_label, alignment=Qt.AlignmentFlag.AlignCenter)

        # Add retry button
        retry_button = QPushButton("Retry Map Loading")
        retry_button.clicked.connect(lambda: self._retry_map_creation(widget, layout))
        error_layout.addWidget(retry_button, alignment=Qt.AlignmentFlag.AlignCenter)

        # Add the error widget to the main layout
        layout.addWidget(error_widget)

        # Update status
        if hasattr(self, 'status'):
            self.status.showMessage("Map initialization failed")

        # Disable processing controls
        self.process_btn.setEnabled(False)

    def _retry_map_creation(self, widget: QWidget, layout: QVBoxLayout) -> None:
        """Attempt to recreate the map widget after a failure

        Args:
            widget (QWidget): The parent widget for the map
            layout (QVBoxLayout): The layout to add the map to
        """
        try:
            # Clear error display
            while layout.count():
                item = layout.takeAt(0)
                if item.widget():
                    item.widget().deleteLater()

            # Recreate map
            self.map = folium.Map(
                location=[0, 0],
                zoom_start=2,
                control_scale=True,
                tiles='https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
                attr='Google Satellite',
                prefer_canvas=True
            )

            # Add Draw control
            draw = Draw(
                draw_options={
                    'polyline': False,
                    'circle': False,
                    'rectangle': True,
                    'polygon': True,
                    'marker': False,
                    'circlemarker': False,
                },
                edit_options={
                    'edit': True,
                    'remove': True
                }
            )
            self.map.add_child(draw)

            # Add custom JavaScript
            self._inject_map_javascript()

            # Setup web view
            self._setup_web_view(widget, layout)

            # Update status
            self.status.showMessage("Map reloaded successfully")

            # Re-enable processing controls if GEE is authenticated
            if hasattr(self, 'detector') and self.detector is not None:
                self.process_btn.setEnabled(True)

        except Exception as e:
            logger.error(f"Error retrying map creation: {e}")
            self._handle_map_creation_error(widget, layout)

    def _create_results_panel(self) -> QWidget:
        """Create the results panel showing processing outputs and statistics"""
        panel = QWidget()
        layout = QVBoxLayout(panel)
        layout.setAlignment(Qt.AlignmentFlag.AlignTop)

        # Header
        header = QLabel("Results Panel")
        header.setStyleSheet("font-size: 16px; font-weight: bold;")
        layout.addWidget(header)

        # Processing Status Group
        status_group = QWidget()
        status_layout = QVBoxLayout(status_group)

        # Status indicators
        self.processing_status = QLabel("Status: Ready")
        status_layout.addWidget(self.processing_status)

        # Statistics Group
        stats_group = QWidget()
        stats_layout = QVBoxLayout(stats_group)
        stats_layout.setAlignment(Qt.AlignmentFlag.AlignTop)

        # Shoreline statistics
        self.shoreline_length = QLabel("Shoreline Length: -")
        self.shoreline_area = QLabel("Area: -")
        self.processing_time = QLabel("Processing Time: -")
        self.image_count = QLabel("Images Processed: -")

        stats_layout.addWidget(self.shoreline_length)
        stats_layout.addWidget(self.shoreline_area)
        stats_layout.addWidget(self.processing_time)
        stats_layout.addWidget(self.image_count)

        # Add groups to main layout
        layout.addWidget(status_group)
        layout.addWidget(stats_group)

        # Processing History
        history_label = QLabel("Processing History")
        history_label.setStyleSheet("font-weight: bold;")
        layout.addWidget(history_label)

        self.history_list = QTextEdit()
        self.history_list.setReadOnly(True)
        self.history_list.setMaximumHeight(150)
        layout.addWidget(self.history_list)

        # Export Options
        export_label = QLabel("Export Options")
        export_label.setStyleSheet("font-weight: bold;")
        layout.addWidget(export_label)

        export_layout = QVBoxLayout()

        # Export format selection
        self.export_format = QComboBox()
        self.export_format.addItems(["GeoJSON", "Shapefile", "KML"])
        export_layout.addWidget(self.export_format)

        # Export buttons
        export_buttons_layout = QHBoxLayout()

        self.export_vector_btn = QPushButton("Export Vector")
        self.export_vector_btn.setEnabled(False)
        self.export_vector_btn.clicked.connect(self._on_export)
        export_buttons_layout.addWidget(self.export_vector_btn)

        self.export_stats_btn = QPushButton("Export Stats")
        self.export_stats_btn.setEnabled(False)
        self.export_stats_btn.clicked.connect(self._on_export_stats)
        export_buttons_layout.addWidget(self.export_stats_btn)

        export_layout.addLayout(export_buttons_layout)
        layout.addLayout(export_layout)

        # Add stretch to push everything to the top
        layout.addStretch()

        return panel

    def _inject_map_javascript(self) -> None:
        """Inject custom JavaScript code into the map"""
        js_code = """
        <script>
        // Global variables for feature management
        var drawnItems;
        var drawControl;

        function initializeMap() {
            try {
                // Initialize feature group
                drawnItems = new L.FeatureGroup();
                map.addLayer(drawnItems);

                // Initialize draw control
                drawControl = new L.Control.Draw({
                    draw: {
                        polyline: false,
                        circle: false,
                        rectangle: true,
                        polygon: true,
                        marker: false,
                        circlemarker: false
                    },
                    edit: {
                        featureGroup: drawnItems,
                        edit: true,
                        remove: true
                    }
                });
                map.addControl(drawControl);

                // Set up web channel
                setupWebChannel();

                return true;
            } catch (error) {
                console.error('Map initialization error:', error);
                return false;
            }
        }

        function setupWebChannel() {
            new QWebChannel(qt.webChannelTransport, function(channel) {
                window.bridge = channel.objects.qt;

                // Draw events
                map.on('draw:created', function(e) {
                    try {
                        drawnItems.clearLayers();
                        drawnItems.addLayer(e.layer);
                        var geoJSON = e.layer.toGeoJSON();
                        window.bridge.featureDrawn.emit(JSON.stringify(geoJSON));
                    } catch (error) {
                        console.error('Draw created error:', error);
                    }
                });

                map.on('draw:edited', function(e) {
                    try {
                        var geoJSON = null;
                        e.layers.eachLayer(function(layer) {
                            geoJSON = layer.toGeoJSON();
                        });
                        if (geoJSON) {
                            window.bridge.featureEdited.emit(JSON.stringify(geoJSON));
                        }
                    } catch (error) {
                        console.error('Draw edited error:', error);
                    }
                });

                map.on('draw:deleted', function(e) {
                    try {
                        drawnItems.clearLayers();
                        window.bridge.featureDeleted.emit();
                    } catch (error) {
                        console.error('Draw deleted error:', error);
                    }
                });
            });
        }

        // Initialize map when Leaflet is ready
        var initMapInterval = setInterval(function() {
            if (typeof L !== 'undefined' && typeof map !== 'undefined') {
                if (initializeMap()) {
                    clearInterval(initMapInterval);
                    console.log('Map initialization successful');
                }
            }
        }, 100);

        // Timeout after 10 seconds
        setTimeout(function() {
            clearInterval(initMapInterval);
            if (typeof L === 'undefined' || typeof map === 'undefined') {
                console.error('Map initialization timeout');
            }
        }, 10000);
        </script>
        """
        self.map.get_root().html.add_child(folium.Element(js_code))

    def _setup_web_view(self, widget: QWidget, layout: QVBoxLayout) -> None:
        """Set up the web view with proper configuration and error handling"""
        try:
            # Create temporary directory if it doesn't exist
            temp_dir = Path(tempfile.gettempdir()) / 'cvic_maps'
            temp_dir.mkdir(parents=True, exist_ok=True)

            # Save map with unique identifier
            self._map_html_path = temp_dir / f'shoreline_map_{id(self)}.html'
            self.map.save(str(self._map_html_path))

            # Configure web view
            self._web_view = QWebEngineView()
            self._web_view.setMinimumSize(800, 600)

            # Create and configure page
            page = QWebEnginePage(self._web_view)
            self._web_view.setPage(page)
            page.setWebChannel(self._web_channel)

            # Configure settings
            settings = page.settings()
            settings.setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls, True)
            settings.setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls, True)
            settings.setAttribute(QWebEngineSettings.WebAttribute.JavascriptEnabled, True)
            settings.setAttribute(QWebEngineSettings.WebAttribute.AllowRunningInsecureContent, True)

            # Add console logging - Fix the connection
            def handle_js_console_message(level: int, message: str, line: int, source_id: str) -> None:
                self._handle_js_console(level, message, line, source_id)

            page.javaScriptConsoleMessage.connect(handle_js_console_message)

            # Load the map
            url = QUrl.fromLocalFile(str(self._map_html_path))
            self._web_view.setUrl(url)
            layout.addWidget(self._web_view)

        except Exception as e:
            raise MapInitializationError(f"Failed to setup web view: {e}")

    def _handle_js_console(self, level: int, message: str, line: int, source: str) -> None:
        """Handle JavaScript console messages"""
        levels = {
            0: logging.INFO,
            1: logging.WARNING,
            2: logging.ERROR
        }
        log_level = levels.get(level, logging.DEBUG)
        logger.log(log_level, f"JS ({source}:{line}): {message}")

    def _handle_drawn_features(self, features_str: Optional[str]) -> None:
        """Handle drawn features from JavaScript with proper error handling"""
        logger.debug(f"Handling drawn features: {features_str}")
        try:
            if not features_str:
                self._clear_drawn_features()
                return

            # Parse and validate the GeoJSON
            features = self._parse_geojson(features_str)
            if not features:
                return

            # Store and process the features
            self._process_drawn_features(features)

        except Exception as e:
            logger.error(f"Error handling drawn features: {e}")
            self.show_error("Feature Error", str(e))
            self._clear_drawn_features()

    def _parse_geojson(self, features_str: str) -> Optional[Dict[str, Any]]:
        """Parse and validate GeoJSON string"""
        try:
            features = json.loads(features_str)
            if not isinstance(features, dict) or 'geometry' not in features:
                raise ValueError("Invalid GeoJSON format")

            if features['geometry']['type'] not in ['Polygon', 'Rectangle']:
                raise ValueError("Invalid geometry type - must be Polygon or Rectangle")

            return features
        except json.JSONDecodeError as e:
            logger.error(f"JSON parsing error: {e}")
            self.show_error("JSON Error", "Invalid GeoJSON format")
            return None
        except Exception as e:
            logger.error(f"GeoJSON parsing error: {e}")
            self.show_error("GeoJSON Error", str(e))
            return None

    def _process_drawn_features(self, features: Dict[str, Any]) -> None:
        """Process valid drawn features"""
        try:
            # Store the features
            self.drawn_features = features

            # Calculate area using Earth Engine
            geometry = ee.Geometry(features['geometry'])
            area = geometry.area().getInfo()
            area_km2 = area / 1e6  # Convert to km²

            # Update UI
            self.status.showMessage(f"Selected area: {area_km2:.2f} km²")
            self.process_btn.setEnabled(True)

            # Enable export if we have results
            if self.current_shoreline:
                self.export_btn.setEnabled(True)

        except ee.EEException as e:
            logger.error(f"Earth Engine error: {e}")
            self.show_error("Earth Engine Error", str(e))
            self._clear_drawn_features()
        except Exception as e:
            logger.error(f"Error processing features: {e}")
            self.show_error("Processing Error", str(e))
            self._clear_drawn_features()

    def _clear_drawn_features(self) -> None:
        """Clear drawn features and update UI"""
        self.drawn_features = None
        self.status.showMessage("No area selected")
        self.process_btn.setEnabled(False)
        self.export_btn.setEnabled(False)

    def _setup_gee(self) -> bool:
        """Initialize Google Earth Engine with proper error handling"""
        try:
            ee.Initialize()
            self._update_gee_status(True)
            return True
        except ee.EEException:
            return self._handle_gee_authentication()
        except Exception as e:
            logger.error(f"GEE initialization error: {e}")
            self.show_error("GEE Error", f"Failed to initialize Google Earth Engine: {str(e)}")
            self._update_gee_status(False)
            return False

    def _handle_gee_authentication(self) -> bool:
        """Handle GEE authentication process"""
        try:
            response = QMessageBox.question(
                self,
                "Authentication Required",
                "Google Earth Engine authentication is required.\n\n"
                "Would you like to authenticate now?\n\n"
                "This will open a web browser where you can sign in with your Google account.",
                QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No
            )

            if response == QMessageBox.StandardButton.Yes:
                ee.Authenticate()
                ee.Initialize()
                self._update_gee_status(True)
                return True

            self._update_gee_status(False)
            return False

        except Exception as e:
            logger.error(f"GEE authentication error: {e}")
            self.show_error(
                "Authentication Error",
                f"Failed to authenticate with Google Earth Engine: {str(e)}\n\n"
                "Please ensure you have a Google account with Earth Engine access."
            )
            self._update_gee_status(False)
            return False

    def _update_gee_status(self, is_authenticated: bool) -> None:
        """Update UI elements based on GEE authentication status"""
        if is_authenticated:
            self.process_btn.setEnabled(True)
            self.auth_btn.setText("GEE Authenticated")
            self.auth_btn.setEnabled(False)
            self.status.showMessage("GEE Authentication successful")
        else:
            self.process_btn.setEnabled(False)
            self.auth_btn.setText("Authenticate GEE")
            self.auth_btn.setEnabled(True)
            self.status.showMessage("GEE Authentication required")

    def _on_source_changed(self, source: str):
        """Handle satellite source change"""
        self._update_optical_controls()

    def _update_optical_controls(self):
        """Show/hide controls specific to optical imagery"""
        is_optical = self.source_combo.currentText() in ["Sentinel-2", "Landsat"]
        self.cloud_label.setVisible(is_optical)
        self.cloud_spin.setVisible(is_optical)
        self.index_label.setVisible(is_optical)
        self.index_combo.setVisible(is_optical)

    def _on_process(self):
        """Handle process button click"""
        # Check for drawn features
        if not self.drawn_features:
            self.show_error(
                "No Area Selected",
                "Please draw an area of interest on the map first."
            )
            return

        try:
            # Create geometry from coordinates list
            if isinstance(self.drawn_features, list):
                geometry = {
                    "type": "Polygon",
                    "coordinates": [self.drawn_features]
                }
            else:
                self.show_error(
                    "Invalid Selection",
                    "No valid area selected. Please draw an area on the map."
                )
                return

            # Create configuration
            config = ShorelineConfig(
                satellite={
                    "source": self.source_combo.currentText().lower(),
                    "water_index": self.index_combo.currentText() if self.index_combo.isVisible() else None,
                    "cloud_cover": self.cloud_spin.value() if self.cloud_spin.isVisible() else None,
                    "date_range": {
                        "start": self.start_date.date().toString(Qt.DateFormat.ISODate),
                        "end": self.end_date.date().toString(Qt.DateFormat.ISODate)
                    }
                },
                processing={
                    "water_detection": {
                        "threshold_method": "otsu",
                        "smooth_kernel": self.smooth_spin.value(),
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

            # Update UI
            self.process_btn.setEnabled(False)
            self.cancel_btn.setEnabled(True)
            self.progress.setVisible(True)
            self.progress.setValue(0)
            self.status.showMessage("Processing...")

            # Start processing
            self.processing_manager.start_processing(
                config.dict(),
                geometry  # Use the geometry directly
            )

        except ValidationError as e:
            self.show_error("Configuration Error", str(e))
        except Exception as e:
            self.show_error("Error", f"Unexpected error: {str(e)}")

    def _on_cancel(self):
        """Handle cancel button click"""
        self.processing_manager.cancel()
        self.process_btn.setEnabled(True)
        self.cancel_btn.setEnabled(False)
        self.progress.setVisible(False)
        self.status.showMessage("Processing cancelled")

    def processing_complete(self, results: Dict):
        """Handle processing completion"""
        self.current_shoreline = results
        self.process_btn.setEnabled(True)
        self.cancel_btn.setEnabled(False)
        self.status.showMessage("Processing complete")

    def display_shoreline(self, shoreline: Dict):
        """Display shoreline on the map"""
        try:
            # Create new map with the shoreline and known ID
            self.map = folium.Map(
                location=[0, 0],
                zoom_start=2,
                control_scale=True,
                tiles='https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
                attr='Google Satellite'
            )

            # Set a known ID for the map
            self.map._id = "shoreline_map"

            # Add shoreline GeoJSON
            folium.GeoJson(
                shoreline,
                name='Shoreline',
                style_function=lambda x: {
                    'color': 'red',
                    'weight': 3
                }
            ).add_to(self.map)

            # Add Folium Draw plugin
            draw = Draw(
                draw_options={
                    'polyline': False,
                    'circle': False,
                    'rectangle': True,
                    'polygon': True,
                    'marker': False,
                    'circlemarker': False
                },
                edit_options={'edit': True}
            )
            draw.add_to(self.map)

            # Add layer control
            folium.LayerControl().add_to(self.map)

            # Add simplified JavaScript bridge
            draw_script = """
            <script src="qrc:///qtwebchannel/qwebchannel.js"></script>
            <script>
            document.addEventListener('DOMContentLoaded', function() {
                new QWebChannel(qt.webChannelTransport, function(channel) {
                    window.drawnFeatures = JSON.stringify(shoreline);
                    if (qt && qt.check_drawn_features) {
                        qt.check_drawn_features();
                    }
                });
            });
            </script>
            """
            self.map.get_root().html.add_child(folium.Element(draw_script))

            # Save and update the web view
            temp_path = os.path.join(tempfile.gettempdir(), 'shoreline_map.html')
            self.map.save(temp_path)
            self._web_view.setUrl(QUrl.fromLocalFile(temp_path))
            self._map_html_path = temp_path

        except Exception as e:
            self.show_error("Display Error", f"Error displaying shoreline: {str(e)}")

    def show_error(self, title: str, message: str):
        """Show error message dialog and log the error"""
        logger.error(f"{title}: {message}")
        QMessageBox.critical(self, title, message)

    def _on_export(self) -> None:
        """Handle export button click with enhanced functionality"""
        if not self.current_shoreline:
            self.show_error(
                "No Results",
                "No shoreline results available to export."
            )
            return

        try:
            file_path, selected_filter = QFileDialog.getSaveFileName(
                self,
                "Export Shoreline",
                "",
                "GeoJSON (*.geojson);;Shapefile (*.shp);;KML (*.kml)"
            )

            if not file_path:
                return

            # Create a GeoDataFrame from the shoreline
            gdf = gpd.GeoDataFrame.from_features(
                self.current_shoreline['shoreline']['features'],
                crs="EPSG:4326"
            )

            # Export based on file extension
            if file_path.endswith('.geojson'):
                gdf.to_file(file_path, driver='GeoJSON')
            elif file_path.endswith('.shp'):
                gdf.to_file(file_path)
            elif file_path.endswith('.kml'):
                gdf.to_file(file_path, driver='KML')

            self.status.showMessage(f"Results exported to {file_path}")

        except Exception as e:
            logger.error(f"Export error: {e}")
            self.show_error(
                "Export Error",
                f"Failed to export results: {str(e)}"
            )

    def _on_export_stats(self) -> None:
        """Export processing statistics and metrics to a CSV file"""
        if not self.current_shoreline:
            self.show_error(
                "No Results",
                "No shoreline statistics available to export."
            )
            return

        try:
            file_path, _ = QFileDialog.getSaveFileName(
                self,
                "Export Statistics",
                "",
                "CSV (*.csv)"
            )

            if not file_path:
                return

            # Ensure file has .csv extension
            if not file_path.endswith('.csv'):
                file_path += '.csv'

            # Prepare statistics
            stats = {
                'Timestamp': [QDateTime.currentDateTime().toString(Qt.DateFormat.ISODate)],
                'Satellite Source': [self.source_combo.currentText()],
                'Start Date': [self.start_date.date().toString(Qt.DateFormat.ISODate)],
                'End Date': [self.end_date.date().toString(Qt.DateFormat.ISODate)],
                'Processing Time (s)': [self.processing_time.text().split(': ')[1]],
                'Images Processed': [self.image_count.text().split(': ')[1]],
                'Shoreline Length (km)': [self.shoreline_length.text().split(': ')[1]],
                'Area (km²)': [self.shoreline_area.text().split(': ')[1]]
            }

            # Create DataFrame and export
            import pandas as pd
            df = pd.DataFrame(stats)
            df.to_csv(file_path, index=False)

            self.status.showMessage(f"Statistics exported to {file_path}")

        except Exception as e:
            logger.error(f"Export statistics error: {e}")
            self.show_error(
                "Export Error",
                f"Failed to export statistics: {str(e)}"
            )

    def closeEvent(self, event) -> None:
        """Clean up temporary files on window close"""
        try:
            if self._map_html_path and os.path.exists(self._map_html_path):
                os.unlink(self._map_html_path)
        except Exception as e:
            logger.error(f"Error cleaning up temporary files: {e}")
        super().closeEvent(event)

    def _on_feature_drawn(self, features_str: str) -> None:
        """Handle feature drawn signal from web channel"""
        logger.debug("Feature drawn signal received")
        self._handle_drawn_features(features_str)

    def _on_feature_edited(self, features_str: str) -> None:
        """Handle feature edited signal from web channel"""
        logger.debug("Feature edited signal received")
        self._handle_drawn_features(features_str)

    def _on_feature_deleted(self) -> None:
        """Handle feature deleted signal from web channel"""
        logger.debug("Feature deleted signal received")
        self._clear_drawn_features()

    def _verify_map_initialization(self) -> None:
        """Verify that the map has initialized correctly"""
        verification_script = """
        (function() {
            if (typeof L === 'undefined') {
                return 'Leaflet not loaded';
            }
            if (typeof map === 'undefined') {
                return 'Map not initialized';
            }
            if (typeof drawnItems === 'undefined') {
                return 'Draw controls not initialized';
            }
            return 'ok';
        })();
        """

        def handle_verification(result: str) -> None:
            if result != 'ok':
                logger.error(f"Map verification failed: {result}")
                self.show_error("Map Error",
                              "Failed to initialize map components. Please try restarting the application.")

        # Run verification after a short delay to ensure page is loaded
        QTimer.singleShot(1000, lambda: self._web_view.page().runJavaScript(
            verification_script, handle_verification))

    def _on_map_clicked(self, lat: float, lon: float) -> None:
        """Handle map click events"""
        logger.debug(f"Map clicked at: {lat}, {lon}")
        self.status.showMessage(f"Selected coordinates: {lat:.6f}, {lon:.6f}")

    def _on_shape_drawn(self, shape_type: str, geojson: dict) -> None:
        """Handle drawn shape events"""
        try:
            # Convert GeoJSON to shapely geometry
            geometry = shape(geojson['geometry'])

            # Store the drawn feature
            if not hasattr(self, 'drawn_features'):
                self.drawn_features = []

            feature = {
                'type': shape_type,
                'geometry': geometry,
                'geojson': geojson
            }
            self.drawn_features.append(feature)

            # Update status
            self.status.showMessage(f"Drew {shape_type} shape. Total shapes: {len(self.drawn_features)}")

            # Enable processing if we have drawn features
            self.process_btn.setEnabled(True)

        except Exception as e:
            logger.error(f"Error processing drawn shape: {str(e)}")
            self.show_error("Drawing Error", str(e))

    def _export_drawn_features(self) -> None:
        """Export drawn features to GeoJSON file"""
        try:
            if not hasattr(self, 'drawn_features') or not self.drawn_features:
                self.show_error("Export Error", "No features to export")
                return

            # Create GeoJSON feature collection
            features = []
            for feature in self.drawn_features:
                features.append({
                    'type': 'Feature',
                    'geometry': mapping(feature['geometry']),
                    'properties': {'shape_type': feature['type']}
                })

            geojson_data = {
                'type': 'FeatureCollection',
                'features': features
            }

            # Get save file location
            file_path, _ = QFileDialog.getSaveFileName(
                self,
                "Save GeoJSON",
                "",
                "GeoJSON Files (*.geojson);;All Files (*)"
            )

            if file_path:
                if not file_path.endswith('.geojson'):
                    file_path += '.geojson'

                with open(file_path, 'w') as f:
                    json.dump(geojson_data, f, indent=2)

                self.status.showMessage(f"Exported {len(features)} features to {file_path}")

        except Exception as e:
            logger.error(f"Error exporting features: {str(e)}")
            self.show_error("Export Error", str(e))

def main():
    """Main entry point for the GUI application"""
    try:
        app = QApplication(sys.argv)
        window = ShorelineDetectorGUI()
        window.show()
        sys.exit(app.exec())
    except Exception as e:
        logger.critical(f"Application failed to start: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
