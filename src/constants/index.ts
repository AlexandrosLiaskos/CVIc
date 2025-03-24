export const APP_NAME = 'CVIc'
export const APP_DESCRIPTION = 'Coastal Vulnerability Index Compiler'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SHORELINE: '/shoreline',
  RESULTS_MANAGER: '/results-manager'
} as const

export const CVI_LEVELS = {
  LOW: {
    threshold: 0.33,
    label: 'Low',
    description: 'Low vulnerability to coastal hazards',
    color: 'green'
  },
  MEDIUM: {
    threshold: 0.66,
    label: 'Medium',
    description: 'Moderate vulnerability to coastal hazards',
    color: 'yellow'
  },
  HIGH: {
    threshold: 1,
    label: 'High',
    description: 'High vulnerability to coastal hazards',
    color: 'red'
  }
} as const

export const CVI_WEIGHTS = {
  geomorphology: 0.15,
  coastalSlope: 0.1,
  relativeSeaLevelRise: 0.15,
  meanWaveHeight: 0.1,
  meanTideRange: 0.1,
  shorelineErosionRate: 0.1,
  populationDensity: 0.05,
  landUse: 0.05,
  infrastructure: 0.05
} as const

export const INPUT_RANGES = {
  MIN: 1,
  MAX: 5
} as const 