/**
 * Script to patch the proj4-fully-loaded module in node_modules
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the proj4-fully-loaded module
const proj4FullyLoadedPath = path.resolve(__dirname, 'node_modules/proj4-fully-loaded/dist/proj4-fully-loaded.js');

console.log(`Patching proj4-fully-loaded module at: ${proj4FullyLoadedPath}`);

// Check if the file exists
if (!fs.existsSync(proj4FullyLoadedPath)) {
  console.error(`Error: ${proj4FullyLoadedPath} does not exist`);
  process.exit(1);
}

// Read the proj4-fully-loaded module
let proj4FullyLoadedContent = fs.readFileSync(proj4FullyLoadedPath, 'utf8');

// Check if the module has already been patched
if (proj4FullyLoadedContent.includes('// PATCHED FOR CVIC')) {
  console.log('proj4-fully-loaded module already patched');
  process.exit(0);
}

// Add a patch to ensure the defs function is always available
const patchedContent = `// PATCHED FOR CVIC
// This is a patched version of proj4-fully-loaded that ensures the defs function is always available
${proj4FullyLoadedContent}

// Ensure defs function is always available
if (typeof proj4 !== 'undefined' && !proj4.defs) {
  console.warn('proj4.defs is not available in proj4-fully-loaded, creating a custom implementation');

  // Create a storage for definitions
  var definitions = {};

  // Define the defs function
  proj4.defs = function(name, projection) {
    // If only name is provided, return the definition
    if (arguments.length === 1) {
      return definitions[name];
    }

    // If both name and projection are provided, store the definition
    if (projection) {
      definitions[name] = projection;
    }

    return this;
  };

  // Add common projections
  proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
  proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs');

  console.log('proj4.defs patched successfully in proj4-fully-loaded');
}
`;

// Write the patched content back to the file
fs.writeFileSync(proj4FullyLoadedPath, patchedContent);

console.log('proj4-fully-loaded module patched successfully');

// Also check for the ESM version
const proj4FullyLoadedEsmPath = path.resolve(__dirname, 'node_modules/proj4-fully-loaded/dist/proj4-fully-loaded.esm.js');

if (fs.existsSync(proj4FullyLoadedEsmPath)) {
  console.log(`Patching proj4-fully-loaded ESM module at: ${proj4FullyLoadedEsmPath}`);

  // Read the proj4-fully-loaded ESM module
  let proj4FullyLoadedEsmContent = fs.readFileSync(proj4FullyLoadedEsmPath, 'utf8');

  // Check if the module has already been patched
  if (proj4FullyLoadedEsmContent.includes('// PATCHED FOR CVIC')) {
    console.log('proj4-fully-loaded ESM module already patched');
    process.exit(0);
  }

  // Add a patch to ensure the defs function is always available
  const patchedEsmContent = `// PATCHED FOR CVIC
// This is a patched version of proj4-fully-loaded ESM that ensures the defs function is always available
${proj4FullyLoadedEsmContent}

// Ensure defs function is always available
if (typeof proj4 !== 'undefined' && !proj4.defs) {
  console.warn('proj4.defs is not available in proj4-fully-loaded ESM, creating a custom implementation');

  // Create a storage for definitions
  var definitions = {};

  // Define the defs function
  proj4.defs = function(name, projection) {
    // If only name is provided, return the definition
    if (arguments.length === 1) {
      return definitions[name];
    }

    // If both name and projection are provided, store the definition
    if (projection) {
      definitions[name] = projection;
    }

    return this;
  };

  // Add common projections
  proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
  proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs');

  console.log('proj4.defs patched successfully in proj4-fully-loaded ESM');
}
`;

  // Write the patched content back to the file
  fs.writeFileSync(proj4FullyLoadedEsmPath, patchedEsmContent);

  console.log('proj4-fully-loaded ESM module patched successfully');
}

console.log('All patches applied successfully');
