#!/bin/bash

echo "Installing CVIc - Coastal Vulnerability Index Compiler..."

# Create and activate virtual environment
echo "Setting up Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install all dependencies
echo "Installing all dependencies..."

# Install base dependencies first
echo "Installing base dependencies..."
pip install --upgrade pip setuptools wheel

# Core dependencies from main requirements.txt
echo "Installing core dependencies..."
pip install -r requirements.txt

# Shoreline module dependencies
echo "Installing shoreline module dependencies..."
pip install -r src/modules/shoreline/requirements.txt

# GUI dependencies
echo "Installing GUI dependencies..."
pip install -r src/modules/shoreline/gui/requirements.txt

# Make sure all scripts are executable
echo "Setting up permissions..."
chmod +x src/main.py
if [ -f src/modules/shoreline/setup_and_run.sh ]; then
    chmod +x src/modules/shoreline/setup_and_run.sh
fi
if [ -f src/modules/shoreline/gui/install.sh ]; then
    chmod +x src/modules/shoreline/gui/install.sh
fi
if [ -f src/modules/shoreline/gui/run.py ]; then
    chmod +x src/modules/shoreline/gui/run.py
fi

echo "============================================"
echo "Installation complete! You have two options:"
echo "============================================"
echo ""
echo "Option 1: Run the complete CVIc application"
echo "-----------------------------------------"
echo "This launches the main hub with access to all modules:"
echo "1. Activate virtual environment:"
echo "   source venv/bin/activate"
echo "2. Run main application:"
echo "   python src/main.py"
echo ""
echo "Option 2: Run Shoreline Detector directly"
echo "--------------------------------------"
echo "If you only need the shoreline detection module:"
echo "1. Activate virtual environment:"
echo "   source venv/bin/activate"
echo "2. Run shoreline detector:"
echo "   python src/modules/shoreline/gui/run.py"
echo ""
echo "Note: Make sure you're authenticated with Google Earth Engine"
echo "      before using the Shoreline Detector (run 'earthengine authenticate')"
