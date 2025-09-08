/**
 * Map Libraries Module
 *
 * This module exports all map-related libraries for use in the application.
 */

// Import libraries with proper destructuring
import parseGeoraster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';

// Make libraries available globally for compatibility
if (typeof window !== 'undefined') {
  console.log('Map libraries initialized:', {
    parseGeoraster: typeof parseGeoraster,
    GeoRasterLayer: typeof GeoRasterLayer
  });

  // Make georaster functions available globally for fallback
  (window as any).parseGeoraster = parseGeoraster;
  (window as any).GeoRasterLayer = GeoRasterLayer;
}

// Export everything for use in the application
export {
  parseGeoraster,
  GeoRasterLayer
};
