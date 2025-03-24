import React from 'react'
import { Parameter } from '../types'

interface ParameterItemProps {
  parameter: Parameter
  onWeightChange: (weight: number) => void
  totalWeight: number
  isSelected: boolean
  onSelect: (selected: boolean) => void
}

export const ParameterItem: React.FC<ParameterItemProps> = ({
  parameter,
  onWeightChange,
  totalWeight,
  isSelected,
  onSelect
}) => {
  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = Number(event.target.value)
    if (!isNaN(newWeight) && newWeight >= 0 && newWeight <= 100) {
      onWeightChange(newWeight)
    }
  }

  const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(event.target.checked)
  }

  return (
    <div className={`
      p-4 rounded-lg border 
      ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}
      transition-colors duration-200
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelectionChange}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <div>
            <h4 className="text-sm font-medium text-gray-900">{parameter.name}</h4>
            <p className="text-sm text-gray-500">{parameter.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="0"
            max="100"
            value={parameter.weight}
            onChange={handleWeightChange}
            disabled={!isSelected}
            className={`
              w-20 rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 
              disabled:bg-gray-100 disabled:text-gray-500
              text-sm
            `}
          />
          <span className="text-sm text-gray-500">%</span>
        </div>
      </div>
      {isSelected && totalWeight > 100 && (
        <p className="mt-2 text-sm text-red-600">
          Total weight exceeds 100%. Please adjust the weights.
        </p>
      )}
    </div>
  )
} 