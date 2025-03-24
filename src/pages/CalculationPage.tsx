import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { calculateCVI } from '../services/cviCalculator'
import type { ShorelineData } from '../types'

interface CalculationState {
  status: 'idle' | 'calculating' | 'complete' | 'error'
  progress: number
  result: any | null
  error: string | null
}

export default function CalculationPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [state, setState] = useState<CalculationState>({
    status: 'idle',
    progress: 0,
    result: null,
    error: null
  })

  useEffect(() => {
    const loadDataAndCalculate = async () => {
      try {
        // Load required data from session storage
        const shoreline = sessionStorage.getItem('selectedShoreline')
        const parameters = sessionStorage.getItem('parameters')
        const formula = sessionStorage.getItem('selectedFormula')

        if (!shoreline || !parameters || !formula) {
          throw new Error('Missing required data. Please complete all previous steps.')
        }

        const shorelineData = JSON.parse(shoreline) as ShorelineData
        const parameterData = JSON.parse(parameters)
        const formulaData = JSON.parse(formula)

        setState(prev => ({ ...prev, status: 'calculating' }))

        // Simulate calculation progress
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 500))
          setState(prev => ({ ...prev, progress: i }))
        }

        // Perform actual calculation
        const result = calculateCVI({
          geomorphology: parameterData.find((p: any) => p.id === 'geomorphology')?.value ?? 1,
          coastalSlope: parameterData.find((p: any) => p.id === 'coastalSlope')?.value ?? 1,
          relativeSeaLevelRise: parameterData.find((p: any) => p.id === 'relativeSeaLevelRise')?.value ?? 1,
          meanWaveHeight: parameterData.find((p: any) => p.id === 'meanWaveHeight')?.value ?? 1,
          meanTideRange: parameterData.find((p: any) => p.id === 'meanTideRange')?.value ?? 1,
          shorelineErosionRate: parameterData.find((p: any) => p.id === 'shorelineErosionRate')?.value ?? 1,
          populationDensity: parameterData.find((p: any) => p.id === 'populationDensity')?.value ?? 1,
          landUse: parameterData.find((p: any) => p.id === 'landUse')?.value ?? 1,
          infrastructure: parameterData.find((p: any) => p.id === 'infrastructure')?.value ?? 1
        })

        // Store result in session storage
        const calculationResult = {
          shoreline: shorelineData,
          parameters: parameterData,
          formula: formulaData,
          cviScore: result,
          calculatedAt: new Date().toISOString()
        }
        sessionStorage.setItem('calculationResult', JSON.stringify(calculationResult))

        setState({
          status: 'complete',
          progress: 100,
          result: calculationResult,
          error: null
        })
      } catch (err) {
        setState({
          status: 'error',
          progress: 0,
          result: null,
          error: err instanceof Error ? err.message : 'An error occurred during calculation'
        })
      }
    }

    loadDataAndCalculate()
  }, [navigate])

  const handleViewResults = () => {
    navigate('/results')
  }

  const handleRetry = () => {
    setState({
      status: 'idle',
      progress: 0,
      result: null,
      error: null
    })
    window.location.reload()
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-8">CVI Calculation</h2>

      <div className="bg-white shadow rounded-lg p-6">
        {state.status === 'calculating' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Calculating CVI...
              </span>
              <span className="text-sm text-gray-500">
                {state.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${state.progress}%` }}
              />
            </div>
          </div>
        )}

        {state.status === 'complete' && (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <svg
                className="h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-center text-gray-700">
              Calculation completed successfully!
            </p>
            <button
              onClick={handleViewResults}
              className="w-full btn btn-primary"
            >
              View Results
            </button>
          </div>
        )}

        {state.status === 'error' && (
          <div className="space-y-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {state.error}
            </div>
            <button
              onClick={handleRetry}
              className="w-full btn btn-primary"
            >
              Retry Calculation
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 