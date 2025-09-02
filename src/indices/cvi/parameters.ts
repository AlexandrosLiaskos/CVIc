import type { IndexSpecificParameter } from '../../types';
import { StandardParameterNames } from '../../types/indexSpecificTypes';

/**
 * CVI Parameters - 6 physical parameters with 1-5 vulnerability scale
 * No weights needed (equal weights used automatically)
 */
export const CVIParameters: IndexSpecificParameter[] = [
  {
    id: 'cvi_coastal_geomorphology',
    standardName: StandardParameterNames.COASTAL_GEOMORPHOLOGY,
    indexId: 'cvi-thieler-1999',
    indexSpecificName: 'Geomorphology',
    description: 'Coastal landform type',
    type: 'categorical',
    weight: 1/6, // Equal weights for CVI
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
    weight: 1/6, // Equal weights for CVI
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
    weight: 1/6, // Equal weights for CVI
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
    weight: 1/6, // Equal weights for CVI
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
    weight: 1/6, // Equal weights for CVI
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
    weight: 1/6, // Equal weights for CVI
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