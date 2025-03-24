import { Feature, FeatureCollection, LineString } from 'geojson'
import type { ShorelineSegment } from '../types'

export type MapBounds = [[number, number], [number, number]]

export function calculateMapBounds(features: Feature[]): MapBounds {
  const initialBounds: MapBounds = [[90, 180], [-90, -180]]
  
  return features.reduce((acc, feature) => {
    if (feature.geometry.type !== 'LineString') return acc
    
    const coords = feature.geometry.coordinates
    const minLat = Math.min(...coords.map(c => c[1]))
    const maxLat = Math.max(...coords.map(c => c[1]))
    const minLng = Math.min(...coords.map(c => c[0]))
    const maxLng = Math.max(...coords.map(c => c[0]))

    return [
      [Math.min(acc[0][0], minLat), Math.min(acc[0][1], minLng)],
      [Math.max(acc[1][0], maxLat), Math.max(acc[1][1], maxLng)]
    ]
  }, initialBounds)
}

export function createFeatureCollection(segments: ShorelineSegment[]): FeatureCollection<LineString> {
  return {
    type: 'FeatureCollection',
    features: segments
  }
} 