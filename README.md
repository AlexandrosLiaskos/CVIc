# CVIc (Coastal Vulnerability Index Compiler)

A streamlined application for computing coastal vulnerability indices from user-provided parameters.

## Overview

CVIc is a free and open-source application that provides an intuitive interface for calculating coastal vulnerability indices. It streamlines the process by offering flexible input methods and a user-friendly GUI.

## Key Features

- Streamlined CVI computation workflow
- User-friendly Graphical User Interface
- Flexible input methods (manual entry, file import, selection lists)
- Multiple data format support:
  - CSV
  - GeoJSON
  - Shapefiles
  - GeoTIF

## Modules

| Module | Description | Status | Version |
|--------|-------------|---------|----------|
| Parameter Input | Handles multiple input methods and data validation | Planned | 0.1.0 |
| Geomorphology | Processes geomorphological data | Planned | 0.1.0 |
| Slope | Processes slope data | Planned | 0.1.0 |
| Mean Wave Height | Processes wave height data | Planned | 0.1.0 |
| Mean Tidal Range | Processes tidal range data | Planned | 0.1.0 |
| Relative Sea Level | Processes sea level data | Planned | 0.1.0 |
| Coastal Erosion/Accretion | Processes erosion/accretion data | Planned | 0.1.0 |
| Coastal Vulnerability Index | Core CVI computation engine | Planned | 0.1.0 |

## Scientific Benefits

- **Rapid Assessment**: Streamlined CVI computation process
- **Flexibility**: Support for multiple input methods and computation approaches
- **Transparency**: Open-source code ensures computational transparency
- **Customizability**: Researchers can modify parameters and computation methods

## Installation

1. Clone this repository
2. Make the installation script executable:
   ```bash
   chmod +x install.sh
   ```
3. Run the installation script:
   ```bash
   ./install.sh
   ```

This will set up a Python virtual environment and install all required dependencies.

## Usage

1. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```

2. Run the main application:
   ```bash
   python src/main.py
   ```

### Individual Modules

Some modules can be run independently:

* Shoreline Module:
  ```bash
  ./src/modules/shoreline/setup_and_run.sh
  ```

* Shoreline GUI:
  ```bash
  python src/modules/shoreline/gui/run.py
  ```

## License

(TBD - License information will be added)

## Version

Current version: 1.0.0
Last updated: 2024-02-19
