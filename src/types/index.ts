import type { Feature, FeatureCollection, Geometry, LineString, MultiLineString } from 'geojson'

export interface User {
  id: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export interface Resolution {
  value: number
  unit: 'meters' | 'kilometers'
}

export interface VulnerabilityRange {
  value: number
  min: number | null
  max: number | null
  label: string
  color: string
}

export interface BaseParameterOption {
  label: string
  color: string
  vulnerability: number
}

export interface NumericalParameterOption extends BaseParameterOption {
  type: 'numerical'
  value: number
}

export interface CategoricalParameterOption extends BaseParameterOption {
  type: 'categorical'
  value: string
}

export type ParameterOption = NumericalParameterOption | CategoricalParameterOption

export interface Category {
  value: string
  label: string
}

export interface Parameter {
  id: string
  name: string
  description: string
  type: 'numerical' | 'categorical'
  weight: number
  unit?: string
  vulnerabilityRanges?: VulnerabilityRange[]
  options?: ParameterOption[]
  enabled?: boolean
  range?: {
    min: number
    max: number
  }
  isCustom?: boolean
  isComplete?: boolean
  categories?: Category[]
  vulnerability?: number
}

export interface ParameterSegment {
  id: string
  parameterId: string
  geometry: LineString | MultiLineString
  value: number
}

export interface SelectionPolygon {
  id: string
  geometry: {
    type: 'Polygon'
    coordinates: Array<Array<[number, number]>>
  }
}

export interface SegmentValue {
  segmentId: string
  parameterId: string
  value: number | string
}

export interface ShorelineSegmentProperties {
  id: string
  FID?: string
  length?: number
  index?: number
  lineIndex?: number
  values?: Record<string, number>
  vulnerabilityIndex?: number
  [key: string]: any
}

export interface ShorelineSegment {
  type: 'Feature'
  id: string
  geometry: LineString | MultiLineString
  properties: ShorelineSegmentProperties
  parameters: Record<string, ParameterValue>
}

export interface ShorelineData {
  name: string
  location: string
  length: number
  description: string
  userId: string
  geoJSON?: FeatureCollection<LineString | MultiLineString>
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface MapFeatureProperties {
  id: string
  cviScore: number
  name?: string
  [key: string]: any
}

export interface MapFeature extends Feature {
  type: 'Feature'
  geometry: Geometry
  properties: MapFeatureProperties
}

export interface MapFeatureCollection extends FeatureCollection {
  type: 'FeatureCollection'
  features: MapFeature[]
}

export type WorkflowStep = 'resolution' | 'parameters' | 'values'

export interface ParameterPageProps {
  shoreline: FeatureCollection<LineString | MultiLineString>
  onComplete: (segments: ShorelineSegment[], parameters: Parameter[]) => void
}

// Utility function to get vulnerability value based on parameter and value
export function getVulnerabilityValue(parameter: Parameter, value: number): number {
  if (parameter.type === 'categorical') {
    return parameter.options?.find(o => o.value === value)?.vulnerability || 1
  }

  if (!parameter.vulnerabilityRanges) return 1

  const range = parameter.vulnerabilityRanges.find(r => 
    (r.min === null || value >= r.min) && (r.max === null || value <= r.max)
  )
  return range?.value || 1
}

// Default vulnerability ranges based on the image
export const DEFAULT_VULNERABILITY_RANGES: Record<string, VulnerabilityRange[]> = {
  slope: [
    { min: 0.2, max: null, label: 'Very low', value: 1, color: '#1a9850' },
    { min: 0.07, max: 0.2, label: 'Low', value: 2, color: '#91cf60' },
    { min: 0.04, max: 0.07, label: 'Moderate', value: 3, color: '#d9ef8b' },
    { min: 0.025, max: 0.04, label: 'High', value: 4, color: '#fee08b' },
    { min: 0, max: 0.025, label: 'Very high', value: 5, color: '#fc8d59' }
  ],
  seaLevel: [
    { min: 0, max: 1.8, label: 'Very low', value: 1, color: '#1a9850' },
    { min: 1.8, max: 2.5, label: 'Low', value: 2, color: '#91cf60' },
    { min: 2.5, max: 2.95, label: 'Moderate', value: 3, color: '#d9ef8b' },
    { min: 2.95, max: 3.16, label: 'High', value: 4, color: '#fee08b' },
    { min: 3.16, max: null, label: 'Very high', value: 5, color: '#fc8d59' }
  ],
  erosionRate: [
    { min: 2.0, max: null, label: 'Very low', value: 1, color: '#1a9850' },
    { min: 1.0, max: 2.0, label: 'Low', value: 2, color: '#91cf60' },
    { min: -1.0, max: 1.0, label: 'Moderate', value: 3, color: '#d9ef8b' },
    { min: -2.0, max: -1.1, label: 'High', value: 4, color: '#fee08b' },
    { min: null, max: -2.0, label: 'Very high', value: 5, color: '#fc8d59' }
  ],
  tideRange: [
    { min: 6.0, max: null, label: 'Very low', value: 1, color: '#1a9850' },
    { min: 4.1, max: 6.0, label: 'Low', value: 2, color: '#91cf60' },
    { min: 2.0, max: 4.0, label: 'Moderate', value: 3, color: '#d9ef8b' },
    { min: 1.0, max: 1.9, label: 'High', value: 4, color: '#fee08b' },
    { min: 0, max: 1.0, label: 'Very high', value: 5, color: '#fc8d59' }
  ],
  waveHeight: [
    { min: 0, max: 0.55, label: 'Very low', value: 1, color: '#1a9850' },
    { min: 0.55, max: 0.85, label: 'Low', value: 2, color: '#91cf60' },
    { min: 0.85, max: 1.05, label: 'Moderate', value: 3, color: '#d9ef8b' },
    { min: 1.05, max: 1.25, label: 'High', value: 4, color: '#fee08b' },
    { min: 1.25, max: null, label: 'Very high', value: 5, color: '#fc8d59' }
  ]
}

export interface Formula {
  type: 'geometric-mean' | 'geometric-mean-normalized' | 'arithmetic-mean' | 'nonlinear-power'
  name: string
  description: string
}

export type VulnerabilityLevel = 'very-low' | 'low' | 'moderate' | 'high' | 'very-high'

export interface BaseParameterValue {
  vulnerability: number
}

export interface NumericalParameterValue extends BaseParameterValue {
  type: 'numerical'
  value: number
}

export interface CategoricalParameterValue extends BaseParameterValue {
  type: 'categorical'
  value: string
}

export type ParameterValue = NumericalParameterValue | CategoricalParameterValue