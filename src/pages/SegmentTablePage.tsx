// ---- File: src/pages/SegmentTablePage.tsx ----
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Map from '../components/maps/Map'
import { indexedDBService } from '../services/indexedDBService'
import type { ShorelineSegment } from '../types'
// Removed unused Feature, FeatureCollection imports
import type { LineString, MultiLineString } from 'geojson'
// @ts-ignore - Suppress TS error for Turf module resolution issues
import * as turf from '@turf/turf'
import L from 'leaflet'
import { ErrorAlert } from '../components/common/ErrorAlert'
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    MagnifyingGlassIcon,
    TableCellsIcon,
    MapIcon as MapOutlineIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

const ITEMS_PER_PAGE = 10;

export default function SegmentTablePage() {
  const navigate = useNavigate();
  const [segments, setSegments] = useState<ShorelineSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('properties.index');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [mapInitialBounds, setMapInitialBounds] = useState<L.LatLngBoundsExpression | null>(null);

  // Effect to load segments and calculate initial bounds
  useEffect(() => {
    const loadSegments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await indexedDBService.getShorelineData('current-segments');
        if (!data) {
          setError('No segment data found. Please complete the segmentation step first.');
          navigate('/segmentation');
          return;
        }

        const loadedSegments = data.features
          .filter(feature =>
            feature && feature.geometry && (
              feature.geometry.type === 'LineString' ||
              feature.geometry.type === 'MultiLineString'
            )
          )
          .map((feature, index) => {
            const segmentId = feature.properties?.id || `segment-${index + 1}`;
             let length = feature.properties?.length;
             if (length === undefined || length === null) {
               try {
                 length = turf.length(turf.feature(feature.geometry), { units: 'meters' });
               } catch (e) {
                 console.warn(`Could not calculate length for segment ${segmentId}:`, e);
                 length = 0;
               }
             }
            return {
              id: segmentId,
              type: 'Feature' as const,
              geometry: feature.geometry as LineString | MultiLineString,
              properties: {
                ...feature.properties,
                id: segmentId,
                index: index + 1,
                length: length,
              },
              parameters: {}
            };
          });

        if (loadedSegments.length === 0) {
          throw new Error('No valid line segments found in the data.');
        }

        if (loadedSegments.length > 0) {
          const featuresForBounds = loadedSegments.map(s => ({
            type: 'Feature' as const,
            geometry: s.geometry,
            properties: {}
          }));
          const fc = turf.featureCollection(featuresForBounds);
          try {
            const bbox = turf.bbox(fc);
            // FIX TS7006: Added ': number' to type parameter 'b'
            if (bbox && bbox.length === 4 && bbox.every((b: number) => isFinite(b)) && bbox[0] <= bbox[2] && bbox[1] <= bbox[3]) {
              const bounds: L.LatLngBoundsExpression = [[bbox[1], bbox[0]], [bbox[3], bbox[2]]];
              setMapInitialBounds(bounds);
            } else { console.warn("SegmentTablePage: Could not calculate valid initial bounds."); }
          } catch(e) { console.error("SegmentTablePage: Error calculating initial bounds:", e); }
        }

        setSegments(loadedSegments);
      } catch (err) {
        console.error('Error loading segments:', err);
        setError(`Failed to load segment data: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    loadSegments();
  }, [navigate]);

  // Memoized filtering, sorting, pagination (identical to previous version)
  const filteredSegments = useMemo(() => {
    return segments.filter(segment => {
      const searchStr = searchTerm.toLowerCase();
      return (
        segment.id.toLowerCase().includes(searchStr) || // Keep ID searchable even if not displayed
        String(segment.properties.index).includes(searchStr)
      );
    });
  }, [segments, searchTerm]);

  const sortedSegments = useMemo(() => {
    return [...filteredSegments].sort((a, b) => {
      let aValue: any = a;
      let bValue: any = b;
      const fields = sortField.split('.');
      for (const field of fields) {
        aValue = aValue?.[field];
        bValue = bValue?.[field];
      }
      if (aValue === undefined || aValue === null) return sortDirection === 'asc' ? -1 : 1;
      if (bValue === undefined || bValue === null) return sortDirection === 'asc' ? 1 : -1;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredSegments, sortField, sortDirection]);

  const paginatedSegments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedSegments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedSegments, currentPage]);

  const totalPages = Math.ceil(filteredSegments.length / ITEMS_PER_PAGE);

  // Handlers (identical to previous version)
  const handleSegmentSelect = useCallback((segmentId: string) => {
    const newSelectedId = segmentId === selectedSegmentId ? null : segmentId;
    setSelectedSegmentId(newSelectedId);
  }, [selectedSegmentId]);

  const handleSortChange = useCallback((field: string) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  }, [sortField]);

  const handleBack = useCallback(() => navigate('/segmentation'), [navigate]);

  const handleContinue = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Continuing to parameter selection...");
      navigate('/parameter-selection');
    } catch (err) {
      console.error('Error preparing to continue:', err);
      setError('Failed to proceed. Please try again.');
      setLoading(false);
    }
  }, [navigate]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
    }
  }

  // GeoJSON for map rendering (identical to previous version)
  const geoJSONForMap = useMemo(() => {
    if (!segments || segments.length === 0) return null;
    return {
      type: 'FeatureCollection' as const,
      features: segments.map(segment => ({
        type: 'Feature' as const,
        geometry: segment.geometry,
        properties: { ...segment.properties, id: segment.id }
      }))
    };
  }, [segments]);

  const selectedSegmentIds = useMemo(() => {
    return selectedSegmentId ? [selectedSegmentId] : [];
  }, [selectedSegmentId]);

  // Loading State
  if (loading && segments.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p className="ml-4 text-gray-600">Loading segments...</p>
      </div>
    );
  }

  // Main page structure - Side-by-side Grid Layout
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"> {/* Use larger max-width for side-by-side */}

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-primary-900 tracking-tight">
          3. Review Segments
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Review the generated shoreline segments. Click a row to view on map.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Total Segments: {segments.length.toLocaleString()}
        </p>
      </div>

      {/* Error Display */}
      <ErrorAlert message={error} onClose={() => setError(null)} />

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

        {/* Left Column: Table and Controls */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          {/* Table Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex-grow flex flex-col"> {/* Added flex-grow and flex-col */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 flex-shrink-0"> {/* Prevent shrinking */}
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <TableCellsIcon className="h-6 w-6 mr-2 text-primary-700"/> Segment List
              </h3>
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  placeholder="Search by ID or #"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Table Container with scroll */}
            <div className="flex-grow overflow-auto border border-gray-200 rounded-md"> {/* Allow table to grow and scroll */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10"> {/* Make header sticky */}
                  <tr>
                    {/* Index Column */}
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSortChange('properties.index')}
                    >
                      #
                      {sortField === 'properties.index' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    {/* Length Column */}
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSortChange('properties.length')}
                    >
                      Length (m)
                      {sortField === 'properties.length' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    {/* REMOVED Segment ID Column Header */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedSegments.map((segment) => (
                    <tr
                      key={segment.id}
                      onClick={() => handleSegmentSelect(segment.id)}
                      className={`hover:bg-primary-50 cursor-pointer transition-colors duration-150 ${
                        selectedSegmentId === segment.id ? 'bg-primary-100 font-medium' : ''
                      }`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center w-16">
                        {segment.properties.index}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center w-32">
                        {segment.properties?.length ? segment.properties.length.toFixed(1) : 'N/A'}
                      </td>
                       {/* REMOVED Segment ID Column Body Cell */}
                    </tr>
                  ))}
                  {paginatedSegments.length === 0 && (
                    <tr>
                      {/* ADJUSTED COLSPAN */}
                      <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                        {searchTerm ? 'No segments match search.' : 'No segments loaded.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Compact Pagination */}
            {totalPages > 1 && (
              <nav
                className="mt-4 flex items-center justify-between border-t border-gray-200 px-1 pt-3 flex-shrink-0" // Prevent shrinking
                aria-label="Pagination"
              >
                 <p className="text-sm text-gray-700 flex-shrink-0 mr-4"> {/* Prevent shrinking */}
                    Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span>
                    - <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredSegments.length)}</span>
                    {' '}of{' '}
                    <span className="font-medium">{filteredSegments.length}</span>
                 </p>
                  <div className="flex space-x-1"> {/* Use space-x for button spacing */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
              </nav>
            )}
          </div> {/* End Table Section */}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center flex-shrink-0 mt-auto"> {/* Pushes buttons down */}
             <button
               type="button"
               onClick={handleBack}
               className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               disabled={loading}
             >
               <ArrowLeftIcon className="h-4 w-4 mr-2"/> Back
             </button>

             <button
               type="button"
               onClick={handleContinue}
               className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
               disabled={loading || segments.length === 0}
               title={segments.length === 0 ? "No segments loaded" : "Confirm segments and proceed to parameter selection"}
             >
               {loading ? 'Processing...' : 'Confirm & Continue'}
               <ArrowRightIcon className="h-4 w-4 ml-2"/>
             </button>
           </div>

        </div> {/* End Left Column */}


        {/* Right Column: Map */}
        <div className="lg:col-span-1 flex flex-col">
           <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MapOutlineIcon className="h-6 w-6 mr-2 text-primary-700"/> Map Preview
            </h3>
            {selectedSegmentId && (
               <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800 flex items-center">
                 <CheckCircleIcon className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                 Highlighting segment #{segments.find(s => s.id === selectedSegmentId)?.properties.index || ''}. Map zoomed to selection.
               </div>
             )}
          {/* Map container needs defined height */}
          <div className="bg-gray-100 rounded-lg shadow-inner border border-gray-200 overflow-hidden h-[600px] lg:h-full lg:min-h-[600px] flex-grow"> {/* Adjust height as needed, flex-grow */}
             {geoJSONForMap ? (
              <Map
                geoJSON={geoJSONForMap}
                segments={segments}
                parameters={[]}
                selectedParameter={null}
                selectedSegments={selectedSegmentIds}
                selectionPolygons={[]}
                onSegmentSelect={handleSegmentSelect}
                onSelectionDelete={() => {}}
                onAreaSelect={() => {}}
                isEditing={false}
                initialBounds={mapInitialBounds}
                zoomToFeatureId={selectedSegmentId}
                stylingMode="parameter"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                {loading ? 'Loading map data...' : 'No shoreline data available'}
              </div>
            )}
          </div>
        </div> {/* End Right Column */}

      </div> {/* End Grid Container */}

    </div> // End Page Container
  );
}