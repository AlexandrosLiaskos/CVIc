import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, View } from 'ol';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import Select from 'ol/interaction/Select';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { click } from 'ol/events/condition';
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
import 'ol/ol.css';
import { defaults as defaultControls } from 'ol/control';
import { createBox } from 'ol/interaction/Draw';
import { Point } from 'ol/geom';
import AOIConfirmation from './AOIConfirmation';
import { fromLonLat, toLonLat } from 'ol/proj';
import { getArea, getLength } from 'ol/sphere';
import GeoJSON from 'ol/format/GeoJSON';
import { unByKey } from 'ol/Observable';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';

const vertexStyle = new Style({
  image: new CircleStyle({
    radius: 6,
    fill: new Fill({
      color: '#d32f2f'
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 2
    })
  })
});

const editingStyle = new Style({
  fill: new Fill({
    color: 'rgba(76, 175, 80, 0.2)'
  }),
  stroke: new Stroke({
    color: '#4CAF50',
    width: 2
  }),
  image: vertexStyle.getImage()
});

const selectedFeatureStyle = new Style({
  fill: new Fill({
    color: 'rgba(33, 150, 243, 0.3)'
  }),
  stroke: new Stroke({
    color: '#2196F3',
    width: 2
  })
});

export default function AOISelection() {
  const mapRef = useRef();
  const mapInstanceRef = useRef(null);
  const vectorSourceRef = useRef(new VectorSource());
  const drawRef = useRef(null);
  const modifyRef = useRef(null);
  const selectRef = useRef(null);
  const dispatch = useDispatch();

  const [drawingMode, setDrawingMode] = useState('none');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [activeBasemap, setActiveBasemap] = useState('Satellite');
  const [zoomLevel, setZoomLevel] = useState(2);
  const [editMode, setEditMode] = useState(false);
  const [bufferDistance, setBufferDistance] = useState(0);
  const [coordinateFormat, setCoordinateFormat] = useState('dd'); // dd or dms
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [aoiProperties, setAoiProperties] = useState({
    area: 0,
    perimeter: 0,
    vertices: 0
  });
  const [showCoordinateInput, setShowCoordinateInput] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [exportFormat, setExportFormat] = useState('geojson');
  const [compactMode, setCompactMode] = useState(false);

  // Handle basemap changes
  const handleBasemapChange = (type) => {
    if (!mapInstanceRef.current) return;

    const layers = mapInstanceRef.current.getLayers();
    const baseLayer = layers.getArray()[0];

    let newSource;
    switch (type) {
      case 'Satellite':
        newSource = new XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          maxZoom: 19
        });
        break;
      case 'Topo':
        newSource = new XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          maxZoom: 19
        });
        break;
      default: // OSM
        newSource = new OSM();
    }

    baseLayer.setSource(newSource);
    setActiveBasemap(type);
  };

  // Handle drawing mode changes
  const handleDrawingMode = (mode) => {
    if (mode === drawingMode) {
      setDrawingMode('none');
    } else {
      setDrawingMode(mode);
    }
  };

  // Add zoom control handlers
  const handleZoom = (direction) => {
    if (!mapInstanceRef.current) return;
    const view = mapInstanceRef.current.getView();
    const currentZoom = view.getZoom();
    view.animate({
      zoom: currentZoom + direction,
      duration: 250
    });
  };

  // Update click handler to be simpler
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const handleClick = (event) => {
      if (drawingMode !== 'none') return; // Don't select while drawing

      const pixel = event.pixel;
      let feature = null;

      mapInstanceRef.current.forEachFeatureAtPixel(pixel, (f) => {
        feature = f;
        return true;
      }, { hitTolerance: 5 });

      // Clear previous selection style
      if (selectedFeature) {
        selectedFeature.setStyle(null);
      }

      setSelectedFeature(feature);
      if (feature) {
        feature.setStyle(selectedFeatureStyle);
      }
    };

    mapInstanceRef.current.on('click', handleClick);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.un('click', handleClick);
      }
    };
  }, [drawingMode, selectedFeature]);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 19
          })
        }),
        new VectorLayer({
          source: vectorSourceRef.current,
          style: new Style({
            fill: new Fill({
              color: 'rgba(76, 175, 80, 0.2)'
            }),
            stroke: new Stroke({
              color: '#4CAF50',
              width: 2
            })
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: zoomLevel
      }),
      controls: defaultControls({ zoom: false })
    });

    // Add zoom change listener
    map.getView().on('change:resolution', () => {
      setZoomLevel(Math.round(map.getView().getZoom()));
    });

    mapInstanceRef.current = map;

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (drawRef.current) {
      mapInstanceRef.current.removeInteraction(drawRef.current);
      drawRef.current = null;
    }

    if (drawingMode !== 'none') {
      const draw = new Draw({
        source: vectorSourceRef.current,
        type: drawingMode === 'rectangle' ? 'Circle' : 'Polygon',
        freehand: drawingMode === 'freehand',
        geometryFunction: drawingMode === 'rectangle' ? createBox() : undefined,
        maxPoints: drawingMode === 'rectangle' ? 2 : undefined
      });

      draw.on('drawend', (event) => {
        setSelectedFeature(event.feature);
        if (drawingMode === 'rectangle') {
          setDrawingMode('none'); // Automatically exit rectangle mode after drawing
        }
      });

      drawRef.current = draw;
      mapInstanceRef.current.addInteraction(draw);
    }
  }, [drawingMode]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (editMode) {
      const modify = new Modify({
        source: vectorSourceRef.current,
        style: vertexStyle,
        deleteCondition: (event) => {
          return event.type === 'click' && event.originalEvent.altKey;
        }
      });

      if (selectedFeature) {
        selectedFeature.setStyle(editingStyle);
      }

      modifyRef.current = modify;
      mapInstanceRef.current.addInteraction(modify);

      const statusMsg = document.querySelector('.status-message');
      if (statusMsg) {
        statusMsg.textContent = 'Alt + Click to delete vertices';
      }
    } else {
      if (modifyRef.current) {
        mapInstanceRef.current.removeInteraction(modifyRef.current);
        if (selectedFeature) {
          selectedFeature.setStyle(null);
        }
      }
      const statusMsg = document.querySelector('.status-message');
      if (statusMsg) {
        statusMsg.textContent = 'Ready';
      }
    }
  }, [editMode, selectedFeature]);

  const handleDelete = () => {
    if (selectedFeature) {
      vectorSourceRef.current.removeFeature(selectedFeature);
      setSelectedFeature(null);
      setEditMode(false); // Exit edit mode if active
    }
  };

  const handleDeleteFeature = () => {
    if (vectorSourceRef.current.getFeatures().length > 0) {
      vectorSourceRef.current.clear();
      setAoiProperties({
        area: 0,
        perimeter: 0,
        vertices: 0
      });
      dispatch({
        type: 'SET_AREA_OF_INTEREST',
        payload: null
      });
    }
  };

  // Add calculation functions
  const calculateStats = () => {
    if (!selectedFeature) return null;

    const geometry = selectedFeature.getGeometry();
    if (!geometry) return null;

    const coordinates = geometry.getCoordinates()[0];
    // Subtract 1 from length to get unique vertices (excluding the closing vertex)
    const vertexCount = coordinates.length - 1;

    // Calculate area in km²
    const area = geometry.getArea() / 1000000;

    // Calculate perimeter in km
    let perimeter = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const dx = coordinates[i + 1][0] - coordinates[i][0];
      const dy = coordinates[i + 1][1] - coordinates[i][1];
      perimeter += Math.sqrt(dx * dx + dy * dy);
    }
    perimeter = perimeter / 1000;

    return {
      vertexCount,
      area: area.toFixed(2),
      perimeter: perimeter.toFixed(2)
    };
  };

  // Add confirmation handlers
  const handleConfirmClick = () => {
    // Only show confirmation if there are features drawn
    const features = vectorSourceRef.current.getFeatures();
    if (features.length > 0) {
      setShowConfirmation(true);
    } else {
      // Maybe show an alert that no area has been drawn
      alert("Please draw an area on the map first");
    }
  };

  const handleConfirmAOI = (geoJSON) => {
    // Handle the confirmed AOI (e.g., save to state, move to next step)
    dispatch({
      type: 'SET_AOI_DATA',
      payload: geoJSON
    });

    dispatch({
      type: 'SET_WORKFLOW_STEP',
      payload: 'sensor'
    });

    setShowConfirmation(false);
  };

  // Update map based on drawing mode changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove existing interactions
    if (drawRef.current) {
      mapInstanceRef.current.removeInteraction(drawRef.current);
      drawRef.current = null;
    }

    // Add drawing interaction based on mode
    if (drawingMode !== 'none') {
      let geometryType;
      switch (drawingMode) {
        case 'polygon':
          geometryType = 'Polygon';
          break;
        case 'rectangle':
          geometryType = 'Circle';
          break;
        case 'freehand':
          geometryType = 'LineString';
          break;
        default:
          geometryType = 'Polygon';
      }

      const draw = new Draw({
        source: vectorSourceRef.current,
        type: geometryType,
        freehand: drawingMode === 'freehand'
      });

      draw.on('drawend', (event) => {
        // Clear previous drawings first
        vectorSourceRef.current.clear();

        const feature = event.feature;

        // Calculate and update AOI properties
        updateAOIProperties(feature);

        // Add to Redux state
        const format = new GeoJSON();
        const geoJSON = format.writeFeatureObject(feature, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });

        dispatch({
          type: 'SET_AREA_OF_INTEREST',
          payload: geoJSON
        });

        // Reset drawing mode
        setDrawingMode('none');
      });

      drawRef.current = draw;
      mapInstanceRef.current.addInteraction(draw);
    }
  }, [drawingMode, dispatch]);

  // Update AOI properties when a feature is drawn
  const updateAOIProperties = (feature) => {
    const geometry = feature.getGeometry();
    const areaMeters = getArea(geometry);
    const perimeterMeters = getLength(geometry);
    const vertices = geometry.getCoordinates()[0].length;

    setAoiProperties({
      area: Math.round(areaMeters / 1000000 * 100) / 100, // km²
      perimeter: Math.round(perimeterMeters / 1000 * 100) / 100, // km
      vertices: vertices - 1 // Subtract 1 because the first and last points are the same
    });
  };

  // Export AOI as GeoJSON or Shapefile
  const handleExportAOI = () => {
    const features = vectorSourceRef.current.getFeatures();
    if (!features.length) {
      alert('No area defined for export');
      return;
    }

    const format = new GeoJSON();
    const geoJSONStr = format.writeFeatures(features, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });

    if (exportFormat === 'geojson') {
      const blob = new Blob([geoJSONStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'aoi.geojson';
      a.click();
      URL.revokeObjectURL(url);
    } else if (exportFormat === 'shp') {
      // In a real application, you would use a library like shpwrite
      // to convert GeoJSON to Shapefile, or send to a server endpoint
      alert('Shapefile export would be implemented here in a production app');
    }

    setShowExportDialog(false);
  };

  // Import AOI from file
  const handleImportAOI = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const geoJSON = JSON.parse(e.target.result);
        const format = new GeoJSON();

        // Clear existing features
        vectorSourceRef.current.clear();

        // Add imported features
        const features = format.readFeatures(geoJSON, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });

        vectorSourceRef.current.addFeatures(features);

        // Update AOI properties
        if (features.length > 0) {
          updateAOIProperties(features[0]);

          // Update Redux state
          dispatch({
            type: 'SET_AREA_OF_INTEREST',
            payload: geoJSON
          });

          // Zoom to features
          const extent = vectorSourceRef.current.getExtent();
          mapInstanceRef.current.getView().fit(extent, {
            padding: [50, 50, 50, 50],
            duration: 1000
          });
        }
      } catch (error) {
        alert('Failed to parse GeoJSON file: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  // Go to coordinates
  const handleGoToCoordinates = () => {
    if (!coordinates.lat || !coordinates.lng) return;

    try {
      const lat = parseFloat(coordinates.lat);
      const lng = parseFloat(coordinates.lng);

      if (isNaN(lat) || isNaN(lng)) {
        throw new Error('Invalid coordinates');
      }

      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        throw new Error('Coordinates out of range');
      }

      const center = fromLonLat([lng, lat]);
      mapInstanceRef.current.getView().animate({
        center: center,
        zoom: 12,
        duration: 1000
      });
    } catch (error) {
      alert('Invalid coordinates: ' + error.message);
    }
  };

  // Convert DD to DMS
  const ddToDms = (dd) => {
    const absDd = Math.abs(dd);
    const degrees = Math.floor(absDd);
    const minutes = Math.floor((absDd - degrees) * 60);
    const seconds = Math.round((absDd - degrees - minutes / 60) * 3600 * 100) / 100;
    return { degrees, minutes, seconds };
  };

  // Convert DMS to DD
  const dmsToDd = (degrees, minutes, seconds) => {
    let dd = parseFloat(degrees) + parseFloat(minutes) / 60 + parseFloat(seconds) / 3600;
    if (degrees < 0 || degrees.startsWith('-')) {
      dd = -dd;
    }
    return dd;
  };

  // Format coordinates
  const formatCoordinate = (coord) => {
    const { degrees, minutes, seconds } = ddToDms(coord);
    return `${degrees}° ${minutes}' ${seconds}"`;
  };

  useEffect(() => {
    // Expose methods to window for StatusBar to access
    window.getCurrentAOIFeatures = () => vectorSourceRef.current.getFeatures();
    window.showAOIConfirmation = () => setShowConfirmation(true);

    return () => {
      delete window.getCurrentAOIFeatures;
      delete window.showAOIConfirmation;
    };
  }, []);

  return (
    <div className={`aoi-selection ${compactMode ? 'compact-mode' : ''}`}>
      <div className="aoi-header">
      <h2>Area of Interest Selection</h2>
        <p>Define the coastal area you want to analyze by drawing a polygon on the map</p>
              <button
          className="compact-toggle"
          onClick={() => setCompactMode(!compactMode)}
          title={compactMode ? "Expand sidebar" : "Collapse sidebar"}
        >
          {compactMode ? '→' : '←'}
              </button>
            </div>

      <div className="aoi-main">
        <div className="map-controls">
          <div className="control-section">
            <h3>BASE LAYERS</h3>
            <div className="basemap-selector">
              <button
                className={activeBasemap === 'OSM' ? 'active' : ''}
                onClick={() => handleBasemapChange('OSM')}
              >
                <div className="button-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1"/>
                    <circle cx="12" cy="9" r="2.5" fill="#242424"/>
                  </svg>
                </div>
                <div className="button-text">OSM</div>
              </button>
              <button
                className={activeBasemap === 'Satellite' ? 'active' : ''}
                onClick={() => handleBasemapChange('Satellite')}
              >
                <div className="button-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="1.5" fill="none"/>
                    <circle cx="12" cy="12" r="4" fill="#FFFFFF"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                      fill="#FFFFFF" fillOpacity="0.6"/>
                  </svg>
                </div>
                <div className="button-text">Satellite</div>
              </button>
              <button
                className={activeBasemap === 'Topo' ? 'active' : ''}
                onClick={() => handleBasemapChange('Topo')}
              >
                <div className="button-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 6l-4.22 5.63 1.25 1.67L14 9.33 19 16h-8.46l-4.01-5.37L1 18h22L14 6z"
                      fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="0.5"/>
                  </svg>
                </div>
                <div className="button-text">Topo</div>
              </button>
            </div>
            </div>

          <div className="control-section">
            <h3>DRAWING TOOLS</h3>
            <div className="drawing-tools">
              <button
                className={drawingMode === 'polygon' ? 'active' : ''}
                onClick={() => handleDrawingMode('polygon')}
              >
                <div className="button-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="4" height="4" fill="#FFFFFF" />
                    <rect x="16" y="4" width="4" height="4" fill="#FFFFFF" />
                    <rect x="4" y="16" width="4" height="4" fill="#FFFFFF" />
                    <rect x="16" y="16" width="4" height="4" fill="#FFFFFF" />
                    <line x1="6" y1="8" x2="6" y2="16" stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="18" y1="8" x2="18" y2="16" stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="8" y1="6" x2="16" y2="6" stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="8" y1="18" x2="16" y2="18" stroke="#FFFFFF" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="button-text">Polygon</div>
              </button>
              <button
                className={drawingMode === 'rectangle' ? 'active' : ''}
                onClick={() => handleDrawingMode('rectangle')}
              >
                <div className="button-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="16" height="16" stroke="#FFFFFF" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div className="button-text">Rectangle</div>
              </button>
              <button
                className={drawingMode === 'freehand' ? 'active' : ''}
                onClick={() => handleDrawingMode('freehand')}
              >
                <div className="button-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="#FFFFFF" />
                    <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#FFFFFF" />
                  </svg>
                </div>
                <div className="button-text">Freehand</div>
              </button>
              <button
                className={vectorSourceRef.current.getFeatures().length === 0 ? 'disabled' : ''}
                onClick={handleDeleteFeature}
                disabled={vectorSourceRef.current.getFeatures().length === 0}
              >
                <div className="button-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z" fill="#FFFFFF" />
                    <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#FFFFFF" />
                  </svg>
                </div>
                <div className="button-text">Delete</div>
              </button>
            </div>
          </div>

          <div className="control-section">
            <h3>COORDINATES</h3>
            <div className="coordinate-format">
              <label>
                <input
                  type="radio"
                  name="coordinateFormat"
                  checked={coordinateFormat === 'dd'}
                  onChange={() => setCoordinateFormat('dd')}
                />
                Decimal Degrees
              </label>
              <label>
                <input
                  type="radio"
                  name="coordinateFormat"
                  checked={coordinateFormat === 'dms'}
                  onChange={() => setCoordinateFormat('dms')}
                />
                DMS
              </label>
            </div>
              <button
              className="coordinate-button"
              onClick={() => setShowCoordinateInput(!showCoordinateInput)}
            >
              📍 Enter Coordinates
              </button>

            {showCoordinateInput && (
              <div className="coordinate-input">
                <div className="input-group">
                  <label>Latitude:</label>
                  <input
                    type="text"
                    value={coordinates.lat}
                    onChange={(e) => setCoordinates({...coordinates, lat: e.target.value})}
                    placeholder={coordinateFormat === 'dd' ? "e.g. 37.7749" : "e.g. 37° 46' 30\""}
                  />
            </div>
                <div className="input-group">
                  <label>Longitude:</label>
                  <input
                    type="text"
                    value={coordinates.lng}
                    onChange={(e) => setCoordinates({...coordinates, lng: e.target.value})}
                    placeholder={coordinateFormat === 'dd' ? "e.g. -122.4194" : "e.g. -122° 25' 10\""}
                  />
          </div>
                <button onClick={handleGoToCoordinates}>Go to Location</button>
        </div>
            )}
      </div>

          <div className="control-section">
            <h3>BUFFER DISTANCE</h3>
            <div className="buffer-controls">
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={bufferDistance}
                onChange={(e) => setBufferDistance(parseFloat(e.target.value))}
              />
              <span className="buffer-value">{bufferDistance} km</span>
            </div>
          </div>

          <div className="control-section">
            <h3>AOI PROPERTIES</h3>
      <div className="aoi-properties">
              <div className="property">
                <span className="property-label">Area:</span>
                <span className="property-value">{aoiProperties.area} km²</span>
            </div>
              <div className="property">
                <span className="property-label">Perimeter:</span>
                <span className="property-value">{aoiProperties.perimeter} km</span>
            </div>
              <div className="property">
                <span className="property-label">Vertices:</span>
                <span className="property-value">{aoiProperties.vertices}</span>
            </div>
            </div>
      </div>

          <div className="control-section">
            <h3>IMPORT/EXPORT</h3>
            <div className="import-export">
              <label className="file-input-label">
                <input
                  type="file"
                  accept=".geojson,.json"
                  onChange={handleImportAOI}
                  className="hidden-file-input"
                />
                <span>📤 Import</span>
              </label>
              <button
                onClick={() => setShowExportDialog(true)}
                disabled={vectorSourceRef.current.getFeatures().length === 0}
              >
                📥 Export
              </button>
            </div>
          </div>
        </div>

        <div className="map-container">
          <div ref={mapRef} className="map"></div>
          <div id="mouse-position" className="mouse-position"></div>
          <div className="zoom-controls">
            <button onClick={() => handleZoom(1)}>+</button>
            <span>{zoomLevel}</span>
            <button onClick={() => handleZoom(-1)}>-</button>
          </div>
        </div>
      </div>

      {showExportDialog && (
        <div className="export-dialog">
          <div className="export-content">
            <h3>Export AOI</h3>
            <div className="export-options">
              <label>
                <input
                  type="radio"
                  name="exportFormat"
                  value="geojson"
                  checked={exportFormat === 'geojson'}
                  onChange={() => setExportFormat('geojson')}
                />
                GeoJSON
              </label>
              <label>
                <input
                  type="radio"
                  name="exportFormat"
                  value="shp"
                  checked={exportFormat === 'shp'}
                  onChange={() => setExportFormat('shp')}
                />
                Shapefile
              </label>
            </div>
            <div className="export-actions">
              <button onClick={() => setShowExportDialog(false)}>Cancel</button>
              <button className="primary-button" onClick={handleExportAOI}>Export</button>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <AOIConfirmation
          features={vectorSourceRef.current.getFeatures()}
          onConfirm={handleConfirmAOI}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

      <style>{`
        .aoi-selection {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #242424;
          color: #fff;
        }

        .aoi-header {
          padding: 1rem;
          border-bottom: 1px solid #333;
        }

        .aoi-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 500;
        }

        .aoi-header p {
          margin: 0.5rem 0 0;
          color: #aaa;
          font-size: 0.9rem;
        }

        .aoi-main {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .map-controls {
          width: 280px;
          background: #1a1a1a;
          border-right: 1px solid #333;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .control-section {
          border: 1px solid #333;
          border-radius: 4px;
          padding: 0.75rem;
          background: #1a1a1a;
        }

        .control-section h3 {
          margin: 0 0 0.75rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #ddd;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .basemap-selector,
        .drawing-tools {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .import-export {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .basemap-selector button,
        .drawing-tools button {
          position: relative;
          width: 100%;
          height: 40px;
          background-color: #242424;
          border: none;
          border-radius: 4px;
          padding: 0;
          margin: 0 0 0.5rem 0;
          cursor: pointer;
          text-align: left;
          box-sizing: border-box;
        }

        .basemap-selector button.active,
        .drawing-tools button.active {
          background-color: #4CAF50;
          color: white;
          width: 60px !important;
          height: 40px;
        }

        .button-icon {
          position: absolute;
          left: 0;
          top: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.3);
        }

        .button-text {
          position: absolute;
          left: 40px;
          top: 0;
          right: 0;
          height: 40px;
          display: flex;
          align-items: center;
          padding-left: 10px;
          color: #ddd;
        }

        .compact-mode .basemap-selector button,
        .compact-mode .drawing-tools button {
          width: 40px;
        }

        .compact-mode .button-text {
          display: none !important;
        }

        .compact-toggle {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          background: #333;
          border: none;
          border-radius: 4px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        .aoi-header {
          position: relative;
        }

        .coordinate-button,
        .import-export button,
        .file-input-label {
          background: #242424;
          color: #ddd;
          border: none;
          border-radius: 4px;
          padding: 0.5rem;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .hidden-file-input {
          display: none;
        }

        .file-input-label {
          cursor: pointer;
        }

        .coordinate-format {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .coordinate-format label {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.85rem;
          color: #ddd;
        }

        .coordinate-button {
          width: 100%;
        }

        .coordinate-input {
          padding: 0.75rem;
          background: #333;
          border-radius: 4px;
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .input-group label {
          font-size: 0.8rem;
          color: #bbb;
        }

        .input-group input {
          background: #444;
          border: 1px solid #555;
          color: white;
          padding: 0.35rem 0.5rem;
          border-radius: 3px;
          font-size: 0.85rem;
        }

        .buffer-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .buffer-controls input {
          flex: 1;
          accent-color: #4CAF50;
        }

        .buffer-value {
          font-size: 0.85rem;
          color: #ddd;
          min-width: 45px;
        }

        .aoi-properties {
          background: #333;
          border-radius: 4px;
          padding: 0.75rem;
        }

        .property {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          padding: 0.25rem 0;
        }

        .property-label {
          color: #bbb;
        }

        .property-value {
          font-weight: 500;
          color: #ddd;
        }

        .map-container {
          flex: 1;
          position: relative;
          background: #333;
        }

        .map {
          width: 100%;
          height: 100%;
        }

        .mouse-position {
          position: absolute;
          bottom: 5px;
          left: 10px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          pointer-events: none;
        }

        .zoom-controls {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4px;
        }

        .zoom-controls button {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          font-size: 1.2rem;
          background: transparent;
        }

        .zoom-controls span {
          margin: 4px 0;
          font-size: 0.8rem;
        }

        .export-dialog {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .export-content {
          background: #333;
          border-radius: 8px;
          padding: 1.5rem;
          width: 300px;
        }

        .export-content h3 {
          margin: 0 0 1rem;
          font-size: 1.2rem;
        }

        .export-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .export-options label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .export-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .primary-button {
          background: #4CAF50;
          color: white;
        }

        .primary-button:hover {
          background: #45a049;
        }

        /* Responsive behavior */
        @media (max-width: 768px) {
          .map-controls {
            width: 60px;
          }

          .control-section h3 {
            font-size: 0.7rem;
            text-align: center;
          }

          .button-text {
            display: none;
          }

          .basemap-selector button,
          .drawing-tools button {
            width: 40px;
            justify-content: center;
          }
        }

        /* Compact mode class that can be toggled */
        .compact-mode .map-controls {
          width: 60px;
        }

        .compact-mode .control-section h3 {
          font-size: 0.7rem;
          text-align: center;
        }

        .compact-mode .button-text {
          display: none;
        }

        .compact-mode .basemap-selector button,
        .compact-mode .drawing-tools button {
          width: 40px;
          justify-content: center;
        }

        .compact-toggle {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          background: #333;
          border: none;
          border-radius: 4px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        .aoi-header {
          position: relative;
        }

        /* Compact mode button styling fixes */
        .compact-mode .basemap-selector button,
        .compact-mode .drawing-tools button {
          width: 40px;
        }

        .compact-mode .basemap-selector button.active,
        .compact-mode .drawing-tools button.active {
          width: 40px; /* Keep width consistent in active state */
        }

        /* Active state icon background */
        .basemap-selector button.active .button-icon {
          background: rgba(0, 0, 0, 0.2);
        }

        .basemap-selector button.active .button-icon,
        .drawing-tools button.active .button-icon {
          background: transparent;
        }

        .basemap-selector button:hover,
        .drawing-tools button:hover {
          background: #333;
        }

        .basemap-selector button.active:hover,
        .drawing-tools button.active:hover {
          background: #45a049;
        }

        /* Hide text when button is active */
        .basemap-selector button.active .button-text,
        .drawing-tools button.active .button-text {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
