/**
 * proj4-init.js
 *
 * This script initializes proj4 and ensures the defs function is available
 * It must be loaded before any other scripts that use proj4
 */

// Create a global proj4 object if it doesn't exist
window.proj4 = window.proj4 || {};

// Store original defs function if it exists
var originalDefs = window.proj4.defs;

// Create a storage for definitions
var definitions = {};

// Define the defs function that will always be available
window.proj4.defs = function(name, projection) {
  // If only name is provided, return the definition
  if (arguments.length === 1) {
    // Try original defs first if it exists and is a function
    if (typeof originalDefs === 'function') {
      try {
        var result = originalDefs.call(window.proj4, name);
        if (result) {
          return result;
        }
      } catch (e) {
        console.warn('Error calling original defs:', e);
      }
    }

    // Fall back to our custom definitions
    return definitions[name];
  }

  // If both name and projection are provided, store the definition
  if (projection) {
    // Try to use original defs first if it exists and is a function
    if (typeof originalDefs === 'function') {
      try {
        originalDefs.call(window.proj4, name, projection);
      } catch (e) {
        console.warn('Error calling original defs for setting:', e);
      }
    }

    // Also store in our custom definitions
    definitions[name] = projection;
  }

  return window.proj4;
};

// Add common projections
window.proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
window.proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs');

// UTM zones (North)
for (var zone = 1; zone <= 60; zone++) {
  var code = 32600 + zone;
  window.proj4.defs('EPSG:' + code, '+proj=utm +zone=' + zone + ' +datum=WGS84 +units=m +no_defs');
}

// UTM zones (South)
for (var zone = 1; zone <= 60; zone++) {
  var code = 32700 + zone;
  window.proj4.defs('EPSG:' + code, '+proj=utm +zone=' + zone + ' +south +datum=WGS84 +units=m +no_defs');
}

console.log('proj4 initialized with guaranteed defs function');
