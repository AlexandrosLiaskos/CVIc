// ---- File: src/types/index.ts ----
export interface ShorelineSegmentProperties {
  id: string;
  FID?: string;
  length?: number;
  index?: number;
  lineIndex?: number;
  parameters?: Record<string, ParameterValue>;
  vulnerabilityIndex?: number;
  vulnerabilityFormula?: Formula['type'];
  [key: string]: any;
}

export interface ShorelineSegment {
  type: 'Feature';
  id: string;
  geometry: LineString | MultiLineString;
  properties: ShorelineSegmentProperties;
  parameters: Record<string, ParameterValue>;
}

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
  criteria?: string // Index-specific criteria text
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
  isCustom?: boolean
  category?: string
  aliases?: string[]
  standardId?: string
  indexId?: string
  indexSpecificName?: string
  indexSpecificRankingTable?: any[] // Index-specific ranking table from research papers
  vulnerabilityValue?: number // Dynamically added during calculations
}

export interface SelectionPolygon {
  id: string
  geometry: {
    type: 'Polygon'
    coordinates: Array<Array<[number, number]>>
  }
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
  id: string;
  cviScore?: number;
  name?: string;
  [key: string]: any;
}

export interface MapFeature extends Feature {
  type: 'Feature';
  geometry: Geometry;
  properties: MapFeatureProperties;
}

export interface MapFeatureCollection extends FeatureCollection {
  type: 'FeatureCollection';
  features: MapFeature[];
}

export interface Formula {
  type: 'geometric-mean' | 'traditional' | 'arithmetic-mean' | 'nonlinear-power' | 'composite' |
        'icvi-evi' | 'icvi-svi' | 'icvi-composite' | 'icvi-arithmetic' | 'icvi-geometric' |
        'pcvi' | 'ecvi' | 'ccvi-composite' |
        'cvi-se' | 'sovi' | 'sevi' | 'lvi' | 'integrated-cvi' |
        'gcvi-composite' | 'gcvi-component';
  name: string;
  description: string;
}

export interface BaseParameterValue {
  vulnerability: number;
}

export interface NumericalParameterValue extends BaseParameterValue {
  type: 'numerical';
  value: number;
}

export interface CategoricalParameterValue extends BaseParameterValue {
  type: 'categorical';
  value: string;
}

export type ParameterValue = NumericalParameterValue | CategoricalParameterValue;
