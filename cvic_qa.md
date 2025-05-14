# CVIc (Coastal Vulnerability Index Compiler) Q&A

## General Questions

### What is the main purpose of the CVIc application?
CVIc is a web-based tool designed to streamline the process of calculating a Coastal Vulnerability Index (CVI). It guides users through uploading shoreline data, segmenting it, assigning vulnerability parameters and values, selecting a calculation formula, and visualizing the results on an interactive map. The application follows a structured workflow implemented through React Router paths in `src/router.tsx`, with each step corresponding to a specific page component.

### What problem does CVIc solve?
CVIc solves the problem of manual, time-consuming CVI calculations that are typically done using GIS software and spreadsheets. The application automates geospatial processing with libraries like Turf.js (`src/utils/geometry.ts`), provides a user-friendly interface for parameter assignment (`src/pages/ParameterAssignmentPage.tsx`), and enables immediate visualization of results (`src/pages/ResultsPage.tsx`). This makes coastal vulnerability assessment more accessible and efficient for researchers and coastal managers.

### What is the workflow of the application?
The application implements a sequential workflow through protected routes in `src/router.tsx`:
1. Upload shoreline data as a zipped Shapefile (processed by `src/services/shapefileProcessor.ts`)
2. Segment the shoreline based on user-defined resolution (implemented in `src/utils/geometry.ts:segmentShoreline()`)
3. Review segments in a table and map (`src/pages/SegmentTablePage.tsx`)
4. Select vulnerability parameters and assign weights (`src/pages/ParameterSelectionPage.tsx`)
5. Assign specific values to shoreline segments (`src/pages/ParameterAssignmentPage.tsx`)
6. Calculate CVI using a selected formula (`src/utils/cviCalculations.ts`)
7. Visualize and export the results (`src/pages/ResultsPage.tsx`)

## Technical Questions

### How does the application handle shoreline data processing?
The application processes shoreline data using the `shpjs` library in `src/services/shapefileProcessor.ts`. The key functions include:
- `processShapefile()`: Converts uploaded ZIP files containing Shapefiles into GeoJSON
- `validateFile()`: Ensures the file is a valid ZIP and within size limits (50MB)
- `validateGeoJSON()`: Verifies the GeoJSON contains valid LineString or MultiLineString features
- `cleanGeoJSON()`: Sanitizes the data by removing sensitive fields

The processed GeoJSON is then stored in IndexedDB via `indexedDBService.storeShorelineData('current-shoreline', geoJSON)` in `src/pages/ShorelinePage.tsx`.

### Explain the segmentation process in your application.
The segmentation process is implemented in `src/utils/geometry.ts:segmentShoreline()` using Turf.js. The function:
1. Takes a GeoJSON FeatureCollection and a resolution value (in meters)
2. Iterates through each LineString/MultiLineString feature
3. Calculates the total length of each line using `turf.length()`
4. Determines the number of segments based on the resolution
5. Uses `turf.lineSliceAlong()` to create segments of equal length
6. Assigns unique IDs and properties to each segment

The `SegmentationPage.tsx` component provides the UI for setting the resolution and previewing segments before confirming. Performance warnings are shown for high segment counts (>5000) with special confirmation for very large counts (>10000).

### How are parameters and their weights managed in the application?
Parameters are defined as objects conforming to the `Parameter` interface in `src/types/index.ts`, with properties including:
- `id`, `name`, `description`
- `type` ('numerical' or 'categorical')
- `weight` (percentage as decimal)
- `vulnerabilityRanges` or `options` for value mapping

The `ParameterSelectionPage.tsx` component allows users to:
- Enable/disable parameters via checkboxes
- Adjust weights using sliders
- Validate that weights sum to 100% before proceeding (`handleContinue()` function)

Parameter data is stored in IndexedDB as a GeoJSON FeatureCollection with parameters as properties of Point features.

### What formulas are available for CVI calculation and how do they differ?
The application offers four formulas defined in `src/config/formulas.ts` and implemented in `src/utils/cviCalculations.ts`:

1. **Geometric Mean (Normalized)** (`calculateGeometricMeanNormalized`):
   ```typescript
   const geometricMean = calculateGeometricMean(values, weights);
   const normalizedResult = Math.pow(geometricMean, 1.0 / n);
   ```
   Scales results between 1-5 by normalizing the weighted geometric mean.

2. **Geometric Mean** (`calculateGeometricMean`):
   ```typescript
   let product = 1.0;
   for (let i = 0; i < values.length; i++) {
     const value = Math.max(1e-9, values[i]);
     const exponent = weights[i] / sumWeights;
     product *= Math.pow(value, exponent);
   }
   ```
   The traditional CVI method that multiplies vulnerability values raised to their weighted power.

3. **Arithmetic Mean** (`calculateArithmeticMean`):
   ```typescript
   let weightedSum = 0.0;
   for (let i = 0; i < values.length; i++) {
     weightedSum += values[i] * weights[i];
   }
   const result = weightedSum / sumWeights;
   ```
   A simple weighted average of vulnerability values.

4. **Nonlinear Power (sqrt)** (`calculateNonlinearPower`):
   ```typescript
   const weightedSumOfSquares = values.reduce((acc, val, i) => 
     acc + Math.pow(val, 2) * weights[i], 0);
   const normalizedValue = weightedSumOfSquares / sumWeights;
   const result = Math.sqrt(normalizedValue);
   ```
   Root mean square of weighted vulnerabilities, emphasizing higher values.

### How does the application handle the spatial selection of shoreline segments?
The application implements spatial selection in `src/pages/ParameterAssignmentPage.tsx` using:

1. **Direct selection**: Users can click individual segments on the map, triggering the `handleSegmentSelect` callback
2. **Area selection**: Users can draw polygons using Leaflet Draw, which calls `handleSelectionCreate`:
   ```typescript
   const selectionPolygonTurf = turf.polygon(geometry.coordinates);
   segments.forEach(segment => {
     if (turf.booleanIntersects(segment.geometry, selectionPolygonTurf)) {
       newlySelectedIds.push(segment.id);
     }
   });
   ```

The `MapInteractionPanel` component provides UI controls for selection operations like "Select All" and "Clear Selection". Selected segment IDs are stored in the `selectedSegments` state array and visually highlighted on the map.

### Explain how parameter values are assigned to segments.
Parameter values are assigned to segments through the `applyParameterValueToSegments` function in `src/logic/valueAssignmentLogic.ts`:

1. Users select segments on the map and choose a parameter in `ParameterValuePanel`
2. They select a value and vulnerability score (1-5) from dropdown options
3. When "Apply Value" is clicked, `handleApplyValue` calls `applyParameterValueToSegments`
4. The function updates the selected segments with the new parameter values:
   ```typescript
   const updatedSegments = segments.map(segment => {
     if (selectedSegmentIds.includes(segment.id)) {
       // Create parameter value object based on type
       const updatedDirectParameters = { 
         ...segment.parameters, 
         [activeParameter.id]: paramValue 
       };
       // Update both parameters and properties.parameters
       return { 
         ...segment, 
         parameters: updatedDirectParameters, 
         properties: { 
           ...currentProperties, 
           parameters: { ...currentPropertiesParams, [activeParameter.id]: paramValue } 
         } 
       };
     }
     return segment;
   });
   ```
5. The updated segments are saved to IndexedDB for persistence

### How does the application calculate and visualize the CVI scores?
The CVI calculation process is implemented in `src/utils/cviCalculations.ts:calculateAndSaveCVI()`:

1. The function filters parameters with non-zero weights and validates they sum to 1
2. For each segment with complete parameter data:
   - It extracts parameter values and their weights
   - Clamps vulnerability scores to the 1-5 range
   - Applies the selected formula (geometric mean, arithmetic mean, etc.)
   - Rounds the result to 2 decimal places
   - Stores the score in the segment's properties

Visualization is handled in `src/pages/ResultsPage.tsx` and `src/components/maps/Map.tsx`:
1. The `getCviCategory` function in `src/utils/vulnerabilityMapping.ts` maps scores to categories
2. The `getFeatureStyle` function in `Map.tsx` assigns colors based on CVI scores
3. The `CviLegend` component displays the color scale from green (low vulnerability) to red (high vulnerability)
4. The Results page shows summary statistics including min/max/avg scores and category counts

### What data persistence mechanisms are used in the application?
The application uses IndexedDB through the `idb` library, implemented in `src/services/indexedDBService.ts`:

1. A singleton `indexedDBService` instance provides methods for data operations:
   ```typescript
   async storeShorelineData(id: string, data: FeatureCollection): Promise<void>
   async getShorelineData(id: string): Promise<FeatureCollection | null>
   async deleteShorelineData(id: string): Promise<void>
   async clearAllData(): Promise<void>
   ```

2. Key data stored includes:
   - `'current-shoreline'`: Original uploaded shoreline
   - `'current-segments'`: Segmented shoreline with parameter values and CVI scores
   - `'current-parameters'`: Parameter definitions with weights

3. Data is stored as GeoJSON FeatureCollections with timestamps:
   ```typescript
   const storeData: ShorelineStore = {
     id,
     data,
     timestamp: Date.now(),
   };
   ```

This client-side storage enables users to navigate through the workflow without losing data and return to their work later.

## Scientific Questions

### What is a Coastal Vulnerability Index (CVI) and why is it important?
A Coastal Vulnerability Index (CVI) is a quantitative tool used to assess the relative vulnerability of coastal areas to sea-level rise and other coastal hazards. The application implements this concept through:

1. Parameter selection and weighting in `src/pages/ParameterSelectionPage.tsx`
2. Vulnerability scoring on a 1-5 scale in `src/components/parameters/ParameterValuePanel.tsx`
3. Index calculation using various formulas in `src/utils/cviCalculations.ts`

CVI is important because it helps identify high-risk areas, prioritize adaptation efforts, inform coastal management decisions, and communicate risk to stakeholders through the visualization capabilities in `src/pages/ResultsPage.tsx`.

### How are vulnerability scores typically assigned to parameters?
In the application, vulnerability scores are assigned on a scale of 1-5 as defined in the `Parameter` interface in `src/types/index.ts`:

1. For numerical parameters (`type: 'numerical'`), ranges are established through `vulnerabilityRanges`:
   ```typescript
   export interface VulnerabilityRange {
     value: number  // The vulnerability score (1-5)
     min: number | null  // Minimum parameter value for this range
     max: number | null  // Maximum parameter value for this range
     label: string
     color: string
   }
   ```

2. For categorical parameters (`type: 'categorical'`), predefined options map to vulnerability scores:
   ```typescript
   export interface CategoricalParameterOption extends BaseParameterOption {
     type: 'categorical'
     value: string  // The category value
     vulnerability: number  // The vulnerability score (1-5)
   }
   ```

The `ParameterValuePanel` component provides the UI for selecting these values, and the vulnerability mapping is visualized through color coding in the map component.

## Implementation Challenges

### What were the most challenging aspects of developing this application?
Based on the codebase analysis, the most challenging aspects included:

1. **Efficient geospatial operations**: The segmentation process in `src/utils/geometry.ts` needed optimization for large shorelines, with special handling for high segment counts (>10,000) in `src/pages/SegmentationPage.tsx`.

2. **Interactive parameter assignment**: Creating an intuitive interface that synchronizes map selection (`MapInteractionPanel`) with table views (`SegmentTablePanel`) required careful state management.

3. **Data consistency**: Maintaining consistent data across the multi-step workflow required robust IndexedDB operations in `src/services/indexedDBService.ts` and careful state updates in components.

4. **CVI calculation edge cases**: The `calculateAndSaveCVI` function in `src/utils/cviCalculations.ts` includes handling for missing parameters, weight validation, and vulnerability score clamping.

### How did you ensure the accuracy of the CVI calculations?
The application ensures calculation accuracy through several mechanisms in `src/utils/cviCalculations.ts`:

1. **Formula implementation**: Each formula is implemented based on established methods:
   ```typescript
   // Example: Geometric Mean calculation
   const calculateGeometricMean = (values: number[], weights: number[]): number => {
     const sumWeights = weights.reduce((a, b) => a + b, 0);
     if (sumWeights === 0) return 0;
     let product = 1.0;
     for (let i = 0; i < values.length; i++) {
       const value = Math.max(1e-9, values[i]);  // Prevent zero values
       const exponent = weights[i] / sumWeights;
       product *= Math.pow(value, exponent);
     }
     return product;
   };
   ```

2. **Input validation**:
   - Weights are validated to sum to 1: `Math.abs(sumOfRelevantWeights - 1) > 0.01`
   - Vulnerability scores are clamped to the 1-5 range: `Math.max(1, Math.min(5, paramValue!.vulnerability))`
   - Missing parameters are detected: `hasAllParameters = relevantParameters.every(...)`

3. **Result precision**: Scores are rounded to 2 decimal places: `cviScore = Math.round(cviScore * 100) / 100`

4. **Error handling**: Comprehensive try/catch blocks with detailed error messages help identify calculation issues.

## Code Architecture

### Explain the overall architecture of your application.
The application follows a component-based architecture using React with TypeScript:

1. **Pages** (`src/pages/`): Full-screen views corresponding to workflow steps
   - `ShorelinePage.tsx` → `SegmentationPage.tsx` → `SegmentTablePage.tsx` → `ParameterSelectionPage.tsx` → `ParameterAssignmentPage.tsx` → `ResultsPage.tsx`

2. **Components** (`src/components/`): Reusable UI elements
   - `maps/Map.tsx`: Core mapping component using Leaflet
   - `parameters/`: UI for parameter selection and assignment
   - `results/`: Visualization components for CVI results
   - `common/`: Shared UI elements like ErrorAlert

3. **Services** (`src/services/`): Data operations
   - `indexedDBService.ts`: Client-side storage
   - `shapefileProcessor.ts`: Shapefile parsing and validation

4. **Utils** (`src/utils/`): Helper functions
   - `cviCalculations.ts`: CVI formula implementations
   - `geometry.ts`: Geospatial operations
   - `vulnerabilityMapping.ts`: Score to category mapping

5. **Types** (`src/types/index.ts`): TypeScript definitions for data structures

6. **Hooks** (`src/hooks/`): Custom React hooks
   - `useParameterAssignmentData.ts`: Data loading for parameter assignment
   - `useAuth.tsx`: Authentication state management

The routing structure in `src/router.tsx` enforces the sequential workflow while allowing navigation between steps.
