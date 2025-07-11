// src/components/parameters/CviFormulaPanel.tsx
import { useMemo } from 'react';
import type { Formula, ShorelineSegment } from '../../types';
import { getCviCategory } from '../../utils/vulnerabilityMapping';

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

interface CviFormulaPanelProps {
  selectedFormula: Formula | null;
  onCalculateCvi: () => Promise<void>;
  completionPercentage: number;
  calculatingCvi: boolean;
  cviScores: Record<string, number>;
  segments: ShorelineSegment[];
}

export const CviFormulaPanel: React.FC<CviFormulaPanelProps> = ({
  selectedFormula,
  onCalculateCvi,
  completionPercentage,
  calculatingCvi,
  cviScores,
  segments
}) => {

  const cviStatistics = useMemo<CviStatistics | null>(() => {
    const scores = Object.values(cviScores);
    if (scores.length === 0) return null;

    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;

    let veryLowCount = 0;
    let lowCount = 0;
    let moderateCount = 0;
    let highCount = 0;
    let veryHighCount = 0;
    scores.forEach(score => {
        const category = getCviCategory(score, selectedFormula?.type);
        if (category === 'Very Low') veryLowCount++;
        else if (category === 'Low') lowCount++;
        else if (category === 'Moderate') moderateCount++;
        else if (category === 'High') highCount++;
        else if (category === 'Very High') veryHighCount++;
    });

    return {
      min: min.toFixed(2),
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
  }, [cviScores, selectedFormula]);

  const canCalculate = useMemo(() => {
    return completionPercentage >= 100 && selectedFormula !== null && !calculatingCvi;
  }, [completionPercentage, selectedFormula, calculatingCvi]);



  return (
    <div>
      <h3 className="text-lg font-medium mb-4">CVI Calculation</h3>

      {/* Formula Information Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Index Formula
        </label>

        {selectedFormula ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-blue-900">{selectedFormula.name}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Auto-selected</span>
            </div>
            <p className="text-xs text-blue-700 mb-2">{selectedFormula.description}</p>
            <p className="text-xs text-blue-600">
              ✓ Formula automatically determined by your selected coastal vulnerability index
            </p>
            {selectedFormula.name === 'CVI' && selectedFormula.type === 'geometric-mean' && (
              <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded">
                <p className="text-xs text-amber-800">
                  <strong>Note:</strong> Geometric mean formula preferred over traditional CVI formula to avoid distribution distortions and enable proper ranking of results.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-700">No Formula Selected</span>
            </div>
            <p className="text-xs text-gray-600">
              Please select a coastal vulnerability index in the parameter selection step to automatically set the appropriate formula.
            </p>
          </div>
        )}
      </div>

      {/* Calculate Button Section */}
       <div className="mb-4">
        <button
            onClick={onCalculateCvi}
            disabled={!canCalculate}
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
             <p className="mt-1 text-sm text-red-600">Please select a formula before calculating.</p>
         )}
         {completionPercentage < 100 && !calculatingCvi && (
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
           {segments.length > 0 && (
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
