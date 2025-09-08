/**
 * Map Libraries Module
 *
 * This module exports all map-related libraries for use in the application.
 */

// Import proj4 FIRST to ensure it's available globally before other libraries
import proj4 from 'proj4';

// IMMEDIATE global setup - run this before anything else
(function() {
  if (typeof window !== 'undefined') {
    // Set up proj4 immediately
    (window as any).proj4 = proj4;
    
    // Create proj42 as a direct reference first
    (window as any).proj42 = proj4;
    
    console.log('Emergency proj4/proj42 setup completed');
  }
})();

// Function to create a complete proj4 clone
function createProj4Clone(originalProj4: any) {
  // Create a function that acts like proj4 and can be called directly
  const clone = function(this: any, ...args: any[]) {
    return originalProj4.apply(this, args);
  };
  
  // Copy the prototype chain
  Object.setPrototypeOf(clone, Object.getPrototypeOf(originalProj4));
  
  // Copy all enumerable and non-enumerable properties
  const descriptors = Object.getOwnPropertyDescriptors(originalProj4);
  Object.defineProperties(clone, descriptors);
  
  // Explicitly ensure critical methods exist and are functions
  if (originalProj4.defs && typeof originalProj4.defs === 'function') {
    clone.defs = originalProj4.defs.bind(originalProj4);
  }
  if (originalProj4.transform && typeof originalProj4.transform === 'function') {
    clone.transform = originalProj4.transform.bind(originalProj4);
  }
  if (originalProj4.Proj) {
    clone.Proj = originalProj4.Proj;
  }
  
  // Copy any other properties that might exist
  for (const key in originalProj4) {
    if (originalProj4.hasOwnProperty(key) && !(key in clone)) {
      try {
        (clone as any)[key] = originalProj4[key];
      } catch (e) {
        // Ignore properties that can't be copied
      }
    }
  }
  
  return clone;
}

// Immediately make proj4 available globally to prevent library conflicts
if (typeof window !== 'undefined') {
  (window as any).proj4 = proj4;
  // Create a complete functional copy of proj4 as proj42
  (window as any).proj42 = createProj4Clone(proj4);
  
  // Also set up a more aggressive fallback
  Object.defineProperty(window, 'proj42', {
    get: function() {
      return proj4;
    },
    set: function(_value) {
      // Allow setting but always return proj4
    },
    configurable: true,
    enumerable: true
  });
}

// Ensure global scope also has proj4 for Node.js-style requires
if (typeof global !== 'undefined') {
  (global as any).proj4 = proj4;
  (global as any).proj42 = createProj4Clone(proj4);
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
    'window.proj42': typeof (window as any).proj42,
    'window.proj42.defs': typeof (window as any).proj42?.defs
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

  // Verify proj42 is properly initialized
  if ((window as any).proj42 && typeof (window as any).proj42.defs === 'function') {
    console.log('✅ proj42 properly initialized with defs function');
  } else {
    console.error('❌ proj42 not properly initialized, attempting to fix...');
    // Try to fix it with a direct assignment
    (window as any).proj42 = createProj4Clone(proj4);
    
    // Final verification
    if ((window as any).proj42 && typeof (window as any).proj42.defs === 'function') {
      console.log('✅ proj42 fixed successfully');
    } else {
      console.error('❌ Failed to fix proj42, using direct reference');
      (window as any).proj42 = proj4;
    }
  }
  
  // Set up additional initialization on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Re-initialize proj42 if needed
      if (!(window as any).proj42 || typeof (window as any).proj42.defs !== 'function') {
        console.log('Re-initializing proj42 on DOM ready');
        (window as any).proj42 = createProj4Clone(proj4);
      }
    });
  } else {
    // DOM is already ready, run immediately
    if (!(window as any).proj42 || typeof (window as any).proj42.defs !== 'function') {
      console.log('Re-initializing proj42 immediately');
      (window as any).proj42 = createProj4Clone(proj4);
    }
  }
}

// Export everything for use in the application
export {
  parseGeoraster,
  GeoRasterLayer,
  proj4
};