import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpTrayIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function ShorelineSelectionPage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<'upload' | 'create' | null>(null);

  const handleContinue = () => {
    if (selectedOption === 'upload') {
      navigate('/shoreline');
    } else if (selectedOption === 'create') {
      navigate('/shoreline-source');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-primary-900 tracking-tight">
          Shoreline Data
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Choose how you want to provide shoreline data for your coastal vulnerability analysis.
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Upload Existing Shoreline Option */}
        <div 
          className={`bg-white p-6 rounded-lg shadow-md border-2 transition-all cursor-pointer
            ${selectedOption === 'upload' 
              ? 'border-primary-500 ring-2 ring-primary-200' 
              : 'border-gray-200 hover:border-gray-300'}`}
          onClick={() => setSelectedOption('upload')}
        >
          <div className="flex items-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <ArrowUpTrayIcon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="ml-4 text-lg font-medium text-gray-900">Upload Existing Shoreline</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Upload a zipped Shapefile (.zip) containing your existing shoreline data.
          </p>
          <ul className="text-sm text-gray-500 space-y-1 mb-4">
            <li>• Must contain .shp, .shx, and .dbf files</li>
            <li>• Shoreline must be LineString or MultiLineString</li>
            <li>• Maximum file size: 50MB</li>
          </ul>
          <div className="mt-2">
            <span className={`inline-flex items-center text-sm font-medium ${
              selectedOption === 'upload' ? 'text-primary-600' : 'text-gray-500'
            }`}>
              Select this option
              {selectedOption === 'upload' && <span className="ml-2">✓</span>}
            </span>
          </div>
        </div>

        {/* Create New Shoreline Option */}
        <div 
          className={`bg-white p-6 rounded-lg shadow-md border-2 transition-all cursor-pointer
            ${selectedOption === 'create' 
              ? 'border-primary-500 ring-2 ring-primary-200' 
              : 'border-gray-200 hover:border-gray-300'}`}
          onClick={() => setSelectedOption('create')}
        >
          <div className="flex items-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <PencilIcon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="ml-4 text-lg font-medium text-gray-900">Create New Shoreline</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Digitize a new shoreline using satellite imagery.
          </p>
          <ul className="text-sm text-gray-500 space-y-1 mb-4">
            <li>• Upload your own satellite images</li>
            <li>• Or acquire images from Sentinel Hub</li>
            <li>• Draw shoreline directly on the map</li>
          </ul>
          <div className="mt-2">
            <span className={`inline-flex items-center text-sm font-medium ${
              selectedOption === 'create' ? 'text-primary-600' : 'text-gray-500'
            }`}>
              Select this option
              {selectedOption === 'create' && <span className="ml-2">✓</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={!selectedOption}
          className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
