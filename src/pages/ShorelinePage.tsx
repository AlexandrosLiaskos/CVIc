// ---- File: src/pages/ShorelinePage.tsx ----
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { processShapefile } from '../services/shapefileProcessor';
import { indexedDBService } from '../services/indexedDBService';
import Map from '../components/maps/Map';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { ArrowUpTrayIcon, CheckCircleIcon, XCircleIcon, DocumentIcon } from '@heroicons/react/24/outline';
import type { FeatureCollection } from 'geojson';

export default function ShorelinePage() {
  const navigate = useNavigate();
  const [geoJSON, setGeoJSON] = useState<FeatureCollection | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileProcess = useCallback(async (file: File | null) => {
    if (!file) return;

    setError(null); 
    setLoading(true);
    setGeoJSON(null); 
    setFileName(null);

    try {
      const result = await processShapefile(file);
      setGeoJSON(result.geoJSON);
      setFileName(file.name);
      console.log("Shapefile processed successfully.");
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process shapefile. Ensure it is a valid ZIP containing required .shp, .shx, and .dbf files.';
      setError(message);
      console.error('Error processing shapefile:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileProcess(e.target.files?.[0] ?? null);
    e.target.value = '';
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, [handleFileProcess]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleRemoveFile = () => {
    setGeoJSON(null);
    setFileName(null);
    setError(null);
  }

  const handleContinue = async () => {
    if (!geoJSON) return;

    setLoading(true);
    setError(null);

    try {
      const shorelineId = 'current-shoreline'; 
      await indexedDBService.storeShorelineData(shorelineId, geoJSON);
      console.log("Shoreline data stored in IndexedDB.");
      navigate('/segmentation');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save shoreline data. Please try again.';
      setError(message);
      console.error('Error storing shoreline data:', err);
      setLoading(false); 
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-primary-900 tracking-tight">
          1. Upload Shoreline Data
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Begin by uploading your shoreline data as a zipped Shapefile (.zip).
        </p>
      </div>

      {/* Error Display */}
      <ErrorAlert message={error} onClose={() => setError(null)} />

      {/* File Upload Section */}
      <div className="mt-6 mb-8 bg-white p-8 rounded-lg shadow-md border border-gray-200">
        {/* Conditional rendering based on file state */}
        {!fileName && !loading && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative block w-full rounded-lg border-2 ${
              isDragging ? 'border-primary-500 bg-primary-50' : 'border-dashed border-gray-300'
            } p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200`}
          >
            <input
              type="file"
              id="shapefile"
              accept=".zip,application/zip,application/x-zip-compressed" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={loading}
            />
            <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Drag & drop your zipped shapefile here
            </span>
            <span className="block text-xs text-gray-500">
              or click to browse files
            </span>
            <span className="mt-4 block text-xs text-gray-500">
              Must be a .zip containing .shp, .shx, and .dbf files. Max 50MB.
            </span>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-sm font-medium text-gray-700">Processing file...</p>
            <p className="text-xs text-gray-500">This may take a moment for larger files.</p>
          </div>
        )}

        {!loading && fileName && geoJSON && (
          <div className="text-center py-8 px-4 bg-green-50 border border-green-200 rounded-lg">
             <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500 mb-3" />
             <p className="text-sm font-medium text-green-800 mb-1">File processed successfully!</p>
             <div className="flex items-center justify-center text-xs text-gray-600 mb-4">
               <DocumentIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
               <span className="truncate max-w-xs">{fileName}</span>
             </div>
             <button
               onClick={handleRemoveFile}
               className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
             >
                <XCircleIcon className="w-4 h-4 mr-1.5 text-gray-500" />
                Remove and Upload New File
              </button>
          </div>
        )}

        {/* Error state after processing (handled by ErrorAlert above, but could add specific context here if needed) */}
        {/* {!loading && fileName && error && ( ... )} */}

      </div>

      {/* Map Preview Section (Conditional) */}
      {geoJSON && !loading && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Shoreline Preview</h3>
          <div className="bg-gray-100 rounded-lg shadow-inner border border-gray-200 overflow-hidden h-96">
            <Map
              geoJSON={geoJSON}
              segments={[]} 
              parameters={[]}
              selectedParameter={null}
              selectedSegments={[]}
              selectionPolygons={[]}
              onSegmentSelect={() => {}} 
              onSelectionDelete={() => {}}
              onAreaSelect={() => {}}
              isEditing={false}
            />
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={loading || !geoJSON}
          className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          title={!geoJSON ? "Upload a shapefile first" : "Proceed to segment the shoreline"}
        >
          {loading && !geoJSON ? 'Processing...' : (loading && geoJSON ? 'Saving...' : 'Continue to Segmentation')}
        </button>
      </div>

    </div>
  );
}