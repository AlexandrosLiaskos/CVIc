import type { Feature, FeatureCollection, LineString } from 'geojson'
import type { Resolution, Parameter, SegmentValue } from '../../types'

export type { Resolution, Parameter, SegmentValue }

export interface ParameterPageProps {
  shoreline: FeatureCollection
  onComplete: (segments: Feature<LineString>[], parameters: Parameter[]) => void
}

export interface ResolutionSelectorProps {
  onResolutionChange: (resolution: Resolution) => void
  defaultValue?: Resolution
}

export interface SegmentationDisplayProps {
  shoreline: FeatureCollection
  resolution: Resolution
  onSegmentationComplete: (segments: Feature<LineString>[]) => void
}

export interface ParameterListProps {
  parameters: Parameter[]
  onParameterChange: (parameters: Parameter[]) => void
  onWeightChange: (parameterId: string, weight: number) => void
}

export interface ValueAssignmentProps {
  segments: Feature<LineString>[]
  parameters: Parameter[]
  onValueAssign: (values: SegmentValue[]) => void
} 