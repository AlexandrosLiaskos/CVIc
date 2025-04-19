// src/components/parameters/SegmentTablePanel.tsx
import React, { useState, useMemo } from 'react';
import type { ShorelineSegment, Parameter, Formula } from '../../types';
import { getCviCategory } from '../../utils/vulnerabilityMapping'; // Assuming this utility exists

interface SegmentTablePanelProps {
  /** Array of all shoreline segments */
  segments: ShorelineSegment[];
  /** Array of enabled parameters to display as columns */
  parameters: Parameter[];
  /** Array of IDs for the currently selected segments */
  selectedSegmentIds: string[];
  /** Handler for selecting/deselecting a segment via the table row */
  onSegmentSelect: (segmentId: string) => void;
  /** Record of calculated CVI scores per segment ID */
  cviScores: Record<string, number>;
  /** The currently selected CVI formula (for display purposes) */
  selectedFormula: Formula | null;
  /** Calculated CVI statistics (for display purposes) */
  cviStatistics: {
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
  } | null;
}

const SEGMENTS_PER_PAGE = 10;

/**
 * Component displaying shoreline segments in a paginated table,
 * showing assigned parameter vulnerabilities and calculated CVI scores.
 */
export const SegmentTablePanel: React.FC<SegmentTablePanelProps> = ({
  segments,
  parameters: enabledParameters, // Rename prop for clarity
  selectedSegmentIds,
  onSegmentSelect,
  cviScores,
  selectedFormula,
  cviStatistics
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sort segments: selected first, then by ID (numerical part)
  const sortedSegments = useMemo(() => {
    const segmentsCopy = [...segments];
    const compareSegmentIds = (idA: string, idB: string) => {
      const numA = parseInt(idA.split('-')[1] || '0', 10);
      const numB = parseInt(idB.split('-')[1] || '0', 10);
      return numA - numB;
    };

    segmentsCopy.sort((a, b) => {
      const isSelectedA = selectedSegmentIds.includes(a.id);
      const isSelectedB = selectedSegmentIds.includes(b.id);
      if (isSelectedA !== isSelectedB) {
        return isSelectedA ? -1 : 1; // Selected first
      }
      return compareSegmentIds(a.id, b.id); // Then sort by ID
    });
    return segmentsCopy;
  }, [segments, selectedSegmentIds]);

  // Paginate the sorted segments
  const paginatedSegments = useMemo(() => {
    const startIndex = (currentPage - 1) * SEGMENTS_PER_PAGE;
    return sortedSegments.slice(startIndex, startIndex + SEGMENTS_PER_PAGE);
  }, [sortedSegments, currentPage]);

  const totalPages = Math.ceil(sortedSegments.length / SEGMENTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to get the display ID (numerical part)
  const getDisplayId = (segmentId: string): string => {
    return segmentId.includes('segment-') ? segmentId.split('-')[1] : segmentId;
  }

  // Function to get vulnerability color class
  const getVulnerabilityClass = (vulnerability: number | null | undefined): string => {
    if (vulnerability === null || vulnerability === undefined) return 'bg-gray-300';
    switch (Math.round(vulnerability)) { // Round to nearest integer for color mapping
      case 1: return 'bg-green-600'; // Darker Green
      case 2: return 'bg-lime-500';  // Lime
      case 3: return 'bg-yellow-400';// Yellow
      case 4: return 'bg-orange-500';
      case 5: return 'bg-red-600';   // Darker Red
      default: return 'bg-gray-400';
    }
  };

  // Function to get CVI color class based on 5 ranks (using rounded score)
   const getCviClass = (score: number | null | undefined): string => {
     if (score === null || score === undefined || isNaN(score)) return 'bg-gray-400';
     const rank = Math.round(score);
     if (rank <= 1) return 'bg-green-600'; // Rank 1
     if (rank === 2) return 'bg-lime-500';  // Rank 2
     if (rank === 3) return 'bg-yellow-400';// Rank 3
     if (rank === 4) return 'bg-orange-500';// Rank 4
     if (rank >= 5) return 'bg-red-600';   // Rank 5
     return 'bg-gray-400'; // Fallback
   };


  return (
    <div className="flex flex-col flex-grow h-full overflow-hidden"> {/* Added flex structure to allow internal scrolling */}
      <h3 className="text-lg font-medium mb-4">Segment Values</h3>

      {/* CVI Statistics Display - Make it less tall */}
      {selectedFormula && cviStatistics && Object.keys(cviScores).length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center mb-2">
            <span className="font-medium text-blue-800 mr-2">CVI Calculation:</span>
            <span className="text-blue-700">{selectedFormula.name}</span>
          </div>
          <p className="text-sm text-blue-600">{selectedFormula.description}</p>
          <div className="mt-2 grid grid-cols-3 gap-x-4 gap-y-1 text-sm"> {/* Reduced gap and text size */}
            <div>
              <span className="text-blue-500">Segments:</span> <span className="font-medium text-blue-800">{cviStatistics.count} of {segments.length}</span>
            </div>
            <div>
              <span className="text-blue-500">Range:</span> <span className="font-medium text-blue-800">{cviStatistics.min} - {cviStatistics.max}</span>
            </div>
            <div>
              <span className="text-blue-500">Average:</span> <span className="font-medium text-blue-800">{cviStatistics.avg}</span>
            </div>
             <div className="col-span-3 pt-1 border-t border-blue-100 mt-1 text-xs"> {/* Consolidated category counts */}
              <span className="text-blue-500">Counts:</span> Very Low: <span className="font-medium text-blue-800">{cviStatistics.categories.veryLow}</span>, Low: <span className="font-medium text-blue-800">{cviStatistics.categories.low}</span>, Moderate: <span className="font-medium text-blue-800">{cviStatistics.categories.moderate}</span>, High: <span className="font-medium text-blue-800">{cviStatistics.categories.high}</span>, Very High: <span className="font-medium text-blue-800">{cviStatistics.categories.veryHigh}</span>
            </div>
          </div>
        </div>
      )}

      {/* Segment Table */}
      <div className="flex-grow overflow-auto"> {/* Changed to overflow-auto for both axes scrolling within this div */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Length (m)
              </th>
              {/* Parameter Columns */}
              {enabledParameters.map(param => (
                <th key={param.id} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" title={param.name}>
                   {/* Truncate long names */}
                  {param.name.length > 15 ? param.name.substring(0, 12) + '...' : param.name} (Vuln)
                </th>
              ))}
              {/* CVI Column */}
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                CVI {selectedFormula && <span className="text-blue-500">({selectedFormula.name.substring(0, 10)}{selectedFormula.name.length > 10 ? '...' : ''})</span>}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedSegments.map((segment, index) => {
              const displayId = getDisplayId(segment.id);
              const isSelected = selectedSegmentIds.includes(segment.id);
              return (
                <tr
                  key={segment.id}
                  className={`${isSelected ? 'bg-blue-50 font-medium' : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50')} hover:bg-blue-100 transition-colors duration-150`}
                  onClick={() => onSegmentSelect(segment.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* ID and Checkbox Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation(); // Prevent row click handler
                          onSegmentSelect(segment.id);
                        }}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        aria-label={`Select segment ${displayId}`}
                      />
                      <span>{displayId}</span>
                    </div>
                  </td>
                  {/* Length Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {typeof segment.properties?.length === 'number' ? segment.properties.length.toFixed(2) : 'N/A'}
                  </td>
                  {/* Parameter Vulnerability Cells */}
                  {enabledParameters.map(param => {
                    const paramValue = segment.parameters?.[param.id];
                    const vulnerability = paramValue?.vulnerability ?? null;
                    return (
                      <td key={param.id} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {vulnerability !== null ? (
                          <div className="flex justify-center" title={`Value: ${paramValue?.value ?? 'N/A'}, Vulnerability: ${vulnerability}`}>
                             <span title={`Vulnerability: ${vulnerability}`} className={`inline-block w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${getVulnerabilityClass(vulnerability)}`}>
                              {vulnerability}
                            </span>
                          </div>
                        ) : '-'}
                      </td>
                    );
                  })}
                  {/* CVI Score Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {cviScores[segment.id] !== undefined ? (
                       <div className="flex flex-col items-center">
                         <span title={`CVI Score: ${cviScores[segment.id].toFixed(2)} (${getCviCategory(cviScores[segment.id])})`}
                               className={`inline-block w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-medium ${getCviClass(cviScores[segment.id])}`}>
                           {Math.round(cviScores[segment.id])} {/* Show rounded value */}
                         </span>
                         <span className="text-xs mt-1">{cviScores[segment.id].toFixed(2)}</span>
                       </div>
                    ) : '-'}
                  </td>
                </tr>
              );
            })}
             {paginatedSegments.length === 0 && (
                 <tr>
                    <td colSpan={enabledParameters.length + 3} className="px-6 py-4 text-center text-sm text-gray-500">
                        No segments to display for the current page.
                    </td>
                 </tr>
             )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between flex-shrink-0 border-t pt-3"> {/* Added flex-shrink-0 and border */}
          <div className="text-gray-500 text-sm">
            Showing {((currentPage - 1) * SEGMENTS_PER_PAGE) + 1} to {Math.min(currentPage * SEGMENTS_PER_PAGE, sortedSegments.length)} of {sortedSegments.length} segments
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50" // Smaller text/padding
              aria-label="Previous page"
            >
              Previous
            </button>
            {/* Simplified Pagination Numbers */}
            <span className="text-xs p-1 text-gray-700"> {/* Smaller text */}
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50" // Smaller text/padding
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};