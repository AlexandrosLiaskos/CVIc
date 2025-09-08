/**
 * Map Libraries Module
 *
 * This module exports all map-related libraries for use in the application.
 */

// Import proj4 FIRST to ensure it's available globally before other libraries
import proj4 from 'proj4';

// IMMEDIATE global setup - run this before anything else
if (typeof window !== 'undefined') {
  // Set up proj4 immediately
  (window as any).proj4 = proj4;

  // Create proj42 as a direct reference - this is what georaster-layer expects
  (window as any).proj42 = proj4;

  console.log('✅ proj4/proj42 setup completed', {
    proj4: typeof proj4,
    'proj4.defs': typeof proj4.defs,
    'window.proj4': typeof (window as any).proj4,
    'window.proj42': typeof (window as any).proj42
  });
}

// Now import other libraries after proj4 is globally available
import parseGeoraster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';

// Export everything for use in the application
export {
  parseGeoraster,
  GeoRasterLayer,
  proj4
};