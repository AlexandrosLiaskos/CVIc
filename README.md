# CVIc - Coastal Vulnerability Index Compiler

CVIc is a web-based tool designed to streamline the process of calculating a Coastal Vulnerability Index. It enables researchers, coastal managers, and environmental scientists to perform complete CVI calculations directly in the browser.

## 📋 Features

- **Shoreline Management**: Upload existing shoreline data or digitize new shorelines from satellite imagery
- **Shoreline Segmentation**: Automatically divide shorelines into analysis segments
- **Parameter Selection**: Choose and weight vulnerability parameters based on research needs
- **Value Assignment**: Assign vulnerability scores to shoreline segments through an interactive interface
- **CVI Calculation**: Apply different formulas to calculate the vulnerability index
- **Results Visualization**: View results on interactive maps with customizable symbology
- **Data Export**: Export results as GeoJSON for use in GIS software or as HTML reports

## 🔧 Technology Stack

- **Frontend**: React, TypeScript, Vite
- **Mapping**: Leaflet, OpenLayers, Turf.js
- **Data Processing**: Proj4, ShpJS, GeoTIFF
- **Storage**: IndexedDB (browser storage)
- **Authentication**: Firebase Authentication
- **Visualization**: Recharts

## 📊 Workflow Overview

1. **Choose Shoreline Source**: Upload an existing shoreline or create a new one
2. **Upload/Digitize Shoreline**: Process shoreline data or digitize from satellite imagery
3. **Segment Shoreline**: Divide the shoreline into analysis segments
4. **Select Parameters**: Choose vulnerability parameters and assign weights
5. **Assign Values**: Assign parameter values to shoreline segments
6. **Calculate CVI**: Apply a formula to calculate the vulnerability index
7. **View Results**: Visualize and export the final results

## 📝 CVI Calculation

CVIc offers several formulas for calculating the Coastal Vulnerability Index:

1. **Geometric Mean**: Standard weighted geometric mean (Gornitz et al. (1994))
   - Formula: `CVI = (∏(Vi^Wi))^(1/∑Wi)`
2. **Arithmetic Mean**: Weighted arithmetic mean
3. **Geometric Mean Normalized**: Normalized weighted geometric mean
4. **Nonlinear Power**: Nonlinear power-based calculation

Where:
- Vi = Vulnerability score for parameter i (1-5)
- Wi = Weight assigned to parameter i (0-1)
- ∏ = Product of all values
- ∑ = Sum of all values

## 💾 Data Persistence

The application automatically saves your progress at each step using IndexedDB (browser storage):

1. As you progress through each step of the workflow, your data is automatically saved
2. If you navigate away from the application and return later, you can continue by navigating to the appropriate step in the workflow
3. The application will automatically load data from previous steps (shoreline, segments, parameters, etc.)
4. You must use the same browser and device, as the data is stored locally in your browser's IndexedDB

## 🔜 Upcoming Features

1. Cloud storage for project data and results
2. Additional CVI calculation formulas
3. Image acquisition from cloud-based services
4. Existing parameter import as separate layers and CVI calculation
5. Improved performance optimizations
6. Enhanced user interface and experience

## 📚 Documentation

For more detailed information, see the [User Guide](CVIc_User_Guide.md) and [Technical Paper](CVIc_Paper.md).

## 🔗 Related Projects

CVIc is part of the EO-PERSIST ecosystem, which aims to establish a cloud-based platform for managing and exploiting Earth Observation data. Upcoming companion tools include:

- **SatShor**: Automatic extraction of Satellite-derived Shorelines
- **CVARs**: Coastal Vulnerability Assessment Parameter Sourcing
- **CompCVA**: Computational Framework in Coastal Vulnerability Assessment

Together, these tools will automate the entire coastal-hazard workflow from satellite imagery to decision-support products.
Introduction to CVIc: A Web-Based Tool for Coastal Vulnerability Index Calculation
