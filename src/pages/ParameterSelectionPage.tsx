import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Parameter } from '../types'
import type { FeatureCollection } from 'geojson'
import { indexedDBService } from '../services/indexedDBService'
import {
  STANDARDIZED_COASTAL_INDICES,
  getStandardizedIndexById,
  validateIndexParameters
} from '../config/indices'
import {
  getParameterCategory,
  getParameterCategoryCounts
} from '../utils/parameterUtils'

export default function ParameterSelectionPage() {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState<string>('')
  const [selectedFormula, setSelectedFormula] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  // Get the currently selected index
  const currentIndex = selectedIndex ? getStandardizedIndexById(selectedIndex) : null

  // Parameters are automatically set when index is selected
  const selectedParameters = currentIndex ? currentIndex.requiredParameters : []

  // Handle index change and reset formula selection
  const handleIndexChange = (indexId: string) => {
    setSelectedIndex(indexId)
    setSelectedFormula('') // Reset formula when index changes
    const newIndex = getStandardizedIndexById(indexId)
    if (newIndex?.availableFormulas && newIndex.availableFormulas.length > 0) {
      // Set default formula for indices with multiple options
      setSelectedFormula(newIndex.availableFormulas[0].id)
    } else if (newIndex) {
      // Use the default formula for indices with single formula
      setSelectedFormula(newIndex.formula)
    }
  }

  // Get the effective formula (selected formula or default)
  const effectiveFormula = selectedFormula || (currentIndex?.formula ?? '')

  // Helper function to get parameter category counts for selected parameters
  const getSelectedParameterCategoryCounts = () => {
    const standardNames = selectedParameters.map(param => param.standardName)
    return getParameterCategoryCounts(standardNames)
  }


  // Validate the current selection
  const validation = currentIndex && selectedParameters.length > 0
    ? validateIndexParameters(currentIndex.id, selectedParameters)
    : { isValid: false, errors: [] }



  const handleContinue = async () => {
    if (!currentIndex) {
      setError('Please select a coastal vulnerability index')
      return
    }

    if (selectedParameters.length === 0) {
      setError('No parameters available for the selected index')
      return
    }

    try {
      setError(null) // Clear any previous errors

      // Convert IndexSpecificParameter to Parameter for storage compatibility
      const parametersForStorage: Parameter[] = selectedParameters.map(param => ({
        id: param.id,
        name: param.indexSpecificName,
        description: param.description,
        type: param.type,
        weight: param.weight,
        enabled: true,
        ...(param.unit && { unit: param.unit }),
        // Use the index-specific ranking table directly
        vulnerabilityRanges: param.rankingTable.map(range => ({
          value: range.value,
          min: null, // Will be parsed from criteria during value assignment
          max: null, // Will be parsed from criteria during value assignment
          label: range.label,
          color: range.color,
          criteria: range.criteria // Include the exact criteria from the index
        })),
        // Store the complete ranking table for reference
        indexSpecificRankingTable: param.rankingTable,
        // Additional fields for compatibility
        category: 'physical',
        standardId: param.standardName,
        indexId: param.indexId,
        indexSpecificName: param.indexSpecificName
      }))

      // Create parameter collection
      const parameterCollection: FeatureCollection = {
        type: 'FeatureCollection',
        features: parametersForStorage.map(param => ({
          type: 'Feature',
          properties: param,
          geometry: {
            type: 'Point',
            coordinates: [0, 0]
          }
        }))
      }

      // Create simplified index data for storage
      const indexData = {
        id: currentIndex.id,
        name: currentIndex.name,
        shortName: currentIndex.shortName,
        description: currentIndex.description,
        formula: effectiveFormula, // Use the selected formula
        type: currentIndex.type,
        citation: currentIndex.citation,
        parameterCount: selectedParameters.length,
        selectedAt: new Date().toISOString(),
        // Store additional formula info for ICVI
        availableFormulas: currentIndex.availableFormulas,
        selectedFormula: selectedFormula,
        resultClassification: currentIndex.resultClassification
      }

      const indexCollection: FeatureCollection = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: indexData,
          geometry: {
            type: 'Point',
            coordinates: [0, 0]
          }
        }]
      }

      console.log('Saving index:', indexData)
      console.log('Saving parameters:', parametersForStorage.length, 'parameters')

      // Save index first, then parameters
      await indexedDBService.storeShorelineData('current-index', indexCollection)
      await indexedDBService.storeShorelineData('current-parameters', parameterCollection)

      console.log('Successfully saved index and parameters')
      navigate('/parameter-assignment')

    } catch (err) {
      console.error('Error saving index and parameters:', err)
      setError(`Failed to save data: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">4. Index & Parameter Selection</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[700px]">
        {/* Left Panel - Index Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select Coastal Vulnerability Index</h3>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose a standardized coastal vulnerability index:
            </label>
            <select
              value={selectedIndex}
              onChange={(e) => handleIndexChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Select an Index</option>
              {STANDARDIZED_COASTAL_INDICES.map(index => (
                <option key={index.id} value={index.id}>
                  {index.shortName} - {index.name}
                </option>
              ))}
            </select>
          </div>

          {/* Formula Selection for indices with multiple formulas */}
          {currentIndex?.availableFormulas && currentIndex.availableFormulas.length > 1 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose calculation method:
              </label>
              <select
                value={selectedFormula}
                onChange={(e) => setSelectedFormula(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              >
                {currentIndex.availableFormulas.map(formula => (
                  <option key={formula.id} value={formula.id}>
                    {formula.name}
                  </option>
                ))}
              </select>
              {selectedFormula && currentIndex.availableFormulas.find(f => f.id === selectedFormula) && (
                <p className="mt-2 text-sm text-gray-600">
                  {currentIndex.availableFormulas.find(f => f.id === selectedFormula)?.description}
                </p>
              )}
            </div>
          )}

          {currentIndex && (
            <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 mb-6">
              {/* Index Title */}
              <div className="border-b border-gray-200 pb-3 mb-4">
                <h4 className="text-xl font-bold text-gray-900 mb-1">{currentIndex.shortName}</h4>
                <h5 className="text-sm font-medium text-gray-600">{currentIndex.name}</h5>
              </div>

              {/* Index Description */}
              <div className="mb-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {currentIndex.description}
                </p>
                {currentIndex.notes && (
                  <p className="text-sm text-gray-600 italic mt-2 leading-relaxed whitespace-pre-line">
                    {currentIndex.notes}
                  </p>
                )}
              </div>

              {/* Index Details */}
              <div className="mb-4 text-sm space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-gray-800">Formula:</span>
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {effectiveFormula}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Parameters:</span>
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {currentIndex.requiredParameters.length}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Weights:</span>
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {currentIndex.requiresEqualWeights ? 'equal' : 'variable'}
                  </span>
                </div>
              </div>

              {/* Parameter Categories Breakdown */}
              <div className="mb-4">
                <h6 className="font-semibold text-gray-800 mb-2">Parameter Categories:</h6>
                <div className="flex flex-wrap gap-3 items-center">
                  {Object.entries(getSelectedParameterCategoryCounts()).map(([category, count]) => (
                    <span key={category} className="text-sm text-gray-700">
                      {count} × <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {category}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Citations Section */}
              <div className="border-t border-gray-200 pt-4">
                <h6 className="font-semibold text-gray-800 mb-2">Citations:</h6>
                <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                  {currentIndex.citation}

                  {/* Classification Citation */}
                  {currentIndex.citation && (
                    <>
                      {'\n\n'}
                      Roukounis, C.N., Tsihrintzis, V.A. Indices of Coastal Vulnerability to Climate Change: a Review. Environ. Process. 9, 29 (2022). https://doi.org/10.1007/s40710-022-00577-9
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {!currentIndex && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-base">No index selected</p>
              <p className="text-sm mt-2">Choose an index above to see its parameters</p>
            </div>
          )}
        </div>

        {/* Right Panel - Parameter Ranking Tables */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900">Parameter Ranking Tables</h3>
          </div>

          {validation.errors.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <h4 className="text-sm font-medium text-yellow-800 mb-1">Validation Issues:</h4>
              <ul className="text-xs text-yellow-700 list-disc list-inside">
                {validation.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4 flex-grow overflow-y-auto">
            {selectedParameters.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-base">No index selected</p>
                <p className="text-sm mt-2">Choose an index to see parameter ranking tables</p>
              </div>
            ) : (
              selectedParameters.map(param => {
                const categoryInfo = getParameterCategory(param.standardName)
                return (
                  <div key={param.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="p-4">
                      {/* Header with name and weight */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-grow min-w-0">
                          <h4 className="font-semibold text-gray-900 text-base truncate mb-1">
                            {param.indexSpecificName}
                          </h4>
                          <p className="text-xs text-gray-500 mb-2">{param.description}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {param.type === 'numerical' ? 'Numerical' : 'Categorical'}
                            </span>
                            {param.unit && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {param.unit}
                              </span>
                            )}
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {categoryInfo.label}
                            </span>
                          </div>
                        </div>

                      </div>

                    {/* Vulnerability Ranking Table */}
                    <div className="mt-3 border border-gray-300 rounded-lg overflow-hidden bg-white">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-gray-100 border-b border-gray-300">
                            <th className="px-3 py-2 text-left font-semibold text-gray-800 w-12">Rank</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-800 w-20">Level</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-800">Criteria</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {param.rankingTable.map((range, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-3 py-2">
                                <span
                                  className="inline-flex items-center justify-center w-6 h-6 rounded font-bold text-white text-xs"
                                  style={{ backgroundColor: range.color }}
                                >
                                  {range.value}
                                </span>
                              </td>
                              <td className="px-3 py-2 font-medium text-gray-900">{range.label}</td>
                              <td className="px-3 py-2 text-gray-700 leading-relaxed">{range.criteria}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
        <button
          onClick={() => navigate('/segment-table')}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Segment Table
        </button>
        <button
          onClick={handleContinue}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continue to Parameter Assignment
        </button>
      </div>
    </div>
  )
}
