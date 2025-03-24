import React, { useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Feature, FeatureCollection, LineString } from 'geojson'
import { ResolutionSelector } from '../components/parameters/ResolutionSelector'
import { SegmentationDisplay } from '../components/parameters/SegmentationDisplay'
import { ParameterList } from '../components/parameters/ParameterList'
import { CustomParameterForm } from '../components/parameters/ParameterList/CustomParameterForm'
import { ValueAssignment } from '../components/parameters/ValueAssignment'
import type { Resolution, Parameter, SegmentValue } from '../types'

interface ParameterPageState {
  resolution: Resolution
  segments: Feature<LineString>[]
  parameters: Parameter[]
  segmentValues: SegmentValue[]
  step: 'resolution' | 'parameters' | 'values'
}

export const ParameterPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const shoreline = location.state?.shoreline as FeatureCollection

  // Ensure we have shoreline data
  if (!shoreline) {
    navigate('/shoreline')
    return null
  }

  const [state, setState] = useState<ParameterPageState>({
    resolution: { value: 1000, unit: 'meters' },
    segments: [],
    parameters: [],
    segmentValues: [],
    step: 'resolution'
  })

  // Resolution step handlers
  const handleResolutionChange = useCallback((resolution: Resolution) => {
    setState(prev => ({ ...prev, resolution }))
  }, [])

  const handleSegmentationComplete = useCallback((segments: Feature<LineString>[]) => {
    setState(prev => ({ ...prev, segments }))
  }, [])

  // Parameter step handlers
  const handleParameterChange = useCallback((parameters: Parameter[]) => {
    setState(prev => ({ ...prev, parameters }))
  }, [])

  const handleWeightChange = useCallback((parameterId: string, weight: number) => {
    setState(prev => ({
      ...prev,
      parameters: prev.parameters.map(p =>
        p.id === parameterId ? { ...p, weight } : p
      )
    }))
  }, [])

  const handleParameterAdd = useCallback((parameter: Parameter) => {
    setState(prev => ({
      ...prev,
      parameters: [...prev.parameters, parameter]
    }))
  }, [])

  // Value assignment step handlers
  const handleValueAssign = useCallback((values: SegmentValue[]) => {
    setState(prev => ({ ...prev, segmentValues: values }))
  }, [])

  // Step navigation
  const handleNextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      step: prev.step === 'resolution' ? 'parameters' : 'values'
    }))
  }, [])

  const handlePreviousStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      step: prev.step === 'values' ? 'parameters' : 'resolution'
    }))
  }, [])

  // Check if we can proceed to next step
  const canProceedToNextStep = () => {
    switch (state.step) {
      case 'resolution':
        return state.segments.length > 0
      case 'parameters':
        return state.parameters.length > 0 &&
          state.parameters.reduce((sum, p) => sum + (p.weight || 0), 0) === 100
      case 'values':
        return state.segmentValues.length > 0
      default:
        return false
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Step indicator */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Parameter Configuration</h1>
        <div className="flex items-center space-x-4">
          <div className={`
            h-3 w-3 rounded-full
            ${state.step === 'resolution' ? 'bg-blue-500' : 'bg-gray-300'}
          `} />
          <div className={`
            h-3 w-3 rounded-full
            ${state.step === 'parameters' ? 'bg-blue-500' : 'bg-gray-300'}
          `} />
          <div className={`
            h-3 w-3 rounded-full
            ${state.step === 'values' ? 'bg-blue-500' : 'bg-gray-300'}
          `} />
        </div>
      </div>

      {/* Step content */}
      {state.step === 'resolution' && (
        <div className="space-y-6">
          <ResolutionSelector
            onResolutionChange={handleResolutionChange}
            defaultValue={state.resolution}
          />
          <SegmentationDisplay
            shoreline={shoreline}
            resolution={state.resolution}
            onSegmentationComplete={handleSegmentationComplete}
          />
        </div>
      )}

      {state.step === 'parameters' && (
        <div className="space-y-6">
          <ParameterList
            parameters={state.parameters}
            onParameterChange={handleParameterChange}
            onWeightChange={handleWeightChange}
          />
          <CustomParameterForm onParameterAdd={handleParameterAdd} />
        </div>
      )}

      {state.step === 'values' && (
        <ValueAssignment
          segments={state.segments}
          parameters={state.parameters}
          onValueAssign={handleValueAssign}
        />
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-8">
        <button
          type="button"
          onClick={handlePreviousStep}
          disabled={state.step === 'resolution'}
          className={`
            px-4 py-2 text-sm font-medium rounded-md
            ${state.step === 'resolution'
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}
          `}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={state.step === 'values' ? () => navigate('/formula') : handleNextStep}
          disabled={!canProceedToNextStep()}
          className={`
            px-4 py-2 text-sm font-medium text-white rounded-md
            ${canProceedToNextStep()
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-300 cursor-not-allowed'}
          `}
        >
          {state.step === 'values' ? 'Continue to Formula' : 'Next'}
        </button>
      </div>
    </div>
  )
} 