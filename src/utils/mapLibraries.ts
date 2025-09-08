/**
 * Map Libraries Module
 *
 * This module exports all map-related libraries for use in the application.
 */

// Import proj4 FIRST to ensure it's available globally before other libraries
import proj4 from 'proj4';

// Immediately make proj4 available globally to prevent library conflicts
if (typeof window !== 'undefined') {
  (window as any).proj4 = proj4;
  (window as any).proj42 = proj4; // Fix for libraries that incorrectly reference proj42
}

// Ensure global scope also has proj4 for Node.js-style requires
if (typeof global !== 'undefined') {
  (global as any).proj4 = proj4;
  (global as any).proj42 = proj4;
}

// Now import other libraries after proj4 is globally available
import parseGeoraster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';

// Make libraries available globally for compatibility
if (typeof window !== 'undefined') {
  console.log('Map libraries initialized:', {
    parseGeoraster: typeof parseGeoraster,
    GeoRasterLayer: typeof GeoRasterLayer,
    proj4: typeof proj4,
    'proj4.defs': typeof proj4.defs,
    'window.proj4': typeof (window as any).proj4,
    'window.proj42': typeof (window as any).proj42
  });

  // Make georaster functions available globally for fallback
  (window as any).parseGeoraster = parseGeoraster;
  (window as any).GeoRasterLayer = GeoRasterLayer;

  // Verify proj4 is properly initialized
  if (proj4 && typeof proj4.defs === 'function') {
    console.log('✅ proj4 properly initialized with defs function');
  } else {
    console.error('❌ proj4 not properly initialized');
  }
}

// Export everything for use in the application
export {
  parseGeoraster,
  GeoRasterLayer,
  proj4
};
