import { Feature, FeatureCollection, LineString } from 'geojson'
import { v4 as uuidv4 } from 'uuid'
import type { ShorelineSegment } from '../types'

export function segmentShoreline(
  shoreline: FeatureCollection,
  resolution: number
): ShorelineSegment[] {
  const segments: ShorelineSegment[] = []

  shoreline.features.forEach(feature => {
    if (feature.geometry.type !== 'LineString') {
      throw new Error('Only LineString features are supported')
    }

    const coordinates = feature.geometry.coordinates
    let currentSegment: number[][] = []
    let currentLength = 0

    for (let i = 0; i < coordinates.length; i++) {
      const current = coordinates[i]
      currentSegment.push(current)

      if (i < coordinates.length - 1) {
        const next = coordinates[i + 1]
        const segmentLength = calculateDistance(current, next)
        currentLength += segmentLength

        if (currentLength >= resolution) {
          // Create new segment
          segments.push({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [...currentSegment]
            },
            properties: {},
            id: uuidv4(),
            parameters: {}
          })

          // Start new segment
          currentSegment = [current]
          currentLength = 0
        }
      }
    }

    // Add remaining coordinates as final segment
    if (currentSegment.length > 1) {
      segments.push({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: currentSegment
        },
        properties: {},
        id: uuidv4(),
        parameters: {}
      })
    }
  })

  return segments
}

function calculateDistance(coord1: number[], coord2: number[]): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (coord1[1] * Math.PI) / 180
  const φ2 = (coord2[1] * Math.PI) / 180
  const Δφ = ((coord2[1] - coord1[1]) * Math.PI) / 180
  const Δλ = ((coord2[0] - coord1[0]) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in meters
} 