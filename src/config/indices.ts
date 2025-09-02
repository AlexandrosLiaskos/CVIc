import { IndexRegistry } from '../indices';

/**
 * Simplified index configuration using the modular registry
 * This replaces the old standardizedIndices.ts file
 */

// Export all indices from the registry
export const STANDARDIZED_COASTAL_INDICES = IndexRegistry.getAllIndices();

// Export all parameters from the registry
export const ALL_PARAMETERS = IndexRegistry.getAllParameters();

// Helper functions
export const getStandardizedIndexById = (id: string) => IndexRegistry.getIndexById(id);
export const getParametersForIndex = (indexId: string) => IndexRegistry.getParametersForIndex(indexId);
export const validateIndexParameters = (indexId: string, parameters: any[], weights?: Record<string, number>) =>
  IndexRegistry.validateIndexParameters(indexId, parameters, weights);