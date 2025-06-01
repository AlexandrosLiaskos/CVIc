// New index-specific parameter system
export interface IndexSpecificVulnerabilityRange {
  value: number; // 1-5 vulnerability rank
  criteria: string; // Specific criteria for this index
  color: string;
  label: string; // Very Low, Low, Moderate, High, Very High
}

export interface IndexSpecificParameter {
  id: string; // Unique identifier for this parameter in this index
  standardName: string; // Consistent name across all indices (e.g., 'coastal_geomorphology')
  indexId: string; // Which index this parameter belongs to
  indexSpecificName: string; // How this specific index refers to this parameter
  description: string;
  type: 'numerical' | 'categorical';
  unit?: string;
  rankingTable: IndexSpecificVulnerabilityRange[]; // Index-specific 1-5 rankings
  weight: number; // Default weight for this parameter in this index
  required: boolean; // Whether this parameter is required for the index
}

export interface ValidationRule {
  type: 'parameter_count' | 'parameter_required' | 'weight_sum' | 'formula_compatibility';
  message: string;
  validate: (parameters: IndexSpecificParameter[], weights?: Record<string, number>) => boolean;
}

export interface StandardizedCoastalIndex {
  id: string;
  name: string;
  shortName: string;
  description: string;
  citation: string;
  type: 'true-index' | 'composite-index';
  formula: string; // Fixed formula for this index
  requiredParameters: IndexSpecificParameter[];
  validationRules: ValidationRule[];
  requiresEqualWeights: boolean;
  scalingFactor?: number; // For indices that don't use 1-5 scale
  notes?: string;
  resultClassification?: {
    absoluteRanges?: Array<{
      min: number;
      max: number;
      label: string;
      color: string;
    }>;
    geometricRanges?: Array<{
      min: number;
      max: number;
      label: string;
      color: string;
    }>;
  };
  availableFormulas?: Array<{
    id: string;
    name: string;
    description: string;
    type: string;
  }>;
}

// Standard parameter names - consistent across all indices
export enum StandardParameterNames {
  COASTAL_GEOMORPHOLOGY = 'coastal_geomorphology',
  COASTAL_SLOPE = 'coastal_slope',
  ROCK_TYPE = 'rock_type',
  SEA_LEVEL_CHANGE = 'sea_level_change',
  SHORELINE_CHANGE = 'shoreline_change',
  MEAN_TIDE_RANGE = 'mean_tide_range',
  MEAN_WAVE_HEIGHT = 'mean_wave_height',
  BARRIER_TYPE = 'barrier_type',
  SHORELINE_EXPOSURE = 'shoreline_exposure',
  NATURAL_PROTECTION = 'natural_protection',
  ECOSYSTEM_TYPE = 'ecosystem_type',
  ENVIRONMENTAL_CONSERVANCY = 'environmental_conservancy',
  INTEREST_SPECIES = 'interest_species',
  LAND_USE = 'land_use',
  BUILDING_COAST_RATIO = 'building_coast_ratio',
  ECONOMIC_ACTIVITY = 'economic_activity',
  ECONOMIC_VALUE = 'economic_value',
  SOCIOCULTURAL_HERITAGE = 'sociocultural_heritage',
  POPULATION_DENSITY = 'population_density',
  INFRASTRUCTURE_DENSITY = 'infrastructure_density',
  CULTURAL_HERITAGE = 'cultural_heritage',
  USE_OF_TERRITORY = 'use_of_territory',
  BEACH_WIDTH = 'beach_width',
  DUNE_WIDTH = 'dune_width',
  VEGETATION_DISTANCE = 'vegetation_distance',
  DISTANCE_BUILT_STRUCTURES = 'distance_built_structures',
  SEA_DEFENCES = 'sea_defences',
  COMMERCIAL_PROPERTIES = 'commercial_properties',
  RESIDENTIAL_PROPERTIES = 'residential_properties'
}

// Parameter mapping between indices
export interface ParameterMapping {
  standardName: StandardParameterNames;
  aliases: string[]; // Different names used in different papers
  description: string;
  commonUnit?: string;
}

export const PARAMETER_MAPPINGS: ParameterMapping[] = [
  {
    standardName: StandardParameterNames.COASTAL_GEOMORPHOLOGY,
    aliases: ['geomorphology', 'coastal_landforms', 'geomorphological_features', 'landform_type'],
    description: 'Coastal landform characteristics affecting vulnerability to erosion and inundation'
  },
  {
    standardName: StandardParameterNames.COASTAL_SLOPE,
    aliases: ['slope', 'coastal_gradient', 'terrain_slope'],
    description: 'Gradient of coastal terrain',
    commonUnit: 'degrees'
  },
  {
    standardName: StandardParameterNames.ROCK_TYPE,
    aliases: ['geology', 'geological_composition', 'bedrock_type'],
    description: 'Geological composition affecting erosion resistance'
  },
  {
    standardName: StandardParameterNames.SEA_LEVEL_CHANGE,
    aliases: ['relative_sea_level_rise', 'slr_rate', 'sea_level_rise'],
    description: 'Rate of relative sea level change',
    commonUnit: 'mm/yr'
  },
  {
    standardName: StandardParameterNames.SHORELINE_CHANGE,
    aliases: ['shoreline_erosion', 'coastal_change', 'erosion_rate'],
    description: 'Historical rate of shoreline migration',
    commonUnit: 'm/yr'
  },
  {
    standardName: StandardParameterNames.MEAN_TIDE_RANGE,
    aliases: ['tidal_range', 'tide_range'],
    description: 'Mean tidal range affecting coastal processes',
    commonUnit: 'm'
  },
  {
    standardName: StandardParameterNames.MEAN_WAVE_HEIGHT,
    aliases: ['wave_height', 'significant_wave_height'],
    description: 'Mean significant wave height',
    commonUnit: 'm'
  },
  {
    standardName: StandardParameterNames.BARRIER_TYPE,
    aliases: ['coastal_barrier', 'barrier_system'],
    description: 'Type of coastal barrier system'
  },
  {
    standardName: StandardParameterNames.SHORELINE_EXPOSURE,
    aliases: ['wave_exposure', 'coastal_exposure'],
    description: 'Degree of exposure to wave energy',
    commonUnit: 'degrees'
  }
];
