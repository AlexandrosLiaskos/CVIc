import { CVIParameters } from './parameters';
import { CVIValidationRules } from './validation';
import type { StandardizedCoastalIndex } from '../../types/indexSpecificTypes';

/**
 * CVI (Coastal Vulnerability Index) - Thieler et al. (1999)
 * Physical vulnerability index using 6 physical parameters
 */
export const CVIIndex: StandardizedCoastalIndex = {
  id: 'cvi-thieler-1999',
  name: 'Coastal Vulnerability Index (CVI)',
  shortName: 'CVI',
  description: 'Physical coastal vulnerability index developed by Thieler et al. (1999) using 6 physical parameters with geometric mean calculation.',
  citation: `Thieler, E. R., & Hammar-Klose, E. S. (1999). National assessment of coastal vulnerability to sea-level rise: preliminary results for the US Atlantic coast. US Geological Survey Open-File Report 99-593.`,
  type: 'true-index',
  formula: 'cvi-geometric', // Default to geometric mean
  requiredParameters: CVIParameters,
  validationRules: CVIValidationRules,
  requiresEqualWeights: true,
  resultClassification: {
    // Standard CVI classification ranges (1-5 scale)
    absoluteRanges: [
      { min: 1.0, max: 1.8, label: 'Very Low', color: '#1a9850' },
      { min: 1.8, max: 2.6, label: 'Low', color: '#91cf60' },
      { min: 2.6, max: 3.4, label: 'Moderate', color: '#fee08b' },
      { min: 3.4, max: 4.2, label: 'High', color: '#fc8d59' },
      { min: 4.2, max: 5.0, label: 'Very High', color: '#d73027' }
    ]
  },
  availableFormulas: [
    {
      id: 'cvi-geometric',
      name: 'Geometric Mean',
      description: 'CVI = ⁿ√(∏Vi) - True geometric mean with equal weights for all parameters',
      type: 'geometric'
    }
  ],
  notes: `* Uses true geometric mean calculation: CVI = ⁿ√(∏Vi) where n=6 parameters.
* All parameters have equal weights (1/6 each).
* Focuses on physical vulnerability factors only.
* Original methodology from Thieler & Hammar-Klose (1999).`
};
