import { indexedDBService } from '../services/indexedDBService';
import type { Parameter, ShorelineSegment, ParameterValue, ShorelineSegmentProperties } from '../types';

/**
 * Applies a parameter value and its corresponding vulnerability score
 * to the selected shoreline segments. Updates the segments in IndexedDB.
 *
 * @param segments The current array of all shoreline segments.
 * @param selectedSegmentIds An array of IDs for the segments to be updated.
 * @param activeParameter The parameter whose value is being assigned.
 * @param valueToApply The string representation of the value to apply.
 * @param vulnerabilityToApply The numerical vulnerability score (1-5) to apply.
 * @returns A Promise resolving to the updated array of shoreline segments.
 * @throws If storing data in IndexedDB fails.
 */
export const applyParameterValueToSegments = async (
    segments: ShorelineSegment[],
    selectedSegmentIds: string[],
    activeParameter: Parameter,
    valueToApply: string,
    vulnerabilityToApply: number
): Promise<ShorelineSegment[]> => {
    console.log(`Applying value "${valueToApply}" (vuln: ${vulnerabilityToApply}) for "${activeParameter.name}" to ${selectedSegmentIds.length} segments`);

    let updateOccurred = false;
    const updatedSegments = segments.map(segment => {
        if (selectedSegmentIds.includes(segment.id)) {
            let paramValue: ParameterValue;
            let segmentNeedsUpdate = false;

            // Determine the parameter value based on type
            if (activeParameter.type === 'numerical') {
                const numValue = parseFloat(valueToApply);
                if (!isNaN(numValue)) {
                    paramValue = { type: 'numerical', value: numValue, vulnerability: vulnerabilityToApply };
                } else {
                    console.error(`Skipping segment ${segment.id}: Invalid numerical value ${valueToApply}`);
                    return segment; // Skip update for this segment
                }
            } else { // Categorical
                paramValue = { type: 'categorical', value: valueToApply, vulnerability: vulnerabilityToApply };
            }

            // Check if the value actually changed
            // Read from the direct parameters property for comparison
            const existingValue = segment.parameters?.[activeParameter.id];
            if (
                !existingValue ||
                existingValue.value !== paramValue.value ||
                existingValue.vulnerability !== paramValue.vulnerability
            ) {
                segmentNeedsUpdate = true;
            }


            if (segmentNeedsUpdate) {
                updateOccurred = true;
                // Update direct parameters object on the segment (for immediate use in UI)
                const updatedDirectParameters = { ...segment.parameters, [activeParameter.id]: paramValue };

                // Ensure segment.properties exists and is an object
                const currentProperties = segment.properties || { id: segment.id } as ShorelineSegmentProperties; // Basic fallback

                // Ensure currentProperties.parameters exists and is an object
                const currentPropertiesParams = currentProperties.parameters && typeof currentProperties.parameters === 'object'
                                               ? currentProperties.parameters
                                               : {};

                // Update parameters within the properties object (for persistence)
                const updatedProperties: ShorelineSegmentProperties = {
                    ...currentProperties,
                    parameters: { ...currentPropertiesParams, [activeParameter.id]: paramValue }
                };
                // console.log(`Segment ${segment.id} updated for param ${activeParameter.id}`);
                // Return segment with BOTH direct parameters and properties.parameters updated
                return { ...segment, parameters: updatedDirectParameters, properties: updatedProperties };
            }
        }
        return segment; // Return unchanged segment if not selected or no update needed
    });

    // Only save to DB if an actual update occurred
    if (updateOccurred) {
        try {
            // Ensure features are correctly formatted for storage
             const featuresToStore = updatedSegments.map(seg => ({
                type: 'Feature' as const,
                geometry: seg.geometry,
                // Crucially, store the updated properties object which contains the parameters
                properties: seg.properties,
             }));

            await indexedDBService.storeShorelineData('current-segments', {
                type: 'FeatureCollection',
                features: featuresToStore
            });
            console.log("Stored updated segments after value application");
        } catch (error) {
            console.error('Failed to store updated segments:', error);
            // Re-throw the error so the calling component knows it failed
            throw new Error(`Failed to save changes: ${error instanceof Error ? error.message : String(error)}`);
        }
    } else {
        console.log("No actual segment values changed, skipping database update.");
    }

    // Return the potentially updated array of segments for the component state
    return updatedSegments;
};