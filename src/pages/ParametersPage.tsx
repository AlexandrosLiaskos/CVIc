import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import * as turf from '@turf/turf'
import Map from '../components/maps/Map'
import ParameterPanel from '../components/parameters/ParameterPanel'
import { DEFAULT_VULNERABILITY_RANGES, getVulnerabilityValue } from '../types'
import type {
  Parameter,
  ShorelineSegment,
  SelectionPolygon,
  WorkflowStep,
  SegmentValue,
  ParameterValue,
  NumericalParameterValue,
  CategoricalParameterValue,
  ShorelineSegmentProperties
} from '../types'
import type { Feature, Polygon, MultiLineString, LineString } from 'geojson'
import { ValueAssignment } from '../components/parameters/ValueAssignment'

function getVulnerabilityLabel(value: number): string {
  switch (value) {
    case 1: return 'Very low'
    case 2: return 'Low'
    case 3: return 'Moderate'
    case 4: return 'High'
    case 5: return 'Very high'
    default: return 'Unknown'
  }
}

const DEFAULT_PARAMETERS: Parameter[] = [
  {
    id: 'geomorphology',
    name: 'Geomorphology',
    description: 'Coastal landform type and characteristics',
    type: 'categorical',
    options: [
      { type: 'categorical', value: 'rocky_cliffs', label: 'Rocky Cliffs', color: '#1a9850', vulnerability: 1 },
      { type: 'categorical', value: 'medium_cliffs', label: 'Medium Cliffs', color: '#91cf60', vulnerability: 2 },
      { type: 'categorical', value: 'low_cliffs', label: 'Low Cliffs', color: '#d9ef8b', vulnerability: 3 },
      { type: 'categorical', value: 'beaches', label: 'Beaches', color: '#fee08b', vulnerability: 4 },
      { type: 'categorical', value: 'wetlands', label: 'Wetlands', color: '#fc8d59', vulnerability: 5 }
    ],
    enabled: true,
    isComplete: false
  },
  {
    id: 'coastal_slope',
    name: 'Coastal Slope',
    description: 'Average slope of the coastal zone',
    type: 'numerical',
    unit: 'degrees',
    vulnerabilityRanges: [
      { value: 1, min: 0.2, max: null, label: 'Very Low', color: '#1a9850' },
      { value: 2, min: 0.07, max: 0.2, label: 'Low', color: '#91cf60' },
      { value: 3, min: 0.04, max: 0.07, label: 'Moderate', color: '#d9ef8b' },
      { value: 4, min: 0.025, max: 0.04, label: 'High', color: '#fee08b' },
      { value: 5, min: 0, max: 0.025, label: 'Very High', color: '#fc8d59' }
    ],
    enabled: true,
    isComplete: false
  },
  {
    id: 'elevation',
    name: 'Elevation',
    description: 'Beach elevation above sea level',
    type: 'numerical',
    unit: 'meters',
    range: { min: 0, max: 100 },
    enabled: true
  },
  {
    id: 'geology',
    name: 'Geology',
    description: 'Coastal geology type',
    type: 'categorical',
    options: [
      { type: 'categorical', value: 'rock', label: 'Rock', color: '#1a9850', vulnerability: 1 },
      { type: 'categorical', value: 'sand', label: 'Sand', color: '#91cf60', vulnerability: 2 },
      { type: 'categorical', value: 'mud', label: 'Mud', color: '#d9ef8b', vulnerability: 3 },
      { type: 'categorical', value: 'mixed', label: 'Mixed', color: '#fee08b', vulnerability: 4 }
    ],
    enabled: true
  },
  {
    id: 'waveHeight',
    name: 'Wave Height',
    description: 'Significant wave height',
    weight: 0.2,
    type: 'numerical',
    range: { min: 0, max: 2 },
    unit: 'm',
    vulnerabilityRanges: DEFAULT_VULNERABILITY_RANGES.waveHeight,
    enabled: true,
    isComplete: false
  },
  {
    id: 'tideRange',
    name: 'Tidal Range',
    description: 'Mean tidal range',
    weight: 0.2,
    type: 'numerical',
    range: { min: 0, max: 7 },
    unit: 'm',
    vulnerabilityRanges: DEFAULT_VULNERABILITY_RANGES.tideRange,
    enabled: true,
    isComplete: false
  },
  {
    id: 'erosionRate',
    name: 'Erosion/Accretion Rate',
    description: 'Historical shoreline change rate',
    weight: 0.1,
    type: 'numerical',
    range: { min: -5, max: 5 },
    unit: 'm/year',
    vulnerabilityRanges: DEFAULT_VULNERABILITY_RANGES.erosionRate,
    enabled: true,
    isComplete: false
  }
]

export default function ParametersPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('parameters')
  const [parameters, setParameters] = useState<Parameter[]>(DEFAULT_PARAMETERS)
  const [segments, setSegments] = useState<ShorelineSegment[]>([])
  const [selectionPolygons, setSelectionPolygons] = useState<SelectionPolygon[]>([])
  const [selectedParameter, setSelectedParameter] = useState<string | null>(null)
  const [selectedSegments, setSelectedSegments] = useState<string[]>([])
  const [geoJSON, setGeoJSON] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [totalShorelineLength, setTotalShorelineLength] = useState(0)
  const [segmentResolution, setSegmentResolution] = useState(30) // Default 30m resolution

  const discretizeShoreline = (feature: any, resolution: number) => {
    try {
      // Convert to feature and flatten to single LineString features
      const line = turf.feature(feature.geometry) as Feature<MultiLineString>
      if (!line) return null

      const coordinates = line.geometry.coordinates
      const segments: ShorelineSegment[] = []

      // Process each line in the MultiLineString
      coordinates.forEach((lineCoords, lineIndex) => {
        // Create a LineString feature
        const lineString = turf.lineString(lineCoords)
        
        // Calculate length
        const length = turf.length(lineString, { units: 'meters' })
        
        // Calculate number of segments
        const numSegments = Math.ceil(length / resolution)
        
        // Create segments
        for (let i = 0; i < numSegments; i++) {
          const start = (i * length) / numSegments
          const end = ((i + 1) * length) / numSegments
          
          const startPoint = turf.along(lineString, start, { units: 'meters' })
          const endPoint = turf.along(lineString, end, { units: 'meters' })
          
          const segment = turf.lineString([
            startPoint.geometry.coordinates,
            endPoint.geometry.coordinates
          ])

          segments.push({
            id: uuidv4(),
            geometry: segment.geometry,
            properties: {
              ...feature.properties,
              length: resolution,
              startDist: start,
              endDist: end,
              lineIndex,
              segmentIndex: i,
              FID: `${feature.properties?.FID || 'S'}-${lineIndex + 1}-${i + 1}`
            },
            parameters: {}
          })
        }
      })
      
      return segments
    } catch (err) {
      console.error('Error discretizing shoreline:', err)
      return null
    }
  }

  const handleResolutionChange = (newResolution: number) => {
    if (newResolution <= 0) {
      setError('Resolution must be greater than 0')
      return
    }

    setSegmentResolution(newResolution)
    
    // Re-discretize shoreline with new resolution
    if (geoJSON?.features) {
      const newSegments: ShorelineSegment[] = []
      geoJSON.features.forEach((feature: any) => {
        const segments = discretizeShoreline(feature, newResolution)
        if (segments) {
          newSegments.push(...segments)
        }
      })
      setSegments(newSegments)
    }
  }

  useEffect(() => {
    // Load GeoJSON from session storage
    const storedGeoJSON = sessionStorage.getItem('shorelineGeoJSON')
    if (!storedGeoJSON) {
      setError('No shoreline data found. Please upload a shapefile first.')
      return
    }

    const parsedGeoJSON = JSON.parse(storedGeoJSON)
    setGeoJSON(parsedGeoJSON)

    // Load segments from session storage (created in SegmentationPage)
    const storedSegments = sessionStorage.getItem('segments')
    if (storedSegments) {
      try {
        const parsedSegments = JSON.parse(storedSegments)
        setSegments(parsedSegments)
      } catch (err) {
        console.error('Error parsing segments:', err)
        setError('Error loading segments. Please try again.')
      }
    } else {
      setError('No segments found. Please complete the segmentation step first.')
      navigate('/segmentation')
    }

    // Calculate total shoreline length
    let totalLength = 0
    if (parsedGeoJSON.features) {
      parsedGeoJSON.features.forEach((feature: any) => {
        try {
          const line = turf.feature(feature.geometry) as Feature<MultiLineString>
          if (line) {
            const length = turf.length(line, { units: 'kilometers' })
            totalLength += length
          }
        } catch (err) {
          console.error('Error calculating length:', err)
        }
      })
    }
    setTotalShorelineLength(totalLength)
  }, [navigate])

  const handleParameterChange = useCallback((paramId: string, changes: Partial<Parameter>) => {
    setParameters(prev => prev.map(p => p.id === paramId ? { ...p, ...changes } : p))
  }, [])

  const handleParameterSelect = useCallback((paramId: string | null) => {
    setSelectedParameter(paramId)
  }, [])

  const handleWeightChange = useCallback((parameterId: string, weight: number) => {
    setParameters(prev => prev.map(p => p.id === parameterId ? { ...p, weight } : p))
  }, [])

  const handleSelectionCreate = (geometry: any) => {
    if (!selectedParameter) {
      setError('Please select a parameter first')
      return
    }

    try {
      // Convert the selection polygon to a feature
      const polygonFeature = turf.feature(geometry) as Feature<Polygon>
      
      // Find all intersecting segments
      const intersectingSegments = segments.filter(segment => {
        try {
          // Convert the shoreline segment to a feature
          const lineFeature = turf.feature(segment.geometry) as Feature<MultiLineString>

          // Buffer the line slightly to make intersection more reliable
          const bufferedLine = turf.buffer(lineFeature, 0.001, { units: 'kilometers' })

          // Check if the polygon intersects with the buffered line
          return turf.booleanIntersects(polygonFeature, bufferedLine)
        } catch (err) {
          console.error('Error checking intersection:', err)
          return false
        }
      })

      if (intersectingSegments.length === 0) {
        setError('No shoreline segments intersect with the selected area')
        return
      }

      // Store the selection for visualization
      const polygonId = uuidv4()
      setSelectionPolygons(polygons => [...polygons, { id: polygonId, geometry }])

      // Update selected segments
      const newSelectedSegments = intersectingSegments.map(seg => seg.id)
      setSelectedSegments(prev => [...new Set([...prev, ...newSelectedSegments])])

      // If this is a categorical parameter, show a dialog to set the value for all selected segments
      const parameter = parameters.find(p => p.id === selectedParameter)
      if (parameter?.type === 'categorical') {
        // You might want to implement a modal or other UI element to handle bulk value assignment
        console.log('Selected segments for value assignment:', newSelectedSegments)
      }
    } catch (err) {
      console.error('Error handling selection:', err)
      setError('Failed to process selection')
    }
  }

  const handleSelectionDelete = (polygonId: string) => {
    setSelectionPolygons(polygons => polygons.filter(p => p.id !== polygonId))
    // Clear selected segments when removing selection
    setSelectedSegments([])
  }

  const handleSegmentValueChange = useCallback((segmentId: string, parameterId: string, value: number | string) => {
    setSegments(prevSegments => {
      return prevSegments.map(segment => {
        if (segment.id === segmentId) {
          return {
            ...segment,
            parameters: {
              ...segment.parameters,
              [parameterId]: {
                type: typeof value === 'number' ? 'numerical' : 'categorical',
                value
              }
            }
          }
        }
        return segment
      })
    })
  }, [])

  const handleStepComplete = () => {
    if (currentStep === 'weights') {
      // Validate weights sum to 1
      const totalWeight = parameters
        .filter(p => p.enabled)
        .reduce((sum, p) => sum + (p.weight || 0), 0)
      
      if (Math.abs(totalWeight - 1) > 0.01) {
        setError('Parameter weights must sum to 100%')
        return
      }

      setCurrentStep('values')
      // Select the first incomplete parameter
      const firstIncomplete = parameters.find(p => p.enabled && !p.isComplete)
      setSelectedParameter(firstIncomplete?.id ?? null)
    }
  }

  const handleParameterComplete = () => {
    if (!selectedParameter) return

    // Check if all segments have a value for this parameter
    const hasFullCoverage = segments.every(seg => 
      seg.parameters[selectedParameter] !== undefined && 
      seg.parameters[selectedParameter] !== null
    )
    
    if (!hasFullCoverage) {
      setError('Please define values for the entire shoreline before proceeding')
      return
    }

    // Mark current parameter as complete
    setParameters(params =>
      params.map(p => p.id === selectedParameter ? { ...p, isComplete: true } : p)
    )

    // Find next incomplete parameter
    const nextIncomplete = parameters.find(p => p.enabled && !p.isComplete && p.id !== selectedParameter)
    if (nextIncomplete) {
      setSelectedParameter(nextIncomplete.id)
      setSelectionPolygons([]) // Clear selections when switching parameters
    } else {
      // All parameters are complete
      handleContinue()
    }
  }

  const handleContinue = () => {
    // Store parameters and segment values
    sessionStorage.setItem('parameters', JSON.stringify(parameters))
    sessionStorage.setItem('segments', JSON.stringify(segments))
    navigate('/calculation')
  }

  const handleValueAssign = useCallback((segmentId: string, parameterId: string, value: number | string) => {
    setSegments(prevSegments => {
      return prevSegments.map(segment => {
        if (segment.id === segmentId) {
          return {
            ...segment,
            parameters: {
              ...segment.parameters,
              [parameterId]: {
                type: typeof value === 'number' ? 'numerical' : 'categorical',
                value
              }
            }
          }
        }
        return segment
      })
    })
  }, [])

  const handleNextStep = useCallback(() => {
    if (currentStep === 'parameters') {
      setCurrentStep('values')
    }
  }, [currentStep])

  const handlePreviousStep = useCallback(() => {
    if (currentStep === 'values') {
      setCurrentStep('parameters')
    }
  }, [currentStep])

  // Convert ShorelineSegment to Feature<LineString> for the ValueAssignment component
  const segmentFeatures: Feature<LineString>[] = segments.map(segment => {
    if (segment.geometry.type === 'LineString') {
      return {
        type: 'Feature',
        geometry: segment.geometry,
        properties: {
          ...segment.properties,
          ...segment.parameters
        }
      }
    }
    // If it's a MultiLineString, take the first LineString
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: segment.geometry.coordinates[0]
      },
      properties: {
        ...segment.properties,
        ...segment.parameters
      }
    }
  })

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">
        {currentStep === 'parameters' ? 'Configure Parameters' : 'Define Parameter Values'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
          <span className="block sm:inline">{error}</span>
          <span 
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => setError('')}
          >
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {currentStep === 'parameters' ? (
            <ParameterPanel
              currentStep={currentStep}
              parameters={parameters}
              segments={segments}
              selectedParameter={selectedParameter}
              selectedSegments={selectedSegments}
              onParameterChange={handleParameterChange}
              onParameterSelect={handleParameterSelect}
              onSegmentValueChange={handleSegmentValueChange}
              totalShorelineLength={totalShorelineLength}
            />
          ) : (
            <ValueAssignment
              segments={segmentFeatures}
              parameters={parameters}
              onValueAssign={handleValueAssign}
            />
          )}
        </div>

        <div className="lg:col-span-2 bg-gray-50 rounded-lg overflow-hidden h-[700px]">
          {geoJSON ? (
            <Map
              geoJSON={geoJSON}
              segments={segments}
              parameters={parameters}
              selectedParameter={selectedParameter}
              selectedSegments={selectedSegments}
              selectionPolygons={selectionPolygons}
              onSegmentSelect={(segmentId) => {
                setSelectedSegments(prev => 
                  prev.includes(segmentId) 
                    ? prev.filter(id => id !== segmentId)
                    : [...prev, segmentId]
                )
              }}
              onSelectionCreate={handleSelectionCreate}
              onSelectionDelete={handleSelectionDelete}
              isEditing={currentStep === 'values'}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No shoreline data available
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handlePreviousStep}
          disabled={currentStep === 'parameters'}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back to Parameters
        </button>

        <button
          type="button"
          onClick={currentStep === 'values' ? () => navigate('/calculation') : handleNextStep}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {currentStep === 'values' ? 'Continue to Calculation' : 'Next'}
        </button>
      </div>
    </div>
  )
} 