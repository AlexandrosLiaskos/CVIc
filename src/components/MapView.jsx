import { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import Draw from 'ol/interaction/Draw';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import { useSelector, useDispatch } from 'react-redux';

export default function MapView() {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const { currentStep } = useSelector(state => state.workflow);
  const vectorSourceRef = useRef(new VectorSource());
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    let map;
    const initMap = () => {
      try {

        const map = new Map({
          target: mapRef.current,
          layers: [
            new TileLayer({
              source: new OSM()
            }),
            new VectorLayer({
              source: vectorSourceRef.current
            })
          ],
          view: new View({
            // Center on Europe by default (convert from lon/lat to web mercator)
            center: fromLonLat([15, 50]),
            zoom: 4,
            projection: 'EPSG:3857'
          })
        });

        mapInstanceRef.current = map;

        // Add drawing interaction when in AOI selection mode
        if (currentStep === 'aoi') {
          addDrawInteraction(map);
        }
      } catch (error) {
        console.error('Map initialization error:', error);
      }
    };

    // Initialize map
    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
      }
    };
  }, [currentStep]);

  const addDrawInteraction = (map) => {
    const draw = new Draw({
      source: vectorSourceRef.current,
      type: 'Polygon',
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
      })
    });

    draw.on('drawend', (event) => {
      const feature = event.feature;
        dispatch({
          type: 'SET_AREA_OF_INTEREST',
          payload: feature.getGeometry()
        });
    });

    map.addInteraction(draw);
  };

  return (
    <div className="map-view">
      <div ref={mapRef} className="map-container" style={{ height: '100%', width: '100%' }}></div>
      {!mapInstanceRef.current && (
        <div className="map-loading">
          <span>Loading map...</span>
        </div>
      )}
    </div>
  );
}
