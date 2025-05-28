import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpTrayIcon, XCircleIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { processSatelliteImage, releaseProcessedImage } from '../services/imageProcessor';
import { indexedDBService } from '../services/indexedDBService';
import { ErrorAlert } from '../components/common/ErrorAlert';
import type { ProcessedImage } from '../services/imageProcessor';

export default function SatelliteImageUploadPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Load any existing images from IndexedDB
  useEffect(() => {
    const loadImages = async () => {
      try {
        const savedImages = await indexedDBService.getAllSatelliteImages();
        setImages(savedImages);
      } catch (err) {
        console.error('Error loading saved images:', err);
        setError('Failed to load saved images. You can continue with new uploads.');
      }
    };

    loadImages();

    // Clean up object URLs when component unmounts
    return () => {
      images.forEach(image => {
        releaseProcessedImage(image);
      });
    };
  }, []);

  const handleFileProcess = useCallback(async (file: File | null) => {
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      const processedImage = await processSatelliteImage(file);

      // Store the image in IndexedDB
      await indexedDBService.storeSatelliteImage(processedImage.id, processedImage);

      // Update the state with the new image
      setImages(prevImages => [...prevImages, processedImage]);

      console.log("Satellite image processed and stored successfully.");
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : 'Failed to process satellite image. Ensure it is a valid georeferenced image file.';
      setError(message);
      console.error('Error processing satellite image:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Process each file
      Array.from(files).forEach(file => {
        handleFileProcess(file);
      });
    }
    e.target.value = '';
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Process each file
      Array.from(e.dataTransfer.files).forEach(file => {
        handleFileProcess(file);
      });
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

  const handleRemoveImage = async (imageId: string) => {
    try {
      // Find the image to release its resources
      const imageToRemove = images.find(img => img.id === imageId);
      if (imageToRemove) {
        releaseProcessedImage(imageToRemove);
      }

      // Remove from IndexedDB
      await indexedDBService.deleteSatelliteImage(imageId);

      // Update state
      setImages(prevImages => prevImages.filter(img => img.id !== imageId));

      console.log(`Image ${imageId} removed successfully.`);
    } catch (err) {
      console.error('Error removing image:', err);
      setError('Failed to remove image. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/shoreline-source');
  };

  const handleContinue = () => {
    if (images.length === 0) {
      setError('Please upload at least one satellite image before continuing.');
      return;
    }

    navigate('/enhanced-shoreline-digitization');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-primary-900 tracking-tight">
          Upload Satellite Images
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Upload georeferenced satellite images to digitize shorelines.
        </p>
      </div>

      {/* Error Display */}
      <ErrorAlert message={error} onClose={() => setError(null)} />

      {/* File Format Info Alert */}
      <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">About Supported File Formats</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                <span className="font-medium">GeoTIFF & Cloud Optimized GeoTIFF (COG):</span>
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Both standard GeoTIFF and COG formats are fully supported</li>
                <li>COG files provide better performance for web-based viewing</li>
                <li>Images will be displayed in their correct geographic location</li>
                <li>Files must contain proper georeferencing information</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="mt-6 mb-8 bg-white p-8 rounded-lg shadow-md border border-gray-200">
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
            id="satellite-image"
            accept=".tif,.tiff"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={loading}
            multiple
          />
          <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-medium text-gray-900">
            Drag & drop your satellite images here
          </span>
          <span className="block text-xs text-gray-500">
            or click to browse files
          </span>
          <span className="mt-4 block text-xs text-gray-500">
            Supports GeoTIFF (.tif, .tiff) and Cloud Optimized GeoTIFF (COG) formats. Max 1GB per file.
          </span>
        </div>

        {loading && (
          <div className="text-center py-4 mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-sm font-medium text-gray-700">Processing image...</p>
            <p className="text-xs text-gray-500">This may take a moment for larger files.</p>
          </div>
        )}
      </div>

      {/* Uploaded Images List */}
      {images.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Images ({images.length})</h3>
          <div className="space-y-4">
            {images.map((image) => (
              <div key={image.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-center">
                  <PhotoIcon className="h-6 w-6 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{image.name}</p>
                    <p className="text-xs text-gray-500">
                      Uploaded {new Date(image.timestamp).toLocaleString()}
                    </p>
                    <div className="text-xs text-gray-500 space-y-1">
                      {image.metadata?.isSentinel ? (
                        <>
                          <p className="font-medium text-primary-600">
                            {image.metadata?.sentinelInfo?.satellite || 'Sentinel-2'} Image
                            {image.metadata?.isJP2 && ' (JP2 Format)'}
                            {image.metadata?.sentinelInfo?.productType && ` - ${image.metadata.sentinelInfo.productType}`}
                          </p>
                          <p>
                            {image.metadata?.sentinelInfo?.utmZone && `UTM Zone: ${image.metadata.sentinelInfo.utmZone}`}
                            {image.metadata?.sentinelInfo?.band && ` • Band: ${image.metadata.sentinelInfo.band}`}
                            {image.metadata?.sentinelInfo?.date && ` • Date: ${image.metadata.sentinelInfo.date}`}
                          </p>
                          {image.metadata?.isJP2 && (
                            <p className="italic text-blue-600">
                              JP2 file - approximate positioning with UTM zone boundaries
                            </p>
                          )}
                          <p>
                            Bounds: {image.bounds[0].toFixed(2)}°W, {image.bounds[1].toFixed(2)}°S, {image.bounds[2].toFixed(2)}°E, {image.bounds[3].toFixed(2)}°N
                          </p>
                        </>
                      ) : image.georaster ? (
                        <>
                          <p className="font-medium text-green-600">GeoTIFF with embedded georeferencing</p>
                          <p>
                            Bounds: {image.bounds[0].toFixed(2)}°W, {image.bounds[1].toFixed(2)}°S, {image.bounds[2].toFixed(2)}°E, {image.bounds[3].toFixed(2)}°N
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            Bounds: {image.bounds[0].toFixed(2)}°W, {image.bounds[1].toFixed(2)}°S, {image.bounds[2].toFixed(2)}°E, {image.bounds[3].toFixed(2)}°N
                          </p>
                        </>
                      )}
                      <p>
                        Size: {(image.metadata?.size ? (image.metadata.size / (1024 * 1024)).toFixed(2) : '?')} MB
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveImage(image.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  title="Remove image"
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-10">
        <button
          onClick={handleBack}
          className="inline-flex items-center justify-center bg-gray-100 text-gray-700 font-semibold px-6 py-3 text-base rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5" />
          Back
        </button>

        <button
          onClick={handleContinue}
          disabled={images.length === 0 || loading}
          className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Enhanced Digitization
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
