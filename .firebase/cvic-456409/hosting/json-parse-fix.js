/**
 * Fix for JSON.parse errors
 * This script patches the JSON.parse method to handle undefined/null inputs
 * and other common parsing errors
 */

(function() {
  console.log('json-parse-fix.js loaded');
  
  // Function to fix JSON.parse
  function fixJsonParse() {
    if (typeof JSON !== 'undefined' && typeof JSON.parse === 'function') {
      console.log('Found JSON.parse, applying fix');
      
      // Store the original parse function
      var originalJSONParse = JSON.parse;
      
      // Replace with a safer version
      JSON.parse = function(text) {
        // Handle undefined/null inputs
        if (text === undefined || text === 'undefined' || text === null) {
          console.warn('Prevented JSON.parse error with undefined/null input');
          return {};
        }
        
        // Handle empty string
        if (text === '') {
          console.warn('Prevented JSON.parse error with empty string');
          return {};
        }
        
        // Try to parse, but catch errors
        try {
          return originalJSONParse.apply(this, arguments);
        } catch (e) {
          console.error('JSON.parse error:', e, 'for text:', text);
          // Return empty object instead of throwing
          return {};
        }
      };
      
      console.log('JSON.parse fixed');
    } else {
      console.log('JSON.parse not found or not a function');
    }
  }
  
  // Apply the fix immediately
  fixJsonParse();
  
  // Also apply it when the window loads
  if (typeof window !== 'undefined') {
    window.addEventListener('load', fixJsonParse);
    
    // And periodically for the first few seconds
    for (var i = 1; i <= 10; i++) {
      setTimeout(fixJsonParse, i * 200);
    }
  }
})();
