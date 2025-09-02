import type { ValidationRule } from '../../types';

/**
 * ICVI Validation Rules
 * Validates 12 parameters (6 EVI + 6 SVI) with equal weights
 */
export const ICVIValidationRules: ValidationRule[] = [
  {
    type: 'parameter_count',
    message: 'ICVI requires exactly 12 parameters (6 environmental + 6 socioeconomic)',
    validate: (parameters) => parameters.length === 12
  },
  {
    type: 'weight_sum',
    message: 'ICVI requires equal weights (1/12 each)',
    validate: (parameters, weights) => {
      if (!weights) return true;
      const expectedWeight = 1/12;
      const expectedCount = parameters.length;
      const weightValues = Object.values(weights);

      // Check if we have the right number of weights and all are equal to expected value
      return weightValues.length === expectedCount &&
             weightValues.every(w => Math.abs(w - expectedWeight) < 0.001);
    }
  },
  {
    type: 'formula_compatibility',
    message: 'ICVI must use composite formula',
    validate: () => true // Enforced by index definition
  }
];