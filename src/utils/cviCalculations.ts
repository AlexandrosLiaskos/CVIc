// src/utils/cviCalculations.ts
import type { Parameter, ShorelineSegment, Formula, ParameterValue } from '../types';
import { indexedDBService } from '../services/indexedDBService';

/**
 * Calculates the Coastal Vulnerability Index (CVI) using the weighted geometric mean formula.
 * CVI = (V1^w1 * V2^w2 * ... * Vn^wn)^(1 / sum(wi))
 *
 * @param values Array of vulnerability scores (1-5) for each parameter.
 * @param weights Array of weights corresponding to each parameter.
 * @returns The calculated CVI score.
 */
export const calculateGeometricMean = (values: number[], weights: number[]): number => {
  const sumWeights = weights.reduce((a, b) => a + b, 0);
  // Ensure sumWeights is not zero to avoid division by zero
  if (sumWeights === 0) {
    console.warn("Sum of weights is zero in calculateGeometricMean. Returning 0.");
    return 0;
  }
  let product = 1;
  for (let i = 0; i < values.length; i++) {
    // Ensure value is positive for geometric mean calculation
    const value = values[i] > 0 ? values[i] : 1e-9; // Use a small positive number if value is 0 or less
    product *= Math.pow(value, weights[i] / sumWeights);
  }
  return product;
};

/**
 * Calculates the Coastal Vulnerability Index (CVI) using the normalized weighted geometric mean formula.
 * CVI = ((V1^w1 * V2^w2 * ... * Vn^wn)^(1 / sum(wi)))^(1/n)
 *
 * @param values Array of vulnerability scores (1-5) for each parameter.
 * @param weights Array of weights corresponding to each parameter.
 * @returns The calculated CVI score.
 */
export const calculateGeometricMeanNormalized = (values: number[], weights: number[]): number => {
  const n = values.length;
  if (n === 0) {
    console.warn("No values provided for calculateGeometricMeanNormalized. Returning 0.");
    return 0;
  }
  const geometricMean = calculateGeometricMean(values, weights);
  return Math.pow(geometricMean, 1 / n);
};

/**
 * Calculates the Coastal Vulnerability Index (CVI) using the weighted arithmetic mean formula.
 * CVI = (V1*w1 + V2*w2 + ... + Vn*wn) / sum(wi)
 *
 * @param values Array of vulnerability scores (1-5) for each parameter.
 * @param weights Array of weights corresponding to each parameter.
 * @returns The calculated CVI score.
 */
export const calculateArithmeticMean = (values: number[], weights: number[]): number => {
  const sumWeights = weights.reduce((a, b) => a + b, 0);
  // Ensure sumWeights is not zero to avoid division by zero
  if (sumWeights === 0) {
    console.warn("Sum of weights is zero in calculateArithmeticMean. Returning 0.");
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i] * weights[i];
  }
  return sum / sumWeights;
};

/**
 * Calculates the Coastal Vulnerability Index (CVI) using the nonlinear power formula.
 * CVI = sqrt((V1^2*w1 + V2^2*w2 + ... + Vn^2*wn) / sum(wi))
 *
 * @param values Array of vulnerability scores (1-5) for each parameter.
 * @param weights Array of weights corresponding to each parameter.
 * @returns The calculated CVI score.
 */
export const calculateNonlinearPower = (values: number[], weights: number[]): number => {
  const sumWeights = weights.reduce((a, b) => a + b, 0);
  // Ensure sumWeights is not zero to avoid division by zero
  if (sumWeights === 0) {
    console.warn("Sum of weights is zero in calculateNonlinearPower. Returning 0.");
    return 0;
  }
  const weightedSum = values.reduce((acc, val, i) => acc + Math.pow(val, 2) * weights[i], 0);
  return Math.sqrt(weightedSum / sumWeights);
};

/**
 * Calculates CVI scores for all segments based on the selected formula.
 * It updates segment properties with the calculated CVI score and the formula used.
 *
 * @param segments The array of shoreline segments.
 * @param parameters The array of enabled parameters.
 * @param formula The selected CVI calculation formula.
 * @param setSegments Function to update the segments state.
 * @param setCviScores Function to update the CVI scores state.
 * @param setError Function to set an error message.
 * @returns {Promise<void>} A promise that resolves when CVI calculation and saving are complete.
 */
export const calculateAndSaveCVI = async (
  segments: ShorelineSegment[],
  parameters: Parameter[],
  formula: Formula,
  setSegments: React.Dispatch<React.SetStateAction<ShorelineSegment[]>>,
  setCviScores: React.Dispatch<React.SetStateAction<Record<string, number>>>,
  setError: (error: string | null) => void
): Promise<void> => {
  console.log("Calculating CVI using formula:", formula.name);
  setError(null); // Clear previous errors

  try {
    const newCviScores: Record<string, number> = {};
    const updatedSegments = [...segments]; // Create a mutable copy
    let segmentsUpdated = false;

    // Reason: Iterate through each segment to calculate its CVI score.
    segments.forEach((segment, index) => {
      // Reason: Check if the segment has assigned values for all enabled parameters.
      const hasAllParameters = parameters.every(param =>
        segment.parameters && segment.parameters[param.id] !== undefined
      );

      // Reason: Skip segments that don't have all necessary parameter values.
      if (!hasAllParameters) {
        // console.log(`Segment ${segment.id} missing parameters, skipping CVI calculation.`);
        return;
      }

      // Reason: Extract vulnerability values (1-5) and weights for CVI calculation.
      const paramValues: number[] = [];
      const weights: number[] = [];

      parameters.forEach(param => {
        const paramValue = segment.parameters[param.id];
        if (!paramValue) {
          console.warn(`Missing parameter value for segment ${segment.id}, parameter ${param.name}`);
          // Handle missing value - default to lowest vulnerability or skip? Defaulting to 1.
          paramValues.push(1);
        } else {
          // Ensure vulnerability is within the expected 1-5 range.
          const vulnerability = Math.max(1, Math.min(5, paramValue.vulnerability));
          if (paramValue.vulnerability !== vulnerability) {
            console.warn(`Parameter ${param.name} for segment ${segment.id} has vulnerability ${paramValue.vulnerability} outside 1-5 range. Clamped to ${vulnerability}.`);
          }
          paramValues.push(vulnerability);
        }
        weights.push(param.weight || 1); // Default weight to 1 if not specified
      });


      // Reason: Calculate CVI score based on the selected formula.
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
          // Default to geometric mean if formula type is unknown
          console.warn(`Unknown formula type: ${formula.type}. Defaulting to geometric mean.`);
          cviScore = calculateGeometricMean(paramValues, weights);
      }

      // Round to 2 decimal places
      cviScore = Math.round(cviScore * 100) / 100;

      // Store CVI score
      newCviScores[segment.id] = cviScore;

      // Update segment properties if CVI changed or wasn't set
      // Reason: Update segment properties for persistence and display consistency.
      if (updatedSegments[index]?.properties && // Check if properties exist
          (updatedSegments[index].properties.vulnerabilityIndex !== cviScore ||
           updatedSegments[index].properties.vulnerabilityFormula !== formula.type))
      {
        updatedSegments[index].properties.vulnerabilityIndex = cviScore;
        updatedSegments[index].properties.vulnerabilityFormula = formula.type;
        segmentsUpdated = true;
      }
    });

    // Reason: Persist updated segment data with CVI scores to IndexedDB if changes occurred.
    if (segmentsUpdated) {
      try {
        await indexedDBService.storeShorelineData('current-segments', {
          type: 'FeatureCollection',
          features: updatedSegments.map(seg => ({ // Ensure features are correctly formatted
            type: 'Feature',
            geometry: seg.geometry,
            properties: seg.properties,
          })),
        });

        // Update state only after successful storage
        setSegments(updatedSegments);
        console.log("Saved CVI scores to segments in IndexedDB");
      } catch (dbErr) {
        console.error("Failed to save CVI scores to IndexedDB:", dbErr);
        setError("Failed to save calculated CVI scores. Calculations are shown but may be lost.");
        // Still update CVI scores in state for immediate UI feedback
      }
    }

    // Update CVI scores state for UI rendering
    setCviScores(newCviScores);
    console.log(`Calculated CVI scores for ${Object.keys(newCviScores).length} segments.`);

  } catch (calculationError) {
    console.error("Error during CVI calculation:", calculationError);
    setError(`An error occurred during CVI calculation: ${calculationError instanceof Error ? calculationError.message : String(calculationError)}`);
    // Reset scores if calculation fails fundamentally
    setCviScores({});
  }
};