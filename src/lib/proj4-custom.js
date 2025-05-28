/**
 * Custom proj4 implementation that ensures the defs function is always available
 */

// Import the original proj4 library
import originalProj4 from 'proj4';

// Create a storage for definitions
const definitions = {};

// Create a wrapper around proj4 with a guaranteed defs function
const proj4 = {
  ...originalProj4,
  
  // Override the defs function to ensure it always works
  defs: function(name, projection) {
    // If only name is provided, return the definition
    if (arguments.length === 1) {
      // Try to get from original proj4 first if its defs function exists
      if (typeof originalProj4.defs === 'function') {
        try {
          const originalDef = originalProj4.defs(name);
          if (originalDef) return originalDef;
        } catch (e) {
          console.warn('Error getting definition from original proj4:', e);
        }
      }
      
      // Fall back to our custom definitions
      return definitions[name];
    }
    
    // If both name and projection are provided, store the definition
    if (projection) {
      // Try to set in original proj4 first if its defs function exists
      if (typeof originalProj4.defs === 'function') {
        try {
          originalProj4.defs(name, projection);
        } catch (e) {
          console.warn('Error setting definition in original proj4:', e);
        }
      }
      
      // Also store in our custom definitions
      definitions[name] = projection;
    }
    
    return this;
  }
};

// Add common projections
// WGS84
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');

// Web Mercator
proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs');

// UTM zones (North)
for (let zone = 1; zone <= 60; zone++) {
  const code = 32600 + zone;
  proj4.defs(`EPSG:${code}`, `+proj=utm +zone=${zone} +datum=WGS84 +units=m +no_defs`);
}

// UTM zones (South)
for (let zone = 1; zone <= 60; zone++) {
  const code = 32700 + zone;
  proj4.defs(`EPSG:${code}`, `+proj=utm +zone=${zone} +south +datum=WGS84 +units=m +no_defs`);
}

console.log('Custom proj4 with guaranteed defs function created');

// Export the custom proj4
export default proj4;
