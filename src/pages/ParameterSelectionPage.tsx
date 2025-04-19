import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Parameter } from '../types'
import type { FeatureCollection } from 'geojson'
import { indexedDBService } from '../services/indexedDBService'

// Default parameters that users can select from
const DEFAULT_PARAMETERS: Parameter[] = [
  {
    id: 'geomorphology',
    name: 'Geomorphology',
    description: 'Coastal landform type and characteristics',
    type: 'categorical',
    weight: 0.25,
    enabled: true,
    options: [
      { type: 'categorical', value: 'rocky_cliffs', label: 'Rocky, cliffed coasts / Fiords / Fiards', color: '#1a9850', vulnerability: 1 }, // Rank 1 Green
      { type: 'categorical', value: 'medium_cliffs', label: 'Medium cliffs / Indented coasts', color: '#91cf60', vulnerability: 2 }, // Rank 2 Lime
      { type: 'categorical', value: 'low_cliffs', label: 'Low cliffs / Glacial drift / Alluvial plains', color: '#fee08b', vulnerability: 3 }, // Rank 3 Yellow
      { type: 'categorical', value: 'cobble_beaches', label: 'Cobble beaches / Estuary / Lagoon', color: '#fc8d59', vulnerability: 4 }, // Rank 4 Orange
      { type: 'categorical', value: 'barrier_beaches', label: 'Barrier beaches / Sand beaches / Salt marsh / Mud flats / Deltas / Mangrove / Coral reefs', color: '#d73027', vulnerability: 5 } // Rank 5 Red
    ]
  },
  {
    id: 'coastal_slope',
    name: 'Coastal Slope',
    description: 'Average slope of the coastal zone (%)',
    type: 'numerical',
    weight: 0.25,
    enabled: true,
    unit: '%',
    vulnerabilityRanges: [
      { value: 1, min: 2.0, max: null, label: 'Very Low', color: '#1a9850' }, // Rank 1 Green
      { value: 2, min: 0.7, max: 2.0, label: 'Low', color: '#91cf60' }, // Rank 2 Lime
      { value: 3, min: 0.04, max: 0.07, label: 'Moderate', color: '#fee08b' }, // Rank 3 Yellow
      { value: 4, min: 0.025, max: 0.04, label: 'High', color: '#fc8d59' }, // Rank 4 Orange
      { value: 5, min: null, max: 0.025, label: 'Very High', color: '#d73027' } // Rank 5 Red
    ]
  },
  {
    id: 'sea_level_change',
    name: 'Relative Sea-level Change',
    description: 'Rate of relative sea-level change',
    type: 'numerical',
    weight: 0.25,
    enabled: true,
    unit: 'mm/yr',
    vulnerabilityRanges: [
      { value: 1, min: null, max: 1.8, label: 'Very Low', color: '#1a9850' }, // Rank 1 Green
      { value: 2, min: 1.8, max: 2.5, label: 'Low', color: '#91cf60' }, // Rank 2 Lime
      { value: 3, min: 2.5, max: 2.95, label: 'Moderate', color: '#fee08b' }, // Rank 3 Yellow
      { value: 4, min: 2.95, max: 3.16, label: 'High', color: '#fc8d59' }, // Rank 4 Orange
      { value: 5, min: 3.16, max: null, label: 'Very High', color: '#d73027' } // Rank 5 Red
    ]
  },
  {
    id: 'shoreline_change',
    name: 'Shoreline Erosion/Accretion',
    description: 'Rate of shoreline erosion or accretion',
    type: 'numerical',
    weight: 0.25,
    enabled: true,
    unit: 'm/yr',
    vulnerabilityRanges: [
      { value: 1, min: 2.0, max: null, label: 'Accretion', color: '#1a9850' }, // Rank 1 Green
      { value: 2, min: 1.0, max: 2.0, label: 'Low Erosion/Accretion', color: '#91cf60' }, // Rank 2 Lime
      { value: 3, min: -1.0, max: 1.0, label: 'Stable', color: '#fee08b' }, // Rank 3 Yellow
      { value: 4, min: -2.0, max: -1.0, label: 'High Erosion', color: '#fc8d59' }, // Rank 4 Orange - Adjusted range for clarity
      { value: 5, min: null, max: -2.0, label: 'Very High Erosion', color: '#d73027' } // Rank 5 Red
    ]
  },
  {
    id: 'mean_tide_range',
    name: 'Mean Tide Range',
    description: 'Average tidal range',
    type: 'numerical',
    weight: 0,
    enabled: false,
    unit: 'm',
    vulnerabilityRanges: [
      { value: 1, min: 6.0, max: null, label: 'Very Low', color: '#1a9850' }, // Rank 1 Green
      { value: 2, min: 4.1, max: 6.0, label: 'Low', color: '#91cf60' }, // Rank 2 Lime
      { value: 3, min: 2.0, max: 4.0, label: 'Moderate', color: '#fee08b' }, // Rank 3 Yellow
      { value: 4, min: 1.0, max: 1.9, label: 'High', color: '#fc8d59' }, // Rank 4 Orange
      { value: 5, min: null, max: 1.0, label: 'Very High', color: '#d73027' } // Rank 5 Red
    ]
  },
  {
    id: 'mean_wave_height',
    name: 'Mean Wave Height',
    description: 'Average wave height',
    type: 'numerical',
    weight: 0,
    enabled: false,
    unit: 'm',
    vulnerabilityRanges: [
      { value: 1, min: null, max: 0.55, label: 'Very Low', color: '#1a9850' }, // Rank 1 Green
      { value: 2, min: 0.55, max: 0.85, label: 'Low', color: '#91cf60' }, // Rank 2 Lime
      { value: 3, min: 0.85, max: 1.05, label: 'Moderate', color: '#fee08b' }, // Rank 3 Yellow
      { value: 4, min: 1.05, max: 1.25, label: 'High', color: '#fc8d59' }, // Rank 4 Orange
      { value: 5, min: 1.25, max: null, label: 'Very High', color: '#d73027' } // Rank 5 Red
    ]
  }
]

export default function ParameterSelectionPage() {
  const navigate = useNavigate()
  const [parameters, setParameters] = useState<Parameter[]>(DEFAULT_PARAMETERS)
  const [error, setError] = useState<string | null>(null)

  // Load any existing parameters from IndexedDB
  useEffect(() => {
    const loadParameters = async () => {
      try {
        const savedData = await indexedDBService.getShorelineData('current-parameters')
        if (savedData && savedData.features) {
          // Convert FeatureCollection back to Parameter array
          const savedParameters = savedData.features.map(feature => feature.properties as Parameter)
          setParameters(savedParameters.filter((p): p is Parameter => p !== null))
        }
      } catch (err) {
        console.error('Error loading parameters:', err)
        setError('Failed to load saved parameters')
      }
    }
    loadParameters()
  }, [])

  const totalWeight = parameters
    .filter(p => p.enabled)
    .reduce((sum, p) => sum + (p.weight || 0), 0)

  const handleToggle = (id: string) => {
    setParameters(params => 
      params.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p)
    )
  }

  const handleWeight = (id: string, newWeight: number) => {
    setParameters(params => 
      params.map(p => p.id === id ? { ...p, weight: newWeight } : p)
    )
  }

  const distributeEvenly = () => {
    const enabledCount = parameters.filter(p => p.enabled).length
    if (enabledCount === 0) return

    const evenWeight = 1 / enabledCount
    setParameters(params => 
      params.map(p => p.enabled ? { ...p, weight: evenWeight } : p)
    )
  }

  const handleContinue = async () => {
    // Calculate total weight of enabled parameters
    const enabledParameters = parameters.filter(p => p.enabled)
    const totalWeight = enabledParameters.reduce((sum, p) => sum + (p.weight || 0), 0)

    // Validate total weight
    if (Math.abs(totalWeight - 1) > 0.01) {
      setError(`Parameter weights must sum to 100%. Current total: ${(totalWeight * 100).toFixed(0)}%`)
      return
    }

    try {
      // Convert parameters to FeatureCollection for storage
      const parameterCollection: FeatureCollection = {
        type: 'FeatureCollection',
        features: parameters.map(param => ({
          type: 'Feature',
          properties: param,
          geometry: {
            type: 'Point',
            coordinates: [0, 0] // Dummy coordinates since this is just for storage
          }
        }))
      }

      // Store parameters in IndexedDB
      await indexedDBService.storeShorelineData('current-parameters', parameterCollection)
      navigate('/parameter-assignment')
    } catch (err) {
      console.error('Error saving parameters:', err)
      setError('Failed to save parameters. Please try again.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">4.  Parameter Selection</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2 text-left">Vulnerability Parameters</h1>
          <p className="text-gray-600">Configure the parameters that determine coastal vulnerability</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Total Weight</div>
            <div className={`text-2xl font-medium ${Math.abs(totalWeight - 1) < 0.01 ? 'text-emerald-600' : 'text-gray-900'}`}>
              {(totalWeight * 100).toFixed(0)}%
            </div>
          </div>
          <button
            onClick={distributeEvenly}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Distribute Evenly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {parameters.map(param => (
          <div 
            key={param.id}
            className={`p-5 rounded-xl border ${
              param.enabled 
                ? 'bg-white border-gray-200 shadow-sm' 
                : 'bg-gray-50 border-gray-100'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 pt-1">
                <input
                  type="checkbox"
                  id={param.id}
                  checked={param.enabled}
                  onChange={() => handleToggle(param.id)}
                  className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start">
                  <div className="min-w-0">
                    <label htmlFor={param.id} className="block text-lg font-medium text-gray-900 text-left">
                      {param.name}
                    </label>
                  </div>
                  {param.enabled && (
                    <span className="text-lg font-medium text-gray-900 ml-4 w-16 text-right flex-shrink-0">
                      {((param.weight || 0) * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
                
                {param.enabled && (
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={param.weight || 0}
                      onChange={e => handleWeight(param.id, parseFloat(e.target.value))}
                      className="flex-grow h-2 accent-teal-600 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
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
