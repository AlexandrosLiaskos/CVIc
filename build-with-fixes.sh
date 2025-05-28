#!/bin/bash

# Comprehensive build script for CVIc application with all fixes
# This script ensures all fix scripts are properly included in the build

echo "Starting CVIc build process with all fixes..."

# Clean up previous build
echo "Cleaning up previous build..."
rm -rf dist

# Make sure public directory exists
mkdir -p public

# Apply patches to proj4 and proj4-fully-loaded
echo "Applying patches to proj4..."
node patch-proj4.js

echo "Applying patches to proj4-fully-loaded..."
node patch-proj4-fully-loaded.js

# Build the application
echo "Building the application..."
npm run build

# Ensure all fix scripts are copied to the dist directory
echo "Copying fix scripts to dist directory..."
cp public/leaflet-fix.js dist/
cp public/proj4-fix.js dist/
cp public/proj4-init.js dist/
cp public/proj4-defs.js dist/
cp public/proj4-fully-loaded-preload.js dist/
cp public/proj4-fully-loaded.js dist/

echo "All fix scripts copied to dist directory"

# Copy the index.html to 404.html for SPA routing
echo "Setting up SPA routing..."
cp dist/index.html dist/404.html

echo "Build completed successfully!"
echo "You can now test the application by running: npm run preview"
echo "Or deploy to Firebase by running: firebase deploy --only hosting"
