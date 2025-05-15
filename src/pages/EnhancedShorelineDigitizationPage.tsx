import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import GeoRasterLeafletMap from '../components/maps/GeoRasterLeafletMap';
import { indexedDBService } from '../services/indexedDBService';
import { ErrorAlert } from '../components/common/ErrorAlert';
import type { ProcessedImage } from '../services/imageProcessor';
import type { FeatureCollection, LineString } from 'geojson';

export default function EnhancedShorelineDigitizationPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [shoreline, setShoreline] = useState<FeatureCollection | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lineStrings, setLineStrings] = useState<LineString[]>([]);

  // Load satellite images and any existing digitized shoreline
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
  }, [navigate]);

  // Handle creation of a new LineString
  const handleLineStringCreate = useCallback((lineString: LineString) => {
    setLineStrings(prevLineStrings => [...prevLineStrings, lineString]);
  }, []);

  // Handle deletion of a LineString
  const handleLineStringDelete = useCallback((id: string) => {
    setLineStrings(prevLineStrings =>
      prevLineStrings.filter(ls =>
        (ls as any).properties?.id !== id
      )
    );
  }, []);

  // Update the shoreline GeoJSON when lineStrings change
  useEffect(() => {
    if (lineStrings.length > 0) {
      const newShoreline: FeatureCollection = {
        type: 'FeatureCollection',
        features: lineStrings.map((lineString, index) => ({
          type: 'Feature',
          geometry: lineString,
          properties: {
            id: (lineString as any).properties?.id || `line-${index + 1}`
          }
        }))
      };
      setShoreline(newShoreline);
    } else {
      setShoreline(null);
    }
  }, [lineStrings]);

  const handleBack = () => {
    navigate('/satellite-upload');
  };

  const handleContinue = async () => {
    if (!shoreline || shoreline.features.length === 0) {
      setError('Please digitize at least one shoreline segment before continuing.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Store the digitized shoreline
      await indexedDBService.storeShorelineData('digitized-shoreline', shoreline);

      // Also store it as the current shoreline for the main workflow
      await indexedDBService.storeShorelineData('current-shoreline', shoreline);

      console.log('Digitized shoreline saved successfully.');
      navigate('/segmentation');
    } catch (err) {
      console.error('Error saving digitized shoreline:', err);
      setError('Failed to save digitized shoreline. Please try again.');
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all digitized shorelines? This action cannot be undone.')) {
      setLineStrings([]);
      setShoreline(null);
    }
  };

  if (loading && images.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p className="ml-4 text-gray-600">Loading satellite images...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-primary-900 tracking-tight">
          Enhanced Shoreline Digitization
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Draw shoreline segments on the satellite images using the line tool.
        </p>
      </div>

      {/* Error Display */}
      <ErrorAlert message={error} onClose={() => setError(null)} />

      {/* Instructions */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <PencilIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>How to digitize:</strong> Use the line tool in the top-left corner of the map to draw shoreline segments.
              Click to start a line, add points along the shoreline, and double-click to finish.
              You can create multiple line segments and edit or delete them using the edit tools.
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Satellite Images ({images.length})</h3>
            <p className="text-sm text-gray-600">
              {shoreline ? `${shoreline.features.length} shoreline segments digitized` : 'No shoreline segments digitized yet'}
            </p>
          </div>
          <button
            onClick={handleClearAll}
            disabled={!shoreline || shoreline.features.length === 0}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            Clear All
          </button>
        </div>
        <div className="h-[600px] border rounded-lg overflow-hidden">
          <GeoRasterLeafletMap
            images={images}
            geoJSON={shoreline}
            onLineStringCreate={handleLineStringCreate}
            onLineStringDelete={handleLineStringDelete}
            drawingEnabled={true}
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
          Back to Images
        </button>

        <button
          onClick={handleContinue}
          disabled={!shoreline || shoreline.features.length === 0 || loading}
          className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Continue to Segmentation'}
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
