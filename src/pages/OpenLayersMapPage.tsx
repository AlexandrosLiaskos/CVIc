import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import OpenLayersMap from '../components/maps/OpenLayersMap';
import { indexedDBService } from '../services/indexedDBService';
import { ProcessedImage, releaseProcessedImage } from '../services/imageProcessor';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { FeatureCollection } from 'geojson';

const OpenLayersMapPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [image, setImage] = useState<ProcessedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [geoJSON, setGeoJSON] = useState<FeatureCollection | null>(null);

  // Load image from IndexedDB
  useEffect(() => {
    if (!id) return;

    const loadImage = async () => {
      try {
        const loadedImage = await indexedDBService.getSatelliteImage(id);
        if (!loadedImage) {
          setError('Image not found');
          return;
        }
        setImage(loadedImage);

        // Load associated GeoJSON if available
        try {
          const loadedGeoJSON = await indexedDBService.getShorelineData(id);
          if (loadedGeoJSON) {
            setGeoJSON(loadedGeoJSON);
          }
        } catch (geoJSONError) {
          console.warn('Could not load GeoJSON:', geoJSONError);
        }
      } catch (error) {
        console.error('Error loading image:', error);
        setError('Failed to load image');
      }
    };

    loadImage();

    // Cleanup on unmount
    return () => {
      if (image) {
        releaseProcessedImage(image);
      }
    };
  }, [id]);

  // Handle delete image
  const handleDeleteImage = async () => {
    if (!image) return;

    try {
      await indexedDBService.deleteSatelliteImage(image.id);

      // Also delete associated GeoJSON if it exists
      try {
        await indexedDBService.deleteShorelineData(image.id);
      } catch (geoJSONError) {
        console.warn('Could not delete GeoJSON:', geoJSONError);
      }

      // Release resources
      releaseProcessedImage(image);

      // Navigate back to the image list
      navigate('/images');
    } catch (error) {
      console.error('Error deleting image:', error);
      setError('Failed to delete image');
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate('/images');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Back"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">
            {image ? image.name : 'Loading...'}
          </h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleDeleteImage}
            className="p-2 rounded-full hover:bg-red-700 transition-colors"
            aria-label="Delete"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <ErrorAlert message={error} onClose={() => setError(null)} />
      )}

      {/* Map Container */}
      <div className="flex-grow relative">
        {image ? (
          <OpenLayersMap
            images={[image]}
            geoJSON={geoJSON}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading image...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenLayersMapPage;
