#!/bin/bash

# Script to install the Shoreline Detector GUI application

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Installing Shoreline Detector GUI...${NC}"

# Check Python version
python_version=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
required_version="3.8"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo -e "${RED}Error: Python $required_version or higher is required${NC}"
    echo -e "Current version: $python_version"
    exit 1
fi

# Create virtual environment
echo -e "\n${YELLOW}Creating virtual environment...${NC}"
python3 -m venv .venv

# Activate virtual environment
source .venv/bin/activate

# Upgrade pip
echo -e "\n${YELLOW}Upgrading pip...${NC}"
pip install --upgrade pip

# Install dependencies
echo -e "\n${YELLOW}Installing dependencies...${NC}"
pip install -r requirements.txt

# Check for Earth Engine authentication
echo -e "\n${YELLOW}Checking Earth Engine authentication...${NC}"
if ! earthengine authenticate --quiet; then
    echo -e "${RED}Error: Earth Engine authentication failed${NC}"
    echo "Please run 'earthengine authenticate' manually to set up authentication"
    exit 1
fi

# Make run script executable
chmod +x run.py

# Create desktop entry
echo -e "\n${YELLOW}Creating desktop shortcut...${NC}"
cat > ~/.local/share/applications/shoreline-detector.desktop << EOF
[Desktop Entry]
Name=Shoreline Detector
Comment=CVIc Shoreline Detection Tool
Exec=$(pwd)/run.py
Icon=utilities-terminal
Terminal=false
Type=Application
Categories=Science;Geography;
EOF

echo -e "\n${GREEN}Installation complete!${NC}"
echo -e "You can now run the application by:"
echo -e "1. Running './run.py' from this directory"
echo -e "2. Using the desktop shortcut 'Shoreline Detector'"
echo -e "\n${YELLOW}Note: Make sure you're authenticated with Google Earth Engine${NC}"

# Deactivate virtual environment
deactivate
