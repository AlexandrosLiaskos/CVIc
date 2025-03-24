import shp from 'shpjs'
import { v4 as uuidv4 } from 'uuid'
import * as turf from '@turf/turf'
import type { Feature, FeatureCollection, Geometry, LineString, MultiLineString, GeoJsonProperties, Position } from 'geojson'

// Maximum file size (50MB)
const MAX_FILE_SIZE = 50 * 1024 * 1024

// Allowed file types
const ALLOWED_TYPES = ['application/zip', 'application/x-zip-compressed']

interface ShapefileFeature extends Feature<LineString | MultiLineString> {
  properties: {
    [key: string]: any
  }
}

interface SegmentFeature extends Feature<LineString> {
  properties: {
    segmentId: string
    segmentIndex: number
    startKm: number
    endKm: number
    length: number
    [key: string]: any
  }
}

interface ShapefileProcessingResult {
  geoJSON: FeatureCollection
  attributes: string[]
  attributeValues: Record<string, number[]>
}

interface AttributeStatistics {
  min: number
  max: number
  mean: number
  median: number
}

function validateFile(file: File): void {
  if (!file) {
    throw new Error('No file provided')
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a ZIP file containing shapefile components.')
  }
}

function validateCoordinate(coord: number[]): boolean {
  if (!Array.isArray(coord) || coord.length < 2) return false
  const [lon, lat] = coord
  return typeof lon === 'number' && typeof lat === 'number' && 
         lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90
}

function validateGeoJSON(geoJSON: FeatureCollection): void {
  if (!geoJSON || !geoJSON.type || !geoJSON.features) {
    throw new Error('Invalid GeoJSON structure')
  }

  if (!Array.isArray(geoJSON.features)) {
    throw new Error('GeoJSON features must be an array')
  }

  if (geoJSON.features.length === 0) {
    throw new Error('GeoJSON must contain at least one feature')
  }

  // Validate each feature
  geoJSON.features.forEach((feature, index) => {
    if (!feature.type || !feature.geometry) {
      throw new Error(`Invalid feature at index ${index}`)
    }

    // Validate coordinates
    if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') {
      const coordinates = feature.geometry.coordinates
      if (!Array.isArray(coordinates)) {
        throw new Error(`Invalid coordinates in feature at index ${index}`)
      }

      if (feature.geometry.type === 'LineString') {
        const coords = coordinates as number[][]
        if (!coords.every(validateCoordinate)) {
          throw new Error(`Invalid coordinates in LineString at index ${index}`)
        }
      } else {
        const coords = coordinates as number[][][]
        if (!coords.every(line => Array.isArray(line) && line.every(validateCoordinate))) {
          throw new Error(`Invalid coordinates in MultiLineString at index ${index}`)
        }
      }
    } else {
      throw new Error(`Unsupported geometry type: ${feature.geometry.type}`)
    }
  })
}

export async function processShapefile(file: File): Promise<{ geoJSON: FeatureCollection }> {
  try {
    // Validate file before processing
    validateFile(file)

    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()

    // Process shapefile
    const result = await shp(arrayBuffer)
    const geoJSON = Array.isArray(result) ? result[0] : result

    // Validate processed GeoJSON
    validateGeoJSON(geoJSON)

    // Clean and optimize GeoJSON
    const cleanedGeoJSON = cleanGeoJSON(geoJSON)

    return { geoJSON: cleanedGeoJSON }
  } catch (error) {
    console.error('Error processing shapefile:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to process shapefile')
  }
}

function cleanGeoJSON(geoJSON: FeatureCollection): FeatureCollection {
  // Remove any invalid or unnecessary properties
  const cleanedFeatures = geoJSON.features.map(feature => ({
    ...feature,
    properties: {
      ...(feature.properties || {}),
      // Remove any potentially problematic properties
      _id: undefined,
      id: undefined,
      // Keep only essential properties
      ...Object.fromEntries(
        Object.entries(feature.properties || {}).filter(([key]) => 
          !key.startsWith('_') && !key.includes('password') && !key.includes('secret')
        )
      )
    }
  }))

  return {
    type: 'FeatureCollection',
    features: cleanedFeatures
  }
}

export function segmentShoreline(geoJSON: FeatureCollection, segmentLength: number): FeatureCollection<LineString> {
  try {
    // Convert all features to LineString if they aren't already
    const lineStrings: Feature<LineString>[] = []
    
    geoJSON.features.forEach((feature, index) => {
      if (feature.geometry.type === 'LineString') {
        lineStrings.push(feature as Feature<LineString>)
      } else if (feature.geometry.type === 'MultiLineString') {
        const coords = feature.geometry.coordinates as number[][][]
        coords.forEach(line => {
          lineStrings.push({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: line
            } as LineString,
            properties: { ...feature.properties }
          })
        })
      }
    })

    // Sort lineStrings by length
    lineStrings.sort((a, b) => {
      const lengthA = turf.length(a)
      const lengthB = turf.length(b)
      return lengthB - lengthA
    })

    // Create segments
    const segments: Feature<LineString>[] = []
    let currentSegment: number[][] = []
    let currentLength = 0

    lineStrings.forEach(lineString => {
      const coords = lineString.geometry.coordinates as number[][]
      coords.forEach((coord, i) => {
        if (i === 0 && currentSegment.length > 0) {
          // Start of new line, finish current segment
          const segmentFeature: Feature<LineString> = {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: currentSegment
            } as LineString,
            properties: {
              segmentId: uuidv4(),
              segmentIndex: segments.length,
              startKm: currentLength - turf.length({ type: 'Feature', geometry: { type: 'LineString', coordinates: currentSegment } as LineString, properties: {} }),
              endKm: currentLength,
              length: turf.length({ type: 'Feature', geometry: { type: 'LineString', coordinates: currentSegment } as LineString, properties: {} })
            }
          }
          segments.push(segmentFeature)
          currentSegment = []
        }

        currentSegment.push(coord)
        currentLength += i > 0 ? turf.length({ type: 'Feature', geometry: { type: 'LineString', coordinates: [coords[i - 1], coord] } as LineString, properties: {} }) : 0

        if (currentLength >= segmentLength) {
          const segmentFeature: Feature<LineString> = {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: currentSegment
            } as LineString,
            properties: {
              segmentId: uuidv4(),
              segmentIndex: segments.length,
              startKm: currentLength - turf.length({ type: 'Feature', geometry: { type: 'LineString', coordinates: currentSegment } as LineString, properties: {} }),
              endKm: currentLength,
              length: turf.length({ type: 'Feature', geometry: { type: 'LineString', coordinates: currentSegment } as LineString, properties: {} })
            }
          }
          segments.push(segmentFeature)
          currentSegment = []
          currentLength = 0
        }
      })
    })

    // Add any remaining coordinates as the final segment
    if (currentSegment.length > 0) {
      const segmentFeature: Feature<LineString> = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: currentSegment
        } as LineString,
        properties: {
          segmentId: uuidv4(),
          segmentIndex: segments.length,
          startKm: currentLength - turf.length({ type: 'Feature', geometry: { type: 'LineString', coordinates: currentSegment } as LineString, properties: {} }),
          endKm: currentLength,
          length: turf.length({ type: 'Feature', geometry: { type: 'LineString', coordinates: currentSegment } as LineString, properties: {} })
        }
      }
      segments.push(segmentFeature)
    }

    return {
      type: 'FeatureCollection',
      features: segments
    }
  } catch (error) {
    console.error('Error segmenting shoreline:', error)
    throw new Error('Failed to segment shoreline')
  }
}

export function validateAttributes(geoJSON: FeatureCollection, requiredAttributes: string[]) {
  const features = geoJSON.features || []
  const missingAttributes = []

  for (const feature of features) {
    const properties = feature.properties || {}
    for (const attr of requiredAttributes) {
      if (!(attr in properties)) {
        missingAttributes.push(attr)
      }
    }
  }

  return {
    isValid: missingAttributes.length === 0,
    missingAttributes: [...new Set(missingAttributes)]
  }
}

export function extractAttributeValues(geoJSON: FeatureCollection, attribute: string) {
  const features = geoJSON.features || []
  const values = features
    .map((f: Feature) => f.properties?.[attribute])
    .filter((v): v is number | string => v !== undefined && v !== null)

  return [...new Set(values)]
}

export function calculateStatistics(values: number[]) {
  if (values.length === 0) return null

  const sorted = [...values].sort((a, b) => a - b)
  const sum = sorted.reduce((a, b) => a + b, 0)

  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    mean: sum / sorted.length,
    median: sorted[Math.floor(sorted.length / 2)],
    count: sorted.length
  }
}

export function normalizeValues(values: number[], method: 'minmax' | 'zscore' = 'minmax') {
  if (values.length === 0) return []

  if (method === 'minmax') {
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min
    return values.map(v => range === 0 ? 0.5 : (v - min) / range)
  } else {
    const mean = values.reduce((a, b) => a + b, 0) / values.length
    const std = Math.sqrt(
      values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length
    )
    return values.map(v => std === 0 ? 0 : (v - mean) / std)
  }
}

export function calculateAttributeStatistics(values: number[]): AttributeStatistics {
  if (values.length === 0) {
    return {
      min: 0,
      max: 0,
      mean: 0,
      median: 0
    }
  }

  const sortedValues = [...values].sort((a, b) => a - b)
  const sum = sortedValues.reduce((acc, val) => acc + val, 0)

  return {
    min: sortedValues[0],
    max: sortedValues[sortedValues.length - 1],
    mean: sum / sortedValues.length,
    median: sortedValues.length % 2 === 0
      ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
      : sortedValues[Math.floor(sortedValues.length / 2)]
  }
}

export function normalizeAttributeValues(
  values: Record<string, number>,
  targetRange: [number, number] = [1, 5]
): Record<string, number> {
  const numberValues = Object.values(values)
  if (numberValues.length === 0) return {}

  const stats = calculateAttributeStatistics(numberValues)
  const [targetMin, targetMax] = targetRange
  const sourceRange = stats.max - stats.min

  return Object.entries(values).reduce((acc, [id, value]) => {
    // Normalize to 0-1 range, then scale to target range
    const normalized = sourceRange === 0
      ? targetMin
      : targetMin + ((value - stats.min) / sourceRange) * (targetMax - targetMin)
    
    return {
      ...acc,
      [id]: Math.round(normalized * 100) / 100 // Round to 2 decimal places
    }
  }, {})
}

export function validateShapefileAttributes(
  geoJSON: MapFeatureCollection,
  requiredAttributes: string[]
): boolean {
  if (!geoJSON.features.length) return false

  const firstFeature = geoJSON.features[0]
  return requiredAttributes.every(attr => 
    firstFeature.properties && attr in firstFeature.properties
  )
} 