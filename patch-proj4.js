/**
 * Script to patch the proj4 module in node_modules
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the proj4 module
const proj4Path = path.resolve(__dirname, 'node_modules/proj4/dist/proj4.js');

console.log(`Patching proj4 module at: ${proj4Path}`);

// Read the proj4 module
let proj4Content = fs.readFileSync(proj4Path, 'utf8');

// Check if the module has already been patched
if (proj4Content.includes('// PATCHED FOR CVIC')) {
  console.log('proj4 module already patched');
  process.exit(0);
}

// Add a patch to ensure the defs function is always available
const patchedContent = proj4Content.replace(
  'var proj4 = factory();',
  `var proj4 = factory();

// PATCHED FOR CVIC
// Ensure defs function is always available
if (!proj4.defs) {
  console.warn('proj4.defs is not available, creating a custom implementation');

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

  console.log('proj4.defs patched successfully');
}`
);

// Write the patched content back to the file
fs.writeFileSync(proj4Path, patchedContent);

console.log('proj4 module patched successfully');

// Also patch the ESM version
const proj4EsmPath = path.resolve(__dirname, 'node_modules/proj4/dist/proj4-src.js');

if (fs.existsSync(proj4EsmPath)) {
  console.log(`Patching proj4 ESM module at: ${proj4EsmPath}`);

  // Read the proj4 ESM module
  let proj4EsmContent = fs.readFileSync(proj4EsmPath, 'utf8');

  // Check if the module has already been patched
  if (proj4EsmContent.includes('// PATCHED FOR CVIC')) {
    console.log('proj4 ESM module already patched');
    process.exit(0);
  }

  // Add a patch to ensure the defs function is always available
  const patchedEsmContent = proj4EsmContent.replace(
    'export default proj4;',
    `// PATCHED FOR CVIC
// Ensure defs function is always available
if (!proj4.defs) {
  console.warn('proj4.defs is not available in ESM, creating a custom implementation');

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

  console.log('proj4.defs patched successfully in ESM');
}

export default proj4;`
  );

  // Write the patched content back to the file
  fs.writeFileSync(proj4EsmPath, patchedEsmContent);

  console.log('proj4 ESM module patched successfully');
}

console.log('All patches applied successfully');
