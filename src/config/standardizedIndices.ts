import {
  StandardizedCoastalIndex,
  IndexSpecificParameter,
  ValidationRule,
  StandardParameterNames
} from '../types/indexSpecificTypes';

// CVI (Thieler & Hammar-Klose, 1999) - Complete with exact ranking table
const CVI_PARAMETERS: IndexSpecificParameter[] = [
  {
    id: 'cvi_coastal_geomorphology',
    standardName: StandardParameterNames.COASTAL_GEOMORPHOLOGY,
    indexId: 'cvi-thieler-1999',
    indexSpecificName: 'Geomorphology',
    description: 'Coastal landform type',
    type: 'categorical',
    weight: 1/6,
    required: true,
    rankingTable: [
      { value: 1, criteria: 'Rocky, cliffed coasts / Fiords / Fiards', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: 'Medium cliffs / Indented coasts', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: 'Low cliffs / Glacial drift / Alluvial plains', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: 'Cobble beaches / Estuary / Lagoon', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: 'Barrier beaches / Sand beaches / Salt marsh / Mud flats / Deltas / Mangrove / Coral reefs', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'cvi_coastal_slope',
    standardName: StandardParameterNames.COASTAL_SLOPE,
    indexId: 'cvi-thieler-1999',
    indexSpecificName: 'Coastal Slope',
    description: 'Regional coastal slope',
    type: 'numerical',
    unit: '%',
    weight: 1/6,
    required: true,
    rankingTable: [
      { value: 1, criteria: '>14.7%', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: '10.9-14.6%', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: '7.2-10.8%', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: '3.6-7.1%', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: '<3.5%', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'cvi_sea_level_change',
    standardName: StandardParameterNames.SEA_LEVEL_CHANGE,
    indexId: 'cvi-thieler-1999',
    indexSpecificName: 'Relative Sea Level Change',
    description: 'Historical rate of relative sea level change',
    type: 'numerical',
    unit: 'mm/yr',
    weight: 1/6,
    required: true,
    rankingTable: [
      { value: 1, criteria: '<1.8 mm/yr', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: '1.8-2.5 mm/yr', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: '2.5-3.4 mm/yr', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: '3.4-4.6 mm/yr', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: '>4.6 mm/yr', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'cvi_shoreline_change',
    standardName: StandardParameterNames.SHORELINE_CHANGE,
    indexId: 'cvi-thieler-1999',
    indexSpecificName: 'Shoreline Erosion/Accretion Rate',
    description: 'Historical shoreline change rate',
    type: 'numerical',
    unit: 'm/yr',
    weight: 1/6,
    required: true,
    rankingTable: [
      { value: 1, criteria: '>2.0 m/yr (accretion)', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: '1.0-2.0 m/yr (accretion)', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: '-1.0 to +1.0 m/yr (stable)', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: '-2.0 to -1.0 m/yr (erosion)', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: '<-2.0 m/yr (erosion)', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'cvi_mean_tide_range',
    standardName: StandardParameterNames.MEAN_TIDE_RANGE,
    indexId: 'cvi-thieler-1999',
    indexSpecificName: 'Mean Tide Range',
    description: 'Mean tidal range',
    type: 'numerical',
    unit: 'm',
    weight: 1/6,
    required: true,
    rankingTable: [
      { value: 1, criteria: '>6.0 m', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: '4.1-6.0 m', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: '2.1-4.0 m', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: '1.1-2.0 m', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: '0.0-1.0 m', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'cvi_mean_wave_height',
    standardName: StandardParameterNames.MEAN_WAVE_HEIGHT,
    indexId: 'cvi-thieler-1999',
    indexSpecificName: 'Mean Wave Height',
    description: 'Mean significant wave height',
    type: 'numerical',
    unit: 'm',
    weight: 1/6,
    required: true,
    rankingTable: [
      { value: 1, criteria: '<0.55 m', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: '0.55-0.85 m', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: '0.85-1.05 m', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: '1.05-1.25 m', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: '>1.25 m', color: '#d73027', label: 'Very High' }
    ]
  }
];



// Validation rules
const CVI_VALIDATION_RULES: ValidationRule[] = [
  {
    type: 'parameter_count',
    message: 'CVI requires exactly 6 parameters',
    validate: (parameters) => parameters.length === 6
  },
  {
    type: 'weight_sum',
    message: 'CVI requires equal weights (1/6 each)',
    validate: (parameters, weights) => {
      if (!weights) return true;
      const expectedWeight = 1/6;
      return Object.values(weights).every(w => Math.abs(w - expectedWeight) < 0.001);
    }
  },
  {
    type: 'formula_compatibility',
    message: 'CVI must use geometric mean formula with equal weights',
    validate: () => true // Enforced by index definition
  }
];

// RCVI (Evelpidou Niki & Karkani Anna, 2025) - Revised CVI with 7 parameters
const RCVI_PARAMETERS: IndexSpecificParameter[] = [
  {
    id: 'rcvi_geomorphology',
    standardName: StandardParameterNames.COASTAL_GEOMORPHOLOGY,
    indexId: 'rcvi-evelpidou-2025',
    indexSpecificName: 'Geomorphology',
    description: 'Coastal geomorphological features',
    type: 'categorical',
    weight: 1/7,
    required: true,
    rankingTable: [
      { value: 1, criteria: 'Rocky-cliffed coasts, Fjords', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: 'Medium cliffs, Indented coasts', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: 'Low cliffs, Glacial drift, Alluvial plains', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: 'Cobble Beaches, Estuary, Lagoon', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: 'Barrier beaches, Sand beaches, Salt marsh, Mud flats, Deltas, Mangrove, Coral reefs', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'rcvi_natural_protection',
    standardName: StandardParameterNames.NATURAL_PROTECTION,
    indexId: 'rcvi-evelpidou-2025',
    indexSpecificName: 'Natural Protection',
    description: 'Natural protection features on beaches',
    type: 'categorical',
    weight: 1/7,
    required: true,
    rankingTable: [
      { value: 1, criteria: 'Submerged hard features, such as beachrocks, platforms', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: 'Stabilized sand dunes, Coastal lagoons, wetlands', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: 'Unstabilised sand dunes, uplifted reefs, such as beachrocks', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: 'Beaches with gravels, berms', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: 'Sandy low lying beaches', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'rcvi_coastal_slope',
    standardName: StandardParameterNames.COASTAL_SLOPE,
    indexId: 'rcvi-evelpidou-2025',
    indexSpecificName: 'Coastal Slope',
    description: 'Coastal slope percentage',
    type: 'numerical',
    unit: '%',
    weight: 1/7,
    required: true,
    rankingTable: [
      { value: 1, criteria: '> 12%', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: '9-12%', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: '6-9%', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: '3-6%', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: '< 3%', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'rcvi_sea_level_change',
    standardName: StandardParameterNames.SEA_LEVEL_CHANGE,
    indexId: 'rcvi-evelpidou-2025',
    indexSpecificName: 'Relative Sea Level Change',
    description: 'Rate of relative sea level change',
    type: 'numerical',
    unit: 'mm/yr',
    weight: 1/7,
    required: true,
    rankingTable: [
      { value: 1, criteria: '< 1.80 mm/yr', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: '1.80-2.50 mm/yr', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: '2.50-3.00 mm/yr', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: '3.00-3.40 mm/yr', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: '> 3.40 mm/yr', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'rcvi_shoreline_displacement',
    standardName: StandardParameterNames.SHORELINE_CHANGE,
    indexId: 'rcvi-evelpidou-2025',
    indexSpecificName: 'Shoreline Displacement Rate',
    description: 'Rate of shoreline erosion/accretion',
    type: 'numerical',
    unit: 'm/yr',
    weight: 1/7,
    required: true,
    rankingTable: [
      { value: 1, criteria: '> +2.0 m/yr', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: '+1.0 to +2.0 m/yr', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: '-1.0 to +1.0 m/yr', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: '-2.0 to -1.1 m/yr', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: '< -2.0 m/yr', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'rcvi_mean_tidal_range',
    standardName: StandardParameterNames.MEAN_TIDE_RANGE,
    indexId: 'rcvi-evelpidou-2025',
    indexSpecificName: 'Mean Tidal Range',
    description: 'Mean tidal range',
    type: 'numerical',
    unit: 'm',
    weight: 1/7,
    required: true,
    rankingTable: [
      { value: 1, criteria: '> 6.0 m', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: '4.0-6.0 m', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: '2.0-4.0 m', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: '1.0-2.0 m', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: '< 1.0 m', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'rcvi_mean_wave_height',
    standardName: StandardParameterNames.MEAN_WAVE_HEIGHT,
    indexId: 'rcvi-evelpidou-2025',
    indexSpecificName: 'Mean Wave Height',
    description: 'Mean significant wave height',
    type: 'numerical',
    unit: 'm',
    weight: 1/7,
    required: true,
    rankingTable: [
      { value: 1, criteria: '< 0.55 m', color: '#1a9850', label: 'Very Low' },
      { value: 2, criteria: '0.55-0.85 m', color: '#91cf60', label: 'Low' },
      { value: 3, criteria: '0.85-1.05 m', color: '#fee08b', label: 'Moderate' },
      { value: 4, criteria: '1.05-1.25 m', color: '#fc8d59', label: 'High' },
      { value: 5, criteria: '> 1.25 m', color: '#d73027', label: 'Very High' }
    ]
  }
];

// ICVI (Alcántara-Carrió et al., 2024) - Integrated Coastal Vulnerability Index
const ICVI_PARAMETERS: IndexSpecificParameter[] = [
  // Environmental Vulnerability Index (EVI) Parameters
  {
    id: 'icvi_geomorphological_features',
    standardName: StandardParameterNames.COASTAL_GEOMORPHOLOGY,
    indexId: 'icvi-alcantara-2024',
    indexSpecificName: 'Geomorphological Features',
    description: 'Coastal geomorphological characteristics',
    type: 'categorical',
    weight: 1/12, // 1/6 for EVI, then 1/2 for ICVI
    required: true,
    rankingTable: [
      { value: 0.1, criteria: 'High cliffs, Cliff of coherent rocks', color: '#1a9850', label: 'Very Low' },
      { value: 0.3, criteria: 'Medium cliffs, Cliff of medium resistance rocks', color: '#91cf60', label: 'Low' },
      { value: 0.5, criteria: 'Low cliffs, Cliff on sedimentary formations, Cliff with high erodibility', color: '#fee08b', label: 'Moderate' },
      { value: 0.7, criteria: 'Extensive beaches attached to low-elevation coastal sedimentary plains', color: '#fc8d59', label: 'High' },
      { value: 0.9, criteria: 'Beaches attached to barrier island formations, tombolos, coastal arrows, deltas, Sectors in front of tidal or fluvial-tidal marshes', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'icvi_slope',
    standardName: StandardParameterNames.COASTAL_SLOPE,
    indexId: 'icvi-alcantara-2024',
    indexSpecificName: 'Slope',
    description: 'Coastal slope percentage',
    type: 'numerical',
    unit: '%',
    weight: 1/12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: '> 8%', color: '#1a9850', label: 'Very Low' },
      { value: 0.3, criteria: '4-8%', color: '#91cf60', label: 'Low' },
      { value: 0.5, criteria: '2-4%', color: '#fee08b', label: 'Moderate' },
      { value: 0.7, criteria: '1-2%', color: '#fc8d59', label: 'High' },
      { value: 0.9, criteria: '0-1%', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'icvi_shoreline_migration',
    standardName: StandardParameterNames.SHORELINE_CHANGE,
    indexId: 'icvi-alcantara-2024',
    indexSpecificName: 'Shoreline Migration Rate',
    description: 'Rate of shoreline migration',
    type: 'numerical',
    unit: 'm/yr',
    weight: 1/12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: '> +2.0 m/yr', color: '#1a9850', label: 'Very Low' },
      { value: 0.3, criteria: '+1.0 to +2.0 m/yr', color: '#91cf60', label: 'Low' },
      { value: 0.5, criteria: '-1.0 to +1.0 m/yr', color: '#fee08b', label: 'Moderate' },
      { value: 0.7, criteria: '-2.0 to -1.0 m/yr', color: '#fc8d59', label: 'High' },
      { value: 0.9, criteria: '≤ -2.0 m/yr', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'icvi_ecosystem_type',
    standardName: StandardParameterNames.ECOSYSTEM_TYPE,
    indexId: 'icvi-alcantara-2024',
    indexSpecificName: 'Ecosystem Type',
    description: 'Type of coastal ecosystem',
    type: 'categorical',
    weight: 1/12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: 'Without vegetation', color: '#1a9850', label: 'Very Low' },
      { value: 0.3, criteria: 'Coastal plain and coastal cliffs', color: '#91cf60', label: 'Low' },
      { value: 0.5, criteria: 'Shrub vegetation, stubble, grasslands', color: '#fee08b', label: 'Moderate' },
      { value: 0.7, criteria: 'Forests', color: '#fc8d59', label: 'High' },
      { value: 0.9, criteria: 'Strategic ecosystems: coastal lagoons, mangroves, coral reefs', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'icvi_conservation_measures',
    standardName: StandardParameterNames.ENVIRONMENTAL_CONSERVANCY,
    indexId: 'icvi-alcantara-2024',
    indexSpecificName: 'Environmental Conservancy Measures',
    description: 'Level of environmental protection measures',
    type: 'categorical',
    weight: 1/12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: 'None', color: '#1a9850', label: 'Very Low' },
      { value: 0.3, criteria: 'Reserve zone for agrarian, fishing or hunting activities', color: '#91cf60', label: 'Low' },
      { value: 0.5, criteria: 'Regional or local conservation parks', color: '#fee08b', label: 'Moderate' },
      { value: 0.7, criteria: 'Biosphere reserve areas', color: '#fc8d59', label: 'High' },
      { value: 0.9, criteria: 'National Parks, RAMSAR sites', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'icvi_species_interest',
    standardName: StandardParameterNames.INTEREST_SPECIES,
    indexId: 'icvi-alcantara-2024',
    indexSpecificName: 'Presence of Interest Species',
    description: 'Presence of species of conservation interest',
    type: 'categorical',
    weight: 1/12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: 'Ecosystems colonized by invasive species', color: '#1a9850', label: 'Very Low' },
      { value: 0.3, criteria: 'Ecosystems with invasive species with a normal population growth', color: '#91cf60', label: 'Low' },
      { value: 0.5, criteria: 'Ecosystems with normal population growth and high-value species', color: '#fee08b', label: 'Moderate' },
      { value: 0.7, criteria: 'Ecosystems with endemism and threatened species (VU, EN, CR) with active conservation programs', color: '#fc8d59', label: 'High' },
      { value: 0.9, criteria: 'Ecosystems with high quantity of endemism and high-value species', color: '#d73027', label: 'Very High' }
    ]
  },
  // Socioeconomic Vulnerability Index (SVI) Parameters
  {
    id: 'icvi_land_use',
    standardName: StandardParameterNames.LAND_USE,
    indexId: 'icvi-alcantara-2024',
    indexSpecificName: 'Use of Territory',
    description: 'Type of land use in coastal areas',
    type: 'categorical',
    weight: 1/12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: 'Natural areas, without buildings', color: '#1a9850', label: 'Very Low' },
      { value: 0.3, criteria: 'Rural areas', color: '#91cf60', label: 'Low' },
      { value: 0.5, criteria: 'Semi-urban areas with scattered buildings', color: '#fee08b', label: 'Moderate' },
      { value: 0.7, criteria: 'Urban areas', color: '#fc8d59', label: 'High' },
      { value: 0.9, criteria: 'Industrial areas', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'icvi_building_coast_ratio',
    standardName: StandardParameterNames.BUILDING_COAST_RATIO,
    indexId: 'icvi-alcantara-2024',
    indexSpecificName: 'Building Coast Ratio',
    description: 'Ratio of built structures along the coast',
    type: 'numerical',
    unit: 'ratio',
    weight: 1/12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: '0', color: '#1a9850', label: 'Very Low' },
      { value: 0.3, criteria: '0.0001-0.1', color: '#91cf60', label: 'Low' },
      { value: 0.5, criteria: '0.1-0.5', color: '#fee08b', label: 'Moderate' },
      { value: 0.7, criteria: '0.5-1.0', color: '#fc8d59', label: 'High' },
      { value: 0.9, criteria: '> 1.0', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'icvi_population_density',
    standardName: StandardParameterNames.POPULATION_DENSITY,
    indexId: 'icvi-alcantara-2024',
    indexSpecificName: 'Population Density',
    description: 'Population density in coastal areas',
    type: 'numerical',
    unit: 'pop/ha',
    weight: 1/12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: '≤ 20 pop/ha', color: '#1a9850', label: 'Very Low' },
      { value: 0.3, criteria: '20-50 pop/ha', color: '#91cf60', label: 'Low' },
      { value: 0.5, criteria: '50-80 pop/ha', color: '#fee08b', label: 'Moderate' },
      { value: 0.7, criteria: '80-170 pop/ha', color: '#fc8d59', label: 'High' },
      { value: 0.9, criteria: '> 170 pop/ha', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'icvi_economic_activity',
    standardName: StandardParameterNames.ECONOMIC_ACTIVITY,
    indexId: 'icvi-alcantara-2024',
    indexSpecificName: 'Socio-economic Activity',
    description: 'Level of socio-economic activity',
    type: 'categorical',
    weight: 1/12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: 'None', color: '#1a9850', label: 'Very Low' },
      { value: 0.3, criteria: 'Low', color: '#91cf60', label: 'Low' },
      { value: 0.5, criteria: 'Moderate', color: '#fee08b', label: 'Moderate' },
      { value: 0.7, criteria: 'High', color: '#fc8d59', label: 'High' },
      { value: 0.9, criteria: 'Very high', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'icvi_economic_value',
    standardName: StandardParameterNames.ECONOMIC_VALUE,
    indexId: 'icvi-alcantara-2024',
    indexSpecificName: 'Economic Value',
    description: 'Economic value of coastal areas',
    type: 'numerical',
    unit: '€',
    weight: 1/12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: '0 - 10⁵ €', color: '#1a9850', label: 'Very Low' },
      { value: 0.3, criteria: '10⁵ - 3.5×10⁵ €', color: '#91cf60', label: 'Low' },
      { value: 0.5, criteria: '3.5×10⁵ - 6.5×10⁵ €', color: '#fee08b', label: 'Moderate' },
      { value: 0.7, criteria: '6.5×10⁵ - 10⁶ €', color: '#fc8d59', label: 'High' },
      { value: 0.9, criteria: '> 10⁶ €', color: '#d73027', label: 'Very High' }
    ]
  },
  {
    id: 'icvi_heritage',
    standardName: StandardParameterNames.SOCIOCULTURAL_HERITAGE,
    indexId: 'icvi-alcantara-2024',
    indexSpecificName: 'Archeologic and Historic Heritage',
    description: 'Presence of archaeological and historic heritage',
    type: 'categorical',
    weight: 1/12,
    required: true,
    rankingTable: [
      { value: 0.1, criteria: 'None', color: '#1a9850', label: 'Very Low' },
      { value: 0.3, criteria: 'Local relevance', color: '#91cf60', label: 'Low' },
      { value: 0.5, criteria: 'Regional relevance', color: '#fee08b', label: 'Moderate' },
      { value: 0.7, criteria: 'National relevance', color: '#fc8d59', label: 'High' },
      { value: 0.9, criteria: 'World Heritage', color: '#d73027', label: 'Very High' }
    ]
  }
];



const RCVI_VALIDATION_RULES: ValidationRule[] = [
  {
    type: 'parameter_count',
    message: 'RCVI requires exactly 7 parameters',
    validate: (parameters) => parameters.length === 7
  },
  {
    type: 'weight_sum',
    message: 'RCVI requires equal weights (1/7 each)',
    validate: (parameters, weights) => {
      if (!weights) return true;
      const expectedWeight = 1/7;
      return Object.values(weights).every(w => Math.abs(w - expectedWeight) < 0.001);
    }
  },
  {
    type: 'formula_compatibility',
    message: 'RCVI must use geometric mean formula',
    validate: () => true // Enforced by index definition
  }
];

const ICVI_VALIDATION_RULES: ValidationRule[] = [
  {
    type: 'parameter_count',
    message: 'ICVI requires exactly 12 parameters (6 environmental + 6 socioeconomic)',
    validate: (parameters) => parameters.length === 12
  },
  {
    type: 'weight_sum',
    message: 'ICVI requires equal weights (1/12 each)',
    validate: (parameters, weights) => {
      if (!weights) return true;
      const expectedWeight = 1/12;
      return Object.values(weights).every(w => Math.abs(w - expectedWeight) < 0.001);
    }
  },
  {
    type: 'formula_compatibility',
    message: 'ICVI must use composite formula',
    validate: () => true // Enforced by index definition
  }
];

// Standardized index definitions
export const STANDARDIZED_COASTAL_INDICES: StandardizedCoastalIndex[] = [
  {
    id: 'cvi-thieler-1999',
    name: 'Coastal Vulnerability Index (CVI)',
    shortName: 'CVI',
    description: 'The original USGS coastal vulnerability index developed by Thieler & Hammar-Klose (1999).',
    citation: `Thieler, E. R., & Hammar-Klose, E. S. (1999). National Assessment of Coastal Vulnerability to Sea Level Rise: Preliminary Results for the U.S. Atlantic Coast. U.S. Geological Survey Open File Report 99–593.

Cogswell, A., Greenan, B. J. W., & Greyson, P. (2018). Evaluation of two common vulnerability index calculation methods. Ocean & Coastal Management, 160, 46-51. https://doi.org/10.1016/j.ocecoaman.2018.03.041`,
    type: 'true-index',
    formula: 'geometric-mean', // CVI = ∏(Vi^Wi) - geometric mean preferred over traditional
    requiredParameters: CVI_PARAMETERS,
    validationRules: CVI_VALIDATION_RULES,
    requiresEqualWeights: true,
    notes: `* The geometric mean formula is preferred over the traditional one to avoid distribution distortions and ranking issues (Cogswell et al., 2018).
* The classification of parameters into categories is derived from (Roukounis & Tsihrintzis, 2022).`
  },

  {
    id: 'rcvi-evelpidou-2025',
    name: 'Revised Coastal Vulnerability Index (RCVI)',
    shortName: 'RCVI',
    description: 'Enhanced CVI with the additional parameter of natural protection developed by (Evelpidou Niki & Karkani Anna, 2025).',
    citation: `Evelpidou, N., & Karkani, A. (2025). Revised Coastal Vulnerability Index (RCVI). [To be published]

Cogswell, A., Greenan, B. J. W., & Greyson, P. (2018). Evaluation of two common vulnerability index calculation methods. Ocean & Coastal Management, 160, 46-51. https://doi.org/10.1016/j.ocecoaman.2018.03.041`,
    type: 'true-index',
    formula: 'geometric-mean', // RCVI = √(∏Vi/n)
    requiredParameters: RCVI_PARAMETERS,
    validationRules: RCVI_VALIDATION_RULES,
    requiresEqualWeights: true,
    notes: `* The geometric mean formula is preferred over the traditional one to avoid distribution distortions and ranking issues (Cogswell et al., 2018).
* The classification of parameters into categories is derived from (Roukounis & Tsihrintzis, 2022).`
  },
  {
    id: 'icvi-alcantara-2024',
    name: 'Integrated Coastal Vulnerability Index (ICVI)',
    shortName: 'ICVI',
    description: 'Composite index combining Environmental Vulnerability Index (EVI) and Socioeconomic Vulnerability Index (SVI) developed by Alcántara-Carrió et al. (2024).',
    citation: `Alcántara-Carrió, J., García Echavarría, L. M., & Jaramillo-Vélez, A. (2024). Is the coastal vulnerability index a suitable index? Review and proposal of alternative indices for coastal vulnerability to sea level rise. Geo-Marine Letters, 44(1), 8. https://doi.org/10.1007/s00367-024-00770-9`,
    type: 'composite-index',
    formula: 'icvi-arithmetic', // Default to arithmetic mean
    requiredParameters: ICVI_PARAMETERS,
    validationRules: ICVI_VALIDATION_RULES,
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
      // Alternative geometric mean ranges
      geometricRanges: [
        { min: 0, max: 0.0022, label: 'Very Low', color: '#1a9850' },
        { min: 0.0022, max: 0.0238, label: 'Low', color: '#91cf60' },
        { min: 0.0238, max: 0.0846, label: 'Moderate', color: '#fee08b' },
        { min: 0.0846, max: 0.2042, label: 'High', color: '#fc8d59' },
        { min: 0.2042, max: 0.2977, label: 'Very High', color: '#d73027' }
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
  }
];

// Helper functions
export const getStandardizedIndexById = (id: string): StandardizedCoastalIndex | undefined => {
  return STANDARDIZED_COASTAL_INDICES.find(index => index.id === id);
};

export const getParameterByStandardName = (standardName: StandardParameterNames, indexId: string): IndexSpecificParameter | undefined => {
  const index = getStandardizedIndexById(indexId);
  if (!index) return undefined;

  return index.requiredParameters.find(param => param.standardName === standardName);
};

export const validateIndexParameters = (indexId: string, parameters: IndexSpecificParameter[], weights?: Record<string, number>): { isValid: boolean; errors: string[] } => {
  const index = getStandardizedIndexById(indexId);
  if (!index) return { isValid: false, errors: ['Index not found'] };

  const errors: string[] = [];

  for (const rule of index.validationRules) {
    if (!rule.validate(parameters, weights)) {
      errors.push(rule.message);
    }
  }

  return { isValid: errors.length === 0, errors };
};

export const getVulnerabilityFromValue = (parameter: IndexSpecificParameter, value: string | number): number => {
  if (parameter.type === 'categorical') {
    const stringValue = String(value);
    const match = parameter.rankingTable.find(range => range.criteria.toLowerCase().includes(stringValue.toLowerCase()));
    return match ? match.value : 3; // Default to moderate if not found
  } else {
    const numValue = Number(value);
    if (isNaN(numValue)) return 3;

    // For numerical parameters, find the appropriate range
    for (const range of parameter.rankingTable) {
      const criteria = range.criteria;

      // Parse range criteria (e.g., "1.0-2.0 mm/yr", "> 3.1 mm/yr", "< 0.0 mm/yr")
      if (criteria.includes('-')) {
        const [min, max] = criteria.split('-').map(s => parseFloat(s.replace(/[^\d.-]/g, '')));
        if (numValue >= min && numValue <= max) return range.value;
      } else if (criteria.includes('>')) {
        const threshold = parseFloat(criteria.replace(/[^\d.-]/g, ''));
        if (criteria.includes('>=') || criteria.includes('≥')) {
          if (numValue >= threshold) return range.value;
        } else {
          if (numValue > threshold) return range.value;
        }
      } else if (criteria.includes('<')) {
        const threshold = parseFloat(criteria.replace(/[^\d.-]/g, ''));
        if (criteria.includes('<=') || criteria.includes('≤')) {
          if (numValue <= threshold) return range.value;
        } else {
          if (numValue < threshold) return range.value;
        }
      }
    }

    return 3; // Default to moderate if no range matches
  }
};
