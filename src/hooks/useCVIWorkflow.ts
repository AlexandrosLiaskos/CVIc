import { useCallback } from 'react'
import { useApp, actions } from '../contexts/AppContext'
import { calculateCVI } from '../services/cviCalculator'
import { validateParameters } from '../services/parameterService'
import { validateFormulaConfig } from '../services/formulaService'
import type { CVIResult, CVIInput } from '../services/cviCalculator'
import type { Parameter, ParameterValidationResult } from '../services/parameterService'
import type { Formula, FormulaConfig } from '../services/formulaService'
import type { MapFeature, MapFeatureCollection } from '../types'

export function useCVIWorkflow() {
  const { state, dispatch } = useApp()

  const calculate = useCallback(async (): Promise<CVIResult> => {
    try {
      // Validate inputs
      if (!state.shoreline) {
        throw new Error('No shoreline data available')
      }

      if (!state.formula) {
        throw new Error('No formula selected')
      }

      if (state.parameters.length === 0) {
        throw new Error('No parameters defined')
      }

      // Convert single feature to feature collection if needed
      const shorelineCollection: MapFeatureCollection = {
        type: 'FeatureCollection',
        features: Array.isArray(state.shoreline) ? state.shoreline : [state.shoreline]
      }

      // Convert parameters to CVI input format
      const cviParameters = state.parameters.map(param => ({
        name: param.name,
        weight: param.weight,
        values: param.values
      }))

      // Validate parameters
      const parameterValidation = validateParameters(
        state.parameters,
        shorelineCollection
      )
      if (!parameterValidation.isValid) {
        throw new Error(`Parameter validation failed: ${parameterValidation.errors.join(', ')}`)
      }

      // Validate formula configuration
      const formulaConfig: FormulaConfig = {
        formulaId: state.formula.id,
        parameters: state.formula.parameters.reduce((acc, param) => {
          acc[param.name] = param.default ?? (param.type === 'boolean' ? false : 0)
          return acc
        }, {} as Record<string, number | boolean>)
      }
      const formulaValidation = validateFormulaConfig(formulaConfig, state.formula)
      if (!formulaValidation.isValid) {
        throw new Error(`Formula validation failed: ${formulaValidation.errors.join(', ')}`)
      }

      // Set loading state
      dispatch(actions.setLoading(true))
      dispatch(actions.setError(null))

      // Calculate CVI
      const input: CVIInput = {
        shoreline: shorelineCollection,
        parameters: cviParameters,
        formula: state.formula.type
      }
      const results = calculateCVI(input)

      // Update state with results
      dispatch(actions.setResults(results))
      return results
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      dispatch(actions.setError(errorMessage))
      throw error
    } finally {
      dispatch(actions.setLoading(false))
    }
  }, [state.shoreline, state.formula, state.parameters, dispatch])

  const reset = useCallback(() => {
    dispatch(actions.clearState())
  }, [dispatch])

  const updateParameters = useCallback((parameters: Parameter[]) => {
    dispatch(actions.setParameters(parameters))
  }, [dispatch])

  const updateFormula = useCallback((formula: Formula) => {
    dispatch(actions.setFormula(formula))
  }, [dispatch])

  return {
    calculate,
    reset,
    updateParameters,
    updateFormula,
    loading: state.loading,
    error: state.error,
    results: state.results,
    hasShoreline: !!state.shoreline,
    hasFormula: !!state.formula,
    hasParameters: state.parameters.length > 0
  }
} 