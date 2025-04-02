// src/components/parameters/ParameterValuePanel.tsx
import { useMemo } from 'react';
import type { Parameter } from '../../types';
import { mapValueToVulnerability } from '../../utils/vulnerabilityMapping'; // Assuming this utility exists

interface ParameterOption {
  label: string;
  value: string;
  vulnerability: number;
}

interface ParameterValuePanelProps {
  /** Array of all available parameters */
  parameters: Parameter[];
  /** The currently selected parameter */
  activeParameter: Parameter | null; // Signature matches parent
  /** Handler for selecting a parameter */
  onParameterSelect: (parameterId: string) => void; // Signature matches parent
  /** The currently selected value string from the dropdown */
  selectedValue: string | null; // Signature matches parent
  /** The calculated vulnerability score for the selected value */
  selectedVulnerability: number;
  /** Handler for selecting a value */
  onValueSelect: (value: string | null, vulnerability?: number) => void; // Adjusted to match parent signature
  /** Handler to apply the selected value to the selected segments */
  onApplyValue: () => Promise<void>;
  /** Array of IDs for the currently selected segments */
  selectedSegmentIds: string[];
}

/**
 * Component for selecting a parameter, choosing a value/vulnerability,
 * and applying it to selected segments.
 */
export const ParameterValuePanel: React.FC<ParameterValuePanelProps> = ({
  parameters,
  activeParameter,
  onParameterSelect,
  selectedValue,
  selectedVulnerability,
  onValueSelect,
  onApplyValue,
  selectedSegmentIds,
}) => {

  // Generate options for the value dropdown based on the active parameter
  const parameterOptions = useMemo<ParameterOption[]>(() => {
    if (!activeParameter) return [];

    // Helper function to ensure only one option per vulnerability level
    const consolidateByVulnerability = (options: ParameterOption[]): ParameterOption[] => {
        const result: ParameterOption[] = [];
        const vulnerabilityAdded: Record<number, boolean> = {};

        // Add options in vulnerability order (1-5)
        for (let vulnLevel = 1; vulnLevel <= 5; vulnLevel++) {
          const matchingOption = options.find(opt => opt.vulnerability === vulnLevel);
          if (matchingOption) {
            result.push(matchingOption);
            vulnerabilityAdded[vulnLevel] = true;
          }
        }
        // Add any remaining options
        options.forEach(option => {
          if (!vulnerabilityAdded[option.vulnerability]) {
            result.push(option);
          }
        });
        return result;
    };

    // Handle categorical parameters
    if (activeParameter.type === 'categorical' && activeParameter.options) {
      const options = activeParameter.options.map(option => ({
        label: option.label,
        value: typeof option.value === 'string' ? option.value : String(option.value),
        vulnerability: option.vulnerability
      }));
      // Check for duplicates (optional, for debugging)
      const valuesSeen: Record<string, boolean> = {};
      options.forEach(option => {
          if (valuesSeen[option.value]) console.warn(`Duplicate option value detected for ${activeParameter.name}: ${option.value}`);
          valuesSeen[option.value] = true;
      });
      return options;
    }
    // Handle numerical parameters
    else if (activeParameter.type === 'numerical') {
      const vulnLabels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
      let standardizedOptions: ParameterOption[] = [];

       // Specific handling for known parameters based on reference tables
      if (activeParameter.name.toLowerCase().includes('slope')) {
          standardizedOptions = [
              { value: '0.21', label: 'Very Low (>0.2%)', vulnerability: 1 },
              { value: '0.10', label: 'Low (0.2-0.07%)', vulnerability: 2 },
              { value: '0.05', label: 'Moderate (0.07-0.04%)', vulnerability: 3 },
              { value: '0.03', label: 'High (0.04-0.025%)', vulnerability: 4 },
              { value: '0.02', label: 'Very High (<0.025%)', vulnerability: 5 }
          ];
      } else if (activeParameter.name.toLowerCase().includes('sea') && activeParameter.name.toLowerCase().includes('level')) {
          standardizedOptions = [
              { value: '1.5', label: 'Very Low (<1.8 mm/yr)', vulnerability: 1 },
              { value: '2.2', label: 'Low (1.8-2.5 mm/yr)', vulnerability: 2 },
              { value: '2.7', label: 'Moderate (2.5-2.95 mm/yr)', vulnerability: 3 },
              { value: '3.0', label: 'High (2.95-3.16 mm/yr)', vulnerability: 4 },
              { value: '3.3', label: 'Very High (>3.16 mm/yr)', vulnerability: 5 }
          ];
      } else if (activeParameter.name.toLowerCase().includes('erosion') || activeParameter.name.toLowerCase().includes('shoreline')) {
           standardizedOptions = [
              { value: '2.5', label: 'Very Low (>2.0, Accretion)', vulnerability: 1 },
              { value: '1.5', label: 'Low (1.0-2.0)', vulnerability: 2 },
              { value: '0.0', label: 'Moderate (-1.0-+1.0, Stable)', vulnerability: 3 },
              { value: '-1.5', label: 'High (-1.1--2.0)', vulnerability: 4 },
              { value: '-2.5', label: 'Very High (<-2.0, Erosion)', vulnerability: 5 }
          ];
      } else if (activeParameter.name.toLowerCase().includes('tide')) {
           standardizedOptions = [
              { value: '6.5', label: 'Very Low (>6.0m)', vulnerability: 1 },
              { value: '5.0', label: 'Low (4.1-6.0m)', vulnerability: 2 },
              { value: '3.0', label: 'Moderate (2.0-4.0m)', vulnerability: 3 },
              { value: '1.5', label: 'High (1.0-1.9m)', vulnerability: 4 },
              { value: '0.5', label: 'Very High (<1.0m)', vulnerability: 5 }
          ];
      } else if (activeParameter.name.toLowerCase().includes('wave')) {
           standardizedOptions = [
              { value: '0.5', label: 'Very Low (<0.55m)', vulnerability: 1 },
              { value: '0.7', label: 'Low (0.55-0.85m)', vulnerability: 2 },
              { value: '0.95', label: 'Moderate (0.85-1.05m)', vulnerability: 3 },
              { value: '1.15', label: 'High (1.05-1.25m)', vulnerability: 4 },
              { value: '1.3', label: 'Very High (>1.25m)', vulnerability: 5 }
          ];
      }
      // Generic numerical handling if not a specific known type or if ranges are missing/incomplete
      else if (!activeParameter.vulnerabilityRanges || activeParameter.vulnerabilityRanges.length < 5) {
          console.log(`Using generic 1-5 scale for ${activeParameter.name}`);
          standardizedOptions = [1, 2, 3, 4, 5].map(i => ({
            label: `${vulnLabels[i - 1]} (${i})`,
            value: i.toString(),
            vulnerability: i
          }));
      }
      // Use defined vulnerability ranges if they exist and seem complete
      else {
         const optionsFromRanges: ParameterOption[] = [];
         const vulnAdded: Record<number, boolean> = {};
         activeParameter.vulnerabilityRanges.forEach(range => {
            if (vulnAdded[range.value]) return; // Skip duplicate vulnerability levels

            let valueToShow;
            if (range.min !== null && range.max !== null) valueToShow = ((range.min + range.max) / 2).toFixed(2);
            else if (range.min !== null) valueToShow = range.min.toFixed(2);
            else if (range.max !== null) valueToShow = range.max.toFixed(2);
            else valueToShow = range.value.toString(); // Fallback

            optionsFromRanges.push({
              label: `${range.label} (${valueToShow})`,
              value: valueToShow,
              vulnerability: range.value
            });
            vulnAdded[range.value] = true;
         });
          // Consolidate ensures proper ordering and uniqueness by vulnerability
         return consolidateByVulnerability(optionsFromRanges);
      }

      return standardizedOptions; // Return the specific or generic standardized options
    }

    return []; // Fallback for unknown types
  }, [activeParameter]);

  // Handler for the value dropdown change
  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVal = event.target.value;
    const selectedOption = parameterOptions.find(opt => opt.value === selectedVal);
    onValueSelect(selectedVal || null, selectedOption?.vulnerability);
  };

  const applyButtonText = useMemo(() => {
    if (!activeParameter) return 'Select a Parameter First';
    if (selectedValue === null) return 'Select a Value First';
    if (selectedSegmentIds.length === 0) return 'Select Segments First';
    return `Apply ${activeParameter.name}: ${selectedValue} to ${selectedSegmentIds.length} Segments`;
  }, [activeParameter, selectedValue, selectedSegmentIds]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Parameter Values</h3>
      <p className="mb-4 text-sm text-gray-600">{selectedSegmentIds.length} selected</p>

      {/* Parameter Selection Dropdown */}
      <div className="mb-4">
        <label htmlFor="parameter-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Parameter
        </label>
        <select
          id="parameter-select"
          value={activeParameter?.id || ''}
          onChange={(e) => onParameterSelect(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          {parameters.length > 0 ? (
            parameters.map(param => (
              <option key={param.id} value={param.id}>{param.name}</option>
            ))
          ) : (
            <option value="">No parameters available</option>
          )}
        </select>
      </div>

      {/* Value Selection Dropdown */}
      <div className="mb-4">
        <label htmlFor="value-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Value {activeParameter && `for ${activeParameter.name}`}
        </label>
        <select
          id="value-select"
          value={selectedValue || ''}
          onChange={handleValueChange} // Use updated handler
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          disabled={!activeParameter || selectedSegmentIds.length === 0}
        >
          <option value="">Select a value...</option>
          {parameterOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label} (Vulnerability: {option.vulnerability})
            </option>
          ))}
           {parameterOptions.length === 0 && activeParameter && (
             <option value="" disabled>No values available</option>
           )}
        </select>
        {(!activeParameter || selectedSegmentIds.length === 0) && selectedValue === null && ( // Only show hint if no value is selected yet
          <p className="mt-1 text-sm text-red-500">
            {!activeParameter ? 'Select a parameter first' : 'Select segments on the map first'}
          </p>
        )}
      </div>

      {/* Vulnerability Preview */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vulnerability Preview
        </label>
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Value:</span>
          <span className="font-medium">{selectedValue || '-'}</span>
          <span className="mx-4 text-gray-600">Vulnerability:</span>
          <span className={`inline-block w-6 h-6 rounded-full text-white text-center flex items-center justify-center text-xs font-medium ${
            selectedVulnerability === 1 ? 'bg-green-500' :
            selectedVulnerability === 2 ? 'bg-lime-500' :
            selectedVulnerability === 3 ? 'bg-yellow-500' :
            selectedVulnerability === 4 ? 'bg-orange-500' :
            selectedVulnerability === 5 ? 'bg-red-500' : 'bg-gray-300' // Fallback color
          }`}>
            {selectedVulnerability || '?'}
          </span>
        </div>
      </div>

      {/* Apply Value Button */}
      <button
        onClick={onApplyValue}
        disabled={!activeParameter || selectedValue === null || selectedSegmentIds.length === 0}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {applyButtonText}
      </button>

      {/* Selected Segments Info */}
      <div className="mt-4 text-center">
        <p className="text-sm font-medium text-gray-600">
          {selectedSegmentIds.length > 0
            ? `${selectedSegmentIds.length} segments selected`
            : 'No segments selected. Click on the map or use Select All'}
        </p>
      </div>
    </div>
  );
};