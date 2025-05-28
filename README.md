# CVIc: Coastal Vulnerability Index Compiler

CVIc (Coastal Vulnerability Index Compiler) represents the first open-source specialized SaaS client-side web application for automated coastal vulnerability index-based assessment

### Key Innovations
- **First application dedicated to CVA/CVI**
- **Real-time processing scientific SaaS on the web**
- **Client-side zero-dependency open-source Geospatial processing** 
- **Development of an integrated standardized CVA platform**

---

## 1. System Architecture

### Core Components
1. **Frontend Framework** - React 18 + TypeScript
2. **Authentication System** - Firebase Auth
3. **Mapping Engine** - Leaflet
4. **CVI Calculation Engine** - Multiple mathematical formulas
5. **Data Storage** - IndexedDB
6. **Visualization Components** - Interactive maps and charts

### Technology Stack
```
Frontend:     React 18, TypeScript, Vite, TailwindCSS
Mapping:      Leaflet, React-Leaflet, Leaflet-Draw
Geospatial:   Turf.js, Proj4, GeoRaster, Shapefile.js
Storage:      IndexedDB, Firebase Auth
Build:        Vite, React Router, Hash routing
Extra:        Rechart
```

---

## 2. Workflow Implementation

### 7-Step Integrated Process

1. **Shoreline Selection**
   - Choose to upload existing or create new shoreline

2. **Shoreline Source**
   - Upload shapefile or upload satellite imagery and digitize shoreline
   - Support for multiple coordinate systems via Proj4

3. **Segmentation**
   - Automated shoreline division by specified resolution/length

4. **Parameter Selection**
   - Choose vulnerability parameters and assign weights

5. **Parameter Assignment**
   - Interactive map-segment-based value assignment
   - Table-based editing interface
   - Bulk operations for multiple segments

6. **Formula Selection**
   - Choose from CVI calculation methods

7. **Results Visualization**
   - Color-coded vulnerability mapping
   - Statistical charts and analysis
   - GeoJSON export functionality
   - HTML report export

---

## 3. CVI Calculation Engine

### Mathematical Formulas

1. **Geometric Mean **
   ```
   CVI = ∏(Vi^Wi)
   ```
   - Standard weighted geometric mean of the non-weighted: (CVI = ∏(Vi)*(1/n))

2. **Traditional**
   ```
   CVI = √((∏(Vi))/n)
   ```
   - Only usable with equal weights
   - (Thieler & Hammar-Klose, 2000)

3. **Arithmetic Mean**
   ```
   CVI = Σ(Vi*Wi)
   ```
   - Weighted arithmetic average of the non-weighted: (CVI = Σ(Vi)/n)
   - Linear combination approach

4. **Nonlinear Power**
   ```
   CVI = √(Σ(Vi²*Wi))
   ```
   - Weighted Root mean square of the non-weighted: (CVI = √(Σ(Vi²)/n))
   - Emphasizes extreme vulnerability values

**Where**: Vi = parameter value, Wi = parameter weight, n = number of parameters
**Weights must sum up to 1. There are 5 classes for the parameter values of 1, 2, 3, 4, 5

### Calculation Features
- **Real-time Computation**: Immediate recalculation on parameter changes
- **Input Validation**: Parameter values constrained to 1-5 scale
- **Weight Validation**: Automatic verification of weight sum = 1.0
- **Error Handling**: Graceful handling of missing or invalid data
- **Precision Control**: Results rounded to 2 decimal places
- **Batch Processing**: Simultaneous calculation for all segments

---

## 4. Geospatial Processing Capabilities

### Core Features
- **Coordinate System Support**: Multiple projections via Proj4 library
- **Geometry Operations**: Turf.js for spatial analysis and calculations
- **Shoreline Segmentation**: Automated division by distance/resolution
- **Interactive Drawing**: Leaflet Draw for shoreline digitization
- **Satellite Image Integration**: GeoRaster support for georeferenced imagery
- **Multi-format Input**: Shapefiles, GeoJSON, GeoTIFF, COG
- **Spatial Queries**: Point-in-polygon, distance calculations, buffering

### Data Structures
```typescript
interface ShorelineSegment {
  type: 'Feature';
  id: string;
  geometry: LineString | MultiLineString;
  properties: ShorelineSegmentProperties;
  parameters: Record<string, ParameterValue>;
}

interface Parameter {
  id: string;
  name: string;
  type: 'numerical' | 'categorical';
  weight: number;
  vulnerabilityRanges?: VulnerabilityRange[];
}
```

---

## 5. Data Management Architecture

### Storage Strategy
- **Client-side Storage**: IndexedDB for persistent local data
- **Cloud Authentication**: Firebase Auth for user management
- **Data Persistence**: Automatic saving of work progress
- **Error Recovery**: Robust error handling with data recovery (?)
- **Storage Optimization**: Efficient handling of large geospatial datasets
- **Data Export**: GeoJSON export with calculated CVI scores
- **Session Management**: State maintenance across browser sessions

### Security & Privacy
- **Client-side Processing**: Sensitive data never leaves user's device
- **Firebase Security**: Industry-standard authentication
- **Data Isolation**: User data separated by authentication
- **Secure Transmission**: HTTPS for all external communications (?)

---

### Performance Optimization
- **Client-side Processing**: Reduces server load, improves responsiveness
- **Lazy Loading**: Components loaded on-demand
- **Efficient Rendering**: Optimized map rendering with layer management
- **Data Caching**: IndexedDB caching reduces redundant calculations
- **Memory Management**: Proper cleanup of resources
- **Bundle Optimization**: Vite build optimization for production

---

## 🔜 Upcoming Features

1. Cloud storage for project data and results
2. Additional CVI calculation formulas
3. Image acquisition from cloud-based services
4. Existing parameter import as separate layers and CVI calculation
5. Improved performance optimizations
6. Enhanced user interface and experience

---

## 📚 Documentation

For more detailed information, see the [User Guide](CVIc_User_Guide.md) and [Technical Paper](CVIc_Paper.md).

---

## 🔗 Related Projects

CVIc is part of the EO-PERSIST ecosystem, which aims to establish a cloud-based platform for managing and exploiting Earth Observation data. Upcoming companion tools include:

- **SatShor**: Automatic extraction of Satellite-derived Shorelines
- **CVARs**: Coastal Vulnerability Assessment Parameter Sourcing
- **CompCVA**: Computational Framework in Coastal Vulnerability Assessment

Together, these tools will automate the entire coastal-hazard workflow from satellite imagery to decision-support products.

