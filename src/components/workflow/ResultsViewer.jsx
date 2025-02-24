import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

export default function ResultsViewer() {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const { sensorConfig } = useSelector(state => state.workflow);
  const [activeLayer, setActiveLayer] = useState('all');
  const [layerOpacity, setLayerOpacity] = useState({
    rawImagery: 1,
    waterMask: 0.7,
    shoreline: 1
  });

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
        // Additional layers will be added here when real data is available
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  const handleOpacityChange = (layer, value) => {
    setLayerOpacity(prev => ({
      ...prev,
      [layer]: value
    }));
    // Update layer opacity in the map
  };

  const handleLayerToggle = (layer) => {
    setActiveLayer(layer);
    // Toggle layer visibility in the map
  };

  return (
    <div className="results-viewer">
      <h2>Results Viewer</h2>

      <div className="viewer-container">
        <div className="map-container" ref={mapRef}></div>

        <div className="layer-controls">
          <h3>Layer Controls</h3>

          <div className="layer-toggles">
            <button
              className={activeLayer === 'all' ? 'active' : ''}
              onClick={() => handleLayerToggle('all')}
            >
              All Layers
            </button>
            <button
              className={activeLayer === 'rawImagery' ? 'active' : ''}
              onClick={() => handleLayerToggle('rawImagery')}
            >
              Raw Imagery
            </button>
            <button
              className={activeLayer === 'waterMask' ? 'active' : ''}
              onClick={() => handleLayerToggle('waterMask')}
            >
              Water Mask
            </button>
            <button
              className={activeLayer === 'shoreline' ? 'active' : ''}
              onClick={() => handleLayerToggle('shoreline')}
            >
              Shoreline
            </button>
          </div>

          <div className="opacity-controls">
            <div className="opacity-slider">
              <label>Raw Imagery Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={layerOpacity.rawImagery}
                onChange={(e) => handleOpacityChange('rawImagery', e.target.value)}
              />
              <span>{Math.round(layerOpacity.rawImagery * 100)}%</span>
            </div>

            <div className="opacity-slider">
              <label>Water Mask Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={layerOpacity.waterMask}
                onChange={(e) => handleOpacityChange('waterMask', e.target.value)}
              />
              <span>{Math.round(layerOpacity.waterMask * 100)}%</span>
            </div>

            <div className="opacity-slider">
              <label>Shoreline Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={layerOpacity.shoreline}
                onChange={(e) => handleOpacityChange('shoreline', e.target.value)}
              />
              <span>{Math.round(layerOpacity.shoreline * 100)}%</span>
            </div>
          </div>
        </div>

        <div className="results-info">
          <h3>Processing Results</h3>

          <div className="info-section">
            <h4>Shoreline Statistics</h4>
            <div className="stat-item">
              <label>Total Length:</label>
              <span>123.45 km</span>
            </div>
            <div className="stat-item">
              <label>Segments:</label>
              <span>15</span>
            </div>
            <div className="stat-item">
              <label>Average Width:</label>
              <span>25.3 m</span>
            </div>
          </div>

          <div className="info-section">
            <h4>Processing Parameters</h4>
            <div className="stat-item">
              <label>Sensor:</label>
              <span>{sensorConfig.sensorType}</span>
            </div>
            <div className="stat-item">
              <label>Date Range:</label>
              <span>{sensorConfig.temporalParams.startDate} - {sensorConfig.temporalParams.endDate}</span>
            </div>
            <div className="stat-item">
              <label>Water Index:</label>
              <span>{sensorConfig.parameters?.waterIndex || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="workflow-actions">
        <button onClick={() => dispatch({ type: 'SET_WORKFLOW_STEP', payload: 'processing' })}>
          Back
        </button>
        <button
          className="primary-button"
          onClick={() => dispatch({ type: 'SET_WORKFLOW_STEP', payload: 'export' })}
        >
          Next: Export Results
        </button>
      </div>
    </div>
  );
}
