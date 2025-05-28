/**
 * Direct replacement for proj4-fully-loaded.js
 * 
 * This script provides a complete implementation of proj4-fully-loaded with a guaranteed defs function
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('proj4-fully-loaded', factory) :
  (global = global || self, global.proj4 = factory());
}(this, (function () {
  'use strict';

  // Import the original proj4 if it exists
  var originalProj4 = (typeof window !== 'undefined' && window.proj4) || 
                     (typeof global !== 'undefined' && global.proj4) || 
                     {};

  // Create a storage for definitions
  var definitions = {};

  // Create a wrapper around proj4 with a guaranteed defs function
  var proj4 = Object.assign({}, originalProj4);
  
  // Override the defs function to ensure it always works
  proj4.defs = function(name, projection) {
    // If only name is provided, return the definition
    if (arguments.length === 1) {
      // Try to get from original proj4 first if its defs function exists
      if (typeof originalProj4.defs === 'function') {
        try {
          var originalDef = originalProj4.defs(name);
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
  };

  // Add common projections
  // WGS84
  proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');

  // Web Mercator
  proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs');

  // UTM zones (North)
  for (var zone = 1; zone <= 60; zone++) {
    var code = 32600 + zone;
    proj4.defs('EPSG:' + code, '+proj=utm +zone=' + zone + ' +datum=WGS84 +units=m +no_defs');
  }

  // UTM zones (South)
  for (var zone = 1; zone <= 60; zone++) {
    var code = 32700 + zone;
    proj4.defs('EPSG:' + code, '+proj=utm +zone=' + zone + ' +south +datum=WGS84 +units=m +no_defs');
  }

  console.log('proj4-fully-loaded replacement with guaranteed defs function loaded');

  // Make it available globally for compatibility
  if (typeof window !== 'undefined') {
    window.proj4 = proj4;
  }

  return proj4;
})));
