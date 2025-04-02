// ---- File: src/types/index.ts ----
// Add 'stylingMode' to MapProps if it's defined here, otherwise ensure it's correctly in Map.tsx's interface
// (No changes needed based on current file content, assuming MapProps is correctly defined in Map.tsx)

// Make sure ShorelineSegmentProperties includes vulnerabilityIndex and vulnerabilityFormula
export interface ShorelineSegmentProperties {
  id: string;
  FID?: string; // Optional legacy field
  length?: number;
  index?: number; // Index within the original LineString feature
  lineIndex?: number; // Index of the original LineString in a MultiLineString
  // 'values' seems deprecated/unused in favor of 'parameters' below
  // values?: Record<string, number>;
  parameters?: Record<string, ParameterValue>; // Store assigned parameter values/vulnerability here
  vulnerabilityIndex?: number; // Calculated CVI score
  vulnerabilityFormula?: Formula['type']; // Formula used for calculation
  [key: string]: any; // Allow other properties that might come from shapefile
}

// Make sure ShorelineSegment includes the 'parameters' property for direct access
export interface ShorelineSegment {
  type: 'Feature';
  id: string;
  geometry: LineString | MultiLineString;
  properties: ShorelineSegmentProperties;
  parameters: Record<string, ParameterValue>; // Direct access mirror of properties.parameters
}

// Rest of the file remains the same...
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
  value: number // May not be strictly necessary if range defines vulnerability
}

export interface CategoricalParameterOption extends BaseParameterOption {
  type: 'categorical'
  value: string // The specific category value (e.g., 'sandy_beach')
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
  vulnerabilityRanges?: VulnerabilityRange[] // Used for numerical type
  options?: ParameterOption[] // Used for categorical type
  enabled?: boolean
  // 'range' might be redundant if using vulnerabilityRanges
  // range?: {
  //   min: number
  //   max: number
  // }
  isCustom?: boolean // Flag for user-defined parameters (future)
  // Redundant fields removed as they belong to segment-specific values
  // isComplete?: boolean
  // categories?: Category[]
  // vulnerability?: number
}

// Deprecated? ParameterSegment seems unused
// export interface ParameterSegment {
//   id: string
//   parameterId: string
//   geometry: LineString | MultiLineString
//   value: number
// }

export interface SelectionPolygon {
  id: string
  geometry: {
    type: 'Polygon'
    coordinates: Array<Array<[number, number]>>
  }
}

// Deprecated? SegmentValue seems unused - values stored in ShorelineSegment.parameters
// export interface SegmentValue {
//   segmentId: string
//   parameterId: string
//   value: number | string
// }


// Keep this - used for storing original uploaded data
export interface ShorelineData {
  name: string // Maybe file name?
  location: string // Could be derived later or user input
  length: number // Total length
  description: string // User input?
  userId: string // If using auth
  geoJSON?: FeatureCollection<LineString | MultiLineString>
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

// Used by Map component potentially for generic features
export interface MapFeatureProperties {
  id: string;
  cviScore?: number; // Optional CVI score
  name?: string;
  [key: string]: any; // Allow other properties
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

// Deprecated? WorkflowStep seems unused
// export type WorkflowStep = 'resolution' | 'parameters' | 'values'

// Deprecated? ParameterPageProps seems unused
// export interface ParameterPageProps {
//   shoreline: FeatureCollection<LineString | MultiLineString>
//   onComplete: (segments: ShorelineSegment[], parameters: Parameter[]) => void
// }

export interface Formula {
  type: 'geometric-mean' | 'geometric-mean-normalized' | 'arithmetic-mean' | 'nonlinear-power';
  name: string;
  description: string;
}

// Deprecated? VulnerabilityLevel seems unused in favor of numerical scores 1-5
// export type VulnerabilityLevel = 'very-low' | 'low' | 'moderate' | 'high' | 'very-high'

// Represents the value assigned to a parameter for a specific segment
export interface BaseParameterValue {
  vulnerability: number; // The calculated or assigned vulnerability score (1-5)
}

export interface NumericalParameterValue extends BaseParameterValue {
  type: 'numerical';
  value: number; // The actual numerical measurement (optional, could rely purely on vulnerability)
}

export interface CategoricalParameterValue extends BaseParameterValue {
  type: 'categorical';
  value: string; // The specific category selected (e.g., 'sandy_beach')
}

export type ParameterValue = NumericalParameterValue | CategoricalParameterValue;

// Add MapProps interface definition (if not defined inline in Map.tsx)
// Example:
// export interface MapProps {
//    // ... properties defined in Map.tsx ...
//    stylingMode?: 'parameter' | 'cvi';
// }