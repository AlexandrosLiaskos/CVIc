#!/bin/bash

# Simple build script for CVIc application
# This script builds the application for production deployment without any patches

echo "Starting CVIc build process..."

# Clean up previous build
echo "Cleaning up previous build..."
rm -rf dist

# Build the application
echo "Building the application..."
npm run build

# Copy the index.html to 404.html for SPA routing
echo "Setting up SPA routing..."
cp dist/index.html dist/404.html

echo "Build completed successfully!"
echo "You can now test the application by running: npm run preview"
echo "Or deploy to Firebase by running: firebase deploy --only hosting"
