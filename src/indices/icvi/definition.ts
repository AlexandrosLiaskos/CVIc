import { ICVIParameters } from './parameters';
import { ICVIValidationRules } from './validation';
import type { StandardizedCoastalIndex } from '../../types/indexSpecificTypes';

/**
 * ICVI (Integrated Coastal Vulnerability Index) - Alcántara-Carrió et al. (2024)
 * Composite index combining Environmental (EVI) and Socioeconomic (SVI) components
 */
export const ICVIIndex: StandardizedCoastalIndex = {
  id: 'icvi-alcantara-2024',
  name: 'Integrated Coastal Vulnerability Index (ICVI)',
  shortName: 'ICVI',
  description: 'Composite index combining Environmental Vulnerability Index (EVI) and Socioeconomic Vulnerability Index (SVI) developed by Alcántara-Carrió et al. (2024).',
  citation: `Alcántara-Carrió, J., García Echavarría, L. M., & Jaramillo-Vélez, A. (2024). Is the coastal vulnerability index a suitable index? Review and proposal of alternative indices for coastal vulnerability to sea level rise. Geo-Marine Letters, 44(1), 8. https://doi.org/10.1007/s00367-024-00770-9`,
  type: 'composite-index',
  formula: 'icvi-arithmetic', // Default to arithmetic mean
  requiredParameters: ICVIParameters,
  validationRules: ICVIValidationRules,
  requiresEqualWeights: true,
  resultClassification: {
    // Absolute range (global application) - Arithmetic mean formulas (Eq. I & III)
    absoluteRanges: [
      { min: 0, max: 0.2, label: 'Very Low', color: '#1a9850' },
      { min: 0.2, max: 0.4, label: 'Low', color: '#91cf60' },
      { min: 0.4, max: 0.6, label: 'Moderate', color: '#fee08b' },
      { min: 0.6, max: 0.8, label: 'High', color: '#fc8d59' },
      { min: 0.8, max: 1.0, label: 'Very High', color: '#d73027' }
    ],
    // Corrected geometric mean ranges for 0.1-0.9 scale
    geometricRanges: [
      { min: 0.1, max: 0.26, label: 'Very Low', color: '#1a9850' },
      { min: 0.26, max: 0.42, label: 'Low', color: '#91cf60' },
      { min: 0.42, max: 0.58, label: 'Moderate', color: '#fee08b' },
      { min: 0.58, max: 0.74, label: 'High', color: '#fc8d59' },
      { min: 0.74, max: 0.9, label: 'Very High', color: '#d73027' }
    ]
  },
  availableFormulas: [
    {
      id: 'icvi-arithmetic',
      name: 'Arithmetic Mean',
      description: '',
      type: 'arithmetic'
    },
    {
      id: 'icvi-geometric',
      name: 'Geometric Mean',
      description: '',
      type: 'geometric'
    }
  ],
  notes: `* Two calculation methods available: arithmetic mean (global application) and geometric mean.
* The classification of parameters into categories is derived from (Roukounis & Tsihrintzis, 2022).`
};