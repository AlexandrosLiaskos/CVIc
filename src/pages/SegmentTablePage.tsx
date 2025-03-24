import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Map from '../components/maps/Map'
import { indexedDBService } from '../services/indexedDBService'
import type { ShorelineSegment } from '../types'
import type { LineString, MultiLineString } from 'geojson'

const ITEMS_PER_PAGE = 10

export default function SegmentTablePage() {
  const navigate = useNavigate()
  const [segments, setSegments] = useState<ShorelineSegment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null)
  const [sortField, setSortField] = useState<string>('properties.index')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadSegments = async () => {
      try {
        const data = await indexedDBService.getShorelineData('current-segments')
        if (!data) {
          setError('No segment data found. Please complete the segmentation step first.')
          navigate('/segmentation')
          return
        }

        // Convert FeatureCollection to ShorelineSegment array with type checking
        const loadedSegments = data.features
          .filter(feature => 
            feature.geometry.type === 'LineString' || 
            feature.geometry.type === 'MultiLineString'
          )
          .map((feature, index) => {
            const segmentId = `segment-${index + 1}`
            return {
              id: segmentId,
              type: 'Feature' as const,
              geometry: feature.geometry as LineString | MultiLineString,
              properties: {
                id: segmentId,
                length: feature.properties?.length || 0,
                ...feature.properties,
                index: index + 1 // Ensure index is 1-based and overrides any existing index
              },
              parameters: {}
            }
          })

        if (loadedSegments.length === 0) {
          throw new Error('No valid line segments found in the data')
        }

        setSegments(loadedSegments as ShorelineSegment[])
      } catch (err) {
        console.error('Error loading segments:', err)
        setError('Failed to load segment data. Please try again.')
        navigate('/segmentation')
      } finally {
        setLoading(false)
      }
    }

    loadSegments()
  }, [navigate])

  // Filter segments based on search term
  const filteredSegments = useMemo(() => {
    return segments.filter(segment => {
      const searchStr = searchTerm.toLowerCase()
      return (
        segment.id.toLowerCase().includes(searchStr) ||
        Object.entries(segment.properties).some(
          ([key, value]) =>
            key.toLowerCase().includes(searchStr) ||
            String(value).toLowerCase().includes(searchStr)
        )
      )
    })
  }, [segments, searchTerm])

  // Sort segments
  const sortedSegments = useMemo(() => {
    return [...filteredSegments].sort((a, b) => {
      let aValue: any = a;
      let bValue: any = b;
      
      // Handle nested properties (e.g., 'properties.index')
      const fields = sortField.split('.');
      for (const field of fields) {
        aValue = aValue[field];
        bValue = bValue[field];
      }

      // Handle numerical comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle string comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredSegments, sortField, sortDirection]);

  // Paginate segments
  const paginatedSegments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return sortedSegments.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [sortedSegments, currentPage])

  const totalPages = Math.ceil(filteredSegments.length / ITEMS_PER_PAGE)

  // Handle segment selection
  const handleSegmentSelect = (segmentId: string) => {
    setSelectedSegmentId(segmentId === selectedSegmentId ? null : segmentId)
    
    // If selecting a segment that's not on the current page, find its page and navigate there
    if (segmentId !== selectedSegmentId) {
      const segmentIndex = filteredSegments.findIndex(s => s.id === segmentId)
      if (segmentIndex !== -1) {
        const segmentPage = Math.floor(segmentIndex / ITEMS_PER_PAGE) + 1
        if (segmentPage !== currentPage) {
          setCurrentPage(segmentPage)
        }
      }
    }
  }

  const handleRowClick = (segmentId: string) => {
    handleSegmentSelect(segmentId)
  }

  const handleSortChange = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleBack = () => {
    navigate('/segmentation')
  }

  const handleContinue = async () => {
    try {
      // Ensure segments are properly numbered before saving
      const updatedSegments = segments.map((segment, index) => ({
        ...segment,
        properties: {
          ...segment.properties,
          index: index + 1
        }
      }))

      // Store updated segments in IndexedDB before continuing
      await indexedDBService.storeShorelineData('current-segments', {
        type: 'FeatureCollection',
        features: updatedSegments.map(segment => ({
          type: 'Feature',
          geometry: segment.geometry,
          properties: {
            ...segment.properties,
            index: segment.properties.index
          }
        }))
      })
      navigate('/parameter-selection')
    } catch (err) {
      console.error('Error saving segments:', err)
      setError('Failed to save segment data. Please try again.')
    }
  }

  // Get selected segments for map highlighting
  const selectedSegmentIds = useMemo(() => {
    if (!selectedSegmentId) return []
    return [selectedSegmentId]
  }, [selectedSegmentId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Shoreline Segments</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Segment Table</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search segments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange('properties.index')}
                    >
                      #
                      {sortField === 'properties.index' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange('properties.length')}
                    >
                      Length (m)
                      {sortField === 'properties.length' && (
                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedSegments.map((segment) => (
                    <tr 
                      key={segment.id} 
                      onClick={() => handleRowClick(segment.id)}
                      className={`hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                        selectedSegmentId === segment.id 
                          ? 'bg-blue-100 border-l-4 border-blue-500 font-medium' 
                          : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {segment.properties.index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {segment.properties?.length ? segment.properties.length.toFixed(2) : 'N/A'}
                      </td>
                    </tr>
                  ))}
                  {paginatedSegments.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                        No segments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredSegments.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredSegments.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        &lt;
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum = currentPage;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                              currentPage === pageNum
                                ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        &gt;
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>

          {selectedSegmentId && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">Selected Segment Details</h3>
              
              {segments.filter(s => s.id === selectedSegmentId).map(segment => (
                <div key={segment.id} className="space-y-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Segment:</span>{' '}
                    <span className="text-blue-600 font-medium">
                      {segment.id.includes('segment-') 
                        ? segment.id.split('segment-')[1] || ''
                        : segment.id}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Length:</span> {segment.properties?.length ? `${segment.properties.length.toFixed(2)} meters` : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Start Coordinates:</span>{' '}
                    {segment.geometry.type === 'LineString' && segment.geometry.coordinates.length > 0
                      ? `[${segment.geometry.coordinates[0][0].toFixed(6)}, ${segment.geometry.coordinates[0][1].toFixed(6)}]`
                      : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">End Coordinates:</span>{' '}
                    {segment.geometry.type === 'LineString' && segment.geometry.coordinates.length > 0
                      ? `[${segment.geometry.coordinates[segment.geometry.coordinates.length - 1][0].toFixed(6)}, ${segment.geometry.coordinates[segment.geometry.coordinates.length - 1][1].toFixed(6)}]`
                      : 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Back to Segmentation
            </button>
            
            <button
              type="button"
              onClick={handleContinue}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue to Parameter Selection
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden h-[600px]">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Segments Map</h3>
            <p className="text-sm text-gray-500">
              {selectedSegmentId 
                ? `Showing selected segment: ${selectedSegmentId.includes('segment-') 
                    ? selectedSegmentId.split('segment-')[1] || ''
                    : selectedSegmentId.substring(0, 12)}`
                : 'Click on a segment in the table or on the map to select it'}
            </p>
            {selectedSegmentId && (
              <div className="mt-2 text-xs text-blue-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Map has automatically zoomed to the selected segment</span>
              </div>
            )}
          </div>
          <div className="h-full">
            {segments.length > 0 ? (
              <Map 
                geoJSON={{
                  type: 'FeatureCollection',
                  features: segments.map(segment => ({
                    type: 'Feature',
                    geometry: segment.geometry,
                    properties: segment.properties
                  }))
                }}
                segments={segments}
                parameters={[]}
                selectedParameter={null}
                selectedSegments={selectedSegmentIds}
                selectionPolygons={[]}
                onSegmentSelect={handleSegmentSelect}
                onSelectionCreate={() => {}}
                onSelectionDelete={() => {}}
                isEditing={false}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No shoreline data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
