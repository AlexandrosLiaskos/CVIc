import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import DrawableMap from '../components/maps/DrawableMap';
import { ErrorAlert } from '../components/common/ErrorAlert';
import type { FeatureCollection } from 'geojson';

export default function AOISelectionPage() {
  const navigate = useNavigate();
  const [aoi] = useState<FeatureCollection | null>(null);
  const [error, setError] = useState<string | null>(null);

  // This is a placeholder for the AOI selection functionality
  // In a real implementation, we would need to:
  // 1. Allow drawing polygons on the map
  // 2. Store the selected AOI
  // 3. Pass it to the Sentinel Hub API integration

  const handleBack = () => {
    navigate('/shoreline-source');
  };

  const handleContinue = () => {
    if (!aoi || aoi.features.length === 0) {
      setError('Please draw an area of interest before continuing.');
      return;
    }

    // In a real implementation, we would store the AOI and navigate to the Sentinel Hub integration page
    // For now, we'll just show an error message
    setError('Sentinel Hub integration is not yet implemented. Please use the "Upload Existing Images" option instead.');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-primary-900 tracking-tight">
          Select Area of Interest
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Draw a polygon on the map to define your area of interest for satellite image acquisition.
        </p>
      </div>

      {/* Error Display */}
      <ErrorAlert message={error} onClose={() => setError(null)} />

      {/* Instructions */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <GlobeAltIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> The Sentinel Hub integration is currently under development.
              Please use the "Upload Existing Images" option for now.
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="h-[600px] border rounded-lg overflow-hidden">
          <DrawableMap
            drawingEnabled={false}
            readOnly={true}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="inline-flex items-center justify-center bg-gray-100 text-gray-700 font-semibold px-6 py-3 text-base rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5" />
          Back
        </button>

        <button
          onClick={handleContinue}
          className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Continue
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
