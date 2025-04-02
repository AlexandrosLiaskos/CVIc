import type { Formula } from '../types';

/**
 * Defines the available CVI calculation formulas.
 */
export const availableFormulas: Formula[] = [
  {
    name: 'Geometric Mean (Normalized)',
    type: 'geometric-mean-normalized',
    description: 'Normalized weighted geometric mean. Often used to scale results between 1-5.'
  },
  {
    name: 'Geometric Mean',
    type: 'geometric-mean',
    description: 'Standard weighted geometric mean. Traditional CVI method.'
  },
  {
    name: 'Arithmetic Mean',
    type: 'arithmetic-mean',
    description: 'Simple weighted arithmetic mean.'
  },
  {
    name: 'Nonlinear Power (sqrt)',
    type: 'nonlinear-power',
    description: 'Root mean square of weighted vulnerabilities. Emphasizes higher values.'
  },
];