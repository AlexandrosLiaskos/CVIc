import { useState, useMemo, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Parameter } from '../../types'

const DEFAULT_PARAMETERS: Parameter[] = [
  {
    id: 'geomorphology',
    name: 'Geomorphology',
    description: 'Coastal landform type and characteristics',
    type: 'categorical',
    weight: 0.2,
    enabled: true,
    options: [
      { type: 'categorical', value: 'rocky_cliffs', label: 'Rocky Cliffs', color: '#1a9850', vulnerability: 1 },
      { type: 'categorical', value: 'medium_cliffs', label: 'Medium Cliffs', color: '#91cf60', vulnerability: 2 },
      { type: 'categorical', value: 'low_cliffs', label: 'Low Cliffs', color: '#d9ef8b', vulnerability: 3 },
      { type: 'categorical', value: 'beaches', label: 'Beaches', color: '#fee08b', vulnerability: 4 },
      { type: 'categorical', value: 'wetlands', label: 'Wetlands', color: '#fc8d59', vulnerability: 5 }
    ]
  },
  {
    id: 'coastal_slope',
    name: 'Coastal Slope',
    description: 'Average slope of the coastal zone',
    type: 'numerical',
    weight: 0.2,
    enabled: true,
    unit: 'degrees',
    vulnerabilityRanges: [
      { value: 1, min: 0.2, max: null, label: 'Very Low', color: '#1a9850' },
      { value: 2, min: 0.07, max: 0.2, label: 'Low', color: '#91cf60' },
      { value: 3, min: 0.04, max: 0.07, label: 'Moderate', color: '#d9ef8b' },
      { value: 4, min: 0.025, max: 0.04, label: 'High', color: '#fee08b' },
      { value: 5, min: 0, max: 0.025, label: 'Very High', color: '#fc8d59' }
    ]
  },
  {
    id: 'elevation',
    name: 'Elevation',
    description: 'Beach elevation above sea level',
    weight: 0.15,
    type: 'numerical',
    range: { min: 0, max: 100 },
    unit: 'meters',
    enabled: true
  },
  {
    id: 'geology',
    name: 'Geology',
    description: 'Coastal geology type',
    weight: 0.15,
    type: 'categorical',
    enabled: true,
    options: [
      { type: 'categorical', value: 'rock', label: 'Rock', color: '#1a9850', vulnerability: 1 },
      { type: 'categorical', value: 'sand', label: 'Sand', color: '#91cf60', vulnerability: 2 },
      { type: 'categorical', value: 'mud', label: 'Mud', color: '#d9ef8b', vulnerability: 3 },
      { type: 'categorical', value: 'mixed', label: 'Mixed', color: '#fee08b', vulnerability: 4 }
    ]
  },
  {
    id: 'waveHeight',
    name: 'Wave Height',
    description: 'Average wave height',
    weight: 0.15,
    type: 'numerical',
    range: { min: 0, max: 20 },
    unit: 'meters',
    enabled: true
  },
  {
    id: 'tidalRange',
    name: 'Tidal Range',
    description: 'Average tidal range',
    weight: 0.15,
    type: 'numerical',
    range: { min: 0, max: 15 },
    unit: 'meters',
    enabled: true
  }
]

interface ParameterSelectionStepProps {
  parameters: Parameter[]
  onParametersUpdate: (parameters: Parameter[]) => void
  onError: (error: string | null) => void
  onComplete?: () => void
  onBack?: () => void
}

export default function ParameterSelectionStep({
  parameters,
  onParametersUpdate,
  onError,
  onComplete,
  onBack
}: ParameterSelectionStepProps) {
  const [selectedParameters, setSelectedParameters] = useState<Parameter[]>(
    parameters.length > 0 ? parameters : DEFAULT_PARAMETERS
  )
  const [customParameter, setCustomParameter] = useState<Partial<Parameter>>({
    type: 'numerical',
    weight: 0
  })
  const [showCustomForm, setShowCustomForm] = useState(false)

  // Calculate total weight
  const totalWeight = useMemo(() => {
    return selectedParameters
      .filter(p => p.enabled)
      .reduce((sum, p) => sum + (p.weight || 0), 0)
  }, [selectedParameters])

  // Update parent component when parameters change
  useEffect(() => {
    onParametersUpdate(selectedParameters)
  }, [selectedParameters, onParametersUpdate])

  const handleParameterToggle = (parameterId: string) => {
    setSelectedParameters(prev => 
      prev.map(p => p.id === parameterId ? { ...p, enabled: !p.enabled } : p)
    )
  }

  const handleWeightChange = (parameterId: string, weight: number) => {
    setSelectedParameters(prev => 
      prev.map(p => p.id === parameterId ? { ...p, weight } : p)
    )
  }

  const handleCustomParameterChange = (field: keyof Parameter, value: any) => {
    setCustomParameter(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddCustomParameter = () => {
    if (!customParameter.name || !customParameter.description) {
      onError('Name and description are required for custom parameters')
      return
    }

    const newParameter: Parameter = {
      id: uuidv4(),
      name: customParameter.name,
      description: customParameter.description,
      type: customParameter.type || 'numerical',
      weight: customParameter.weight || 0,
      unit: customParameter.unit,
      enabled: true,
      vulnerabilityRanges: customParameter.type === 'numerical' ? [] : undefined,
      options: customParameter.type === 'categorical' ? [] : undefined
    }

    setSelectedParameters(prev => [...prev, newParameter])
    setCustomParameter({ type: 'numerical', weight: 0 })
    setShowCustomForm(false)
  }

  const distributeRemainingWeight = () => {
    const enabledParams = selectedParameters.filter(p => p.enabled)
    if (enabledParams.length === 0) return

    const equalWeight = 1 / enabledParams.length
    
    setSelectedParameters(prev => 
      prev.map(p => p.enabled ? { ...p, weight: equalWeight } : p)
    )
  }

  return (
    <div className="space-y-8">
      {/* Parameter list section */}
      <div className="space-y-6">
        {/* Parameters list */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">Parameter Selection</h3>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${Math.abs(totalWeight - 1) < 0.01 ? 'text-green-600' : 'text-red-600'}`}>
                Total Weight: {(totalWeight * 100).toFixed(0)}%
              </span>
              <button
                type="button"
                onClick={distributeRemainingWeight}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Distribute Evenly
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {selectedParameters.map(parameter => (
              <div key={parameter.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center h-5">
                    <input
                      id={`enable-${parameter.id}`}
                      type="checkbox"
                      checked={parameter.enabled}
                      onChange={() => handleParameterToggle(parameter.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor={`enable-${parameter.id}`} className="ml-2 text-sm font-medium text-gray-700">
                      {parameter.name}
                    </label>
                  </div>
                  <div className="text-sm text-gray-500">
                    {parameter.enabled ? (
                      <span>{((parameter.weight ?? 0) * 100).toFixed(0)}%</span>
                    ) : (
                      <span className="text-gray-400">Disabled</span>
                    )}
                  </div>
                </div>
                
                <p className="mt-1 text-sm text-gray-500">{parameter.description}</p>
                
                {parameter.enabled && (
                  <div className="mt-3">
                    <label htmlFor={`weight-${parameter.id}`} className="text-xs text-gray-500">
                      Weight (0-100%)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        id={`weight-${parameter.id}`}
                        min="0"
                        max="1"
                        step="0.05"
                        value={parameter.weight ?? 0}
                        onChange={(e) => handleWeightChange(parameter.id, parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={(parameter.weight ?? 0) * 100}
                        onChange={(e) => handleWeightChange(parameter.id, parseInt(e.target.value) / 100)}
                        className="w-16 text-sm border-gray-300 rounded-md"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              {showCustomForm ? 'Cancel' : '+ Add Custom Parameter'}
            </button>
          </div>
        </div>

        {/* Custom parameter form */}
        <div className="lg:col-span-1">
          {showCustomForm && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Custom Parameter</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={customParameter.name || ''}
                    onChange={e => handleCustomParameterChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={customParameter.description || ''}
                    onChange={e => handleCustomParameterChange('description', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    id="type"
                    value={customParameter.type}
                    onChange={e => handleCustomParameterChange('type', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="numerical">Numerical</option>
                    <option value="categorical">Categorical</option>
                  </select>
                </div>
                {customParameter.type === 'numerical' && (
                  <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                      Unit (optional)
                    </label>
                    <input
                      type="text"
                      id="unit"
                      value={customParameter.unit || ''}
                      onChange={e => handleCustomParameterChange('unit', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                    Weight (%)
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="number"
                      id="weight"
                      min="0"
                      max="100"
                      value={(customParameter.weight ?? 0) * 100}
                      onChange={e => handleCustomParameterChange('weight', parseInt(e.target.value) / 100)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <span className="ml-2 text-sm text-gray-500">%</span>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleAddCustomParameter}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Add Parameter
                  </button>
                </div>
              </div>
            </div>
          )}

          {!showCustomForm && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Parameter Weights</h3>
              <p className="text-sm text-gray-600 mb-4">
                The sum of all parameter weights must equal 100%. These weights determine how much each parameter contributes to the final vulnerability index.
              </p>
              
              <div className="bg-white p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Total Weight:</span>
                  <span className={`text-sm font-bold ${Math.abs(totalWeight - 1) < 0.01 ? 'text-green-600' : 'text-red-600'}`}>
                    {(totalWeight * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${Math.abs(totalWeight - 1) < 0.01 ? 'bg-green-600' : 'bg-red-600'}`} 
                    style={{ width: `${Math.min(totalWeight * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              {Math.abs(totalWeight - 1) > 0.01 && (
                <div className="text-sm text-red-600 mb-4">
                  {totalWeight > 1 ? 
                    `Total weight exceeds 100% by ${((totalWeight - 1) * 100).toFixed(0)}%. Please reduce some weights.` : 
                    `Total weight is ${(totalWeight * 100).toFixed(0)}%. Please increase weights to reach 100%.`}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Segment Table
        </button>
        
        <button
          type="button"
          onClick={() => {
            // Validate weights before continuing
            const enabledParameters = selectedParameters.filter(p => p.enabled);
            const totalWeight = enabledParameters.reduce((sum, p) => sum + (p.weight || 0), 0);
            
            if (Math.abs(totalWeight - 1) > 0.01) {
              onError(`Parameter weights must sum to 100%. Current total: ${(totalWeight * 100).toFixed(0)}%`);
              return;
            }
            
            onParametersUpdate(selectedParameters);
            if (onComplete) onComplete();
          }}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Continue to Value Assignment
        </button>
      </div>
    </div>
  )
}