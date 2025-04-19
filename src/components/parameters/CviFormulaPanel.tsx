// src/components/parameters/CviFormulaPanel.tsx
import { useMemo } from 'react';
import type { Formula, ShorelineSegment } from '../../types';
import { availableFormulas } from '../../config/formulas'; // Import from config
import { getCviCategory } from '../../utils/vulnerabilityMapping';

// Define the structure for calculated CVI statistics
interface CviStatistics {
  min: string;
  max: string;
  avg: string;
  count: number;
  categories: {
    veryLow: number;
    low: number;
    moderate: number;
    high: number;
    veryHigh: number;
  };
}

// Define the props accepted by the CviFormulaPanel component
interface CviFormulaPanelProps {
  /** The currently selected CVI formula object, or null if none selected */
  selectedFormula: Formula | null;
  /** Handler function to call when a formula type is selected from dropdown */
  onFormulaSelect: (formulaType: Formula['type'] | null) => void; // Expects type or null
  /** Handler function to trigger the CVI calculation process */
  onCalculateCvi: () => Promise<void>;
  /** Percentage of required parameters that have values (0-100) */
  completionPercentage: number;
  /** Boolean indicating if CVI calculation is currently in progress */
  calculatingCvi: boolean;
  /** Record mapping segment IDs to their calculated CVI scores */
  cviScores: Record<string, number>;
  /** Array of all shoreline segments in the project */
  segments: ShorelineSegment[];
}

/**
 * Component for selecting the CVI calculation formula, triggering the calculation,
 * and displaying CVI statistics. Provides user feedback on prerequisites and progress.
 */
export const CviFormulaPanel: React.FC<CviFormulaPanelProps> = ({
  selectedFormula,
  onFormulaSelect,
  onCalculateCvi,
  completionPercentage,
  calculatingCvi,
  cviScores,
  segments
}) => {

  // Calculate CVI statistics based on the current scores using useMemo for efficiency
  const cviStatistics = useMemo<CviStatistics | null>(() => {
    // Get only the numerical CVI scores from the record
    const scores = Object.values(cviScores);
    // If there are no scores, return null (no stats to display)
    if (scores.length === 0) return null;

    // Calculate basic statistics
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;

    // Count segments in each vulnerability category based on CVI score
    // using the utility function getCviCategory
    let veryLowCount = 0;
    let lowCount = 0;
    let moderateCount = 0;
    let highCount = 0;
    let veryHighCount = 0;
    scores.forEach(score => {
        const category = getCviCategory(score);
        if (category === 'Very Low') veryLowCount++;
        else if (category === 'Low') lowCount++;
        else if (category === 'Moderate') moderateCount++;
        else if (category === 'High') highCount++;
        else if (category === 'Very High') veryHighCount++;
    });

    // Return the formatted statistics object
    return {
      min: min.toFixed(2), // Format to 2 decimal places
      max: max.toFixed(2),
      avg: avg.toFixed(2),
      count: scores.length,
      categories: {
        veryLow: veryLowCount,
        low: lowCount,
        moderate: moderateCount,
        high: highCount,
        veryHigh: veryHighCount
      }
    };
  }, [cviScores]); // Dependency: recalculate only when cviScores changes


  // Determine if the "Calculate CVI" button should be enabled
  const canCalculate = useMemo(() => {
    // Calculation is possible only if:
    // 1. All required parameters are filled (completion >= 100%)
    // 2. A CVI formula has been selected
    // 3. A calculation is not already in progress
    return completionPercentage >= 100 && selectedFormula !== null && !calculatingCvi;
  }, [completionPercentage, selectedFormula, calculatingCvi]); // Dependencies for recalculation

  // Handler for the formula selection dropdown change event
  const handleFormulaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    // If the selected value is empty (placeholder option), pass null to the handler.
    // Otherwise, cast the value to Formula['type'] and pass it.
    onFormulaSelect(value === '' ? null : value as Formula['type']);
  };

  return (
    // Main container div with styling
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">CVI Calculation</h3>

      {/* Formula Selection Section */}
      <div className="mb-4">
        <label htmlFor="formula-select" className="block text-sm font-medium text-gray-700 mb-1">
          Select Formula
        </label>
        <select
          id="formula-select"
          value={selectedFormula?.type || ''} // Controlled component: value reflects selectedFormula prop
          onChange={handleFormulaChange} // Use the dedicated change handler
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          disabled={calculatingCvi} // Disable dropdown while calculating
        >
          {/* Placeholder option */}
          <option value="">-- Select a Formula --</option>
          {/* Populate options from availableFormulas config */}
          {availableFormulas.map(formula => (
            <option key={formula.type} value={formula.type}>
              {formula.name} {/* Display formula name */}
            </option>
          ))}
        </select>
        {/* Display description of the selected formula */}
         {selectedFormula && (
            <p className="mt-1 text-xs text-gray-600">{selectedFormula.description}</p>
         )}
      </div>

      {/* Calculate Button Section */}
       <div className="mb-4">
        <button
            onClick={onCalculateCvi} // Trigger calculation on click
            disabled={!canCalculate} // Enable/disable based on pre-conditions
            // Styling classes for the button, including disabled state and hover/focus effects
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
           {/* Icon: Shows spinner when calculating, calculator otherwise */}
           <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${calculatingCvi ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {calculatingCvi ? (
                    // Spinner path (simplified)
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                ) : (
                     // Calculator icon path
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-6m-6 2h6m-6-4h6M9 3a1 1 0 011-1h4a1 1 0 011 1v1H9V3zM15 21a2 2 0 01-2 2H11a2 2 0 01-2-2m4-18a2 2 0 00-2-2H11a2 2 0 00-2 2m4 18V7m-4 14V7" />
                )}
            </svg>
            {/* Button Text: Dynamic based on calculation state and selected formula */}
            {calculatingCvi ? 'Calculating...' : `Calculate CVI ${selectedFormula ? `(${selectedFormula.name})` : ''}`}
        </button>
        {/* Feedback Messages below button */}
         {!selectedFormula && completionPercentage >= 100 && !calculatingCvi && (
             // Show error if parameters complete but no formula selected
             <p className="mt-1 text-sm text-red-600">Please select a formula before calculating.</p>
         )}
         {completionPercentage < 100 && !calculatingCvi && (
             // Show warning if parameters are not yet complete
             <p className="mt-1 text-sm text-amber-600">
                 Complete all parameter values ({completionPercentage.toFixed(0)}%) before calculating CVI.
             </p>
         )}
      </div>


      {/* CVI Info & Stats Section */}
      <div className="space-y-2">
         <h4 className="text-sm font-medium text-gray-700">Calculation Status</h4>
         {/* Display selected formula name */}
         <div className="flex items-center text-sm">
           <span className="mr-2 text-gray-600 w-28 flex-shrink-0">Selected Formula:</span>
           <span className="font-medium">{selectedFormula?.name || 'None Selected'}</span>
         </div>
         {/* Display number and percentage of segments with calculated CVI */}
         <div className="flex items-center text-sm">
           <span className="mr-2 text-gray-600 w-28 flex-shrink-0">Segments w/ CVI:</span>
           <span className="font-medium">{Object.keys(cviScores).length}</span>
           {segments.length > 0 && ( // Avoid division by zero and display percentage if segments exist
             <span className="ml-2 text-xs text-gray-500">
               ({Math.round((Object.keys(cviScores).length / segments.length) * 100)}% of {segments.length})
             </span>
           )}
         </div>
      </div>


      {/* Display CVI Score Categories Legend and Statistics (only if scores exist) */}
      {Object.keys(cviScores).length > 0 && cviStatistics && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">CVI Score Categories & Stats</h4>
          {/* Legend for vulnerability categories */}
          <div className="flex flex-wrap space-x-4 mb-3"> {/* Added flex-wrap for smaller screens */}
            {/* Very Low Vulnerability */}
            <div className="flex items-center text-xs whitespace-nowrap"> {/* Added whitespace-nowrap */}
              <span className="w-3 h-3 bg-green-600 rounded-full mr-1.5 border border-green-700 flex-shrink-0"></span>
              Very Low {`(1)`} [{cviStatistics.categories.veryLow}]
            </div>
            {/* Low Vulnerability */}
            <div className="flex items-center text-xs whitespace-nowrap"> {/* Added whitespace-nowrap */}
              <span className="w-3 h-3 bg-lime-500 rounded-full mr-1.5 border border-lime-600 flex-shrink-0"></span>
              Low {`(2)`} [{cviStatistics.categories.low}]
            </div>
            {/* Moderate Vulnerability */}
            <div className="flex items-center text-xs whitespace-nowrap"> {/* Added whitespace-nowrap */}
              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-1.5 border border-yellow-500 flex-shrink-0"></span>
              Moderate {`(3)`} [{cviStatistics.categories.moderate}]
            </div>
            {/* High Vulnerability */}
            <div className="flex items-center text-xs whitespace-nowrap"> {/* Added whitespace-nowrap */}
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-1.5 border border-orange-600 flex-shrink-0"></span>
              High {`(4)`} [{cviStatistics.categories.high}]
            </div>
            {/* Very High Vulnerability */}
            <div className="flex items-center text-xs whitespace-nowrap"> {/* Added whitespace-nowrap */}
              <span className="w-3 h-3 bg-red-600 rounded-full mr-1.5 border border-red-700 flex-shrink-0"></span>
              Very High {`(5)`} [{cviStatistics.categories.veryHigh}]
            </div>
          </div>

          {/* Basic Statistics Display */}
          <div className="text-xs text-gray-600 grid grid-cols-3 gap-x-2 gap-y-1">
            <div>Min: <span className="font-medium text-gray-800">{cviStatistics.min}</span></div>
            <div>Max: <span className="font-medium text-gray-800">{cviStatistics.max}</span></div>
            <div>Avg: <span className="font-medium text-gray-800">{cviStatistics.avg}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};