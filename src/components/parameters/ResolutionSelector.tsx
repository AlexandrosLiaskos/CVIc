import React from 'react'
import { ResolutionSelectorProps } from './types'

export const ResolutionSelector: React.FC<ResolutionSelectorProps> = ({
  onResolutionChange,
  defaultValue = { value: 1000, unit: 'meters' }
}) => {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onResolutionChange({
      value: event.target.value === '' ? '' : Number(event.target.value),
      unit: 'meters'
    })
  }

  return (
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800">
        Spatial Resolution
      </h3>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label htmlFor="resolution-value" className="block text-sm font-medium text-gray-700">
            Value
          </label>
          <input
            id="resolution-value"
            type="number"
            defaultValue={defaultValue.value}
            onChange={handleValueChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="resolution-unit" className="block text-sm font-medium text-gray-700">
            Unit
          </label>
          <select
            id="resolution-unit"
            value="meters"
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="meters">Meters</option>
          </select>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Select the spatial resolution for segmenting the shoreline. This will determine the length of each segment.
      </p>
    </div>
  )
} 