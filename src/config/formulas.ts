import type { Formula } from '../types';

export const availableFormulas: Formula[] = [
  {
    name: 'CVI Geometric Mean',
    type: 'geometric-mean',
    description: 'CVI = ⁿ√(∏Vi) - True geometric mean with equal weights for all parameters'
  },
  {
    name: 'ICVI Arithmetic',
    type: 'icvi-arithmetic',
    description: 'EVI = (a+b+c+d+e+f)/6, SVI = (g+h+i+j+k+l)/6, ICVI = (EVI+SVI)/2 - Arithmetic mean approach'
  },
  {
    name: 'ICVI Geometric',
    type: 'icvi-geometric',
    description: 'EVI = ⁶√(a×b×c×d×e×f), SVI = ⁶√(g×h×i×j×k×l), ICVI = (EVI+SVI)/2 - Geometric mean approach'
  }
];
