import { j as jsxRuntimeExports, u as useNavigate, F as ForwardRef } from "./index-D694obFq.js";
import { b as reactExports } from "./leaflet-CCUyKKIY.js";
import { L, G as GeoRasterLayer } from "./georaster-layer-D-eO7TID.js";
/* empty css                      */
import { E as ErrorAlert } from "./ErrorAlert-DlvKuJCH.js";
import { F as ForwardRef$1 } from "./ArrowLeftIcon-DL0uFl_m.js";
import { F as ForwardRef$2 } from "./ArrowRightIcon-Dk6_6lE4.js";
import "./georaster-UMjhm2qh.js";
import "./geotiff-70LCDX0v.js";
const DrawableMap = ({
  images = [],
  geoJSON = null,
  initialBounds = null,
  onLineStringCreate,
  onLineStringDelete,
  drawingEnabled = true,
  readOnly = false
}) => {
  const mapRef = reactExports.useRef(null);
  const drawControlRef = reactExports.useRef(null);
  const geoJSONLayerRef = reactExports.useRef(null);
  const drawnItemsRef = reactExports.useRef(null);
  const imageLayersRef = reactExports.useRef([]);
  const [isMapInitialized, setIsMapInitialized] = reactExports.useState(false);
  reactExports.useEffect(() => {
    try {
      const mapInstance = L.map("drawable-map", {
        center: [20, 0],
        zoom: 2,
        zoomControl: true
      });
      mapRef.current = mapInstance;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);
      const drawnItemsInstance = new L.FeatureGroup();
      mapInstance.addLayer(drawnItemsInstance);
      drawnItemsRef.current = drawnItemsInstance;
      setIsMapInitialized(true);
      console.log("DrawableMap: Map instance created.");
    } catch (error) {
      console.error("DrawableMap: Error initializing map:", error);
    }
    return () => {
      if (mapRef.current) {
        console.log("DrawableMap: Cleaning up map instance.");
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);
  reactExports.useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !isMapInitialized) return;
    if (initialBounds) {
      console.log("DrawableMap: Setting initial bounds.");
      mapInstance.fitBounds([
        [initialBounds[1], initialBounds[0]],
        // Southwest corner [lat, lng]
        [initialBounds[3], initialBounds[2]]
        // Northeast corner [lat, lng]
      ]);
    }
  }, [initialBounds, isMapInitialized]);
  reactExports.useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !isMapInitialized) return;
    imageLayersRef.current.forEach((layer) => {
      if (Array.isArray(layer)) {
        layer.forEach((subLayer) => {
          mapInstance.removeLayer(subLayer);
        });
      } else {
        mapInstance.removeLayer(layer);
      }
    });
    imageLayersRef.current = [];
    if (images && images.length > 0) {
      console.log(`DrawableMap: Adding ${images.length} satellite images to map.`);
      const newImageLayers = [];
      const bounds = L.latLngBounds([]);
      images.forEach((image) => {
        try {
          let layer;
          if (image.metadata?.isSentinel) {
            console.log(`Handling Sentinel-2 image ${image.id}`);
            const utmZoneBounds = [
              [image.bounds[1], image.bounds[0]],
              // Southwest corner [lat, lng]
              [image.bounds[3], image.bounds[2]]
              // Northeast corner [lat, lng]
            ];
            const utmZoneRect = L.rectangle(utmZoneBounds, {
              color: "#ff7800",
              weight: 2,
              fillOpacity: 0.1,
              interactive: true
            }).addTo(mapInstance);
            const utmZone = image.metadata?.sentinelInfo?.utmZone || "Unknown";
            const band = image.metadata?.sentinelInfo?.band || "Unknown";
            const satellite = image.metadata?.sentinelInfo?.satellite || "Sentinel-2";
            const date = image.metadata?.sentinelInfo?.date || "Unknown date";
            const productType = image.metadata?.sentinelInfo?.productType || "";
            utmZoneRect.bindPopup(`
              <div style="text-align: center;">
                <h4>${image.name}</h4>
                <p><b>${satellite}</b> Image</p>
                <p>UTM Zone: <b>${utmZone}</b></p>
                ${band !== "Unknown" ? `<p>Band: <b>${band}</b></p>` : ""}
                ${date !== "Unknown date" ? `<p>Date: <b>${date}</b></p>` : ""}
                ${productType ? `<p>Type: <b>${productType}</b></p>` : ""}
              </div>
            `);
            const isJP2 = image.metadata?.isJP2;
            let imageBounds;
            if (isJP2) {
              if (productType && productType.includes("True Color")) {
                const centerLat2 = (image.bounds[1] + image.bounds[3]) / 2;
                const centerLng2 = (image.bounds[0] + image.bounds[2]) / 2;
                const latSpan = (image.bounds[3] - image.bounds[1]) * 0.2;
                const lngSpan = (image.bounds[2] - image.bounds[0]) * 0.2;
                imageBounds = [
                  [centerLat2 - latSpan, centerLng2 - lngSpan],
                  // Southwest corner
                  [centerLat2 + latSpan, centerLng2 + lngSpan]
                  // Northeast corner
                ];
              } else {
                const centerLat2 = (image.bounds[1] + image.bounds[3]) / 2;
                const centerLng2 = (image.bounds[0] + image.bounds[2]) / 2;
                const latSpan = (image.bounds[3] - image.bounds[1]) * 0.1;
                const lngSpan = (image.bounds[2] - image.bounds[0]) * 0.1;
                imageBounds = [
                  [centerLat2 - latSpan, centerLng2 - lngSpan],
                  // Southwest corner
                  [centerLat2 + latSpan, centerLng2 + lngSpan]
                  // Northeast corner
                ];
              }
            } else {
              const centerLat2 = (image.bounds[1] + image.bounds[3]) / 2;
              const centerLng2 = (image.bounds[0] + image.bounds[2]) / 2;
              const latSpan = (image.bounds[3] - image.bounds[1]) * 0.25;
              const lngSpan = (image.bounds[2] - image.bounds[0]) * 0.25;
              imageBounds = [
                [centerLat2 - latSpan, centerLng2 - lngSpan],
                // Southwest corner
                [centerLat2 + latSpan, centerLng2 + lngSpan]
                // Northeast corner
              ];
            }
            const img = new Image();
            img.onload = () => {
              console.log(`Image loaded successfully: ${image.name}`, img.width, img.height);
            };
            img.onerror = (e) => {
              console.error(`Error loading image: ${image.name}`, e);
              const warningRectangle = L.rectangle(imageBounds, {
                color: "#ff0000",
                weight: 2,
                opacity: 0.8,
                fillColor: "#ffcccc",
                fillOpacity: 0.3
              }).addTo(mapInstance);
              warningRectangle.bindTooltip("Image failed to load properly", {
                permanent: true,
                direction: "center",
                className: "image-error-tooltip"
              }).openTooltip();
              if (Array.isArray(layer)) {
                layer.push(warningRectangle);
              } else {
                layer = [warningRectangle];
              }
            };
            if (image.url) {
              img.src = image.url;
            }
            if (!image.url) {
              console.warn("No URL available for image overlay, skipping");
              return;
            }
            const imageOverlay = L.imageOverlay(image.url, imageBounds, {
              opacity: isJP2 ? 0.9 : 0.7,
              // Higher opacity for JP2 files to make them more visible
              interactive: true
            }).addTo(mapInstance);
            imageOverlay.bindPopup(`
              <div style="text-align: center;">
                <h4>${image.name}</h4>
                <p><b>${satellite}</b> Image</p>
                <p>UTM Zone: <b>${utmZone}</b></p>
                ${band !== "Unknown" ? `<p>Band: <b>${band}</b></p>` : ""}
                ${date !== "Unknown date" ? `<p>Date: <b>${date}</b></p>` : ""}
                ${productType ? `<p>Type: <b>${productType}</b></p>` : ""}
                ${isJP2 ? "<p><i>JP2 format - approximate positioning</i></p>" : ""}
              </div>
            `);
            const centerLat = (image.bounds[1] + image.bounds[3]) / 2;
            const centerLng = (image.bounds[0] + image.bounds[2]) / 2;
            const centerMarker = L.marker([centerLat, centerLng], {
              icon: L.divIcon({
                html: '<div style="background-color: rgba(255,120,0,0.5); width: 10px; height: 10px; border-radius: 50%;"></div>',
                className: "sentinel-center-marker",
                iconSize: [10, 10]
              })
            }).addTo(mapInstance);
            layer = [utmZoneRect, imageOverlay, centerMarker];
            bounds.extend(utmZoneBounds);
          } else if (image.georaster) {
            console.log(`Using GeoRaster layer for image ${image.id}`);
            try {
              const geoRasterLayer = new GeoRasterLayer({
                georaster: image.georaster,
                opacity: 1,
                resolution: 256
              });
              geoRasterLayer.addTo(mapInstance);
              console.log("GeoRasterLayer added to map");
              const georasterBounds = [
                [image.georaster.ymin, image.georaster.xmin],
                // Southwest corner
                [image.georaster.ymax, image.georaster.xmax]
                // Northeast corner
              ];
              console.log("GeoRaster bounds:", georasterBounds);
              bounds.extend(georasterBounds);
              geoRasterLayer.bindPopup(`<b>${image.name}</b><br>Uploaded: ${new Date(image.timestamp).toLocaleString()}`);
              layer = geoRasterLayer;
            } catch (error) {
              console.error("Error creating GeoRasterLayer:", error);
              console.log("Falling back to simple ImageOverlay");
              if (!image.url) {
                console.warn("No URL available for fallback image overlay, skipping");
                return;
              }
              layer = L.imageOverlay(image.url, [
                [image.bounds[1], image.bounds[0]],
                // Southwest corner [lat, lng]
                [image.bounds[3], image.bounds[2]]
                // Northeast corner [lat, lng]
              ], {
                opacity: 0.9,
                interactive: true
              });
              layer.addTo(mapInstance);
              bounds.extend([
                [image.bounds[1], image.bounds[0]],
                // Southwest corner
                [image.bounds[3], image.bounds[2]]
                // Northeast corner
              ]);
              layer.bindPopup(`<b>${image.name}</b><br>Uploaded: ${new Date(image.timestamp).toLocaleString()}`);
            }
          } else {
            console.log(`Using ImageOverlay for image ${image.id} with bounds:`, image.bounds);
            if (!image.url) {
              console.warn("No URL available for image overlay, skipping");
              return;
            }
            layer = L.imageOverlay(image.url, [
              [image.bounds[1], image.bounds[0]],
              // Southwest corner [lat, lng]
              [image.bounds[3], image.bounds[2]]
              // Northeast corner [lat, lng]
            ], {
              opacity: 0.7,
              interactive: true
            });
            layer.addTo(mapInstance);
            layer.bindPopup(`<b>${image.name}</b><br>Uploaded: ${new Date(image.timestamp).toLocaleString()}`);
            bounds.extend([
              [image.bounds[1], image.bounds[0]],
              // Southwest corner
              [image.bounds[3], image.bounds[2]]
              // Northeast corner
            ]);
          }
          newImageLayers.push(layer);
        } catch (error) {
          console.error(`DrawableMap: Error adding image ${image.id}:`, error);
        }
      });
      imageLayersRef.current = newImageLayers;
      if (newImageLayers.length > 0 && !initialBounds && bounds.isValid()) {
        console.log("Fitting map to image bounds:", bounds);
        mapInstance.fitBounds(bounds);
      }
    }
    return () => {
      if (mapRef.current) {
        imageLayersRef.current.forEach((layer) => {
          if (Array.isArray(layer)) {
            layer.forEach((subLayer) => {
              mapRef.current?.removeLayer(subLayer);
            });
          } else {
            mapRef.current?.removeLayer(layer);
          }
        });
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
      console.log(`DrawableMap: Adding GeoJSON with ${geoJSON.features.length} features.`);
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
    console.log(`DrawableMap: Setting up draw controls (drawingEnabled: ${drawingEnabled}).`);
    if (drawControlRef.current) {
      console.log("DrawableMap: Removing previous draw control.");
      try {
        mapInstance.removeControl(drawControlRef.current);
      } catch (e) {
        console.warn("Minor error removing old draw control", e);
      }
      drawControlRef.current = null;
    }
    mapInstance.off(L.Draw.Event.CREATED);
    mapInstance.off(L.Draw.Event.DELETED);
    mapInstance.off(L.Draw.Event.DRAWSTART);
    mapInstance.off(L.Draw.Event.DRAWSTOP);
    if (drawingEnabled) {
      console.log("DrawableMap: Adding Leaflet Draw controls for LineString.");
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
        console.log(`DrawableMap: Draw Event CREATED (${type})`);
        if (type === "polyline") {
          try {
            drawnItemsInstance.addLayer(layer);
            const layerWithGeoJSON = layer;
            if (typeof layerWithGeoJSON.toGeoJSON === "function") {
              const feature = layerWithGeoJSON.toGeoJSON();
              if (feature.geometry.type === "LineString" && onLineStringCreate) {
                const id = `line-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
                feature.properties = { ...feature.properties, id };
                onLineStringCreate(feature.geometry);
                layer.bindTooltip(`ID: ${id}`, { sticky: true });
              }
            }
          } catch (error) {
            console.error("DrawableMap: Error processing created geometry:", error);
          }
        }
      });
      mapInstance.on(L.Draw.Event.DELETED, (e) => {
        console.log("DrawableMap: Draw Event DELETED");
        const layers = e.layers;
        layers.eachLayer((layer) => {
          const layerWithGeoJSON = layer;
          if (typeof layerWithGeoJSON.toGeoJSON === "function" && onLineStringDelete) {
            const feature = layerWithGeoJSON.toGeoJSON();
            if (feature.properties && feature.properties.id) {
              onLineStringDelete(feature.properties.id);
            }
          }
        });
      });
    }
    return () => {
      console.log("DrawableMap: Cleaning up draw controls and listeners.");
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
        mapRef.current.off(L.Draw.Event.DRAWSTART);
        mapRef.current.off(L.Draw.Event.DRAWSTOP);
      }
    };
  }, [drawingEnabled, isMapInitialized, onLineStringCreate, onLineStringDelete, readOnly]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "drawable-map", style: { height: "100%", width: "100%", minHeight: "500px" } });
};
DrawableMap.displayName = "DrawableMapComponent";
function AOISelectionPage() {
  const navigate = useNavigate();
  const [aoi] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const handleBack = () => {
    navigate("/shoreline-source");
  };
  const handleContinue = () => {
    if (!aoi || aoi.features.length === 0) {
      setError("Please draw an area of interest before continuing.");
      return;
    }
    setError('Sentinel Hub integration is not yet implemented. Please use the "Upload Existing Images" option instead.');
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold text-primary-900 tracking-tight", children: "Select Area of Interest" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg text-gray-600", children: "Draw a polygon on the map to define your area of interest for satellite image acquisition." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorAlert, { message: error, onClose: () => setError(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-5 w-5 text-blue-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-blue-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Note:" }),
        ' The Sentinel Hub integration is currently under development. Please use the "Upload Existing Images" option for now.'
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[600px] border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      DrawableMap,
      {
        drawingEnabled: false,
        readOnly: true
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleBack,
          className: "inline-flex items-center justify-center bg-gray-100 text-gray-700 font-semibold px-6 py-3 text-base rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "mr-2 h-5 w-5" }),
            "Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleContinue,
          className: "inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          children: [
            "Continue",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "ml-2 h-5 w-5" })
          ]
        }
      )
    ] })
  ] });
}
export {
  AOISelectionPage as default
};
//# sourceMappingURL=AOISelectionPage-BUDqI5mA.js.map
