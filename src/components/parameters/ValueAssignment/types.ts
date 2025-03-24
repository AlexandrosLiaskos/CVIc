import { Feature, LineString } from 'geojson'
import { Parameter, SegmentValue } from '../types'

export interface SelectedSegment {
  id: string
  values: Record<string, number>
}

export interface InteractiveMapProps {
  segments: Feature<LineString>[]
  selectedSegments: Set<string>
  onSegmentSelect: (segmentId: string) => void
  onSegmentDeselect: (segmentId: string) => void
  onMultiSegmentSelect: (segmentIds: string[]) => void
}

export interface SegmentTableProps {
  segments: Feature<LineString>[]
  parameters: Parameter[]
  selectedSegments: Set<string>
  segmentValues: Record<string, Record<string, number>>
  onValueChange: (segmentId: string, parameterId: string, value: number) => void
}

export interface ValueInputFormProps {
  parameters: Parameter[]
  selectedSegments: Set<string>
  segmentValues: Record<string, Record<string, number>>
  onValueChange: (parameterId: string, value: number) => void
  onApplyToAll: (values: Record<string, number>) => void
}

export interface ValueAssignmentState {
  selectedSegments: Set<string>
  segmentValues: Record<string, Record<string, number>>
  isDrawingSelection: boolean
  selectionBounds: [number, number, number, number] | null
} 