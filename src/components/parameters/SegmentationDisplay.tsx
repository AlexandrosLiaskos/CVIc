import React, { useEffect, useState } from 'react'
import { Feature, LineString } from 'geojson'
import { SegmentationDisplayProps } from './types'
import { segmentShoreline } from '../../services/shapefileProcessor'

export const SegmentationDisplay: React.FC<SegmentationDisplayProps> = ({
  shoreline,
  resolution,
  onSegmentationComplete
}) => {
  const [segments, setSegments] = useState<Feature<LineString>[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const processSegmentation = async () => {
      try {
        setIsProcessing(true)
        setError(null)

        // Convert resolution to kilometers for segmentShoreline function
        const segmentLength = resolution.unit === 'kilometers' 
          ? resolution.value 
          : resolution.value / 1000

        const segmentedShoreline = segmentShoreline(shoreline, segmentLength)
        const segments = segmentedShoreline.features as Feature<LineString>[]
        
        setSegments(segments)
        onSegmentationComplete(segments)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to segment shoreline')
      } finally {
        setIsProcessing(false)
      }
    }

    processSegmentation()
  }, [shoreline, resolution, onSegmentationComplete])

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-sm text-gray-600">Processing shoreline segmentation...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Shoreline Segments
        </h3>
        <span className="text-sm text-gray-500">
          {segments.length} segments created
        </span>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Resolution</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {resolution.value} {resolution.unit}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Total Length</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {segments.reduce((total, segment) => 
                total + (segment.properties?.length || 0), 0
              ).toFixed(2)} km
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
} 