import { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke } from 'ol/style';

export default function AOIConfirmation({ features, onConfirm, onCancel }) {
  const mapRef = useRef();
  const vectorSourceRef = useRef(new VectorSource());

  // Convert features to GeoJSON
  const geoJSON = new GeoJSON().writeFeaturesObject(features, {
    featureProjection: 'EPSG:3857',
    dataProjection: 'EPSG:4326'
  });

  useEffect(() => {
    if (!mapRef.current) return;

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
        zoom: 2
      }),
      controls: []
    });

    // Add features to map
    const format = new GeoJSON();
    const parsedFeatures = format.readFeatures(geoJSON, {
      featureProjection: 'EPSG:3857'
    });
    vectorSourceRef.current.addFeatures(parsedFeatures);

    // Fit view to features
    const extent = vectorSourceRef.current.getExtent();
    map.getView().fit(extent, {
      padding: [50, 50, 50, 50],
      maxZoom: 16
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div className="aoi-confirmation">
      <div className="confirmation-header">
        <h3>Confirm Area of Interest</h3>
        <div className="aoi-summary">
          <div className="summary-item">
            <span>Total Areas:</span>
            <span>{features.length}</span>
          </div>
          <div className="summary-item">
            <span>Total Vertices:</span>
            <span>{features.reduce((sum, f) =>
              sum + f.getGeometry().getCoordinates()[0].length - 1, 0)}</span>
          </div>
        </div>
      </div>

      <div className="confirmation-content">
        <div className="minimap" ref={mapRef}></div>
        <div className="aoi-details">
          <div className="details-header">
            <h4>GeoJSON Details</h4>
            <span className="details-info">Coordinates in EPSG:4326 (WGS84)</span>
          </div>
          <div className="geojson-preview">
            <pre>{JSON.stringify(geoJSON, null, 2)}</pre>
          </div>
        </div>
      </div>

      <div className="confirmation-footer">
        <div className="footer-info">
          <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Review the selected area before proceeding to sensor selection</span>
        </div>
        <div className="confirmation-actions">
          <button className="secondary-button" onClick={onCancel}>
            Back to Edit
          </button>
          <button className="primary-button" onClick={() => onConfirm(geoJSON)}>
            Confirm AOI
          </button>
        </div>
      </div>
    </div>
  );
}
