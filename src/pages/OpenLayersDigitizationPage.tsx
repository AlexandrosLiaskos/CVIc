import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/outline';
import OpenLayersDrawableMap from '../components/maps/OpenLayersDrawableMap';
import { indexedDBService } from '../services/indexedDBService';
import { ProcessedImage, releaseProcessedImage } from '../services/imageProcessor';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { FeatureCollection, Feature, LineString } from 'geojson';

export default function OpenLayersDigitizationPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [shoreline, setShoreline] = useState<FeatureCollection | null>(null);
  const [, setLineStrings] = useState<LineString[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load images and existing shoreline data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Load satellite images
        const savedImages = await indexedDBService.getAllSatelliteImages();
        if (savedImages.length === 0) {
          setError('No satellite images found. Please upload images first.');
          navigate('/satellite-upload');
          return;
        }
        setImages(savedImages);

        // Check if there's an existing digitized shoreline
        const existingShoreline = await indexedDBService.getShorelineData('digitized-shoreline');
        if (existingShoreline) {
          setShoreline(existingShoreline);

          // Extract LineStrings from the GeoJSON
          const extractedLineStrings: LineString[] = [];
          existingShoreline.features.forEach(feature => {
            if (feature.geometry.type === 'LineString') {
              extractedLineStrings.push(feature.geometry as LineString);
            }
          });
          setLineStrings(extractedLineStrings);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Clean up object URLs when component unmounts
    return () => {
      images.forEach(image => {
        releaseProcessedImage(image);
      });
    };
  }, [navigate]);

  // Handle drawing a new line
  const handleFeatureDrawn = useCallback((feature: Feature) => {
    if (feature.geometry.type === 'LineString') {
      // Add the new LineString to our state
      setLineStrings(prev => [...prev, feature.geometry as LineString]);

      // Create or update the shoreline GeoJSON
      const newShoreline: FeatureCollection = {
        type: 'FeatureCollection',
        features: [
          ...(shoreline?.features || []),
          {
            type: 'Feature',
            properties: {},
            geometry: feature.geometry as LineString
          }
        ]
      };

      setShoreline(newShoreline);

      // Save to IndexedDB
      indexedDBService.storeShorelineData('digitized-shoreline', newShoreline)
        .then(() => console.log('Shoreline saved successfully'))
        .catch(err => {
          console.error('Error saving shoreline:', err);
          setError('Failed to save shoreline. Please try again.');
        });

      // Exit drawing mode
      setIsDrawing(false);
    }
  }, [shoreline]);

  // Handle clearing all drawn lines
  const handleClearAll = async () => {
    if (!shoreline || shoreline.features.length === 0) return;

    try {
      // Create empty shoreline
      const emptyShoreline: FeatureCollection = {
        type: 'FeatureCollection',
        features: []
      };

      // Update state
      setShoreline(emptyShoreline);
      setLineStrings([]);

      // Save to IndexedDB
      await indexedDBService.storeShorelineData('digitized-shoreline', emptyShoreline);
      console.log('Shoreline cleared successfully');
    } catch (err) {
      console.error('Error clearing shoreline:', err);
      setError('Failed to clear shoreline. Please try again.');
    }
  };

  // Handle navigation
  const handleBack = () => {
    navigate('/satellite-upload');
  };

  const handleContinue = () => {
    if (!shoreline || shoreline.features.length === 0) {
      setError('Please digitize at least one shoreline segment before continuing.');
      return;
    }

    navigate('/shoreline');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-primary-900 tracking-tight">
          Digitize Shoreline
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Draw shoreline segments on the satellite images.
        </p>
      </div>

      {/* Error Display */}
      <ErrorAlert message={error} onClose={() => setError(null)} />

      {/* Map Container */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Satellite Images ({images.length})</h3>
            <p className="text-sm text-gray-600">
              {shoreline ? `${shoreline.features.length} shoreline segments digitized` : 'No shoreline segments digitized yet'}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleClearAll}
              disabled={!shoreline || shoreline.features.length === 0}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TrashIcon className="h-4 w-4 mr-1" />
              Clear All
            </button>
            <button
              onClick={() => setIsDrawing(!isDrawing)}
              className={`inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md ${
                isDrawing
                  ? 'text-white bg-primary-600 hover:bg-primary-700'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
            >
              {isDrawing ? (
                <>
                  <CheckIcon className="h-4 w-4 mr-1" />
                  Done Drawing
                </>
              ) : (
                <>
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Draw Shoreline
                </>
              )}
            </button>
          </div>
        </div>
        <div className="h-[600px] border rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <OpenLayersDrawableMap
              images={images}
              geoJSON={shoreline}
              drawingEnabled={isDrawing}
              onFeatureDrawn={handleFeatureDrawn}
            />
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center justify-center bg-gray-100 text-gray-700 font-semibold px-6 py-3 text-base rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5" />
          Back to Images
        </button>

        <button
          onClick={handleContinue}
          disabled={!shoreline || shoreline.features.length === 0}
          className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Shoreline
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
