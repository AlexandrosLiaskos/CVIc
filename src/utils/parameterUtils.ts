/**
 * Parameter utility functions and types
 * Minimal utilities for parameter categorization and lookup
 */

export enum ParameterCategory {
  PHYSICAL = 'physical',
  HYDROCLIMATE = 'hydroclimate', 
  ENVIRONMENTAL = 'environmental',
  SOCIOECONOMIC = 'socioeconomic',
  SHORELINE = 'shoreline',
  INFRASTRUCTURE = 'infrastructure',
  PHYSICAL_GEOLOGICAL = 'physical_geological'
}

export const PARAMETER_CATEGORY_LABELS: Record<ParameterCategory, string> = {
  [ParameterCategory.PHYSICAL]: 'Physical',
  [ParameterCategory.HYDROCLIMATE]: 'Hydroclimate',
  [ParameterCategory.ENVIRONMENTAL]: 'Environmental', 
  [ParameterCategory.SOCIOECONOMIC]: 'Socioeconomic',
  [ParameterCategory.SHORELINE]: 'Shoreline',
  [ParameterCategory.INFRASTRUCTURE]: 'Infrastructure',
  [ParameterCategory.PHYSICAL_GEOLOGICAL]: 'Physical/Geological'
};

/**
 * Parameter category mapping based on standard parameter names
 * Maps from StandardParameterNames to categories for quick lookup
 */
export const PARAMETER_CATEGORY_MAP: Record<string, ParameterCategory> = {
  // Physical parameters
  'coastal_geomorphology': ParameterCategory.PHYSICAL,
  'coastal_slope': ParameterCategory.PHYSICAL,
  'rock_type': ParameterCategory.PHYSICAL,
  'beach_width': ParameterCategory.PHYSICAL,
  'dune_width': ParameterCategory.PHYSICAL,
  'median_grain_size': ParameterCategory.PHYSICAL_GEOLOGICAL,
  'coastal_geotechnical_map': ParameterCategory.PHYSICAL_GEOLOGICAL,
  
  // Hydroclimate parameters
  'sea_level_change': ParameterCategory.HYDROCLIMATE,
  'mean_tide_range': ParameterCategory.HYDROCLIMATE,
  'mean_wave_height': ParameterCategory.HYDROCLIMATE,
  
  // Shoreline parameters
  'shoreline_change': ParameterCategory.SHORELINE,
  'barrier_type': ParameterCategory.SHORELINE,
  'shoreline_exposure': ParameterCategory.SHORELINE,
  'sea_defences': ParameterCategory.SHORELINE,
  
  // Environmental parameters
  'natural_protection': ParameterCategory.ENVIRONMENTAL,
  'ecosystem_type': ParameterCategory.ENVIRONMENTAL,
  'environmental_conservancy': ParameterCategory.ENVIRONMENTAL,
  'interest_species': ParameterCategory.ENVIRONMENTAL,
  'vegetation_distance': ParameterCategory.ENVIRONMENTAL,
  'posidonia_oceanica': ParameterCategory.ENVIRONMENTAL,
  
  // Socioeconomic parameters
  'population_density': ParameterCategory.SOCIOECONOMIC,
  'economic_value': ParameterCategory.SOCIOECONOMIC,
  'land_use': ParameterCategory.SOCIOECONOMIC,
  'building_coast_ratio': ParameterCategory.SOCIOECONOMIC,
  'sociocultural_heritage': ParameterCategory.SOCIOECONOMIC,
  'cultural_heritage': ParameterCategory.SOCIOECONOMIC,
  'use_of_territory': ParameterCategory.SOCIOECONOMIC,
  'commercial_properties': ParameterCategory.SOCIOECONOMIC,
  'residential_properties': ParameterCategory.SOCIOECONOMIC,
  
  // Infrastructure parameters
  'infrastructure_density': ParameterCategory.INFRASTRUCTURE,
  'distance_built_structures': ParameterCategory.INFRASTRUCTURE
};

/**
 * Get parameter category from standard parameter name
 */
export function getParameterCategory(standardName: string): { category: ParameterCategory; label: string } {
  const category = PARAMETER_CATEGORY_MAP[standardName] || ParameterCategory.PHYSICAL;
  return {
    category,
    label: PARAMETER_CATEGORY_LABELS[category]
  };
}

/**
 * Get parameter category counts from a list of standard parameter names
 */
export function getParameterCategoryCounts(standardNames: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  
  standardNames.forEach(name => {
    const categoryInfo = getParameterCategory(name);
    const categoryLabel = categoryInfo.label;
    counts[categoryLabel] = (counts[categoryLabel] || 0) + 1;
  });
  
  return counts;
}
