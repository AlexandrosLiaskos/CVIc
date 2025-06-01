/**
 * Map Libraries Module
 *
 * This module exports all map-related libraries for use in the application.
 */

// Import libraries
// Import our custom proj4 implementation that guarantees the defs function
import proj4 from '../lib/proj4-with-defs';
import georaster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';

// Extract georaster functions
const fromArrays = (georaster as any).fromArrays;
const parse = (georaster as any).parse;

// Make libraries available globally for compatibility
if (typeof window !== 'undefined') {
  // Use our custom proj4 implementation that guarantees the defs function
  window.proj4 = proj4;
  window.fromArrays = fromArrays;

  console.log('Map libraries initialized:', {
    proj4: typeof proj4,
    hasDefs: typeof window.proj4.defs === 'function',
    georaster: typeof georaster,
    GeoRasterLayer: typeof GeoRasterLayer
  });
}

// Export everything for use in the application
export {
  proj4,
  georaster,
  fromArrays,
  parse,
  GeoRasterLayer
};
