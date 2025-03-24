import type { Parameter } from './parameterService'

export type CVIFormula = 'geometric-mean' | 'geometric-mean-normalized' | 'arithmetic-mean' | 'nonlinear-power'

export interface Formula {
  id: string
  name: string
  type: CVIFormula
  description: string
  parameters: {
    name: string
    description: string
    type: 'number' | 'boolean'
    default?: number | boolean
    min?: number
    max?: number
  }[]
}

export interface FormulaConfig {
  formulaId: string
  parameters: Record<string, number | boolean>
}

export interface FormulaResult {
  segmentResults: Record<string, number>
  formula: 'geometric-mean' | 'geometric-mean-normalized' | 'arithmetic-mean' | 'nonlinear-power'
  statistics: {
    mean: number
    median: number
    min: number
    max: number
    standardDeviation: number
  }
}

const FORMULAS: Formula[] = [
  {
    id: 'geometric-mean',
    name: 'Geometric Mean',
    type: 'geometric-mean',
    description: 'Traditional weighted geometric mean calculation for CVI',
    parameters: []
  },
  {
    id: 'geometric-mean-normalized',
    name: 'Geometric Mean (Normalized)',
    type: 'geometric-mean-normalized',
    description: 'Geometric mean calculation with parameter normalization',
    parameters: [
      {
        name: 'normalizeValues',
        description: 'Whether to normalize parameter values before calculation',
        type: 'boolean',
        default: true
      }
    ]
  },
  {
    id: 'arithmetic-mean',
    name: 'Arithmetic Mean',
    type: 'arithmetic-mean',
    description: 'Weighted arithmetic mean calculation for CVI',
    parameters: []
  },
  {
    id: 'nonlinear-power',
    name: 'Nonlinear Power',
    type: 'nonlinear-power',
    description: 'Nonlinear power transformation for sensitivity to extreme values',
    parameters: [
      {
        name: 'power',
        description: 'Power value for nonlinear transformation',
        type: 'number',
        default: 2,
        min: 1,
        max: 5
      }
    ]
  }
]

export function getAvailableFormulas(): Formula[] {
  return FORMULAS
}

export function getFormulaById(id: string): Formula | undefined {
  return FORMULAS.find(f => f.id === id)
}

export function validateFormulaConfig(
  config: FormulaConfig,
  formula: Formula
): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Check if all required parameters are provided
  formula.parameters.forEach(param => {
    if (!(param.name in config.parameters)) {
      errors.push(`Missing required parameter: ${param.name}`)
    }
  })

  // Validate parameter values
  Object.entries(config.parameters).forEach(([name, value]) => {
    const paramDef = formula.parameters.find(p => p.name === name)
    if (!paramDef) {
      errors.push(`Unknown parameter: ${name}`)
      return
    }

    if (paramDef.type === 'number' && typeof value === 'number') {
      if (paramDef.min !== undefined && value < paramDef.min) {
        errors.push(`${name} must be greater than or equal to ${paramDef.min}`)
      }
      if (paramDef.max !== undefined && value > paramDef.max) {
        errors.push(`${name} must be less than or equal to ${paramDef.max}`)
      }
    } else if (paramDef.type === 'boolean' && typeof value !== 'boolean') {
      errors.push(`${name} must be a boolean value`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function calculateCVI(
  parameters: Parameter[],
  formula: Formula,
  config: FormulaConfig
): FormulaResult {
  const segmentResults: Record<string, number> = {}
  const segmentIds = Object.keys(parameters[0].values)

  // Calculate CVI for each segment
  segmentIds.forEach(segmentId => {
    const segmentValues = parameters.map(param => param.values[segmentId])
    const weights = parameters.map(param => param.weight || 1)
    
    let cvi: number
    switch (formula.type) {
      case 'geometric-mean':
        cvi = calculateGeometricMean(segmentValues, weights)
        break
      case 'geometric-mean-normalized':
        const normalizeValues = config.parameters.normalizeValues as boolean
        cvi = calculateGeometricMeanNormalized(segmentValues, weights, normalizeValues)
        break
      case 'arithmetic-mean':
        cvi = calculateArithmeticMean(segmentValues, weights)
        break
      case 'nonlinear-power':
        const power = config.parameters.power as number
        cvi = calculateNonlinearPower(segmentValues, weights, power)
        break
      default:
        throw new Error(`Unsupported formula type: ${formula.type}`)
    }
    
    segmentResults[segmentId] = cvi
  })

  // Calculate statistics
  const values = Object.values(segmentResults)
  const statistics = calculateStatistics(values)

  return {
    segmentResults,
    formula: formula.type,
    statistics
  }
}

function calculateGeometricMean(values: number[], weights: number[]): number {
  const sumWeights = weights.reduce((a, b) => a + b, 0)
  let product = 1
  
  for (let i = 0; i < values.length; i++) {
    product *= Math.pow(values[i], weights[i] / sumWeights)
  }
  
  return product
}

function calculateGeometricMeanNormalized(
  values: number[],
  weights: number[],
  normalizeValues: boolean
): number {
  if (normalizeValues) {
    const min = Math.min(...values)
    const max = Math.max(...values)
    values = values.map(v => (v - min) / (max - min))
  }
  
  return calculateGeometricMean(values, weights)
}

function calculateArithmeticMean(values: number[], weights: number[]): number {
  const sumWeights = weights.reduce((a, b) => a + b, 0)
  let sum = 0
  
  for (let i = 0; i < values.length; i++) {
    sum += values[i] * (weights[i] / sumWeights)
  }
  
  return sum
}

function calculateNonlinearPower(
  values: number[],
  weights: number[],
  power: number
): number {
  const normalizedValues = values.map(v => {
    const min = Math.min(...values)
    const max = Math.max(...values)
    return Math.pow((v - min) / (max - min), power)
  })
  
  return calculateArithmeticMean(normalizedValues, weights)
}

function calculateStatistics(values: number[]): FormulaResult['statistics'] {
  const sorted = [...values].sort((a, b) => a - b)
  const sum = values.reduce((a, b) => a + b, 0)
  const mean = sum / values.length
  
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2))
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / values.length
  const standardDeviation = Math.sqrt(variance)
  
  return {
    mean,
    median: sorted[Math.floor(sorted.length / 2)],
    min: sorted[0],
    max: sorted[sorted.length - 1],
    standardDeviation
  }
} 