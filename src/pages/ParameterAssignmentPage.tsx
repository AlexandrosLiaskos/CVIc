import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { indexedDBService } from '../services/indexedDBService'
import Map from '../components/maps/Map'
import type { Parameter, ShorelineSegment, ParameterValue, SelectionPolygon, ShorelineSegmentProperties } from '../types'
import type { FeatureCollection, LineString, MultiLineString } from 'geojson'

interface SelectedSegment {
  id: string
  values: Record<string, ParameterValue>
}

export default function ParameterAssignmentPage() {
  const navigate = useNavigate()
  const [segments, setSegments] = useState<ShorelineSegment[]>([])
  const [parameters, setParameters] = useState<Parameter[]>([])
  const [selectedSegments, setSelectedSegments] = useState<string[]>([])
  const [activeParameter, setActiveParameter] = useState<string | null>(null)
  const [parameterValue, setParameterValue] = useState<number | string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectionPolygons, setSelectionPolygons] = useState<SelectionPolygon[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(false)

  // Load segments and parameters from IndexedDB
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load segments
        const segmentData = await indexedDBService.getShorelineData('current-segments')
        if (!segmentData) {
          setError('No segments found. Please complete the segmentation step first.')
          navigate('/segment-table')
          return
        }

        // Load parameters
        const parameterData = await indexedDBService.getShorelineData('current-parameters')
        if (!parameterData || !parameterData.features) {
          setError('No parameters found. Please complete the parameter selection step first.')
          navigate('/parameter-selection')
          return
        }

        // Convert FeatureCollection to segments array with type checking
        const loadedSegments = segmentData.features
          .filter(feature => 
            feature.geometry.type === 'LineString' || 
            feature.geometry.type === 'MultiLineString'
          )
          .map((feature, index) => {
            const segmentId = `segment-${index + 1}`
            return {
              id: segmentId,
              type: 'Feature' as const,
              geometry: feature.geometry as LineString | MultiLineString,
              properties: {
                id: segmentId,
                length: feature.properties?.length || 0,
                values: feature.properties?.values || {},
                parameters: feature.properties?.parameters || {},
                FID: feature.properties?.FID,
                index: index + 1, // Ensure index is 1-based and overrides any existing index
                lineIndex: feature.properties?.lineIndex,
                vulnerabilityIndex: feature.properties?.vulnerabilityIndex
              } as ShorelineSegmentProperties
            }
          })

        if (loadedSegments.length === 0) {
          throw new Error('No valid line segments found in the data')
        }

        // Convert FeatureCollection to parameters array
        const loadedParameters = parameterData.features
          .map(feature => feature.properties as Parameter)
          .filter((p): p is Parameter => p !== null && p.enabled)

        setSegments(loadedSegments as ShorelineSegment[])
        setParameters(loadedParameters)
      } catch (err) {
        console.error('Error loading data:', err)
        setError('Failed to load data. Please try again.')
      }
    }

    loadData()
  }, [navigate])

  const handleSegmentSelect = (segmentId: string) => {
    setSelectedSegments(prev => {
      if (prev.includes(segmentId)) {
        return prev.filter(id => id !== segmentId)
      }
      return [...prev, segmentId]
    })
  }

  const handleSelectAll = () => {
    setSelectedSegments(segments.map(s => s.id))
  }

  const handleClearSelection = () => {
    setSelectedSegments([])
  }

  const handleParameterSelect = (parameterId: string) => {
    setActiveParameter(parameterId)
    setParameterValue(null)
  }

  const handleValueChange = (value: number | string) => {
    setParameterValue(value)
  }

  const handleApplyValue = async () => {
    if (!activeParameter || parameterValue === null || selectedSegments.length === 0) return

    try {
      const updatedSegments = segments.map(segment => {
        if (selectedSegments.includes(segment.id)) {
          return {
            ...segment,
            properties: {
              ...segment.properties,
              values: {
                ...segment.properties.values,
                [activeParameter]: parameterValue
              }
            }
          }
        }
        return segment
      }) as ShorelineSegment[]

      // Store updated segments in IndexedDB
      await indexedDBService.storeShorelineData('current-segments', {
        type: 'FeatureCollection',
        features: updatedSegments
      })

      setSegments(updatedSegments)
      setSelectedSegments([])
      setParameterValue(null)
    } catch (err) {
      console.error('Error updating segments:', err)
      setError('Failed to update segments. Please try again.')
    }
  }

  const handleContinue = async () => {
    // Check if all segments have values for all parameters
    const missingValues = segments.some(segment => 
      parameters.some(parameter => 
        !segment.properties.values || segment.properties.values[parameter.id] === undefined
      )
    )

    if (missingValues) {
      setError('Please assign values for all parameters to all segments before continuing.')
      return
    }

    try {
      // Store final segments in IndexedDB
      await indexedDBService.storeShorelineData('current-segments', {
        type: 'FeatureCollection',
        features: segments
      })

      navigate('/calculation')
    } catch (err) {
      console.error('Error saving final data:', err)
      setError('Failed to save data. Please try again.')
    }
  }

  const handleSelectionCreate = (geometry: any) => {
    const newPolygon: SelectionPolygon = {
      id: `polygon-${Date.now()}`,
      geometry: {
        type: 'Polygon',
        coordinates: geometry.coordinates
      }
    }
    setSelectionPolygons(prev => [...prev, newPolygon])
  }

  const handleSelectionDelete = (polygonId: string) => {
    setSelectionPolygons(prev => prev.filter(p => p.id !== polygonId))
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Parameter Assignment</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Map and Table Section */}
        <div className="col-span-2 space-y-6">
          {/* Map */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-[400px]">
            <Map 
              segments={segments}
              parameters={parameters}
              selectedSegments={selectedSegments}
              selectedParameter={activeParameter}
              selectionPolygons={selectionPolygons}
              onSegmentSelect={handleSegmentSelect}
              onSelectionCreate={handleSelectionCreate}
              onSelectionDelete={handleSelectionDelete}
              isEditing={false}
              geoJSON={{
                type: 'FeatureCollection' as const,
                features: segments.map(segment => ({
                  type: 'Feature' as const,
                  geometry: segment.geometry,
                  properties: {
                    ...segment.properties,
                    isSelected: selectedSegments.includes(segment.id)
                  }
                }))
              }}
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Segment ID
                    </th>
                    {parameters.map(param => (
                      <th key={param.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {param.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedSegments.length === 0 ? (
                    <tr>
                      <td colSpan={parameters.length + 1} className="px-6 py-4 text-center text-sm text-gray-500">
                        No segments selected. Select segments on the map to view their values.
                      </td>
                    </tr>
                  ) : (
                    segments
                      .filter(segment => selectedSegments.includes(segment.id))
                      .map(segment => (
                        <tr key={segment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {segment.id}
                          </td>
                          {parameters.map(param => {
                            const value = segment.properties.values?.[param.id]
                            let displayValue = '-'
                            let colorClass = ''

                            if (value !== undefined) {
                              if (param.type === 'categorical') {
                                const option = param.options?.find(o => o.value === value)
                                displayValue = option?.label || String(value)
                                colorClass = option?.color || ''
                              } else {
                                displayValue = typeof value === 'number' ? value.toFixed(2) : String(value)
                                const range = param.vulnerabilityRanges?.find(r => 
                                  (r.min === null || value >= r.min) && 
                                  (r.max === null || value <= r.max)
                                )
                                colorClass = range?.color || ''
                              }
                            }

                            return (
                              <td 
                                key={param.id} 
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                style={colorClass ? { backgroundColor: `${colorClass}33` } : undefined}
                              >
                                {displayValue}
                              </td>
                            )
                          })}
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Selection Controls */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Selection Tools</h3>
            <div className="space-y-4">
              <button
                onClick={() => setIsEditing(prev => !prev)}
                className={`w-full px-4 py-2 text-sm font-medium ${
                  isEditing 
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                } rounded-md`}
              >
                {isEditing ? 'Finish Drawing' : 'Start Drawing'}
              </button>
              <button
                onClick={handleSelectAll}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Select All Segments
              </button>
              <button
                onClick={handleClearSelection}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear Selection
              </button>
            </div>
          </div>

          {/* Parameter Assignment */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Parameter Assignment</h3>
            <div className="space-y-4">
              {/* Parameter selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Parameter
                </label>
                <select
                  value={activeParameter || ''}
                  onChange={(e) => handleParameterSelect(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a parameter...</option>
                  {parameters.map(param => (
                    <option key={param.id} value={param.id}>{param.name}</option>
                  ))}
                </select>
              </div>

              {/* Value input */}
              {activeParameter && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    value={parameterValue || ''}
                    onChange={(e) => handleValueChange(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter value..."
                  />
                </div>
              )}

              <button
                onClick={handleApplyValue}
                disabled={!activeParameter || parameterValue === null || selectedSegments.length === 0}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Apply Value to Selected Segments
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
        <button
          onClick={() => navigate('/parameter-selection')}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Parameter Selection
        </button>
        <button
          onClick={handleContinue}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continue to Calculation
        </button>
      </div>
    </div>
  )
} 