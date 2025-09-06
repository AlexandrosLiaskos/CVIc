/**
 * Map Libraries Module
 *
 * This module exports all map-related libraries for use in the application.
 */

// Import libraries
import georaster, { parse, fromArrays } from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';

// Make libraries available globally for compatibility
if (typeof window !== 'undefined') {
  console.log('Map libraries initialized:', {
    georaster: typeof georaster,
    GeoRasterLayer: typeof GeoRasterLayer
  });
}

// Export everything for use in the application
export {
  georaster,
  fromArrays,
  parse,
  GeoRasterLayer
};
