import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import { fromLonLat, toLonLat } from 'ol/proj';
import { getCenter } from 'ol/extent';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { Style, Stroke } from 'ol/style';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import Snap from 'ol/interaction/Snap';
import { LineString } from 'ol/geom';
import { ProcessedImage } from '../../services/imageProcessor';
import { FeatureCollection } from 'geojson';
import BaseLayer from 'ol/layer/Base';

interface OpenLayersDrawableMapProps {
  images?: ProcessedImage[];
  geoJSON?: FeatureCollection | null;
  drawingEnabled?: boolean;
  readOnly?: boolean;
  onMapClick?: (event: any) => void;
  onMapReady?: (map: Map) => void;
  onFeatureDrawn?: (feature: any) => void;
}

const OpenLayersDrawableMap: React.FC<OpenLayersDrawableMapProps> = ({
  images = [],
  geoJSON,
  drawingEnabled = true,
  readOnly = false,
  onMapClick,
  onMapReady,
  onFeatureDrawn,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [imageLayers, setImageLayers] = useState<BaseLayer[]>([]);
  const [vectorLayer, setVectorLayer] = useState<VectorLayer<VectorSource> | null>(null);
  const drawInteractionRef = useRef<Draw | null>(null);
  const modifyInteractionRef = useRef<Modify | null>(null);
  const snapInteractionRef = useRef<Snap | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // Create base map with OSM
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    // Create vector source for drawing
    const source = new VectorSource();

    // Create vector layer for features
    const vector = new VectorLayer({
      source: source,
      style: new Style({
        stroke: new Stroke({
          color: '#ff0000',
          width: 2,
        }),
      }),
    });

    // Create map instance
    const mapInstance = new Map({
      target: mapRef.current,
      layers: [osmLayer, vector],
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:3857', // Web Mercator
      }),
    });

    // Add click handler if provided
    if (onMapClick) {
      mapInstance.on('click', onMapClick);
    }

    // Add drawing interaction if enabled
    if (drawingEnabled && !readOnly) {
      const drawInteraction = new Draw({
        source: source,
        type: 'LineString',
      });

      // Add event listener for when drawing ends
      drawInteraction.on('drawend', (event) => {
        if (onFeatureDrawn) {
          // Get the feature
          const feature = event.feature;

          // Get the geometry as LineString
          const geometry = feature.getGeometry() as LineString;

          // Convert coordinates from EPSG:3857 to EPSG:4326 (WGS84)
          const coordinates = geometry.getCoordinates().map(coord =>
            toLonLat(coord)
          );

          // Create a GeoJSON feature
          const geoJSONFeature = {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coordinates,
            },
            properties: {},
          };

          onFeatureDrawn(geoJSONFeature);
        }
      });

      mapInstance.addInteraction(drawInteraction);
      drawInteractionRef.current = drawInteraction;

      // Add modify interaction for editing existing features
      const modifyInteraction = new Modify({
        source: source,
      });
      mapInstance.addInteraction(modifyInteraction);
      modifyInteractionRef.current = modifyInteraction;

      // Add snap interaction for better drawing experience
      const snapInteraction = new Snap({
        source: source,
      });
      mapInstance.addInteraction(snapInteraction);
      snapInteractionRef.current = snapInteraction;
    }

    // Store map instance
    mapInstanceRef.current = mapInstance;
    setVectorLayer(vector);

    // Notify parent component that map is ready
    if (onMapReady) {
      onMapReady(mapInstance);
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        if (drawInteractionRef.current) {
          mapInstanceRef.current.removeInteraction(drawInteractionRef.current);
        }
        if (modifyInteractionRef.current) {
          mapInstanceRef.current.removeInteraction(modifyInteractionRef.current);
        }
        if (snapInteractionRef.current) {
          mapInstanceRef.current.removeInteraction(snapInteractionRef.current);
        }
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [drawingEnabled, onMapClick, onMapReady, readOnly, onFeatureDrawn]);

  // Handle images
  useEffect(() => {
    if (!mapInstanceRef.current || !images.length) return;

    // Remove existing image layers
    imageLayers.forEach(layer => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    const newLayers: BaseLayer[] = [];

    // Add new image layers
    images.forEach(image => {
      try {
        if (image.url && image.bounds) {
          console.log(`Processing image: ${image.id}, ${image.name}`);

          // Get the bounds in the correct format for OpenLayers
          // OpenLayers expects [minX, minY, maxX, maxY] which is [west, south, east, north]
          const bounds = [
            image.bounds[0], // west
            image.bounds[1], // south
            image.bounds[2], // east
            image.bounds[3]  // north
          ];

          // Convert bounds to Web Mercator projection
          const bottomLeft = fromLonLat([bounds[0], bounds[1]]);
          const topRight = fromLonLat([bounds[2], bounds[3]]);
          const extent = [bottomLeft[0], bottomLeft[1], topRight[0], topRight[1]];

          // Create an image layer using the URL
          const imageLayer = new ImageLayer({
            source: new Static({
              url: image.url,
              imageExtent: extent,
              projection: 'EPSG:3857'
            }),
            opacity: 0.8
          });

          // Add layer to map
          mapInstanceRef.current?.addLayer(imageLayer);
          newLayers.push(imageLayer);

          // Center map on the image
          const center = getCenter(extent);
          const view = mapInstanceRef.current?.getView();
          view?.setCenter(center);

          // Calculate appropriate zoom level based on extent size
          const width = extent[2] - extent[0];
          const height = extent[3] - extent[1];
          const resolution = Math.max(width, height) / Math.min(window.innerWidth, window.innerHeight);
          const zoom = view?.getZoomForResolution(resolution * 1.2); // 1.2 is a buffer factor

          if (zoom) {
            view?.setZoom(zoom);
          } else {
            view?.setZoom(12); // Fallback zoom level
          }

          console.log(`Centered map on image: ${center}, zoom: ${zoom}`);
        }
      } catch (error) {
        console.error(`Error adding image layer: ${error}`);
      }
    });

    // Store new layers
    setImageLayers(newLayers);
  }, [images]);

  // Handle GeoJSON
  useEffect(() => {
    if (!mapInstanceRef.current || !vectorLayer) return;

    // Clear existing features
    vectorLayer?.getSource()?.clear();

    // Add GeoJSON features if available
    if (geoJSON && geoJSON.features.length > 0) {
      try {
        const features = new GeoJSON().readFeatures(geoJSON, {
          featureProjection: 'EPSG:3857', // Web Mercator
        });

        vectorLayer?.getSource()?.addFeatures(features);

        // Fit map to features extent
        const extent = vectorLayer?.getSource()?.getExtent();
        if (extent && extent.some(value => value !== Infinity && value !== -Infinity)) {
          mapInstanceRef.current?.getView()?.fit(extent, {
            padding: [50, 50, 50, 50],
            maxZoom: 18,
          });
        }
      } catch (error) {
        console.error(`Error adding GeoJSON features: ${error}`);
      }
    }
  }, [geoJSON, vectorLayer]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    />
  );
};

export default OpenLayersDrawableMap;
