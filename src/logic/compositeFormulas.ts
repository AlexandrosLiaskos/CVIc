import { Parameter } from '../types';

export interface FormulaResult {
  value: number;
  formula: string;
  components?: { [key: string]: number };
}

export interface IndexDetection {
  indexType: string;
  indexName: string;
  formula: string;
  confidence: number;
}

// Index parameter signatures for detection
const INDEX_SIGNATURES = {
  'CVI': ['coastal_geomorphology', 'coastal_slope', 'sea_level_change', 'shoreline_change', 'mean_tide_range', 'mean_wave_height'],
  'RCVI': ['coastal_geomorphology', 'natural_protection', 'coastal_slope', 'sea_level_change', 'shoreline_change', 'mean_tide_range', 'mean_wave_height'],
  'ICVI_EVI': ['coastal_geomorphology', 'coastal_slope', 'ecosystem_type', 'environmental_conservancy', 'interest_species'],
  'ICVI_SVI': ['use_of_territory', 'building_coast_ratio', 'population_density', 'economic_value', 'sociocultural_heritage'],
  'ICVI': ['coastal_geomorphology', 'coastal_slope', 'ecosystem_type', 'environmental_conservancy', 'interest_species', 'use_of_territory', 'building_coast_ratio', 'population_density', 'economic_value', 'sociocultural_heritage'],
  'PCVI': ['beach_width', 'dune_width', 'coastal_slope', 'vegetation_distance', 'distance_built_structures', 'sea_defences'],
  'ECVI': ['commercial_properties', 'residential_properties', 'economic_value', 'population_density'],
  'CCVI': ['beach_width', 'dune_width', 'coastal_slope', 'vegetation_distance', 'distance_built_structures', 'sea_defences', 'commercial_properties', 'residential_properties', 'economic_value', 'population_density'],
  'CVI_SE': ['coastal_geomorphology', 'coastal_slope', 'sea_level_change', 'shoreline_change', 'mean_tide_range', 'mean_wave_height', 'population_density', 'economic_value', 'infrastructure_density', 'social_vulnerability'],
  'SOVI': ['household_composition', 'minority_status', 'housing_type', 'age_demographics', 'population_density', 'economic_value', 'social_vulnerability', 'infrastructure_density'],
  'SEVI': ['livelihood_strategies', 'food_security', 'water_security', 'population_density', 'economic_value', 'social_vulnerability', 'household_composition', 'infrastructure_density', 'cultural_heritage'],
  'LVI': ['population_density', 'economic_value', 'social_vulnerability', 'household_composition', 'livelihood_strategies', 'food_security', 'water_security', 'infrastructure_density', 'cultural_heritage'],
  'INTEGRATED_CVI': ['coastal_geomorphology', 'coastal_slope', 'sea_level_change', 'shoreline_change', 'mean_tide_range', 'mean_wave_height', 'population_density', 'economic_value', 'social_vulnerability', 'land_use', 'ecosystem_services'],
  'GCVI_GS': ['coastal_geotechnical_map', 'median_grain_size'],
  'GCVI_CS': ['coastal_slope', 'posidonia_oceanica'],
  'GCVI_HS': ['sea_level_change', 'mean_tide_range', 'mean_wave_height'],
  'GCVI': ['coastal_geotechnical_map', 'median_grain_size', 'coastal_slope', 'posidonia_oceanica', 'sea_level_change', 'mean_tide_range', 'mean_wave_height']
};

/**
 * Detects which coastal vulnerability index is being used based on selected parameters
 */
export function detectIndex(parameters: Parameter[]): IndexDetection[] {
  const parameterIds = parameters.map(p => p.id);
  const detections: IndexDetection[] = [];

  console.log('🔍 Detecting indices for parameters:', parameterIds);

  for (const [indexType, signature] of Object.entries(INDEX_SIGNATURES)) {
    const matchCount = signature.filter(paramId => parameterIds.includes(paramId)).length;
    const confidence = matchCount / signature.length;

    console.log(`📊 ${indexType}: ${matchCount}/${signature.length} = ${(confidence * 100).toFixed(1)}% confidence`);

    if (confidence >= 0.5) { // 50% match threshold for better detection
      let formula = 'traditional';
      let indexName = indexType;

      // Determine formula type based on index
      switch (indexType) {
        case 'CVI':
        case 'RCVI':
          formula = 'traditional';
          indexName = indexType === 'CVI' ? 'CVI (Traditional)' :
                     'RCVI (Traditional)';
          break;
        case 'ICVI_EVI':
          formula = 'icvi-evi';
          indexName = 'ICVI - EVI Component';
          break;
        case 'ICVI_SVI':
          formula = 'icvi-svi';
          indexName = 'ICVI - SVI Component';
          break;
        case 'ICVI':
          formula = 'icvi-composite';
          indexName = 'ICVI (Composite)';
          break;
        case 'PCVI':
          formula = 'pcvi';
          indexName = 'PCVI (Additive)';
          break;
        case 'ECVI':
          formula = 'ecvi';
          indexName = 'ECVI (Additive)';
          break;
        case 'CCVI':
          formula = 'ccvi-composite';
          indexName = 'CCVI (Composite)';
          break;
        case 'CVI_SE':
          formula = 'cvi-se';
          indexName = 'CVI-SE (60% Physical + 40% Socioeconomic)';
          break;
        case 'SOVI':
          formula = 'sovi';
          indexName = 'SoVI (PCA-based)';
          break;
        case 'SEVI':
          formula = 'sevi';
          indexName = 'SeVI (Domain-based)';
          break;
        case 'LVI':
          formula = 'lvi';
          indexName = 'LVI (IPCC Framework)';
          break;
        case 'INTEGRATED_CVI':
          formula = 'integrated-cvi';
          indexName = 'Integrated CVI (40% Physical + 30% Social + 30% Environmental)';
          break;
        case 'GCVI':
          formula = 'gcvi-composite';
          indexName = 'GCVI (Grouped Components)';
          break;
        case 'GCVI_GS':
        case 'GCVI_CS':
        case 'GCVI_HS':
          formula = 'gcvi-component';
          indexName = `GCVI - ${indexType.split('_')[1]} Component`;
          break;
      }

      console.log(`✅ Adding detection: ${indexName} (${formula}) - ${(confidence * 100).toFixed(1)}%`);

      detections.push({
        indexType,
        indexName,
        formula,
        confidence
      });
    }
  }

  return detections.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Calculates composite index values based on detected index type
 */
export function calculateCompositeIndex(parameters: Parameter[], detection: IndexDetection): FormulaResult {
  const { indexType, formula } = detection;

  switch (formula) {
    case 'traditional':
      return calculateTraditionalCVI(parameters);

    case 'icvi-evi':
    case 'icvi-svi':
      return calculateICVIComponent(parameters, indexType);

    case 'icvi-composite':
      return calculateICVIComposite(parameters);

    case 'icvi-arithmetic':
      return calculateICVIArithmetic(parameters);

    case 'icvi-geometric':
      return calculateICVIGeometric(parameters);

    case 'pcvi':
      return calculatePCVI(parameters);

    case 'ecvi':
      return calculateECVI(parameters);

    case 'ccvi-composite':
      return calculateCCVIComposite(parameters);

    case 'cvi-se':
      return calculateCVISE(parameters);

    case 'sovi':
      return calculateSoVI(parameters);

    case 'sevi':
      return calculateSeVI(parameters);

    case 'lvi':
      return calculateLVI(parameters);

    case 'integrated-cvi':
      return calculateIntegratedCVI(parameters);

    case 'gcvi-composite':
      return calculateGCVIComposite(parameters);

    case 'gcvi-component':
      return calculateWeightedSum(parameters, indexType);

    default:
      return calculateTraditionalCVI(parameters);
  }
}

/**
 * Traditional CVI formula: √(∏Vi/n)
 */
function calculateTraditionalCVI(parameters: Parameter[]): FormulaResult {
  const values = parameters.map(p => p.vulnerabilityValue || 1);
  const product = values.reduce((acc, val) => acc * val, 1);
  const result = Math.sqrt(product / values.length);

  return {
    value: result,
    formula: `√(∏Vi/n) = √((${values.join('×')})/${values.length}) = √(${product}/${values.length}) = ${result.toFixed(3)}`
  };
}

/**
 * ICVI Component calculation: Σ(Vi)/n with 0-1 scale conversion
 */
function calculateICVIComponent(parameters: Parameter[], indexType: string): FormulaResult {
  // Convert 1-5 scale to 0-1 scale for ICVI: (Vi-1)/4
  const convertedValues = parameters.map(p => {
    const originalValue = p.vulnerabilityValue || 1;
    return (originalValue - 1) / 4;
  });

  // Calculate arithmetic mean
  const sum = convertedValues.reduce((acc, val) => acc + val, 0);
  const result = sum / convertedValues.length;

  const componentName = indexType === 'ICVI_EVI' ? 'EVI' : 'SVI';
  return {
    value: result,
    formula: `${componentName} = Σ(Vi)/n = (${convertedValues.map(v => v.toFixed(3)).join('+')})/${convertedValues.length} = ${result.toFixed(3)}`
  };
}

/**
 * ICVI Composite: (EVI + SVI)/2
 */
function calculateICVIComposite(parameters: Parameter[]): FormulaResult {
  // EVI parameters (5 parameters)
  const eviParams = parameters.filter(p =>
    ['coastal_geomorphology', 'coastal_slope', 'ecosystem_type', 'environmental_conservancy', 'interest_species'].includes(p.id)
  );

  // SVI parameters (5 parameters)
  const sviParams = parameters.filter(p =>
    ['use_of_territory', 'building_coast_ratio', 'population_density', 'economic_value', 'sociocultural_heritage'].includes(p.id)
  );

  // Calculate EVI: Convert 1-5 to 0-1 scale, then arithmetic mean
  const eviConverted = eviParams.map(p => ((p.vulnerabilityValue || 1) - 1) / 4);
  const eviValue = eviConverted.reduce((acc, val) => acc + val, 0) / eviConverted.length;

  // Calculate SVI: Convert 1-5 to 0-1 scale, then arithmetic mean
  const sviConverted = sviParams.map(p => ((p.vulnerabilityValue || 1) - 1) / 4);
  const sviValue = sviConverted.reduce((acc, val) => acc + val, 0) / sviConverted.length;

  // ICVI = (EVI + SVI)/2
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

/**
 * ICVI Arithmetic Mean (Eq. I & III): EVI = (a+b+c+d+e+f)/6, SVI = (g+h+i+j+k+l)/6, ICVI = (EVI+SVI)/2
 */
function calculateICVIArithmetic(parameters: Parameter[]): FormulaResult {
  // EVI parameters (6 parameters) - using ICVI parameter IDs
  const eviParams = parameters.filter(p =>
    ['icvi_geomorphological_features', 'icvi_slope', 'icvi_shoreline_migration', 'icvi_ecosystem_type', 'icvi_conservation_measures', 'icvi_species_interest'].includes(p.id)
  );

  // SVI parameters (6 parameters) - using ICVI parameter IDs
  const sviParams = parameters.filter(p =>
    ['icvi_land_use', 'icvi_building_coast_ratio', 'icvi_population_density', 'icvi_economic_activity', 'icvi_economic_value', 'icvi_heritage'].includes(p.id)
  );

  // Calculate EVI: Arithmetic mean of 0.1-0.9 values
  const eviValues = eviParams.map(p => p.vulnerabilityValue || 0.1);
  const eviValue = eviValues.reduce((acc, val) => acc + val, 0) / eviValues.length;

  // Calculate SVI: Arithmetic mean of 0.1-0.9 values
  const sviValues = sviParams.map(p => p.vulnerabilityValue || 0.1);
  const sviValue = sviValues.reduce((acc, val) => acc + val, 0) / sviValues.length;

  // ICVI = (EVI + SVI)/2
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

/**
 * ICVI Geometric Mean (Eq. II & IV): EVI = √(a×b×c×d×e×f), SVI = √(g×h×i×j×k×l), ICVI = (EVI+SVI)/2
 */
function calculateICVIGeometric(parameters: Parameter[]): FormulaResult {
  // EVI parameters (6 parameters) - using ICVI parameter IDs
  const eviParams = parameters.filter(p =>
    ['icvi_geomorphological_features', 'icvi_slope', 'icvi_shoreline_migration', 'icvi_ecosystem_type', 'icvi_conservation_measures', 'icvi_species_interest'].includes(p.id)
  );

  // SVI parameters (6 parameters) - using ICVI parameter IDs
  const sviParams = parameters.filter(p =>
    ['icvi_land_use', 'icvi_building_coast_ratio', 'icvi_population_density', 'icvi_economic_activity', 'icvi_economic_value', 'icvi_heritage'].includes(p.id)
  );

  // Calculate EVI: Geometric mean (6th root of product) of 0.1-0.9 values
  const eviValues = eviParams.map(p => p.vulnerabilityValue || 0.1);
  const eviProduct = eviValues.reduce((acc, val) => acc * val, 1);
  const eviValue = Math.pow(eviProduct, 1 / eviValues.length);

  // Calculate SVI: Geometric mean (6th root of product) of 0.1-0.9 values
  const sviValues = sviParams.map(p => p.vulnerabilityValue || 0.1);
  const sviProduct = sviValues.reduce((acc, val) => acc * val, 1);
  const sviValue = Math.pow(sviProduct, 1 / sviValues.length);

  // ICVI = (EVI + SVI)/2
  const icviValue = (eviValue + sviValue) / 2;

  return {
    value: icviValue,
    formula: `ICVI = (EVI + SVI)/2 = (${eviValue.toFixed(4)} + ${sviValue.toFixed(4)})/2 = ${icviValue.toFixed(4)}`,
    components: {
      'EVI (50%)': eviValue,
      'SVI (50%)': sviValue
    }
  };
}

/**
 * PCVI calculation: Direct additive sum Σ(Vi)
 */
function calculatePCVI(parameters: Parameter[]): FormulaResult {
  const values = parameters.map(p => p.vulnerabilityValue || 1);
  const result = values.reduce((acc, val) => acc + val, 0);

  return {
    value: result,
    formula: `PCVI = Σ(Vi) = ${values.join('+')} = ${result}`
  };
}

/**
 * ECVI calculation: Direct additive sum Σ(Vi)
 */
function calculateECVI(parameters: Parameter[]): FormulaResult {
  const values = parameters.map(p => p.vulnerabilityValue || 1);
  const result = values.reduce((acc, val) => acc + val, 0);

  return {
    value: result,
    formula: `ECVI = Σ(Vi) = ${values.join('+')} = ${result}`
  };
}

/**
 * Generic additive formula: Σ(Vi)
 */
function calculateAdditive(parameters: Parameter[], indexType: string): FormulaResult {
  const values = parameters.map(p => p.vulnerabilityValue || 1);
  const result = values.reduce((acc, val) => acc + val, 0);

  return {
    value: result,
    formula: `${indexType} = Σ(Vi) = ${values.join('+')} = ${result}`
  };
}

/**
 * Weighted sum for GCVI: Σ(Vi × Wi)
 */
function calculateWeightedSum(parameters: Parameter[], indexType: string): FormulaResult {
  const weightedValues = parameters.map(p => (p.vulnerabilityValue || 1) * (p.weight || 1));
  const result = weightedValues.reduce((acc, val) => acc + val, 0);

  const formula = parameters.map(p =>
    `${p.vulnerabilityValue || 1}×${(p.weight || 1).toFixed(3)}`
  ).join('+');

  return {
    value: result,
    formula: `Σ(Vi×Wi) = ${formula} = ${result.toFixed(3)}`
  };
}

/**
 * CCVI Composite: (PCVI + ECVI)/2
 */
function calculateCCVIComposite(parameters: Parameter[]): FormulaResult {
  // PCVI parameters (6 parameters)
  const pcviParams = parameters.filter(p =>
    ['beach_width', 'dune_width', 'coastal_slope', 'vegetation_distance', 'distance_built_structures', 'sea_defences'].includes(p.id)
  );

  // ECVI parameters (4 parameters)
  const ecviParams = parameters.filter(p =>
    ['commercial_properties', 'residential_properties', 'economic_value', 'population_density'].includes(p.id)
  );

  // Calculate PCVI: Direct sum
  const pcviValues = pcviParams.map(p => p.vulnerabilityValue || 1);
  const pcviSum = pcviValues.reduce((acc, val) => acc + val, 0);

  // Calculate ECVI: Direct sum
  const ecviValues = ecviParams.map(p => p.vulnerabilityValue || 1);
  const ecviSum = ecviValues.reduce((acc, val) => acc + val, 0);

  // CCVI = (PCVI + ECVI)/2
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

/**
 * CVI-SE: 60% Physical CVI + 40% Socioeconomic VI (Szlafsztein & Sterr, 2007)
 */
function calculateCVISE(parameters: Parameter[]): FormulaResult {
  // Physical parameters (6 parameters)
  const physicalParams = parameters.filter(p =>
    ['coastal_geomorphology', 'coastal_slope', 'sea_level_change', 'shoreline_change', 'mean_tide_range', 'mean_wave_height'].includes(p.id)
  );

  // Socioeconomic parameters (4 parameters)
  const socioParams = parameters.filter(p =>
    ['population_density', 'economic_value', 'infrastructure_density', 'social_vulnerability'].includes(p.id)
  );

  // Calculate Physical CVI using traditional formula: √(∏Vi/n)
  const physicalValues = physicalParams.map(p => p.vulnerabilityValue || 1);
  const physicalProduct = physicalValues.reduce((acc, val) => acc * val, 1);
  const physicalCVI = Math.sqrt(physicalProduct / physicalValues.length);

  // Calculate Socioeconomic VI using arithmetic mean: Σ(Vi)/n
  const socioValues = socioParams.map(p => p.vulnerabilityValue || 1);
  const socioSum = socioValues.reduce((acc, val) => acc + val, 0);
  const socioVI = socioSum / socioValues.length;

  // CVI-SE = 60% Physical + 40% Socioeconomic
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

/**
 * Arithmetic mean for general use
 */
function calculateArithmeticMean(parameters: Parameter[], indexType: string): FormulaResult {
  const values = parameters.map(p => p.vulnerabilityValue || 1);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const result = sum / values.length;

  return {
    value: result,
    formula: `Σ(Vi)/n = (${values.join('+')})/${values.length} = ${result.toFixed(3)}`
  };
}

/**
 * SoVI: PCA-based Social Vulnerability Index
 */
function calculateSoVI(parameters: Parameter[]): FormulaResult {
  // SoVI uses PCA factor scores - simplified as weighted sum for now
  const result = calculateArithmeticMean(parameters, 'SoVI');

  return {
    value: result.value,
    formula: `SoVI = Σ(Factor Scores × Weights) ≈ ${result.formula}`
  };
}

/**
 * SeVI: Domain-based Social-ecological Vulnerability Index
 */
function calculateSeVI(parameters: Parameter[]): FormulaResult {
  // SeVI uses 9 domains with equal weights
  const result = calculateArithmeticMean(parameters, 'SeVI');

  return {
    value: result.value,
    formula: `SeVI = Σ(Domain_i × Weight_i) = ${result.formula}`
  };
}

/**
 * LVI: Livelihood Vulnerability Index (IPCC Framework)
 */
function calculateLVI(parameters: Parameter[]): FormulaResult {
  // Simplified LVI calculation - in practice would separate E, S, AC components
  const result = calculateArithmeticMean(parameters, 'LVI');

  return {
    value: result.value,
    formula: `LVI = (Exposure + Sensitivity - Adaptive Capacity)/3 ≈ ${result.formula}`
  };
}

/**
 * Integrated CVI: 40% Physical + 30% Social + 30% Environmental (Tanim et al., 2022)
 */
function calculateIntegratedCVI(parameters: Parameter[]): FormulaResult {
  // Physical parameters (6 parameters)
  const physicalParams = parameters.filter(p =>
    ['coastal_geomorphology', 'coastal_slope', 'sea_level_change', 'shoreline_change', 'mean_tide_range', 'mean_wave_height'].includes(p.id)
  );

  // Social parameters (3 parameters)
  const socioParams = parameters.filter(p =>
    ['population_density', 'economic_value', 'social_vulnerability'].includes(p.id)
  );

  // Environmental parameters (2 parameters)
  const envParams = parameters.filter(p =>
    ['land_use', 'ecosystem_services'].includes(p.id)
  );

  // Calculate Physical component using traditional CVI: √(∏Vi/n)
  const physicalValues = physicalParams.map(p => p.vulnerabilityValue || 1);
  const physicalProduct = physicalValues.reduce((acc, val) => acc * val, 1);
  const physicalCVI = Math.sqrt(physicalProduct / physicalValues.length);

  // Calculate Social component using arithmetic mean: Σ(Vi)/n
  const socioValues = socioParams.map(p => p.vulnerabilityValue || 1);
  const socioSum = socioValues.reduce((acc, val) => acc + val, 0);
  const socioVI = socioSum / socioValues.length;

  // Calculate Environmental component using arithmetic mean: Σ(Vi)/n
  const envValues = envParams.map(p => p.vulnerabilityValue || 1);
  const envSum = envValues.reduce((acc, val) => acc + val, 0);
  const envVI = envSum / envValues.length;

  // Integrated CVI = 40% Physical + 30% Social + 30% Environmental
  const integratedValue = (0.4 * physicalCVI) + (0.3 * socioVI) + (0.3 * envVI);

  return {
    value: integratedValue,
    formula: `Integrated CVI = 0.4×Physical + 0.3×Social + 0.3×Environmental = 0.4×${physicalCVI.toFixed(3)} + 0.3×${socioVI.toFixed(3)} + 0.3×${envVI.toFixed(3)} = ${integratedValue.toFixed(3)}`,
    components: {
      'Physical (40%)': physicalCVI,
      'Social (30%)': socioVI,
      'Environmental (30%)': envVI
    }
  };
}

/**
 * GCVI Composite: (GS + CS + HS)/3 with weighted sums
 */
function calculateGCVIComposite(parameters: Parameter[]): FormulaResult {
  // Geotechnical State (GS) parameters (2 parameters)
  const gsParams = parameters.filter(p =>
    ['coastal_geotechnical_map', 'median_grain_size'].includes(p.id)
  );

  // Coastline State (CS) parameters (2 parameters)
  const csParams = parameters.filter(p =>
    ['coastal_slope', 'posidonia_oceanica'].includes(p.id)
  );

  // Hydrodynamic State (HS) parameters (3 parameters)
  const hsParams = parameters.filter(p =>
    ['sea_level_change', 'mean_tide_range', 'mean_wave_height'].includes(p.id)
  );

  // Calculate GS: Weighted sum with equal weights
  const gsValues = gsParams.map(p => p.vulnerabilityValue || 1);
  const gsWeights = gsParams.map(p => p.weight || 0.5); // Equal weights for 2 parameters
  const gsSum = gsValues.reduce((acc, val, i) => acc + (val * gsWeights[i]), 0);

  // Calculate CS: Weighted sum with equal weights
  const csValues = csParams.map(p => p.vulnerabilityValue || 1);
  const csWeights = csParams.map(p => p.weight || 0.5); // Equal weights for 2 parameters
  const csSum = csValues.reduce((acc, val, i) => acc + (val * csWeights[i]), 0);

  // Calculate HS: Weighted sum with equal weights
  const hsValues = hsParams.map(p => p.vulnerabilityValue || 1);
  const hsWeights = hsParams.map(p => p.weight || 1/3); // Equal weights for 3 parameters
  const hsSum = hsValues.reduce((acc, val, i) => acc + (val * hsWeights[i]), 0);

  // GCVI = (GS + CS + HS)/3
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

/**
 * Calculate ICVI composite from EVI and SVI components (legacy function)
 */
export function calculateICVI(eviParameters: Parameter[], sviParameters: Parameter[]): FormulaResult {
  const eviResult = calculateICVIComponent(eviParameters, 'ICVI_EVI');
  const sviResult = calculateICVIComponent(sviParameters, 'ICVI_SVI');

  const icviValue = (eviResult.value + sviResult.value) / 2;

  return {
    value: icviValue,
    formula: `ICVI = (EVI + SVI)/2 = (${eviResult.value.toFixed(3)} + ${sviResult.value.toFixed(3)})/2 = ${icviValue.toFixed(3)}`,
    components: {
      EVI: eviResult.value,
      SVI: sviResult.value
    }
  };
}

/**
 * Calculate CCVI composite from PCVI and ECVI components
 */
export function calculateCCVI(pcviParameters: Parameter[], ecviParameters: Parameter[]): FormulaResult {
  const pcviResult = calculateAdditive(pcviParameters, 'PCVI');
  const ecviResult = calculateAdditive(ecviParameters, 'ECVI');

  const ccviValue = (pcviResult.value + ecviResult.value) / 2;

  return {
    value: ccviValue,
    formula: `CCVI = (PCVI + ECVI)/2 = (${pcviResult.value} + ${ecviResult.value})/2 = ${ccviValue.toFixed(3)}`,
    components: {
      PCVI: pcviResult.value,
      ECVI: ecviResult.value
    }
  };
}

/**
 * Calculate GCVI with grouped components
 */
export function calculateGCVI(gsParameters: Parameter[], csParameters: Parameter[], hsParameters: Parameter[]): FormulaResult {
  const gsResult = calculateWeightedSum(gsParameters, 'GCVI_GS');
  const csResult = calculateWeightedSum(csParameters, 'GCVI_CS');
  const hsResult = calculateWeightedSum(hsParameters, 'GCVI_HS');

  // Equal weights for each component group
  const gcviValue = (gsResult.value + csResult.value + hsResult.value) / 3;

  return {
    value: gcviValue,
    formula: `GCVI = (GS + CS + HS)/3 = (${gsResult.value.toFixed(3)} + ${csResult.value.toFixed(3)} + ${hsResult.value.toFixed(3)})/3 = ${gcviValue.toFixed(3)}`,
    components: {
      'Geotechnical State': gsResult.value,
      'Coastline State': csResult.value,
      'Hydrodynamic State': hsResult.value
    }
  };
}
