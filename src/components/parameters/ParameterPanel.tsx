import { useState, useCallback, useMemo } from 'react'
import type { Parameter, ShorelineSegment, WorkflowStep, Category } from '../../types'

interface ParameterPanelProps {
  currentStep: WorkflowStep
  parameters: Parameter[]
  segments: ShorelineSegment[]
  selectedParameter: string | null
  selectedSegments: string[]
  onParameterChange: (parameterId: string, field: keyof Parameter, value: any) => void
  onParameterSelect: (paramId: string | null) => void
  onSegmentValueChange: (segmentId: string, parameterId: string, value: number | string) => void
  totalShorelineLength: number
}

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

function calculateSegmentCoverage(segment: ShorelineSegment, totalLength: number): number {
  // Calculate segment length using turf.js length function
  const length = segment.properties?.length || 0
  return (length / totalLength) * 100
}

export default function ParameterPanel({
  currentStep,
  parameters,
  segments,
  selectedParameter,
  selectedSegments,
  onParameterChange,
  onParameterSelect,
  onSegmentValueChange,
  totalShorelineLength
}: ParameterPanelProps) {
  const [bulkValue, setBulkValue] = useState<string>('')

  const totalWeight = useMemo(() => {
    return parameters.reduce((sum, param) => sum + (param.weight ?? 0), 0)
  }, [parameters])

  const handleWeightChange = (paramId: string, weight: number) => {
    onParameterChange(paramId, 'weight', weight)
  }

  const handleEnableChange = (paramId: string, enabled: boolean) => {
    onParameterChange(paramId, 'enabled', enabled)
    if (!enabled && selectedParameter === paramId) {
      onParameterSelect(null)
    }
  }

  const handleParameterClick = (paramId: string) => {
    if (currentStep === 'values') {
      onParameterSelect(selectedParameter === paramId ? null : paramId)
    }
  }

  const getParameterSegments = useCallback((parameterId: string) => {
    return segments.filter(seg => seg.parameters[parameterId]?.value !== undefined)
  }, [segments])

  const handleBulkValueChange = (paramId: string, value: number) => {
    selectedSegments.forEach(segmentId => {
      onSegmentValueChange(segmentId, paramId, value)
    })
    setBulkValue('')
  }

  const getSegmentDisplayId = (segment: ShorelineSegment) => {
    return segment.properties.FID || segment.id.slice(0, 8)
  }

  const renderValueInput = (segment: ShorelineSegment, param: Parameter) => {
    const value = segment.parameters[param.id]?.value
    if (param.type === 'categorical') {
      return (
        <select
          value={value as string}
          onChange={(e) => onSegmentValueChange(segment.id, param.id, e.target.value)}
        >
          <option value="">Select a value</option>
          {param.categories?.map((cat: Category) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      )
    }
    return (
      <input
        type="number"
        value={value as number}
        onChange={(e) => onSegmentValueChange(segment.id, param.id, Number(e.target.value))}
      />
    )
  }

  return (
    <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
      <div className="p-4">
        {currentStep === 'parameters' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">Total Weight:</span>
              <span className={`font-bold ${Math.abs(totalWeight - 1) < 0.01 ? 'text-green-600' : 'text-red-600'}`}>
                {(totalWeight * 100).toFixed(0)}%
              </span>
            </div>

            <div className="space-y-4">
              {parameters.map((param) => (
                <div key={param.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`enable-${param.id}`}
                        checked={param.enabled}
                        onChange={(e) => handleEnableChange(param.id, e.target.checked)}
                        className="rounded text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor={`enable-${param.id}`} className="text-sm font-medium text-gray-700">
                        {param.name}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">
                      {((param.weight ?? 0) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={param.weight ?? 0}
                    onChange={(e) => handleWeightChange(param.id, parseFloat(e.target.value))}
                    disabled={!param.enabled}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">{param.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {parameters.filter(p => p.enabled).map((param) => (
                <div 
                  key={param.id} 
                  className={`p-3 rounded-lg cursor-pointer border ${
                    param.isComplete 
                      ? 'bg-green-50 border-green-200' 
                      : selectedParameter === param.id 
                        ? 'bg-primary-50 border-primary-200' 
                        : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleParameterClick(param.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${param.isComplete ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="text-sm font-medium text-gray-700">
                        {param.name}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{getParameterSegments(param.id).length}</span> segments
                    </div>
                  </div>

                  {selectedParameter === param.id && (
                    <div className="mt-4">
                      <div className="text-sm text-gray-600 mb-4">
                        Draw polygons on the map to select shoreline segments
                      </div>

                      {selectedSegments.length > 0 && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-md">
                          <div className="text-sm font-medium text-gray-700 mb-2">
                            Set value for {selectedSegments.length} selected segment{selectedSegments.length > 1 ? 's' : ''}
                          </div>
                          {param.type === 'categorical' ? (
                            <select
                              value={bulkValue}
                              onChange={(e) => {
                                const value = Number(e.target.value)
                                if (!isNaN(value)) {
                                  handleBulkValueChange(param.id, value)
                                }
                              }}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                            >
                              <option value="">Select a value</option>
                              {param.categories?.map((cat: Category) => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                              ))}
                            </select>
                          ) : (
                            <div className="flex space-x-2">
                              <input
                                type="number"
                                value={bulkValue}
                                onChange={(e) => setBulkValue(e.target.value)}
                                onBlur={() => {
                                  const value = parseFloat(bulkValue)
                                  if (!isNaN(value)) {
                                    handleBulkValueChange(param.id, value)
                                  }
                                }}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                                min={param.range?.min}
                                max={param.range?.max}
                                step={0.1}
                              />
                              {param.unit && (
                                <span className="text-sm text-gray-500 pt-2">{param.unit}</span>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Segment ID
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vulnerability
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Coverage
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {getParameterSegments(param.id).map((segment) => (
                              <tr key={segment.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {getSegmentDisplayId(segment)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {renderValueInput(segment, param)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {getVulnerabilityLabel(segment.parameters[param.id]!.vulnerability)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {calculateSegmentCoverage(segment, totalShorelineLength).toFixed(1)}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 