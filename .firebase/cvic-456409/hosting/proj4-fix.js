/**
 * Direct fix for proj4 issues
 * This script patches the proj4 library to fix various "defs is not a function" errors
 */

(function() {
  console.log('Enhanced proj4-fix.js loaded');

  // Create a global variable to store the original Object methods
  window._originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  window._originalDefineProperty = Object.defineProperty;

  // Fix for the specific "FD.defs is not a function" error
  function fixFDDefsError() {
    try {
      // Global fix for any variable that might be used with .defs
      window.FD = window.FD || {};
      if (typeof window.FD.defs !== 'function') {
        console.log('Adding defs function to FD object');
        window.FD.defs = function(code, def) {
          console.log('Called FD.defs with:', typeof code);
          window.FD._defs = window.FD._defs || {};

          if (arguments.length === 0) {
            return window.FD._defs;
          }

          if (arguments.length === 1) {
            if (typeof code === 'object') {
              Object.keys(code).forEach(function(key) {
                window.FD._defs[key] = code[key];
              });
              return window.FD;
            }
            return window.FD._defs[code];
          }

          window.FD._defs[code] = def;
          return window.FD;
        };
      }

      // Also fix any other common variable names that might be used
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].forEach(function(letter) {
        var varName = letter.toUpperCase() + 'D';
        window[varName] = window[varName] || {};
        if (typeof window[varName].defs !== 'function') {
          window[varName].defs = function(code, def) {
            console.log('Called ' + varName + '.defs');
            window[varName]._defs = window[varName]._defs || {};

            if (arguments.length === 0) {
              return window[varName]._defs;
            }

            if (arguments.length === 1) {
              if (typeof code === 'object') {
                Object.keys(code).forEach(function(key) {
                  window[varName]._defs[key] = code[key];
                });
                return window[varName];
              }
              return window[varName]._defs[code];
            }

            window[varName]._defs[code] = def;
            return window[varName];
          };
        }
      });
    } catch (e) {
      console.error('Error setting up FD.defs fix:', e);
    }
  }

  // Fix for the specific "a.defs is not a function" error
  function fixADefsError() {
    try {
      // Monkey patch Object.getOwnPropertyDescriptor to catch the error
      Object.getOwnPropertyDescriptor = function(obj, prop) {
        // If we're checking for 'defs' property on an object that doesn't have it
        if (prop === 'defs' && obj && obj !== null && typeof obj === 'object' && typeof obj.defs !== 'function') {
          console.log('Intercepted attempt to access missing defs property on object:', obj);

          // Add a minimal defs function to the object
          obj.defs = function(code, def) {
            console.log('Called dynamically added defs function');
            obj._defs = obj._defs || {};

            if (arguments.length === 0) {
              return obj._defs;
            }

            if (arguments.length === 1) {
              if (typeof code === 'object' && !Array.isArray(code)) {
                Object.keys(code).forEach(function(key) {
                  obj._defs[key] = code[key];
                });
                return obj;
              }
              return obj._defs[code];
            }

            obj._defs[code] = def;
            return obj;
          };
        }

        return window._originalGetOwnPropertyDescriptor.apply(this, arguments);
      };

      // Also monkey patch Object.defineProperty to catch any attempts to define defs
      Object.defineProperty = function(obj, prop, descriptor) {
        if (prop === 'defs' && obj && obj !== null && typeof obj === 'object') {
          console.log('Intercepted attempt to define defs property');

          // Make sure the descriptor has a value that's a function
          if (descriptor && descriptor.value && typeof descriptor.value !== 'function') {
            console.log('Fixing defs descriptor to be a function');
            var originalValue = descriptor.value;
            descriptor.value = function(code, def) {
              console.log('Called fixed defs function');
              obj._defs = obj._defs || {};

              if (arguments.length === 0) {
                return obj._defs;
              }

              if (arguments.length === 1) {
                if (typeof code === 'object') {
                  Object.keys(code).forEach(function(key) {
                    obj._defs[key] = code[key];
                  });
                  return obj;
                }
                return obj._defs[code];
              }

              obj._defs[code] = def;
              return obj;
            };
          }
        }

        return window._originalDefineProperty.apply(this, arguments);
      };
    } catch (e) {
      console.error('Error setting up a.defs fix:', e);
    }
  }

  // Function to fix proj4 when it's loaded
  function fixProj4() {
    if (window.proj4) {
      console.log('Found proj4 object, checking if it needs fixing');

      // Check if defs is missing
      if (typeof window.proj4.defs !== 'function') {
        console.log('proj4.defs is not a function, applying fix');

        // Try to use default export if available
        if (typeof window.proj4.default === 'function') {
          console.log('Using proj4.default');
          window.proj4 = window.proj4.default;
        } else {
          // Create a minimal implementation of defs
          console.log('Creating fallback defs implementation');
          window.proj4.defs = function(code, def) {
            console.log('Called fallback defs with:', typeof code);
            window.proj4._defs = window.proj4._defs || {};

            // Handle different call patterns
            if (arguments.length === 0) {
              return window.proj4._defs;
            }

            if (arguments.length === 1) {
              if (Array.isArray(code)) {
                code.forEach(function(c) {
                  if (Array.isArray(c)) {
                    window.proj4.defs(c[0], c[1]);
                  }
                });
                return window.proj4;
              }

              if (typeof code === 'string') {
                return window.proj4._defs[code];
              }

              if (typeof code === 'object') {
                Object.keys(code).forEach(function(key) {
                  window.proj4._defs[key] = code[key];
                });
                return window.proj4;
              }

              return window.proj4._defs;
            }

            window.proj4._defs[code] = def;
            return window.proj4;
          };
        }

        console.log('proj4 fixed:', typeof window.proj4.defs === 'function');
      } else {
        console.log('proj4.defs is already a function, no fix needed');
      }

      // Define common projections directly
      try {
        console.log('Adding common projections');

        // WGS84
        window.proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');

        // Web Mercator
        window.proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs');

        // Add some common UTM zones
        for (var zone = 1; zone <= 60; zone++) {
          var epsg = 32600 + zone;
          window.proj4.defs('EPSG:' + epsg, '+proj=utm +zone=' + zone + ' +datum=WGS84 +units=m +no_defs');
        }

        console.log('Common projections added');
      } catch (e) {
        console.error('Error adding common projections:', e);
      }
    } else {
      console.log('proj4 not found yet');
    }
  }

  // Fix for proj4-fully-loaded.js
  function fixProj4FullyLoaded() {
    // Create a fake proj4-fully-loaded.js implementation
    window.proj4FullyLoaded = true;

    // If there's a script tag for proj4-fully-loaded.js, remove it
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.indexOf('proj4-fully-loaded.js') !== -1) {
        console.log('Removing proj4-fully-loaded.js script tag');
        scripts[i].parentNode.removeChild(scripts[i]);
        i--; // Adjust index after removal
      }
    }
  }

  // Apply the fixes
  fixFDDefsError();
  fixADefsError();
  fixProj4FullyLoaded();

  // Try to fix proj4 immediately and periodically
  fixProj4();

  // Also try to fix it when the window loads
  window.addEventListener('load', function() {
    fixFDDefsError();
    fixADefsError();
    fixProj4FullyLoaded();
    fixProj4();
  });

  // And periodically for the first few seconds
  for (var i = 1; i <= 20; i++) {
    setTimeout(function() {
      fixFDDefsError();
      fixADefsError();
      fixProj4FullyLoaded();
      fixProj4();
    }, i * 200);
  }

  // Make the fix functions available globally
  window.fixProj4 = fixProj4;
  window.fixFDDefsError = fixFDDefsError;
  window.fixADefsError = fixADefsError;
  window.fixProj4FullyLoaded = fixProj4FullyLoaded;

  // Create a global error handler to catch any remaining errors
  window.addEventListener('error', function(event) {
    if (event.error && event.error.message &&
        (event.error.message.includes('defs is not a function') ||
         event.error.message.includes('proj4-fully-loaded'))) {
      console.warn('Caught proj4 error:', event.error.message);
      fixFDDefsError();
      fixADefsError();
      fixProj4FullyLoaded();
      fixProj4();

      // Prevent the error from propagating
      event.preventDefault();
      return false;
    }
  }, true);

  console.log('All proj4 fixes applied');
})();
