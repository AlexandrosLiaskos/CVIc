import { FeatureCollection, LineString, MultiLineString, Position } from 'geojson'
import { ShorelineSegment } from '../types'
import * as turf from '@turf/turf'

export function segmentShoreline(
  shoreline: FeatureCollection<LineString | MultiLineString>,
  resolution: number
): ShorelineSegment[] {
  const segments: ShorelineSegment[] = []
  let segmentId = 1

  shoreline.features.forEach(feature => {
    const lines = feature.geometry.type === 'MultiLineString'
      ? feature.geometry.coordinates.map(coords => turf.lineString(coords as Position[]))
      : [turf.lineString(feature.geometry.coordinates as Position[])]

    lines.forEach((line, lineIndex) => {
      const length = turf.length(line, { units: 'meters' })
      const numSegments = Math.ceil(length / resolution)
      const actualResolution = length / numSegments

      for (let i = 0; i < numSegments; i++) {
        const start = i * actualResolution
        const end = Math.min((i + 1) * actualResolution, length)
        const segment = turf.lineSliceAlong(line, start, end, { units: 'meters' })
        const segmentLength = turf.length(segment, { units: 'meters' })

        segments.push({
          type: 'Feature',
          id: `segment-${segmentId++}`,
          geometry: segment.geometry,
          properties: {
            id: `segment-${segmentId}`,
            index: i,
            lineIndex,
            length: segmentLength,
            values: {}
          },
          parameters: {}
        })
      }
    })
  })

  return segments
}