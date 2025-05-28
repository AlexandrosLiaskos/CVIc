/**
 * Proj4 fix for production builds
 * 
 * This script ensures that proj4.defs is available before the main bundle loads
 */

(function() {
  // Create a global proj4 object if it doesn't exist
  window.proj4 = window.proj4 || {};
  
  // Define the defs function if it doesn't exist
  if (!window.proj4.defs) {
    // Store definitions
    const definitions = {};
    
    // Create the defs function
    window.proj4.defs = function(name, projection) {
      // If only name is provided, return the definition
      if (arguments.length === 1) {
        return definitions[name];
      }
      
      // If both name and projection are provided, store the definition
      definitions[name] = projection;
      return this;
    };
    
    console.log('Proj4 defs function patched');
  }
})();
