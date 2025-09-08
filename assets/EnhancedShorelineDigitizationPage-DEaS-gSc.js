import { j as jsxRuntimeExports, p as parseGeoraster, u as useNavigate } from "./index-D694obFq.js";
import { b as reactExports } from "./leaflet-CCUyKKIY.js";
import { L, G as GeoRasterLayer } from "./georaster-layer-D-eO7TID.js";
/* empty css                      */
import { i as indexedDBService } from "./indexedDBService-C0Tzj_Tb.js";
import { E as ErrorAlert } from "./ErrorAlert-DlvKuJCH.js";
import { F as ForwardRef$1 } from "./PencilIcon-eUf_lbJt.js";
import { F as ForwardRef$2 } from "./ArrowLeftIcon-DL0uFl_m.js";
import { F as ForwardRef$3 } from "./ArrowRightIcon-Dk6_6lE4.js";
import "./georaster-UMjhm2qh.js";
import "./geotiff-70LCDX0v.js";
function TrashIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const ForwardRef = /* @__PURE__ */ reactExports.forwardRef(TrashIcon);
const GeoRasterLeafletMap = ({
  images = [],
  geoJSON = null,
  initialBounds = null,
  onLineStringCreate,
  onLineStringDelete,
  drawingEnabled = true,
  readOnly = false
}) => {
  console.log("GeoRasterLeafletMap received images:", images.map((img) => ({
    id: img.id,
    name: img.name,
    bounds: img.bounds,
    hasGeoraster: !!img.georaster,
    isJP2: img.metadata?.isJP2,
    isSentinel: img.metadata?.isSentinel
  })));
  const mapRef = reactExports.useRef(null);
  const drawControlRef = reactExports.useRef(null);
  const geoJSONLayerRef = reactExports.useRef(null);
  const drawnItemsRef = reactExports.useRef(null);
  const imageLayersRef = reactExports.useRef([]);
  const [isMapInitialized, setIsMapInitialized] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (mapRef.current) return;
    try {
      const useWebGL = (() => {
        try {
          const canvas = document.createElement("canvas");
          return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
        } catch (e) {
          return false;
        }
      })();
      console.log(`WebGL ${useWebGL ? "is" : "is not"} available for hardware acceleration`);
      const style = document.createElement("style");
      style.textContent = `
        /* Core map container optimizations */
        #georaster-leaflet-map {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
          -webkit-perspective: 1000px;
        }

        /* Tile container optimizations */
        .leaflet-tile-container {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
          -webkit-perspective: 1000px;
        }

        /* Individual tile optimizations */
        .leaflet-tile {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          image-rendering: -webkit-optimize-contrast; /* Sharper image rendering */
        }

        /* Pane optimizations */
        .leaflet-pane {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Layer optimizations */
        .leaflet-layer {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Zoom animation optimizations */
        .leaflet-zoom-animated {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
      `;
      document.head.appendChild(style);
      if (useWebGL) {
        const webGLStyle = document.createElement("style");
        webGLStyle.textContent = `
          /* WebGL-specific optimizations */
          .leaflet-canvas-layer {
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
        `;
        document.head.appendChild(webGLStyle);
      }
      const mapInstance = L.map("georaster-leaflet-map", {
        center: [20, 0],
        zoom: 2,
        zoomControl: true,
        // Use canvas renderer for better performance with raster layers
        preferCanvas: true,
        // Enable smooth animations but with performance optimizations
        fadeAnimation: true,
        zoomAnimation: true,
        // Disable marker animations for better performance
        markerZoomAnimation: false,
        // Increase max zoom level with better granularity
        maxZoom: 22,
        minZoom: 1,
        // Advanced performance options - increased debounce time for better performance
        wheelDebounceTime: 40,
        // Increased debounce for better performance during zooming
        wheelPxPerZoomLevel: 60,
        // More sensitive zoom for smoother transitions
        // High-performance renderer with optimized settings
        renderer: L.canvas({
          padding: 2,
          // Increased padding for smoother edge transitions
          tolerance: 8
          // Higher tolerance for better performance
        }),
        // Advanced zoom options for smoother transitions
        zoomSnap: 0.5,
        // Increased for better performance (less granular but faster)
        zoomDelta: 0.5,
        // Increased for better performance
        trackResize: true,
        // Enable resize tracking for responsive layouts
        // Additional performance optimizations
        bounceAtZoomLimits: false,
        // Prevent bouncing at zoom limits
        // Reduce animation duration for faster zooming
        zoomAnimationThreshold: 4,
        // Allow animation for larger zoom changes
        inertia: true,
        // Enable inertia for smoother panning
        inertiaDeceleration: 3e3,
        // Higher value for faster deceleration
        worldCopyJump: true
        // Better handling of panning across date line
      });
      mapRef.current = mapInstance;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 22,
        // Match map's max zoom
        minZoom: 1,
        // Match map's min zoom
        // Advanced caching and performance options - optimized for zooming
        updateWhenIdle: true,
        // Only update when idle for better performance
        updateWhenZooming: false,
        // Don't update during zoom for better performance
        keepBuffer: 4,
        // Reduced buffer size for better performance
        // Additional performance optimizations
        crossOrigin: true,
        // Enable CORS for better caching
        detectRetina: true,
        // Better display on high-DPI screens
        className: "base-tile-layer",
        // Add class for potential CSS optimizations
        // Improved loading strategy
        subdomains: "abc",
        // Use all available subdomains for parallel loading
        errorTileUrl: "",
        // Empty string to prevent error tile display
        zIndex: 1,
        // Lower z-index to ensure it's below our raster layers
        // Improved tile loading
        tileSize: 256,
        // Standard tile size
        zoomOffset: 0,
        // No zoom offset
        opacity: 0.7,
        // Slightly transparent to better see our raster data
        // Additional performance settings
        pane: "tilePane",
        // Ensure it's in the tile pane for proper layering
        maxNativeZoom: 19,
        // Maximum zoom level of the tile server
        bounds: L.latLngBounds([-90, -180], [90, 180])
        // Limit to world bounds
      }).addTo(mapInstance);
      const drawnItemsInstance = new L.FeatureGroup();
      mapInstance.addLayer(drawnItemsInstance);
      drawnItemsRef.current = drawnItemsInstance;
      setTimeout(() => {
        mapInstance.invalidateSize();
        console.log("Map size invalidated after initialization");
      }, 100);
      setIsMapInitialized(true);
      console.log("GeoRasterLeafletMap: Map instance created.");
    } catch (error) {
      console.error("GeoRasterLeafletMap: Error initializing map:", error);
    }
    return () => {
      if (mapRef.current) {
        console.log("GeoRasterLeafletMap: Performing comprehensive cleanup.");
        if (imageLayersRef.current && imageLayersRef.current.length > 0) {
          console.log(`Removing ${imageLayersRef.current.length} image layers`);
          imageLayersRef.current.forEach((layer) => {
            try {
              if (layer && mapRef.current) {
                mapRef.current.removeLayer(layer);
                if (layer instanceof GeoRasterLayer || layer.georaster) {
                  if (layer._tiles) {
                    Object.keys(layer._tiles).forEach((key) => {
                      delete layer._tiles[key];
                    });
                  }
                  if (layer.georaster) {
                    if (layer.georaster.values) {
                      layer.georaster.values.length = 0;
                    }
                    ["_data", "_cache", "_values"].forEach((prop) => {
                      if (layer.georaster[prop]) {
                        layer.georaster[prop] = null;
                      }
                    });
                  }
                }
              }
            } catch (e) {
              console.warn("Error removing layer:", e);
            }
          });
          imageLayersRef.current = [];
        }
        if (mapRef.current._cleanupHandlers && Array.isArray(mapRef.current._cleanupHandlers)) {
          console.log(`Cleaning up ${mapRef.current._cleanupHandlers.length} event handlers`);
          mapRef.current._cleanupHandlers.forEach((handler) => {
            if (typeof handler === "function") {
              try {
                handler();
              } catch (e) {
                console.warn("Error cleaning up handler:", e);
              }
            }
          });
          mapRef.current._cleanupHandlers = [];
        }
        mapRef.current.off();
        if (mapRef.current) {
          const mapContainer = mapRef.current.getContainer();
          const tileContainers = mapContainer.querySelectorAll(".leaflet-tile-container");
          tileContainers.forEach((container) => {
            if (container instanceof HTMLElement) {
              container.innerHTML = "";
            }
          });
        }
        mapRef.current.remove();
        mapRef.current = null;
        if (window.gc) {
          try {
            window.gc();
          } catch (e) {
            console.log("Manual garbage collection not available");
          }
        }
      }
    };
  }, []);
  const fallbackToImageOverlay = async (image, mapInstance, bounds, newLayers) => {
    console.log("Using fallback image overlay or COG handling for:", image.name);
    let imageBounds;
    const isCopernicus = image.name.includes("Copernicus") || image.name.includes("copernicus") || image.metadata?.type === "image/tiff" || image.metadata?.type === "image/geotiff";
    const isCOG = image.name.includes("COG") || image.name.includes("cog") || image.metadata?.isCOG;
    if (isCOG || isCopernicus) {
      console.log("Attempting to load as Cloud Optimized GeoTIFF (COG):", image.name);
      try {
        console.log("Loading COG from URL:", image.url);
        console.log("COG file details:", {
          name: image.name,
          size: image.metadata?.size,
          type: image.metadata?.type,
          bounds: image.bounds
        });
        const georasterResult = image.arrayBuffer ? await parseGeoraster(image.arrayBuffer) : null;
        if (!georasterResult) {
          throw new Error("No arrayBuffer available for COG processing");
        }
        console.log("Successfully parsed COG:", {
          dimensions: georasterResult.dimensions,
          pixelWidth: georasterResult.pixelWidth,
          pixelHeight: georasterResult.pixelHeight,
          noDataValue: georasterResult.noDataValue,
          projection: georasterResult.projection,
          numberOfRasters: georasterResult.numberOfRasters,
          bounds: [georasterResult.xmin, georasterResult.ymin, georasterResult.xmax, georasterResult.ymax]
        });
        if (!mapInstance) {
          console.error("Map instance is null when trying to get zoom level");
          return null;
        }
        const currentZoom = mapInstance.getZoom();
        const baseResolution = 256;
        const zoomFactor = Math.pow(1.2, Math.min(currentZoom - 10, 8));
        const zoomAdjustedFactor = Math.max(0.5, Math.min(2.5, zoomFactor));
        const resolution = Math.round(baseResolution * zoomAdjustedFactor);
        const maxScreenDimension = Math.max(window.innerWidth, window.innerHeight);
        const maxResolution = Math.min(512, Math.round(maxScreenDimension / 2));
        const finalResolution = Math.min(resolution, maxResolution);
        if (Math.random() < 0.1) {
          console.log(`Using optimized resolution for COG: ${finalResolution} at zoom level ${currentZoom}`);
        }
        const geoRasterLayer = new GeoRasterLayer({
          georaster: georasterResult,
          opacity: 0.9,
          // Use a moderate resolution that balances quality and performance
          resolution: 256,
          // Reduced from 512 for better performance during zooming
          // Enable caching for better performance during zoom/pan
          debugLevel: 0,
          // Set a shorter render timeout for faster response
          renderTimeout: 2e3,
          // Optimize buffer and update settings for better zooming performance
          keepBuffer: 4,
          // Reduced buffer size for better performance
          updateWhenIdle: true,
          // Only update when idle for better performance
          updateWhenZooming: false,
          // Don't update during zoom for better performance
          resampleMethod: "nearest",
          // Faster than bilinear for most cases
          pixelValuesToColorFn: (values) => {
            if (values.length >= 3) {
              let r = values[0];
              let g = values[1];
              let b = values[2];
              const maxVal = Math.max(...[r, g, b].filter((v) => isFinite(v)));
              if (maxVal > 255) {
                const scaleFactor = 255 / maxVal;
                r = Math.round(r * scaleFactor);
                g = Math.round(g * scaleFactor);
                b = Math.round(b * scaleFactor);
              } else if (maxVal <= 1 && maxVal > 0) {
                r = Math.round(r * 255);
                g = Math.round(g * 255);
                b = Math.round(b * 255);
              }
              r = Math.min(255, Math.max(0, r || 0));
              g = Math.min(255, Math.max(0, g || 0));
              b = Math.min(255, Math.max(0, b || 0));
              return `rgb(${r}, ${g}, ${b})`;
            } else if (values.length === 1) {
              let val = values[0];
              if (val > 255) {
                val = Math.round(val * (255 / Math.max(val, 1)));
              } else if (val <= 1 && val > 0) {
                val = Math.round(val * 255);
              }
              val = Math.min(255, Math.max(0, val || 0));
              return `rgb(${val}, ${val}, ${val})`;
            } else if (values.length > 3) {
              let r = values[0];
              let g = values[1];
              let b = values[2];
              const maxVal = Math.max(...[r, g, b].filter((v) => isFinite(v)));
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
            return "rgb(128, 128, 128)";
          }
        });
        if (mapInstance) {
          geoRasterLayer.addTo(mapInstance);
        }
        const layer = geoRasterLayer;
        const georasterBounds = L.latLngBounds([
          [georasterResult.ymin, georasterResult.xmin],
          [georasterResult.ymax, georasterResult.xmax]
        ]);
        bounds.extend(georasterBounds);
        console.log("Added COG layer with bounds:", georasterBounds);
        return layer;
      } catch (cogError) {
        console.warn("Failed to load COG, falling back to simple image overlay:", cogError);
      }
    }
    console.warn("Could not create georaster for image, showing error bounds");
    if (image.bounds && image.bounds.length === 4) {
      imageBounds = L.latLngBounds(
        [image.bounds[1], image.bounds[0]],
        // Southwest corner [lat, lng]
        [image.bounds[3], image.bounds[2]]
        // Northeast corner [lat, lng]
      );
    } else {
      console.warn("No valid bounds found for image, using default bounds");
      imageBounds = L.latLngBounds([[-90, -180], [90, 180]]);
    }
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
    const errorMessage = "Could not process GeoTIFF image. The file may be corrupted or in an unsupported format.";
    warningRectangle.bindTooltip(errorMessage, {
      permanent: true,
      direction: "center",
      className: "image-error-tooltip"
    }).openTooltip();
    newLayers.push(warningRectangle);
    return warningRectangle;
  };
  reactExports.useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !isMapInitialized || images.length === 0) return;
    console.log(`GeoRasterLeafletMap: Processing ${images.length} images`);
    console.log("Images to process:", images.map((img) => ({
      id: img.id,
      name: img.name,
      bounds: img.bounds,
      hasGeoraster: !!img.georaster,
      url: img.url,
      metadata: img.metadata
    })));
    images.forEach((img) => {
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
          values: img.georaster.values ? "Available" : "Not available"
        });
      }
    });
    imageLayersRef.current.forEach((layer) => {
      mapInstance.removeLayer(layer);
    });
    imageLayersRef.current = [];
    const processImages = async () => {
      const newLayers = [];
      const bounds = L.latLngBounds([]);
      for (const image of images) {
        try {
          console.log(`Processing image: ${image.name}`, image);
          let layer;
          if (image.processedBlob || image.url && !image.georaster && !image.arrayBuffer) {
            console.log("Using stored processed image with URL:", image.url);
            if (image.url && image.bounds && image.bounds.length === 4) {
              const imageBounds = L.latLngBounds(
                [image.bounds[1], image.bounds[0]],
                // Southwest corner [lat, lng]
                [image.bounds[3], image.bounds[2]]
                // Northeast corner [lat, lng]
              );
              const imageOverlay = L.imageOverlay(image.url, imageBounds, {
                opacity: 0.8,
                interactive: true
              });
              if (mapInstance) {
                imageOverlay.addTo(mapInstance);
              }
              imageOverlay.bindPopup(`
                <div style="text-align: center;">
                  <h4>${image.name}</h4>
                  <p>Processed satellite image</p>
                  <p>Uploaded: ${new Date(image.timestamp).toLocaleString()}</p>
                </div>
              `);
              layer = imageOverlay;
              bounds.extend(imageBounds);
              console.log("Added stored image overlay with bounds:", imageBounds);
            } else {
              console.warn("Stored image missing URL or bounds:", image);
            }
          } else if (image.georaster) {
            console.log("Using existing georaster");
            const geoRasterLayer = new GeoRasterLayer({
              georaster: image.georaster,
              opacity: 0.9,
              resolution: 256,
              pixelValuesToColorFn: (values) => {
                console.log("Pixel values for existing georaster:", values);
                if (values.length >= 3) {
                  let r = values[0];
                  let g = values[1];
                  let b = values[2];
                  const maxVal = Math.max(...[r, g, b].filter((v) => isFinite(v)));
                  if (maxVal > 255) {
                    const scaleFactor = 255 / maxVal;
                    r = Math.round(r * scaleFactor);
                    g = Math.round(g * scaleFactor);
                    b = Math.round(b * scaleFactor);
                  } else if (maxVal <= 1 && maxVal > 0) {
                    r = Math.round(r * 255);
                    g = Math.round(g * 255);
                    b = Math.round(b * 255);
                  }
                  r = Math.min(255, Math.max(0, r || 0));
                  g = Math.min(255, Math.max(0, g || 0));
                  b = Math.min(255, Math.max(0, b || 0));
                  return `rgb(${r}, ${g}, ${b})`;
                } else if (values.length === 1) {
                  let val = values[0];
                  if (val > 255) {
                    val = Math.round(val * (255 / Math.max(val, 1)));
                  } else if (val <= 1 && val > 0) {
                    val = Math.round(val * 255);
                  }
                  val = Math.min(255, Math.max(0, val || 0));
                  return `rgb(${val}, ${val}, ${val})`;
                } else if (values.length > 3) {
                  let r = values[0];
                  let g = values[1];
                  let b = values[2];
                  const maxVal = Math.max(...[r, g, b].filter((v) => isFinite(v)));
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
                return "rgb(128, 128, 128)";
              }
            });
            geoRasterLayer.addTo(mapInstance);
            layer = geoRasterLayer;
            const georasterBounds = L.latLngBounds([
              [image.georaster.ymin, image.georaster.xmin],
              [image.georaster.ymax, image.georaster.xmax]
            ]);
            bounds.extend(georasterBounds);
            console.log("Added georaster layer with bounds:", georasterBounds);
          } else if (image.arrayBuffer && !image.metadata?.isJP2) {
            try {
              console.log("Trying to parse arrayBuffer to create georaster");
              try {
                console.log("Attempting to parse GeoTIFF from arrayBuffer");
                const georasterResult = await parseGeoraster(image.arrayBuffer);
                if (!mapInstance) {
                  console.error("Map instance is null when trying to get zoom level for GeoTIFF");
                  return;
                }
                const currentZoom = mapInstance.getZoom();
                const baseResolution = 256;
                const zoomFactor = Math.pow(1.2, Math.min(currentZoom - 10, 8));
                const zoomAdjustedFactor = Math.max(0.5, Math.min(2.5, zoomFactor));
                const resolution = Math.round(baseResolution * zoomAdjustedFactor);
                const maxScreenDimension = Math.max(window.innerWidth, window.innerHeight);
                const maxResolution = Math.min(512, Math.round(maxScreenDimension / 2));
                const finalResolution = Math.min(resolution, maxResolution);
                if (Math.random() < 0.1) {
                  console.log(`Using optimized resolution for GeoTIFF: ${finalResolution} at zoom level ${currentZoom}`);
                }
                const loadingIndicator = new L.Control({ position: "topright" });
                loadingIndicator.onAdd = function() {
                  const div = L.DomUtil.create("div", "loading-indicator");
                  div.innerHTML = '<div class="spinner">Loading...</div>';
                  div.style.display = "none";
                  div.style.padding = "5px 10px";
                  div.style.background = "rgba(255, 255, 255, 0.8)";
                  div.style.borderRadius = "4px";
                  div.style.margin = "10px";
                  div.style.fontWeight = "bold";
                  return div;
                };
                if (mapInstance) {
                  loadingIndicator.addTo(mapInstance);
                }
                const geoRasterLayer = new GeoRasterLayer({
                  georaster: georasterResult,
                  opacity: 0.9,
                  // Use a moderate resolution that balances quality and performance
                  resolution: 256,
                  // Reduced from 512 for better performance during zooming
                  // Enable caching for better performance during zoom/pan
                  debugLevel: 0,
                  // Set a shorter render timeout for faster response
                  renderTimeout: 2e3,
                  // Optimize buffer and update settings for better zooming performance
                  keepBuffer: 4,
                  // Reduced buffer size for better performance
                  updateWhenIdle: true,
                  // Only update when idle for better performance
                  updateWhenZooming: false,
                  // Don't update during zoom for better performance
                  resampleMethod: "nearest",
                  // Faster than bilinear for most cases
                  pixelValuesToColorFn: (values) => {
                    if (values.length >= 3) {
                      let r = values[0];
                      let g = values[1];
                      let b = values[2];
                      const maxVal = Math.max(...[r, g, b].filter((v) => isFinite(v)));
                      if (maxVal > 255) {
                        const scaleFactor = 255 / maxVal;
                        r = Math.round(r * scaleFactor);
                        g = Math.round(g * scaleFactor);
                        b = Math.round(b * scaleFactor);
                      } else if (maxVal <= 1 && maxVal > 0) {
                        r = Math.round(r * 255);
                        g = Math.round(g * 255);
                        b = Math.round(b * 255);
                      }
                      r = Math.min(255, Math.max(0, r || 0));
                      g = Math.min(255, Math.max(0, g || 0));
                      b = Math.min(255, Math.max(0, b || 0));
                      return `rgb(${r}, ${g}, ${b})`;
                    } else if (values.length === 1) {
                      let val = values[0];
                      if (val > 255) {
                        val = Math.round(val * (255 / Math.max(val, 1)));
                      } else if (val <= 1 && val > 0) {
                        val = Math.round(val * 255);
                      }
                      val = Math.min(255, Math.max(0, val || 0));
                      return `rgb(${val}, ${val}, ${val})`;
                    } else if (values.length > 3) {
                      let r = values[0];
                      let g = values[1];
                      let b = values[2];
                      const maxVal = Math.max(...[r, g, b].filter((v) => isFinite(v)));
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
                    return "rgb(128, 128, 128)";
                  }
                });
                geoRasterLayer.addTo(mapInstance);
                layer = geoRasterLayer;
                const georasterBounds = L.latLngBounds([
                  [georasterResult.ymin, georasterResult.xmin],
                  [georasterResult.ymax, georasterResult.xmax]
                ]);
                bounds.extend(georasterBounds);
                console.log("Created and added georaster layer with bounds using COG approach:", georasterBounds);
                const optimalBaseResolution = 256;
                geoRasterLayer.options.resolution = optimalBaseResolution;
                geoRasterLayer.options.updateWhenZooming = false;
                geoRasterLayer.options.keepBuffer = 4;
                geoRasterLayer.options.renderTimeout = 2e3;
                let zoomThrottleTimer = null;
                const throttleDelay = 300;
                const zoomStartHandler = () => {
                  if (!mapInstance) return;
                  if (zoomThrottleTimer !== null) {
                    window.clearTimeout(zoomThrottleTimer);
                    zoomThrottleTimer = null;
                  }
                  zoomThrottleTimer = window.setTimeout(() => {
                    const loadingElement = document.querySelector(".loading-indicator");
                    if (loadingElement) {
                      loadingElement.style.display = "block";
                      loadingElement.style.opacity = "0.5";
                    }
                  }, 100);
                };
                const zoomEndHandler = () => {
                  if (!mapInstance) return;
                  if (zoomThrottleTimer !== null) {
                    window.clearTimeout(zoomThrottleTimer);
                    zoomThrottleTimer = null;
                  }
                  zoomThrottleTimer = window.setTimeout(() => {
                    const loadingElement = document.querySelector(".loading-indicator");
                    if (loadingElement) {
                      loadingElement.style.display = "none";
                    }
                    mapInstance.invalidateSize({ pan: false });
                  }, throttleDelay);
                };
                if (mapInstance) {
                  mapInstance.on("zoomstart", zoomStartHandler);
                  mapInstance.on("zoomend", zoomEndHandler);
                  const cleanupHandler = () => {
                    if (mapInstance) {
                      mapInstance.off("zoomstart", zoomStartHandler);
                      mapInstance.off("zoomend", zoomEndHandler);
                    }
                  };
                  if (!mapInstance._cleanupHandlers) {
                    mapInstance._cleanupHandlers = [];
                  }
                  mapInstance._cleanupHandlers.push(cleanupHandler);
                }
                return;
              } catch (parseError) {
                console.warn("Failed to parse GeoTIFF from arrayBuffer:", parseError);
                throw parseError;
              }
            } catch (error) {
              console.error("Error creating georaster from arrayBuffer:", error);
              layer = await fallbackToImageOverlay(image, mapInstance, bounds, newLayers);
            }
          } else {
            layer = await fallbackToImageOverlay(image, mapInstance, bounds, newLayers);
          }
          if (layer) {
            newLayers.push(layer);
          }
        } catch (error) {
          console.error(`Error processing image ${image.name}:`, error);
        }
      }
      imageLayersRef.current = newLayers;
      if (newLayers.length > 0) {
        if (bounds.isValid()) {
          console.log("Fitting map to image bounds:", bounds);
          mapInstance.fitBounds(bounds, {
            padding: [50, 50],
            // Add padding around the bounds
            maxZoom: 18
            // Limit max zoom level
          });
        } else {
          console.warn("No valid bounds found for images. Using default view.");
          mapInstance.setView([0, 0], 2);
          const defaultBounds = L.latLngBounds([]);
          let hasValidBounds = false;
          for (const image of images) {
            if (image.bounds && isFinite(image.bounds[0]) && isFinite(image.bounds[1]) && isFinite(image.bounds[2]) && isFinite(image.bounds[3])) {
              const imageBounds = L.latLngBounds(
                [image.bounds[1], image.bounds[0]],
                // Southwest corner [lat, lng]
                [image.bounds[3], image.bounds[2]]
                // Northeast corner [lat, lng]
              );
              if (imageBounds.isValid()) {
                defaultBounds.extend(imageBounds);
                hasValidBounds = true;
              }
            }
          }
          if (hasValidBounds) {
            console.log("Using alternative bounds from image metadata:", defaultBounds);
            mapInstance.fitBounds(defaultBounds, {
              padding: [50, 50],
              maxZoom: 18
            });
          }
        }
      } else if (initialBounds) {
        const initialLatLngBounds = L.latLngBounds(
          [initialBounds[1], initialBounds[0]],
          // Southwest corner [lat, lng]
          [initialBounds[3], initialBounds[2]]
          // Northeast corner [lat, lng]
        );
        if (initialLatLngBounds.isValid()) {
          console.log("Using provided initial bounds:", initialLatLngBounds);
          mapInstance.fitBounds(initialLatLngBounds, {
            padding: [50, 50],
            maxZoom: 18
          });
        }
      }
    };
    processImages();
    return () => {
      if (mapRef.current) {
        imageLayersRef.current.forEach((layer) => {
          try {
            mapRef.current?.removeLayer(layer);
            if (layer instanceof GeoRasterLayer || layer.georaster) {
              if (layer._tiles) {
                Object.keys(layer._tiles).forEach((key) => {
                  delete layer._tiles[key];
                });
              }
              if (layer.georaster) {
                if (layer.georaster.values) {
                  layer.georaster.values.length = 0;
                }
                ["_data", "_cache", "_values"].forEach((prop) => {
                  if (layer.georaster[prop]) {
                    layer.georaster[prop] = null;
                  }
                });
              }
            }
          } catch (e) {
            console.warn("Error during layer cleanup:", e);
          }
        });
        imageLayersRef.current = [];
        if (window.gc) {
          try {
            window.gc();
          } catch (e) {
            console.log("Manual garbage collection not available");
          }
        }
      }
    };
  }, [images, isMapInitialized, initialBounds]);
  reactExports.useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !isMapInitialized) return;
    if (geoJSONLayerRef.current) {
      mapInstance.removeLayer(geoJSONLayerRef.current);
      geoJSONLayerRef.current = null;
    }
    if (geoJSON && geoJSON.features && geoJSON.features.length > 0) {
      console.log(`GeoRasterLeafletMap: Adding GeoJSON with ${geoJSON.features.length} features.`);
      const geoJSONLayer = L.geoJSON(geoJSON, {
        style: {
          color: "#ff7800",
          weight: 5,
          opacity: 0.65
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties) {
            layer.bindTooltip(`ID: ${feature.properties.id || "N/A"}`, { sticky: true });
          }
        }
      }).addTo(mapInstance);
      geoJSONLayerRef.current = geoJSONLayer;
      if (!initialBounds) {
        const bounds = geoJSONLayer.getBounds();
        if (bounds.isValid()) {
          mapInstance.fitBounds(bounds);
        }
      }
    }
  }, [geoJSON, isMapInitialized, initialBounds]);
  reactExports.useEffect(() => {
    const mapInstance = mapRef.current;
    const drawnItemsInstance = drawnItemsRef.current;
    if (!mapInstance || !drawnItemsInstance || !isMapInitialized || readOnly) {
      return;
    }
    console.log(`GeoRasterLeafletMap: Setting up draw controls (drawingEnabled: ${drawingEnabled}).`);
    if (drawControlRef.current) {
      try {
        mapInstance.removeControl(drawControlRef.current);
      } catch (e) {
        console.warn("Minor error removing old draw control", e);
      }
      drawControlRef.current = null;
    }
    mapInstance.off(L.Draw.Event.CREATED);
    mapInstance.off(L.Draw.Event.DELETED);
    if (drawingEnabled) {
      const drawControlInstance = new L.Control.Draw({
        draw: {
          polyline: {
            shapeOptions: { color: "#ff7800", weight: 5, opacity: 0.65 }
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
      mapInstance.on(L.Draw.Event.CREATED, (e) => {
        const layer = e.layer;
        const type = e.layerType;
        console.log(`GeoRasterLeafletMap: Draw Event CREATED (${type})`);
        if (type === "polyline") {
          try {
            drawnItemsInstance.addLayer(layer);
            const feature = layer.toGeoJSON();
            if (feature.geometry.type === "LineString" && onLineStringCreate) {
              const id = `line-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
              feature.properties = { ...feature.properties, id };
              onLineStringCreate(feature.geometry);
              layer.bindTooltip(`ID: ${id}`, { sticky: true });
            }
          } catch (error) {
            console.error("GeoRasterLeafletMap: Error processing created geometry:", error);
          }
        }
      });
      mapInstance.on(L.Draw.Event.DELETED, (e) => {
        console.log("GeoRasterLeafletMap: Draw Event DELETED");
        const layers = e.layers;
        layers.eachLayer((layer) => {
          if (layer.toGeoJSON && onLineStringDelete) {
            const feature = layer.toGeoJSON();
            if (feature.properties && feature.properties.id) {
              onLineStringDelete(feature.properties.id);
            }
          }
        });
      });
    }
    return () => {
      if (mapRef.current && drawControlRef.current) {
        try {
          mapRef.current.removeControl(drawControlRef.current);
        } catch (e) {
          console.warn("Minor error removing draw control on effect cleanup", e);
        }
        drawControlRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.off(L.Draw.Event.CREATED);
        mapRef.current.off(L.Draw.Event.DELETED);
      }
    };
  }, [drawingEnabled, isMapInitialized, onLineStringCreate, onLineStringDelete, readOnly]);
  reactExports.useEffect(() => {
    if (mapRef.current && isMapInitialized && images.length > 0) {
      const refreshMap = () => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
          console.log("Map size invalidated to force refresh");
          const bounds = L.latLngBounds([]);
          let hasValidBounds = false;
          for (const image of images) {
            if (image.bounds && isFinite(image.bounds[0]) && isFinite(image.bounds[1]) && isFinite(image.bounds[2]) && isFinite(image.bounds[3])) {
              const imageBounds = L.latLngBounds(
                [image.bounds[1], image.bounds[0]],
                // Southwest corner [lat, lng]
                [image.bounds[3], image.bounds[2]]
                // Northeast corner [lat, lng]
              );
              if (imageBounds.isValid()) {
                bounds.extend(imageBounds);
                hasValidBounds = true;
              }
            }
          }
          if (hasValidBounds) {
            console.log("Refitting map to bounds after refresh:", bounds);
            mapRef.current.fitBounds(bounds, {
              padding: [50, 50],
              maxZoom: 18
            });
          }
        }
      };
      setTimeout(refreshMap, 100);
      setTimeout(refreshMap, 500);
      setTimeout(refreshMap, 1e3);
    }
  }, [images, isMapInitialized]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      id: "georaster-leaflet-map",
      style: {
        height: "100%",
        width: "100%",
        minHeight: "500px",
        position: "relative",
        overflow: "hidden"
      }
    }
  );
};
GeoRasterLeafletMap.displayName = "GeoRasterLeafletMapComponent";
function EnhancedShorelineDigitizationPage() {
  const navigate = useNavigate();
  const [images, setImages] = reactExports.useState([]);
  const [shoreline, setShoreline] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [lineStrings, setLineStrings] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedImages = await indexedDBService.getAllSatelliteImages();
        if (savedImages.length === 0) {
          setError("No satellite images found. Please upload images first.");
          navigate("/satellite-upload");
          return;
        }
        setImages(savedImages);
        const existingShoreline = await indexedDBService.getShorelineData("digitized-shoreline");
        if (existingShoreline) {
          setShoreline(existingShoreline);
          const extractedLineStrings = [];
          existingShoreline.features.forEach((feature) => {
            if (feature.geometry.type === "LineString") {
              extractedLineStrings.push(feature.geometry);
            }
          });
          setLineStrings(extractedLineStrings);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [navigate]);
  const handleLineStringCreate = reactExports.useCallback((lineString) => {
    setLineStrings((prevLineStrings) => [...prevLineStrings, lineString]);
  }, []);
  const handleLineStringDelete = reactExports.useCallback((id) => {
    setLineStrings(
      (prevLineStrings) => prevLineStrings.filter(
        (ls, index) => ls.properties?.id !== id && `line-${index + 1}` !== id
      )
    );
  }, []);
  reactExports.useEffect(() => {
    if (lineStrings.length > 0) {
      const newShoreline = {
        type: "FeatureCollection",
        features: lineStrings.map((lineString, index) => ({
          type: "Feature",
          geometry: lineString,
          properties: {
            id: lineString.properties?.id || `line-${index + 1}`
          }
        }))
      };
      setShoreline(newShoreline);
    } else {
      setShoreline(null);
    }
  }, [lineStrings]);
  const handleBack = () => {
    navigate("/satellite-upload");
  };
  const handleContinue = async () => {
    if (!shoreline || shoreline.features.length === 0) {
      setError("Please digitize at least one shoreline segment before continuing.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await indexedDBService.storeShorelineData("digitized-shoreline", shoreline);
      await indexedDBService.storeShorelineData("current-shoreline", shoreline);
      console.log("Digitized shoreline saved successfully.");
      navigate("/segmentation");
    } catch (err) {
      console.error("Error saving digitized shoreline:", err);
      setError("Failed to save digitized shoreline. Please try again.");
      setLoading(false);
    }
  };
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all digitized shorelines? This action cannot be undone.")) {
      setLineStrings([]);
      setShoreline(null);
    }
  };
  if (loading && images.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "ml-4 text-gray-600", children: "Loading satellite images..." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold text-primary-900 tracking-tight", children: "Enhanced Shoreline Digitization" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg text-gray-600", children: "Draw shoreline segments on the satellite images using the line tool." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorAlert, { message: error, onClose: () => setError(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-5 w-5 text-blue-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-blue-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "How to digitize:" }),
        " Use the line tool in the top-left corner of the map to draw shoreline segments. Click to start a line, add points along the shoreline, and double-click to finish. You can create multiple line segments and edit or delete them using the edit tools."
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-gray-800", children: [
            "Satellite Images (",
            images.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: shoreline ? `${shoreline.features.length} shoreline segments digitized` : "No shoreline segments digitized yet" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleClearAll,
            disabled: !shoreline || shoreline.features.length === 0,
            className: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-4 w-4 mr-1" }),
              "Clear All"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[600px] border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        GeoRasterLeafletMap,
        {
          images,
          geoJSON: shoreline,
          onLineStringCreate: handleLineStringCreate,
          onLineStringDelete: handleLineStringDelete,
          drawingEnabled: true
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleBack,
          className: "inline-flex items-center justify-center bg-gray-100 text-gray-700 font-semibold px-6 py-3 text-base rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "mr-2 h-5 w-5" }),
            "Back to Images"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleContinue,
          disabled: !shoreline || shoreline.features.length === 0 || loading,
          className: "inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          children: [
            loading ? "Saving..." : "Continue to Segmentation",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$3, { className: "ml-2 h-5 w-5" })
          ]
        }
      )
    ] })
  ] });
}
export {
  EnhancedShorelineDigitizationPage as default
};
//# sourceMappingURL=EnhancedShorelineDigitizationPage-DEaS-gSc.js.map
