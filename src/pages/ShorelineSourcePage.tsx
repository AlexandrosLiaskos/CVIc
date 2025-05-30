import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ArrowLeftIcon, PhotoIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function ShorelineSourcePage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<'upload' | 'acquire' | null>(null);

  const handleContinue = () => {
    if (selectedOption === 'upload') {
      navigate('/satellite-upload');
    }
    // Note: 'acquire' option is disabled as the feature is not yet developed
  };

  const handleBack = () => {
    navigate('/shoreline-selection');
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-primary-900 tracking-tight">
          Satellite Image Source
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Choose how you want to obtain satellite imagery for shoreline digitization.
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Upload Existing Images Option */}
        <div
          className={`bg-white p-6 rounded-lg shadow-md border-2 transition-all cursor-pointer
            ${selectedOption === 'upload'
              ? 'border-primary-500 ring-2 ring-primary-200'
              : 'border-gray-200 hover:border-gray-300'}`}
          onClick={() => setSelectedOption('upload')}
        >
          <div className="flex items-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <PhotoIcon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="ml-4 text-lg font-medium text-gray-900">Upload Existing Images</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Upload your own georeferenced satellite images.
          </p>
          <ul className="text-sm text-gray-500 space-y-1 mb-4">
            <li>• Supports GeoTIFF and Cloud Optimized GeoTIFF (COG) formats</li>
            <li>• Images will be displayed on the map in their correct position</li>
            <li>• Multiple images can be uploaded</li>
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

        {/* Acquire New Images Option */}
        <div
          className={`bg-white p-6 rounded-lg shadow-md border-2 transition-all cursor-pointer
            ${selectedOption === 'acquire'
              ? 'border-primary-500 ring-2 ring-primary-200'
              : 'border-gray-200 hover:border-gray-300'}`}
          onClick={() => setSelectedOption('acquire')}
        >
          <div className="flex items-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <GlobeAltIcon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="ml-4 text-lg font-medium text-gray-900">Acquire Images</h3>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200 mb-4">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-3">
                <span className="text-white text-xl">🚀</span>
              </div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Coming Soon!</h4>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-xs text-blue-500 text-center">
                Want to be notified when this feature launches?
                <span className="font-medium"> Contact us!</span>
              </p>
            </div>
          </div>
          <div className="mt-2">
            <span className={`inline-flex items-center text-sm font-medium ${
              selectedOption === 'acquire' ? 'text-primary-600' : 'text-gray-500'
            }`}>
              Select this option
              {selectedOption === 'acquire' && <span className="ml-2">✓</span>}
            </span>
          </div>
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
          disabled={!selectedOption || selectedOption === 'acquire'}
          className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
