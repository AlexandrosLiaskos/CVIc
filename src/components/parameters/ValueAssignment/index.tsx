import React, { useState } from 'react'
import { ValueAssignmentProps } from '../types'
import { ValueAssignmentState } from './types'
import { InteractiveMap } from './InteractiveMap'
import { SegmentTable } from './SegmentTable'
import { ValueInputForm } from './ValueInputForm'

export const ValueAssignment: React.FC<ValueAssignmentProps> = ({
  segments,
  parameters,
  onValueAssign
}) => {
  const [state, setState] = useState<ValueAssignmentState>({
    selectedSegments: new Set<string>(),
    segmentValues: {},
    isDrawingSelection: false,
    selectionBounds: null
  })

  const handleSegmentSelect = (segmentId: string) => {
    setState(prev => {
      const newSelected = new Set(prev.selectedSegments)
      newSelected.add(segmentId)
      return { ...prev, selectedSegments: newSelected }
    })
  }

  const handleSegmentDeselect = (segmentId: string) => {
    setState(prev => {
      const newSelected = new Set(prev.selectedSegments)
      newSelected.delete(segmentId)
      return { ...prev, selectedSegments: newSelected }
    })
  }

  const handleMultiSegmentSelect = (segmentIds: string[]) => {
    setState(prev => {
      const newSelected = new Set(prev.selectedSegments)
      segmentIds.forEach(id => newSelected.add(id))
      return { ...prev, selectedSegments: newSelected }
    })
  }

  const handleValueChange = (segmentId: string, parameterId: string, value: number) => {
    setState(prev => {
      const newValues = { ...prev.segmentValues }
      if (!newValues[segmentId]) {
        newValues[segmentId] = {}
      }
      newValues[segmentId][parameterId] = value

      // Update the values array for onValueAssign
      const values = Object.entries(newValues).flatMap(([segId, paramValues]) =>
        Object.entries(paramValues).map(([paramId, val]) => ({
          segmentId: segId,
          parameterId: paramId,
          value: val
        }))
      )
      onValueAssign(values)

      return { ...prev, segmentValues: newValues }
    })
  }

  const handleBulkValueChange = (parameterId: string, value: number) => {
    setState(prev => {
      const newValues = { ...prev.segmentValues }
      Array.from(prev.selectedSegments).forEach(segmentId => {
        if (!newValues[segmentId]) {
          newValues[segmentId] = {}
        }
        newValues[segmentId][parameterId] = value
      })

      // Update the values array for onValueAssign
      const values = Object.entries(newValues).flatMap(([segId, paramValues]) =>
        Object.entries(paramValues).map(([paramId, val]) => ({
          segmentId: segId,
          parameterId: paramId,
          value: val
        }))
      )
      onValueAssign(values)

      return { ...prev, segmentValues: newValues }
    })
  }

  const handleApplyToAll = (values: Record<string, number>) => {
    setState(prev => {
      const newValues = { ...prev.segmentValues }
      Array.from(prev.selectedSegments).forEach(segmentId => {
        newValues[segmentId] = { ...values }
      })

      // Update the values array for onValueAssign
      const segmentValues = Object.entries(newValues).flatMap(([segId, paramValues]) =>
        Object.entries(paramValues).map(([paramId, val]) => ({
          segmentId: segId,
          parameterId: paramId,
          value: val
        }))
      )
      onValueAssign(segmentValues)

      return { ...prev, segmentValues: newValues }
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        {/* Left column: Map */}
        <div>
          <InteractiveMap
            segments={segments}
            selectedSegments={state.selectedSegments}
            onSegmentSelect={handleSegmentSelect}
            onSegmentDeselect={handleSegmentDeselect}
            onMultiSegmentSelect={handleMultiSegmentSelect}
          />
        </div>

        {/* Right column: Value Input Form */}
        <div>
          <ValueInputForm
            parameters={parameters}
            selectedSegments={state.selectedSegments}
            segmentValues={state.segmentValues}
            onValueChange={handleBulkValueChange}
            onApplyToAll={handleApplyToAll}
          />
        </div>
      </div>

      {/* Bottom: Segment Table */}
      <div>
        <SegmentTable
          segments={segments}
          parameters={parameters}
          selectedSegments={state.selectedSegments}
          segmentValues={state.segmentValues}
          onValueChange={handleValueChange}
        />
      </div>
    </div>
  )
} 