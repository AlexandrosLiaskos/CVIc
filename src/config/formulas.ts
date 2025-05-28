import type { Formula } from '../types';

export const availableFormulas: Formula[] = [
  {
    name: 'Geometric Mean',
    type: 'geometric-mean',
    description: 'CVI = ∏(Vi^Wi) - Product of values raised to their respective weights.'
  },
  {
    name: 'Traditional',
    type: 'traditional',
    description: 'CVI = √((∏(Vi))/n) - Square root of product of values devided by number of parameters. Only usable with equal weights.'
  },
  {
    name: 'Arithmetic Mean',
    type: 'arithmetic-mean',
    description: 'CVI = Σ(Vi*Wi) - Weighted sum of values.' 
  },
  {
    name: 'Nonlinear Power',
    type: 'nonlinear-power',
    description: 'CVI = √(Σ(Vi²*Wi)) - Square root of weighted sum of squares.'
  },
];
