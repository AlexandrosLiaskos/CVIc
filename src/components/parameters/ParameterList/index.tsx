import React, { useState, useMemo } from 'react'
import { Parameter, ParameterListProps } from '../types'
import { ParameterItem } from './ParameterItem'

// Predefined CVI parameters
const DEFAULT_PARAMETERS: Parameter[] = [
  {
    id: 'geomorphology',
    name: 'Geomorphology',
    description: 'Coastal landform type and characteristics',
    weight: 0,
    type: 'categorical'
  },
  {
    id: 'coastal_slope',
    name: 'Coastal Slope',
    description: 'Regional coastal slope percentage',
    weight: 0,
    type: 'numerical'
  },
  {
    id: 'relative_sea_level_change',
    name: 'Relative Sea-Level Change',
    description: 'Rate of sea-level rise or fall',
    weight: 0,
    type: 'numerical'
  },
  {
    id: 'shoreline_erosion',
    name: 'Shoreline Erosion/Accretion',
    description: 'Rate of shoreline position change',
    weight: 0,
    type: 'numerical'
  },
  {
    id: 'mean_tide_range',
    name: 'Mean Tide Range',
    description: 'Mean tidal range',
    weight: 0,
    type: 'numerical'
  },
  {
    id: 'mean_wave_height',
    name: 'Mean Wave Height',
    description: 'Mean significant wave height',
    weight: 0,
    type: 'numerical'
  }
]

export const ParameterList: React.FC<ParameterListProps> = ({
  parameters,
  onParameterChange,
  onWeightChange
}) => {
  const [selectedParameters, setSelectedParameters] = useState<Set<string>>(new Set())

  // Calculate total weight of selected parameters
  const totalWeight = useMemo(() => {
    return parameters
      .filter(p => selectedParameters.has(p.id))
      .reduce((sum, p) => sum + p.weight, 0)
  }, [parameters, selectedParameters])

  const handleParameterSelect = (parameterId: string, selected: boolean) => {
    const newSelected = new Set(selectedParameters)
    if (selected) {
      newSelected.add(parameterId)
    } else {
      newSelected.delete(parameterId)
    }
    setSelectedParameters(newSelected)

    // Update parameters list with selection state
    const updatedParameters = parameters.map(p => ({
      ...p,
      weight: newSelected.has(p.id) ? p.weight : 0
    }))
    onParameterChange(updatedParameters)
  }

  const handleWeightChange = (parameterId: string, weight: number) => {
    onWeightChange(parameterId, weight)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Vulnerability Parameters
        </h3>
        <div className="text-sm text-gray-500">
          Total Weight: <span className={totalWeight > 100 ? 'text-red-600' : 'text-gray-900'}>
            {totalWeight}%
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {DEFAULT_PARAMETERS.map(parameter => (
          <ParameterItem
            key={parameter.id}
            parameter={parameters.find(p => p.id === parameter.id) || parameter}
            onWeightChange={(weight) => handleWeightChange(parameter.id, weight)}
            totalWeight={totalWeight}
            isSelected={selectedParameters.has(parameter.id)}
            onSelect={(selected) => handleParameterSelect(parameter.id, selected)}
          />
        ))}
      </div>

      {totalWeight !== 100 && selectedParameters.size > 0 && (
        <div className={`
          mt-4 p-4 rounded-lg
          ${totalWeight > 100 ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'}
        `}>
          {totalWeight > 100 ? (
            <p>Total weight exceeds 100%. Please adjust the weights to proceed.</p>
          ) : (
            <p>Total weight must equal 100% to proceed. Current total: {totalWeight}%</p>
          )}
        </div>
      )}
    </div>
  )
} 