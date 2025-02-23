# Project Overview

CVIc is a desktop application mainly built upon python, that helps compute coastal vulnerability indices for a given area in a GUI user-friendly interface.

## Application Structure

### **Main Window (CVIcApp)**
- Title: "CVIc - Coastal Vulnerability Index Compiler"
- Contains the welcome screen
- Outlines the main features of the application (horeline Detection and Extraction + upcoming features)
- Starts the application

### **Shoreline Detection and Extraction Window**
1. Area of Interest Selection in an interactive map
   - Interactive polygon drawing tool
   - Map preview with crosshair cursor
   - Satellite imagery background
   - Real-time visualization
   - Feature editing capabilities

2. Detection Method Selection
   - Sentinel-1 SAR option
   - Sentinel-2 Optical option
   - Landsat 8/9 option

3. Image Collection Parameters
   - Date range selection (start/end dates)
   - Cloud cover threshold (optical sensors)
   - Advanced water index selection (Sentinel-2)
     - MNDWI (Modified Normalized Difference Water Index)
     - NDWI (Normalized Difference Water Index)
     - AWEInsh/AWEIsh (Automated Water Extraction Index)
     - SMBWI (Sentinel Multi-Band Water Index)
     - WRI (Water Ratio Index)
     - Band8/NDWI2 options

4. Results Display
   - Layer visualization
     - Raw satellite imagery
     - Water mask overlay
     - Vectorized shoreline
   - Interactive map controls
     - Layer toggling
     - Opacity adjustment
     - Zoom/pan navigation

5. Exports Panel
   - Vector formats
      - Shoreline vectors (SHP)
   - Raster outputs
      - RGB composites (GeoTIFF)
      - Water index layers (GeoTIFF)
      - Binary water masks (GeoTIFF)

### Processing Status
- Progress indicators
- Error handling
- Processing statistics
- Result summaries

### Additional Features
- Automatic AOI buffering
- Cloud filtering for optical imagery
- Median composite generation
- Multi-temporal analysis support
