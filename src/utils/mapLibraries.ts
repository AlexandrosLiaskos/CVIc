/**
 * Map Libraries Module
 *
 * This module exports all map-related libraries for use in the application.
 */

// Import libraries
import georaster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import proj4 from 'proj4';

// Extract georaster functions
const fromArrays = (georaster as { fromArrays?: unknown }).fromArrays;
const parse = (georaster as { parse?: unknown }).parse;

// Make libraries available globally for compatibility
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).fromArrays = fromArrays;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).proj4 = proj4;

  console.log('Map libraries initialized:', {
    georaster: typeof georaster,
    GeoRasterLayer: typeof GeoRasterLayer,
    proj4: typeof proj4
  });
}

// Export everything for use in the application
export {  georaster,
  fromArrays,
  parse,
  GeoRasterLayer,
  proj4
};
