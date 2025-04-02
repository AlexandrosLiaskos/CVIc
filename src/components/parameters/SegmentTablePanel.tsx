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
      low: number;
      medium: number;
      high: number;
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
  parameters,
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
  const getVulnerabilityColor = (vulnerability: number | null | undefined): string => {
    if (vulnerability === null || vulnerability === undefined) return 'bg-gray-300';
    switch (Math.round(vulnerability)) { // Round to nearest integer for color mapping
      case 1: return 'bg-green-500';
      case 2: return 'bg-lime-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-orange-500';
      case 5: return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  // Function to get CVI color class based on score ranges
   const getCviColor = (score: number): string => {
    if (score < 2.5) return 'bg-green-500';
    if (score < 3.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };


  return (
    <div className="flex flex-col flex-grow h-full overflow-hidden"> {/* Added flex structure to allow internal scrolling */}
      <h3 className="text-lg font-medium mb-4">Segment Values</h3>

      {/* CVI Statistics Display */}
      {selectedFormula && cviStatistics && Object.keys(cviScores).length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center mb-2">
            <span className="font-medium text-blue-800 mr-2">CVI Calculation:</span>
            <span className="text-blue-700">{selectedFormula.name}</span>
          </div>
          <p className="text-sm text-blue-600">{selectedFormula.description}</p>
          <div className="mt-2 grid grid-cols-3 gap-4">
            <div>
              <span className="text-xs text-blue-500">Segments w/ CVI</span>
              <p className="font-medium text-blue-800">{cviStatistics.count} of {segments.length}</p>
            </div>
            <div>
              <span className="text-xs text-blue-500">CVI Range</span>
              <p className="font-medium text-blue-800">{cviStatistics.min} - {cviStatistics.max}</p>
            </div>
            <div>
              <span className="text-xs text-blue-500">Average CVI</span>
              <p className="font-medium text-blue-800">{cviStatistics.avg}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-4 pt-2 border-t border-blue-200">
            <div>
              <span className="text-xs text-blue-500">Low Vuln.</span>
              <p className="font-medium text-blue-800">{cviStatistics.categories.low} seg.</p>
            </div>
            <div>
              <span className="text-xs text-blue-500">Medium Vuln.</span>
              <p className="font-medium text-blue-800">{cviStatistics.categories.medium} seg.</p>
            </div>
            <div>
              <span className="text-xs text-blue-500">High Vuln.</span>
              <p className="font-medium text-blue-800">{cviStatistics.categories.high} seg.</p>
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
              {parameters.map(param => (
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
                  {parameters.map(param => {
                    const paramValue = segment.parameters?.[param.id];
                    const vulnerability = paramValue?.vulnerability ?? null;
                    return (
                      <td key={param.id} className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {vulnerability !== null ? (
                          <div className="flex justify-center">
                             <span title={`Vulnerability: ${vulnerability}`} className={`inline-block w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${getVulnerabilityColor(vulnerability)}`}>
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
                               className={`inline-block w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-medium ${getCviColor(cviScores[segment.id])}`}>
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
                    <td colSpan={parameters.length + 3} className="px-6 py-4 text-center text-sm text-gray-500">
                        No segments to display for the current page.
                    </td>
                 </tr>
             )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between flex-shrink-0"> {/* Added flex-shrink-0 */}
          <div className="text-gray-500 text-sm">
            Showing {((currentPage - 1) * SEGMENTS_PER_PAGE) + 1} to {Math.min(currentPage * SEGMENTS_PER_PAGE, sortedSegments.length)} of {sortedSegments.length} segments
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              aria-label="Previous page"
            >
              Previous
            </button>
            {/* Simplified Pagination Numbers */}
            <span className="text-sm p-1 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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