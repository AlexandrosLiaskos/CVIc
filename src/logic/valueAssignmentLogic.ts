import { indexedDBService } from '../services/indexedDBService';
import type { Parameter, ShorelineSegment, ParameterValue, ShorelineSegmentProperties } from '../types';

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
            if (activeParameter.type === 'numerical') {
                const numValue = parseFloat(valueToApply);
                if (!isNaN(numValue)) {
                    paramValue = { type: 'numerical', value: numValue, vulnerability: vulnerabilityToApply };
                } else {
                    console.error(`Skipping segment ${segment.id}: Invalid numerical value ${valueToApply}`);
                    return segment; 
                }
            } else { 
                paramValue = { type: 'categorical', value: valueToApply, vulnerability: vulnerabilityToApply };
            }

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
                const updatedDirectParameters = { ...segment.parameters, [activeParameter.id]: paramValue };
                const currentProperties = segment.properties || { id: segment.id } as ShorelineSegmentProperties;
                const currentPropertiesParams = currentProperties.parameters && typeof currentProperties.parameters === 'object'
                                               ? currentProperties.parameters
                                               : {};
                const updatedProperties: ShorelineSegmentProperties = {
                    ...currentProperties,
                    parameters: { ...currentPropertiesParams, [activeParameter.id]: paramValue }
                };
                return { ...segment, parameters: updatedDirectParameters, properties: updatedProperties };
            }
        }
        return segment; 
    });
    if (updateOccurred) {
        try {
             const featuresToStore = updatedSegments.map(seg => ({
                type: 'Feature' as const,
                geometry: seg.geometry,
                properties: seg.properties,
             }));

            await indexedDBService.storeShorelineData('current-segments', {
                type: 'FeatureCollection',
                features: featuresToStore
            });
            console.log("Stored updated segments after value application");
        } catch (error) {
            console.error('Failed to store updated segments:', error);
            throw new Error(`Failed to save changes: ${error instanceof Error ? error.message : String(error)}`);
        }
    } else {
        console.log("No actual segment values changed, skipping database update.");
    }
    return updatedSegments;
};