import { useState, useEffect } from 'react'
import { FeatureCollection, LineString, MultiLineString } from 'geojson'
import { ShorelineSegment } from '../../types'
import { segmentShoreline } from '../../utils/geometry'
import * as turf from '@turf/turf'

interface ResolutionStepProps {
  shoreline: FeatureCollection<LineString | MultiLineString>
  onSegmentsGenerated: (segments: ShorelineSegment[]) => void
}

export default function ResolutionStep({
  shoreline,
  onSegmentsGenerated
}: ResolutionStepProps) {
  const [resolution, setResolution] = useState<number>(30) // Default 30m resolution
  const [error, setError] = useState<string | null>(null)
  const [totalShorelineLength, setTotalShorelineLength] = useState<number>(0)
  const [estimatedSegments, setEstimatedSegments] = useState<number>(0)

  // Calculate total shoreline length when component mounts
  useEffect(() => {
    let totalLength = 0
    if (shoreline?.features) {
      shoreline.features.forEach((feature: any) => {
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
    }
    setTotalShorelineLength(totalLength)
    
    // Estimate number of segments
    if (resolution > 0) {
      setEstimatedSegments(Math.ceil((totalLength * 1000) / resolution))
    }
  }, [shoreline, resolution])

  const handleResolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (value > 0) {
      setResolution(value)
      setError(null)
      // Update estimated segments
      setEstimatedSegments(Math.ceil((totalShorelineLength * 1000) / value))
    } else {
      setError('Resolution must be greater than 0')
    }
  }

  const handleSegmentation = () => {
    if (estimatedSegments > 10000) {
      if (!confirm(`This will create approximately ${estimatedSegments} segments, which may cause performance issues. Continue anyway?`)) {
        return
      }
    }
    
    try {
      const segments = segmentShoreline(shoreline, resolution)
      onSegmentsGenerated(segments)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to segment shoreline')
    }
  }

  return (
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
              min="1"
              step="1"
            />
            <span className="ml-2 text-sm text-gray-500">meters</span>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
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
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generate Segments
        </button>
      </div>
    </div>
  )
}