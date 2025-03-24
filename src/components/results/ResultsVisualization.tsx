import { useState } from 'react'
import type { PathOptions } from 'leaflet'
import MapVisualization from '../maps/MapVisualization'
import { getCVILevelColor } from '../../utils'
import type { AnalysisResult, MapFeature } from '../../types'
import { Feature, GeoJSON } from 'react-leaflet'
import { GeoJsonProperties } from 'geojson'

interface ResultsVisualizationProps {
  result: AnalysisResult
  onSegmentClick?: (segmentId: string) => void
}

export default function ResultsVisualization({
  result,
  onSegmentClick
}: ResultsVisualizationProps) {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

  const handleSegmentClick = (feature: GeoJSON.Feature) => {
    const segmentId = (feature as MapFeature).properties.id
    setSelectedSegment(segmentId)
    if (onSegmentClick) {
      onSegmentClick(segmentId)
    }
  }

  const getFeatureStyle = (feature: Feature<any, GeoJsonProperties>): PathOptions => {
    const mapFeature = feature as MapFeature
    const segmentId = mapFeature.properties.id
    const isSelected = segmentId === selectedSegment
    const cviScore = mapFeature.properties.cviScore

    return {
      color: getCVILevelColor(cviScore),
      weight: isSelected ? 4 : 2,
      opacity: 1,
      fillOpacity: isSelected ? 0.4 : 0.2
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Vulnerability Map
        </h3>
        <MapVisualization
          geoJSON={result.geoJSON}
          onFeatureClick={handleSegmentClick}
          featureStyle={getFeatureStyle}
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Statistics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Mean CVI Score</p>
            <p className="text-lg font-medium text-gray-900">
              {result.statistics.mean.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Median CVI Score</p>
            <p className="text-lg font-medium text-gray-900">
              {result.statistics.median.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Minimum CVI Score</p>
            <p className="text-lg font-medium text-gray-900">
              {result.statistics.min.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Maximum CVI Score</p>
            <p className="text-lg font-medium text-gray-900">
              {result.statistics.max.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Legend
        </h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded mr-2" />
            <span className="text-sm text-gray-600">Low Vulnerability (0.00 - 0.33)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-yellow-500 rounded mr-2" />
            <span className="text-sm text-gray-600">Medium Vulnerability (0.34 - 0.66)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded mr-2" />
            <span className="text-sm text-gray-600">High Vulnerability (0.67 - 1.00)</span>
          </div>
        </div>
      </div>
    </div>
  )
} 