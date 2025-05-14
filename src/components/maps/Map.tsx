// ---- File: src/components/maps/Map.tsx ----
import React, { useEffect, useRef, useCallback, useState } from 'react'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import type { Parameter, ShorelineSegment, SelectionPolygon } from '../../types'
import type { FeatureCollection, Polygon as GeoJSONPolygon, Feature, GeoJsonObject } from 'geojson'
import * as turf from '@turf/turf'

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
  initialBounds?: L.LatLngBoundsExpression | null
  geoJSON?: FeatureCollection | null
  zoomToFeatureId?: string | null
  stylingMode?: 'parameter' | 'cvi'
}

const getCviColor = (score: number | undefined | null): string => {
  if (score === undefined || score === null || isNaN(score)) return '#808080';

  const rank = Math.round(score);
  if (rank <= 1) return '#1a9850';
  if (rank === 2) return '#91cf60';
  if (rank === 3) return '#fee08b';
  if (rank === 4) return '#fc8d59';
  if (rank >= 5) return '#d73027';
  return '#808080';
};

function getFeatureStyle(
  feature: Feature,
  segments: ShorelineSegment[],
  parameters: Parameter[],
  selectedSegments: string[],
  selectedParameterId: string | null,
  stylingMode: 'parameter' | 'cvi' = 'parameter'
): L.PathOptions {

  const segmentId = feature.properties?.id;
  const isSelected = segmentId ? selectedSegments.includes(segmentId) : false;
  const cviScore = feature.properties?.vulnerabilityIndex;

  if (stylingMode === 'cvi') {
    const color = getCviColor(cviScore);
    return {
      color: isSelected ? '#0ea5e9' : color,
      weight: isSelected ? 5 : 3,
      opacity: isSelected ? 1 : 0.8,
      fillOpacity: isSelected ? 0.4 : 0.2,
    };
  }


  const segmentData = segmentId ? segments.find(s => s.id === segmentId) : null;
  const parameter = selectedParameterId ? parameters.find(p => p.id === selectedParameterId) : null;

  if (!selectedParameterId || !parameter || !segmentData?.parameters) {
    return {
      color: isSelected ? '#FF4500' : '#3388ff',
      weight: isSelected ? 5 : 3,
      opacity: 1,
    };
  }

  const paramValue = segmentData.parameters[selectedParameterId];

  if (!paramValue) {
    return {
      color: isSelected ? '#FF4500' : '#808080',
      weight: isSelected ? 5 : 2,
      opacity: isSelected ? 1 : 0.6,
      dashArray: '5,5',
    };
  }

  let valueColor = '#3388ff';
  const vulnerabilityScore = paramValue.vulnerability;

  if (parameter.type === 'categorical' && parameter.options) {
    const option = parameter.options.find(o => o.value === paramValue.value);
    valueColor = option?.color || getCviColor(vulnerabilityScore);
  } else if (parameter.type === 'numerical' && parameter.vulnerabilityRanges) {
    const range = parameter.vulnerabilityRanges.find(r => r.value === vulnerabilityScore);
    valueColor = range?.color || '#808080';
  }

  return {
    color: isSelected ? '#FF4500' : valueColor,
    weight: isSelected ? 5 : 3,
    opacity: 1,
 };
}


const Map: React.FC<MapProps> = ({
  segments,
  parameters,
  selectedSegments,
  selectedParameter,
  onSegmentSelect,
  onSelectionDelete,
  onAreaSelect,
  isEditing,
  initialBounds,
  geoJSON,
  zoomToFeatureId,
  stylingMode = 'parameter'
}) => {
  const mapRef = useRef<L.Map | null>(null)
  const drawControlRef = useRef<L.Control.Draw | null>(null)
  const segmentsLayerRef = useRef<L.GeoJSON | null>(null)
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null)
  const [isMapInitialized, setIsMapInitialized] = useState(false)
  const handleSegmentClick = useCallback((feature: Feature, layer: L.Layer) => {
    if (feature.properties && feature.properties.id) {
      const segmentId = feature.properties.id
      console.log('Map: Segment clicked:', segmentId)
      onSegmentSelect(segmentId)

       if (mapRef.current && layer instanceof L.Path) {
           const props = feature.properties || {} as any;
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
      drawnItemsRef.current = null;
      segmentsLayerRef.current = null;
      setIsMapInitialized(false)
    }
  }, [])

  useEffect(() => {
    const mapInstance = mapRef.current
    if (!mapInstance || !isMapInitialized) {
       console.log('Map Effect 2: Skipping data layer update (map not ready).');
       return;
    }

    if (segmentsLayerRef.current) {
      mapInstance.removeLayer(segmentsLayerRef.current)
      segmentsLayerRef.current = null
      console.log("Map Effect 2: Removed existing segments layer.")
    }

    if (geoJSON && geoJSON.features && geoJSON.features.length > 0) {
      console.log(`Map Effect 2: Creating GeoJSON layer with ${geoJSON.features.length} features (Styling: ${stylingMode}).`);

      const segmentsLayer = L.geoJSON(geoJSON as GeoJsonObject, {
        style: (feature?: Feature) => {
          if (!feature) return { color: '#808080', weight: 1 };
          return getFeatureStyle(
              feature,
              segments,
              parameters,
              selectedSegments,
              selectedParameter,
              stylingMode
          );
        },
        onEachFeature: (feature, layer) => {
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
                   segmentsLayerRef.current.resetStyle(targetLayer);
                 }
               }
             },
             click: () => handleSegmentClick(feature, layer)
          });

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
  }, [geoJSON, segments, parameters, selectedSegments, selectedParameter, stylingMode, handleSegmentClick, isMapInitialized]);

  useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !isMapInitialized) {
      console.log("Map Effect 3: Skipping bounds fitting (map not ready).");
      return;
    }

    if (zoomToFeatureId && segmentsLayerRef.current) {
       console.log("Map Effect 3: Skipping general bounds fitting because zoomToFeatureId is active.");
       return;
    }

    let targetBounds: L.LatLngBounds | null = null;

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

    if (!targetBounds && geoJSON && geoJSON.features && geoJSON.features.length > 0) {
       console.log("Map Effect 3: Calculating bounds from geoJSON data.");
       try {
         const validFeatures = geoJSON.features.filter(f => f && f.geometry);
         if (validFeatures.length > 0) {
           const featureCollection = turf.featureCollection(validFeatures as any);
           const bbox = turf.bbox(featureCollection);
            if (bbox && bbox.length === 4 && bbox.every((b: number) => isFinite(b)) && bbox[0] <= bbox[2] && bbox[1] <= bbox[3]) {
                targetBounds = L.latLngBounds([
                  [bbox[1], bbox[0]],
                  [bbox[3], bbox[2]]
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

    if (targetBounds && targetBounds.isValid()) {
      console.log("Map Effect 3: Fitting map to bounds:", targetBounds.toBBoxString());
      setTimeout(() => {
         mapInstance.fitBounds(targetBounds, { padding: [50, 50], maxZoom: 18 });
      }, 100); // Small delay
    } else if (!initialBounds) {
      console.warn("Map Effect 3: No valid bounds found to fit. Resetting to default view.");
      mapInstance.setView([20, 0], 2);
    }
  }, [geoJSON, initialBounds, isMapInitialized, zoomToFeatureId]);

   useEffect(() => {
    const mapInstance = mapRef.current;
    const segmentsLayer = segmentsLayerRef.current;
    if (!mapInstance || !segmentsLayer || !zoomToFeatureId || !isMapInitialized) {
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
  }, [zoomToFeatureId, isMapInitialized]);

  useEffect(() => {
    const mapInstance = mapRef.current
    const drawnItemsInstance = drawnItemsRef.current

    if (!mapInstance || !drawnItemsInstance || !isMapInitialized) {
      console.log('Map Effect 5: Skipping draw control setup (map not ready).')
      return
    }

    console.log(`Map Effect 5: Setting up draw controls (isEditing: ${isEditing}).`)

    if (drawControlRef.current) {
      console.log("Map Effect 5: Removing previous draw control.")
      try { mapInstance.removeControl(drawControlRef.current); } catch(e) { console.warn("Minor error removing old draw control", e); }
      drawControlRef.current = null;
    }
    mapInstance.off(L.Draw.Event.CREATED);
    mapInstance.off(L.Draw.Event.DELETED);
    mapInstance.off(L.Draw.Event.DRAWSTART);
    mapInstance.off(L.Draw.Event.DRAWSTOP);

    if (isEditing) {
      console.log("Map Effect 5: Adding Leaflet Draw controls.");

      const drawControlInstance = new L.Control.Draw({
        draw: {
          polyline: false,
          rectangle: false,
          circle: false,
          circlemarker: false,
          marker: false,
          polygon: {
            allowIntersection: false,
            showArea: false,
            shapeOptions: { color: '#007bff', weight: 2, opacity: 0.7, fillOpacity: 0.1 },
          }
        },
        edit: {
          featureGroup: drawnItemsInstance,
          remove: true
        }
      });

      mapInstance.addControl(drawControlInstance);
      drawControlRef.current = drawControlInstance;

      mapInstance.on(L.Draw.Event.DRAWSTART, (e: any) => {
        console.log(`Draw Event: START (${e.layerType})`);
        drawnItemsInstance.clearLayers();
      });

       mapInstance.on(L.Draw.Event.CREATED, (e: any) => {
         const layer = e.layer as L.Path;
         const type = e.layerType;
         console.log(`Draw Event: CREATED (${type})`);

         if (type === 'polygon') {
           try {
             const layerWithGeoJSON = layer as any;
             if (typeof layerWithGeoJSON.toGeoJSON === 'function') {
               const feature = layerWithGeoJSON.toGeoJSON();
               if (feature.geometry && feature.geometry.type === 'Polygon') {
                 const geoJsonGeom = feature.geometry as GeoJSONPolygon;
                 console.log("Map: Passing geometry to onAreaSelect:", JSON.stringify(geoJsonGeom));
                 onAreaSelect(geoJsonGeom);
                 setTimeout(() => {
                    try {
                        if (mapInstance.hasLayer(layer)) {
                            mapInstance.removeLayer(layer);
                            console.log("Map: Removed temporary drawing layer after CREATED event.");
                        }
                    } catch (removeError) {
                        console.warn("Map: Error removing temporary drawing layer:", removeError);
                    }
                 }, 0);


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
            setTimeout(() => mapInstance.removeLayer(layer), 0);
         }
       });


      mapInstance.on(L.Draw.Event.DELETED, () => {
        console.log("Draw Event: DELETED (Selection shape removed by user)");
      });

      mapInstance.on(L.Draw.Event.DRAWSTOP, () => {
         console.log(`Draw Event: STOP`);
      });

    } else {
      console.log("Map Effect 5: Editing disabled, draw controls not added.")
    }

    return () => {
      console.log("Map Effect 5: Cleaning up draw controls and listeners.");
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
    }
  }, [isEditing, onAreaSelect, onSelectionDelete, isMapInitialized]);

  return <div id="map" style={{ height: '100%', width: '100%', minHeight: '400px' }}></div>
}
Map.displayName = 'MapComponent';
export default Map