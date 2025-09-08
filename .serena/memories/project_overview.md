# CVIc - Coastal Vulnerability Index Compiler

## Project Purpose
CVIc is the first web-based end-to-end application dedicated to coastal vulnerability assessment. It allows users to:
- Import/digitize shoreline data from satellite imagery or vector files
- Configure automated shoreline segmentation
- Select from multiple CVI variants (CVI, RCVI, ICVI)
- Assign vulnerability scores interactively
- Analyze results with visualizations
- Export data as GeoJSON, Shapefile, or HTML reports

## Technology Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with HMR
- **Styling**: Tailwind CSS + PostCSS
- **Mapping**: Leaflet + React-Leaflet
- **Geospatial Processing**: Turf.js, GeoTIFF.js, GeoRaster
- **Storage**: IndexedDB (via idb library)
- **File Processing**: Shapefile.js

## Live Application
- Production: https://alexandrosliaskos.github.io/CVIc/
- Version: 0.1.0