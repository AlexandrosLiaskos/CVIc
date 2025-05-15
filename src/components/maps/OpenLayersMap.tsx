import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import { fromLonLat } from 'ol/proj';
import { getCenter } from 'ol/extent';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { Style, Stroke } from 'ol/style';
import { ProcessedImage } from '../../services/imageProcessor';
import { FeatureCollection } from 'geojson';
import BaseLayer from 'ol/layer/Base';

interface OpenLayersMapProps {
  images?: ProcessedImage[];
  geoJSON?: FeatureCollection | null;
  onMapClick?: (event: any) => void;
  onMapReady?: (map: Map) => void;
}

const OpenLayersMap: React.FC<OpenLayersMapProps> = ({
  images = [],
  geoJSON,
  onMapClick,
  onMapReady,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [imageLayers, setImageLayers] = useState<BaseLayer[]>([]);
  const [geoJSONLayer, setGeoJSONLayer] = useState<VectorLayer<VectorSource> | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // Create base map with OSM
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    // Create map instance
    const mapInstance = new Map({
      target: mapRef.current,
      layers: [osmLayer],
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

    // Store map instance
    mapInstanceRef.current = mapInstance;

    // Notify parent component that map is ready
    if (onMapReady) {
      onMapReady(mapInstance);
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [onMapClick, onMapReady]);

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
    if (!mapInstanceRef.current) return;

    // Remove existing GeoJSON layer
    if (geoJSONLayer) {
      mapInstanceRef.current.removeLayer(geoJSONLayer);
      setGeoJSONLayer(null);
    }

    // Add new GeoJSON layer if available
    if (geoJSON) {
      try {
        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(geoJSON, {
            featureProjection: 'EPSG:3857', // Web Mercator
          }),
        });

        const newGeoJSONLayer = new VectorLayer({
          source: vectorSource,
          style: new Style({
            stroke: new Stroke({
              color: '#ff0000',
              width: 2,
            }),
          }),
        });

        mapInstanceRef.current?.addLayer(newGeoJSONLayer);
        setGeoJSONLayer(newGeoJSONLayer);

        // Fit map to GeoJSON extent
        const extent = vectorSource.getExtent();
        if (extent && extent.some(value => value !== Infinity && value !== -Infinity)) {
          mapInstanceRef.current?.getView()?.fit(extent, {
            padding: [50, 50, 50, 50],
            maxZoom: 18,
          });
        }
      } catch (error) {
        console.error(`Error adding GeoJSON layer: ${error}`);
      }
    }
  }, [geoJSON]);

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

export default OpenLayersMap;
