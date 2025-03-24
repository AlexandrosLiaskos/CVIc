import React, { useState } from 'react'
import { Parameter } from '../types'
import { v4 as uuidv4 } from 'uuid'

interface CustomParameterFormProps {
  onParameterAdd: (parameter: Parameter) => void
}

export const CustomParameterForm: React.FC<CustomParameterFormProps> = ({
  onParameterAdd
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
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

    const newParameter: Parameter = {
      id: `custom-${uuidv4()}`,
      name: name.trim(),
      description: description.trim(),
      weight: 0,
      isCustom: true
    }

    onParameterAdd(newParameter)
    handleReset()
  }

  const handleReset = () => {
    setName('')
    setDescription('')
    setError(null)
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-200"
      >
        + Add Custom Parameter
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-4 space-y-4">
      <div>
        <label htmlFor="parameter-name" className="block text-sm font-medium text-gray-700">
          Parameter Name
        </label>
        <input
          type="text"
          id="parameter-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter parameter name"
        />
      </div>

      <div>
        <label htmlFor="parameter-description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="parameter-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Describe the parameter and its measurement"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Parameter
        </button>
      </div>
    </form>
  )
} 