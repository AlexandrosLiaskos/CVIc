import type { ValidationRule } from '../../types';

/**
 * CVI Validation Rules
 * Simple validation for 6 parameters with no weight requirements
 */
export const CVIValidationRules: ValidationRule[] = [
  {
    type: 'parameter_count',
    message: 'CVI requires exactly 6 parameters',
    validate: (parameters) => parameters.length === 6
  },
  {
    type: 'formula_compatibility',
    message: 'CVI uses true geometric mean with equal weights (no explicit weights needed)',
    validate: () => true // Enforced by index definition
  }
];