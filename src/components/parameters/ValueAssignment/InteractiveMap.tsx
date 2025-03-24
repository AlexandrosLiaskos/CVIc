import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, GeoJSON, Rectangle, FeatureGroup, useMap } from 'react-leaflet'
import { Feature, LineString } from 'geojson'
import { LatLngBounds, LeafletMouseEvent, LatLng } from 'leaflet'
import { InteractiveMapProps } from './types'

// Map event handler component to access map instance
const MapEventHandler: React.FC<{
  onMouseDown: (e: LeafletMouseEvent) => void
  onMouseMove: (e: LeafletMouseEvent) => void
  onMouseUp: () => void
}> = ({ onMouseDown, onMouseMove, onMouseUp }) => {
  const map = useMap()

  useEffect(() => {
    map.on('mousedown', onMouseDown)
    map.on('mousemove', onMouseMove)
    map.on('mouseup', onMouseUp)

    return () => {
      map.off('mousedown', onMouseDown)
      map.off('mousemove', onMouseMove)
      map.off('mouseup', onMouseUp)
    }
  }, [map, onMouseDown, onMouseMove, onMouseUp])

  return null
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  segments,
  selectedSegments,
  onSegmentSelect,
  onSegmentDeselect,
  onMultiSegmentSelect
}) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [selectionBounds, setSelectionBounds] = useState<LatLngBounds | null>(null)
  const [startPoint, setStartPoint] = useState<LatLng | null>(null)

  const handleSegmentClick = (feature: Feature<LineString>) => {
    const id = feature.id as string
    if (selectedSegments.has(id)) {
      onSegmentDeselect(id)
    } else {
      onSegmentSelect(id)
    }
  }

  const handleMouseDown = (e: LeafletMouseEvent) => {
    setIsDrawing(true)
    setStartPoint(e.latlng)
  }

  const handleMouseMove = (e: LeafletMouseEvent) => {
    if (isDrawing && startPoint) {
      const bounds = new LatLngBounds(startPoint, e.latlng)
      setSelectionBounds(bounds)
    }
  }

  const handleMouseUp = () => {
    if (isDrawing && selectionBounds) {
      // Find segments within selection bounds
      const selectedIds = segments
        .filter(segment => {
          const coords = segment.geometry.coordinates
          return coords.some(([lng, lat]) => 
            selectionBounds.contains([lat, lng])
          )
        })
        .map(segment => segment.id as string)
        .filter((id): id is string => id !== undefined)

      onMultiSegmentSelect(selectedIds)
    }

    setIsDrawing(false)
    setStartPoint(null)
    setSelectionBounds(null)
  }

  const segmentStyle = (feature: Feature<LineString>) => ({
    color: selectedSegments.has(feature.id as string) ? '#2563eb' : '#64748b',
    weight: selectedSegments.has(feature.id as string) ? 3 : 2,
    opacity: selectedSegments.has(feature.id as string) ? 1 : 0.7
  })

  // Calculate initial bounds
  const bounds = new LatLngBounds(
    segments.flatMap(segment => {
      const coords = segment.geometry.coordinates
      return coords.map(([lng, lat]) => [lat, lng] as [number, number])
    })
  )

  return (
    <div className="relative h-[600px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        className="h-full w-full"
        bounds={bounds}
        scrollWheelZoom={true}
      >
        <MapEventHandler
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />

        <FeatureGroup>
          {segments.map(segment => (
            <GeoJSON
              key={segment.id}
              data={segment}
              style={() => segmentStyle(segment)}
              eventHandlers={{
                click: () => handleSegmentClick(segment)
              }}
            />
          ))}
        </FeatureGroup>

        {selectionBounds && (
          <Rectangle
            bounds={selectionBounds}
            pathOptions={{
              color: '#2563eb',
              weight: 1,
              opacity: 0.5,
              fillOpacity: 0.1
            }}
          />
        )}
      </MapContainer>

      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-lg text-sm">
        <p className="font-medium text-gray-700">
          Selected: {selectedSegments.size} segments
        </p>
      </div>
    </div>
  )
} 