import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import type { FeatureCollection, LineString, Feature, GeoJsonObject } from 'geojson';
import type { ProcessedImage } from '../../services/imageProcessor';

interface EnhancedLeafletMapProps {
  images?: ProcessedImage[];
  geoJSON?: FeatureCollection | null;
  initialBounds?: number[] | null; // [minX, minY, maxX, maxY]
  onLineStringCreate?: (lineString: LineString) => void;
  onLineStringDelete?: (id: string) => void;
  drawingEnabled?: boolean;
  readOnly?: boolean;
}

const EnhancedLeafletMap: React.FC<EnhancedLeafletMapProps> = ({
  images = [],
  geoJSON = null,
  initialBounds = null,
  onLineStringCreate,
  onLineStringDelete,
  drawingEnabled = true,
  readOnly = false,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const drawControlRef = useRef<L.Control.Draw | null>(null);
  const geoJSONLayerRef = useRef<L.GeoJSON | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const imageLayersRef = useRef<any[]>([]); // Can be L.ImageOverlay or GeoRasterLayer
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Initialize the map
  useEffect(() => {
    try {
      const mapInstance = L.map('enhanced-leaflet-map', {
        center: [20, 0],
        zoom: 2,
        zoomControl: true,
      });
      mapRef.current = mapInstance;

      // Add base tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);

      // Create feature group for drawn items
      const drawnItemsInstance = new L.FeatureGroup();
      mapInstance.addLayer(drawnItemsInstance);
      drawnItemsRef.current = drawnItemsInstance;

      setIsMapInitialized(true);
      console.log('EnhancedLeafletMap: Map instance created.');

    } catch (error) {
      console.error("EnhancedLeafletMap: Error initializing map:", error);
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        console.log('EnhancedLeafletMap: Cleaning up map instance.');
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Set initial bounds if provided
  useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !isMapInitialized) return;

    if (initialBounds) {
      console.log('EnhancedLeafletMap: Setting initial bounds.');
      mapInstance.fitBounds([
        [initialBounds[1], initialBounds[0]], // Southwest corner [lat, lng]
        [initialBounds[3], initialBounds[2]]  // Northeast corner [lat, lng]
      ]);
    }
  }, [initialBounds, isMapInitialized]);

  // Add satellite images to the map
  useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !isMapInitialized) return;

    // Remove existing image layers
    imageLayersRef.current.forEach(layer => {
      if (Array.isArray(layer)) {
        // Handle arrays of layers (for Sentinel-2 images)
        layer.forEach(subLayer => {
          mapInstance.removeLayer(subLayer);
        });
      } else {
        // Handle single layers
        mapInstance.removeLayer(layer);
      }
    });
    imageLayersRef.current = [];

    // Add new image layers
    if (images && images.length > 0) {
      console.log(`EnhancedLeafletMap: Adding ${images.length} satellite images to map.`);

      const newImageLayers: any[] = [];
      const bounds = L.latLngBounds([]);

      images.forEach(async (image) => {
        try {
          let layer;

          if (image.georaster) {
            // If we have a georaster, use GeoRasterLayer
            console.log(`Using GeoRasterLayer for image ${image.id}`);

            try {
              // Create a GeoRasterLayer with the georaster
              const geoRasterLayer = new GeoRasterLayer({
                georaster: image.georaster,
                opacity: 0.8,
                resolution: 256
              });

              // Add to map
              geoRasterLayer.addTo(mapInstance);
              console.log('GeoRasterLayer added to map');

              // Store the layer
              layer = geoRasterLayer;

              // Get bounds from the georaster
              const georasterBounds = [
                [image.georaster.ymin, image.georaster.xmin], // Southwest corner
                [image.georaster.ymax, image.georaster.xmax]  // Northeast corner
              ];

              bounds.extend(georasterBounds as L.LatLngBoundsExpression);
            } catch (error) {
              console.error('Error creating GeoRasterLayer:', error);

              // Fallback to simple image overlay
              console.log('Falling back to simple ImageOverlay');

              // Create a DOM Image element to check if the image loads properly
              const img = new Image();
              img.onload = () => {
                console.log(`Image loaded successfully: ${image.name}`, img.width, img.height);
              };
              img.onerror = (e) => {
                console.error(`Error loading image: ${image.name}`, e);

                // Add a warning rectangle with text instead of showing a placeholder image
                const warningRectangle = L.rectangle([
                  [image.bounds[1], image.bounds[0]], // Southwest corner [lat, lng]
                  [image.bounds[3], image.bounds[2]]  // Northeast corner [lat, lng]
                ] as L.LatLngBoundsExpression, {
                  color: "#ff0000",
                  weight: 2,
                  opacity: 0.8,
                  fillColor: "#ffcccc",
                  fillOpacity: 0.3
                });

                if (mapInstance) {
                  warningRectangle.addTo(mapInstance);
                }

                // Add a warning tooltip
                warningRectangle.bindTooltip("Image failed to load properly", {
                  permanent: true,
                  direction: 'center',
                  className: 'image-error-tooltip'
                }).openTooltip();

                // Add to layers for cleanup
                newImageLayers.push(warningRectangle);
              };
              if (image.url) {
                img.src = image.url;
              }

              // Create a regular image overlay only if we have a URL
              if (!image.url) {
                console.warn('No URL available for image overlay, skipping');
                return;
              }
              layer = L.imageOverlay(image.url, [
                [image.bounds[1], image.bounds[0]], // Southwest corner [lat, lng]
                [image.bounds[3], image.bounds[2]]  // Northeast corner [lat, lng]
              ] as L.LatLngBoundsExpression, {
                opacity: 0.8,
                interactive: true
              });

              if (mapInstance) {
                layer.addTo(mapInstance);
              }

              // Extend bounds
              bounds.extend([
                [image.bounds[1], image.bounds[0]], // Southwest corner
                [image.bounds[3], image.bounds[2]]  // Northeast corner
              ] as L.LatLngBoundsExpression);

              // Add popup with image info
              layer.bindPopup(`<b>${image.name}</b><br>Uploaded: ${new Date(image.timestamp).toLocaleString()}`);
            }
          } else {
            // For images without georaster, use ImageOverlay
            console.log(`Using ImageOverlay for image ${image.id}`);

            // Use the image bounds directly
            const imageBounds = [
              [image.bounds[1], image.bounds[0]], // Southwest corner [lat, lng]
              [image.bounds[3], image.bounds[2]]  // Northeast corner [lat, lng]
            ];

            // Create a DOM Image element to check if the image loads properly
            const img = new Image();
            img.onload = () => {
              console.log(`Image loaded successfully: ${image.name}`, img.width, img.height);
            };
            img.onerror = (e) => {
              console.error(`Error loading image: ${image.name}`, e);

              // Add a warning rectangle with text instead of showing a placeholder image
              const warningRectangle = L.rectangle(imageBounds as L.LatLngBoundsExpression, {
                color: "#ff0000",
                weight: 2,
                opacity: 0.8,
                fillColor: "#ffcccc",
                fillOpacity: 0.3
              }).addTo(mapInstance);

              // Add a warning tooltip
              warningRectangle.bindTooltip("Image failed to load properly", {
                permanent: true,
                direction: 'center',
                className: 'image-error-tooltip'
              }).openTooltip();

              // Add to layers for cleanup
              newImageLayers.push(warningRectangle);
            };
            if (image.url) {
              img.src = image.url;
            }

            // Create the image overlay only if we have a URL
            if (!image.url) {
              console.warn('No URL available for image overlay, skipping');
              return;
            }
            layer = L.imageOverlay(image.url, imageBounds as L.LatLngBoundsExpression, {
              opacity: 0.8,
              interactive: true
            });

            // Add to map
            if (mapInstance) {
              layer.addTo(mapInstance);
            }

            // Add popup with image info
            layer.bindPopup(`<b>${image.name}</b><br>Uploaded: ${new Date(image.timestamp).toLocaleString()}`);

            // Extend bounds
            bounds.extend(imageBounds as L.LatLngBoundsExpression);
          }

          // Store reference
          newImageLayers.push(layer);

        } catch (error) {
          console.error(`EnhancedLeafletMap: Error adding image ${image.id}:`, error);
        }
      });

      // Store references to new layers
      imageLayersRef.current = newImageLayers;

      // If we have images and no initial bounds, fit the map to the images
      if (newImageLayers.length > 0 && !initialBounds && bounds.isValid()) {
        console.log('Fitting map to image bounds:', bounds);
        mapInstance.fitBounds(bounds);
      }
    }

    return () => {
      // Cleanup function to remove image layers when component unmounts or images change
      if (mapRef.current) {
        imageLayersRef.current.forEach(layer => {
          if (Array.isArray(layer)) {
            // Handle arrays of layers (for Sentinel-2 images)
            layer.forEach(subLayer => {
              mapRef.current?.removeLayer(subLayer);
            });
          } else {
            // Handle single layers
            mapRef.current?.removeLayer(layer);
          }
        });
      }
    };
  }, [images, isMapInitialized, initialBounds]);

  // Add GeoJSON data to the map
  useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !isMapInitialized) return;

    // Remove existing GeoJSON layer
    if (geoJSONLayerRef.current) {
      mapInstance.removeLayer(geoJSONLayerRef.current);
      geoJSONLayerRef.current = null;
    }

    // Add new GeoJSON layer if data is provided
    if (geoJSON && geoJSON.features && geoJSON.features.length > 0) {
      console.log(`EnhancedLeafletMap: Adding GeoJSON with ${geoJSON.features.length} features.`);

      const geoJSONLayer = L.geoJSON(geoJSON as GeoJsonObject, {
        style: {
          color: '#ff7800',
          weight: 5,
          opacity: 0.65
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties) {
            layer.bindTooltip(`ID: ${feature.properties.id || 'N/A'}`, { sticky: true });
          }
        }
      }).addTo(mapInstance);

      geoJSONLayerRef.current = geoJSONLayer;

      // Fit bounds to GeoJSON if no initial bounds provided
      if (!initialBounds) {
        const bounds = geoJSONLayer.getBounds();
        if (bounds.isValid()) {
          mapInstance.fitBounds(bounds);
        }
      }
    }
  }, [geoJSON, isMapInitialized, initialBounds]);

  // Set up drawing controls
  useEffect(() => {
    const mapInstance = mapRef.current;
    const drawnItemsInstance = drawnItemsRef.current;

    if (!mapInstance || !drawnItemsInstance || !isMapInitialized || readOnly) {
      return;
    }

    console.log(`EnhancedLeafletMap: Setting up draw controls (drawingEnabled: ${drawingEnabled}).`);

    // Remove existing draw control if it exists
    if (drawControlRef.current) {
      console.log("EnhancedLeafletMap: Removing previous draw control.");
      try { mapInstance.removeControl(drawControlRef.current); } catch(e) { console.warn("Minor error removing old draw control", e); }
      drawControlRef.current = null;
    }

    // Remove existing event listeners
    mapInstance.off(L.Draw.Event.CREATED);
    mapInstance.off(L.Draw.Event.DELETED);
    mapInstance.off(L.Draw.Event.DRAWSTART);
    mapInstance.off(L.Draw.Event.DRAWSTOP);

    // Add new draw control if drawing is enabled
    if (drawingEnabled) {
      console.log("EnhancedLeafletMap: Adding Leaflet Draw controls for LineString.");

      const drawControlInstance = new L.Control.Draw({
        draw: {
          polyline: {
            shapeOptions: { color: '#ff7800', weight: 5, opacity: 0.65 }
          },
          polygon: false,
          rectangle: false,
          circle: false,
          circlemarker: false,
          marker: false
        },
        edit: {
          featureGroup: drawnItemsInstance,
          remove: true
        }
      });

      mapInstance.addControl(drawControlInstance);
      drawControlRef.current = drawControlInstance;

      // Handle draw events
      mapInstance.on(L.Draw.Event.CREATED, (e: any) => {
        const layer = e.layer as L.Path;
        const type = e.layerType;
        console.log(`EnhancedLeafletMap: Draw Event CREATED (${type})`);

        if (type === 'polyline') {
          try {
            // Add the layer to the feature group
            drawnItemsInstance.addLayer(layer);

            // Convert to GeoJSON
            // Type assertion for layer with toGeoJSON method
            const layerWithGeoJSON = layer as unknown as { toGeoJSON: () => Feature };
            if (typeof layerWithGeoJSON.toGeoJSON === 'function') {
              const feature = layerWithGeoJSON.toGeoJSON();
              if (feature.geometry.type === 'LineString' && onLineStringCreate) {
                // Generate a unique ID for the line
                const id = `line-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
                feature.properties = { ...feature.properties, id };

                // Call the callback with the created LineString
                onLineStringCreate(feature.geometry as LineString);

                // Add a tooltip with the ID
                layer.bindTooltip(`ID: ${id}`, { sticky: true });
              }
            }
          } catch (error) {
            console.error("EnhancedLeafletMap: Error processing created geometry:", error);
          }
        }
      });

      mapInstance.on(L.Draw.Event.DELETED, (e: any) => {
        console.log("EnhancedLeafletMap: Draw Event DELETED");
        const layers = e.layers;

        layers.eachLayer((layer: L.Layer) => {
          // Type assertion for layer with toGeoJSON method
          const layerWithGeoJSON = layer as unknown as { toGeoJSON: () => Feature };
          if (typeof layerWithGeoJSON.toGeoJSON === 'function' && onLineStringDelete) {
            const feature = layerWithGeoJSON.toGeoJSON();
            if (feature.properties && feature.properties.id) {
              onLineStringDelete(feature.properties.id);
            }
          }
        });
      });
    }

    // Cleanup function
    return () => {
      console.log("EnhancedLeafletMap: Cleaning up draw controls and listeners.");
      if (mapRef.current && drawControlRef.current) {
        try { mapRef.current.removeControl(drawControlRef.current); } catch (e) { console.warn("Minor error removing draw control on effect cleanup", e); }
        drawControlRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.off(L.Draw.Event.CREATED);
        mapRef.current.off(L.Draw.Event.DELETED);
        mapRef.current.off(L.Draw.Event.DRAWSTART);
        mapRef.current.off(L.Draw.Event.DRAWSTOP);
      }
    };
  }, [drawingEnabled, isMapInitialized, onLineStringCreate, onLineStringDelete, readOnly]);

  return <div id="enhanced-leaflet-map" style={{ height: '100%', width: '100%', minHeight: '500px' }}></div>;
};

EnhancedLeafletMap.displayName = 'EnhancedLeafletMapComponent';
export default EnhancedLeafletMap;
