// ---- File: src/components/maps/Map.tsx ----
import React, { useEffect, useRef, useCallback, useState } from 'react'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import type { Parameter, ShorelineSegment, SelectionPolygon } from '../../types'
import type { FeatureCollection, Polygon as GeoJSONPolygon, Feature, GeoJsonObject } from 'geojson'
import * as turf from '@turf/turf' // Import turf

interface MapProps {
  segments: ShorelineSegment[]
  parameters: Parameter[]
  selectedSegments: string[]
  selectedParameter: string | null
  selectionPolygons: SelectionPolygon[]
  onSegmentSelect: (segmentId: string) => void
  onSelectionCreate: (polygon: SelectionPolygon) => void
  onSelectionDelete: (polygonId: string) => void
  onAreaSelect: (geometry: GeoJSONPolygon) => void
  isEditing: boolean
  initialBounds?: L.LatLngBoundsExpression | null // Updated type
  geoJSON?: FeatureCollection | null // Allow null for initial state
  zoomToFeatureId?: string | null // New prop for zooming to specific feature
}

function getSegmentStyle(
  segment: ShorelineSegment,
  parameter: Parameter | null,
  isSelected: boolean,
  selectedParameterId: string | null
): L.PathOptions {
  if (!selectedParameterId || !parameter || !segment.parameters || !segment.parameters[selectedParameterId]) {
    return {
      color: isSelected ? '#FF4500' : '#808080',
      weight: isSelected ? 5 : 2,
      opacity: isSelected ? 1 : 0.7,
      dashArray: isSelected ? undefined : '5,5',
      fillOpacity: isSelected ? 0.3 : 0.1
    }
  }

  const paramValue = segment.parameters[selectedParameterId]
  if (!paramValue) {
    return {
      color: isSelected ? '#FF4500' : '#808080',
      weight: isSelected ? 5 : 2,
      opacity: isSelected ? 1 : 0.7,
      dashArray: isSelected ? undefined : '5,5',
      fillOpacity: isSelected ? 0.3 : 0.1
    }
  }

  let color = '#808080'
  if (parameter.type === 'categorical') {
    const option = parameter.options?.find(o => o.value === paramValue.value)
    color = option?.color || '#808080'
  } else {
    const range = parameter.vulnerabilityRanges?.find(r => r.value === paramValue.vulnerability)
    color = range?.color || '#808080'
  }

  return {
    color: isSelected ? '#FF4500' : color,
    weight: isSelected ? 5 : 2,
    opacity: isSelected ? 1 : 0.7,
    dashArray: isSelected ? undefined : '5,5',
    fillOpacity: isSelected ? 0.3 : 0.1
  }
}

const Map: React.FC<MapProps> = ({
  segments,
  parameters,
  selectedSegments,
  selectedParameter,
  selectionPolygons,
  onSegmentSelect,
  onSelectionCreate,
  onSelectionDelete,
  onAreaSelect,
  isEditing,
  initialBounds,
  geoJSON,
  zoomToFeatureId
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

    if ((mapContainer as any)._leaflet_id) {
      console.warn("Map container already had a Leaflet ID. Clearing it.");
      (mapContainer as any)._leaflet_id = null; // Attempt to clear previous instance
    }

    try {
      const mapInstance = L.map('map', {
        // Set a default view, but expect it to be overridden by bounds fitting
        center: [20, 0], // More generic center
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
      console.log(`Map Effect 2: Creating GeoJSON layer with ${geoJSON.features.length} features.`);
      const segmentsLayer = L.geoJSON(geoJSON as GeoJsonObject, {
        style: (feature?: Feature) => {
          // Use existing styling logic
          if (!feature?.properties) {
            return { color: '#808080', weight: 2 }
          }
          const segmentId = feature.properties.id
          const isSelected = selectedSegments.includes(segmentId)
          // Find segment data - Note: 'segments' prop might not be needed if styling uses geoJSON props
          const segmentData = segments.find(s => s.id === segmentId) // Assuming 'segments' prop holds full data needed for styling
          const parameterData = selectedParameter ? parameters.find(p => p.id === selectedParameter) : null

          // Fallback style if segmentData not found (should ideally use geoJSON properties)
           if (!segmentData) {
             console.warn(`Segment data not found for ID: ${segmentId}. Using default style.`);
             return {
               color: isSelected ? '#FF4500' : '#3388ff', // Default colors
               weight: isSelected ? 5 : 3,
               opacity: isSelected ? 1 : 0.7
             };
           }

          return getSegmentStyle(segmentData, parameterData || null, isSelected, selectedParameter)
        },
        onEachFeature: (feature, layer) => {
          // Use existing onEachFeature logic
          layer.on({
            mouseover: (e) => {
               const targetLayer = e.target;
               const segmentId = feature.properties?.id;
               if (segmentId && !selectedSegments.includes(segmentId)) {
                 if (targetLayer instanceof L.Path) {
                   targetLayer.setStyle({ weight: 5 });
                   targetLayer.bringToFront();
                 }
               }
             },
             mouseout: (e) => {
               const targetLayer = e.target;
               const segmentId = feature.properties?.id;
               if (segmentId && !selectedSegments.includes(segmentId)) {
                 if (segmentsLayerRef.current && targetLayer instanceof L.Path) {
                   // Use resetStyle on the main layer ref with the specific layer target
                   segmentsLayerRef.current.resetStyle(targetLayer);
                 }
               }
             },
             click: () => handleSegmentClick(feature, layer)
          })
        }
      }).addTo(mapInstance)

      segmentsLayerRef.current = segmentsLayer
      console.log("Map Effect 2: Added new segments layer.")
    } else {
      console.log("Map Effect 2: No features in geoJSON to display.")
    }
  // Dependencies: Update layer when data, selection, or styling parameters change
  }, [geoJSON, segments, parameters, selectedSegments, selectedParameter, handleSegmentClick, isMapInitialized])

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
        // Handle both LatLngBounds and LatLngBoundsExpression
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
         // Filter out features with null geometry just in case
         const validFeatures = geoJSON.features.filter(f => f && f.geometry);
         if (validFeatures.length > 0) {
           const featureCollection = turf.featureCollection(validFeatures as any); // Cast to any for turf
           const bbox = turf.bbox(featureCollection); // [minLon, minLat, maxLon, maxLat]
           if (bbox && bbox.length === 4 && bbox.every(b => isFinite(b))) {
             // Check for invalid bbox (e.g., min > max)
             if (bbox[0] <= bbox[2] && bbox[1] <= bbox[3]) {
                targetBounds = L.latLngBounds([
                  [bbox[1], bbox[0]], // Southwest corner (lat, lon)
                  [bbox[3], bbox[2]]  // Northeast corner (lat, lon)
                ]);
                console.log("Map Effect 3: Calculated bounds from geoJSON", targetBounds.toBBoxString());
             } else {
                 console.warn("Map Effect 3: Calculated bbox is invalid (min > max).", bbox);
             }
           } else {
             console.warn("Map Effect 3: Could not calculate valid bbox from geoJSON.", bbox);
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
      mapInstance.fitBounds(targetBounds, { padding: [50, 50], maxZoom: 18 }); // Increase maxZoom slightly
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
      console.log("Map Effect 4: Skipping zoom to feature (conditions not met).", { mapInstance: !!mapInstance, segmentsLayer: !!segmentsLayer, zoomToFeatureId, isMapInitialized });
      return;
    }

    console.log(`Map Effect 4: Attempting to zoom to feature ID: ${zoomToFeatureId}`);
    let foundLayer: L.Layer | null = null;

    segmentsLayer.eachLayer((layer: L.Layer) => {
      // Check if the layer is a Feature layer and has the matching ID
      const feature = (layer as any).feature as Feature | undefined;
      if (feature?.properties?.id === zoomToFeatureId) {
        foundLayer = layer;
      }
    });

    if (foundLayer && typeof (foundLayer as L.GeoJSON).getBounds === 'function') {
       const bounds = (foundLayer as L.GeoJSON).getBounds();
       if (bounds.isValid()) {
         console.log(`Map Effect 4: Found feature ${zoomToFeatureId}, flying to bounds:`, bounds.toBBoxString());
         mapInstance.flyToBounds(bounds, { padding: [50, 50], maxZoom: 18 }); // Use flyToBounds for smoother transition
       } else {
          console.warn(`Map Effect 4: Feature ${zoomToFeatureId} found, but its bounds are invalid.`);
       }
    } else {
       console.warn(`Map Effect 4: Feature with ID ${zoomToFeatureId} not found in the segments layer or has no bounds.`);
    }
  // Dependencies: Trigger when the target feature ID changes
  }, [zoomToFeatureId, isMapInitialized]); // Also depends on isMapInitialized

  // Effect 5: Manage Draw Control (was Effect 3)
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
      try {
        mapInstance.removeControl(drawControlRef.current)
      } catch(e) { console.warn("Minor error removing old draw control", e) }
      drawControlRef.current = null
    }
    mapInstance.off(L.Draw.Event.CREATED)
    mapInstance.off(L.Draw.Event.DELETED)
    mapInstance.off(L.Draw.Event.DRAWSTART)

    if (isEditing) {
      console.log("Map Effect 5: Adding Leaflet Draw controls.")

      const drawControlInstance = new L.Control.Draw({
        draw: {
          polyline: false,
          // Reason: Rectangle tool is disabled as per user request. Only Polygon remains for area selection.
          rectangle: false, // <-- **MODIFIED HERE**
          circle: false,
          circlemarker: false,
          marker: false,
          polygon: {
            allowIntersection: false,
            showArea: false,
            shapeOptions: {
              color: '#007bff',
              weight: 2,
              opacity: 0.7,
              fillOpacity: 0.1,
            }
          }
        },
        edit: {
          featureGroup: drawnItemsInstance,
          remove: true
        }
      })

      mapInstance.addControl(drawControlInstance)
      drawControlRef.current = drawControlInstance

      // Handle Draw Start
      mapInstance.on(L.Draw.Event.DRAWSTART, (e: any) => {
        console.log(`Draw Event: START (${e.layerType})`)
        drawnItemsInstance.clearLayers()
      })

      // Handle Draw Creation
      mapInstance.on(L.Draw.Event.CREATED, (e: any) => {
        const layer = e.layer as L.Path
        const type = e.layerType

        console.log(`Draw Event: CREATED (${type})`)

        drawnItemsInstance.addLayer(layer)

        // Only Polygon type remains relevant for onAreaSelect now
        if (type === 'polygon') {
          try {
            // Cast to any to access toGeoJSON method
            const layerWithGeoJSON = layer as any
            if (typeof layerWithGeoJSON.toGeoJSON === 'function') {
              const feature = layerWithGeoJSON.toGeoJSON()
              if (feature.geometry && feature.geometry.type === 'Polygon') {
                const geoJsonGeom = feature.geometry as GeoJSONPolygon
                console.log("Map: Passing geometry to onAreaSelect:", JSON.stringify(geoJsonGeom))
                onAreaSelect(geoJsonGeom)
              } else {
                console.error("Map: Created layer is not a valid Polygon GeoJSON", feature)
              }
            }
          } catch (error) {
            console.error("Map: Error processing created geometry:", error)
          }
        }
      })

      // Handle Deletion
      mapInstance.on(L.Draw.Event.DELETED, (e: any) => {
        console.log("Draw Event: DELETED (Selection shape removed by user)")
      })
    } else {
      console.log("Map Effect 5: Editing disabled, draw controls not added.")
    }

    return () => {
      console.log("Map Effect 5: Cleaning up draw controls and listeners.")
      if (mapRef.current && drawControlRef.current) {
        try {
          mapRef.current.removeControl(drawControlRef.current)
          drawControlRef.current = null
        } catch (e) { console.warn("Minor error removing draw control on effect cleanup", e) }
      }
      if (mapRef.current) {
        mapRef.current.off(L.Draw.Event.CREATED)
        mapRef.current.off(L.Draw.Event.DELETED)
        mapRef.current.off(L.Draw.Event.DRAWSTART)
      }
    }
  }, [isEditing, onAreaSelect, isMapInitialized])

  return <div id="map" style={{ height: '100%', width: '100%', minHeight: '400px' }}></div>
}

export default Map