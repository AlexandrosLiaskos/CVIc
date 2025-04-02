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
  if (sumWeights === 0) return 0; // Avoid division by zero
  let product = 1.0; // Use floating point
  for (let i = 0; i < values.length; i++) {
    // Ensure value is positive
    const value = Math.max(1e-9, values[i]); // Use small positive number instead of 0 or negative
    const exponent = weights[i] / sumWeights; // Normalize weight exponent
    product *= Math.pow(value, exponent);
  }
  // console.log(`GeoMean Inputs: values=${values}, weights=${weights}, sumWeights=${sumWeights}, product=${product}`);
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
  if (n === 0) return 0;
  const geometricMean = calculateGeometricMean(values, weights); // This is already normalized by weight sum
  const normalizedResult = Math.pow(geometricMean, 1.0 / n); // Apply 1/n normalization
  // console.log(`GeoMeanNormalized: geoMean=${geometricMean}, n=${n}, result=${normalizedResult}`);
  return normalizedResult;
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
  if (sumWeights === 0) return 0; // Avoid division by zero
  let weightedSum = 0.0; // Use floating point
  for (let i = 0; i < values.length; i++) {
    weightedSum += values[i] * weights[i];
  }
  const result = weightedSum / sumWeights;
  // console.log(`ArithMean Inputs: values=${values}, weights=${weights}, sumWeights=${sumWeights}, weightedSum=${weightedSum}, result=${result}`);
  return result;
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
    if (sumWeights === 0) return 0; // Avoid division by zero
    const weightedSumOfSquares = values.reduce((acc, val, i) => acc + Math.pow(val, 2) * weights[i], 0);
    const normalizedValue = weightedSumOfSquares / sumWeights;
    const result = Math.sqrt(normalizedValue); // Take the square root
    // console.log(`NonlinearPower Inputs: values=${values}, weights=${weights}, sumWeights=${sumWeights}, weightedSumSq=${weightedSumOfSquares}, normalized=${normalizedValue}, result=${result}`);
    return result;
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
  parameters: Parameter[], // This contains ALL enabled parameters from the selection page
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

    // Filter parameters to only include those with actual weight > 0
    // This prevents parameters with weight 0 from influencing the calculation inappropriately
    const relevantParameters = parameters.filter(p => p.weight > 0);
    const sumOfRelevantWeights = relevantParameters.reduce((sum, p) => sum + p.weight, 0);

    // Validate if relevant weights sum approximately to 1 (important for weighted formulas)
    if (Math.abs(sumOfRelevantWeights - 1) > 0.01) {
        const errorMsg = `Weights of parameters used in calculation do not sum to 1 (Sum: ${sumOfRelevantWeights.toFixed(2)}). Please adjust weights in Parameter Selection.`;
        console.error(errorMsg);
        setError(errorMsg);
        // Optionally stop calculation if weights are significantly off
        // return;
    }


    // Reason: Iterate through each segment to calculate its CVI score.
    segments.forEach((segment, index) => {
      // Reason: Check if the segment has assigned values for all relevant parameters.
      const hasAllParameters = relevantParameters.every(param =>
        segment.parameters && segment.parameters[param.id] !== undefined
      );

      // Reason: Skip segments that don't have all necessary parameter values.
      if (!hasAllParameters) {
        // console.log(`Segment ${segment.id} missing relevant parameters, skipping CVI calculation.`);
        return;
      }

      // Reason: Extract vulnerability values (1-5) and weights for CVI calculation.
      const paramValues: number[] = [];
      const weights: number[] = [];

      // Loop through ONLY relevant parameters
      relevantParameters.forEach(param => {
        const paramValue = segment.parameters[param.id];
        // We already know paramValue exists due to the hasAllParameters check above
        // Ensure vulnerability is within the expected 1-5 range.
        const vulnerability = Math.max(1, Math.min(5, paramValue!.vulnerability));
        if (paramValue!.vulnerability !== vulnerability) {
          console.warn(`Parameter ${param.name} for segment ${segment.id} has vulnerability ${paramValue!.vulnerability} outside 1-5 range. Clamped to ${vulnerability}.`);
        }
        paramValues.push(vulnerability);
        // Use the guaranteed positive weight
        weights.push(param.weight); // No need for || 0 here anymore
      });


      // Reason: Calculate CVI score based on the selected formula.
      let cviScore: number;
      // Pass the SUM of relevant weights if the formula needs it for normalization
      // Note: calculateGeometricMean and calculateArithmeticMean already handle normalization internally using the passed weights.
      // calculateNonlinearPower also normalizes internally.
      // calculateGeometricMeanNormalized needs the count (n).
      const n = relevantParameters.length;

      switch (formula.type) {
        case 'geometric-mean':
          // This function normalizes internally using sum of weights passed
          cviScore = calculateGeometricMean(paramValues, weights);
          break;
        case 'geometric-mean-normalized':
          // This function applies an additional 1/n normalization AFTER internal weight normalization
          // Let's adjust the base function or this call if needed.
          // Rereading the function: calculateGeometricMeanNormalized calls calculateGeometricMean (which normalizes by weight sum)
          // and then applies Math.pow(..., 1/n). This seems correct as per its description.
          cviScore = calculateGeometricMeanNormalized(paramValues, weights);
          break;
        case 'arithmetic-mean':
           // This function normalizes internally using sum of weights passed
          cviScore = calculateArithmeticMean(paramValues, weights);
          break;
        case 'nonlinear-power':
           // This function normalizes internally using sum of weights passed
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