/**
 * Map capture utilities for exporting Leaflet maps to images
 */

/**
 * Captures a Leaflet map using the dom-to-image library
 * This approach works by directly capturing the DOM node containing the map
 */
export const captureMapWithDomToImage = (mapElement: HTMLElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Dynamically import dom-to-image
    import('dom-to-image')
      .then(domtoimage => {
        console.log("Using dom-to-image to capture map...");

        // Find the Leaflet map instance
        const mapInstance = (window as any).L?.Maps?.[0] || null;

        if (!mapInstance) {
          console.warn("Could not find Leaflet map instance");
          // Continue anyway, dom-to-image might still work
        } else {
          console.log("Found Leaflet map instance, preparing for capture...");

          try {
            // Temporarily disable animations
            mapInstance.options.animate = false;

            // Force a redraw of the map
            mapInstance.invalidateSize({ animate: false });

            // Ensure all GeoJSON layers are visible
            Object.values(mapInstance._layers).forEach((layer: any) => {
              if (layer.feature || (layer.getLayers && typeof layer.getLayers === 'function')) {
                if (layer.bringToFront && typeof layer.bringToFront === 'function') {
                  layer.bringToFront();
                }
              }
            });
          } catch (err) {
            console.warn("Error preparing map:", err);
            // Continue anyway, dom-to-image might still work
          }
        }

        // Add a temporary style to fix positioning during capture
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
          .leaflet-pane { transition: none !important; }
          .leaflet-overlay-pane { z-index: 650 !important; }
          .leaflet-marker-pane { z-index: 600 !important; }
        `;
        document.head.appendChild(styleTag);

        // Wait for any pending operations to complete
        setTimeout(() => {
          // Capture the map with dom-to-image
          domtoimage.toPng(mapElement, {
            bgcolor: '#fff', // Use white background
            height: mapElement.offsetHeight,
            width: mapElement.offsetWidth,
            style: {
              transform: 'none',
              'transform-origin': 'none'
            },
            imagePlaceholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXF6wHAAAAABJRU5ErkJggg=='
          })
            .then((dataUrl: string) => {
              // Clean up
              document.head.removeChild(styleTag);

              // Restore original map state if we have a map instance
              if (mapInstance) {
                try {
                  mapInstance.options.animate = mapInstance.options.animate || false;
                  mapInstance.invalidateSize({ animate: false });
                } catch (err) {
                  console.warn("Error restoring map state:", err);
                }
              }

              console.log("Map capture completed successfully with dom-to-image");
              resolve(dataUrl);
            })
            .catch((err: Error) => {
              // Clean up
              if (document.head.contains(styleTag)) {
                document.head.removeChild(styleTag);
              }

              console.error('Error capturing map with dom-to-image:', err);
              reject(err);
            });
        }, 500); // Wait for any pending operations to complete
      })
      .catch(err => {
        console.error('Error importing dom-to-image:', err);
        reject(err);
      });
  });
};

/**
 * Captures a Leaflet map using the leaflet-image library
 * This approach uses Leaflet's internal rendering capabilities
 */
export const captureMapWithLeafletImage = (mapInstance: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Dynamically import leaflet-image
    import('leaflet-image')
      .then(leafletImageModule => {
        const leafletImage = leafletImageModule.default;

        console.log("Using leaflet-image to capture map...");

        if (!mapInstance) {
          console.error("No Leaflet map instance provided");
          reject(new Error("No Leaflet map instance provided"));
          return;
        }

        // Use leaflet-image to capture the map
        leafletImage(mapInstance, (err: Error | null, canvas: HTMLCanvasElement) => {
          if (err) {
            console.error("Error capturing map with leaflet-image:", err);
            reject(err);
            return;
          }

          try {
            // Convert canvas to data URL
            const dataUrl = canvas.toDataURL('image/png');
            console.log("Map capture completed successfully with leaflet-image");
            resolve(dataUrl);
          } catch (err) {
            console.error("Error converting canvas to data URL:", err);
            reject(err);
          }
        });
      })
      .catch(err => {
        console.error('Error importing leaflet-image:', err);
        reject(err);
      });
  });
};

/**
 * Attempts to capture a Leaflet map using multiple methods
 * Falls back to alternative methods if the primary method fails
 */
export const captureMap = async (mapElement: HTMLElement): Promise<string> => {
  // Find the Leaflet map instance
  const mapInstance = (window as any).L?.Maps?.[0] || null;

  try {
    // First try with leaflet-image if we have a map instance
    if (mapInstance) {
      try {
        return await captureMapWithLeafletImage(mapInstance);
      } catch (err) {
        console.warn("leaflet-image capture failed, falling back to dom-to-image:", err);
      }
    }

    // Fall back to dom-to-image
    return await captureMapWithDomToImage(mapElement);
  } catch (err) {
    console.error("All map capture methods failed:", err);
    throw err;
  }
};
