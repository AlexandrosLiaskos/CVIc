import shp from 'shpjs'
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
  if (!geoJSON || typeof geoJSON !== 'object') {
    throw new Error('Invalid GeoJSON: not an object')
  }

  if (geoJSON.type !== 'FeatureCollection') {
    throw new Error('Invalid GeoJSON: not a FeatureCollection')
  }

  if (!Array.isArray(geoJSON.features)) {
    throw new Error('Invalid GeoJSON: features is not an array')
  }

  if (geoJSON.features.length === 0) {
    throw new Error('Invalid GeoJSON: no features found')
  }

  geoJSON.features.forEach((feature, index) => {
    if (!feature.geometry) {
      throw new Error(`Invalid feature at index ${index}: no geometry`)
    }

    if (feature.geometry.type !== 'LineString' && feature.geometry.type !== 'MultiLineString') {
      throw new Error(`Invalid feature at index ${index}: geometry must be LineString or MultiLineString`)
    }

    if (feature.geometry.type === 'LineString') {
      feature.geometry.coordinates.forEach((coord, i) => {
        if (!validateCoordinate(coord)) {
          throw new Error(`Invalid coordinate at index ${i} in feature ${index}`)
        }
      })
    } else {
      feature.geometry.coordinates.forEach((line, lineIndex) => {
        line.forEach((coord, i) => {
          if (!validateCoordinate(coord)) {
            throw new Error(`Invalid coordinate at index ${i} in line ${lineIndex} of feature ${index}`)
          }
        })
      })
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

export function validateShapefileAttributes(
  geoJSON: FeatureCollection,
  requiredAttributes: string[]
): boolean {
  if (!geoJSON.features.length) return false

  const firstFeature = geoJSON.features[0]
  return requiredAttributes.every(attr => 
    firstFeature.properties && attr in firstFeature.properties
  )
} 