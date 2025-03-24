import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FeatureCollection, LineString, MultiLineString, GeoJsonProperties } from 'geojson'
import type { Parameter, ShorelineSegment } from '../../types'
import { indexedDBService } from '../../services/indexedDBService'
import ParameterSelectionStep from './ParameterSelectionStep'
import ValueAssignmentStep from './ValueAssignmentStep'

type WorkflowStep = 'parameters' | 'values'

interface ParameterPageProps {
  shoreline: FeatureCollection<LineString | MultiLineString, GeoJsonProperties>
  onComplete: (segments: ShorelineSegment[], parameters: Parameter[]) => void
}

export default function ParameterPage({ shoreline, onComplete }: ParameterPageProps) {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('parameters')
  const [segments, setSegments] = useState<ShorelineSegment[]>([])
  const [parameters, setParameters] = useState<Parameter[]>([])
  const [error, setError] = useState<string | null>(null)

  // Load segments from IndexedDB
  useEffect(() => {
    const loadSegments = async () => {
      try {
        const data = await indexedDBService.getShorelineData('current-segments')
        if (!data) {
          setError('No segments found. Please complete the segmentation step first.')
          navigate('/segment-table')
          return
        }

        // Convert FeatureCollection to ShorelineSegment array
        const loadedSegments = data.features.map(feature => ({
          ...feature,
          id: feature.properties?.id || feature.id,
          type: 'Feature' as const,
          geometry: feature.geometry as LineString | MultiLineString,
          properties: {
            ...feature.properties,
            values: feature.properties?.values || {}
          },
          parameters: feature.properties?.parameters || {}
        }))

        setSegments(loadedSegments as ShorelineSegment[])
      } catch (err) {
        setError('Failed to load segment data. Please try again.')
        console.error('Error loading segments:', err)
        navigate('/segment-table')
      }
    }

    loadSegments()
  }, [navigate])

  const handleParametersComplete = (updatedParameters: Parameter[]) => {
    setParameters(updatedParameters)
    setCurrentStep('values')
  }

  const handleValuesComplete = async (updatedSegments: ShorelineSegment[]) => {
    // Check if weights sum to 1 (100%)
    const enabledParameters = parameters.filter(p => p.enabled)
    const totalWeight = enabledParameters.reduce((sum, p) => sum + (p.weight || 0), 0)
    
    if (Math.abs(totalWeight - 1) > 0.01) {
      setError(`Parameter weights must sum to 100%. Current total: ${(totalWeight * 100).toFixed(0)}%`)
      return
    }

    // Validate that all segments have values for all enabled parameters
    const missingValues = updatedSegments.some(segment => {
      return enabledParameters.some(param => {
        return !segment.properties?.values || segment.properties.values[param.id] === undefined
      })
    })

    if (missingValues) {
      setError('Some segments are missing values. Please complete all assignments.')
      return
    }

    try {
      // Calculate vulnerability index for each segment
      const segmentsWithVulnerability = updatedSegments.map(segment => {
        let vulnerabilityIndex = 0
        let totalWeight = 0

        enabledParameters.forEach(param => {
          if (segment.properties?.values && segment.properties.values[param.id] !== undefined) {
            vulnerabilityIndex += (segment.properties.values[param.id] * (param.weight || 0))
            totalWeight += (param.weight || 0)
          }
        })

        // Normalize by total weight
        if (totalWeight > 0) {
          vulnerabilityIndex = vulnerabilityIndex / totalWeight
        }

        return {
          ...segment,
          properties: {
            ...segment.properties,
            vulnerabilityIndex
          }
        }
      })

      // Store the updated segments in IndexedDB
      await indexedDBService.storeShorelineData('current-segments', {
        type: 'FeatureCollection',
        features: segmentsWithVulnerability
      })

      onComplete(segmentsWithVulnerability, enabledParameters)
      navigate('/results')
    } catch (err) {
      console.error('Error saving segments:', err)
      setError('Failed to save segment data. Please try again.')
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'parameters':
        return (
          <ParameterSelectionStep
            parameters={parameters}
            onParametersUpdate={setParameters}
            onError={setError}
            onComplete={() => setCurrentStep('values')}
            onBack={() => navigate('/segment-table')}
          />
        )
      case 'values':
        return (
          <ValueAssignmentStep
            shoreline={shoreline}
            segments={segments}
            parameters={parameters}
            onComplete={handleValuesComplete}
            onError={setError}
            onBack={() => setCurrentStep('parameters')}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Parameter Configuration</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Main content */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex-1 ${currentStep === 'parameters' ? 'text-blue-600' : 'text-gray-500'}`}>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'parameters' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Select Parameters</span>
              </div>
            </div>
            <div className="w-16 h-1 bg-gray-200 mx-2"></div>
            <div className={`flex-1 ${currentStep === 'values' ? 'text-blue-600' : 'text-gray-500'}`}>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'values' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Assign Values</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step content */}
        {renderStep()}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => {
            if (currentStep === 'values') setCurrentStep('parameters')
          }}
          className={`px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
            currentStep === 'parameters' ? 'invisible' : ''
          }`}
        >
          Back
        </button>
        
        <button
          type="button"
          onClick={() => {
            if (currentStep === 'parameters') {
              // Check if weights sum to 1 (100%)
              const enabledParameters = parameters.filter(p => p.enabled)
              const totalWeight = enabledParameters.reduce((sum, p) => sum + (p.weight || 0), 0)
              
              if (Math.abs(totalWeight - 1) > 0.01) {
                setError(`Parameter weights must sum to 100%. Current total: ${(totalWeight * 100).toFixed(0)}%`)
                return
              }
              
              handleParametersComplete(parameters)
            }
          }}
          className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 ${
            currentStep === 'values' ? 'invisible' : ''
          }`}
        >
          {currentStep === 'parameters' ? 'Continue to Value Assignment' : ''}
        </button>
      </div>
    </div>
  )
}