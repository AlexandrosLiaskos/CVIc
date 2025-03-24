import type { FormulaResult } from './formulaService'
import type { MapFeature } from '../types'

export interface VisualizationConfig {
  colorScheme: 'sequential' | 'diverging' | 'qualitative'
  colorScale: 'linear' | 'logarithmic' | 'quantile'
  numClasses: number
  opacity: number
  showLabels: boolean
  showStatistics: boolean
}

export interface MapStyle {
  fillColor: string
  color: string
  weight: number
  opacity: number
  fillOpacity: number
}

export interface VisualizationResult {
  features: Array<MapFeature & { style: MapStyle }>
  statistics: {
    chartData: ChartData
    summary: SummaryData
  }
}

interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string
    borderWidth: number
  }>
}

interface SummaryData {
  vulnerabilityClasses: {
    class: string
    count: number
    percentage: number
  }[]
  parameterContributions: {
    parameter: string
    correlation: number
    impact: number
  }[]
}

interface ColorScaleItem {
  value: number
  color: string
}

const DEFAULT_CONFIG: VisualizationConfig = {
  colorScheme: 'sequential',
  colorScale: 'quantile',
  numClasses: 5,
  opacity: 0.8,
  showLabels: true,
  showStatistics: true
}

const COLOR_SCHEMES = {
  sequential: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
  diverging: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
  qualitative: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999']
}

export function visualizeResults(
  features: MapFeature[],
  results: FormulaResult,
  config: Partial<VisualizationConfig> = {}
): VisualizationResult {
  const fullConfig = { ...DEFAULT_CONFIG, ...config }
  const values = Object.values(results.segmentResults)
  
  // Calculate class breaks
  const breaks = calculateClassBreaks(values, fullConfig)
  
  // Style features based on CVI values
  const styledFeatures = features.map(feature => ({
    ...feature,
    style: getFeatureStyle(
      results.segmentResults[feature.properties.id] ?? 0,
      breaks,
      fullConfig
    )
  }))

  // Generate visualization data
  const visualizationData = {
    features: styledFeatures,
    statistics: {
      chartData: generateChartData(results, fullConfig),
      summary: generateSummaryData(results, features)
    }
  }

  return visualizationData
}

function calculateClassBreaks(
  values: number[],
  config: VisualizationConfig
): number[] {
  const sorted = [...values].sort((a, b) => a - b)
  const breaks: number[] = []
  
  switch (config.colorScale) {
    case 'linear':
      const range = sorted[sorted.length - 1] - sorted[0]
      const step = range / config.numClasses
      for (let i = 0; i <= config.numClasses; i++) {
        breaks.push(sorted[0] + step * i)
      }
      break
      
    case 'logarithmic':
      const logRange = Math.log(sorted[sorted.length - 1]) - Math.log(sorted[0])
      const logStep = logRange / config.numClasses
      for (let i = 0; i <= config.numClasses; i++) {
        breaks.push(Math.exp(Math.log(sorted[0]) + logStep * i))
      }
      break
      
    case 'quantile':
      const quantileSize = sorted.length / config.numClasses
      for (let i = 0; i <= config.numClasses; i++) {
        const index = Math.floor(i * quantileSize)
        breaks.push(sorted[index])
      }
      break
  }
  
  return breaks
}

function getFeatureStyle(
  value: number,
  breaks: number[],
  config: VisualizationConfig
): MapStyle {
  const classIndex = breaks.findIndex(breakValue => value <= breakValue) - 1
  const colors = COLOR_SCHEMES[config.colorScheme]
  const color = colors[Math.max(0, Math.min(classIndex, colors.length - 1))]
  
  return {
    fillColor: color,
    color: '#000000',
    weight: 1,
    opacity: config.opacity,
    fillOpacity: config.opacity
  }
}

function generateChartData(
  results: FormulaResult,
  config: VisualizationConfig
): ChartData {
  const values = Object.values(results.segmentResults)
  const breaks = calculateClassBreaks(values, config)
  
  // Count segments in each class
  const classCounts = new Array(config.numClasses).fill(0)
  values.forEach(value => {
    const classIndex = breaks.findIndex(breakValue => value <= breakValue) - 1
    classCounts[Math.max(0, Math.min(classIndex, config.numClasses - 1))]++
  })
  
  // Generate labels
  const labels = classCounts.map((count, i) => {
    const range = `${breaks[i].toFixed(2)} - ${breaks[i + 1].toFixed(2)}`
    return `${range} (${count})`
  })
  
  return {
    labels,
    datasets: [{
      label: 'CVI Distribution',
      data: classCounts,
      backgroundColor: COLOR_SCHEMES[config.colorScheme].slice(0, config.numClasses),
      borderColor: '#000000',
      borderWidth: 1
    }]
  }
}

function generateSummaryData(
  results: FormulaResult,
  features: MapFeature[]
): SummaryData {
  // Calculate vulnerability classes
  const values = Object.values(results.segmentResults)
  const breaks = calculateClassBreaks(values, { ...DEFAULT_CONFIG, numClasses: 5 })
  
  const vulnerabilityClasses = breaks.slice(0, -1).map((breakValue, i) => {
    const count = values.filter(v => v >= breakValue && v < breaks[i + 1]).length
    return {
      class: `${breakValue.toFixed(2)} - ${breaks[i + 1].toFixed(2)}`,
      count,
      percentage: (count / values.length) * 100
    }
  })
  
  // Calculate parameter contributions (placeholder - would need parameter data)
  const parameterContributions: SummaryData['parameterContributions'] = []
  
  return {
    vulnerabilityClasses,
    parameterContributions
  }
}

export function getColorScale(
  min: number,
  max: number,
  config: VisualizationConfig
): ColorScaleItem[] {
  const colors = COLOR_SCHEMES[config.colorScheme]
  const breaks = calculateClassBreaks([min, max], config)
  
  return breaks.slice(0, -1).map((breakValue, i) => ({
    value: breakValue,
    color: colors[i]
  }))
}

export function formatValue(value: number): string {
  return value.toFixed(2)
}

export function getVulnerabilityClass(value: number, breaks: number[]): string {
  const classIndex = breaks.findIndex(breakValue => value <= breakValue) - 1
  const classes = ['Very Low', 'Low', 'Medium', 'High', 'Very High']
  return classes[Math.max(0, Math.min(classIndex, classes.length - 1))]
} 