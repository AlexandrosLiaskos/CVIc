import type { MapFeatureCollection, MapFeature } from '../types'

export type CVIFormula = 'geometric-mean' | 'geometric-mean-normalized' | 'arithmetic-mean' | 'nonlinear-power'

export interface CVIResult {
  shoreline: MapFeatureCollection
  segments: {
    id: string
    coordinates: number[][] // GeoJSON Position[]
    cvi: number
    parameters: Record<string, number>
  }[]
  statistics: {
    mean: number
    median: number
    min: number
    max: number
  }
  formula: CVIFormula
}

export interface CVIInput {
  shoreline: MapFeatureCollection
  parameters: {
    name: string
    weight: number
    values: Record<string, number>
  }[]
  formula: CVIFormula
}

export function calculateCVI(input: CVIInput): CVIResult {
  const { shoreline, parameters, formula } = input

  // Validate input
  if (!shoreline.features.length) {
    throw new Error('No shoreline features provided')
  }

  if (!parameters.length) {
    throw new Error('No parameters provided')
  }

  // Process each feature
  const segments = shoreline.features.map(feature => {
    const segmentParameters: Record<string, number> = {}
    let hasValidParameters = true

    // Extract parameter values for this segment
    parameters.forEach(param => {
      const value = param.values[feature.properties.id]
      if (typeof value === 'number') {
        segmentParameters[param.name] = value
      } else {
        hasValidParameters = false
      }
    })

    if (!hasValidParameters) {
      throw new Error(`Missing parameter values for segment ${feature.properties.id}`)
    }

    // Calculate CVI using selected formula
    const cvi = calculateSegmentCVI(segmentParameters, parameters, formula)

    // Extract coordinates based on geometry type
    let coordinates: number[][] = []
    if (feature.geometry.type === 'LineString') {
      coordinates = feature.geometry.coordinates
    } else if (feature.geometry.type === 'MultiLineString') {
      coordinates = feature.geometry.coordinates[0] // Use first line for MultiLineString
    } else {
      throw new Error(`Unsupported geometry type: ${feature.geometry.type}`)
    }

    return {
      id: feature.properties.id,
      coordinates,
      cvi,
      parameters: segmentParameters
    }
  })

  // Calculate statistics
  const cviValues = segments.map(s => s.cvi)
  const statistics = calculateStatistics(cviValues)

  return {
    shoreline,
    segments,
    statistics,
    formula
  }
}

function calculateSegmentCVI(
  parameters: Record<string, number>,
  parameterConfigs: CVIInput['parameters'],
  formula: CVIFormula
): number {
  const values = parameterConfigs.map(param => parameters[param.name])
  const weights = parameterConfigs.map(param => param.weight || 1)

  switch (formula) {
    case 'geometric-mean':
      return calculateGeometricMean(values, weights)
    case 'geometric-mean-normalized':
      return calculateGeometricMeanNormalized(values, weights)
    case 'arithmetic-mean':
      return calculateArithmeticMean(values, weights)
    case 'nonlinear-power':
      return calculateNonlinearPower(values, weights)
    default:
      throw new Error(`Unsupported formula: ${formula}`)
  }
}

function calculateGeometricMean(values: number[], weights: number[]): number {
  const sumWeights = weights.reduce((a, b) => a + b, 0)
  const product = values.reduce((acc, val, i) => acc * Math.pow(val, weights[i]), 1)
  return Math.pow(product, 1 / sumWeights)
}

function calculateGeometricMeanNormalized(values: number[], weights: number[]): number {
  const normalizedValues = values.map((val, i) => {
    const min = Math.min(...values)
    const max = Math.max(...values)
    return (val - min) / (max - min)
  })
  return calculateGeometricMean(normalizedValues, weights)
}

function calculateArithmeticMean(values: number[], weights: number[]): number {
  const sumWeights = weights.reduce((a, b) => a + b, 0)
  const weightedSum = values.reduce((acc, val, i) => acc + val * weights[i], 0)
  return weightedSum / sumWeights
}

function calculateNonlinearPower(values: number[], weights: number[]): number {
  const sumWeights = weights.reduce((a, b) => a + b, 0)
  const weightedSum = values.reduce((acc, val, i) => acc + Math.pow(val, 2) * weights[i], 0)
  return Math.sqrt(weightedSum / sumWeights)
}

function calculateStatistics(values: number[]): CVIResult['statistics'] {
  if (values.length === 0) {
    return {
      mean: 0,
      median: 0,
      min: 0,
      max: 0
    }
  }

  const sortedValues = [...values].sort((a, b) => a - b)
  const sum = sortedValues.reduce((a, b) => a + b, 0)

  return {
    mean: sum / sortedValues.length,
    median: sortedValues.length % 2 === 0
      ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
      : sortedValues[Math.floor(sortedValues.length / 2)],
    min: sortedValues[0],
    max: sortedValues[sortedValues.length - 1]
  }
}

export function classifyVulnerability(cvi: number): string {
  if (cvi <= 1.5) return 'Very Low'
  if (cvi <= 2.5) return 'Low'
  if (cvi <= 3.5) return 'Medium'
  if (cvi <= 4.5) return 'High'
  return 'Very High'
}

export function estimateCalculationTime(
  shoreline: MapFeatureCollection,
  parameters: CVIInput['parameters']
): number {
  // Rough estimation based on number of segments and parameters
  const segmentCount = shoreline.features.length
  const parameterCount = parameters.length
  
  // Base time in milliseconds
  const baseTime = 100
  
  // Add time for each segment and parameter
  const segmentTime = segmentCount * 50
  const parameterTime = parameterCount * 20
  
  return baseTime + segmentTime + parameterTime
} 