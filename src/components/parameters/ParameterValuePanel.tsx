// src/components/parameters/ParameterValuePanel.tsx
import { useMemo } from 'react';
import type { Parameter } from '../../types';

interface ParameterOption {
  label: string;
  value: string;
  vulnerability: number;
}

interface ParameterValuePanelProps {
  parameters: Parameter[];
  activeParameter: Parameter | null;
  onParameterSelect: (parameterId: string) => void;
  selectedValue: string | null;
  selectedVulnerability: number;
  onValueSelect: (value: string | null, vulnerability?: number) => void;
  onApplyValue: () => Promise<void>;
  selectedSegmentIds: string[];
}

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

  const parameterOptions = useMemo<ParameterOption[]>(() => {
    if (!activeParameter) return [];

    if (activeParameter.type === 'categorical' && activeParameter.options) {
      const options = activeParameter.options.map(option => ({
        label: option.label,
        value: typeof option.value === 'string' ? option.value : String(option.value),
        vulnerability: option.vulnerability
      }));

      const valuesSeen: Record<string, boolean> = {};
      options.forEach(option => {
          if (valuesSeen[option.value]) console.warn(`Duplicate option value detected for ${activeParameter.name}: ${option.value}`);
          valuesSeen[option.value] = true;
      });
      return options;
    }
    else if (activeParameter.type === 'numerical' && activeParameter.vulnerabilityRanges) {
      const optionsFromRanges: ParameterOption[] = [];
      const vulnAdded: Record<number, boolean> = {};

      for (let vulnLevel = 1; vulnLevel <= 5; vulnLevel++) {
        const range = activeParameter.vulnerabilityRanges.find(r => r.value === vulnLevel);
        if (range && !vulnAdded[range.value]) {
           const representativeValue = range.value.toString();

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
             value: representativeValue,
             vulnerability: range.value
           });
           vulnAdded[range.value] = true;
        }
      }

      activeParameter.vulnerabilityRanges.forEach(range => {
        if (!vulnAdded[range.value]) {
          const representativeValue = range.value.toString();
          let rangeLabel = `${range.label}`;
          optionsFromRanges.push({
            label: rangeLabel,
            value: representativeValue,
            vulnerability: range.value
          });
          vulnAdded[range.value] = true;
        }
      });

      optionsFromRanges.sort((a, b) => a.vulnerability - b.vulnerability);

      return optionsFromRanges;
    } else if (activeParameter.type === 'numerical') {
      console.warn(`Numerical parameter "${activeParameter.name}" has no vulnerabilityRanges defined. Using generic 1-5 scale.`);
      const vulnLabels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
      return [1, 2, 3, 4, 5].map(i => ({
        label: `${vulnLabels[i - 1]} (Score: ${i})`,
        value: i.toString(),
        vulnerability: i
      }));
    }

    return [];
  }, [activeParameter]);

  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptionValue = event.target.value;

    const selectedOption = parameterOptions.find(opt => opt.value === selectedOptionValue);

    if (selectedOption) {
      onValueSelect(selectedOption.value, selectedOption.vulnerability);
    } else {
      onValueSelect(null, 1);
    }
  };

  const applyButtonText = useMemo(() => {
    if (!activeParameter) return 'Select a Parameter First';
    if (selectedValue === null) return 'Select a Value First';
    if (selectedSegmentIds.length === 0) return 'Select Segments First';
    return `Apply ${activeParameter.name}: ${selectedValue} to ${selectedSegmentIds.length} Segments`;
  }, [activeParameter, selectedValue, selectedSegmentIds]);

  return (
    <div>
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
          onChange={handleValueChange}
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
        {(!activeParameter || selectedSegmentIds.length === 0) && selectedValue === null && (
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
                const rank = Math.round(selectedVulnerability);
                switch (rank) {
                  case 1: return 'bg-green-600';
                  case 2: return 'bg-lime-500';
                  case 3: return 'bg-yellow-400';
                  case 4: return 'bg-orange-500';
                  case 5: return 'bg-red-600';
                  default: return 'bg-gray-400';
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
