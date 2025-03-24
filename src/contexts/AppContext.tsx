import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import type { MapFeature } from '../types'
import type { Parameter } from '../services/parameterService'
import type { Formula } from '../services/formulaService'
import type { CVIResult } from '../services/cviCalculator'

// Define action types
type Action =
  | { type: 'SET_SHORELINE'; payload: MapFeature }
  | { type: 'SET_PARAMETERS'; payload: Parameter[] }
  | { type: 'SET_FORMULA'; payload: Formula }
  | { type: 'SET_RESULTS'; payload: CVIResult }
  | { type: 'CLEAR_STATE' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }

// Define state interface
interface AppState {
  shoreline: MapFeature | null
  parameters: Parameter[]
  formula: Formula | null
  results: CVIResult | null
  loading: boolean
  error: string | null
}

// Define context interface
interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<Action>
}

// Initial state
const initialState: AppState = {
  shoreline: null,
  parameters: [],
  formula: null,
  results: null,
  loading: false,
  error: null
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined)

// Reducer function
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_SHORELINE':
      return { ...state, shoreline: action.payload }
    case 'SET_PARAMETERS':
      return { ...state, parameters: action.payload }
    case 'SET_FORMULA':
      return { ...state, formula: action.payload }
    case 'SET_RESULTS':
      return { ...state, results: action.payload }
    case 'CLEAR_STATE':
      return initialState
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

// Provider component
interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook for using the context
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Action creators
export const actions = {
  setShoreline: (shoreline: MapFeature): Action => ({
    type: 'SET_SHORELINE',
    payload: shoreline
  }),
  setParameters: (parameters: Parameter[]): Action => ({
    type: 'SET_PARAMETERS',
    payload: parameters
  }),
  setFormula: (formula: Formula): Action => ({
    type: 'SET_FORMULA',
    payload: formula
  }),
  setResults: (results: CVIResult): Action => ({
    type: 'SET_RESULTS',
    payload: results
  }),
  clearState: (): Action => ({
    type: 'CLEAR_STATE'
  }),
  setLoading: (loading: boolean): Action => ({
    type: 'SET_LOADING',
    payload: loading
  }),
  setError: (error: string | null): Action => ({
    type: 'SET_ERROR',
    payload: error
  })
} 