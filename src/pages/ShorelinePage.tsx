import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { processShapefile } from '../services/shapefileProcessor'
import { indexedDBService } from '../services/indexedDBService'
import Map from '../components/maps/Map'

export default function ShorelinePage() {
  const navigate = useNavigate()
  const [geoJSON, setGeoJSON] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setLoading(true)
    setUploadProgress(0)

    try {
      // Process the shapefile
      const result = await processShapefile(file)
      setGeoJSON(result.geoJSON)
      setUploadProgress(100)
    } catch (err) {
      setError('Failed to process shapefile. Please try again.')
      console.error('Error processing shapefile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = async () => {
    if (!geoJSON) return

    setLoading(true)
    setError('')

    try {
      // Store the GeoJSON in IndexedDB
      const shorelineId = 'current-shoreline' // Using a fixed ID for simplicity
      await indexedDBService.storeShorelineData(shorelineId, geoJSON)
      navigate('/segmentation')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to save shoreline data. Please try again.')
      }
      console.error('Error storing shoreline data:', err)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Shoreline Analysis</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="shapefile" className="block text-sm font-medium text-gray-700">
              Upload Shapefile
            </label>
            <input
              type="file"
              id="shapefile"
              accept=".shp,.zip"
              onChange={handleFileUpload}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-50 file:text-primary-700
                hover:file:bg-primary-100"
              disabled={loading}
            />
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Processing: {uploadProgress}%</p>
              </div>
            )}
          </div>

          <button
            onClick={handleContinue}
            disabled={loading || !geoJSON}
            className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Continue to Segmentation'}
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg overflow-hidden h-[500px]">
          {geoJSON ? (
            <Map 
              geoJSON={geoJSON}
              segments={[]}
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
              Upload a shapefile to preview
            </div>
          )}
        </div>
      </div>
    </div>
  )
}