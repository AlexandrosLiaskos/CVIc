from PyQt6.QtWebEngineCore import QWebEngineSettings
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtCore import QUrl, pyqtSignal, QTimer
from PyQt6.QtWidgets import QVBoxLayout, QWidget
import folium
from folium.plugins import Draw
import tempfile
import json
import logging
from PyQt6.QtWebChannel import QWebChannel
import os

logger = logging.getLogger(__name__)

class MapWidget(QWidget):
    """Widget for displaying an interactive map using Folium/Leaflet with drawing capabilities"""

    map_clicked = pyqtSignal(float, float)  # Signal for map click events (lat, lon)
    shape_drawn = pyqtSignal(str, dict)  # Signal for drawn shapes (type, coordinates)

    def __init__(self, parent=None):
        super().__init__(parent)
        # Initialize web channel: use parent's web channel if available, else create a new one
        if parent is not None and hasattr(parent, '_web_channel'):
            self._web_channel = parent._web_channel
        else:
            self._web_channel = QWebChannel(self)
        self.setup_ui()

    def setup_ui(self):
        """Initialize the UI components"""
        try:
            # Create layout
            layout = QVBoxLayout(self)
            layout.setContentsMargins(0, 0, 0, 0)

            # Create web view for the map
            self.web_view = QWebEngineView(self)
            page = self.web_view.page()

            # Enable local file and remote URL access if available
            if hasattr(QWebEngineSettings, 'LocalContentCanAccessFileUrls'):
                page.settings().setAttribute(
                    QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls,
                    True
                )
            if hasattr(QWebEngineSettings, 'LocalContentCanAccessRemoteUrls'):
                page.settings().setAttribute(
                    QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls,
                    True
                )

            # Attach our web channel
            page.setWebChannel(self._web_channel)

            layout.addWidget(self.web_view)

            # Initialize map
            self.init_map()

        except Exception as e:
            logger.error(f"Failed to setup map widget: {str(e)}")
            raise

    def init_map(self):
        """Initialize the Folium map with drawing controls using Folium's defaults."""
        try:
            # Create a Folium map WITHOUT tiles=None.
            # This ensures Folium automatically loads Leaflet and won't give "L is not defined" errors.
            m = folium.Map(
                location=[0, 0],
                zoom_start=2,
                control_scale=True
            )

            # Add the Folium Draw plugin
            draw = Draw(
                export=True,
                draw_options={
                    'polyline': True,
                    'polygon': True,
                    'rectangle': True,
                    'circle': True,
                    'marker': True,
                    'circlemarker': True
                },
                edit_options={'edit': True, 'remove': True}
            )
            draw.add_to(m)

            # Inject WebChannel script for Qt <-> JS if needed
            root = m.get_root()
            root.header.add_child(folium.Element(
                '<script src="qrc:///qtwebchannel/qwebchannel.js"></script>'
            ))

            # Add any custom JS logic if you like, but wait until after Leaflet loads
            init_script = """
            <script>
            // Now L is guaranteed to exist because Folium loads it by default
            map.on('click', function(e) {
                console.log('Map clicked at', e.latlng);
            });
            </script>
            """
            root.html.add_child(folium.Element(init_script))

            # Save temp file then load into the QWebEngineView
            temp_file = tempfile.NamedTemporaryFile(suffix='.html', delete=False)
            m.save(temp_file.name)
            temp_file.close()

            self.web_view.setUrl(QUrl.fromLocalFile(temp_file.name))

        except Exception as e:
            logger.error(f"Map initialization failed: {str(e)}")
            raise

    def _handle_verification(self, result):
        """Handle map verification result"""
        if result != 'ok':
            logger.error(f"Verification failed: {result}")
            # Reset web view before retry
            self.web_view.setHtml('')
            QTimer.singleShot(1000, self.init_map)

    def handle_map_click(self, lat, lon):
        """Handle map click events from JavaScript"""
        self.map_clicked.emit(lat, lon)

    def handle_shape_drawn(self, shape_type, geojson_str):
        """Handle drawn shape events from JavaScript"""
        try:
            geojson = json.loads(geojson_str)
            self.shape_drawn.emit(shape_type, geojson)
        except json.JSONDecodeError as exc:
            logger.error(f"Failed to parse drawn GeoJSON: {str(exc)}")
        except Exception as exc:
            logger.error(f"Error handling drawn shape: {str(exc)}")

    def center_map(self, lat, lon, zoom=None):
        """Center the map on specified coordinates"""
        js = f"map.setView([{lat}, {lon}]"
        if zoom is not None:
            js += f", {zoom}"
        js += ");"
        self.web_view.page().runJavaScript(js)

    def clear_drawings(self):
        """Clear all drawings from the map"""
        js = """
        map.eachLayer(function(layer) {
            if (layer instanceof L.Path || layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });
        """
        self.web_view.page().runJavaScript(js)
