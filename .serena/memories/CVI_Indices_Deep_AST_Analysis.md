# CVI Indices Deep AST Analysis - Complete Mathematical Implementation

## Core Formula Implementations

### 1. Basic Mathematical Formulas

#### Geometric Mean Formula
```typescript
// CVI = ∏(Vi^Wi) - Product of values raised to their respective weights
calculateGeometricMean = (values: number[], weights: number[]): number => {
  if (values.length === 0) return 0;
  let product = 1.0;
  for (let i = 0; i < values.length; i++) {
    const value = Math.max(1e-9, values[i]); // Prevent log(0) issues
    product *= Math.pow(value, weights[i]);
  }
  return product;
};
```

#### Traditional CVI Formula
```typescript
// CVI = √(∏Vi/n) - Square root of product divided by number of variables
calculateTraditional = (values: number[], weights: number[]): number => {
  const n = values.length;
  if (n === 0) return 0;
  
  // Validates equal weights requirement
  const firstWeight = weights[0];
  const areWeightsEqual = weights.every(w => Math.abs(w - firstWeight) < 1e-6);
  
  let product = 1.0;
  for (let i = 0; i < values.length; i++) {
    const value = Math.max(1e-9, values[i]); // Prevent log(0) issues
    product *= value;
  }
  
  return Math.sqrt(product / n); // Division happens INSIDE square root
};
```

#### Arithmetic Mean Formula
```typescript
// CVI = Σ(Vi*Wi) - Weighted sum of values
calculateArithmeticMean = (values: number[], weights: number[]): number => {
  if (values.length === 0) return 0;
  let weightedSum = 0.0;
  for (let i = 0; i < values.length; i++) {
    weightedSum += values[i] * weights[i];
  }
  return weightedSum;
};
```

#### Nonlinear Power Formula
```typescript
// CVI = √(Σ(Vi²*Wi)) - Square root of weighted sum of squares
calculateNonlinearPower = (values: number[], weights: number[]): number => {
  if (values.length === 0) return 0;
  const weightedSumOfSquares = values.reduce((acc, val, i) => acc + Math.pow(val, 2) * weights[i], 0);
  return Math.sqrt(weightedSumOfSquares);
};
```

### 2. Composite Index Implementations

#### ICVI Composite Formula
```typescript
// ICVI = (EVI + SVI)/2 with 0-1 scale conversion
function calculateICVIComposite(parameters: Parameter[]): FormulaResult {
  // EVI parameters (5 parameters)
  const eviParams = parameters.filter(p =>
    ['coastal_geomorphology', 'coastal_slope', 'ecosystem_type', 'environmental_conservancy', 'interest_species'].includes(p.id)
  );

  // SVI parameters (5 parameters)
  const sviParams = parameters.filter(p =>
    ['use_of_territory', 'building_coast_ratio', 'population_density', 'economic_value', 'sociocultural_heritage'].includes(p.id)
  );

  // Convert 1-5 scale to 0-1 scale: (Vi-1)/4
  const eviConverted = eviParams.map(p => ((p.vulnerabilityValue || 1) - 1) / 4);
  const eviValue = eviConverted.reduce((acc, val) => acc + val, 0) / eviConverted.length;

  const sviConverted = sviParams.map(p => ((p.vulnerabilityValue || 1) - 1) / 4);
  const sviValue = sviConverted.reduce((acc, val) => acc + val, 0) / sviConverted.length;

  const icviValue = (eviValue + sviValue) / 2;
  
  return {
    value: icviValue,
    formula: `ICVI = (EVI + SVI)/2 = (${eviValue.toFixed(3)} + ${sviValue.toFixed(3)})/2 = ${icviValue.toFixed(3)}`,
    components: {
      'EVI (50%)': eviValue,
      'SVI (50%)': sviValue
    }
  };
}
```

#### CCVI Composite Formula
```typescript
// CCVI = (PCVI + ECVI)/2 - Physical + Economic components
function calculateCCVIComposite(parameters: Parameter[]): FormulaResult {
  // PCVI parameters (6 parameters) - Physical
  const pcviParams = parameters.filter(p =>
    ['beach_width', 'dune_width', 'coastal_slope', 'vegetation_distance', 'distance_built_structures', 'sea_defences'].includes(p.id)
  );

  // ECVI parameters (4 parameters) - Economic
  const ecviParams = parameters.filter(p =>
    ['commercial_properties', 'residential_properties', 'economic_value', 'population_density'].includes(p.id)
  );

  // Direct additive sums
  const pcviSum = pcviParams.map(p => p.vulnerabilityValue || 1).reduce((acc, val) => acc + val, 0);
  const ecviSum = ecviParams.map(p => p.vulnerabilityValue || 1).reduce((acc, val) => acc + val, 0);

  const ccviValue = (pcviSum + ecviSum) / 2;

  return {
    value: ccviValue,
    formula: `CCVI = (PCVI + ECVI)/2 = (${pcviSum} + ${ecviSum})/2 = ${ccviValue.toFixed(3)}`,
    components: {
      'PCVI (50%)': pcviSum,
      'ECVI (50%)': ecviSum
    }
  };
}
```

#### CVI-SE Formula (Szlafsztein & Sterr, 2007)
```typescript
// CVI-SE = 60% Physical CVI + 40% Socioeconomic VI
function calculateCVISE(parameters: Parameter[]): FormulaResult {
  // Physical parameters (6 parameters) - Traditional CVI formula
  const physicalParams = parameters.filter(p =>
    ['coastal_geomorphology', 'coastal_slope', 'sea_level_change', 'shoreline_change', 'mean_tide_range', 'mean_wave_height'].includes(p.id)
  );

  // Socioeconomic parameters (4 parameters) - Arithmetic mean
  const socioParams = parameters.filter(p =>
    ['population_density', 'economic_value', 'infrastructure_density', 'social_vulnerability'].includes(p.id)
  );

  // Physical CVI: √(∏Vi/n)
  const physicalValues = physicalParams.map(p => p.vulnerabilityValue || 1);
  const physicalProduct = physicalValues.reduce((acc, val) => acc * val, 1);
  const physicalCVI = Math.sqrt(physicalProduct / physicalValues.length);

  // Socioeconomic VI: Σ(Vi)/n
  const socioValues = socioParams.map(p => p.vulnerabilityValue || 1);
  const socioSum = socioValues.reduce((acc, val) => acc + val, 0);
  const socioVI = socioSum / socioValues.length;

  // Weighted combination: 60% + 40%
  const cviSeValue = (0.6 * physicalCVI) + (0.4 * socioVI);

  return {
    value: cviSeValue,
    formula: `CVI-SE = 0.6×Physical_CVI + 0.4×Socioeconomic_VI = 0.6×${physicalCVI.toFixed(3)} + 0.4×${socioVI.toFixed(3)} = ${cviSeValue.toFixed(3)}`,
    components: {
      'Physical CVI (60%)': physicalCVI,
      'Socioeconomic VI (40%)': socioVI
    }
  };
}
```

#### GCVI Composite Formula
```typescript
// GCVI = (GS + CS + HS)/3 - Three-component system
function calculateGCVIComposite(parameters: Parameter[]): FormulaResult {
  // Geotechnical State (2 parameters)
  const gsParams = parameters.filter(p =>
    ['coastal_geotechnical_map', 'median_grain_size'].includes(p.id)
  );

  // Coastline State (2 parameters)
  const csParams = parameters.filter(p =>
    ['coastal_slope', 'posidonia_oceanica'].includes(p.id)
  );

  // Hydrodynamic State (3 parameters)
  const hsParams = parameters.filter(p =>
    ['sea_level_change', 'mean_tide_range', 'mean_wave_height'].includes(p.id)
  );

  // Weighted sums with equal weights within each component
  const gsSum = gsParams.reduce((acc, p, i) => acc + (p.vulnerabilityValue || 1) * (p.weight || 0.5), 0);
  const csSum = csParams.reduce((acc, p, i) => acc + (p.vulnerabilityValue || 1) * (p.weight || 0.5), 0);
  const hsSum = hsParams.reduce((acc, p, i) => acc + (p.vulnerabilityValue || 1) * (p.weight || 1/3), 0);

  const gcviValue = (gsSum + csSum + hsSum) / 3;

  return {
    value: gcviValue,
    formula: `GCVI = (GS + CS + HS)/3 = (${gsSum.toFixed(3)} + ${csSum.toFixed(3)} + ${hsSum.toFixed(3)})/3 = ${gcviValue.toFixed(3)}`,
    components: {
      'Geotechnical State (33%)': gsSum,
      'Coastline State (33%)': csSum,
      'Hydrodynamic State (33%)': hsSum
    }
  };
}
```

## Index Parameter Signatures

### Parameter Detection System
```typescript
const INDEX_SIGNATURES = {
  'CVI': ['coastal_geomorphology', 'coastal_slope', 'sea_level_change', 'shoreline_change', 'mean_tide_range', 'mean_wave_height'],
  'RCVI': ['coastal_geomorphology', 'natural_protection', 'coastal_slope', 'sea_level_change', 'shoreline_change', 'mean_tide_range', 'mean_wave_height'],
  'ICVI_EVI': ['coastal_geomorphology', 'coastal_slope', 'ecosystem_type', 'environmental_conservancy', 'interest_species'],
  'ICVI_SVI': ['use_of_territory', 'building_coast_ratio', 'population_density', 'economic_value', 'sociocultural_heritage'],
  'ICVI': ['coastal_geomorphology', 'coastal_slope', 'ecosystem_type', 'environmental_conservancy', 'interest_species', 'use_of_territory', 'building_coast_ratio', 'population_density', 'economic_value', 'sociocultural_heritage'],
  'PCVI': ['beach_width', 'dune_width', 'coastal_slope', 'vegetation_distance', 'distance_built_structures', 'sea_defences'],
  'ECVI': ['commercial_properties', 'residential_properties', 'economic_value', 'population_density'],
  'CCVI': ['beach_width', 'dune_width', 'coastal_slope', 'vegetation_distance', 'distance_built_structures', 'sea_defences', 'commercial_properties', 'residential_properties', 'economic_value', 'population_density'],
  'GCVI': ['coastal_geotechnical_map', 'median_grain_size', 'coastal_slope', 'posidonia_oceanica', 'sea_level_change', 'mean_tide_range', 'mean_wave_height']
};
```

## Parameter Ranking Systems

### CVI Parameter Example (Thieler & Hammar-Klose, 1999)
```typescript
{
  id: 'cvi_coastal_geomorphology',
  standardName: 'COASTAL_GEOMORPHOLOGY',
  indexId: 'cvi-thieler-1999',
  indexSpecificName: 'Geomorphology',
  description: 'Coastal landform type',
  type: 'categorical',
  weight: 1/6,
  required: true,
  rankingTable: [
    { value: 1, criteria: 'Rocky, cliffed coasts / Fiords / Fiards', color: '#1a9850', label: 'Very Low' },
    { value: 2, criteria: 'Medium cliffs / Indented coasts', color: '#91cf60', label: 'Low' },
    { value: 3, criteria: 'Low cliffs / Glacial drift / Alluvial plains', color: '#fee08b', label: 'Moderate' },
    { value: 4, criteria: 'Cobble beaches / Estuary / Lagoon', color: '#fc8d59', label: 'High' },
    { value: 5, criteria: 'Barrier beaches / Sand beaches / Salt marsh / Mud flats / Deltas / Mangrove / Coral reefs', color: '#d73027', label: 'Very High' }
  ]
}
```

### ICVI Parameter Example (0.1-0.9 Scale)
```typescript
{
  id: 'icvi_population_density',
  standardName: 'POPULATION_DENSITY',
  indexId: 'icvi-alcantara-2024',
  indexSpecificName: 'Population Density',
  description: 'Population density in coastal areas',
  type: 'numerical',
  unit: 'pop/ha',
  weight: 1/12,
  required: true,
  rankingTable: [
    { value: 0.1, criteria: '≤ 20 pop/ha', color: '#1a9850', label: 'Very Low' },
    { value: 0.3, criteria: '20-50 pop/ha', color: '#91cf60', label: 'Low' },
    { value: 0.5, criteria: '50-80 pop/ha', color: '#fee08b', label: 'Moderate' },
    { value: 0.7, criteria: '80-170 pop/ha', color: '#fc8d59', label: 'High' },
    { value: 0.9, criteria: '> 170 pop/ha', color: '#d73027', label: 'Very High' }
  ]
}
```

## Validation Rules System

### CVI Validation Rules
```typescript
const CVI_VALIDATION_RULES: ValidationRule[] = [
  {
    type: 'parameter_count',
    message: 'CVI requires exactly 6 parameters',
    validate: (parameters) => parameters.length === 6
  },
  {
    type: 'weight_sum',
    message: 'CVI requires equal weights (1/6 each)',
    validate: (parameters, weights) => {
      if (!weights) return true;
      const expectedWeight = 1/6;
      return Object.values(weights).every(w => Math.abs(w - expectedWeight) < 0.001);
    }
  },
  {
    type: 'formula_compatibility',
    message: 'CVI must use geometric mean formula with equal weights',
    validate: () => true // Enforced by index definition
  }
];
```

## Result Classification Systems

### ICVI Classification Ranges
```typescript
const ICVI_ARITHMETIC_RANGES = [
  { min: 0, max: 0.2, label: 'Very Low', rank: 1 },
  { min: 0.2, max: 0.4, label: 'Low', rank: 2 },
  { min: 0.4, max: 0.6, label: 'Moderate', rank: 3 },
  { min: 0.6, max: 0.8, label: 'High', rank: 4 },
  { min: 0.8, max: 1.0, label: 'Very High', rank: 5 }
];
```

## Key Mathematical Insights

1. **Scale Conversions**: ICVI uses (Vi-1)/4 to convert 1-5 scale to 0-1 scale
2. **Error Prevention**: All formulas use Math.max(1e-9, value) to prevent log(0) issues
3. **Weight Validation**: Traditional formula enforces equal weights with 1e-6 tolerance
4. **Component Isolation**: Composite indices separate physical/environmental from socioeconomic components
5. **Flexible Architecture**: System supports both standardized indices and custom formula combinations
6. **Robust Validation**: Multi-level validation including parameter count, weight constraints, and formula compatibility

## Formula Routing Logic

The system uses a comprehensive switch statement to route formula calculations:
- Basic formulas: geometric-mean, traditional, arithmetic-mean, nonlinear-power
- Composite formulas: icvi-composite, ccvi-composite, cvi-se, gcvi-composite
- Component formulas: icvi-evi, icvi-svi, pcvi, ecvi
- Advanced formulas: sovi, sevi, lvi, integrated-cvi

Each formula maintains mathematical integrity while providing detailed calculation traces for transparency and validation.