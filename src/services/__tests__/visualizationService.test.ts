import {
  visualizeResults,
  getColorScale,
  type VisualizationConfig,
  type MapStyle
} from '../visualizationService'
import type { MapFeature } from '../../types'
import type { FormulaResult } from '../formulaService'

describe('visualizationService', () => {
  const mockFeatures: MapFeature[] = [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [[0, 0], [1, 1]]
      },
      properties: {
        id: '1',
        cviScore: 0.5
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [[1, 1], [2, 2]]
      },
      properties: {
        id: '2',
        cviScore: 0.8
      }
    }
  ]

  const mockResults: FormulaResult = {
    segmentResults: {
      '1': 0.5,
      '2': 0.8
    },
    formula: 'geometric-mean',
    statistics: {
      mean: 0.65,
      median: 0.65,
      min: 0.5,
      max: 0.8,
      standardDeviation: 0.15
    }
  }

  describe('visualizeResults', () => {
    it('returns visualization data with default config', () => {
      const result = visualizeResults(mockFeatures, mockResults)
      
      expect(result).toHaveProperty('features')
      expect(result).toHaveProperty('statistics')
      expect(result.features).toHaveLength(2)
      expect(result.features[0]).toHaveProperty('style')
    })

    it('applies custom configuration', () => {
      const config: Partial<VisualizationConfig> = {
        colorScheme: 'diverging',
        numClasses: 3,
        opacity: 0.5
      }
      
      const result = visualizeResults(mockFeatures, mockResults, config)
      
      expect(result.features[0].style.opacity).toBe(0.5)
    })

    it('handles empty features array', () => {
      const result = visualizeResults([], mockResults)
      
      expect(result.features).toHaveLength(0)
      expect(result.statistics).toBeDefined()
    })
  })

  describe('getColorScale', () => {
    it('returns color scale items', () => {
      const config: VisualizationConfig = {
        colorScheme: 'sequential',
        colorScale: 'linear',
        numClasses: 5,
        opacity: 0.8,
        showLabels: true,
        showStatistics: true
      }
      
      const scale = getColorScale(0, 1, config)
      
      expect(scale).toHaveLength(config.numClasses)
      scale.forEach(item => {
        expect(item).toHaveProperty('value')
        expect(item).toHaveProperty('color')
      })
    })

    it('handles min equal to max', () => {
      const config: VisualizationConfig = {
        colorScheme: 'sequential',
        colorScale: 'linear',
        numClasses: 5,
        opacity: 0.8,
        showLabels: true,
        showStatistics: true
      }
      
      const scale = getColorScale(1, 1, config)
      
      expect(scale).toHaveLength(config.numClasses)
    })

    it('works with different color schemes', () => {
      const schemes: VisualizationConfig['colorScheme'][] = ['sequential', 'diverging', 'qualitative']
      
      schemes.forEach(scheme => {
        const config: VisualizationConfig = {
          colorScheme: scheme,
          colorScale: 'linear',
          numClasses: 5,
          opacity: 0.8,
          showLabels: true,
          showStatistics: true
        }
        
        const scale = getColorScale(0, 1, config)
        expect(scale).toHaveLength(config.numClasses)
      })
    })
  })
}) 