#!/bin/bash

# Build script for CVIc application with Leaflet SVG namespace fix
# This script ensures the leaflet-fix.js file is properly included in the build

echo "Starting CVIc build process with Leaflet fix..."

# Clean up previous build
echo "Cleaning up previous build..."
rm -rf dist

# Make sure public directory exists
mkdir -p public

# Apply patches to proj4
echo "Applying patches to proj4..."
node patch-proj4.js

# Build the application
echo "Building the application..."
npm run build

# Ensure the fix scripts are copied to the dist directory
echo "Copying fix scripts to dist directory..."
cp public/leaflet-fix.js dist/
cp public/proj4-fix.js dist/
cp public/proj4-init.js dist/
cp public/proj4-defs.js dist/
cp public/proj4-fully-loaded-fix.js dist/

echo "All fix scripts copied to dist directory"

echo "Build completed successfully!"
echo "You can now test the application by running: npm run preview"
echo "Or deploy to Firebase by running: firebase deploy --only hosting"
