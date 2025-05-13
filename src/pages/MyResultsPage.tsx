// src/pages/MyResultsPage.tsx
import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FeatureCollection } from 'geojson';
import L from 'leaflet';
import { useAuth } from '../hooks/useAuth';
import { listUserCviResults, fetchCviGeoJsonByUrl } from '../lib/firebase';
import { MapInteractionPanel } from '../components/parameters/MapInteractionPanel'; 
import { ErrorAlert } from '../components/common/ErrorAlert';
import type { ShorelineSegment } from '../types'; 

interface CviFile {
  name: string;
  fullPath: string;
  downloadUrl: string;
}

export default function MyResultsPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [cviFiles, setCviFiles] = useState<CviFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CviFile | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection | null>(null);
  const [segmentsForMap, setSegmentsForMap] = useState<ShorelineSegment[]>([]);
  const [mapBounds, setMapBounds] = useState<L.LatLngBoundsExpression | undefined>(undefined);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
  const [loadingGeoJson, setLoadingGeoJson] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login?message=Please login to view your results.');
      return;
    }

    if (user && user.id) {
      setLoadingFiles(true);
      listUserCviResults(user.id)
        .then(files => {
          setCviFiles(files);
          if (files.length > 0) {
          }
        })
        .catch(err => {
          console.error("Failed to load CVI files:", err);
          setError(err instanceof Error ? err.message : 'Could not load your saved CVI results.');
        })
        .finally(() => setLoadingFiles(false));
    }
  }, [user, authLoading, navigate]);

  const handleFileSelect = async (file: CviFile) => {
    setSelectedFile(file);
    setGeoJsonData(null); 
    setSegmentsForMap([]);
    setError(null);
    setLoadingGeoJson(true);
    try {
      const data = await fetchCviGeoJsonByUrl(file.downloadUrl);
      if (data && data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        setGeoJsonData(data);
        const transformedSegments = data.features.map(feature => ({
          id: feature.id?.toString() || `segment-${Math.random().toString(36).substr(2, 9)}`,
          geometry: feature.geometry as any, 
          properties: feature.properties || {},
        })) as ShorelineSegment[];
        setSegmentsForMap(transformedSegments);

        if (transformedSegments.length > 0) {
          const allCoords = transformedSegments.flatMap(seg => 
            (seg.geometry.type === 'LineString' ? seg.geometry.coordinates : seg.geometry.coordinates.flat(1))
          ).map(coord => [coord[1], coord[0]] as [number, number]); 
          if (allCoords.length > 0) {
            setMapBounds(L.latLngBounds(allCoords));
          }
        }
      } else {
        throw new Error('Invalid GeoJSON format received.');
      }
    } catch (err) {
      console.error(`Failed to load GeoJSON for ${file.name}:`, err);
      setError(err instanceof Error ? err.message : `Could not load details for ${file.name}.`);
      setGeoJsonData(null);
      setSegmentsForMap([]);
    } finally {
      setLoadingGeoJson(false);
    }
  };

  const geoJSONForMapDisplay = useMemo(() => {
    if (!geoJsonData || segmentsForMap.length === 0) return null;
    return {
      type: 'FeatureCollection' as const,
      features: segmentsForMap.map(segment => ({
        type: 'Feature' as const,
        geometry: segment.geometry,
        properties: {
          ...segment.properties, 
          id: segment.id,
          isSelected: false, 
        }
      }))
    };
  }, [geoJsonData, segmentsForMap]);

  if (authLoading || (user && loadingFiles && cviFiles.length === 0)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Loading your results...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg text-gray-700">Please log in to view your saved CVI results.</p>
        <button onClick={() => navigate('/login')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] p-4 space-y-4 bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800">My Saved CVI Results</h1>
      <ErrorAlert message={error} onClose={() => setError(null)} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow overflow-hidden">
        {/* Left Panel: List of CVI Files */}
        <div className="md:col-span-1 bg-white p-4 rounded-lg shadow overflow-y-auto custom-scrollbar">
          <h2 className="text-lg font-medium mb-3">Available Analyses:</h2>
          {loadingFiles && <p>Loading list...</p>}
          {!loadingFiles && cviFiles.length === 0 && (
            <p className="text-gray-500">No saved CVI results found for your account.</p>
          )}
          {cviFiles.length > 0 && (
            <ul className="space-y-2">
              {cviFiles.map(file => (
                <li key={file.fullPath}>
                  <button
                    onClick={() => handleFileSelect(file)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors 
                                ${selectedFile?.fullPath === file.fullPath 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-100 hover:bg-gray-200'}`}
                    disabled={loadingGeoJson}
                  >
                    {file.name} (Uploaded: {new Date(parseInt(file.name.split('_').pop()?.split('.')[0] || '0')).toLocaleDateString()})
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Panel: Map Display */}
        <div className="md:col-span-2 flex flex-col h-full overflow-hidden bg-white rounded-lg shadow">
          {loadingGeoJson && (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="ml-3 text-gray-600">Loading map data...</p>
            </div>
          )}
          {!loadingGeoJson && !geoJsonData && selectedFile && (
             <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Error loading map data or no data found.</p>
            </div>
          )}
          {!loadingGeoJson && !selectedFile && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Select an analysis from the list to view it on the map.</p>
            </div>
          )}
          {geoJsonData && segmentsForMap.length > 0 && geoJSONForMapDisplay && (
            <div className="flex-grow overflow-hidden"> {/* Ensure map panel takes space */}
              <MapInteractionPanel
                segments={segmentsForMap} 
                parameters={[]} 
                geoJSON={geoJSONForMapDisplay} 
                initialBounds={mapBounds}
                selectionPolygons={[]}
                selectedSegmentIds={[]}
                selectedParameterId={null}
                onSegmentSelect={() => {}} 
                onSelectAll={() => {}}
                onClearSelection={() => {}}
                onSelectionDelete={() => {}}
                onAreaSelect={() => {}}
                mapContainerRef={mapContainerRef}
                isReadOnly={true} 
              />
            </div>
          )}
           {!loadingGeoJson && geoJsonData && segmentsForMap.length === 0 && (
             <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No shoreline segments found in the selected file.</p>
            </div>
           )}
        </div>
      </div>
    </div>
  );
}
