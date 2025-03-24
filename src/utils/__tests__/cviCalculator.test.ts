import { calculateCVI, getCVILevelColor } from '../cviCalculator'
import type { Formula } from '../../types'

describe('cviCalculator', () => {
  const mockInputs = {
    geomorphology: 3,
    coastalSlope: 2,
    relativeSeaLevelRise: 4,
    meanWaveHeight: 2,
    meanTideRange: 3,
    shorelineErosionRate: 4,
    populationDensity: 2,
    landUse: 3,
    infrastructure: 3
  }

  describe('calculateCVI', () => {
    it('calculates CVI using geometric mean by default', () => {
      const result = calculateCVI(mockInputs)
      expect(result.cviScore).toBeGreaterThan(0)
      expect(result.cviScore).toBeLessThan(1)
      expect(result).toHaveProperty('level')
      expect(result).toHaveProperty('description')
    })

    it('calculates CVI using normalized geometric mean', () => {
      const formula: Formula = {
        type: 'geometric-mean-normalized',
        name: 'Normalized Geometric Mean',
        description: 'Normalized geometric mean of vulnerability indices'
      }
      const result = calculateCVI(mockInputs, formula)
      expect(result.cviScore).toBeGreaterThan(0)
      expect(result.cviScore).toBeLessThan(1)
    })

    it('calculates CVI using arithmetic mean', () => {
      const formula: Formula = {
        type: 'arithmetic-mean',
        name: 'Arithmetic Mean',
        description: 'Arithmetic mean of vulnerability indices'
      }
      const result = calculateCVI(mockInputs, formula)
      expect(result.cviScore).toBeGreaterThan(0)
      expect(result.cviScore).toBeLessThan(1)
    })

    it('calculates CVI using nonlinear power', () => {
      const formula: Formula = {
        type: 'nonlinear-power',
        name: 'Nonlinear Power',
        description: 'Nonlinear power function of vulnerability indices'
      }
      const result = calculateCVI(mockInputs, formula)
      expect(result.cviScore).toBeGreaterThan(0)
      expect(result.cviScore).toBeLessThan(1)
    })

    it('assigns correct vulnerability level for low score', () => {
      const lowInputs = {
        ...mockInputs,
        geomorphology: 1,
        coastalSlope: 1,
        relativeSeaLevelRise: 1,
        meanWaveHeight: 1,
        meanTideRange: 1,
        shorelineErosionRate: 1,
        populationDensity: 1,
        landUse: 1,
        infrastructure: 1
      }
      const result = calculateCVI(lowInputs)
      expect(result.level).toBe('low')
    })

    it('assigns correct vulnerability level for high score', () => {
      const highInputs = {
        ...mockInputs,
        geomorphology: 5,
        coastalSlope: 5,
        relativeSeaLevelRise: 5,
        meanWaveHeight: 5,
        meanTideRange: 5,
        shorelineErosionRate: 5,
        populationDensity: 5,
        landUse: 5,
        infrastructure: 5
      }
      const result = calculateCVI(highInputs)
      expect(result.level).toBe('high')
    })
  })

  describe('getCVILevelColor', () => {
    it('returns green for low vulnerability', () => {
      expect(getCVILevelColor(0.2)).toBe('#22c55e')
    })

    it('returns yellow for medium vulnerability', () => {
      expect(getCVILevelColor(0.5)).toBe('#eab308')
    })

    it('returns red for high vulnerability', () => {
      expect(getCVILevelColor(0.8)).toBe('#ef4444')
    })

    it('handles edge cases', () => {
      expect(getCVILevelColor(0)).toBe('#22c55e')
      expect(getCVILevelColor(0.33)).toBe('#eab308')
      expect(getCVILevelColor(0.66)).toBe('#ef4444')
      expect(getCVILevelColor(1)).toBe('#ef4444')
    })
  })
}) 