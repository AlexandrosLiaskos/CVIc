import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface Formula {
  id: string
  name: string
  description: string
  type: 'geometric-mean' | 'geometric-mean-normalized' | 'arithmetic-mean' | 'nonlinear-power'
}

const availableFormulas: Formula[] = [
  {
    id: 'geometric-mean',
    name: 'Geometric Mean',
    description: 'Traditional CVI calculation using geometric mean of parameters. Minimizes impact of extreme values.',
    type: 'geometric-mean'
  },
  {
    id: 'geometric-mean-normalized',
    name: 'Normalized Geometric Mean',
    description: 'Normalized version of geometric mean that provides consistent scaling regardless of parameter count.',
    type: 'geometric-mean-normalized'
  },
  {
    id: 'arithmetic-mean',
    name: 'Arithmetic Mean',
    description: 'Linear averaging of parameters. More sensitive to extreme values.',
    type: 'arithmetic-mean'
  },
  {
    id: 'nonlinear-power',
    name: 'Nonlinear Power Function',
    description: 'Advanced formula that allows for parameter-specific sensitivity adjustments.',
    type: 'nonlinear-power'
  }
]

export default function FormulaSelectionPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null)
  const [error, setError] = useState('')

  const handleFormulaSelect = (formula: Formula) => {
    setSelectedFormula(formula)
    setError('')
  }

  const handleContinue = () => {
    if (!selectedFormula) {
      setError('Please select a formula to continue')
      return
    }

    // Store selected formula in session storage
    sessionStorage.setItem('selectedFormula', JSON.stringify(selectedFormula))
    navigate('/calculation')
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-8">Select Calculation Formula</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {availableFormulas.map((formula) => (
          <div
            key={formula.id}
            className={`${
              selectedFormula?.id === formula.id
                ? 'border-primary-500 ring-2 ring-primary-500'
                : 'border-gray-200 hover:border-primary-300'
            } cursor-pointer border rounded-lg p-6 transition-colors duration-200`}
            onClick={() => handleFormulaSelect(formula)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {formula.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {formula.description}
                </p>
              </div>
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name="formula"
                  checked={selectedFormula?.id === formula.id}
                  onChange={() => handleFormulaSelect(formula)}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => navigate('/parameters')}
          className="btn btn-secondary"
        >
          Back to Parameters
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedFormula}
          className="btn btn-primary"
        >
          Continue to Calculation
        </button>
      </div>
    </div>
  )
} 