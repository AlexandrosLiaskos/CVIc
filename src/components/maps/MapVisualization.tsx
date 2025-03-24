import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Feature, Geometry } from 'geojson'
import type { MapFeatureCollection, MapFeature, MapFeatureProperties } from '../../types'

interface MapVisualizationProps {
  center?: [number, number]
  zoom?: number
  geoJSON?: MapFeatureCollection
  onFeatureClick?: (feature: MapFeature) => void
  featureStyle?: L.StyleFunction<MapFeature> | L.PathOptions
}

const DEFAULT_CENTER: [number, number] = [
  Number(import.meta.env.VITE_DEFAULT_MAP_CENTER_LAT) || 0,
  Number(import.meta.env.VITE_DEFAULT_MAP_CENTER_LNG) || 0
]
const DEFAULT_ZOOM = Number(import.meta.env.VITE_DEFAULT_MAP_ZOOM) || 2

const DEFAULT_STYLE: L.PathOptions = {
  color: '#0284c7',
  weight: 2,
  opacity: 1,
  fillOpacity: 0.2
}

function isMapFeature(feature: Feature<Geometry, any>): feature is MapFeature {
  return (
    feature.type === 'Feature' &&
    feature.properties !== null &&
    typeof feature.properties === 'object' &&
    'id' in feature.properties &&
    'cviScore' in feature.properties
  )
}

function hasName(properties: any): properties is MapFeatureProperties & { name: string } {
  return properties && typeof properties === 'object' && typeof properties.name === 'string'
}

export default function MapVisualization({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  geoJSON,
  onFeatureClick,
  featureStyle = DEFAULT_STYLE
}: MapVisualizationProps) {
  const mapRef = useRef<L.Map | null>(null)
  const geoJSONLayerRef = useRef<L.GeoJSON<MapFeature> | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map
      mapRef.current = L.map('map', {
        center: center,
        zoom: zoom,
        minZoom: 1,
        maxZoom: 18,
        scrollWheelZoom: true,
        zoomControl: true
      })

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        tileSize: 256
      }).addTo(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (mapRef.current && geoJSON) {
      // Remove existing GeoJSON layer if it exists
      if (geoJSONLayerRef.current) {
        geoJSONLayerRef.current.remove()
      }

      // Add new GeoJSON layer
      geoJSONLayerRef.current = L.geoJSON(geoJSON, {
        style: featureStyle,
        onEachFeature: (feature, layer) => {
          if (onFeatureClick && isMapFeature(feature)) {
            layer.on('click', () => onFeatureClick(feature))
          }

          // Add tooltips if feature has a name property
          if (hasName(feature.properties)) {
            layer.bindTooltip(feature.properties.name, {
              permanent: false,
              direction: 'auto'
            })
          }
        }
      }).addTo(mapRef.current)

      // Fit bounds to GeoJSON layer with padding
      const bounds = geoJSONLayerRef.current.getBounds()
      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 16 // Prevent excessive zoom
        })
      }
    }
  }, [geoJSON, featureStyle, onFeatureClick])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom)
    }
  }, [center, zoom])

  return (
    <div 
      id="map" 
      data-testid="map"
      className="w-full h-[500px] rounded-lg shadow-md relative"
      style={{ background: '#f8fafc' }} // Light background while loading
    />
  )
} 