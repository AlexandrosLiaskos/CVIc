/**
 * Map Libraries Module
 *
 * This module exports all map-related libraries for use in the application.
 */

// Import libraries
import georaster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';

// Extract georaster functions
const fromArrays = (georaster as any).fromArrays;
const parse = (georaster as any).parse;

// Make libraries available globally for compatibility
if (typeof window !== 'undefined') {
  window.fromArrays = fromArrays;

  console.log('Map libraries initialized:', {
    georaster: typeof georaster,
    GeoRasterLayer: typeof GeoRasterLayer
  });
}

// Export everything for use in the application
export {  georaster,
  fromArrays,
  parse,
  GeoRasterLayer
};
