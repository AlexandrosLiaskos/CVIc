import { FeatureCollection, LineString, MultiLineString, Position } from 'geojson'
import { ShorelineSegment } from '../types'
import * as turf from '@turf/turf'

/**
 * Segments a shoreline into equal-length segments based on the specified resolution
 * @param shoreline The shoreline to segment
 * @param resolution The desired segment length in meters
 * @returns An array of shoreline segments
 */
export function segmentShoreline(
  shoreline: FeatureCollection<LineString | MultiLineString>,
  resolution: number
): ShorelineSegment[] {
  const segments: ShorelineSegment[] = []
  let segmentId = 1

  // Process each feature in the collection
  shoreline.features.forEach(feature => {
    // Convert MultiLineString to LineString if needed
    const lines = feature.geometry.type === 'MultiLineString'
      ? feature.geometry.coordinates.map(coords => turf.lineString(coords as Position[]))
      : [turf.lineString(feature.geometry.coordinates as Position[])]

    // Process each line
    lines.forEach((line, lineIndex) => {
      // Get the total length of the line in meters
      const length = turf.length(line, { units: 'meters' })
      const numSegments = Math.ceil(length / resolution)
      const actualResolution = length / numSegments

      // Create segments
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