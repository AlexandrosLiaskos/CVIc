import type { FeatureCollection, LineString } from 'geojson';
import type { ShorelineSegment, Parameter } from '../types';
import { COASTAL_GEOMORPHOLOGY, COASTAL_SLOPE, MEAN_WAVE_HEIGHT, POPULATION_DENSITY } from '../config/standardParameters';

/**
 * Demo data service providing sample data for guest users
 * This includes shoreline data, segmented data, and pre-configured parameters
 * matching the satellite imagery available in the assets folder
 */

// Sample shoreline data for Mediterranean coast (matching the satellite imagery location)
export const DEMO_SHORELINE_DATA: FeatureCollection<LineString> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [23.7234, 37.9755], // Approximate coordinates for Greek coastline
          [23.7245, 37.9760],
          [23.7256, 37.9765],
          [23.7267, 37.9770],
          [23.7278, 37.9775],
          [23.7289, 37.9780],
          [23.7300, 37.9785],
          [23.7311, 37.9790],
          [23.7322, 37.9795],
          [23.7333, 37.9800],
          [23.7344, 37.9805],
          [23.7355, 37.9810],
          [23.7366, 37.9815],
          [23.7377, 37.9820],
          [23.7388, 37.9825]
        ]
      },
      properties: {
        id: 'demo-shoreline-1',
        name: 'Demo Mediterranean Coastline',
        description: 'Sample shoreline data for demonstration purposes'
      }
    }
  ]
};

// Pre-segmented shoreline data with vulnerability parameters
export const DEMO_SEGMENTED_DATA: ShorelineSegment[] = [
  {
    id: 'demo-segment-1',
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [23.7234, 37.9755],
        [23.7245, 37.9760],
        [23.7256, 37.9765]
      ]
    },
    properties: {
      id: 'demo-segment-1',
      length: 250,
      index: 1,
      parameters: {
        coastal_geomorphology: { type: 'categorical', value: 'medium_cliffs', vulnerability: 2 },
        coastal_slope: { type: 'numerical', value: 15, vulnerability: 2 },
        mean_wave_height: { type: 'numerical', value: 1.2, vulnerability: 2 },
        population_density: { type: 'numerical', value: 150, vulnerability: 2 }
      },
      vulnerabilityIndex: 2.0,
      vulnerabilityFormula: 'geometric-mean'
    },
    parameters: {
      coastal_geomorphology: { type: 'categorical', value: 'medium_cliffs', vulnerability: 2 },
      coastal_slope: { type: 'numerical', value: 15, vulnerability: 2 },
      mean_wave_height: { type: 'numerical', value: 1.2, vulnerability: 2 },
      population_density: { type: 'numerical', value: 150, vulnerability: 2 }
    }
  },
  {
    id: 'demo-segment-2',
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [23.7256, 37.9765],
        [23.7267, 37.9770],
        [23.7278, 37.9775]
      ]
    },
    properties: {
      id: 'demo-segment-2',
      length: 280,
      index: 2,
      parameters: {
        coastal_geomorphology: { type: 'categorical', value: 'sandy_beaches', vulnerability: 4 },
        coastal_slope: { type: 'numerical', value: 5, vulnerability: 4 },
        mean_wave_height: { type: 'numerical', value: 1.8, vulnerability: 3 },
        population_density: { type: 'numerical', value: 450, vulnerability: 3 }
      },
      vulnerabilityIndex: 3.5,
      vulnerabilityFormula: 'geometric-mean'
    },
    parameters: {
      coastal_geomorphology: { type: 'categorical', value: 'sandy_beaches', vulnerability: 4 },
      coastal_slope: { type: 'numerical', value: 5, vulnerability: 4 },
      mean_wave_height: { type: 'numerical', value: 1.8, vulnerability: 3 },
      population_density: { type: 'numerical', value: 450, vulnerability: 3 }
    }
  },
  {
    id: 'demo-segment-3',
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [23.7278, 37.9775],
        [23.7289, 37.9780],
        [23.7300, 37.9785]
      ]
    },
    properties: {
      id: 'demo-segment-3',
      length: 260,
      index: 3,
      parameters: {
        coastal_geomorphology: { type: 'categorical', value: 'rocky_cliffs', vulnerability: 1 },
        coastal_slope: { type: 'numerical', value: 25, vulnerability: 1 },
        mean_wave_height: { type: 'numerical', value: 0.8, vulnerability: 1 },
        population_density: { type: 'numerical', value: 80, vulnerability: 1 }
      },
      vulnerabilityIndex: 1.0,
      vulnerabilityFormula: 'geometric-mean'
    },
    parameters: {
      coastal_geomorphology: { type: 'categorical', value: 'rocky_cliffs', vulnerability: 1 },
      coastal_slope: { type: 'numerical', value: 25, vulnerability: 1 },
      mean_wave_height: { type: 'numerical', value: 0.8, vulnerability: 1 },
      population_density: { type: 'numerical', value: 80, vulnerability: 1 }
    }
  }
];

// Demo parameters configuration
export const DEMO_PARAMETERS: Parameter[] = [
  {
    ...COASTAL_GEOMORPHOLOGY,
    enabled: true,
    weight: 0.25
  },
  {
    ...COASTAL_SLOPE,
    enabled: true,
    weight: 0.25
  },
  {
    ...MEAN_WAVE_HEIGHT,
    enabled: true,
    weight: 0.25
  },
  {
    ...POPULATION_DENSITY,
    enabled: true,
    weight: 0.25
  }
];

/**
 * Initialize demo data for guest users
 * This function sets up all the necessary demo data in IndexedDB
 */
export async function initializeDemoData(): Promise<void> {
  try {
    const { indexedDBService } = await import('./indexedDBService');
    
    // Store demo shoreline data
    await indexedDBService.storeShorelineData('demo-current-shoreline', DEMO_SHORELINE_DATA);
    
    // Store demo segmented data
    const segmentedGeoJSON: FeatureCollection = {
      type: 'FeatureCollection',
      features: DEMO_SEGMENTED_DATA.map(segment => ({
        type: 'Feature',
        geometry: segment.geometry,
        properties: segment.properties
      }))
    };
    await indexedDBService.storeShorelineData('demo-segmented-shoreline', segmentedGeoJSON);
    
    console.log('Demo data initialized successfully');
  } catch (error) {
    console.error('Error initializing demo data:', error);
  }
}

/**
 * Clear all demo data from IndexedDB
 */
export async function clearDemoData(): Promise<void> {
  try {
    const { indexedDBService } = await import('./indexedDBService');
    
    // Clear demo shoreline data
    await indexedDBService.deleteShorelineData('demo-current-shoreline');
    await indexedDBService.deleteShorelineData('demo-segmented-shoreline');
    
    console.log('Demo data cleared successfully');
  } catch (error) {
    console.error('Error clearing demo data:', error);
  }
}

/**
 * Check if user is in demo mode
 */
export function isDemoMode(userId: string | null): boolean {
  return userId?.startsWith('guest-') ?? false;
}

/**
 * Get demo-prefixed key for data storage
 */
export function getDemoKey(key: string, isDemo: boolean): string {
  return isDemo ? `demo-${key}` : key;
}
