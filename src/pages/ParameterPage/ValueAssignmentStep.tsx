import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import Map from 'react-map-gl'
import type { FeatureCollection, LineString, MultiLineString, GeoJsonProperties } from 'geojson'
import type { Parameter } from '../../types'
import { ShorelineSegment } from '../../types'

interface ValueAssignmentStepProps {
  shoreline: FeatureCollection<LineString | MultiLineString, GeoJsonProperties>
  segments: ShorelineSegment[]
  parameters: Parameter[]
  onComplete: (segments: ShorelineSegment[]) => void
  onError: (error: string | null) => void
  onBack?: () => void
}

export default function ValueAssignmentStep({
  shoreline,
  segments,
  parameters,
  onComplete,
  onError,
  onBack
}: ValueAssignmentStepProps) {
  const [selectedSegments, setSelectedSegments] = useState<string[]>([])
  const [activeParameter, setActiveParameter] = useState<string | null>(null)
  const [value, setValue] = useState<number | null>(null)
  const [segmentValues, setSegmentValues] = useState<Record<string, Record<string, number>>>({})
  const [mapViewState, setMapViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10
  })

  // Filter enabled parameters
  const enabledParameters = useMemo(() => {
    return parameters.filter(p => p.enabled)
  }, [parameters])

  // Initialize map view based on shoreline
  useEffect(() => {
    if (shoreline.features.length > 0) {
      // Calculate center of shoreline
      let sumLat = 0
      let sumLng = 0
      let count = 0

      shoreline.features.forEach(feature => {
        if (feature.geometry.type === 'LineString') {
          feature.geometry.coordinates.forEach(coord => {
            sumLng += coord[0]
            sumLat += coord[1]
            count++
          })
        } else if (feature.geometry.type === 'MultiLineString') {
          feature.geometry.coordinates.forEach(line => {
            line.forEach(coord => {
              sumLng += coord[0]
              sumLat += coord[1]
              count++
            })
          })
        }
      })

      if (count > 0) {
        setMapViewState({
          latitude: sumLat / count,
          longitude: sumLng / count,
          zoom: 10
        })
      }
    }
  }, [shoreline])

  // Initialize segmentValues from existing segments if they have values
  useEffect(() => {
    const initialValues: Record<string, Record<string, number>> = {}
    
    segments.forEach(segment => {
      if (segment.properties && segment.properties.values) {
        initialValues[segment.id] = segment.properties.values
      } else {
        initialValues[segment.id] = {}
      }
    })
    
    setSegmentValues(initialValues)
  }, [segments])

  const handleSegmentClick = (segmentId: string) => {
    // Toggle selection of segment
    setSelectedSegments(prev => {
      if (prev.includes(segmentId)) {
        return prev.filter(id => id !== segmentId)
      } else {
        return [...prev, segmentId]
      }
    })
  }

  const handleSelectAll = () => {
    setSelectedSegments(segments.map(s => s.id))
  }

  const handleClearSelection = () => {
    setSelectedSegments([])
  }

  const handleParameterChange = (parameterId: string) => {
    setActiveParameter(parameterId)
    setValue(null)
  }

  const handleValueChange = (newValue: number) => {
    setValue(newValue)
  }

  const handleApplyValue = () => {
    if (activeParameter === null || value === null) {
      onError('Please select a parameter and value')
      return
    }

    // Apply value to all selected segments
    setSegmentValues(prev => {
      const updated = { ...prev }
      selectedSegments.forEach(segmentId => {
        if (!updated[segmentId]) {
          updated[segmentId] = {}
        }
        updated[segmentId][activeParameter] = value
      })
      return updated
    })

    // Clear selection after applying
    setSelectedSegments([])
    setValue(null)
  }

  const handleSave = () => {
    // Check if all segments have values for all enabled parameters
    const missingValues: string[] = []
    
    segments.forEach(segment => {
      enabledParameters.forEach(param => {
        if (!segmentValues[segment.id] || segmentValues[segment.id][param.id] === undefined) {
          missingValues.push(`Segment ${segment.id.slice(0, 8)} is missing value for ${param.name}`)
        }
      })
    })

    if (missingValues.length > 0) {
      onError(`Missing values: ${missingValues.slice(0, 3).join(', ')}${missingValues.length > 3 ? ` and ${missingValues.length - 3} more` : ''}`)
      return
    }

    // Update segments with values
    const updatedSegments = segments.map(segment => ({
      ...segment,
      properties: {
        ...segment.properties,
        values: segmentValues[segment.id] || {}
      }
    }))

    onComplete(updatedSegments)
  }

  const getSegmentColor = (segmentId: string) => {
    if (selectedSegments.includes(segmentId)) {
      return '#4299e1' // Blue for selected
    }
    
    // Check if segment has all values
    const hasAllValues = enabledParameters.every(param => 
      segmentValues[segmentId] && segmentValues[segmentId][param.id] !== undefined
    )
    
    if (hasAllValues) {
      return '#48bb78' // Green for complete
    }
    
    return '#e53e3e' // Red for incomplete
  }

  const getParameterValueOptions = (parameter: Parameter) => {
    if (parameter.type === 'categorical' && parameter.options) {
      return parameter.options.map(option => ({
        value: option.vulnerability,
        label: option.label,
        color: option.color
      }))
    } else if (parameter.type === 'numerical' && parameter.vulnerabilityRanges) {
      return parameter.vulnerabilityRanges.map(range => ({
        value: range.value,
        label: range.label,
        color: range.color
      }))
    }
    
    // Default vulnerability scale
    return [
      { value: 1, label: 'Very Low', color: '#1a9850' },
      { value: 2, label: 'Low', color: '#91cf60' },
      { value: 3, label: 'Moderate', color: '#d9ef8b' },
      { value: 4, label: 'High', color: '#fee08b' },
      { value: 5, label: 'Very High', color: '#fc8d59' }
    ]
  }

  const getCompletionStatus = () => {
    let total = segments.length * enabledParameters.length
    let completed = 0
    
    segments.forEach(segment => {
      enabledParameters.forEach(param => {
        if (segmentValues[segment.id] && segmentValues[segment.id][param.id] !== undefined) {
          completed++
        }
      })
    })
    
    return {
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      completed,
      total
    }
  }

  const completionStatus = getCompletionStatus()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Map and segment display */}
      <div className="lg:col-span-2">
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Shoreline Segments</h3>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleClearSelection}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear Selection
              </button>
            </div>
          </div>
          
          <div className="h-96 rounded-lg overflow-hidden">
            <Map
              {...mapViewState}
              onMove={evt => setMapViewState(evt.viewState)}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >
              {/* Map layers would go here */}
              {/* This is a placeholder for the actual map implementation */}
            </Map>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Completion Status:</span>
              <span className="text-sm font-medium text-gray-700">
                {completionStatus.completed} / {completionStatus.total} ({completionStatus.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full bg-blue-600" 
                style={{ width: `${completionStatus.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Segment List</h3>
          
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Segment ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {segments.slice(0, 50).map(segment => {
                  const isComplete = enabledParameters.every(param => 
                    segmentValues[segment.id] && segmentValues[segment.id][param.id] !== undefined
                  )
                  
                  return (
                    <tr 
                      key={segment.id}
                      className={selectedSegments.includes(segment.id) ? 'bg-blue-50' : ''}
                    >
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        {segment.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {isComplete ? 'Complete' : 'Incomplete'}
                        </span>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        <button
                          type="button"
                          onClick={() => handleSegmentClick(segment.id)}
                          className={`text-sm ${
                            selectedSegments.includes(segment.id) 
                              ? 'text-blue-600 hover:text-blue-800' 
                              : 'text-gray-600 hover:text-gray-800'
                          }`}
                        >
                          {selectedSegments.includes(segment.id) ? 'Deselect' : 'Select'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {segments.length > 50 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-2 text-sm text-gray-500 text-center">
                      Showing 50 of {segments.length} segments. Use the map for better navigation.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Parameter value assignment */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Assign Values</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selected Segments
              </label>
              <div className="p-2 bg-gray-50 rounded-md">
                {selectedSegments.length === 0 ? (
                  <p className="text-sm text-gray-500">No segments selected</p>
                ) : (
                  <p className="text-sm text-gray-700">
                    {selectedSegments.length} segment{selectedSegments.length !== 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="parameter" className="block text-sm font-medium text-gray-700 mb-1">
                Parameter
              </label>
              <select
                id="parameter"
                value={activeParameter || ''}
                onChange={(e) => handleParameterChange(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                disabled={selectedSegments.length === 0}
              >
                <option value="">Select Parameter</option>
                {enabledParameters.map(param => (
                  <option key={param.id} value={param.id}>
                    {param.name}
                  </option>
                ))}
              </select>
            </div>
            
            {activeParameter && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vulnerability Value
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {getParameterValueOptions(enabledParameters.find(p => p.id === activeParameter)!).map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleValueChange(option.value)}
                      className={`p-2 rounded-md text-center ${
                        value === option.value 
                          ? 'ring-2 ring-offset-2 ring-blue-500' 
                          : 'border border-gray-300'
                      }`}
                      style={{ backgroundColor: option.color }}
                      disabled={selectedSegments.length === 0}
                    >
                      <span className="text-xs font-medium text-white shadow-sm">
                        {option.value}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-1 text-xs text-gray-500 flex justify-between">
                  <span>Very Low</span>
                  <span>Very High</span>
                </div>
              </div>
            )}
            
            <div className="pt-4">
              <button
                type="button"
                onClick={handleApplyValue}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                disabled={selectedSegments.length === 0 || activeParameter === null || value === null}
              >
                Apply Value to Selected Segments
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">
                Total Segments: <span className="font-medium">{segments.length}</span>
              </p>
              <p className="text-sm text-gray-600">
                Parameters: <span className="font-medium">{enabledParameters.length}</span>
              </p>
            </div>
            
            <div className="pt-4">
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back to Parameters
                </button>
                
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Save and Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}