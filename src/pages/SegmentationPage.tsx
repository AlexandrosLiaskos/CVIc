// ---- File: src/pages/SegmentationPage.tsx ----
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as turf from '@turf/turf';
import L from 'leaflet'; 
import Map from '../components/maps/Map';
import { segmentShoreline } from '../utils/geometry';
import { indexedDBService } from '../services/indexedDBService';
import type { FeatureCollection, LineString, MultiLineString } from 'geojson';
import type { ShorelineSegment } from '../types';
import { ErrorAlert } from '../components/common/ErrorAlert';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    InformationCircleIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    BeakerIcon,
    MapPinIcon, 
    CubeTransparentIcon, 
    Cog6ToothIcon 
} from '@heroicons/react/24/outline'; 

export default function SegmentationPage() {
  const navigate = useNavigate();
  const [originalGeoJSON, setOriginalGeoJSON] = useState<FeatureCollection<LineString | MultiLineString> | null>(null);
  const [resolution, setResolution] = useState<number | ''>('');
  const [segmentsPreview, setSegmentsPreview] = useState<ShorelineSegment[]>([]);
  const [mapInitialBounds, setMapInitialBounds] = useState<L.LatLngBoundsExpression | null>(null);
  const [totalShorelineLength, setTotalShorelineLength] = useState<number>(0);
  const [estimatedSegments, setEstimatedSegments] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewDone, setIsPreviewDone] = useState<boolean>(false);

  useEffect(() => {
    const loadShorelineData = async () => {
      setLoading(true);
      setError(null);
      try {
        const shorelineId = 'current-shoreline';
        const data = await indexedDBService.getShorelineData(shorelineId);
        if (!data) {
          setError('No shoreline data found. Please upload a shapefile first.');
          navigate('/shoreline');
          return;
        }

        if (data.features.every(feature => feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString')) {
          const validGeoJSON = data as FeatureCollection<LineString | MultiLineString>;
          setOriginalGeoJSON(validGeoJSON);

          let totalLengthKm = 0;
          validGeoJSON.features.forEach((feature: any) => {
            try { totalLengthKm += turf.length(turf.feature(feature.geometry), { units: 'kilometers' }); }
            catch (err) { console.warn('Error calculating length for a feature:', err); }
          });
          setTotalShorelineLength(totalLengthKm);

           if (validGeoJSON.features.length > 0) {
               try {
                 const bbox = turf.bbox(validGeoJSON);
                 if (bbox && bbox.length === 4 && bbox.every((b: number) => isFinite(b)) && bbox[0] <= bbox[2] && bbox[1] <= bbox[3]) {
                     const bounds: L.LatLngBoundsExpression = [[bbox[1], bbox[0]], [bbox[3], bbox[2]]];
                     setMapInitialBounds(bounds);
                 } else { console.warn("SegmentationPage: Could not calculate valid initial bounds."); }
               } catch(e) { console.error("SegmentationPage: Error calculating initial bounds:", e); }
           }

        } else {
          throw new Error('Invalid geometry type found in shoreline data. Only LineString or MultiLineString are supported.');
        }
      } catch (err) {
        console.error('Error loading shoreline data:', err);
        setError(`Failed to load shoreline data: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };
    loadShorelineData();
  }, [navigate]);

  useEffect(() => {
    if (typeof resolution === 'number' && resolution > 0 && totalShorelineLength > 0) {
      setEstimatedSegments(Math.ceil((totalShorelineLength * 1000) / resolution));
    } else {
      setEstimatedSegments(0);
    }
  }, [resolution, totalShorelineLength]);

  const handleResolutionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numValue = value === '' ? '' : Number(value);
    setResolution(numValue);
    setError(null);
    setIsPreviewDone(false);
    setSegmentsPreview([]);
  }, []);

  const handlePreviewSegmentation = useCallback(() => {
    if (!resolution || resolution <= 0) {
      setError('Resolution must be a positive number (meters).');
      return;
    }
    if (!originalGeoJSON) {
      setError('Original shoreline data is not loaded.');
      return;
    }
    if (estimatedSegments > 10000) {
        if (!confirm(`This resolution will generate approximately ${estimatedSegments} segments, which might be slow to preview and process. Continue preview?`)) {
            return;
        }
    }
    setProcessing(true);
    setError(null);
    setSegmentsPreview([]);
    setIsPreviewDone(false);
    setTimeout(() => {
        try {
            console.time("Segmentation Calculation");
            const generatedSegments = segmentShoreline(originalGeoJSON, resolution);
            console.timeEnd("Segmentation Calculation");
            setSegmentsPreview(generatedSegments);
            setIsPreviewDone(true);
            console.log(`Generated ${generatedSegments.length} segments for preview.`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate segment preview.');
            console.error('Segmentation preview error:', err);
        } finally {
            setProcessing(false);
        }
    }, 10);
  }, [originalGeoJSON, resolution, estimatedSegments]);

  const handleContinue = useCallback(async () => {
    if (!isPreviewDone || segmentsPreview.length === 0) {
      setError("Please generate and preview the segmentation first using the 'Preview Segmentation' button.");
      return;
    }
     if (estimatedSegments > 10000) {
         if (!confirm(`Confirming segmentation with approximately ${estimatedSegments} segments. This might take time to process in the next steps. Continue?`)) {
             return;
         }
     }
    setProcessing(true);
    setError(null);
    try {
      await indexedDBService.storeShorelineData('current-segments', {
        type: 'FeatureCollection',
        features: segmentsPreview.map(segment => ({
          type: 'Feature',
          geometry: segment.geometry,
          properties: segment.properties
        }))
      });
      console.log("Confirmed segments stored in IndexedDB.");
      navigate('/segment-table');
    } catch (err) {
      console.error('Error storing segments:', err);
      setError(`Failed to save segments: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setProcessing(false);
    }
  }, [isPreviewDone, segmentsPreview, navigate, estimatedSegments]);

  const handleBack = useCallback(() => { navigate('/shoreline'); }, [navigate]);
  const geoJSONForMap = useMemo(() => {
    if (isPreviewDone && segmentsPreview.length > 0) {
      return {
        type: 'FeatureCollection' as const,
        features: segmentsPreview.map(segment => ({
          type: 'Feature' as const,
          geometry: segment.geometry,
          properties: { ...segment.properties, id: segment.id }
        }))
      };
    }
    return originalGeoJSON;
  }, [originalGeoJSON, segmentsPreview, isPreviewDone]);

  const mapStylingMode = useMemo(() => (isPreviewDone ? 'parameter' : undefined), [isPreviewDone]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p className="ml-4 text-gray-600">Loading shoreline data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-primary-900 tracking-tight">
          2. Segment Shoreline
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Define the resolution to divide the shoreline into analysis segments.
        </p>
      </div>

      {/* Error Display */}
      <ErrorAlert message={error} onClose={() => setError(null)} />

      {/* Grid Container for Controls and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

        {/* Left Column: Controls Section */}
        <div className="lg:col-span-1 flex flex-col"> {/* Ensure flex-col for spacing */}
           <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
             <Cog6ToothIcon className="h-6 w-6 mr-2 text-primary-700"/> Segmentation Settings
           </h3>
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-200 space-y-6"> {/* Use space-y for internal spacing */}
            {/* Info Area */}
            <div className="flex items-center text-sm text-gray-600 border-b border-gray-200 pb-4">
              <MapPinIcon className="h-5 w-5 mr-2 text-primary-600 flex-shrink-0" />
              <span>Total Shoreline Length: <span className="font-medium text-gray-800">{totalShorelineLength.toFixed(2)} km</span></span>
            </div>

            {/* Resolution Input */}
            <div> {/* Removed mb-4, using parent space-y */}
              <label htmlFor="resolution" className="block text-sm font-medium text-gray-700">
                Segment Resolution
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="resolution"
                  id="resolution"
                  placeholder="e.g., 100"
                  value={resolution}
                  onChange={handleResolutionChange}
                  className="block w-full pr-16 rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:bg-gray-100"
                  disabled={processing}
                  aria-describedby="resolution-unit"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm" id="resolution-unit">meters</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">Enter the desired length for each shoreline segment.</p>
            </div>

            {/* Estimation & Warning */}
            <div className="p-4 bg-gray-50 rounded-md border border-gray-200 space-y-2"> {/* Removed mb-6 */}
              <div className="flex items-center text-sm">
                <InformationCircleIcon className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
                <p className="text-gray-700">
                  Estimated segments: <span className="font-semibold">{estimatedSegments.toLocaleString()}</span>
                </p>
              </div>
              {estimatedSegments > 5000 && (
                <div className="flex items-start text-sm text-amber-600">
                  <ExclamationTriangleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Warning: High segment count (&gt;5k) may impact performance.</span>
                </div>
              )}
            </div>

            {/* Action Button: Preview */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4">
               <button
                 type="button"
                 onClick={handlePreviewSegmentation}
                 disabled={!resolution || resolution <= 0 || processing}
                 className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                 title={!resolution || resolution <= 0 ? "Enter a positive resolution first" : "Generate segment preview on the map"}
               >
                 <BeakerIcon className={`h-5 w-5 mr-2 ${processing && !isPreviewDone ? 'animate-spin' : ''}`} />
                 {processing && !isPreviewDone ? 'Generating...' : 'Preview Segmentation'}
               </button>

               {/* Preview Done Feedback */}
               {isPreviewDone && segmentsPreview.length > 0 && (
                   <div className="flex items-center text-sm text-green-600">
                       <CheckCircleIcon className="h-5 w-5 mr-1.5"/>
                       <span>{segmentsPreview.length.toLocaleString()} segments ready.</span>
                   </div>
               )}
               {isPreviewDone && segmentsPreview.length === 0 && (
                   <div className="flex items-center text-sm text-red-600">
                       <ExclamationTriangleIcon className="h-5 w-5 mr-1.5"/>
                       <span>No segments generated.</span>
                   </div>
               )}
            </div>
          </div>
        </div> {/* End Left Column */}


        {/* Right Column: Map Preview Section */}
        <div className="lg:col-span-1 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <CubeTransparentIcon className="h-6 w-6 mr-2 text-primary-700"/>
                 Preview Map
            </h3>
             <p className="mb-3 text-sm text-gray-600">
               {isPreviewDone
                 ? `Showing ${segmentsPreview.length.toLocaleString()} generated segments (${resolution}m).`
                 : (originalGeoJSON ? 'Showing original shoreline. Enter resolution & click preview.' : 'Load shoreline data first.')}
            </p>
            <div className="bg-gray-100 rounded-lg shadow-inner border border-gray-200 overflow-hidden flex-grow min-h-[500px] relative"> {/* Added flex-grow and min-h */}
              {originalGeoJSON ? (
                <Map
                  geoJSON={geoJSONForMap}
                  segments={segmentsPreview}
                  parameters={[]}
                  selectedParameter={null}
                  selectedSegments={[]}
                  selectionPolygons={[]}
                  onSegmentSelect={() => {}}
                  onSelectionDelete={() => {}}
                  onAreaSelect={() => {}}
                  isEditing={false}
                  initialBounds={mapInitialBounds}
                  stylingMode={mapStylingMode}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  {loading ? 'Loading map data...' : 'No shoreline data loaded.'}
                </div>
              )}
            </div>
        </div> {/* End Right Column */}

      </div> {/* End Grid Container */}


      {/* Navigation Buttons (Below Grid) */}
      <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between items-center">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2"/> Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!isPreviewDone || segmentsPreview.length === 0 || processing}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          title={!isPreviewDone || segmentsPreview.length === 0 ? "Generate and preview segments first" : "Confirm segments and proceed"}
        >
          {processing && isPreviewDone ? 'Saving...' : 'Confirm & Continue'}
          <ArrowRightIcon className="h-4 w-4 ml-2"/>
        </button>
      </div>
    </div>
  );
}