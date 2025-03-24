import React, { useState } from 'react'
import type { Parameter } from '../../../types'

interface CustomParameterFormProps {
  onParameterAdd: (parameter: Parameter) => void
  onCancel: () => void
}

export default function CustomParameterForm({ onParameterAdd, onCancel }: CustomParameterFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<'numerical' | 'categorical'>('numerical')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [options, setOptions] = useState<Array<{ value: number; label: string }>>([])
  const [newOptionValue, setNewOptionValue] = useState('')
  const [newOptionLabel, setNewOptionLabel] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Parameter name is required')
      return
    }

    if (!description.trim()) {
      setError('Parameter description is required')
      return
    }

    if (type === 'numerical') {
      if (!min || !max) {
        setError('Min and max values are required for numerical parameters')
        return
      }

      const minNum = parseFloat(min)
      const maxNum = parseFloat(max)

      if (isNaN(minNum) || isNaN(maxNum)) {
        setError('Min and max must be valid numbers')
        return
      }

      if (minNum >= maxNum) {
        setError('Min must be less than max')
        return
      }
    } else {
      if (options.length === 0) {
        setError('At least one option is required for categorical parameters')
        return
      }
    }

    const newParameter: Parameter = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      weight: 0,
      type,
      ...(type === 'numerical'
        ? { range: { min: parseFloat(min), max: parseFloat(max) } }
        : { options })
    }

    onParameterAdd(newParameter)
    handleReset()
  }

  const handleReset = () => {
    setName('')
    setDescription('')
    setType('numerical')
    setMin('')
    setMax('')
    setOptions([])
    setNewOptionValue('')
    setNewOptionLabel('')
    setError(null)
  }

  const handleAddOption = () => {
    if (!newOptionValue || !newOptionLabel) {
      setError('Both value and label are required for options')
      return
    }

    const value = parseFloat(newOptionValue)
    if (isNaN(value)) {
      setError('Option value must be a number')
      return
    }

    setOptions(prev => [...prev, { value, label: newOptionLabel }])
    setNewOptionValue('')
    setNewOptionLabel('')
  }

  const handleRemoveOption = (index: number) => {
    setOptions(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as 'numerical' | 'categorical')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="numerical">Numerical</option>
          <option value="categorical">Categorical</option>
        </select>
      </div>

      {type === 'numerical' ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="min" className="block text-sm font-medium text-gray-700">
              Minimum Value
            </label>
            <input
              type="number"
              id="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="max" className="block text-sm font-medium text-gray-700">
              Maximum Value
            </label>
            <input
              type="number"
              id="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="optionValue" className="block text-sm font-medium text-gray-700">
                Value
              </label>
              <input
                type="number"
                id="optionValue"
                value={newOptionValue}
                onChange={(e) => setNewOptionValue(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="optionLabel" className="block text-sm font-medium text-gray-700">
                Label
              </label>
              <input
                type="text"
                id="optionLabel"
                value={newOptionLabel}
                onChange={(e) => setNewOptionLabel(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddOption}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Option
          </button>

          {options.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Options</h3>
              <ul className="space-y-2">
                {options.map((option, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                  >
                    <span className="text-sm">
                      {option.label} ({option.value})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Parameter
        </button>
      </div>
    </form>
  )
} 