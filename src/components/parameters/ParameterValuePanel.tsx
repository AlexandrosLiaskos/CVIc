// src/components/parameters/ParameterValuePanel.tsx
import { useMemo } from 'react';
import type { Parameter } from '../../types';

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
    // Handle numerical parameters based on defined vulnerability ranges
    else if (activeParameter.type === 'numerical' && activeParameter.vulnerabilityRanges) {
      // Reason: Iterate through the defined ranges in the Parameter object.
      // This makes the panel data-driven and removes brittle hardcoded logic.
      const optionsFromRanges: ParameterOption[] = [];
      const vulnAdded: Record<number, boolean> = {}; // Track added vulnerability levels

      // Add ranges ordered by vulnerability 1-5 first
      for (let vulnLevel = 1; vulnLevel <= 5; vulnLevel++) {
        const range = activeParameter.vulnerabilityRanges.find(r => r.value === vulnLevel);
        if (range && !vulnAdded[range.value]) {
           // Determine a representative value string (e.g., midpoint or range boundary) for the dropdown's internal value.
           // Here, we use the vulnerability score as the value for simplicity,
           // but store the label for display and the true vulnerability score.
           const representativeValue = range.value.toString(); // Using vuln score as the key/value

           // Create a descriptive label showing the range
           let rangeLabel = `${range.label}`;
           if (range.min !== null && range.max !== null) {
             rangeLabel += ` (${range.min} - ${range.max}${activeParameter.unit || ''})`;
           } else if (range.min !== null) {
             rangeLabel += ` (>= ${range.min}${activeParameter.unit || ''})`;
           } else if (range.max !== null) {
             rangeLabel += ` (< ${range.max}${activeParameter.unit || ''})`;
           }

           optionsFromRanges.push({
             label: rangeLabel,
             value: representativeValue, // Use vuln score as internal value
             vulnerability: range.value
           });
           vulnAdded[range.value] = true;
        }
      }

      // Add any remaining ranges that might not be 1-5 (though unlikely for vulnerability)
      activeParameter.vulnerabilityRanges.forEach(range => {
        if (!vulnAdded[range.value]) {
          const representativeValue = range.value.toString();
          let rangeLabel = `${range.label}`;
          // Add range boundaries to label as before... (omitted for brevity, similar logic)
          optionsFromRanges.push({
            label: rangeLabel,
            value: representativeValue,
            vulnerability: range.value
          });
          vulnAdded[range.value] = true;
        }
      });

      // Ensure options are sorted by vulnerability score (1 to 5)
      optionsFromRanges.sort((a, b) => a.vulnerability - b.vulnerability);

      return optionsFromRanges;
    } else if (activeParameter.type === 'numerical') {
      // Fallback if numerical but no ranges defined (should ideally not happen)
      console.warn(`Numerical parameter "${activeParameter.name}" has no vulnerabilityRanges defined. Using generic 1-5 scale.`);
      const vulnLabels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
      return [1, 2, 3, 4, 5].map(i => ({
        label: `${vulnLabels[i - 1]} (Score: ${i})`,
        value: i.toString(), // Use score as value
        vulnerability: i
      }));
    }

    return []; // Fallback for unknown types
  }, [activeParameter]);

  // Handler for the value dropdown change
  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptionValue = event.target.value; // This is the 'value' from ParameterOption (e.g., category string or vuln score string)
    // Reason: Find the full option object based on its 'value' property.
    const selectedOption = parameterOptions.find(opt => opt.value === selectedOptionValue);

    if (selectedOption) {
      // Reason: Pass the selected 'value' (string) and the 'vulnerability' (number) from the option.
      onValueSelect(selectedOption.value, selectedOption.vulnerability);
    } else {
      // Reason: Handle the case where the selection is cleared (e.g., selecting the placeholder).
      onValueSelect(null, 1); // Reset vulnerability to default (e.g., 1) or another appropriate value
    }
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
              (() => {
                const rank = Math.round(selectedVulnerability); // Round vulnerability
                switch (rank) {
                  case 1: return 'bg-green-600';
                  case 2: return 'bg-lime-500';
                  case 3: return 'bg-yellow-400';
                  case 4: return 'bg-orange-500';
                  case 5: return 'bg-red-600';
                  default: return 'bg-gray-400'; // Default/Fallback color
                }
              })()
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