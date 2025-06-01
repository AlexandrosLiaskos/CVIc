import type { Formula } from '../types';

export interface SubIndex {
  id: string;
  name: string;
  parameterIds: string[];
  formula: Formula['type'];
  weight: number;
}

export interface CompositeFormula {
  type: 'composite';
  subIndices: SubIndex[];
  combineMethod: 'arithmetic-mean' | 'weighted-sum' | 'custom';
  customFormula?: string;
}

export interface CoastalIndex {
  id: string;
  name: string;
  shortName: string;
  description: string;
  citation: string;
  type: 'true-index' | 'composite-index' | 'composite-component' | 'composite';
  formula: Formula['type'] | CompositeFormula;
  parameterIds: string[];
  defaultWeights: Record<string, number>;
  requiresEqualWeights?: boolean;
}

export const COASTAL_INDICES: CoastalIndex[] = [
  {
    id: 'cvi-thieler-1999',
    name: 'Coastal Vulnerability Index (CVI)',
    shortName: 'CVI',
    description: 'The original USGS coastal vulnerability index developed by Thieler & Hammar-Klose (1999). Uses 6 physical parameters with equal weights in a square-root formula to assess relative coastal vulnerability to sea-level rise.',
    citation: 'Thieler, E. R., & Hammar-Klose, E. S. (1999)',
    type: 'true-index',
    formula: 'traditional',
    requiresEqualWeights: true,
    parameterIds: [
      'coastal_geomorphology',
      'coastal_slope',
      'sea_level_change',
      'shoreline_change',
      'mean_tide_range',
      'mean_wave_height'
    ],
    defaultWeights: {
      'coastal_geomorphology': 1/6,
      'coastal_slope': 1/6,
      'sea_level_change': 1/6,
      'shoreline_change': 1/6,
      'mean_tide_range': 1/6,
      'mean_wave_height': 1/6
    }
  },

  {
    id: 'icvi-alcantara-2024',
    name: 'Integrated Coastal Vulnerability Index (ICVI)',
    shortName: 'ICVI',
    description: 'Composite vulnerability index by Alcántara-Carrió et al. (2024) that integrates Environmental Vulnerability Index (EVI) and Social Vulnerability Index (SVI) using arithmetic mean combination to assess comprehensive coastal vulnerability.',
    citation: 'Alcántara-Carrió, J., García Echavarría, L. M., & Jaramillo-Vélez, A. (2024)',
    type: 'composite-index',
    formula: {
      type: 'composite',
      subIndices: [
        {
          id: 'evi',
          name: 'Environmental Vulnerability Index',
          parameterIds: [
            'coastal_geomorphology',
            'coastal_slope',
            'sea_level_change',
            'shoreline_change',
            'mean_tide_range',
            'mean_wave_height'
          ],
          formula: 'arithmetic-mean',
          weight: 0.5
        },
        {
          id: 'svi',
          name: 'Social Vulnerability Index',
          parameterIds: [
            'population_density',
            'economic_value',
            'land_use'
          ],
          formula: 'arithmetic-mean',
          weight: 0.5
        }
      ],
      combineMethod: 'arithmetic-mean',
      customFormula: '(EVI + SVI)/2'
    },
    parameterIds: [
      'coastal_geomorphology',
      'coastal_slope',
      'sea_level_change',
      'shoreline_change',
      'mean_tide_range',
      'mean_wave_height',
      'population_density',
      'economic_value',
      'land_use'
    ],
    defaultWeights: {
      // EVI parameters (equal weights within sub-index)
      'coastal_geomorphology': 1/6,
      'coastal_slope': 1/6,
      'sea_level_change': 1/6,
      'shoreline_change': 1/6,
      'mean_tide_range': 1/6,
      'mean_wave_height': 1/6,
      // SVI parameters (equal weights within sub-index)
      'population_density': 1/3,
      'economic_value': 1/3,
      'land_use': 1/3
    }
  },
  {
    id: 'cvi-se-szlafsztein-2007',
    name: 'Coastal Vulnerability Index including Socio-Economic Dimension (CVI-SE)',
    shortName: 'CVI-SE',
    description: 'Enhanced coastal vulnerability index by Szlafsztein & Sterr (2007) that combines physical CVI (60% weight) with socioeconomic vulnerability indicators (40% weight) to provide a more comprehensive assessment.',
    citation: 'Szlafsztein, C., & Sterr, H. (2007)',
    type: 'composite-index',
    formula: {
      type: 'composite',
      subIndices: [
        {
          id: 'physical_cvi',
          name: 'Physical CVI',
          parameterIds: [
            'coastal_geomorphology',
            'coastal_slope',
            'sea_level_change',
            'shoreline_change',
            'mean_tide_range',
            'mean_wave_height'
          ],
          formula: 'traditional',
          weight: 0.6
        },
        {
          id: 'socioeconomic_vi',
          name: 'Socioeconomic VI',
          parameterIds: [
            'population_density',
            'economic_value',
            'infrastructure_density',
            'social_vulnerability'
          ],
          formula: 'arithmetic-mean',
          weight: 0.4
        }
      ],
      combineMethod: 'weighted-sum',
      customFormula: '0.6 × Physical_CVI + 0.4 × Socioeconomic_VI'
    },
    parameterIds: [
      'coastal_geomorphology',
      'coastal_slope',
      'sea_level_change',
      'shoreline_change',
      'mean_tide_range',
      'mean_wave_height',
      'population_density',
      'economic_value',
      'infrastructure_density',
      'social_vulnerability'
    ],
    defaultWeights: {
      // Physical CVI parameters (equal weights within sub-index)
      'coastal_geomorphology': 1/6,
      'coastal_slope': 1/6,
      'sea_level_change': 1/6,
      'shoreline_change': 1/6,
      'mean_tide_range': 1/6,
      'mean_wave_height': 1/6,
      // Socioeconomic parameters (equal weights within sub-index)
      'population_density': 1/4,
      'economic_value': 1/4,
      'infrastructure_density': 1/4,
      'social_vulnerability': 1/4
    }
  },
  {
    id: 'pcvi-kantamaneni-2024',
    name: 'Physical Coastal Vulnerability Index (PCVI)',
    shortName: 'PCVI',
    description: 'Physical coastal vulnerability index by Kantamaneni et al. (2024) focusing on coastal morphology, natural defenses, and infrastructure. Uses 6 parameters with equal weights to assess physical vulnerability to coastal hazards.',
    citation: 'Kantamaneni, K., Xing, L., Gupta, V., & Campos, L. C. (2024)',
    type: 'true-index',
    formula: 'arithmetic-mean',
    requiresEqualWeights: true,
    parameterIds: [
      'beach_width',
      'dune_width',
      'coastal_slope',
      'vegetation_distance',
      'infrastructure_density',
      'sea_defences'
    ],
    defaultWeights: {
      'beach_width': 1/6,
      'dune_width': 1/6,
      'coastal_slope': 1/6,
      'vegetation_distance': 1/6,
      'infrastructure_density': 1/6,
      'sea_defences': 1/6
    }
  },
  {
    id: 'ecvi-kantamaneni-2024',
    name: 'Economic Coastal Vulnerability Index (ECVI)',
    shortName: 'ECVI',
    description: 'Economic coastal vulnerability index by Kantamaneni et al. (2024) focusing on economic assets and population at risk. Uses 2 parameters with equal weights to assess economic vulnerability to coastal hazards.',
    citation: 'Kantamaneni, K., Xing, L., Gupta, V., & Campos, L. C. (2024)',
    type: 'true-index',
    formula: 'arithmetic-mean',
    requiresEqualWeights: true,
    parameterIds: [
      'economic_value',
      'population_density'
    ],
    defaultWeights: {
      'economic_value': 1/2,
      'population_density': 1/2
    }
  },
  {
    id: 'evi-alcantara-2024',
    name: 'Environmental Vulnerability Index (EVI)',
    shortName: 'EVI',
    description: 'Environmental vulnerability component of ICVI by Alcántara-Carrió et al. (2024). Focuses on physical coastal parameters using the traditional CVI approach with 6 environmental factors.',
    citation: 'Alcántara-Carrió, J., García Echavarría, L. M., & Jaramillo-Vélez, A. (2024)',
    type: 'true-index',
    formula: 'traditional',
    requiresEqualWeights: true,
    parameterIds: [
      'coastal_geomorphology',
      'coastal_slope',
      'sea_level_change',
      'shoreline_change',
      'mean_tide_range',
      'mean_wave_height'
    ],
    defaultWeights: {
      'coastal_geomorphology': 1/6,
      'coastal_slope': 1/6,
      'sea_level_change': 1/6,
      'shoreline_change': 1/6,
      'mean_tide_range': 1/6,
      'mean_wave_height': 1/6
    }
  },
  {
    id: 'svi-alcantara-2024',
    name: 'Social Vulnerability Index (SVI)',
    shortName: 'SVI',
    description: 'Social vulnerability component of ICVI by Alcántara-Carrió et al. (2024). Assesses socioeconomic vulnerability using population density, economic value, and land use factors.',
    citation: 'Alcántara-Carrió, J., García Echavarría, L. M., & Jaramillo-Vélez, A. (2024)',
    type: 'true-index',
    formula: 'arithmetic-mean',
    requiresEqualWeights: true,
    parameterIds: [
      'population_density',
      'economic_value',
      'land_use'
    ],
    defaultWeights: {
      'population_density': 1/3,
      'economic_value': 1/3,
      'land_use': 1/3
    }
  },
  {
    id: 'sovi-cutter-2003',
    name: 'Social Vulnerability Index (SoVI)',
    shortName: 'SoVI',
    description: 'Social vulnerability index developed by Cutter et al. (2003) using principal component analysis of demographic and socioeconomic factors. Assesses social vulnerability through 8 key factors including age, ethnicity, housing, and infrastructure.',
    citation: 'Cutter, S. L., Boruff, B. J., & Shirley, W. L. (2003)',
    type: 'composite-index',
    formula: {
      type: 'composite',
      subIndices: [
        {
          id: 'socioeconomic_status',
          name: 'Socioeconomic Status',
          parameterIds: ['economic_value', 'population_density'],
          formula: 'arithmetic-mean',
          weight: 0.25
        },
        {
          id: 'household_composition',
          name: 'Household Composition & Disability',
          parameterIds: ['household_composition'],
          formula: 'arithmetic-mean',
          weight: 0.125
        },
        {
          id: 'minority_language',
          name: 'Minority Status & Language',
          parameterIds: ['minority_status'],
          formula: 'arithmetic-mean',
          weight: 0.125
        },
        {
          id: 'housing_transportation',
          name: 'Housing Type & Transportation',
          parameterIds: ['housing_type'],
          formula: 'arithmetic-mean',
          weight: 0.125
        },
        {
          id: 'age_factors',
          name: 'Age Demographics',
          parameterIds: ['age_demographics'],
          formula: 'arithmetic-mean',
          weight: 0.125
        },
        {
          id: 'infrastructure_factors',
          name: 'Infrastructure & Development',
          parameterIds: ['infrastructure_density', 'land_use'],
          formula: 'arithmetic-mean',
          weight: 0.25
        }
      ],
      combineMethod: 'weighted-sum',
      customFormula: 'Weighted sum of factor scores from PCA analysis'
    },
    parameterIds: [
      'economic_value',
      'population_density',
      'household_composition',
      'minority_status',
      'housing_type',
      'age_demographics',
      'infrastructure_density',
      'land_use'
    ],
    defaultWeights: {
      'economic_value': 0.125,
      'population_density': 0.125,
      'household_composition': 0.125,
      'minority_status': 0.125,
      'housing_type': 0.125,
      'age_demographics': 0.125,
      'infrastructure_density': 0.125,
      'land_use': 0.125
    }
  },
  {
    id: 'lvi-mudasser-2020',
    name: 'Livelihood Vulnerability Index (LVI)',
    shortName: 'LVI',
    description: 'Livelihood vulnerability index by Mudasser et al. (2020) for assessing climate-induced vulnerability of coastal communities. Uses the IPCC framework: LVI = (Exposure + Sensitivity - Adaptive Capacity)/3.',
    citation: 'Mudasser, M., Hossain, M. Z., Rahaman, K. R., & Ha-Mim, N. M. (2020)',
    type: 'composite-index',
    formula: {
      type: 'composite',
      subIndices: [
        {
          id: 'exposure',
          name: 'Exposure',
          parameterIds: ['sea_level_change', 'mean_wave_height', 'shoreline_change'],
          formula: 'arithmetic-mean',
          weight: 0.33
        },
        {
          id: 'sensitivity',
          name: 'Sensitivity',
          parameterIds: ['livelihood_strategies', 'food_security', 'water_security', 'population_density'],
          formula: 'arithmetic-mean',
          weight: 0.33
        },
        {
          id: 'adaptive_capacity',
          name: 'Adaptive Capacity',
          parameterIds: ['economic_value', 'infrastructure_density', 'social_vulnerability'],
          formula: 'arithmetic-mean',
          weight: 0.34
        }
      ],
      combineMethod: 'custom',
      customFormula: '(Exposure + Sensitivity - Adaptive_Capacity)/3'
    },
    parameterIds: [
      'sea_level_change',
      'mean_wave_height',
      'shoreline_change',
      'livelihood_strategies',
      'food_security',
      'water_security',
      'population_density',
      'economic_value',
      'infrastructure_density',
      'social_vulnerability'
    ],
    defaultWeights: {
      // Exposure parameters
      'sea_level_change': 1/3,
      'mean_wave_height': 1/3,
      'shoreline_change': 1/3,
      // Sensitivity parameters
      'livelihood_strategies': 1/4,
      'food_security': 1/4,
      'water_security': 1/4,
      'population_density': 1/4,
      // Adaptive Capacity parameters
      'economic_value': 1/3,
      'infrastructure_density': 1/3,
      'social_vulnerability': 1/3
    }
  },
  {
    id: 'integrated-cvi-tanim-2022',
    name: 'Integrated Coastal Vulnerability Index',
    shortName: 'Integrated CVI',
    description: 'Integrated coastal vulnerability index by Tanim et al. (2022) combining physical (40%), social (30%), and environmental (30%) vulnerability components. Uses weighted sum approach for comprehensive socio-environmental assessment.',
    citation: 'Tanim, A. H., Goharian, E., & Moradkhani, H. (2022)',
    type: 'composite-index',
    formula: {
      type: 'composite',
      subIndices: [
        {
          id: 'physical_vulnerability',
          name: 'Physical Vulnerability',
          parameterIds: [
            'coastal_geomorphology',
            'coastal_slope',
            'coastal_elevation',
            'sea_level_change',
            'shoreline_change',
            'mean_wave_height',
            'mean_tide_range'
          ],
          formula: 'geometric-mean',
          weight: 0.4
        },
        {
          id: 'social_vulnerability',
          name: 'Social Vulnerability',
          parameterIds: [
            'population_density',
            'age_demographics',
            'economic_value',
            'social_vulnerability'
          ],
          formula: 'arithmetic-mean',
          weight: 0.3
        },
        {
          id: 'environmental_vulnerability',
          name: 'Environmental Vulnerability',
          parameterIds: [
            'land_use',
            'ecosystem_services',
            'vegetation_distance'
          ],
          formula: 'arithmetic-mean',
          weight: 0.3
        }
      ],
      combineMethod: 'weighted-sum',
      customFormula: '0.4 × Physical + 0.3 × Social + 0.3 × Environmental'
    },
    parameterIds: [
      'coastal_geomorphology',
      'coastal_slope',
      'coastal_elevation',
      'sea_level_change',
      'shoreline_change',
      'mean_wave_height',
      'mean_tide_range',
      'population_density',
      'age_demographics',
      'economic_value',
      'social_vulnerability',
      'land_use',
      'ecosystem_services',
      'vegetation_distance'
    ],
    defaultWeights: {
      // Physical Vulnerability parameters
      'coastal_geomorphology': 1/7,
      'coastal_slope': 1/7,
      'coastal_elevation': 1/7,
      'sea_level_change': 1/7,
      'shoreline_change': 1/7,
      'mean_wave_height': 1/7,
      'mean_tide_range': 1/7,
      // Social Vulnerability parameters
      'population_density': 1/4,
      'age_demographics': 1/4,
      'economic_value': 1/4,
      'social_vulnerability': 1/4,
      // Environmental Vulnerability parameters
      'land_use': 1/3,
      'ecosystem_services': 1/3,
      'vegetation_distance': 1/3
    }
  },
  {
    id: 'rcvi-evelpidou-2025',
    name: 'Revised Coastal Vulnerability Index (RCVI)',
    shortName: 'RCVI',
    description: 'Revised coastal vulnerability index by Evelpidou & Karkani (2025) that updates the original CVI with refined parameter definitions and adds natural protection features.',
    citation: 'Evelpidou, N., & Karkani, A. (2025)',
    type: 'true-index',
    formula: 'traditional',
    requiresEqualWeights: true,
    parameterIds: [
      'coastal_geomorphology',
      'natural_protection',
      'coastal_slope',
      'sea_level_change',
      'shoreline_change',
      'mean_tide_range',
      'mean_wave_height'
    ],
    defaultWeights: {
      'coastal_geomorphology': 1/7,
      'natural_protection': 1/7,
      'coastal_slope': 1/7,
      'sea_level_change': 1/7,
      'shoreline_change': 1/7,
      'mean_tide_range': 1/7,
      'mean_wave_height': 1/7
    }
  },

  // ICVI Components
  {
    id: 'evi-alcantara-2024',
    name: 'Environmental Vulnerability Index (EVI)',
    shortName: 'EVI',
    description: 'Environmental component of ICVI by Alcántara-Carrió et al. (2024) using 0-1 scale for global comparability.',
    citation: 'Alcántara-Carrió, J., García Echavarría, L. M., & Jaramillo-Vélez, A. (2024)',
    type: 'composite-component',
    formula: 'arithmetic-mean',
    requiresEqualWeights: true,
    parameterIds: [
      'coastal_geomorphology',
      'coastal_slope',
      'shoreline_change',
      'ecosystem_type',
      'environmental_conservancy',
      'interest_species'
    ],
    defaultWeights: {
      'coastal_geomorphology': 1/6,
      'coastal_slope': 1/6,
      'shoreline_change': 1/6,
      'ecosystem_type': 1/6,
      'environmental_conservancy': 1/6,
      'interest_species': 1/6
    }
  },
  {
    id: 'svi-alcantara-2024',
    name: 'Social Vulnerability Index (SVI)',
    shortName: 'SVI',
    description: 'Social component of ICVI by Alcántara-Carrió et al. (2024) using 0-1 scale for global comparability.',
    citation: 'Alcántara-Carrió, J., García Echavarría, L. M., & Jaramillo-Vélez, A. (2024)',
    type: 'composite-component',
    formula: 'arithmetic-mean',
    requiresEqualWeights: true,
    parameterIds: [
      'use_of_territory',
      'building_coast_ratio',
      'population_density',
      'economic_value',
      'sociocultural_heritage'
    ],
    defaultWeights: {
      'use_of_territory': 1/5,
      'building_coast_ratio': 1/5,
      'population_density': 1/5,
      'economic_value': 1/5,
      'sociocultural_heritage': 1/5
    }
  },
  {
    id: 'icvi-alcantara-2024',
    name: 'Integrated Coastal Vulnerability Index (ICVI)',
    shortName: 'ICVI',
    description: 'Composite index combining EVI and SVI components by Alcántara-Carrió et al. (2024).',
    citation: 'Alcántara-Carrió, J., García Echavarría, L. M., & Jaramillo-Vélez, A. (2024)',
    type: 'composite',
    formula: 'icvi-composite',
    requiresEqualWeights: false,
    parameterIds: [
      'coastal_geomorphology', 'coastal_slope', 'shoreline_change', 'ecosystem_type', 'environmental_conservancy', 'interest_species',
      'use_of_territory', 'building_coast_ratio', 'population_density', 'economic_value', 'sociocultural_heritage'
    ],
    defaultWeights: {
      'coastal_geomorphology': 1/12, 'coastal_slope': 1/12, 'shoreline_change': 1/12, 'ecosystem_type': 1/12, 'environmental_conservancy': 1/12, 'interest_species': 1/12,
      'use_of_territory': 1/12, 'building_coast_ratio': 1/12, 'population_density': 1/12, 'economic_value': 1/12, 'sociocultural_heritage': 1/12
    }
  },

  // PCVI/ECVI Components
  {
    id: 'pcvi-kantamaneni-2024',
    name: 'Physical Coastal Vulnerability Index (PCVI)',
    shortName: 'PCVI',
    description: 'Physical coastal vulnerability assessment by Kantamaneni et al. (2024) for UK coastal areas.',
    citation: 'Kantamaneni, K., Xing, L., Gupta, V., & Campos, L. C. (2024)',
    type: 'composite-component',
    formula: 'pcvi',
    requiresEqualWeights: true,
    parameterIds: [
      'beach_width',
      'dune_width',
      'coastal_slope',
      'vegetation_distance',
      'distance_built_structures',
      'sea_defences'
    ],
    defaultWeights: {
      'beach_width': 1/6,
      'dune_width': 1/6,
      'coastal_slope': 1/6,
      'vegetation_distance': 1/6,
      'distance_built_structures': 1/6,
      'sea_defences': 1/6
    }
  },
  {
    id: 'ecvi-kantamaneni-2024',
    name: 'Economic Coastal Vulnerability Index (ECVI)',
    shortName: 'ECVI',
    description: 'Economic coastal vulnerability assessment by Kantamaneni et al. (2024) for UK coastal areas.',
    citation: 'Kantamaneni, K., Xing, L., Gupta, V., & Campos, L. C. (2024)',
    type: 'composite-component',
    formula: 'ecvi',
    requiresEqualWeights: true,
    parameterIds: [
      'commercial_properties',
      'residential_properties',
      'economic_value',
      'population_density'
    ],
    defaultWeights: {
      'commercial_properties': 1/4,
      'residential_properties': 1/4,
      'economic_value': 1/4,
      'population_density': 1/4
    }
  },
  {
    id: 'ccvi-kantamaneni-2024',
    name: 'Combined Coastal Vulnerability Index (CCVI)',
    shortName: 'CCVI',
    description: 'Composite index combining PCVI and ECVI components by Kantamaneni et al. (2024).',
    citation: 'Kantamaneni, K., Xing, L., Gupta, V., & Campos, L. C. (2024)',
    type: 'composite',
    formula: 'ccvi-composite',
    requiresEqualWeights: false,
    parameterIds: [
      'beach_width', 'dune_width', 'coastal_slope', 'vegetation_distance', 'distance_built_structures', 'sea_defences',
      'commercial_properties', 'residential_properties', 'economic_value', 'population_density'
    ],
    defaultWeights: {
      'beach_width': 1/10, 'dune_width': 1/10, 'coastal_slope': 1/10, 'vegetation_distance': 1/10, 'distance_built_structures': 1/10, 'sea_defences': 1/10,
      'commercial_properties': 1/10, 'residential_properties': 1/10, 'economic_value': 1/10, 'population_density': 1/10
    }
  }
];

export const getIndexById = (id: string): CoastalIndex | undefined => {
  return COASTAL_INDICES.find(index => index.id === id);
};

export const getIndicesByType = (type: 'true-index' | 'composite-index'): CoastalIndex[] => {
  return COASTAL_INDICES.filter(index => index.type === type);
};
