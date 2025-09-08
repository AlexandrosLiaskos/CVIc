/**
 * Map Libraries Module
 *
 * This module exports all map-related libraries for use in the application.
 */

// Import libraries with proper destructuring
import parseGeoraster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import proj4 from 'proj4';

// Make libraries available globally for compatibility
if (typeof window !== 'undefined') {
  console.log('Map libraries initialized:', {
    parseGeoraster: typeof parseGeoraster,
    GeoRasterLayer: typeof GeoRasterLayer,
    proj4: typeof proj4
  });

  // Make georaster functions available globally for fallback
  (window as any).parseGeoraster = parseGeoraster;
  (window as any).GeoRasterLayer = GeoRasterLayer;
  (window as any).proj4 = proj4;

  // Ensure proj4 is properly initialized
  if (proj4 && typeof proj4.defs === 'function') {
    console.log('proj4 properly initialized with defs function');
  } else {
    console.error('proj4 not properly initialized');
  }
}

// Export everything for use in the application
export {
  parseGeoraster,
  GeoRasterLayer,
  proj4
};
