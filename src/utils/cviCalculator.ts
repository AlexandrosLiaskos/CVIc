import { Formula } from '../types'

interface CVIInputs {
  geomorphology: number
  coastalSlope: number
  relativeSeaLevelRise: number
  meanWaveHeight: number
  meanTideRange: number
  shorelineErosionRate: number
  populationDensity: number
  landUse: number
  infrastructure: number
}

interface CVIResult {
  cviScore: number
  level: 'low' | 'medium' | 'high'
  description: string
}

const WEIGHTS = {
  geomorphology: 0.15,
  coastalSlope: 0.1,
  relativeSeaLevelRise: 0.15,
  meanWaveHeight: 0.1,
  meanTideRange: 0.1,
  shorelineErosionRate: 0.1,
  populationDensity: 0.05,
  landUse: 0.05,
  infrastructure: 0.05
}

function normalizeInput(value: number, min: number = 1, max: number = 5): number {
  return (value - min) / (max - min)
}

function calculateGeometricMean(inputs: CVIInputs): number {
  let product = 1
  let weightSum = 0

  Object.entries(inputs).forEach(([key, value]) => {
    const weight = WEIGHTS[key as keyof typeof WEIGHTS]
    product *= Math.pow(value, weight)
    weightSum += weight
  })

  return Math.pow(product, 1 / weightSum)
}

function calculateNormalizedGeometricMean(inputs: CVIInputs): number {
  let product = 1
  const parameterCount = Object.keys(inputs).length

  Object.values(inputs).forEach(value => {
    product *= value
  })

  return Math.pow(product, 1 / parameterCount)
}

function calculateArithmeticMean(inputs: CVIInputs): number {
  let sum = 0
  let weightSum = 0

  Object.entries(inputs).forEach(([key, value]) => {
    const weight = WEIGHTS[key as keyof typeof WEIGHTS]
    sum += value * weight
    weightSum += weight
  })

  return sum / weightSum
}

function calculateNonlinearPower(inputs: CVIInputs): number {
  let product = 1
  let powerSum = 0

  Object.entries(inputs).forEach(([key, value]) => {
    const power = WEIGHTS[key as keyof typeof WEIGHTS] * 2 // Using double weight as power factor
    product *= Math.pow(value, power)
    powerSum += power
  })

  return Math.pow(product, 1 / powerSum)
}

export function calculateCVI(inputs: CVIInputs, formula?: Formula): CVIResult {
  // Normalize inputs to 0-1 scale
  const normalizedInputs = Object.entries(inputs).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: normalizeInput(value)
  }), {} as CVIInputs)

  // Calculate CVI score based on selected formula
  let cviScore: number
  switch (formula?.type) {
    case 'geometric-mean-normalized':
      cviScore = calculateNormalizedGeometricMean(normalizedInputs)
      break
    case 'arithmetic-mean':
      cviScore = calculateArithmeticMean(normalizedInputs)
      break
    case 'nonlinear-power':
      cviScore = calculateNonlinearPower(normalizedInputs)
      break
    case 'geometric-mean':
    default:
      cviScore = calculateGeometricMean(normalizedInputs)
  }

  // Determine vulnerability level
  let level: 'low' | 'medium' | 'high'
  let description: string

  if (cviScore < 0.33) {
    level = 'low'
    description = 'Low vulnerability to coastal hazards'
  } else if (cviScore < 0.66) {
    level = 'medium'
    description = 'Moderate vulnerability to coastal hazards'
  } else {
    level = 'high'
    description = 'High vulnerability to coastal hazards'
  }

  return {
    cviScore,
    level,
    description
  }
}

export function getCVILevelColor(score: number): string {
  if (score < 0.33) return '#22c55e' // green-500
  if (score < 0.66) return '#eab308' // yellow-500
  return '#ef4444' // red-500
}

export function estimateCalculationTime(segmentCount: number): number {
  // Rough estimate: 100ms per segment + 500ms base time
  return Math.ceil((segmentCount * 0.1 + 0.5) * 1000)
} 