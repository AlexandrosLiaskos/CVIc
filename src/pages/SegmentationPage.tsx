import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as turf from '@turf/turf'
import Map from '../components/maps/Map'
import { segmentShoreline } from '../utils/geometry'
import { indexedDBService } from '../services/indexedDBService'
import type { FeatureCollection, LineString, MultiLineString } from 'geojson'
import type { ShorelineSegment } from '../types'

export default function SegmentationPage() {
  const navigate = useNavigate()
  const [geoJSON, setGeoJSON] = useState<FeatureCollection<LineString | MultiLineString> | null>(null)
  const [resolution, setResolution] = useState<number | ''>('') // Changed from number to number | ''
  const [segments, setSegments] = useState<ShorelineSegment[]>([])
  const [totalShorelineLength, setTotalShorelineLength] = useState<number>(0)
  const [estimatedSegments, setEstimatedSegments] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isSegmented, setIsSegmented] = useState<boolean>(false)

  useEffect(() => {
    const loadShorelineData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const shorelineId = 'current-shoreline'
        const data = await indexedDBService.getShorelineData(shorelineId)
        
        if (!data) {
          setError('No shoreline data found. Please upload a shapefile first.')
          navigate('/shoreline')
          return
        }

        // Type check and cast the data
        if (data.features.every(feature => 
          feature.geometry.type === 'LineString' || 
          feature.geometry.type === 'MultiLineString'
        )) {
          setGeoJSON(data as FeatureCollection<LineString | MultiLineString>)
          
          // Calculate total shoreline length
          let totalLength = 0
          data.features.forEach((feature: any) => {
            try {
              const line = turf.feature(feature.geometry)
              if (line) {
                const length = turf.length(line, { units: 'kilometers' })
                totalLength += length
              }
            } catch (err) {
              console.error('Error calculating length:', err)
            }
          })
          setTotalShorelineLength(totalLength)
          
          // Update estimated segments only if resolution is a valid number
          if (typeof resolution === 'number' && resolution > 0) {
            setEstimatedSegments(Math.ceil((totalLength * 1000) / resolution))
          }
        } else {
          throw new Error('Invalid geometry type in shoreline data')
        }
      } catch (err) {
        console.error('Error loading shoreline data:', err)
        setError('Failed to load shoreline data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadShorelineData()
  }, [navigate, resolution])

  const handleResolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setResolution(value === '' ? '' : Number(value))
    setError(null)
    
    // Only update estimated segments if we have a valid positive number
    if (value !== '' && Number(value) > 0) {
      setEstimatedSegments(Math.ceil((totalShorelineLength * 1000) / Number(value)))
    } else {
      setEstimatedSegments(0)
    }
  }

  const handleSegmentation = () => {
    // Validate resolution here
    if (!resolution || resolution <= 0) {
      setError('Resolution must be greater than 0')
      return
    }

    if (!geoJSON) {
      setError('No shoreline data available')
      return
    }

    if (estimatedSegments > 10000) {
      if (!confirm(`This will create approximately ${estimatedSegments} segments, which may cause performance issues. Continue anyway?`)) {
        return
      }
    }
    
    setLoading(true)
    setError(null)

    try {
      const newSegments = segmentShoreline(geoJSON, resolution)
      setSegments(newSegments)
      setIsSegmented(true)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to segment shoreline')
      setLoading(false)
    }
  }

  const handleContinue = async () => {
    // Validate resolution before continuing
    if (!resolution || resolution <= 0) {
      setError('Resolution must be greater than 0')
      return
    }

    if (!geoJSON) {
      setError('No shoreline data available')
      return
    }

    if (estimatedSegments > 10000) {
      if (!confirm(`This will create approximately ${estimatedSegments} segments, which may cause performance issues. Continue anyway?`)) {
        return
      }
    }

    try {
      const segments = segmentShoreline(geoJSON, resolution)
      
      // Store segments in session storage
      await indexedDBService.storeShorelineData('current-segments', {
        type: 'FeatureCollection',
        features: segments.map(segment => ({
          type: 'Feature',
          geometry: segment.geometry,
          properties: segment.properties
        }))
      })

      navigate('/segment-table')
    } catch (err) {
      console.error('Error during segmentation:', err)
      setError('Failed to segment shoreline. Please try again.')
    }
  }

  const handleBack = () => {
    navigate('/shoreline')
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Shoreline Segmentation</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Spatial Resolution</h3>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                Total shoreline length: <span className="font-medium">{totalShorelineLength.toFixed(2)} km</span>
              </p>
              <p className="text-sm text-gray-600">
                The shoreline will be divided into segments of equal length based on the resolution you select.
                A smaller resolution will create more segments for detailed analysis but may impact performance.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="resolution" className="block text-sm font-medium text-gray-700">
                  Segment Resolution (meters)
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="number"
                    name="resolution"
                    id="resolution"
                    value={resolution}
                    onChange={handleResolutionChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <span className="ml-2 text-sm text-gray-500">meters</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-700">
                  With this resolution, approximately <span className="font-medium">{estimatedSegments}</span> segments will be created.
                </p>
                {estimatedSegments > 5000 && (
                  <p className="mt-2 text-sm text-amber-600">
                    Warning: A large number of segments may affect application performance.
                    Consider using a larger resolution value if possible.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleSegmentation}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Generate Segments'}
              </button>
            </div>
          </div>

          {isSegmented && segments.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Segmentation Results</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Resolution:</span> {resolution} meters
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Total segments created:</span> {segments.length}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Average segment length:</span> {
                      segments.length > 0 
                        ? (segments.reduce((sum, segment) => sum + (segment.properties?.length || 0), 0) / segments.length).toFixed(2)
                        : 0
                    } meters
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Back to Shoreline Upload
            </button>
            
            <button
              type="button"
              onClick={handleContinue}
              disabled={!isSegmented || segments.length === 0}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Segment Table
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden h-[600px]">
          <div className="p-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Shoreline Preview</h3>
            <p className="text-sm text-gray-500">
              {isSegmented 
                ? `Showing ${segments.length} segments with ${resolution}m resolution` 
                : 'Original shoreline (no segmentation)'}
            </p>
          </div>
          <div className="h-full">
            {geoJSON ? (
              <Map 
                geoJSON={geoJSON}
                segments={segments}
                parameters={[]}
                selectedParameter={null}
                selectedSegments={[]}
                selectionPolygons={[]}
                onSegmentSelect={() => {}}
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
