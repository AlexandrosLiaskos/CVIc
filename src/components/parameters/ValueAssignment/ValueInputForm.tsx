import React, { useState } from 'react'
import { ValueInputFormProps } from './types'

export const ValueInputForm: React.FC<ValueInputFormProps> = ({
  parameters,
  selectedSegments,
  segmentValues,
  onValueChange,
  onApplyToAll
}) => {
  const [values, setValues] = useState<Record<string, number>>(() => {
    // Initialize with the first selected segment's values or empty
    if (selectedSegments.size > 0) {
      const firstSegmentId = Array.from(selectedSegments)[0]
      return segmentValues[firstSegmentId] || {}
    }
    return {}
  })

  const handleValueChange = (parameterId: string, value: number) => {
    if (!isNaN(value) && value >= 1 && value <= 5) {
      const newValues = { ...values, [parameterId]: value }
      setValues(newValues)
      onValueChange(parameterId, value)
    }
  }

  const handleApplyToAll = () => {
    onApplyToAll(values)
  }

  if (selectedSegments.size === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500">
          Select segments on the map to assign values
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Assign Values
        </h3>
        <span className="text-sm text-gray-500">
          {selectedSegments.size} segments selected
        </span>
      </div>

      <div className="space-y-4">
        {parameters.map(param => (
          <div key={param.id} className="flex items-center space-x-4">
            <label
              htmlFor={`param-${param.id}`}
              className="flex-1 text-sm font-medium text-gray-700"
            >
              {param.name}
            </label>
            <input
              id={`param-${param.id}`}
              type="number"
              min="1"
              max="5"
              value={values[param.id] || ''}
              onChange={(e) => handleValueChange(param.id, Number(e.target.value))}
              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleApplyToAll}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Apply to Selected Segments
        </button>
      </div>

      <div className="text-sm text-gray-500">
        <p>Values should be between 1 (low vulnerability) and 5 (high vulnerability)</p>
      </div>
    </div>
  )
} 