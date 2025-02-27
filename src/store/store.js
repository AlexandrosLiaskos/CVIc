import { configureStore } from '@reduxjs/toolkit';

// Initial workflow state
const initialWorkflowState = {
  currentStep: 'welcome',
  sensorConfig: {
    sourceType: 'local',
    sensorType: 'Sentinel2',
    temporalRange: {
      start: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      end: new Date().toISOString().split('T')[0]
    },
    fileInfo: [],
    waterIndex: 'Band8',
    parameters: {
      processing: {
        level: 'L2A'
      }
    }
  },
  areaOfInterest: null,
  processingParameters: {}
};

// Workflow reducer
const workflowReducer = (state = initialWorkflowState, action) => {
  switch (action.type) {
    case 'SET_WORKFLOW_STEP':
      return {
        ...state,
        currentStep: action.payload
      };
    case 'SET_SENSOR_CONFIG':
      return {
        ...state,
        sensorConfig: {
          ...state.sensorConfig,
          ...(action.payload.temporalRange
            ? {
                temporalRange: {
                  ...state.sensorConfig.temporalRange,
                  ...action.payload.temporalRange
                }
              }
            : {}),
          ...(action.payload.fileInfo
            ? { fileInfo: action.payload.fileInfo }
            : {}),
          ...(action.payload.sensorType
            ? { sensorType: action.payload.sensorType }
            : {}),
          ...(action.payload.useAoI !== undefined
            ? { useAoI: action.payload.useAoI }
            : {}),
          ...(action.payload.aoiBounds
            ? { aoiBounds: action.payload.aoiBounds }
            : {}),
          ...(action.payload.parameters
            ? {
                parameters: {
                  ...state.sensorConfig.parameters,
                  ...action.payload.parameters
                }
              }
            : {})
        }
      };
    case 'SET_AREA_OF_INTEREST':
      return {
        ...state,
        areaOfInterest: action.payload
      };
    case 'SET_PROCESSING_PARAMS':
      return {
        ...state,
        processingParameters: {
          ...state.processingParameters,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

// User state
const initialUserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// User reducer
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

// Project state
const initialProjectState = {
  name: '',
  created: null,
  modified: null,
  parameters: {},
  results: {}
};

// Project reducer
const projectReducer = (state = initialProjectState, action) => {
  switch (action.type) {
    case 'SET_PROJECT_STATE':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    workflow: workflowReducer,
    user: userReducer,
    project: projectReducer
  },
  preloadedState: {
    workflow: initialWorkflowState,
    user: initialUserState,
    project: initialProjectState
  }
});

export default store;
