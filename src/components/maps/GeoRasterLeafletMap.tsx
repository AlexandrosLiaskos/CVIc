import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import { parse } from 'georaster';
// Import parseGeoRaster as a default import
import parseGeoRaster from 'georaster';
import type { FeatureCollection, LineString, GeoJsonObject } from 'geojson';
import type { ProcessedImage } from '../../services/imageProcessor';

interface GeoRasterLeafletMapProps {
  images?: ProcessedImage[];
  geoJSON?: FeatureCollection | null;
  initialBounds?: number[] | null; // [minX, minY, maxX, maxY]
  onLineStringCreate?: (lineString: LineString) => void;
  onLineStringDelete?: (id: string) => void;
  drawingEnabled?: boolean;
  readOnly?: boolean;
}

const GeoRasterLeafletMap: React.FC<GeoRasterLeafletMapProps> = ({
  images = [],
  geoJSON = null,
  initialBounds = null,
  onLineStringCreate,
  onLineStringDelete,
  drawingEnabled = true,
  readOnly = false,
}) => {
  // Log images for debugging
  console.log('GeoRasterLeafletMap received images:', images.map(img => ({
    id: img.id,
    name: img.name,
    bounds: img.bounds,
    hasGeoraster: !!img.georaster,
    isJP2: img.metadata?.isJP2,
    isSentinel: img.metadata?.isSentinel
  })));
  const mapRef = useRef<L.Map | null>(null);
  const drawControlRef = useRef<L.Control.Draw | null>(null);
  const geoJSONLayerRef = useRef<L.GeoJSON | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const imageLayersRef = useRef<any[]>([]);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Initialize the map
  useEffect(() => {
    if (mapRef.current) return; // Map already initialized

    try {
      // Create map instance with improved options
      const mapInstance = L.map('georaster-leaflet-map', {
        center: [20, 0],
        zoom: 2,
        zoomControl: true,
        // Add additional options for better performance
        preferCanvas: true,
        // Disable animations for better performance with large images
        fadeAnimation: false,
        zoomAnimation: false,
        // Increase max zoom level
        maxZoom: 19
      });
      mapRef.current = mapInstance;

      // Add base tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);

      // Create feature group for drawn items
      const drawnItemsInstance = new L.FeatureGroup();
      mapInstance.addLayer(drawnItemsInstance);
      drawnItemsRef.current = drawnItemsInstance;

      // Force a redraw after initialization
      setTimeout(() => {
        mapInstance.invalidateSize();
        console.log('Map size invalidated after initialization');
      }, 100);

      setIsMapInitialized(true);
      console.log('GeoRasterLeafletMap: Map instance created.');
    } catch (error) {
      console.error("GeoRasterLeafletMap: Error initializing map:", error);
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        console.log('GeoRasterLeafletMap: Cleaning up map instance.');
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Add satellite images to the map
  useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !isMapInitialized || images.length === 0) return;

    console.log(`GeoRasterLeafletMap: Processing ${images.length} images`);
    console.log('Images to process:', images.map(img => ({
      id: img.id,
      name: img.name,
      bounds: img.bounds,
      hasGeoraster: !!img.georaster,
      url: img.url,
      metadata: img.metadata
    })));

    // Log more detailed information about the georaster if available
    images.forEach(img => {
      if (img.georaster) {
        console.log(`Detailed georaster info for ${img.name}:`, {
          dimensions: img.georaster.dimensions,
          pixelWidth: img.georaster.pixelWidth,
          pixelHeight: img.georaster.pixelHeight,
          noDataValue: img.georaster.noDataValue,
          projection: img.georaster.projection,
          numberOfRasters: img.georaster.numberOfRasters,
          bounds: [img.georaster.xmin, img.georaster.ymin, img.georaster.xmax, img.georaster.ymax],
          rasterType: img.georaster.rasterType,
          dataType: img.georaster.dataType,
          values: img.georaster.values ? 'Available' : 'Not available'
        });
      }
    });

    // Remove existing image layers
    imageLayersRef.current.forEach(layer => {
      mapInstance.removeLayer(layer);
    });
    imageLayersRef.current = [];

    // Process each image
    const processImages = async () => {
      const newLayers = [];
      const bounds = L.latLngBounds([]);

      for (const image of images) {
        try {
          console.log(`Processing image: ${image.name}`, image);

          let layer;

          // Check if we have a georaster already
          if (image.georaster) {
            console.log('Using existing georaster');

            // Create a GeoRasterLayer with the existing georaster
            const geoRasterLayer = new GeoRasterLayer({
              georaster: image.georaster,
              opacity: 0.9,
              resolution: 256,
              pixelValuesToColorFn: values => {
                console.log('Pixel values for existing georaster:', values);

                // For false color images or multi-band images
                if (values.length >= 3) {
                  // Get the first three bands for RGB visualization
                  let r = values[0];
                  let g = values[1];
                  let b = values[2];

                  // Check if values are very small (near zero) or very large
                  const maxVal = Math.max(...[r, g, b].filter(v => isFinite(v)));

                  // If values are very large (likely 16-bit data)
                  if (maxVal > 255) {
                    // Scale down to 8-bit range
                    const scaleFactor = 255 / maxVal;
                    r = Math.round(r * scaleFactor);
                    g = Math.round(g * scaleFactor);
                    b = Math.round(b * scaleFactor);
                  }
                  // If values are very small (likely normalized data)
                  else if (maxVal <= 1 && maxVal > 0) {
                    // Scale up to 0-255 range
                    r = Math.round(r * 255);
                    g = Math.round(g * 255);
                    b = Math.round(b * 255);
                  }

                  // Ensure values are in valid range
                  r = Math.min(255, Math.max(0, r || 0));
                  g = Math.min(255, Math.max(0, g || 0));
                  b = Math.min(255, Math.max(0, b || 0));

                  return `rgb(${r}, ${g}, ${b})`;
                }
                // For single-band data (grayscale)
                else if (values.length === 1) {
                  let val = values[0];

                  // Check if value is very small or very large
                  if (val > 255) {
                    // Scale down to 8-bit
                    val = Math.round(val * (255 / Math.max(val, 1)));
                  } else if (val <= 1 && val > 0) {
                    // Scale up from 0-1 to 0-255
                    val = Math.round(val * 255);
                  }

                  val = Math.min(255, Math.max(0, val || 0));
                  return `rgb(${val}, ${val}, ${val})`;
                }
                // For multi-band data beyond 3 bands (false color)
                else if (values.length > 3) {
                  // Use the first three bands for visualization
                  let r = values[0];
                  let g = values[1];
                  let b = values[2];

                  // Apply scaling as needed
                  const maxVal = Math.max(...[r, g, b].filter(v => isFinite(v)));
                  if (maxVal > 255) {
                    const scaleFactor = 255 / maxVal;
                    r = Math.round(r * scaleFactor);
                    g = Math.round(g * scaleFactor);
                    b = Math.round(b * scaleFactor);
                  }

                  r = Math.min(255, Math.max(0, r || 0));
                  g = Math.min(255, Math.max(0, g || 0));
                  b = Math.min(255, Math.max(0, b || 0));

                  return `rgb(${r}, ${g}, ${b})`;
                }

                // Default fallback
                return 'rgb(128, 128, 128)'; // Gray as fallback
              }
            });

            geoRasterLayer.addTo(mapInstance);
            layer = geoRasterLayer;

            // Get bounds from the georaster
            const georasterBounds = L.latLngBounds([
              [image.georaster.ymin, image.georaster.xmin],
              [image.georaster.ymax, image.georaster.xmax]
            ]);

            bounds.extend(georasterBounds);
            console.log('Added georaster layer with bounds:', georasterBounds);
          }
          // For GeoTIFF files, try to create a georaster
          else if (image.arrayBuffer && !image.metadata?.isJP2) {
            try {
              console.log('Trying to parse arrayBuffer to create georaster');
              const georaster = await parse(image.arrayBuffer);

              const geoRasterLayer = new GeoRasterLayer({
                georaster: georaster,
                opacity: 0.9,
                resolution: 256,
                pixelValuesToColorFn: values => {
                  console.log('Pixel values for parsed GeoTIFF:', values);

                  // For false color images or multi-band images
                  if (values.length >= 3) {
                    // Get the first three bands for RGB visualization
                    let r = values[0];
                    let g = values[1];
                    let b = values[2];

                    // Check if values are very small (near zero) or very large
                    const maxVal = Math.max(...[r, g, b].filter(v => isFinite(v)));

                    // If values are very large (likely 16-bit data)
                    if (maxVal > 255) {
                      // Scale down to 8-bit range
                      const scaleFactor = 255 / maxVal;
                      r = Math.round(r * scaleFactor);
                      g = Math.round(g * scaleFactor);
                      b = Math.round(b * scaleFactor);
                    }
                    // If values are very small (likely normalized data)
                    else if (maxVal <= 1 && maxVal > 0) {
                      // Scale up to 0-255 range
                      r = Math.round(r * 255);
                      g = Math.round(g * 255);
                      b = Math.round(b * 255);
                    }

                    // Ensure values are in valid range
                    r = Math.min(255, Math.max(0, r || 0));
                    g = Math.min(255, Math.max(0, g || 0));
                    b = Math.min(255, Math.max(0, b || 0));

                    return `rgb(${r}, ${g}, ${b})`;
                  }
                  // For single-band data (grayscale)
                  else if (values.length === 1) {
                    let val = values[0];

                    // Check if value is very small or very large
                    if (val > 255) {
                      // Scale down to 8-bit
                      val = Math.round(val * (255 / Math.max(val, 1)));
                    } else if (val <= 1 && val > 0) {
                      // Scale up from 0-1 to 0-255
                      val = Math.round(val * 255);
                    }

                    val = Math.min(255, Math.max(0, val || 0));
                    return `rgb(${val}, ${val}, ${val})`;
                  }

                  // Default fallback
                  return 'rgb(128, 128, 128)'; // Gray as fallback
                }
              });

              geoRasterLayer.addTo(mapInstance);
              layer = geoRasterLayer;

              // Get bounds from the georaster
              const georasterBounds = L.latLngBounds([
                [georaster.ymin, georaster.xmin],
                [georaster.ymax, georaster.xmax]
              ]);

              bounds.extend(georasterBounds);
              console.log('Created and added georaster layer with bounds:', georasterBounds);
            } catch (error) {
              console.error('Error creating georaster from arrayBuffer:', error);
              // Fall back to simple image overlay
              fallbackToImageOverlay();
            }
          }
          // For JP2 or other files, use simple image overlay
          else {
            fallbackToImageOverlay();
          }

          // Fallback function for simple image overlay or COG handling
          async function fallbackToImageOverlay() {
            console.log('Using fallback image overlay or COG handling for:', image.name);

            // Calculate appropriate bounds
            let imageBounds;

            // Check if this is a Copernicus image or COG
            const isCopernicus = image.name.includes('Copernicus') ||
                                image.name.includes('copernicus') ||
                                image.metadata?.type === 'image/tiff' ||
                                image.metadata?.type === 'image/geotiff';

            const isCOG = image.name.includes('COG') ||
                          image.name.includes('cog') ||
                          image.metadata?.isCOG;

            // Try to load as COG if it's a Copernicus image or explicitly marked as COG
            if (isCOG || isCopernicus) {
              console.log('Attempting to load as Cloud Optimized GeoTIFF (COG):', image.name);

              try {
                // For COG files, we need to use the URL directly with parseGeoRaster
                console.log('Loading COG from URL:', image.url);
                console.log('COG file details:', {
                  name: image.name,
                  size: image.metadata?.size,
                  type: image.metadata?.type,
                  bounds: image.bounds
                });

                // Use parseGeoRaster to load the COG directly from URL
                const georaster = await parseGeoRaster(image.url);
                console.log('Successfully parsed COG:', {
                  dimensions: georaster.dimensions,
                  pixelWidth: georaster.pixelWidth,
                  pixelHeight: georaster.pixelHeight,
                  noDataValue: georaster.noDataValue,
                  projection: georaster.projection,
                  numberOfRasters: georaster.numberOfRasters,
                  bounds: [georaster.xmin, georaster.ymin, georaster.xmax, georaster.ymax]
                });

                // Create a GeoRasterLayer with the parsed georaster
                const geoRasterLayer = new GeoRasterLayer({
                  georaster: georaster,
                  opacity: 0.9,
                  resolution: 256, // Try different values (128, 256, 512) based on your image size
                  pixelValuesToColorFn: values => {
                    console.log('Pixel values for COG:', values);

                    // For false color images or multi-band images
                    if (values.length >= 3) {
                      // Get the first three bands for RGB visualization
                      let r = values[0];
                      let g = values[1];
                      let b = values[2];

                      // Check if values are very small (near zero) or very large
                      const maxVal = Math.max(...[r, g, b].filter(v => isFinite(v)));

                      // If values are very large (likely 16-bit data)
                      if (maxVal > 255) {
                        // Scale down to 8-bit range
                        const scaleFactor = 255 / maxVal;
                        r = Math.round(r * scaleFactor);
                        g = Math.round(g * scaleFactor);
                        b = Math.round(b * scaleFactor);
                      }
                      // If values are very small (likely normalized data)
                      else if (maxVal <= 1 && maxVal > 0) {
                        // Scale up to 0-255 range
                        r = Math.round(r * 255);
                        g = Math.round(g * 255);
                        b = Math.round(b * 255);
                      }

                      // Ensure values are in valid range
                      r = Math.min(255, Math.max(0, r || 0));
                      g = Math.min(255, Math.max(0, g || 0));
                      b = Math.min(255, Math.max(0, b || 0));

                      return `rgb(${r}, ${g}, ${b})`;
                    }
                    // For single-band data (grayscale)
                    else if (values.length === 1) {
                      let val = values[0];

                      // Check if value is very small or very large
                      if (val > 255) {
                        // Scale down to 8-bit
                        val = Math.round(val * (255 / Math.max(val, 1)));
                      } else if (val <= 1 && val > 0) {
                        // Scale up from 0-1 to 0-255
                        val = Math.round(val * 255);
                      }

                      val = Math.min(255, Math.max(0, val || 0));
                      return `rgb(${val}, ${val}, ${val})`;
                    }
                    // For multi-band data beyond 3 bands (false color)
                    else if (values.length > 3) {
                      // Use the first three bands for visualization
                      let r = values[0];
                      let g = values[1];
                      let b = values[2];

                      // Apply scaling as needed
                      const maxVal = Math.max(...[r, g, b].filter(v => isFinite(v)));
                      if (maxVal > 255) {
                        const scaleFactor = 255 / maxVal;
                        r = Math.round(r * scaleFactor);
                        g = Math.round(g * scaleFactor);
                        b = Math.round(b * scaleFactor);
                      }

                      r = Math.min(255, Math.max(0, r || 0));
                      g = Math.min(255, Math.max(0, g || 0));
                      b = Math.min(255, Math.max(0, b || 0));

                      return `rgb(${r}, ${g}, ${b})`;
                    }

                    // Default fallback
                    return 'rgb(128, 128, 128)'; // Gray as fallback
                  }
                });

                if (mapInstance) {
                  geoRasterLayer.addTo(mapInstance);
                }
                layer = geoRasterLayer;

                // Get bounds from the georaster
                const georasterBounds = L.latLngBounds([
                  [georaster.ymin, georaster.xmin],
                  [georaster.ymax, georaster.xmax]
                ]);

                bounds.extend(georasterBounds);
                console.log('Added COG layer with bounds:', georasterBounds);

                // Successfully loaded as COG, return early
                return;
              } catch (cogError) {
                console.error('Failed to load as COG, falling back to standard image overlay:', cogError);

                // Log more detailed error information
                console.error('COG loading error details:', {
                  errorName: cogError instanceof Error ? cogError.name : 'Unknown',
                  errorMessage: cogError instanceof Error ? cogError.message : String(cogError),
                  fileName: image.name,
                  fileType: image.metadata?.type,
                  fileSize: image.metadata?.size,
                  isCOG: image.metadata?.isCOG
                });

                // If this is explicitly marked as a COG, show a more helpful error message
                if (image.name.includes('COG') || image.name.includes('cog') || image.metadata?.isCOG) {
                  console.warn('This file appears to be a COG but failed to load. Possible issues:');
                  console.warn('1. CORS restrictions - The server hosting the COG must allow cross-origin requests');
                  console.warn('2. Invalid COG format - The file might not be a properly formatted COG');
                  console.warn('3. Browser limitations - Some browsers have limitations with large files');
                  console.warn('4. Network issues - The file might be too large or the connection too slow');
                }

                // Continue with standard image overlay approach
              }
            }

            if (image.metadata?.isJP2 && image.metadata?.isSentinel) {
              // For Sentinel JP2 files, use the full UTM zone bounds
              // This ensures the image is displayed in the correct geographic area
              console.log('Using UTM zone bounds for Sentinel JP2 file');

              // Create bounds with correct order: southwest corner, northeast corner
              imageBounds = L.latLngBounds(
                [image.bounds[1], image.bounds[0]], // Southwest corner [lat, lng]
                [image.bounds[3], image.bounds[2]]  // Northeast corner [lat, lng]
              );

              console.log('Original bounds:', image.bounds);
              console.log('Leaflet bounds:', imageBounds);
            } else if (isCopernicus) {
              // Special handling for Copernicus GeoTIFF files
              console.log('Using special bounds handling for Copernicus image');

              // Create bounds with correct order and ensure they're valid
              imageBounds = L.latLngBounds(
                [image.bounds[1], image.bounds[0]], // Southwest corner [lat, lng]
                [image.bounds[3], image.bounds[2]]  // Northeast corner [lat, lng]
              );

              // If the bounds are invalid or too small, use a default area
              if (!imageBounds.isValid() ||
                  Math.abs(image.bounds[2] - image.bounds[0]) < 0.001 ||
                  Math.abs(image.bounds[3] - image.bounds[1]) < 0.001) {
                console.warn('Invalid or too small bounds for Copernicus image, using default area');
                // Use a default area (Europe)
                imageBounds = L.latLngBounds(
                  [35, -10], // Southwest corner [lat, lng]
                  [60, 30]   // Northeast corner [lat, lng]
                );
              }

              console.log('Copernicus image bounds:', imageBounds);
            } else {
              // For other images, use the full bounds
              imageBounds = L.latLngBounds(
                [image.bounds[1], image.bounds[0]], // Southwest corner [lat, lng]
                [image.bounds[3], image.bounds[2]]  // Northeast corner [lat, lng]
              );
            }

            console.log('Image overlay bounds:', imageBounds);

            // Create a DOM Image element to check if the image loads properly
            const img = new Image();
            img.onload = () => {
              console.log(`Image loaded successfully: ${image.name}`, img.width, img.height);
            };
            img.onerror = (e) => {
              console.error(`Error loading image: ${image.name}`, e);

              // Add a warning rectangle with text instead of showing a placeholder image
              const warningRectangle = L.rectangle(imageBounds, {
                color: "#ff0000",
                weight: 2,
                opacity: 0.8,
                fillColor: "#ffcccc",
                fillOpacity: 0.3
              });

              if (mapInstance) {
                warningRectangle.addTo(mapInstance);
              }

              // Check if this is a Copernicus image for a more specific error message
              const isCopernicus = image.name.includes('Copernicus') ||
                                  image.name.includes('copernicus') ||
                                  image.metadata?.type === 'image/tiff' ||
                                  image.metadata?.type === 'image/geotiff';

              let errorMessage = "Image failed to load properly. Try converting to a different GeoTIFF format.";

              if (isCopernicus) {
                // Check if it's already a COG
                if (image.name.includes('COG') || image.name.includes('cog') || image.metadata?.isCOG) {
                  errorMessage = "COG file failed to load. This might be due to CORS issues or an incompatible COG format. Try a different viewer or convert to a standard GeoTIFF.";
                } else {
                  errorMessage = "Copernicus GeoTIFF failed to load. Try downloading as COG (Cloud Optimized GeoTIFF) format.";
                }
              }

              // Add a warning tooltip with more detailed error message
              warningRectangle.bindTooltip(errorMessage, {
                permanent: true,
                direction: 'center',
                className: 'image-error-tooltip'
              }).openTooltip();

              // Add to layers for cleanup
              newLayers.push(warningRectangle);
            };
            // Add CORS attributes to help with cross-origin issues
            img.crossOrigin = "anonymous";
            img.src = image.url;

            // Create the image overlay with improved error handling
            const imageOverlay = L.imageOverlay(image.url, imageBounds, {
              opacity: 1.0, // Full opacity for better visibility
              interactive: true,
              crossOrigin: 'anonymous',
              className: 'satellite-image-overlay', // Add a class for potential CSS styling
              // Add error handling directly to the imageOverlay
              errorOverlayUrl: '', // Empty string to prevent default error image
              zIndex: 10, // Ensure image is above base map
            });

            // Add the overlay to the map
            if (mapInstance) {
              imageOverlay.addTo(mapInstance);
            }
            layer = imageOverlay;

            // Add popup with image info
            imageOverlay.bindPopup(`
              <div style="max-width: 300px;">
                <h3 style="font-weight: bold; margin-bottom: 5px;">${image.name}</h3>
                <p>Uploaded: ${new Date(image.timestamp).toLocaleString()}</p>
                ${image.metadata?.isSentinel ?
                  `<p>Sentinel Image${image.metadata?.sentinelInfo?.utmZone ? ` (UTM Zone ${image.metadata.sentinelInfo.utmZone})` : ''}</p>` :
                  ''}
                <p>Bounds: [${image.bounds.map(b => b.toFixed(2)).join(', ')}]</p>
              </div>
            `);

            // Extend bounds
            bounds.extend(imageBounds);
            console.log('Added image overlay with bounds:', imageBounds);

            // Add a rectangle to show the bounds (helpful for debugging)
            const boundsRectangle = L.rectangle(imageBounds, {
              color: "#ff7800",
              weight: 1,
              opacity: 0.8,
              fillOpacity: 0.1
            });

            if (mapInstance) {
              boundsRectangle.addTo(mapInstance);
            }

            newLayers.push(boundsRectangle);

            // Force a redraw of the map to ensure the image is displayed
            setTimeout(() => {
              if (mapInstance) {
                mapInstance.invalidateSize();
                // Ensure the image is within view
                mapInstance.fitBounds(imageBounds, { padding: [50, 50] });
              }
            }, 100);
          }

          if (layer) {
            newLayers.push(layer);
          }
        } catch (error) {
          console.error(`Error processing image ${image.name}:`, error);
        }
      }

      // Store references to new layers
      imageLayersRef.current = newLayers;

      // If we have layers, fit the map to the images
      if (newLayers.length > 0) {
        if (bounds.isValid()) {
          console.log('Fitting map to image bounds:', bounds);
          mapInstance.fitBounds(bounds, {
            padding: [50, 50], // Add padding around the bounds
            maxZoom: 18        // Limit max zoom level
          });
        } else {
          console.warn('No valid bounds found for images. Using default view.');
          // Set a default view if bounds are not valid
          mapInstance.setView([0, 0], 2);

          // Try to create bounds from image metadata
          const defaultBounds = L.latLngBounds([]);
          let hasValidBounds = false;

          for (const image of images) {
            if (image.bounds &&
                isFinite(image.bounds[0]) && isFinite(image.bounds[1]) &&
                isFinite(image.bounds[2]) && isFinite(image.bounds[3])) {

              const imageBounds = L.latLngBounds(
                [image.bounds[1], image.bounds[0]], // Southwest corner [lat, lng]
                [image.bounds[3], image.bounds[2]]  // Northeast corner [lat, lng]
              );

              if (imageBounds.isValid()) {
                defaultBounds.extend(imageBounds);
                hasValidBounds = true;
              }
            }
          }

          if (hasValidBounds) {
            console.log('Using alternative bounds from image metadata:', defaultBounds);
            mapInstance.fitBounds(defaultBounds, {
              padding: [50, 50],
              maxZoom: 18
            });
          }
        }
      } else if (initialBounds) {
        // Use initial bounds if provided
        const initialLatLngBounds = L.latLngBounds(
          [initialBounds[1], initialBounds[0]], // Southwest corner [lat, lng]
          [initialBounds[3], initialBounds[2]]  // Northeast corner [lat, lng]
        );

        if (initialLatLngBounds.isValid()) {
          console.log('Using provided initial bounds:', initialLatLngBounds);
          mapInstance.fitBounds(initialLatLngBounds, {
            padding: [50, 50],
            maxZoom: 18
          });
        }
      }
    };

    processImages();

    // Cleanup function
    return () => {
      if (mapRef.current) {
        imageLayersRef.current.forEach(layer => {
          mapRef.current?.removeLayer(layer);
        });
        imageLayersRef.current = [];
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
      console.log(`GeoRasterLeafletMap: Adding GeoJSON with ${geoJSON.features.length} features.`);

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

    console.log(`GeoRasterLeafletMap: Setting up draw controls (drawingEnabled: ${drawingEnabled}).`);

    // Remove existing draw control if it exists
    if (drawControlRef.current) {
      try { mapInstance.removeControl(drawControlRef.current); } catch(e) { console.warn("Minor error removing old draw control", e); }
      drawControlRef.current = null;
    }

    // Remove existing event listeners
    mapInstance.off(L.Draw.Event.CREATED);
    mapInstance.off(L.Draw.Event.DELETED);

    // Add new draw control if drawing is enabled
    if (drawingEnabled) {
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
        const layer = e.layer;
        const type = e.layerType;
        console.log(`GeoRasterLeafletMap: Draw Event CREATED (${type})`);

        if (type === 'polyline') {
          try {
            // Add the layer to the feature group
            drawnItemsInstance.addLayer(layer);

            // Convert to GeoJSON
            const feature = layer.toGeoJSON();
            if (feature.geometry.type === 'LineString' && onLineStringCreate) {
              // Generate a unique ID for the line
              const id = `line-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
              feature.properties = { ...feature.properties, id };

              // Call the callback with the created LineString
              onLineStringCreate(feature.geometry as LineString);

              // Add a tooltip with the ID
              layer.bindTooltip(`ID: ${id}`, { sticky: true });
            }
          } catch (error) {
            console.error("GeoRasterLeafletMap: Error processing created geometry:", error);
          }
        }
      });

      mapInstance.on(L.Draw.Event.DELETED, (e: any) => {
        console.log("GeoRasterLeafletMap: Draw Event DELETED");
        const layers = e.layers;

        layers.eachLayer((layer: any) => {
          if (layer.toGeoJSON && onLineStringDelete) {
            const feature = layer.toGeoJSON();
            if (feature.properties && feature.properties.id) {
              onLineStringDelete(feature.properties.id);
            }
          }
        });
      });
    }

    // Cleanup function
    return () => {
      if (mapRef.current && drawControlRef.current) {
        try { mapRef.current.removeControl(drawControlRef.current); } catch (e) { console.warn("Minor error removing draw control on effect cleanup", e); }
        drawControlRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.off(L.Draw.Event.CREATED);
        mapRef.current.off(L.Draw.Event.DELETED);
      }
    };
  }, [drawingEnabled, isMapInitialized, onLineStringCreate, onLineStringDelete, readOnly]);

  // Add a useEffect to force a map refresh when images change
  useEffect(() => {
    if (mapRef.current && isMapInitialized && images.length > 0) {
      // Force a refresh of the map by triggering a resize event
      // This helps with rendering issues, especially for image overlays
      const refreshMap = () => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
          console.log('Map size invalidated to force refresh');

          // Also try to fit to bounds again if possible
          const bounds = L.latLngBounds([]);
          let hasValidBounds = false;

          // Try to create bounds from all images
          for (const image of images) {
            if (image.bounds &&
                isFinite(image.bounds[0]) && isFinite(image.bounds[1]) &&
                isFinite(image.bounds[2]) && isFinite(image.bounds[3])) {

              const imageBounds = L.latLngBounds(
                [image.bounds[1], image.bounds[0]], // Southwest corner [lat, lng]
                [image.bounds[3], image.bounds[2]]  // Northeast corner [lat, lng]
              );

              if (imageBounds.isValid()) {
                bounds.extend(imageBounds);
                hasValidBounds = true;
              }
            }
          }

          if (hasValidBounds) {
            console.log('Refitting map to bounds after refresh:', bounds);
            mapRef.current.fitBounds(bounds, {
              padding: [50, 50],
              maxZoom: 18
            });
          }
        }
      };

      // Refresh multiple times to ensure rendering
      setTimeout(refreshMap, 100);
      setTimeout(refreshMap, 500);
      setTimeout(refreshMap, 1000);
    }
  }, [images, isMapInitialized]);

  return (
    <div
      id="georaster-leaflet-map"
      style={{
        height: '100%',
        width: '100%',
        minHeight: '500px',
        position: 'relative',
        overflow: 'hidden'
      }}
    ></div>
  );
};

GeoRasterLeafletMap.displayName = 'GeoRasterLeafletMapComponent';
export default GeoRasterLeafletMap;
