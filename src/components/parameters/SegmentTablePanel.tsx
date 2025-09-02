// src/components/parameters/SegmentTablePanel.tsx
import React, { useState, useMemo } from 'react';
import type { ShorelineSegment, Parameter, Formula } from '../../types';
import { getCviCategory, getCviRank } from '../../utils/vulnerabilityMapping'; // Assuming this utility exists

interface SegmentTablePanelProps {
  segments: ShorelineSegment[];
  parameters: Parameter[];
  selectedSegmentIds: string[];
  onSegmentSelect: (segmentId: string) => void;
  cviScores: Record<string, number>;
  selectedFormula: Formula | null;
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

export const SegmentTablePanel: React.FC<SegmentTablePanelProps> = ({
  segments,
  parameters: enabledParameters,
  selectedSegmentIds,
  onSegmentSelect,
  cviScores,
  selectedFormula,
  cviStatistics
}) => {
  const [currentPage, setCurrentPage] = useState(1);

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
        return isSelectedA ? -1 : 1;
      }
      return compareSegmentIds(a.id, b.id);
    });
    return segmentsCopy;
  }, [segments, selectedSegmentIds]);

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

  const getDisplayId = (segmentId: string): string => {
    return segmentId.includes('segment-') ? segmentId.split('-')[1] : segmentId;
  }

  const getVulnerabilityColor = (vulnerability: number | null | undefined): string => {
    if (vulnerability === null || vulnerability === undefined) return '#808080';

    // For ICVI parameters (0-1 scale), use result classification colors
    if (vulnerability >= 0 && vulnerability < 1) {
      if (vulnerability < 0.2) return '#1a9850'; // Very Low
      if (vulnerability < 0.4) return '#91cf60'; // Low
      if (vulnerability < 0.6) return '#fee08b'; // Moderate
      if (vulnerability < 0.8) return '#fc8d59'; // High
      return '#d73027'; // Very High
    }

    // For traditional 1-5 scale parameters
    const rank = Math.round(vulnerability);
    switch (rank) {
      case 1: return '#1a9850';
      case 2: return '#91cf60';
      case 3: return '#fee08b';
      case 4: return '#fc8d59';
      case 5: return '#d73027';
      default: return '#808080';
    }
  };

   const getCviColor = (score: number | null | undefined, formula?: string): string => {
     if (score === null || score === undefined || isNaN(score)) return '#808080';
     const rank = getCviRank(score, formula);
     if (rank <= 1) return '#1a9850';
     if (rank === 2) return '#91cf60';
     if (rank === 3) return '#fee08b';
     if (rank === 4) return '#fc8d59';
     if (rank >= 5) return '#d73027';
     return '#808080';
   };


  return (
    <div className="flex flex-col"> {/* Natural flow, no height constraints */}
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
      <div className="overflow-x-auto"> {/* Allow horizontal scroll for better column visibility */}
        <table className="w-full table-auto divide-y divide-gray-200 min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[60px]">
                ID
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                Length (m)
              </th>
              {/* Parameter Columns */}
              {enabledParameters.map(param => (
                <th key={param.id} scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]" title={param.name}>
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-center leading-tight break-words max-w-[90px]">
                      {param.name}
                    </span>
                  </div>
                </th>
              ))}
              {/* CVI Column */}
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                <div className="flex flex-col items-center space-y-1">
                  <span>CVI</span>
                  {selectedFormula && (
                    <span className="text-blue-500 text-xs normal-case" title={selectedFormula.name}>
                      ({selectedFormula.name.length > 15 ? selectedFormula.name.substring(0, 12) + '...' : selectedFormula.name})
                    </span>
                  )}
                </div>
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
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation(); // Prevent row click handler
                          onSegmentSelect(segment.id);
                        }}
                        className="mr-2 h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        aria-label={`Select segment ${displayId}`}
                      />
                      <span className="text-xs">{displayId}</span>
                    </div>
                  </td>
                  {/* Length Cell */}
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                    {typeof segment.properties?.length === 'number' ? segment.properties.length.toFixed(0) : 'N/A'}
                  </td>
                  {/* Parameter Vulnerability Cells */}
                  {enabledParameters.map(param => {
                    const paramValue = segment.parameters?.[param.id];
                    const vulnerability = paramValue?.vulnerability ?? null;
                    return (
                      <td key={param.id} className="px-2 py-2 whitespace-nowrap text-xs text-center">
                        {vulnerability !== null ? (
                          <div className="flex justify-center" title={`Value: ${paramValue?.value ?? 'N/A'}, Vulnerability: ${vulnerability}`}>
                             <span
                               title={`Vulnerability: ${vulnerability}`}
                               className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium"
                               style={{ backgroundColor: getVulnerabilityColor(vulnerability) }}
                             >
                              {vulnerability}
                            </span>
                          </div>
                        ) : '-'}
                      </td>
                    );
                  })}
                  {/* CVI Score Cell */}
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900 text-center">
                    {cviScores[segment.id] !== undefined ? (
                       <span
                         title={`CVI Score: ${cviScores[segment.id].toFixed(2)} (${getCviCategory(cviScores[segment.id], segment.properties.vulnerabilityFormula)})`}
                         className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-medium"
                         style={{ backgroundColor: getCviColor(cviScores[segment.id], segment.properties.vulnerabilityFormula) }}
                       >
                         {segment.properties.vulnerabilityFormula?.includes('icvi')
                           ? cviScores[segment.id].toFixed(2)
                           : getCviRank(cviScores[segment.id], segment.properties.vulnerabilityFormula)
                         }
                       </span>
                    ) : '-'}
                  </td>
                </tr>
              );
            })}
             {paginatedSegments.length === 0 && (
                 <tr>
                    <td colSpan={enabledParameters.length + 3} className="px-2 py-4 text-center text-xs text-gray-500">
                        No segments to display for the current page.
                    </td>
                 </tr>
             )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between border-t pt-3"> {/* Natural flow pagination */}
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
