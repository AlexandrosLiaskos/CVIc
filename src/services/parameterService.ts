import type { MapFeatureCollection } from '../types'
import * as shp from 'shpjs'
import type { FeatureCollection, Feature } from 'geojson'

export interface Parameter {
  id: string
  name: string
  type: 'shapefile' | 'interactive'
  weight: number
  description?: string
  values: Record<string, number>
}

export interface ShapefileParameter extends Parameter {
  type: 'shapefile'
  fileUrl?: string
  fileName?: string
  attributeField?: string
}

export interface InteractiveParameter extends Parameter {
  type: 'interactive'
  segmentValues: Record<string, number>
}

export interface ParameterValidationResult {
  isValid: boolean
  errors: string[]
}

export async function processShapefileParameter(
  file: File,
  attributeField?: string
): Promise<{
  attributes: string[]
  selectedAttribute: string
  attributeValues: Record<string, number>
}> {
  try {
    // Read the shapefile
    const arrayBuffer = await file.arrayBuffer()
    const geojson = await shp(arrayBuffer) as FeatureCollection

    // Extract attributes from the first feature
    const firstFeature = geojson.features[0]
    if (!firstFeature) {
      throw new Error('No features found in shapefile')
    }

    const attributes = Object.keys(firstFeature.properties || {})
    const selectedAttribute = attributeField || attributes[0]

    // Extract values for the selected attribute
    const attributeValues: Record<string, number> = {}
    geojson.features.forEach((feature: Feature) => {
      const value = feature.properties?.[selectedAttribute]
      if (typeof value === 'number') {
        attributeValues[feature.id as string] = value
      } else {
        throw new Error(`Invalid numeric value for attribute ${selectedAttribute}`)
      }
    })

    return {
      attributes,
      selectedAttribute,
      attributeValues
    }
  } catch (error) {
    console.error('Error processing shapefile:', error)
    throw error
  }
}

export function validateParameters(
  parameters: Parameter[],
  shoreline: MapFeatureCollection
): ParameterValidationResult {
  const errors: string[] = []

  // Check if parameters exist
  if (!parameters.length) {
    errors.push('No parameters defined')
    return { isValid: false, errors }
  }

  // Validate each parameter
  parameters.forEach(param => {
    // Check parameter name
    if (!param.name.trim()) {
      errors.push(`Parameter ${param.id} has no name`)
    }

    // Check parameter weight
    if (!param.weight || param.weight <= 0) {
      errors.push(`Parameter ${param.name} has invalid weight: ${param.weight}`)
    }

    // Check parameter values
    const missingSegments = shoreline.features.filter(
      feature => !(feature.properties.id in param.values)
    )

    if (missingSegments.length > 0) {
      errors.push(
        `Parameter ${param.name} is missing values for ${missingSegments.length} segments`
      )
    }

    // Validate numeric values
    Object.entries(param.values).forEach(([segmentId, value]) => {
      if (typeof value !== 'number' || isNaN(value)) {
        errors.push(
          `Parameter ${param.name} has invalid value for segment ${segmentId}: ${value}`
        )
      }
    })
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function createInteractiveParameter(
  name: string,
  weight: number,
  description?: string
): InteractiveParameter {
  return {
    id: crypto.randomUUID(),
    name,
    type: 'interactive',
    weight,
    description,
    values: {},
    segmentValues: {}
  }
}

export function createShapefileParameter(
  name: string,
  weight: number,
  fileUrl: string,
  fileName: string,
  attributeField: string,
  values: Record<string, number>,
  description?: string
): ShapefileParameter {
  return {
    id: crypto.randomUUID(),
    name,
    type: 'shapefile',
    weight,
    description,
    fileUrl,
    fileName,
    attributeField,
    values
  }
}

export function updateParameterValues(
  parameter: Parameter,
  values: Record<string, number>
): Parameter {
  return {
    ...parameter,
    values: {
      ...parameter.values,
      ...values
    }
  }
}

export function deleteParameter(
  parameters: Parameter[],
  parameterId: string
): Parameter[] {
  return parameters.filter(p => p.id !== parameterId)
}

export function reorderParameters(
  parameters: Parameter[],
  oldIndex: number,
  newIndex: number
): Parameter[] {
  const result = [...parameters]
  const [removed] = result.splice(oldIndex, 1)
  result.splice(newIndex, 0, removed)
  return result
} 