// src/utils/cviCalculations.ts
import type { Parameter, ShorelineSegment, Formula } from '../types';
import { indexedDBService } from '../services/indexedDBService';
import { detectIndex, calculateCompositeIndex, calculateICVI, calculateCCVI } from '../logic/compositeFormulas';

/**
 * Geometric Mean: CVI = ∏(Vi^Wi)
 * Calculates the product of values raised to their respective weights
 */
export const calculateGeometricMean = (values: number[], weights: number[]): number => {
  if (values.length === 0) return 0;
  let product = 1.0;
  for (let i = 0; i < values.length; i++) {
    const value = Math.max(1e-9, values[i]); // Prevent log(0) issues
    product *= Math.pow(value, weights[i]);
  }
  return product;
};

/**
 * Traditional: CVI = √(∏(Vi)/n)
 * Calculates the square root of the product of values divided by the number of variables
 * Only usable with equal weights
 */
export const calculateTraditional = (values: number[], weights: number[]): number => {
  const n = values.length;
  if (n === 0) return 0;

  // Check if weights are equal (within tolerance)
  const firstWeight = weights[0];
  const areWeightsEqual = weights.every(w => Math.abs(w - firstWeight) < 1e-6);

  if (!areWeightsEqual) {
    console.warn("Traditional formula requires equal weights. Results may not be meaningful.");
  }

  let product = 1.0;
  for (let i = 0; i < values.length; i++) {
    const value = Math.max(1e-9, values[i]); // Prevent log(0) issues
    product *= value;
  }

  // CVI = √(∏Vi / n) - division happens INSIDE the square root
  return Math.sqrt(product / n);
};

/**
 * Arithmetic Mean: CVI = Σ(Vi*Wi)
 * Calculates the weighted sum of values
 */
export const calculateArithmeticMean = (values: number[], weights: number[]): number => {
  if (values.length === 0) return 0;
  let weightedSum = 0.0;
  for (let i = 0; i < values.length; i++) {
    weightedSum += values[i] * weights[i];
  }
  return weightedSum;
};

/**
 * Nonlinear Power: CVI = √(Σ(Vi²*Wi))
 * Calculates the square root of the weighted sum of squares
 */
export const calculateNonlinearPower = (values: number[], weights: number[]): number => {
  if (values.length === 0) return 0;
  const weightedSumOfSquares = values.reduce((acc, val, i) => acc + Math.pow(val, 2) * weights[i], 0);
  return Math.sqrt(weightedSumOfSquares);
};

export const calculateAndSaveCVI = async (
  segments: ShorelineSegment[],
  parameters: Parameter[],
  formula: Formula,
  setSegments: React.Dispatch<React.SetStateAction<ShorelineSegment[]>>,
  setCviScores: React.Dispatch<React.SetStateAction<Record<string, number>>>,
  setError: (error: string | null) => void
): Promise<void> => {
  console.log("Calculating CVI using formula:", formula.name);
  setError(null);

  try {
    const newCviScores: Record<string, number> = {};
    const updatedSegments = [...segments];
    let segmentsUpdated = false;

    const relevantParameters = parameters.filter(p => p.weight > 0);

    // Validate weights based on formula type
    if (formula.type === 'traditional') {
      // Traditional formula requires equal weights
      const firstWeight = relevantParameters[0]?.weight || 0;
      const areWeightsEqual = relevantParameters.every(p => Math.abs(p.weight - firstWeight) < 1e-6);

      if (!areWeightsEqual) {
        const errorMsg = `Traditional formula requires equal weights for all parameters. Please adjust weights in Parameter Selection.`;
        console.error(errorMsg);
        setError(errorMsg);
      }
    }

    // Note: Other formulas (geometric-mean, arithmetic-mean, nonlinear-power)
    // work with any positive weights as specified in the new formulas

    segments.forEach((segment, index) => {
      const hasAllParameters = relevantParameters.every(param =>
        segment.parameters && segment.parameters[param.id] !== undefined
      );

      if (!hasAllParameters) {
        return;
      }

      const paramValues: number[] = [];
      const weights: number[] = [];

      relevantParameters.forEach(param => {
        const paramValue = segment.parameters[param.id];
        const vulnerability = Math.max(1, Math.min(5, paramValue!.vulnerability));
        if (paramValue!.vulnerability !== vulnerability) {
          console.warn(`Parameter ${param.name} for segment ${segment.id} has vulnerability ${paramValue!.vulnerability} outside 1-5 range. Clamped to ${vulnerability}.`);
        }
        paramValues.push(vulnerability);
        weights.push(param.weight);
      });

      let cviScore: number;
      switch (formula.type) {
        case 'geometric-mean':
          cviScore = calculateGeometricMean(paramValues, weights);
          break;
        case 'traditional':
          cviScore = calculateTraditional(paramValues, weights);
          break;
        case 'arithmetic-mean':
          cviScore = calculateArithmeticMean(paramValues, weights);
          break;
        case 'nonlinear-power':
          cviScore = calculateNonlinearPower(paramValues, weights);
          break;
        case 'icvi-evi':
        case 'icvi-svi':
        case 'icvi-composite':
        case 'icvi-arithmetic':
        case 'icvi-geometric':
        case 'pcvi':
        case 'ecvi':
        case 'ccvi-composite':
        case 'cvi-se':
        case 'sovi':
        case 'sevi':
        case 'lvi':
        case 'integrated-cvi':
        case 'gcvi-composite':
        case 'gcvi-component':
          // Handle composite formulas - create detection object directly
          console.log(`Processing composite formula: ${formula.type}`);
          console.log(`Available parameters: ${relevantParameters.map(p => p.id).join(', ')}`);

          // Create parameters with vulnerability values for this segment
          const parametersWithValues = relevantParameters.map(param => {
            const segmentValue = segment.parameters[param.id];
            return {
              ...param,
              vulnerabilityValue: segmentValue?.vulnerability || 1
            };
          });

          // Create a detection object based on the selected formula
          let indexType = formula.type.toUpperCase().replace('-', '_');

          // Map formula types to correct index types
          switch (formula.type) {
            case 'cvi-se':
              indexType = 'CVI_SE';
              break;
            case 'icvi-evi':
              indexType = 'ICVI_EVI';
              break;
            case 'icvi-svi':
              indexType = 'ICVI_SVI';
              break;
            case 'icvi-composite':
            case 'icvi-arithmetic':
            case 'icvi-geometric':
              indexType = 'ICVI';
              break;
            case 'ccvi-composite':
              indexType = 'CCVI';
              break;
            case 'integrated-cvi':
              indexType = 'INTEGRATED_CVI';
              break;
            case 'gcvi-composite':
              indexType = 'GCVI';
              break;
            case 'gcvi-component':
              indexType = 'GCVI_GS'; // Default, will be handled in calculation
              break;
            default:
              indexType = formula.type.toUpperCase().replace('-', '_');
          }

          const syntheticDetection = {
            indexType,
            indexName: formula.name,
            formula: formula.type,
            confidence: 1.0
          };

          try {
            const result = calculateCompositeIndex(parametersWithValues, syntheticDetection);
            cviScore = result.value;
            console.log(`Composite calculation successful: ${result.formula}`);
          } catch (compositeError) {
            console.error(`Composite calculation failed for ${formula.type}:`, compositeError);
            console.warn(`Falling back to traditional calculation`);
            cviScore = calculateTraditional(paramValues, weights);
          }
          break;
        default:
          console.warn(`Unknown formula type: ${formula.type}. Defaulting to geometric mean.`);
          cviScore = calculateGeometricMean(paramValues, weights);
      }

      cviScore = Math.round(cviScore * 100) / 100;
      newCviScores[segment.id] = cviScore;

      if (updatedSegments[index]?.properties &&
          (updatedSegments[index].properties.vulnerabilityIndex !== cviScore ||
           updatedSegments[index].properties.vulnerabilityFormula !== formula.type))
      {
        updatedSegments[index].properties.vulnerabilityIndex = cviScore;
        updatedSegments[index].properties.vulnerabilityFormula = formula.type;
        segmentsUpdated = true;
      }
    });

    const geoJsonToStore = {
      type: 'FeatureCollection' as const,
      features: updatedSegments.map(seg => ({
        type: 'Feature' as const,
        geometry: seg.geometry,
        properties: seg.properties,
      })),
    };

    if (segmentsUpdated) {
      try {
        await indexedDBService.storeShorelineData('current-segments', geoJsonToStore);
        setSegments(updatedSegments);
        console.log("Saved CVI scores to segments in IndexedDB");

      } catch (dbErr) {
        console.error("Failed to save CVI scores to IndexedDB:", dbErr);
        setError("Failed to save calculated CVI scores locally. Calculations are shown but may be lost if you leave the page.");
      }
    } else if (Object.keys(newCviScores).length > 0) {
      console.log("CVI scores calculated, but no segment properties changed. Data already consistent in IndexedDB if previously saved.");
    }

    setCviScores(newCviScores);
    console.log(`Calculated CVI scores for ${Object.keys(newCviScores).length} segments.`);

  } catch (calculationError) {
    console.error("Error during CVI calculation:", calculationError);
    setError(`An error occurred during CVI calculation: ${calculationError instanceof Error ? calculationError.message : String(calculationError)}`);
    setCviScores({});
  }
};
