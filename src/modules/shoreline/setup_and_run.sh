#!/bin/bash

# Master initialization script for CVIc Shoreline Detection module

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}CVIc Shoreline Detection - Setup and Run Script${NC}"
echo "----------------------------------------"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Python installation
echo -e "\n${YELLOW}Checking Python installation...${NC}"
if ! command_exists python3; then
    echo -e "${RED}Error: Python 3 is not installed${NC}"
    echo "Please install Python 3.8 or higher"
    exit 1
fi

# Check Python version
python_version=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
required_version="3.8"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo -e "${RED}Error: Python $required_version or higher is required${NC}"
    echo -e "Current version: $python_version"
    exit 1
fi

echo -e "${GREEN}Python $python_version detected${NC}"

# Make scripts executable
echo -e "\n${YELLOW}Setting up permissions...${NC}"
chmod +x gui/set_permissions.sh
chmod +x gui/install.sh
chmod +x gui/run.py

# Run permission setup script
cd gui
./set_permissions.sh
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Permission setup failed${NC}"
    exit 1
fi

# Check for Earth Engine CLI
echo -e "\n${YELLOW}Checking Earth Engine CLI...${NC}"
if ! command_exists earthengine; then
    echo -e "${YELLOW}Earth Engine CLI not found. Installing...${NC}"
    pip install earthengine-api
fi

# Check Earth Engine authentication
echo -e "\n${YELLOW}Checking Earth Engine authentication...${NC}"
if ! earthengine --quiet validate; then
    echo -e "${YELLOW}Earth Engine requires authentication${NC}"
    earthengine authenticate
fi

# Run installation script
echo -e "\n${YELLOW}Running installation script...${NC}"
./install.sh
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Installation failed${NC}"
    exit 1
fi

# Create log directory
echo -e "\n${YELLOW}Setting up log directory...${NC}"
mkdir -p ~/.cvic/logs

# Launch application
echo -e "\n${GREEN}Setup complete! Launching application...${NC}"
./run.py

# Return to original directory
cd - > /dev/null
