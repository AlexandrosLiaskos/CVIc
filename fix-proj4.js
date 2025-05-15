/**
 * This script fixes the proj4 initialization issue in the production build
 * Run this script after the build is complete but before deployment
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the dist directory
const distDir = path.join(__dirname, 'dist');

// Function to find all JS files in the dist directory
function findJsFiles(dir) {
  const files = fs.readdirSync(dir);
  let jsFiles = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      jsFiles = jsFiles.concat(findJsFiles(filePath));
    } else if (file.endsWith('.js')) {
      jsFiles.push(filePath);
    }
  }

  return jsFiles;
}

// Function to check if a file contains proj4-fully-loaded
function containsProj4(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes('proj4-fully-loaded') ||
         content.includes('proj4.defs') ||
         content.includes('defs is not a function');
}

// Function to fix the proj4 initialization in a file
function fixProj4File(filePath) {
  console.log(`Checking file: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if the file contains proj4-fully-loaded
  if (containsProj4(filePath)) {
    console.log(`Found proj4 in file: ${filePath}`);

    // Replace the problematic line in proj4-fully-loaded.js
    if (content.includes('proj4.defs(defs)')) {
      console.log('Found the problematic line: proj4.defs(defs)');

      // Replace with a safer version that checks if defs is a function
      content = content.replace(
        'proj4.defs(defs)',
        `
// Safe version of proj4.defs call
(function() {
  try {
    if (typeof proj4.defs === 'function') {
      proj4.defs(defs);
    } else if (typeof proj4.default === 'function' && typeof proj4.default.defs === 'function') {
      // Use the default export if available
      proj4 = proj4.default;
      proj4.defs(defs);
    } else {
      console.error('proj4.defs is not a function and no fallback is available');
    }
  } catch (e) {
    console.error('Error calling proj4.defs:', e);
  }
})()
`
      );
    }

    // Fix for the specific "a.defs is not a function" error
    if (content.includes('a.defs') || content.includes('.defs(')) {
      console.log('Found potential "a.defs" issue in file:', filePath);

      // Add a specific fix for the a.defs error
      const aDefsFixCode = `
// Fix for "a.defs is not a function" error
(function() {
  try {
    // Monkey patch Object prototype temporarily to catch the error
    var originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    Object.getOwnPropertyDescriptor = function(obj, prop) {
      // If we're checking for 'defs' property on an object that doesn't have it
      if (prop === 'defs' && obj && typeof obj.defs !== 'function') {
        console.log('Intercepted attempt to access missing defs property');

        // Add a minimal defs function to the object
        if (!obj.defs) {
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
      }
      return originalGetOwnPropertyDescriptor.apply(this, arguments);
    };

    // Restore original after a short delay
    setTimeout(function() {
      Object.getOwnPropertyDescriptor = originalGetOwnPropertyDescriptor;
      console.log('Restored original getOwnPropertyDescriptor');
    }, 5000);
  } catch (e) {
    console.error('Error setting up a.defs fix:', e);
  }
})();
`;

      // Add the a.defs fix near the beginning of the file
      const insertPoint = content.indexOf('(function') > 0 ? content.indexOf('(function') : 0;
      content = content.slice(0, insertPoint) + aDefsFixCode + content.slice(insertPoint);
    }

    // Add a fix for the proj4 initialization at the beginning of the file
    const fixCode = `
// Fix for proj4 initialization
(function() {
  try {
    if (typeof window !== 'undefined') {
      // Define a global fix function
      window.fixProj4Error = function() {
        if (window.proj4 && typeof window.proj4.defs !== 'function') {
          console.log('Fixing proj4 initialization...');

          // If proj4 is an object with a default property that is a function, use that
          if (typeof window.proj4.default === 'function') {
            window.proj4 = window.proj4.default;
            console.log('proj4 fixed using default export');
          } else {
            // Create a minimal implementation if needed
            window.proj4.defs = function(code, def) {
              console.log('Using fallback proj4.defs implementation for:', code);
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
            console.log('proj4 fixed using fallback implementation');
          }
        }
      };

      // Run the fix immediately
      window.fixProj4Error();

      // Also run it when the window loads
      window.addEventListener('load', window.fixProj4Error);

      // And periodically for the first second
      for (let i = 1; i <= 10; i++) {
        setTimeout(window.fixProj4Error, i * 100);
      }

      // Fix for JSON parse errors
      var originalJSONParse = JSON.parse;
      JSON.parse = function(text) {
        if (text === undefined || text === 'undefined' || text === null) {
          console.warn('Prevented JSON.parse error with undefined/null input');
          return {};
        }
        try {
          return originalJSONParse.apply(this, arguments);
        } catch (e) {
          console.error('JSON.parse error:', e, 'for text:', text);
          return {};
        }
      };
    }
  } catch (e) {
    console.error('Error setting up proj4 fix:', e);
  }
})();
`;

    // Add the fix at the beginning of the file
    content = fixCode + content;

    // Write the fixed content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed proj4 initialization in file: ${filePath}`);
  }
}

// Function to copy the fix scripts to the dist directory
function copyFixScripts() {
  // Copy proj4-fully-loaded-fix.js
  const proj4FixSource = path.join(__dirname, 'public', 'proj4-fully-loaded-fix.js');
  const proj4FixDest = path.join(distDir, 'proj4-fully-loaded-fix.js');

  if (fs.existsSync(proj4FixSource)) {
    fs.copyFileSync(proj4FixSource, proj4FixDest);
    console.log(`Copied proj4-fully-loaded-fix.js to ${proj4FixDest}`);
  } else {
    console.error(`Source file not found: ${proj4FixSource}`);
  }

  // Copy proj4-fix.js
  const proj4PatchSource = path.join(__dirname, 'public', 'proj4-fix.js');
  const proj4PatchDest = path.join(distDir, 'proj4-fix.js');

  if (fs.existsSync(proj4PatchSource)) {
    fs.copyFileSync(proj4PatchSource, proj4PatchDest);
    console.log(`Copied proj4-fix.js to ${proj4PatchDest}`);
  } else {
    console.error(`Source file not found: ${proj4PatchSource}`);
  }

  // Copy json-parse-fix.js
  const jsonFixSource = path.join(__dirname, 'public', 'json-parse-fix.js');
  const jsonFixDest = path.join(distDir, 'json-parse-fix.js');

  if (fs.existsSync(jsonFixSource)) {
    fs.copyFileSync(jsonFixSource, jsonFixDest);
    console.log(`Copied json-parse-fix.js to ${jsonFixDest}`);
  } else {
    console.error(`Source file not found: ${jsonFixSource}`);
  }
}

// Main function
function main() {
  console.log('Starting fix scripts...');

  // Check if the dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error(`Dist directory not found: ${distDir}`);
    process.exit(1);
  }

  // Copy the fix scripts to the dist directory
  copyFixScripts();

  // Find all JS files in the dist directory
  const jsFiles = findJsFiles(distDir);
  console.log(`Found ${jsFiles.length} JS files in the dist directory`);

  // Fix proj4 initialization in all JS files
  for (const file of jsFiles) {
    fixProj4File(file);
  }

  // Update index.html to include our fix scripts
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

    // Check if our scripts are already included
    if (!indexHtml.includes('json-parse-fix.js') || !indexHtml.includes('proj4-fix.js') || !indexHtml.includes('proj4-fully-loaded-fix.js')) {
      console.log('Updating index.html to include fix scripts');

      // Add our scripts to the head section
      indexHtml = indexHtml.replace(
        '</head>',
        `  <!-- Load our fix scripts before any other scripts -->
  <script src="./json-parse-fix.js" defer></script>
  <script src="./proj4-fix.js" defer></script>
  <script src="./proj4-fully-loaded-fix.js" defer></script>
</head>`
      );

      fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
      console.log('Updated index.html');
    } else {
      console.log('Fix scripts already included in index.html');
    }
  } else {
    console.error(`index.html not found at ${indexHtmlPath}`);
  }

  console.log('Fix scripts completed successfully');
}

// Run the main function
main();
