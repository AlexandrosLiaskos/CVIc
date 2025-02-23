# CVIc Shoreline Detection Module

## Overview
This module provides automated shoreline detection capabilities for the Coastal Vulnerability Index Compiler (CVIc) project. It includes both a programmatic API and a graphical user interface.

## Quick Start

### One-Step Setup and Run
```bash
./setup_and_run.sh
```
This script will:
1. Set up all necessary permissions
2. Install dependencies
3. Configure Google Earth Engine
4. Launch the GUI application

### Manual Installation

1. Set up permissions:
```bash
cd gui
chmod +x set_permissions.sh
./set_permissions.sh
```

2. Install dependencies:
```bash
cd gui
./install.sh
```

3. Run the application:
```bash
cd gui
./run.py
```

## Module Structure
```
shoreline/
├── __init__.py               # Package initialization
├── config.py                 # Configuration classes
├── detector.py              # Main detector class
├── exceptions.py            # Custom exceptions
├── vectorizer.py           # Shoreline vectorization
├── water_detection.py      # Water detection algorithms
└── gui/                    # Graphical interface
    ├── __init__.py         # GUI package initialization
    ├── main_window.py      # Main application window
    ├── gee_interface.py    # Google Earth Engine interface
    ├── processor.py        # Processing worker
    ├── processing_manager.py # Thread management
    ├── run.py             # Application launcher
    ├── install.sh         # Installation script
    └── requirements.txt   # Dependencies
```

## Dependencies
- Python >= 3.8
- PyQt6 (GUI only)
- geemap (GUI only)
- earthengine-api
- numpy
- scipy
- shapely
- See `gui/requirements.txt` for complete list

## Usage

### GUI Application
1. Launch the application:
```bash
cd gui
./run.py
```

2. Draw an area of interest on the map
3. Select satellite source and parameters
4. Click "Process" to start detection
5. Export results when complete

### Programmatic API
```python
from coastal_erosion_accretion.shoreline import ShorelineDetector, ShorelineConfig

# Configure detector
config = ShorelineConfig(
    satellite={
        "source": "sentinel2",
        "water_index": "MNDWI",
        "date_range": {
            "start": "2024-01-01",
            "end": "2024-02-22"
        }
    }
)

# Create detector
detector = ShorelineDetector(config)

# Process imagery
shoreline = detector.detect_from_satellite(bands, metadata)
```

## Google Earth Engine Authentication
The module requires Google Earth Engine authentication. If not already authenticated:

```bash
earthengine authenticate
```

## Logging
Logs are stored in:
- GUI application: `~/.cvic/logs/shoreline_detector.log`
- API: Current directory or specified log path

## Contributing
1. Follow existing code style
2. Add tests for new functionality
3. Update documentation
4. Verify GUI functionality if applicable

## License
See the CVIc project license file.
