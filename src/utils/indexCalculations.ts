import type { Parameter, ShorelineSegment, Formula } from '../types';
import { indexedDBService } from '../services/indexedDBService';
import { IndexCalculatorFactory } from '../calculators/indexCalculatorFactory';

/**
 * Calculate and save index values for all segments
 * Simplified, modular approach using the calculator factory
 */
export const calculateAndSaveIndex = async (
  segments: ShorelineSegment[],
  parameters: Parameter[],
  formula: Formula,
  setSegments: React.Dispatch<React.SetStateAction<ShorelineSegment[]>>,
  setCviScores: React.Dispatch<React.SetStateAction<Record<string, number>>>,
  setError: (error: string | null) => void
): Promise<void> => {
  console.log("Calculating index using formula:", formula.name);
  setError(null);

  try {
    const newIndexScores: Record<string, number> = {};
    const updatedSegments = [...segments];
    let segmentsUpdated = false;

    // Include all parameters (CVI has no weights, ICVI has weights)
    const relevantParameters = parameters.filter(p => p.weight === undefined || p.weight > 0);
    
    if (relevantParameters.length === 0) {
      throw new Error("No relevant parameters found for calculation");
    }

    if (segments.length === 0) {
      throw new Error("No segments found for calculation");
    }
    segments.forEach((segment, index) => {
      // Check if segment has all required parameters
      if (!IndexCalculatorFactory.hasAllParameters(segment, relevantParameters, formula)) {
        return;
      }

      try {
        // Calculate index value using the factory
        const result = IndexCalculatorFactory.calculate(segment, relevantParameters, formula);
        
        // Round to 2 decimal places
        const indexScore = Math.round(result.value * 100) / 100;
        newIndexScores[segment.id] = indexScore;

        // Update segment if value changed
        if (updatedSegments[index]?.properties &&
            (updatedSegments[index].properties.vulnerabilityIndex !== indexScore ||
             updatedSegments[index].properties.vulnerabilityFormula !== formula.type))
        {
          updatedSegments[index].properties.vulnerabilityIndex = indexScore;
          updatedSegments[index].properties.vulnerabilityFormula = formula.type;
          segmentsUpdated = true;
        }
      } catch (calculationError) {
        console.error(`Failed to calculate ${formula.name} for segment ${segment.id}:`, calculationError);
        setError(`Calculation failed for segment ${segment.id}: ${calculationError}`);
        return;
      }
    });

    // Save results
    const geoJsonToStore = {
      type: 'FeatureCollection' as const,
      features: updatedSegments.map(seg => ({
        type: 'Feature' as const,
        geometry: seg.geometry,
        properties: seg.properties
      }))
    };

    if (segmentsUpdated) {
      await indexedDBService.storeShorelineData('current-segments', geoJsonToStore);
      setSegments(updatedSegments);
    }

    setCviScores(newIndexScores);
    console.log(`${formula.name} calculation completed successfully`);

  } catch (error) {
    console.error(`${formula.name} calculation failed:`, error);
    setError(`${formula.name} calculation failed: ${error}`);
  }
};