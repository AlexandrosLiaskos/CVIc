#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}CVIc Shoreline Detection - Setup Script${NC}"

# Check Python version
python_version=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
required_version="3.8"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo -e "${RED}Error: Python $required_version or higher is required${NC}"
    echo -e "Current version: $python_version"
    exit 1
fi

# Create virtual environment if it doesn't exist
VENV_DIR=".venv"
if [ ! -d "$VENV_DIR" ]; then
    echo -e "\n${YELLOW}Creating virtual environment...${NC}"
    python3 -m venv $VENV_DIR
else
    echo -e "\n${YELLOW}Virtual environment already exists${NC}"
fi

# Activate virtual environment
source $VENV_DIR/bin/activate

# Upgrade pip
echo -e "\n${YELLOW}Upgrading pip...${NC}"
pip install --upgrade pip

# Install dependencies
echo -e "\n${YELLOW}Installing dependencies...${NC}"
pip install -r requirements.txt

# Check for Earth Engine authentication
echo -e "\n${YELLOW}Checking Earth Engine authentication...${NC}"
if ! earthengine authenticate --quiet; then
    echo -e "${RED}Warning: Earth Engine authentication needed${NC}"
    echo "Please run 'earthengine authenticate' manually to set up authentication"
fi

# Create log directory
echo -e "\n${YELLOW}Setting up log directory...${NC}"
mkdir -p ~/.cvic/logs

# Set executable permissions
echo -e "\n${YELLOW}Setting permissions...${NC}"
chmod +x run.py

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "To run the application:"
echo -e "1. Activate the virtual environment: ${YELLOW}source .venv/bin/activate${NC}"
echo -e "2. Run the application: ${YELLOW}./run.py${NC}"

# Deactivate virtual environment
deactivate
