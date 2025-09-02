import type { IndexSpecificParameter } from '../../types';
import { StandardParameterNames } from '../../types/indexSpecificTypes';

/**
 * ICVI Parameters - 12 parameters total (6 EVI + 6 SVI) with 0.1-0.9 vulnerability scale
 * Equal weights (1/12 each)
 */
export const ICVIParameters: IndexSpecificParameter[] = [
  // Environmental Vulnerability Index (EVI) Parameters - 6 parameters
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
  
  // Socioeconomic Vulnerability Index (SVI) Parameters - 6 parameters
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