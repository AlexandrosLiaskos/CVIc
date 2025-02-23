#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}CVIc - Coastal Vulnerability Index Compiler - Setup${NC}"

# Check Python version
python_version=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
required_version="3.8"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo -e "${RED}Error: Python $required_version or higher is required${NC}"
    echo -e "Current version: $python_version"
    exit 1
fi

# Create virtual environment in project root
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

# Install main application dependencies
echo -e "\n${YELLOW}Installing main application dependencies...${NC}"
pip install -r requirements.txt

# Install module-specific dependencies
echo -e "\n${YELLOW}Installing module dependencies...${NC}"
if [ -f "src/modules/shoreline/requirements.txt" ]; then
    pip install -r src/modules/shoreline/requirements.txt
fi

# Check for Earth Engine authentication
echo -e "\n${YELLOW}Checking Earth Engine authentication...${NC}"
if ! earthengine authenticate --quiet; then
    echo -e "${RED}Warning: Earth Engine authentication needed${NC}"
    echo "Please run 'earthengine authenticate' manually to set up authentication"
fi

# Create necessary directories
echo -e "\n${YELLOW}Setting up project structure...${NC}"
mkdir -p ~/.cvic/logs
mkdir -p src/modules/shoreline/gui/temp

# Set permissions for executable files
echo -e "\n${YELLOW}Setting file permissions...${NC}"
chmod +x src/main.py
find . -name "*.sh" -exec chmod +x {} \;

# Create desktop entry
echo -e "\n${YELLOW}Creating desktop shortcut...${NC}"
cat > ~/.local/share/applications/cvic.desktop << EOF
[Desktop Entry]
Name=CVIc
Comment=Coastal Vulnerability Index Compiler
Exec=$(pwd)/src/main.py
Icon=utilities-terminal
Terminal=false
Type=Application
Categories=Science;Geography;
EOF

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "To run the application:"
echo -e "1. Activate the virtual environment: ${YELLOW}source .venv/bin/activate${NC}"
echo -e "2. Run the application: ${YELLOW}./src/main.py${NC}"
echo -e "\nOr use the desktop shortcut 'CVIc'"

# Deactivate virtual environment
deactivate
