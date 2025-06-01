import type { Parameter } from '../types';

export enum ParameterCategory {
  PHYSICAL = 'physical',
  HYDROCLIMATE = 'hydroclimate',
  ENVIRONMENTAL = 'environmental',
  SOCIOECONOMIC = 'socioeconomic',
  SHORELINE = 'shoreline'
}

export const PARAMETER_CATEGORY_LABELS: Record<ParameterCategory, string> = {
  [ParameterCategory.PHYSICAL]: 'Physical',
  [ParameterCategory.HYDROCLIMATE]: 'Hydroclimate',
  [ParameterCategory.ENVIRONMENTAL]: 'Environmental',
  [ParameterCategory.SOCIOECONOMIC]: 'Socioeconomic',
  [ParameterCategory.SHORELINE]: 'Shoreline'
};

export interface StandardParameter extends Parameter {
  category: ParameterCategory;
  aliases: string[]; // Other names this parameter goes by in different indices
  standardId: string; // Unique standardized identifier
}

// Physical Parameters
export const COASTAL_GEOMORPHOLOGY: StandardParameter = {
  id: 'coastal_geomorphology',
  standardId: 'coastal_geomorphology',
  name: 'Coastal Geomorphology',
  category: ParameterCategory.PHYSICAL,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['geomorphology', 'coastal_landforms', 'geomorphological_features', 'landform_type'],
  options: [
    { type: 'categorical', value: 'rocky_cliffs', label: 'Rocky, cliffed coasts / Fiords / Fiards', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'medium_cliffs', label: 'Medium cliffs / Indented coasts', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'low_cliffs', label: 'Low cliffs / Glacial drift / Alluvial plains', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'cobble_beaches', label: 'Cobble beaches / Estuary / Lagoon', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'barrier_beaches', label: 'Barrier beaches / Sand beaches / Salt marsh / Mud flats / Deltas / Mangrove / Coral reefs', color: '#d73027', vulnerability: 5 }
  ]
};

export const COASTAL_SLOPE: StandardParameter = {
  id: 'coastal_slope',
  standardId: 'coastal_slope',
  name: 'Coastal Slope',
  category: ParameterCategory.PHYSICAL,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: '%',
  aliases: ['slope', 'coastal_gradient', 'shore_slope', 'beach_slope'],
  vulnerabilityRanges: [
    { value: 1, min: 12.0, max: null, label: 'Very Low', color: '#1a9850' },
    { value: 2, min: 9.0, max: 12.0, label: 'Low', color: '#91cf60' },
    { value: 3, min: 6.0, max: 9.0, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 3.0, max: 6.0, label: 'High', color: '#fc8d59' },
    { value: 5, min: null, max: 3.0, label: 'Very High', color: '#d73027' }
  ]
};

export const ROCK_TYPE: StandardParameter = {
  id: 'rock_type',
  standardId: 'rock_type',
  name: 'Rock Type / Geology',
  category: ParameterCategory.PHYSICAL,
  type: 'categorical',
  weight: 1/9,
  enabled: false,
  aliases: ['geology', 'geological_type', 'bedrock_type', 'lithology'],
  options: [
    { type: 'categorical', value: 'hard_rock', label: 'Hard crystalline rocks', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'medium_rock', label: 'Medium hard sedimentary rocks', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'soft_rock', label: 'Soft sedimentary rocks', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'unconsolidated', label: 'Unconsolidated sediments', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'very_soft', label: 'Very soft/loose sediments', color: '#d73027', vulnerability: 5 }
  ]
};

// Hydroclimate Parameters
export const SEA_LEVEL_CHANGE: StandardParameter = {
  id: 'sea_level_change',
  standardId: 'sea_level_change',
  name: 'Relative Sea-level Change',
  category: ParameterCategory.HYDROCLIMATE,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: 'mm/yr',
  aliases: ['relative_sea_level_rise', 'sea_level_rise', 'slr_rate', 'relative_slr'],
  vulnerabilityRanges: [
    { value: 1, min: null, max: 1.8, label: 'Very Low', color: '#1a9850' },
    { value: 2, min: 1.8, max: 2.5, label: 'Low', color: '#91cf60' },
    { value: 3, min: 2.5, max: 3.0, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 3.0, max: 3.4, label: 'High', color: '#fc8d59' },
    { value: 5, min: 3.4, max: null, label: 'Very High', color: '#d73027' }
  ]
};

export const MEAN_TIDE_RANGE: StandardParameter = {
  id: 'mean_tide_range',
  standardId: 'mean_tide_range',
  name: 'Mean Tide Range',
  category: ParameterCategory.HYDROCLIMATE,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: 'm',
  aliases: ['tidal_range', 'tide_range', 'mean_tidal_range'],
  vulnerabilityRanges: [
    { value: 1, min: 6.0, max: null, label: 'Very Low', color: '#1a9850' },
    { value: 2, min: 4.0, max: 6.0, label: 'Low', color: '#91cf60' },
    { value: 3, min: 2.0, max: 4.0, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 1.0, max: 2.0, label: 'High', color: '#fc8d59' },
    { value: 5, min: null, max: 1.0, label: 'Very High', color: '#d73027' }
  ]
};

export const MEAN_WAVE_HEIGHT: StandardParameter = {
  id: 'mean_wave_height',
  standardId: 'mean_wave_height',
  name: 'Mean Wave Height',
  category: ParameterCategory.HYDROCLIMATE,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: 'm',
  aliases: ['wave_height', 'significant_wave_height', 'mean_wave_height'],
  vulnerabilityRanges: [
    { value: 1, min: null, max: 0.55, label: 'Very Low', color: '#1a9850' },
    { value: 2, min: 0.55, max: 0.85, label: 'Low', color: '#91cf60' },
    { value: 3, min: 0.85, max: 1.05, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 1.05, max: 1.25, label: 'High', color: '#fc8d59' },
    { value: 5, min: 1.25, max: null, label: 'Very High', color: '#d73027' }
  ]
};

// Shoreline Parameters
export const SHORELINE_CHANGE: StandardParameter = {
  id: 'shoreline_change',
  standardId: 'shoreline_change',
  name: 'Shoreline Change Rate',
  category: ParameterCategory.SHORELINE,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: 'm/yr',
  aliases: ['shoreline_erosion', 'erosion_rate', 'shoreline_migration', 'coastal_erosion'],
  vulnerabilityRanges: [
    { value: 1, min: 2.0, max: null, label: 'Very Low', color: '#1a9850' },
    { value: 2, min: 1.0, max: 2.0, label: 'Low', color: '#91cf60' },
    { value: 3, min: -1.0, max: 1.0, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: -1.1, max: -2.0, label: 'High', color: '#fc8d59' },
    { value: 5, min: null, max: -2.0, label: 'Very High', color: '#d73027' }
  ]
};

// Additional Shoreline Parameters
export const BARRIER_TYPE: StandardParameter = {
  id: 'barrier_type',
  standardId: 'barrier_type',
  name: 'Barrier Type',
  category: ParameterCategory.SHORELINE,
  type: 'categorical',
  weight: 1/9,
  enabled: false,
  aliases: ['coastal_protection', 'protection_type', 'barrier_system'],
  options: [
    { type: 'categorical', value: 'hard_protection', label: 'Hard coastal protection structures', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'natural_barrier', label: 'Natural barriers (reefs, islands)', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'vegetation', label: 'Vegetation barriers (mangroves)', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'soft_protection', label: 'Soft protection (beach nourishment)', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'no_protection', label: 'No protection/barriers', color: '#d73027', vulnerability: 5 }
  ]
};

export const SHORELINE_EXPOSURE: StandardParameter = {
  id: 'shoreline_exposure',
  standardId: 'shoreline_exposure',
  name: 'Shoreline Exposure',
  category: ParameterCategory.SHORELINE,
  type: 'categorical',
  weight: 1/9,
  enabled: false,
  aliases: ['wave_exposure', 'coastal_exposure', 'fetch'],
  options: [
    { type: 'categorical', value: 'very_sheltered', label: 'Very sheltered (enclosed bays)', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'sheltered', label: 'Sheltered (partial protection)', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'semi_exposed', label: 'Semi-exposed', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'exposed', label: 'Exposed to open ocean', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'very_exposed', label: 'Very exposed (headlands)', color: '#d73027', vulnerability: 5 }
  ]
};

// Socioeconomic Parameters
export const POPULATION_DENSITY: StandardParameter = {
  id: 'population_density',
  standardId: 'population_density',
  name: 'Population Density',
  description: 'Population density in coastal zone',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: 'people/km²',
  aliases: ['population', 'demographic_density', 'inhabitants_density'],
  vulnerabilityRanges: [
    { value: 1, min: null, max: 50, label: 'Very Low', color: '#1a9850' },
    { value: 2, min: 50, max: 200, label: 'Low', color: '#91cf60' },
    { value: 3, min: 200, max: 500, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 500, max: 1000, label: 'High', color: '#fc8d59' },
    { value: 5, min: 1000, max: null, label: 'Very High', color: '#d73027' }
  ]
};

export const ECONOMIC_VALUE: StandardParameter = {
  id: 'economic_value',
  standardId: 'economic_value',
  name: 'Economic Value',
  description: 'Economic value of coastal assets',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['asset_value', 'economic_assets', 'property_value'],
  options: [
    { type: 'categorical', value: 'very_low', label: 'Very Low Economic Value', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'low', label: 'Low Economic Value', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'moderate', label: 'Moderate Economic Value', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'high', label: 'High Economic Value', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'very_high', label: 'Very High Economic Value', color: '#d73027', vulnerability: 5 }
  ]
};

// Environmental Parameters
export const LAND_USE: StandardParameter = {
  id: 'land_use',
  standardId: 'land_use',
  name: 'Land Use',
  description: 'Dominant land use type in coastal zone',
  category: ParameterCategory.ENVIRONMENTAL,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['land_cover', 'land_use_type', 'coastal_land_use'],
  options: [
    { type: 'categorical', value: 'natural', label: 'Natural/Protected areas', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'forest', label: 'Forest/Vegetation', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'agriculture', label: 'Agricultural', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'residential', label: 'Residential', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'urban_industrial', label: 'Urban/Industrial', color: '#d73027', vulnerability: 5 }
  ]
};

// Additional Socioeconomic Parameters
export const INFRASTRUCTURE_DENSITY: StandardParameter = {
  id: 'infrastructure_density',
  standardId: 'infrastructure_density',
  name: 'Infrastructure Density',
  description: 'Density of critical infrastructure in coastal zone',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['infrastructure', 'critical_infrastructure', 'built_infrastructure'],
  options: [
    { type: 'categorical', value: 'very_low', label: 'Very Low Infrastructure', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'low', label: 'Low Infrastructure', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'moderate', label: 'Moderate Infrastructure', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'high', label: 'High Infrastructure', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'very_high', label: 'Very High Infrastructure', color: '#d73027', vulnerability: 5 }
  ]
};

export const ROAD_DENSITY: StandardParameter = {
  id: 'road_density',
  standardId: 'road_density',
  name: 'Road Density',
  description: 'Density of roads and transportation networks',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: 'km/km²',
  aliases: ['transportation_density', 'road_network', 'transport_infrastructure'],
  vulnerabilityRanges: [
    { value: 1, min: null, max: 0.5, label: 'Very Low', color: '#1a9850' },
    { value: 2, min: 0.5, max: 1.0, label: 'Low', color: '#91cf60' },
    { value: 3, min: 1.0, max: 2.0, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 2.0, max: 4.0, label: 'High', color: '#fc8d59' },
    { value: 5, min: 4.0, max: null, label: 'Very High', color: '#d73027' }
  ]
};

// Socioeconomic Parameters
export const SOCIAL_VULNERABILITY: StandardParameter = {
  id: 'social_vulnerability',
  standardId: 'social_vulnerability',
  name: 'Social Vulnerability',
  description: 'Social vulnerability index based on demographics',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['social_index', 'demographic_vulnerability', 'social_factors'],
  options: [
    { type: 'categorical', value: 'very_low', label: 'Very Low Social Vulnerability', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'low', label: 'Low Social Vulnerability', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'moderate', label: 'Moderate Social Vulnerability', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'high', label: 'High Social Vulnerability', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'very_high', label: 'Very High Social Vulnerability', color: '#d73027', vulnerability: 5 }
  ]
};

export const CULTURAL_HERITAGE: StandardParameter = {
  id: 'cultural_heritage',
  standardId: 'cultural_heritage',
  name: 'Cultural Heritage Value',
  description: 'Value of cultural and historical assets',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['heritage_value', 'cultural_assets', 'historical_value'],
  options: [
    { type: 'categorical', value: 'none', label: 'No Cultural Heritage', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'low', label: 'Low Heritage Value', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'moderate', label: 'Moderate Heritage Value', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'high', label: 'High Heritage Value', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'very_high', label: 'Very High Heritage Value', color: '#d73027', vulnerability: 5 }
  ]
};

// Environmental Parameters
export const ECOSYSTEM_SERVICES: StandardParameter = {
  id: 'ecosystem_services',
  standardId: 'ecosystem_services',
  name: 'Ecosystem Services',
  description: 'Value of ecosystem services provided',
  category: ParameterCategory.ENVIRONMENTAL,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['ecosystem_value', 'natural_services', 'ecological_services'],
  options: [
    { type: 'categorical', value: 'very_low', label: 'Very Low Ecosystem Services', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'low', label: 'Low Ecosystem Services', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'moderate', label: 'Moderate Ecosystem Services', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'high', label: 'High Ecosystem Services', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'very_high', label: 'Very High Ecosystem Services', color: '#d73027', vulnerability: 5 }
  ]
};

export const VEGETATION_DISTANCE: StandardParameter = {
  id: 'vegetation_distance',
  standardId: 'vegetation_distance',
  name: 'Distance to Vegetation',
  description: 'Distance from shoreline to protective vegetation',
  category: ParameterCategory.ENVIRONMENTAL,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: 'm',
  aliases: ['vegetation_buffer', 'natural_protection', 'vegetation_cover'],
  vulnerabilityRanges: [
    { value: 1, min: null, max: 50, label: 'Very Close', color: '#1a9850' },
    { value: 2, min: 50, max: 100, label: 'Close', color: '#91cf60' },
    { value: 3, min: 100, max: 200, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 200, max: 500, label: 'Far', color: '#fc8d59' },
    { value: 5, min: 500, max: null, label: 'Very Far', color: '#d73027' }
  ]
};

// Additional parameters for comprehensive indices
export const COASTAL_ELEVATION: StandardParameter = {
  id: 'coastal_elevation',
  standardId: 'coastal_elevation',
  name: 'Coastal Elevation',
  description: 'Average elevation of coastal zone above sea level',
  category: ParameterCategory.PHYSICAL,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: 'm',
  aliases: ['elevation', 'coastal_height', 'land_elevation'],
  vulnerabilityRanges: [
    { value: 1, min: 20, max: null, label: 'Very High', color: '#1a9850' },
    { value: 2, min: 10, max: 20, label: 'High', color: '#91cf60' },
    { value: 3, min: 5, max: 10, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 2, max: 5, label: 'Low', color: '#fc8d59' },
    { value: 5, min: null, max: 2, label: 'Very Low', color: '#d73027' }
  ]
};

export const BEACH_WIDTH: StandardParameter = {
  id: 'beach_width',
  standardId: 'beach_width',
  name: 'Beach Width',
  description: 'Width of beach from high tide to backshore',
  category: ParameterCategory.PHYSICAL,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: 'm',
  aliases: ['beach_distance', 'shore_width', 'beach_extent'],
  vulnerabilityRanges: [
    { value: 1, min: 100, max: null, label: 'Very Wide', color: '#1a9850' },
    { value: 2, min: 50, max: 100, label: 'Wide', color: '#91cf60' },
    { value: 3, min: 25, max: 50, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 10, max: 25, label: 'Narrow', color: '#fc8d59' },
    { value: 5, min: null, max: 10, label: 'Very Narrow', color: '#d73027' }
  ]
};

export const DUNE_WIDTH: StandardParameter = {
  id: 'dune_width',
  standardId: 'dune_width',
  name: 'Dune Width',
  description: 'Width of coastal dune system',
  category: ParameterCategory.PHYSICAL,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: 'm',
  aliases: ['dune_distance', 'dune_extent', 'dune_system_width'],
  vulnerabilityRanges: [
    { value: 1, min: 200, max: null, label: 'Very Wide', color: '#1a9850' },
    { value: 2, min: 100, max: 200, label: 'Wide', color: '#91cf60' },
    { value: 3, min: 50, max: 100, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 20, max: 50, label: 'Narrow', color: '#fc8d59' },
    { value: 5, min: null, max: 20, label: 'Very Narrow/None', color: '#d73027' }
  ]
};

export const SEA_DEFENCES: StandardParameter = {
  id: 'sea_defences',
  standardId: 'sea_defences',
  name: 'Sea Defences',
  description: 'Type and effectiveness of coastal protection structures',
  category: ParameterCategory.SHORELINE,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['coastal_defences', 'protection_structures', 'coastal_protection'],
  options: [
    { type: 'categorical', value: 'hard_defences', label: 'Hard defences (seawalls, breakwaters)', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'mixed_defences', label: 'Mixed hard/soft defences', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'soft_defences', label: 'Soft defences (beach nourishment)', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'natural_defences', label: 'Natural defences only', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'no_defences', label: 'No coastal defences', color: '#d73027', vulnerability: 5 }
  ]
};

// Additional socioeconomic parameters for comprehensive assessment tools
export const HOUSEHOLD_COMPOSITION: StandardParameter = {
  id: 'household_composition',
  standardId: 'household_composition',
  name: 'Household Composition & Disability',
  description: 'Household structure and disability status affecting vulnerability',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/8,
  enabled: false,
  aliases: ['household_structure', 'family_composition', 'disability_status'],
  options: [
    { type: 'categorical', value: 'low_vulnerability', label: 'Low Vulnerability Households', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'moderate_low', label: 'Moderate-Low Vulnerability', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'moderate', label: 'Moderate Vulnerability', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'moderate_high', label: 'Moderate-High Vulnerability', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'high_vulnerability', label: 'High Vulnerability Households', color: '#d73027', vulnerability: 5 }
  ]
};

export const MINORITY_STATUS: StandardParameter = {
  id: 'minority_status',
  standardId: 'minority_status',
  name: 'Minority Status & Language',
  description: 'Minority status and language barriers affecting vulnerability',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/8,
  enabled: false,
  aliases: ['ethnicity', 'language_barriers', 'minority_groups'],
  options: [
    { type: 'categorical', value: 'low_vulnerability', label: 'Low Language/Minority Vulnerability', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'moderate_low', label: 'Moderate-Low Vulnerability', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'moderate', label: 'Moderate Vulnerability', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'moderate_high', label: 'Moderate-High Vulnerability', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'high_vulnerability', label: 'High Language/Minority Vulnerability', color: '#d73027', vulnerability: 5 }
  ]
};

export const HOUSING_TYPE: StandardParameter = {
  id: 'housing_type',
  standardId: 'housing_type',
  name: 'Housing Type & Transportation',
  description: 'Housing quality and transportation access affecting vulnerability',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/8,
  enabled: false,
  aliases: ['housing_quality', 'transportation_access', 'housing_transportation'],
  options: [
    { type: 'categorical', value: 'high_quality', label: 'High Quality Housing & Transport', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'good_quality', label: 'Good Quality Housing & Transport', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'moderate_quality', label: 'Moderate Quality', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'poor_quality', label: 'Poor Quality Housing & Transport', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'very_poor', label: 'Very Poor Housing & Transport', color: '#d73027', vulnerability: 5 }
  ]
};

export const AGE_DEMOGRAPHICS: StandardParameter = {
  id: 'age_demographics',
  standardId: 'age_demographics',
  name: 'Age Demographics',
  description: 'Age distribution affecting community vulnerability',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/8,
  enabled: false,
  aliases: ['age_distribution', 'elderly_population', 'age_structure'],
  options: [
    { type: 'categorical', value: 'low_vulnerability', label: 'Low Age Vulnerability', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'moderate_low', label: 'Moderate-Low Vulnerability', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'moderate', label: 'Moderate Vulnerability', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'moderate_high', label: 'Moderate-High Vulnerability', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'high_vulnerability', label: 'High Age Vulnerability', color: '#d73027', vulnerability: 5 }
  ]
};

export const LIVELIHOOD_STRATEGIES: StandardParameter = {
  id: 'livelihood_strategies',
  standardId: 'livelihood_strategies',
  name: 'Livelihood Strategies',
  description: 'Diversity and resilience of livelihood strategies',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/9,
  enabled: false,
  aliases: ['income_sources', 'employment_diversity', 'livelihood_diversity'],
  options: [
    { type: 'categorical', value: 'highly_diverse', label: 'Highly Diverse Livelihoods', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'diverse', label: 'Diverse Livelihoods', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'moderate', label: 'Moderate Diversity', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'limited', label: 'Limited Livelihood Options', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'very_limited', label: 'Very Limited/Single Source', color: '#d73027', vulnerability: 5 }
  ]
};

export const FOOD_SECURITY: StandardParameter = {
  id: 'food_security',
  standardId: 'food_security',
  name: 'Food Security',
  description: 'Access to adequate and nutritious food',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/9,
  enabled: false,
  aliases: ['food_access', 'nutrition_security', 'food_availability'],
  options: [
    { type: 'categorical', value: 'highly_secure', label: 'Highly Food Secure', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'secure', label: 'Food Secure', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'moderate', label: 'Moderate Food Security', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'insecure', label: 'Food Insecure', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'highly_insecure', label: 'Highly Food Insecure', color: '#d73027', vulnerability: 5 }
  ]
};

export const WATER_SECURITY: StandardParameter = {
  id: 'water_security',
  standardId: 'water_security',
  name: 'Water Security',
  description: 'Access to safe and adequate water supply',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/9,
  enabled: false,
  aliases: ['water_access', 'water_quality', 'water_availability'],
  options: [
    { type: 'categorical', value: 'highly_secure', label: 'Highly Water Secure', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'secure', label: 'Water Secure', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'moderate', label: 'Moderate Water Security', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'insecure', label: 'Water Insecure', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'highly_insecure', label: 'Highly Water Insecure', color: '#d73027', vulnerability: 5 }
  ]
};

export const NATURAL_PROTECTION: StandardParameter = {
  id: 'natural_protection',
  standardId: 'natural_protection',
  name: 'Natural Protection',
  category: ParameterCategory.ENVIRONMENTAL,
  type: 'categorical',
  weight: 1/7,
  enabled: false,
  aliases: ['beach_protection', 'natural_defenses', 'coastal_protection_features'],
  options: [
    { type: 'categorical', value: 'submerged_hard', label: 'Submerged hard features (beachrocks, platforms)', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'stabilized_dunes', label: 'Stabilized sand dunes, coastal lagoons, wetlands', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'unstabilized_dunes', label: 'Unstabilized sand dunes, uplifted reefs (beachrocks)', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'gravel_berms', label: 'Beaches with gravels, berms', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'sandy_low', label: 'Sandy low lying beaches', color: '#d73027', vulnerability: 5 }
  ]
};

// ICVI-specific parameters (0-1 scale)
export const ECOSYSTEM_TYPE: StandardParameter = {
  id: 'ecosystem_type',
  standardId: 'ecosystem_type',
  name: 'Ecosystem Type',
  category: ParameterCategory.ENVIRONMENTAL,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['habitat_type', 'coastal_ecosystem', 'ecosystem_classification'],
  options: [
    { type: 'categorical', value: 'rocky_reef', label: 'Rocky reef systems', color: '#1a9850', vulnerability: 0.0 },
    { type: 'categorical', value: 'coral_reef', label: 'Coral reef systems', color: '#91cf60', vulnerability: 0.25 },
    { type: 'categorical', value: 'seagrass', label: 'Seagrass beds', color: '#fee08b', vulnerability: 0.5 },
    { type: 'categorical', value: 'mangrove', label: 'Mangrove forests', color: '#fc8d59', vulnerability: 0.75 },
    { type: 'categorical', value: 'sandy_beach', label: 'Sandy beach systems', color: '#d73027', vulnerability: 1.0 }
  ]
};

export const ENVIRONMENTAL_CONSERVANCY: StandardParameter = {
  id: 'environmental_conservancy',
  standardId: 'environmental_conservancy',
  name: 'Environmental Conservancy Measures',
  category: ParameterCategory.ENVIRONMENTAL,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['conservation_measures', 'protection_status', 'environmental_protection'],
  options: [
    { type: 'categorical', value: 'strict_protection', label: 'Strict nature reserves', color: '#1a9850', vulnerability: 0.0 },
    { type: 'categorical', value: 'national_park', label: 'National parks', color: '#91cf60', vulnerability: 0.25 },
    { type: 'categorical', value: 'managed_reserve', label: 'Managed nature reserves', color: '#fee08b', vulnerability: 0.5 },
    { type: 'categorical', value: 'limited_protection', label: 'Limited protection areas', color: '#fc8d59', vulnerability: 0.75 },
    { type: 'categorical', value: 'no_protection', label: 'No environmental protection', color: '#d73027', vulnerability: 1.0 }
  ]
};

export const INTEREST_SPECIES: StandardParameter = {
  id: 'interest_species',
  standardId: 'interest_species',
  name: 'Presence of Interest Species',
  category: ParameterCategory.ENVIRONMENTAL,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['endangered_species', 'species_of_interest', 'biodiversity_value'],
  options: [
    { type: 'categorical', value: 'high_biodiversity', label: 'High biodiversity with endemic species', color: '#1a9850', vulnerability: 0.0 },
    { type: 'categorical', value: 'moderate_biodiversity', label: 'Moderate biodiversity', color: '#91cf60', vulnerability: 0.25 },
    { type: 'categorical', value: 'common_species', label: 'Common species only', color: '#fee08b', vulnerability: 0.5 },
    { type: 'categorical', value: 'low_biodiversity', label: 'Low biodiversity', color: '#fc8d59', vulnerability: 0.75 },
    { type: 'categorical', value: 'degraded_habitat', label: 'Degraded habitat', color: '#d73027', vulnerability: 1.0 }
  ]
};

// ICVI Socioeconomic parameters (0-1 scale)
export const USE_OF_TERRITORY: StandardParameter = {
  id: 'use_of_territory',
  standardId: 'use_of_territory',
  name: 'Use of Territory',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['territory_use', 'land_utilization', 'territorial_use'],
  options: [
    { type: 'categorical', value: 'natural_protected', label: 'Natural protected areas', color: '#1a9850', vulnerability: 0.0 },
    { type: 'categorical', value: 'extensive_agriculture', label: 'Extensive agriculture', color: '#91cf60', vulnerability: 0.25 },
    { type: 'categorical', value: 'intensive_agriculture', label: 'Intensive agriculture', color: '#fee08b', vulnerability: 0.5 },
    { type: 'categorical', value: 'urban_residential', label: 'Urban residential', color: '#fc8d59', vulnerability: 0.75 },
    { type: 'categorical', value: 'industrial_commercial', label: 'Industrial/Commercial', color: '#d73027', vulnerability: 1.0 }
  ]
};

export const BUILDING_COAST_RATIO: StandardParameter = {
  id: 'building_coast_ratio',
  standardId: 'building_coast_ratio',
  name: 'Building Coast Ratio',
  category: ParameterCategory.INFRASTRUCTURE,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: 'ratio',
  aliases: ['built_coast_ratio', 'construction_ratio', 'development_ratio'],
  vulnerabilityRanges: [
    { value: 0.0, min: null, max: 0.1, label: 'Very Low', color: '#1a9850' },
    { value: 0.25, min: 0.1, max: 0.3, label: 'Low', color: '#91cf60' },
    { value: 0.5, min: 0.3, max: 0.5, label: 'Moderate', color: '#fee08b' },
    { value: 0.75, min: 0.5, max: 0.7, label: 'High', color: '#fc8d59' },
    { value: 1.0, min: 0.7, max: null, label: 'Very High', color: '#d73027' }
  ]
};

export const SOCIOCULTURAL_HERITAGE: StandardParameter = {
  id: 'sociocultural_heritage',
  standardId: 'sociocultural_heritage',
  name: 'Sociocultural Heritage',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'categorical',
  weight: 1/6,
  enabled: false,
  aliases: ['cultural_heritage_value', 'heritage_significance', 'cultural_importance'],
  options: [
    { type: 'categorical', value: 'world_heritage', label: 'World Heritage Sites', color: '#1a9850', vulnerability: 0.0 },
    { type: 'categorical', value: 'national_heritage', label: 'National Heritage Sites', color: '#91cf60', vulnerability: 0.25 },
    { type: 'categorical', value: 'regional_heritage', label: 'Regional Heritage Sites', color: '#fee08b', vulnerability: 0.5 },
    { type: 'categorical', value: 'local_heritage', label: 'Local Heritage Sites', color: '#fc8d59', vulnerability: 0.75 },
    { type: 'categorical', value: 'no_heritage', label: 'No Heritage Significance', color: '#d73027', vulnerability: 1.0 }
  ]
};

// PCVI/ECVI specific parameters
export const DISTANCE_BUILT_STRUCTURES: StandardParameter = {
  id: 'distance_built_structures',
  standardId: 'distance_built_structures',
  name: 'Distance of Built Structures behind Back Beach',
  category: ParameterCategory.INFRASTRUCTURE,
  type: 'numerical',
  weight: 1/6,
  enabled: false,
  unit: 'm',
  aliases: ['built_structure_distance', 'development_distance', 'structure_setback'],
  vulnerabilityRanges: [
    { value: 1, min: 500, max: null, label: 'Very Low', color: '#1a9850' },
    { value: 2, min: 200, max: 500, label: 'Low', color: '#91cf60' },
    { value: 3, min: 100, max: 200, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 50, max: 100, label: 'High', color: '#fc8d59' },
    { value: 5, min: null, max: 50, label: 'Very High', color: '#d73027' }
  ]
};

export const COMMERCIAL_PROPERTIES: StandardParameter = {
  id: 'commercial_properties',
  standardId: 'commercial_properties',
  name: 'Commercial Properties',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'numerical',
  weight: 1/4,
  enabled: false,
  unit: 'count/km²',
  aliases: ['commercial_density', 'business_properties', 'commercial_buildings'],
  vulnerabilityRanges: [
    { value: 1, min: null, max: 5, label: 'Very Low', color: '#1a9850' },
    { value: 2, min: 5, max: 15, label: 'Low', color: '#91cf60' },
    { value: 3, min: 15, max: 30, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 30, max: 50, label: 'High', color: '#fc8d59' },
    { value: 5, min: 50, max: null, label: 'Very High', color: '#d73027' }
  ]
};

export const RESIDENTIAL_PROPERTIES: StandardParameter = {
  id: 'residential_properties',
  standardId: 'residential_properties',
  name: 'Residential Properties',
  category: ParameterCategory.SOCIOECONOMIC,
  type: 'numerical',
  weight: 1/4,
  enabled: false,
  unit: 'count/km²',
  aliases: ['residential_density', 'housing_density', 'residential_buildings'],
  vulnerabilityRanges: [
    { value: 1, min: null, max: 20, label: 'Very Low', color: '#1a9850' },
    { value: 2, min: 20, max: 50, label: 'Low', color: '#91cf60' },
    { value: 3, min: 50, max: 100, label: 'Moderate', color: '#fee08b' },
    { value: 4, min: 100, max: 200, label: 'High', color: '#fc8d59' },
    { value: 5, min: 200, max: null, label: 'Very High', color: '#d73027' }
  ]
};

// GCVI-specific parameters
export const MEDIAN_GRAIN_SIZE: StandardParameter = {
  id: 'median_grain_size',
  standardId: 'median_grain_size',
  name: 'Median Grain Size (D50)',
  category: ParameterCategory.PHYSICAL_GEOLOGICAL,
  type: 'numerical',
  weight: 1/7,
  enabled: false,
  unit: 'mm',
  aliases: ['d50', 'grain_size', 'sediment_size'],
  vulnerabilityRanges: [
    { value: 1, min: 2.0, max: null, label: 'Very Coarse', color: '#1a9850' },
    { value: 2, min: 0.5, max: 2.0, label: 'Coarse', color: '#91cf60' },
    { value: 3, min: 0.25, max: 0.5, label: 'Medium', color: '#fee08b' },
    { value: 4, min: 0.125, max: 0.25, label: 'Fine', color: '#fc8d59' },
    { value: 5, min: null, max: 0.125, label: 'Very Fine', color: '#d73027' }
  ]
};

export const POSIDONIA_OCEANICA: StandardParameter = {
  id: 'posidonia_oceanica',
  standardId: 'posidonia_oceanica',
  name: 'Posidonia Oceanica',
  category: ParameterCategory.ENVIRONMENTAL,
  type: 'categorical',
  weight: 1/7,
  enabled: false,
  aliases: ['seagrass_coverage', 'posidonia_presence', 'seagrass_beds'],
  options: [
    { type: 'categorical', value: 'dense_coverage', label: 'Dense Posidonia coverage', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'moderate_coverage', label: 'Moderate coverage', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'sparse_coverage', label: 'Sparse coverage', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'degraded_coverage', label: 'Degraded coverage', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'no_coverage', label: 'No Posidonia coverage', color: '#d73027', vulnerability: 5 }
  ]
};

export const COASTAL_GEOTECHNICAL_MAP: StandardParameter = {
  id: 'coastal_geotechnical_map',
  standardId: 'coastal_geotechnical_map',
  name: 'Coastal Geotechnical Map',
  category: ParameterCategory.PHYSICAL_GEOLOGICAL,
  type: 'categorical',
  weight: 1/7,
  enabled: false,
  aliases: ['geotechnical_classification', 'soil_type', 'geotechnical_properties'],
  options: [
    { type: 'categorical', value: 'hard_rock', label: 'Hard rock formations', color: '#1a9850', vulnerability: 1 },
    { type: 'categorical', value: 'soft_rock', label: 'Soft rock formations', color: '#91cf60', vulnerability: 2 },
    { type: 'categorical', value: 'dense_soil', label: 'Dense cohesive soils', color: '#fee08b', vulnerability: 3 },
    { type: 'categorical', value: 'loose_soil', label: 'Loose cohesive soils', color: '#fc8d59', vulnerability: 4 },
    { type: 'categorical', value: 'very_loose', label: 'Very loose/unconsolidated', color: '#d73027', vulnerability: 5 }
  ]
};

// Master parameter registry
export const STANDARD_PARAMETERS: StandardParameter[] = [
  COASTAL_GEOMORPHOLOGY,
  COASTAL_SLOPE,
  ROCK_TYPE,
  SEA_LEVEL_CHANGE,
  MEAN_TIDE_RANGE,
  MEAN_WAVE_HEIGHT,
  SHORELINE_CHANGE,
  BARRIER_TYPE,
  SHORELINE_EXPOSURE,
  POPULATION_DENSITY,
  ECONOMIC_VALUE,
  LAND_USE,
  INFRASTRUCTURE_DENSITY,
  ROAD_DENSITY,
  SOCIAL_VULNERABILITY,
  CULTURAL_HERITAGE,
  ECOSYSTEM_SERVICES,
  VEGETATION_DISTANCE,
  COASTAL_ELEVATION,
  BEACH_WIDTH,
  DUNE_WIDTH,
  SEA_DEFENCES,
  HOUSEHOLD_COMPOSITION,
  MINORITY_STATUS,
  HOUSING_TYPE,
  AGE_DEMOGRAPHICS,
  LIVELIHOOD_STRATEGIES,
  FOOD_SECURITY,
  WATER_SECURITY,
  NATURAL_PROTECTION,
  // ICVI parameters
  ECOSYSTEM_TYPE,
  ENVIRONMENTAL_CONSERVANCY,
  INTEREST_SPECIES,
  USE_OF_TERRITORY,
  BUILDING_COAST_RATIO,
  SOCIOCULTURAL_HERITAGE,
  // PCVI/ECVI parameters
  DISTANCE_BUILT_STRUCTURES,
  COMMERCIAL_PROPERTIES,
  RESIDENTIAL_PROPERTIES,
  // GCVI parameters
  MEDIAN_GRAIN_SIZE,
  POSIDONIA_OCEANICA,
  COASTAL_GEOTECHNICAL_MAP
];

export const getParametersByCategory = (category: ParameterCategory): StandardParameter[] => {
  return STANDARD_PARAMETERS.filter(param => param.category === category);
};

export const getParameterById = (id: string): StandardParameter | undefined => {
  return STANDARD_PARAMETERS.find(param => param.id === id || param.standardId === id);
};

export const getParameterByAlias = (alias: string): StandardParameter | undefined => {
  return STANDARD_PARAMETERS.find(param =>
    param.aliases.includes(alias) || param.id === alias || param.standardId === alias
  );
};
