import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      if (drawingMode !== 'none' || editMode) return; // Don't select while drawing or editing

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
  }, [drawingMode, editMode, selectedFeature]);

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

  const handleDeleteClick = () => {
    if (!selectedFeature) {
      // If no feature is selected, enable selection mode
      setDrawingMode('none');
      setEditMode(false);
    } else {
      // If a feature is selected, delete it
      handleDelete();
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
  const handleConfirm = (geoJSON) => {
    dispatch({
      type: 'SET_AREA_OF_INTEREST',
      payload: geoJSON
    });
    dispatch({
      type: 'SET_WORKFLOW_STEP',
      payload: 'sensor'
    });
  };

  // Add this effect to handle the confirmation event
  useEffect(() => {
    const handleConfirmationRequest = () => {
      const features = vectorSourceRef.current.getFeatures();
      if (features.length === 0) {
        alert('Please draw at least one area of interest');
        return;
      }
      setShowConfirmation(true);
    };

    window.addEventListener('showAOIConfirmation', handleConfirmationRequest);

    return () => {
      window.removeEventListener('showAOIConfirmation', handleConfirmationRequest);
    };
  }, []);

  return (
    <div className="aoi-selection">
      <h2>Area of Interest Selection</h2>

      <div className="map-container" ref={mapRef}>
        <div className="map-toolbar">
          <div className="toolbar-controls">
            <div className="zoom-controls">
              <button
                title="Zoom In"
                onClick={() => handleZoom(1)}
              >
                ➕
              </button>
              <button
                title="Zoom Out"
                onClick={() => handleZoom(-1)}
              >
                ➖
              </button>
            </div>

            <div className="tool-divider"></div>

            <div className="basemap-selector">
              <button
                title="OpenStreetMap"
                className={activeBasemap === 'OSM' ? 'active' : ''}
                onClick={() => handleBasemapChange('OSM')}
              >
                🗺️
              </button>
              <button
                title="Satellite"
                className={activeBasemap === 'Satellite' ? 'active' : ''}
                onClick={() => handleBasemapChange('Satellite')}
              >
                🛰️
              </button>
              <button
                title="Topographic"
                className={activeBasemap === 'Topo' ? 'active' : ''}
                onClick={() => handleBasemapChange('Topo')}
              >
                ⛰️
              </button>
            </div>

            <div className="tool-divider"></div>

            <div className="drawing-tools">
              <button
                title="Draw Polygon"
                className={drawingMode === 'polygon' ? 'active' : ''}
                onClick={() => handleDrawingMode('polygon')}
                disabled={editMode}
              >
                ⬡
              </button>
              <button
                title="Draw Rectangle"
                className={drawingMode === 'rectangle' ? 'active' : ''}
                onClick={() => handleDrawingMode('rectangle')}
                disabled={editMode}
              >
                ⬜
              </button>
              <button
                title="Freehand Drawing"
                className={drawingMode === 'freehand' ? 'active' : ''}
                onClick={() => handleDrawingMode('freehand')}
                disabled={editMode}
              >
                ✏️
              </button>

              <div className="tool-divider"></div>

              <button
                title="Edit Shape (Alt + Click to delete vertices)"
                className={editMode ? 'active' : ''}
                onClick={() => setEditMode(!editMode)}
                disabled={!selectedFeature}
              >
                ✎
              </button>
              <button
                title="Delete Selected"
                onClick={handleDeleteClick}
                disabled={editMode}
                className={`delete-button ${selectedFeature ? 'active' : ''}`}
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="aoi-properties">
        {selectedFeature && calculateStats() && (
          <>
            <div className="stat-item">
              <span>Area:</span>
              <span>{calculateStats().area} km²</span>
            </div>
            <div className="stat-item">
              <span>Perimeter:</span>
              <span>{calculateStats().perimeter} km</span>
            </div>
            <div className="stat-item">
              <span>Total Vertices:</span>
              <span>{calculateStats().vertexCount}</span>
            </div>
          </>
        )}
      </div>

      {showConfirmation && (
        <>
          <div className="confirmation-backdrop" />
          <AOIConfirmation
            features={vectorSourceRef.current.getFeatures()}
            onConfirm={handleConfirm}
            onCancel={() => setShowConfirmation(false)}
          />
        </>
      )}
    </div>
  );
}
