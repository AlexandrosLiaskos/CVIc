# 3. Sensor Selection Panel (Enhanced Input Handling)

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
