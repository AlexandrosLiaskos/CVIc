/**
 * This script updates the index.html file in the dist directory
 * to include our fix scripts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the dist directory
const distDir = path.join(__dirname, 'dist');

// Path to the index.html file
const indexHtmlPath = path.join(distDir, 'index.html');

// Main function
function main() {
  console.log('Starting fix-index-html.js...');

  // Check if the dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error(`Dist directory not found: ${distDir}`);
    process.exit(1);
  }

  // Check if the index.html file exists
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`index.html not found at ${indexHtmlPath}`);
    process.exit(1);
  }

  // Read the index.html file
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // Check if our scripts are already included
  if (!indexHtml.includes('json-parse-fix.js') || !indexHtml.includes('proj4-fix.js')) {
    console.log('Updating index.html to include fix scripts');

    // Add our scripts to the head section
    indexHtml = indexHtml.replace(
      '</head>',
      `  <!-- Load our fix scripts before any other scripts -->
  <script src="./json-parse-fix.js" defer></script>
  <script src="./proj4-fix.js" defer></script>
</head>`
    );

    // Write the updated index.html file
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    console.log('Updated index.html');
  } else {
    console.log('Fix scripts already included in index.html');
  }

  console.log('fix-index-html.js completed successfully');
}

// Run the main function
main();
