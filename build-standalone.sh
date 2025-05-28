#!/bin/bash

# Simple build script for CVIc application that uses a standalone HTML page
# This script creates a minimal build that will definitely work

echo "Starting CVIc standalone build process..."

# Create dist directory if it doesn't exist
mkdir -p dist

# Copy the standalone HTML file to the dist directory as index.html
echo "Copying standalone HTML file..."
cp standalone.html dist/index.html

# Copy any assets needed
echo "Copying assets..."
if [ -d "public" ]; then
  cp -r public/* dist/
fi

echo "Build completed successfully!"
echo "You can now deploy the 'dist' directory to your hosting provider."
echo "For Firebase hosting, run: firebase deploy --only hosting"
