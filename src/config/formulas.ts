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
    description: 'CVI = √(∏Vi/n) - Square root of the product of vulnerability ranks divided by the number of variables. Only usable with equal weights.'
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
  {
    name: 'Composite',
    type: 'composite',
    description: 'ICVI = (EVI + SVI)/2 - Average of Environmental and Socioeconomic Vulnerability Indices.'
  },
  {
    name: 'ICVI Composite',
    type: 'icvi-composite',
    description: 'ICVI = (EVI + SVI)/2 - Integrated Coastal Vulnerability Index combining environmental and socioeconomic components.'
  },
  {
    name: 'ICVI Arithmetic',
    type: 'icvi-arithmetic',
    description: 'EVI = (a+b+c+d+e+f)/6, SVI = (g+h+i+j+k+l)/6, ICVI = (EVI+SVI)/2 - Arithmetic mean approach'
  },
  {
    name: 'ICVI Geometric',
    type: 'icvi-geometric',
    description: 'EVI = √(a×b×c×d×e×f), SVI = √(g×h×i×j×k×l), ICVI = (EVI+SVI)/2 - Geometric mean approach'
  },
];
