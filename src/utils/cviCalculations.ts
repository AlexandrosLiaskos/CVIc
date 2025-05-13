// src/utils/cviCalculations.ts
import type { Parameter, ShorelineSegment, Formula } from '../types';
import { indexedDBService } from '../services/indexedDBService';

 const calculateGeometricMean = (values: number[], weights: number[]): number => {
  const sumWeights = weights.reduce((a, b) => a + b, 0);
  if (sumWeights === 0) return 0;
  let product = 1.0;
  for (let i = 0; i < values.length; i++) {
    const value = Math.max(1e-9, values[i]);
    const exponent = weights[i] / sumWeights;
    product *= Math.pow(value, exponent);
  }
  return product;
};

export const calculateGeometricMeanNormalized = (values: number[], weights: number[]): number => {
  const n = values.length;
  if (n === 0) return 0;
  const geometricMean = calculateGeometricMean(values, weights);
  const normalizedResult = Math.pow(geometricMean, 1.0 / n);
  return normalizedResult;
};

export const calculateArithmeticMean = (values: number[], weights: number[]): number => {
  const sumWeights = weights.reduce((a, b) => a + b, 0);
  if (sumWeights === 0) return 0;
  let weightedSum = 0.0;
  for (let i = 0; i < values.length; i++) {
    weightedSum += values[i] * weights[i];
  }
  const result = weightedSum / sumWeights;
  return result;
};

export const calculateNonlinearPower = (values: number[], weights: number[]): number => {
    const sumWeights = weights.reduce((a, b) => a + b, 0);
    if (sumWeights === 0) return 0;
    const weightedSumOfSquares = values.reduce((acc, val, i) => acc + Math.pow(val, 2) * weights[i], 0);
    const normalizedValue = weightedSumOfSquares / sumWeights;
    const result = Math.sqrt(normalizedValue);
    return result;
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
    const sumOfRelevantWeights = relevantParameters.reduce((sum, p) => sum + p.weight, 0);

    if (Math.abs(sumOfRelevantWeights - 1) > 0.01) {
        const errorMsg = `Weights of parameters used in calculation do not sum to 1 (Sum: ${sumOfRelevantWeights.toFixed(2)}). Please adjust weights in Parameter Selection.`;
        console.error(errorMsg);
        setError(errorMsg);
    }

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
        case 'geometric-mean-normalized':
          cviScore = calculateGeometricMeanNormalized(paramValues, weights);
          break;
        case 'arithmetic-mean':
          cviScore = calculateArithmeticMean(paramValues, weights);
          break;
        case 'nonlinear-power':
          cviScore = calculateNonlinearPower(paramValues, weights);
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
