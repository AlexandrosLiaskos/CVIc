import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import type { Parameter, ShorelineSegment, SelectionPolygon } from '../../types'
import type { Feature, FeatureCollection, Geometry } from 'geojson'

interface MapProps {
  geoJSON: any
  segments: ShorelineSegment[]
  parameters: Parameter[]
  selectedParameter: string | null
  selectedSegments: string[]
  selectionPolygons: SelectionPolygon[]
  onSegmentSelect: (segmentId: string) => void
  onSelectionCreate: (geometry: any) => void
  onSelectionDelete: (polygonId: string) => void
  isEditing: boolean
}

function getSegmentStyle(
  segment: ShorelineSegment,
  parameter: Parameter | undefined,
  isSelected: boolean,
  paramId: string | null
): L.PathOptions {
  if (!paramId || !parameter) {
    return {
      color: isSelected ? '#FF4500' : '#808080',
      weight: isSelected ? 5 : 2,
      opacity: isSelected ? 1 : 0.7,
      dashArray: isSelected ? undefined : '5,5',
      fillOpacity: isSelected ? 0.3 : 0.1
    }
  }

  const paramValue = segment.parameters[paramId]
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

export default function Map({
  geoJSON,
  segments,
  parameters,
  selectedParameter,
  selectedSegments,
  selectionPolygons,
  onSegmentSelect,
  onSelectionCreate,
  onSelectionDelete,
  isEditing
}: MapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const drawControlRef = useRef<L.Control.Draw | null>(null)
  const featureGroupRef = useRef<L.FeatureGroup | null>(null)
  const segmentLayersRef = useRef<Record<string, L.GeoJSON>>({})
  const selectionLayersRef = useRef<Record<string, L.Layer>>({})

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map
      const map = L.map('map').setView([38.2, 21.7], 11)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 19
      }).addTo(map)
      mapRef.current = map

      // Initialize feature groups
      const featureGroup = L.featureGroup().addTo(map)
      featureGroupRef.current = featureGroup

      // Initialize draw control
      const drawControl = new L.Control.Draw({
        draw: {
          polyline: false,
          circle: false,
          circlemarker: false,
          marker: false,
          rectangle: false,
          polygon: {
            allowIntersection: false,
            showArea: true
          }
        },
        edit: {
          featureGroup: featureGroup,
          remove: true
        }
      })
      drawControlRef.current = drawControl

      // Add draw control if editing is enabled
      if (isEditing) {
        map.addControl(drawControl)
      }

      // Handle draw events
      map.on(L.Draw.Event.CREATED, (e: any) => {
        const layer = e.layer
        const geometry = layer.toGeoJSON().geometry
        onSelectionCreate(geometry)
      })

      map.on(L.Draw.Event.DELETED, (e: any) => {
        const layers = e.layers
        layers.eachLayer((layer: any) => {
          const polygonId = (layer as any).options.polygonId
          if (polygonId) {
            onSelectionDelete(polygonId)
          }
        })
      })

      // Add segments to map
      segments.forEach(segment => {
        const feature: Feature = {
          type: 'Feature',
          geometry: segment.geometry as Geometry,
          properties: {}
        }
        
        const layer = L.geoJSON(feature, {
          style: getSegmentStyle(segment, parameters.find(p => p.id === selectedParameter), false, selectedParameter)
        })

        // Add hover effects
        layer.on('mouseover', () => {
          if (!selectedSegments.includes(segment.id)) {
            layer.setStyle({
              weight: 4,
              opacity: 0.9,
              color: '#4B5563' // gray-600
            })
          }
        })

        layer.on('mouseout', () => {
          if (!selectedSegments.includes(segment.id)) {
            const parameter = parameters.find(p => p.id === selectedParameter)
            layer.setStyle(getSegmentStyle(segment, parameter, false, selectedParameter))
          }
        })

        layer.on('click', () => {
          onSegmentSelect(segment.id)
        })

        layer.addTo(map)
        segmentLayersRef.current[segment.id] = layer
      })

      // Add GeoJSON layer if available
      if (geoJSON) {
        console.log('Adding GeoJSON layer:', geoJSON)
        const geoJSONLayer = L.geoJSON(geoJSON, {
          style: {
            color: '#0284c7',
            weight: 2,
            opacity: 0.8
          }
        })
        geoJSONLayer.addTo(map)
        console.log('GeoJSON layer added, bounds:', geoJSONLayer.getBounds())
      } else {
        console.log('No GeoJSON data available')
      }

      // Fit map to segments bounds if there are any segments
      if (segments.length > 0) {
        const featureCollection: FeatureCollection = {
          type: 'FeatureCollection',
          features: segments.map(s => ({
            type: 'Feature',
            geometry: s.geometry as Geometry,
            properties: {}
          }))
        }
        const bounds = L.geoJSON(featureCollection).getBounds()
        if (bounds.isValid()) {
          map.fitBounds(bounds)
        } else {
          // If bounds are invalid, set a default view
          map.setView([38.2, 21.7], 11)
        }
      } else if (geoJSON) {
        // If no segments but we have geoJSON, try to fit to that
        const layer = L.geoJSON(geoJSON)
        const bounds = layer.getBounds()
        if (bounds.isValid()) {
          map.fitBounds(bounds)
        } else {
          // If bounds are invalid, set a default view
          map.setView([38.2, 21.7], 11)
        }
      } else {
        // If no valid data, set a default view
        map.setView([38.2, 21.7], 11)
      }
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Update segment styles based on selection and parameter values
  useEffect(() => {
    const parameter = parameters.find(p => p.id === selectedParameter)

    // Update segment styles
    segments.forEach(segment => {
      const layer = segmentLayersRef.current[segment.id]
      if (!layer) return

      const isSelected = selectedSegments.includes(segment.id)
      const style = getSegmentStyle(segment, parameter, isSelected, selectedParameter)
      layer.setStyle(style)

      // Update z-index to bring selected segments to front
      if (isSelected) {
        layer.bringToFront()
        
        // Zoom to the selected segment if there's only one selected
        if (selectedSegments.length === 1 && mapRef.current) {
          try {
            const bounds = layer.getBounds()
            if (bounds.isValid()) {
              // Add some padding around the segment for better visibility
              mapRef.current.fitBounds(bounds, {
                padding: [50, 50],
                maxZoom: 16,
                animate: true,
                duration: 0.5
              })
            }
          } catch (error) {
            console.error('Error zooming to selected segment:', error)
          }
        }
      }
    })
  }, [segments, selectedParameter, selectedSegments, parameters])

  // Update selection polygons
  useEffect(() => {
    if (!featureGroupRef.current) return

    // Clear old selection layers
    Object.values(selectionLayersRef.current).forEach(layer => {
      layer.remove()
    })
    selectionLayersRef.current = {}

    // Add new selection polygons
    selectionPolygons.forEach(polygon => {
      const feature: Feature = {
        type: 'Feature',
        geometry: polygon.geometry as Geometry,
        properties: { polygonId: polygon.id }
      }
      
      const layer = L.geoJSON(feature, {
        style: {
          fillColor: '#3B82F6',
          fillOpacity: 0.2,
          color: '#3B82F6',
          weight: 2
        }
      })
      ;(layer as any).options.polygonId = polygon.id
      layer.addTo(featureGroupRef.current!)
      selectionLayersRef.current[polygon.id] = layer
    })
  }, [selectionPolygons])

  return <div id="map" className="w-full h-full" />
} 