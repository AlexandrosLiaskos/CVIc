### 1. Main Application Window (CVIcApp)
- **Title Bar**: "CVIc - Coastal Vulnerability Index Compiler

- **Menu System**:
  - File: New Project, Open Project, Save Session, Exit
  - Tools: Shoreline Extraction, Geomorphology, Slope, Mean Wave Height, Mean Tidal Range, Relative Sea Level, Coastal Erosion/Accretion, CVI Calculator
  - Settings: General, User Preferences, About
  - Help: Documentation, Examples, Support

- **Main Canvas**:
  - Left Panel (30% width):
    - Project Tree (Parameters/Results)
    - Processing History Timeline
  - Right Panel (70% width):
    - Interactive Map View (Leaflet/OpenLayers integration)
    - Tabbed Interface for different analysis stages

### 2. Shoreline Extraction Workflow

**Step 1: AOI Selection Window**
- Map Controls:
  - Base Layers: OSM, Satellite, Topographic
  - Drawing Tools: Polygon, Rectangle, Freehand
  - Coordinate Input (DD/DMS)
- AOI Management:
  - Buffer Distance (0-5km)
  - AOI Properties Display (Area, Perimeter)
  - Import/Export AOI (GeoJSON/SHP)

### 2. Sensor Selection Panel (Enhanced Input Handling)

- **Source Type Toggle**:
  - [ ] GEE Collection
  - [ ] Local File
  - [ ] Pre-processed Asset

**Sensor-Specific Configuration**:

1. **Sentinel-1**:
   - *Input Source*:
     - GEE: `COPERNICUS/S1_GRD`
     - Local: GeoTIFF (VV/VH bands + metadata.xml)
     - Pre-processed: Asset ID or .SAFE.zip
   - *Processing Level*:
     - (Auto-detected) ➔ [Raw GRD] [Terrain Corrected]
     - DEM Source (if needed): [SRTM] [Copernicus] [Custom]
   - *Parameters*:
     - Polarization: ● VV ● VH ● Dual
     - Orbit: ▢ Ascending ▢ Descending
     - Speckle Filter: [Boxcar | Refined Lee]

2. **Sentinel-2**:
   - *Input Source*:
     - GEE: `COPERNICUS/S2_SR_HARMONIZED`
     - Local: .SAFE.zip (L1C/L2A)
     - Pre-processed: Composite Asset
   - *Processing Check*:
     - ▢ Atmospheric Corrected (L2A)
     - ▢ Cloud Masked
     - ▢ Resampled (10m)
   - *Parameters*:
     - Water Index: [MNDWI | NDWI | AWEI | SMBWI | WRI | Band8/NDWI2]
     - Composite: [Median | Percentile (80th)]
     - Atmospheric Correction: [Sen2Cor | LaSRT | ACOLITE | None]
     - Cloud Masking: [QA60 | s2cloudless | Custom]

3. **Landsat**:
   - *Input Source*:
     - GEE: `LANDSAT/LC08/C02/T1_L2`
     - Local: .TIF + MTL.txt
     - Pre-processed: Surface Reflectance
   - *Processing Check*:
     - ▢ SR Correction
     - ▢ Thermal Processed
     - ▢ Pan-sharpened
   - *Parameters*:
     - Band Combination: [Natural Color | False Color]
     - Pan-sharpening: [None | Brovey | PCA]
     - Surface Reflectance Level: [L1C | L2SP]
     - Thermal Band Options: [Include | Exclude | Pan-sharpen]
     - Water Index: [NDWI | mNDWI | AWEI]

**Temporal Parameters**
- Date Range Picker (Start/End)
- Seasonality Filters (Dry/Wet season)
- Cloud Cover Threshold (0-100% slider)

**Step 4: Processing Console**
- Real-time Progress:
  - Image Collection Status
  - Composite Generation
  - Water Mask Generation
  - Vectorization Steps
- System Resources Monitor
- Cancel/Pause Buttons

**Step 5: Results Visualization**
- Layer Management:
  - Raw Imagery (RGB/False Color)
  - Water Mask Overlay
  - Vector Shoreline
  - AOI Boundary
- Visualization Controls:
  - Opacity Sliders
  - Band Combinations
  - Histogram Stretch
  - Feature Inspection Tool

**Step 6: Export Panel**
- Vector Outputs:
  - Shoreline (GeoJSON/SHP/KML)
  - Water Bodies (GeoPackage)
- Raster Outputs:
  - Water Mask (GeoTIFF)
  - Index Layer (PNG/GeoTIFF)
  - RGB Composite (JPEG2000)
- Metadata:
  - Sensor Parameters
  - Processing Log
  - QC Report

### Workflow Transitions
1. New Project → AOI Selection → Sensor Choice → Parameters → Process → Results → Export
2. Direct access to any stage via project tree
3. Side-by-side comparison of different sensor results

### Key Differentiators from GEE Version
1. Local Processing Options (not just GEE-dependent)
2. Batch Processing Queue
3. Project-based Session Management
4. Integrated Documentation (Tooltips + Examples)
5. QC Dashboard with Accuracy Metrics

### Enhanced Processing Parameters

**Shoreline Extraction Validation**
- Accuracy Assessment Tools:
  - ▢ Compare with ground truth (vector overlay)
  - ▢ Error matrix (Commission/Omission)
  - ▢ Confidence Interval (95% default)
  - ▢ Temporal Consistency Check

**Automated QC Checks**
1. Geometric Validation:
   - Polygon closure verification
   - Self-intersection detection
2. Attribute Completeness:
   - CRS consistency
   - Metadata compliance (ISO 19115)
3. Statistical Validation:
   - Mean shoreline position variance
   - Seasonal fluctuation analysis

### Advanced Export Options
- **Projection Choices**:
  - WGS84 (EPSG:4326)
  - UTM Zone (auto-detected)
  - Web Mercator (EPSG:3857)

- **Metadata Standards**:
  - ISO 19115-2 (XML)
  - FGDC-CSDGM (TXT)
  - Custom JSON schema

### Batch Processing System
1. Queue Management:
   - Drag-and-drop prioritization
   - Resource allocation slider (CPU/RAM)
   - Error handling: [Stop on error | Skip | Retry (3x)]
2. Template System:
   - Save parameter sets as .cvi-template
   - Apply templates across multiple AOIs
   - Chain templates for multi-sensor analysis

### Integrated Documentation Features
- Context-Sensitive Help:
  - F1 on any parameter: Algorithm whitepaper
  - Ctrl+Hover: Sensor specifications
  - Right-click menu: Example datasets
- Validation Rules Engine:
  - Real-time parameter constraints
  - Cross-validation between steps
  - Dependency highlighting
