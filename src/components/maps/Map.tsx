// ---- File: src/components/maps/Map.tsx ----
import React, { useEffect, useRef, useCallback, useState } from 'react'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import type { Parameter, ShorelineSegment, SelectionPolygon } from '../../types'
import type { FeatureCollection, Polygon as GeoJSONPolygon, Feature, GeoJsonObject } from 'geojson'
// @ts-ignore - Suppress TS error for Turf module resolution issues
import * as turf from '@turf/turf' // Import turf
import { getCviCategory } from '../../utils/vulnerabilityMapping' // Import CVI category logic

interface MapProps {
  segments: ShorelineSegment[]
  parameters: Parameter[]
  selectedSegments: string[]
  selectedParameter: string | null
  selectionPolygons: SelectionPolygon[]
  onSegmentSelect: (segmentId: string) => void
  onSelectionDelete: (polygonId: string) => void
  onAreaSelect: (geometry: GeoJSONPolygon) => void
  isEditing: boolean
  initialBounds?: L.LatLngBoundsExpression | null // Updated type
  geoJSON?: FeatureCollection | null // Allow null for initial state
  zoomToFeatureId?: string | null // New prop for zooming to specific feature
  stylingMode?: 'parameter' | 'cvi' // New prop to control styling logic
}

// Function to get CVI color based on score using 5 ranks
const getCviColor = (score: number | undefined | null): string => {
  if (score === undefined || score === null || isNaN(score)) return '#808080'; // Default Grey for no data/NaN

  const rank = Math.round(score); // Use rounded score to determine rank
  if (rank <= 1) return '#1a9850'; // Rank 1: Green
  if (rank === 2) return '#91cf60'; // Rank 2: Lime
  if (rank === 3) return '#fee08b'; // Rank 3: Yellow
  if (rank === 4) return '#fc8d59'; // Rank 4: Orange
  if (rank >= 5) return '#d73027'; // Rank 5: Red
  return '#808080'; // Default fallback (shouldn't be reached with rounding)
};

// Combined styling function
function getFeatureStyle(
  feature: Feature,
  segments: ShorelineSegment[], // Pass all segments for lookup if needed
  parameters: Parameter[], // Pass parameters for parameter styling mode
  selectedSegments: string[], // For highlighting selection
  selectedParameterId: string | null, // For parameter styling mode
  stylingMode: 'parameter' | 'cvi' = 'parameter' // Default to parameter mode
): L.PathOptions {

  const segmentId = feature.properties?.id;
  const isSelected = segmentId ? selectedSegments.includes(segmentId) : false;
  const cviScore = feature.properties?.vulnerabilityIndex;

  // --- CVI Styling Mode ---
  if (stylingMode === 'cvi') {
    const color = getCviColor(cviScore);
    return {
      color: isSelected ? '#0ea5e9' : color, // Use a distinct selection color (e.g., blue) in CVI mode
      weight: isSelected ? 5 : 3,
      opacity: isSelected ? 1 : 0.8,
      fillOpacity: isSelected ? 0.4 : 0.2,
    };
  }

  // --- Parameter Styling Mode (Original Logic) ---
  const segmentData = segmentId ? segments.find(s => s.id === segmentId) : null;
  const parameter = selectedParameterId ? parameters.find(p => p.id === selectedParameterId) : null;

  // Default style if no parameter selected or segment data missing
  if (!selectedParameterId || !parameter || !segmentData?.parameters) {
    return {
      color: isSelected ? '#FF4500' : '#3388ff', // Default Blue / Orange selection
      weight: isSelected ? 5 : 3,
      opacity: 1, // Keep opacity high for better visibility
    };
  }

  const paramValue = segmentData.parameters[selectedParameterId];

  // Style for segments without a value for the selected parameter
  if (!paramValue) {
    return {
      color: isSelected ? '#FF4500' : '#808080', // Grey for missing value / Orange selection
      weight: isSelected ? 5 : 2,
      opacity: isSelected ? 1 : 0.6,
      dashArray: '5,5',
    };
  }

  // Determine color based on parameter type and value
  let valueColor = '#3388ff'; // Default Blue if calculation fails below
  const vulnerabilityScore = paramValue.vulnerability; // Use the direct vulnerability score (1-5)

  // Map vulnerability score (1-5) directly to color
  if (parameter.type === 'categorical' && parameter.options) {
    const option = parameter.options.find(o => o.value === paramValue.value);
    valueColor = option?.color || getCviColor(vulnerabilityScore); // Use score color as fallback
  } else if (parameter.type === 'numerical' && parameter.vulnerabilityRanges) {
    // Find range to get color defined in config, but use vulnerability score for direct mapping if needed
    const range = parameter.vulnerabilityRanges.find(r => r.value === vulnerabilityScore);
    valueColor = range?.color || '#808080';
  }

  // Final style for parameter mode
  return {
    color: isSelected ? '#FF4500' : valueColor,
    weight: isSelected ? 5 : 3, // Slightly thicker weight for parameter mode
    opacity: 1, // Keep opacity high
 };
}


const Map: React.FC<MapProps> = ({
  segments,
  parameters,
  selectedSegments,
  selectedParameter,
  selectionPolygons,
  onSegmentSelect,
  onSelectionDelete,
  onAreaSelect,
  isEditing,
  initialBounds,
  geoJSON,
  zoomToFeatureId,
  stylingMode = 'parameter' // Default to 'parameter'
}) => {
  const mapRef = useRef<L.Map | null>(null)
  const drawControlRef = useRef<L.Control.Draw | null>(null)
  const segmentsLayerRef = useRef<L.GeoJSON | null>(null)
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null)
  const [isMapInitialized, setIsMapInitialized] = useState(false)

  // Memoized click handler for segments
  const handleSegmentClick = useCallback((feature: Feature, layer: L.Layer) => {
    if (feature.properties && feature.properties.id) {
      const segmentId = feature.properties.id
      console.log('Map: Segment clicked:', segmentId)
      onSegmentSelect(segmentId)

       // Add popup logic here if needed (example)
       if (mapRef.current && layer instanceof L.Path) {
           const props = feature.properties || {} as any; // Added type assertion
           let popupContent = `<b>Segment ID:</b> ${props.id}`;
           if (props.cviScore !== undefined) {
               popupContent += `<br/><b>CVI Score:</b> ${props.cviScore.toFixed(2)}`;
               popupContent += `<br/><b>Category:</b> ${props.cviCategory}`;
           }
           if (props.length !== undefined) {
               popupContent += `<br/><b>Length:</b> ${props.length.toFixed(2)}m`;
           }
           layer.bindPopup(popupContent).openPopup();
       }

    }
  }, [onSegmentSelect])

  // Effect 1: Initialize Map (runs only once)
  useEffect(() => {
    console.log('Map Effect 1: Initializing map instance...')
    if (mapRef.current || typeof window === 'undefined') return

    const mapContainer = document.getElementById('map')
    if (!mapContainer) {
      console.error("Map container 'map' not found")
      return
    }

    // Remove potential stale Leaflet instance ID
    if ((mapContainer as any)._leaflet_id) {
      console.warn("Map container already had a Leaflet ID. Clearing it.");
      (mapContainer as any)._leaflet_id = null;
    }

    try {
      const mapInstance = L.map('map', {
        center: [20, 0],
        zoom: 2,
        zoomControl: true,
      })
      mapRef.current = mapInstance

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance)

      const drawnItemsInstance = new L.FeatureGroup()
      mapInstance.addLayer(drawnItemsInstance)
      drawnItemsRef.current = drawnItemsInstance

      setIsMapInitialized(true)
      console.log('Map Effect 1: Map instance created.');

    } catch (error) {
       console.error("Map Effect 1: Error initializing map:", error);
    }

    return () => {
      console.log('Map Effect 1: Cleaning up map instance.')
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      drawnItemsRef.current = null; // Clear drawn items ref
      segmentsLayerRef.current = null; // Clear segments layer ref
      setIsMapInitialized(false)
    }
  }, []) // Empty dependency array - run only once

  // Effect 2: Update Data Layer
  useEffect(() => {
    const mapInstance = mapRef.current
    if (!mapInstance || !isMapInitialized) {
       console.log('Map Effect 2: Skipping data layer update (map not ready).');
       return;
    }

    // Clear existing layer
    if (segmentsLayerRef.current) {
      mapInstance.removeLayer(segmentsLayerRef.current)
      segmentsLayerRef.current = null
      console.log("Map Effect 2: Removed existing segments layer.")
    }

    // Add new layer if geoJSON exists and has features
    if (geoJSON && geoJSON.features && geoJSON.features.length > 0) {
      console.log(`Map Effect 2: Creating GeoJSON layer with ${geoJSON.features.length} features (Styling: ${stylingMode}).`);

      const segmentsLayer = L.geoJSON(geoJSON as GeoJsonObject, {
        style: (feature?: Feature) => {
          if (!feature) return { color: '#808080', weight: 1 }; // Minimal style if no feature
          // Use the combined styling function
          return getFeatureStyle(
              feature,
              segments, // Provide segment data if needed by parameter styling
              parameters, // Provide parameters if needed by parameter styling
              selectedSegments,
              selectedParameter,
              stylingMode
          );
        },
        onEachFeature: (feature, layer) => {
          // Apply hover effects and click handler
          layer.on({
            mouseover: (e) => {
               const targetLayer = e.target;
               const segmentId = feature.properties?.id;
               if (segmentId && !selectedSegments.includes(segmentId)) {
                 if (targetLayer instanceof L.Path) {
                   targetLayer.setStyle({ weight: 5 }); // Highlight on hover
                   targetLayer.bringToFront();
                 }
               }
             },
             mouseout: (e) => {
               const targetLayer = e.target;
               const segmentId = feature.properties?.id;
               if (segmentId && !selectedSegments.includes(segmentId)) {
                 if (segmentsLayerRef.current && targetLayer instanceof L.Path) {
                   // Reset style using the main layer ref
                   segmentsLayerRef.current.resetStyle(targetLayer);
                 }
               }
             },
             click: () => handleSegmentClick(feature, layer) // Use memoized handler
          });

          // Add tooltips (optional)
           const props = feature.properties || {};
           let tooltipContent = `ID: ${props.id}`;
           if (props.cviScore !== undefined) tooltipContent += ` | CVI: ${props.cviScore.toFixed(2)}`;
           layer.bindTooltip(tooltipContent, { sticky: true });

        }
      }).addTo(mapInstance);

      segmentsLayerRef.current = segmentsLayer;
      console.log("Map Effect 2: Added new segments layer.");
    } else {
      console.log("Map Effect 2: No features in geoJSON to display.");
    }
  // Dependencies: Update layer when data, selection, styling parameters, or styling mode change
  }, [geoJSON, segments, parameters, selectedSegments, selectedParameter, stylingMode, handleSegmentClick, isMapInitialized]);

  // Effect 3: Fit Bounds to Data or Initial Bounds
  useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !isMapInitialized) {
      console.log("Map Effect 3: Skipping bounds fitting (map not ready).");
      return;
    }

    // Don't fit bounds if we are trying to zoom to a specific feature
    if (zoomToFeatureId && segmentsLayerRef.current) {
       console.log("Map Effect 3: Skipping general bounds fitting because zoomToFeatureId is active.");
       return;
    }

    let targetBounds: L.LatLngBounds | null = null;

    // Priority 1: Use initialBounds if provided and valid
    if (initialBounds) {
      try {
        const bounds = initialBounds instanceof L.LatLngBounds
          ? initialBounds
          : L.latLngBounds(initialBounds as L.LatLngExpression[]);

        if (bounds.isValid()) {
          targetBounds = bounds;
          console.log("Map Effect 3: Using provided initialBounds", targetBounds.toBBoxString());
        } else {
           console.warn("Map Effect 3: Provided initialBounds are invalid.");
        }
      } catch (e) {
         console.error("Map Effect 3: Error processing provided initialBounds:", e);
      }
    }

    // Priority 2: Calculate bounds from geoJSON if no valid initialBounds provided
    if (!targetBounds && geoJSON && geoJSON.features && geoJSON.features.length > 0) {
       console.log("Map Effect 3: Calculating bounds from geoJSON data.");
       try {
         const validFeatures = geoJSON.features.filter(f => f && f.geometry);
         if (validFeatures.length > 0) {
           const featureCollection = turf.featureCollection(validFeatures as any); // Cast to any for turf compatibility
           const bbox = turf.bbox(featureCollection); // [minLon, minLat, maxLon, maxLat]
            if (bbox && bbox.length === 4 && bbox.every((b: number) => isFinite(b)) && bbox[0] <= bbox[2] && bbox[1] <= bbox[3]) {
                targetBounds = L.latLngBounds([
                  [bbox[1], bbox[0]], // Southwest corner (lat, lon)
                  [bbox[3], bbox[2]]  // Northeast corner (lat, lon)
                ]);
                console.log("Map Effect 3: Calculated bounds from geoJSON", targetBounds.toBBoxString());
            } else {
                console.warn("Map Effect 3: Calculated bbox is invalid.", bbox);
            }
         } else {
            console.log("Map Effect 3: No valid features found in geoJSON for bounds calculation.");
         }
       } catch (e) {
         console.error("Map Effect 3: Error calculating bounds from geoJSON:", e);
       }
    }

    // Apply bounds if found
    if (targetBounds && targetBounds.isValid()) {
      console.log("Map Effect 3: Fitting map to bounds:", targetBounds.toBBoxString());
      // Use setTimeout to ensure rendering completes before fitting, prevents race condition
      setTimeout(() => {
         mapInstance.fitBounds(targetBounds, { padding: [50, 50], maxZoom: 18 });
      }, 100); // Small delay
    } else if (!initialBounds) { // Only reset view if no specific bounds were intended
      console.warn("Map Effect 3: No valid bounds found to fit. Resetting to default view.");
      mapInstance.setView([20, 0], 2); // Reset to default view if no data/bounds
    }
  // Dependencies: Refit when geoJSON data changes or specific initialBounds are passed
  }, [geoJSON, initialBounds, isMapInitialized, zoomToFeatureId]); // Add zoomToFeatureId to prevent fitting when zooming

   // Effect 4: Zoom to Specific Feature
   useEffect(() => {
    const mapInstance = mapRef.current;
    const segmentsLayer = segmentsLayerRef.current;
    if (!mapInstance || !segmentsLayer || !zoomToFeatureId || !isMapInitialized) {
      // console.log("Map Effect 4: Skipping zoom to feature (conditions not met).", { mapInstance: !!mapInstance, segmentsLayer: !!segmentsLayer, zoomToFeatureId, isMapInitialized });
      return;
    }

    console.log(`Map Effect 4: Attempting to zoom to feature ID: ${zoomToFeatureId}`);
    let foundLayer: L.Layer | null = null;

    segmentsLayer.eachLayer((layer: L.Layer) => {
      const feature = (layer as any).feature as Feature | undefined;
      if (feature?.properties?.id === zoomToFeatureId) {
        foundLayer = layer;
      }
    });

    if (foundLayer && typeof (foundLayer as L.GeoJSON).getBounds === 'function') {
       const bounds = (foundLayer as L.GeoJSON).getBounds();
       if (bounds.isValid()) {
         console.log(`Map Effect 4: Found feature ${zoomToFeatureId}, flying to bounds:`, bounds.toBBoxString());
         mapInstance.flyToBounds(bounds, { padding: [100, 100], maxZoom: 18, duration: 1 }); // Adjusted padding and duration
       } else {
          console.warn(`Map Effect 4: Feature ${zoomToFeatureId} found, but its bounds are invalid.`);
       }
    } else {
       console.warn(`Map Effect 4: Feature with ID ${zoomToFeatureId} not found in the segments layer or has no bounds.`);
    }
  // Dependencies: Trigger when the target feature ID changes or map initializes
  }, [zoomToFeatureId, isMapInitialized]); // Add isMapInitialized

  // Effect 5: Manage Draw Control
  useEffect(() => {
    const mapInstance = mapRef.current
    const drawnItemsInstance = drawnItemsRef.current

    if (!mapInstance || !drawnItemsInstance || !isMapInitialized) {
      console.log('Map Effect 5: Skipping draw control setup (map not ready).')
      return
    }

    console.log(`Map Effect 5: Setting up draw controls (isEditing: ${isEditing}).`)

    // Cleanup previous draw control and listeners
    if (drawControlRef.current) {
      console.log("Map Effect 5: Removing previous draw control.")
      try { mapInstance.removeControl(drawControlRef.current); } catch(e) { console.warn("Minor error removing old draw control", e); }
      drawControlRef.current = null;
    }
    // Remove specific listeners to avoid duplicates
    mapInstance.off(L.Draw.Event.CREATED);
    mapInstance.off(L.Draw.Event.DELETED);
    mapInstance.off(L.Draw.Event.DRAWSTART);
    mapInstance.off(L.Draw.Event.DRAWSTOP); // Added DRAWSTOP

    if (isEditing) {
      console.log("Map Effect 5: Adding Leaflet Draw controls.");

      const drawControlInstance = new L.Control.Draw({
        draw: {
          polyline: false,
          rectangle: false, // Kept disabled
          circle: false,
          circlemarker: false,
          marker: false,
          polygon: {
            allowIntersection: false,
            showArea: false, // Hide area tooltip during drawing
            shapeOptions: { color: '#007bff', weight: 2, opacity: 0.7, fillOpacity: 0.1 },
            // Tooltip text can be customized if needed
            // drawError: { color: '#e1e1e1', message: 'Error!' },
            // tooltip: { start: 'Click to start drawing shape.', cont: 'Click to continue drawing shape.', end: 'Click first point to close this shape.' }
          }
        },
        edit: {
          featureGroup: drawnItemsInstance,
          remove: true // Allow deletion of the drawn shape
        }
      });

      mapInstance.addControl(drawControlInstance);
      drawControlRef.current = drawControlInstance;

      // Event Handlers
      mapInstance.on(L.Draw.Event.DRAWSTART, (e: any) => {
        console.log(`Draw Event: START (${e.layerType})`);
        // Clear previous temporary shapes immediately
        drawnItemsInstance.clearLayers();
      });

       mapInstance.on(L.Draw.Event.CREATED, (e: any) => {
         const layer = e.layer as L.Path;
         const type = e.layerType;
         console.log(`Draw Event: CREATED (${type})`);

         // Only process polygons for area selection
         if (type === 'polygon') {
           try {
             const layerWithGeoJSON = layer as any;
             if (typeof layerWithGeoJSON.toGeoJSON === 'function') {
               const feature = layerWithGeoJSON.toGeoJSON();
               if (feature.geometry && feature.geometry.type === 'Polygon') {
                 const geoJsonGeom = feature.geometry as GeoJSONPolygon;
                 console.log("Map: Passing geometry to onAreaSelect:", JSON.stringify(geoJsonGeom));
                 onAreaSelect(geoJsonGeom); // Pass the geometry to the parent handler

                 // IMPORTANT: Clear the drawn layer *after* processing by the parent.
                 // Do not add it to drawnItemsInstance if it's meant to be temporary.
                 // If you need it to persist for editing, then add it:
                 // drawnItemsInstance.addLayer(layer);
                 // But for simple selection, clearing is usually desired:
                 // setTimeout(() => mapInstance.removeLayer(layer), 0); // Remove the visual layer
                 // The parent component (ParameterAssignmentPage) now handles adding to selectedSegments.
                 // We don't need to keep the polygon visually unless specified.
                 // Let's assume the polygon is temporary for selection:
                 setTimeout(() => {
                    try {
                        if (mapInstance.hasLayer(layer)) {
                            mapInstance.removeLayer(layer);
                            console.log("Map: Removed temporary drawing layer after CREATED event.");
                        }
                    } catch (removeError) {
                        console.warn("Map: Error removing temporary drawing layer:", removeError);
                    }
                 }, 0); // Use timeout to ensure event processing completes


               } else {
                 console.error("Map: Created layer is not a valid Polygon GeoJSON", feature);
               }
             } else {
                console.error("Map: Created layer does not have toGeoJSON method.");
             }
           } catch (error) {
             console.error("Map: Error processing created geometry:", error);
           }
         } else {
            // Handle other types if needed, or just remove them
            setTimeout(() => mapInstance.removeLayer(layer), 0);
         }
       });


      mapInstance.on(L.Draw.Event.DELETED, (e: any) => {
        console.log("Draw Event: DELETED (Selection shape removed by user)");
        // If selectionPolygons state is used to persist shapes, call onSelectionDelete here
        // e.layers.eachLayer(layer => {
        //   const polygonId = (layer as any).polygonId; // Assuming you add an ID
        //   if (polygonId) onSelectionDelete(polygonId);
        // });
      });

      mapInstance.on(L.Draw.Event.DRAWSTOP, (e: any) => {
         console.log(`Draw Event: STOP`);
         // Could potentially clear temporary layers here too if needed
      });

    } else {
      console.log("Map Effect 5: Editing disabled, draw controls not added.")
    }

    // Cleanup function for the effect
    return () => {
      console.log("Map Effect 5: Cleaning up draw controls and listeners.");
      if (mapRef.current && drawControlRef.current) {
        try { mapRef.current.removeControl(drawControlRef.current); } catch (e) { console.warn("Minor error removing draw control on effect cleanup", e); }
        drawControlRef.current = null;
      }
      if (mapRef.current) {
        // Remove listeners added in this effect
        mapRef.current.off(L.Draw.Event.CREATED);
        mapRef.current.off(L.Draw.Event.DELETED);
        mapRef.current.off(L.Draw.Event.DRAWSTART);
        mapRef.current.off(L.Draw.Event.DRAWSTOP); // Added DRAWSTOP cleanup
      }
    }
  }, [isEditing, onAreaSelect, onSelectionDelete, isMapInitialized]); // Add onSelectionDelete dependency

  return <div id="map" style={{ height: '100%', width: '100%', minHeight: '400px' }}></div>
}
Map.displayName = 'MapComponent'; // Add display name
export default Map