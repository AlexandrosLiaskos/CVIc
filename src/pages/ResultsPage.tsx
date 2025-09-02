// ---- File: src/pages/ResultsPage.tsx ----
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';

import { indexedDBService } from '../services/indexedDBService';
import Map from '../components/maps/Map';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { CviLegend } from '../components/results/CviLegend';
import CviCharts from '../components/results/CviCharts';
import type { ShorelineSegment, Parameter, Formula, ShorelineSegmentProperties } from '../types';
import type { FeatureCollection, LineString, MultiLineString, Feature } from 'geojson';
import { createFeatureCollection, calculateBbox } from '../utils/turfHelpers';
import { getCviCategory } from '../utils/vulnerabilityMapping';
import { availableFormulas } from '../config/formulas';
import { generateHtmlReport } from '../utils/reportGenerator';
import { captureMap } from '../utils/mapCapture';
import { getStandardizedIndexById } from '../config/indices';
import type { StandardizedCoastalIndex } from '../types/indexSpecificTypes';

export default function ResultsPage() {
  const navigate = useNavigate();
  const [segments, setSegments] = useState<ShorelineSegment[]>([]);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [usedFormula, setUsedFormula] = useState<Formula | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<StandardizedCoastalIndex | null>(null);
  const [mapBounds, setMapBounds] = useState<L.LatLngBoundsExpression | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [exportingHtml, setExportingHtml] = useState<boolean>(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadResultsData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Loading data for Results Page...");

        const segmentData = await indexedDBService.getShorelineData('current-segments');
        if (!segmentData || !segmentData.features || segmentData.features.length === 0) {
          throw new Error('No segments found. Please complete previous steps.');
        }

        const loadedSegments = segmentData.features
          .filter(feature => feature && feature.geometry && (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') && feature.properties?.vulnerabilityIndex !== undefined)
          .map((feature, index) => {
            const properties = feature.properties || {};
            return {
              id: properties.id || `segment-${index + 1}`,
              type: 'Feature' as const,
              geometry: feature.geometry as LineString | MultiLineString,
              properties: {
                ...properties,
                id: properties.id || `segment-${index + 1}`,
                vulnerabilityIndex: properties.vulnerabilityIndex,
                vulnerabilityFormula: properties.vulnerabilityFormula,

                parameters: properties.parameters || {}
              },
              parameters: properties.parameters || {}
            };
          });

        if (loadedSegments.length === 0) {
          throw new Error('No segments with calculated CVI scores found. Please calculate CVI first.');
        }
        console.log(`Loaded ${loadedSegments.length} segments with CVI scores.`);
        setSegments(loadedSegments as ShorelineSegment[]);

        const firstSegmentWithFormula = loadedSegments.find(seg => seg.properties.vulnerabilityFormula);
        if (firstSegmentWithFormula?.properties.vulnerabilityFormula) {
            const formula = availableFormulas.find(f => f.type === firstSegmentWithFormula.properties.vulnerabilityFormula);
            if (formula) {
                console.log(`Determined used formula: ${formula.name}`);
                setUsedFormula(formula);
            } else {
                console.warn(`Unknown formula type found in segments: ${firstSegmentWithFormula.properties.vulnerabilityFormula}`);
            }
        } else {
            console.warn("Could not determine the CVI formula used from segment data.");
        }

        const parameterData = await indexedDBService.getShorelineData('current-parameters');
        if (parameterData && parameterData.features) {
          const loadedParameters = parameterData.features
            .map(feature => feature.properties as Parameter)
            .filter((p): p is Parameter => p !== null && p.enabled === true);
          setParameters(loadedParameters);
          console.log(`Loaded ${loadedParameters.length} enabled parameters.`);
        }

        // Load selected index information
        const indexData = await indexedDBService.getShorelineData('current-index');
        if (indexData && indexData.features && indexData.features.length > 0) {
          const indexFeature = indexData.features[0];
          if (indexFeature.properties?.id) {
            const index = getStandardizedIndexById(indexFeature.properties.id);
            if (index) {
              setSelectedIndex(index);
              console.log(`Loaded selected index: ${index.name}`);
            }
          }
        }

        const featuresForBounds = loadedSegments.map(s => ({ type: 'Feature' as const, geometry: s.geometry, properties: {} }));
        const fc = createFeatureCollection(featuresForBounds);
        try {
          const bbox = calculateBbox(fc);
          if (bbox && bbox.length === 4 && bbox.every((b: number) => isFinite(b)) && bbox[0] <= bbox[2] && bbox[1] <= bbox[3]) {
            const bounds: L.LatLngBoundsExpression = [[bbox[1], bbox[0]], [bbox[3], bbox[2]]];
            setMapBounds(bounds);
            console.log("Calculated map bounds:", bounds);
          } else { console.warn("Could not calculate valid bounds from segments."); }
        } catch (e) { console.error("Error calculating bounds:", e); }

      } catch (err) {
        console.error('Error loading results data:', err);
        setError(`Failed to load results: ${err instanceof Error ? err.message : String(err)}. Please ensure previous steps are completed.`);
      } finally {
        setLoading(false);
      }
    };

    loadResultsData();
  }, [navigate]);

  const geoJSONForMap = useMemo(() => {
    if (segments.length === 0) return null;
    return {
      type: 'FeatureCollection' as const,
      features: segments.map(segment => ({
        type: 'Feature' as const,
        geometry: segment.geometry,
        properties: {
          ...segment.properties,
          id: segment.id,

          cviScore: segment.properties.vulnerabilityIndex,
          cviCategory: getCviCategory(segment.properties.vulnerabilityIndex ?? null, segment.properties.vulnerabilityFormula),
        },
      })),
    };
  }, [segments]);

  const cviStatistics = useMemo(() => {
    const segmentsWithScores = segments.filter(s => s.properties.vulnerabilityIndex !== undefined && s.properties.vulnerabilityIndex !== null);
    if (segmentsWithScores.length === 0) return null;

    const scores = segmentsWithScores.map(s => s.properties.vulnerabilityIndex as number);
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;

    let veryLowCount = 0;
    let lowCount = 0;
    let moderateCount = 0;
    let highCount = 0;
    let veryHighCount = 0;
    segmentsWithScores.forEach(segment => {
      const score = segment.properties.vulnerabilityIndex as number;
      const formula = segment.properties.vulnerabilityFormula;
      const category = getCviCategory(score, formula);
      if (category === 'Very Low') veryLowCount++;
      else if (category === 'Low') lowCount++;
      else if (category === 'Moderate') moderateCount++;
      else if (category === 'High') highCount++;
      else if (category === 'Very High') veryHighCount++;
    });

    return {
      min: min.toFixed(2),
      max: max.toFixed(2),
      avg: avg.toFixed(2),
      count: scores.length,
      totalSegments: segments.length,
      categories: { veryLow: veryLowCount, low: lowCount, moderate: moderateCount, high: highCount, veryHigh: veryHighCount }
    };
  }, [segments]);

  const handleStartNew = () => {
    navigate('/shoreline');
  };

  const handleGoBack = () => {
    navigate('/parameter-assignment');
  };

  const handleExportGeoJSON = useCallback(() => {
    if (segments.length === 0) {
      setError("No segment data available to export.");
      return;
    }
    setError(null);

    try {
      const exportFeatures = segments.map(segment => {
        const exportProperties: ShorelineSegmentProperties & { cvi_score?: number; cvi_category?: string } = {
          ...segment.properties,
          cvi_score: segment.properties.vulnerabilityIndex,
          cvi_category: getCviCategory(segment.properties.vulnerabilityIndex ?? null, segment.properties.vulnerabilityFormula),
        };

        return {
          type: 'Feature' as const,
          geometry: segment.geometry,
          properties: exportProperties,
        };
      });

      const exportFeatureCollection: FeatureCollection = {
        type: 'FeatureCollection',
        features: exportFeatures as Feature[],
      };

      const jsonString = JSON.stringify(exportFeatureCollection, null, 2);
      const blob = new Blob([jsonString], { type: 'application/geo+json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cvic_results.geojson';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log("GeoJSON export triggered.");

    } catch (err) {
      console.error("Error exporting GeoJSON:", err);
      setError(`Failed to export GeoJSON: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, [segments]);

  const handleExportHtmlReport = useCallback(async () => {
    if (segments.length === 0) {
      setError("No segment data available to export.");
      return;
    }

    if (!mapContainerRef.current) {
      setError("Map container not found. Please try again.");
      return;
    }

    setError(null);
    setExportingHtml(true);

    try {
      // Find the map element inside the container
      const mapElement = mapContainerRef.current.querySelector('#map');

      if (!mapElement) {
        throw new Error("Map element not found in the DOM");
      }

      // Ensure all map layers are fully loaded before capture
      console.log("Preparing map for capture...");

      // Get the Leaflet map instance if available
      const mapInstance = (window as any).L?.Maps?.[0] as any;
      if (mapInstance) {
        try {
          // Stop any ongoing animations or movements
          if (mapInstance.stop) {
            mapInstance.stop();
          }

          // Force a map redraw to ensure all layers are properly rendered
          if (mapInstance.invalidateSize) {
            mapInstance.invalidateSize({ animate: false });
          }

          // Make sure all tiles are loaded
          const tileLoadPromise = new Promise<void>((resolve) => {
            if (mapInstance.isLoading && mapInstance.isLoading()) {
              mapInstance.once('load', () => {
                console.log("Map tiles fully loaded");
                resolve();
              });

              // Set a timeout in case the load event doesn't fire
              setTimeout(() => {
                console.log("Map load timeout reached, continuing anyway");
                resolve();
              }, 2000);
            } else {
              resolve();
            }
          });

          // Wait for tiles to load
          await tileLoadPromise;

          // Ensure GeoJSON layer is fully rendered
          const geoJSONLayer = mapInstance._layers && Object.values(mapInstance._layers).find(
            (layer: any) => layer.feature || (layer.getLayers && typeof layer.getLayers === 'function')
          );

          if (geoJSONLayer) {
            // If it's a feature group or layer group, make sure all sublayers are visible
            if (geoJSONLayer.getLayers && typeof geoJSONLayer.getLayers === 'function') {
              const subLayers = geoJSONLayer.getLayers();
              subLayers.forEach((layer: any) => {
                if (layer.bringToFront && typeof layer.bringToFront === 'function') {
                  layer.bringToFront();
                }
              });
            }

            // Bring the entire GeoJSON layer to front
            if (geoJSONLayer.bringToFront && typeof geoJSONLayer.bringToFront === 'function') {
              geoJSONLayer.bringToFront();
            }
          }

          // Wait for any DOM updates to complete
          await new Promise(resolve => setTimeout(resolve, 800));

          console.log("Map prepared for capture.");
        } catch (prepError) {
          console.warn("Error during map preparation:", prepError);
          // Continue anyway, the capture might still work
        }
      } else {
        console.warn("Could not access Leaflet map instance for preparation.");
      }

      // Capture the map as an image with a retry mechanism
      let mapImageDataUrl: string | null = null;
      let attempts = 0;
      const maxAttempts = 3;

      while (!mapImageDataUrl && attempts < maxAttempts) {
        attempts++;
        try {
          console.log(`Capturing map image (attempt ${attempts}/${maxAttempts})...`);
          mapImageDataUrl = await captureMap(mapElement as HTMLElement);
        } catch (captureErr) {
          console.error(`Map capture attempt ${attempts} failed:`, captureErr);
          if (attempts < maxAttempts) {
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 500));
          } else {
            throw captureErr;
          }
        }
      }

      if (!mapImageDataUrl) {
        throw new Error("Failed to capture map after multiple attempts");
      }

      console.log("Map captured successfully, generating report...");

      // Generate the HTML report
      const htmlContent = generateHtmlReport(
        segments,
        parameters,
        cviStatistics,
        usedFormula,
        mapImageDataUrl
      );

      // Create a blob and download the HTML file
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cvic_report.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log("HTML report export completed successfully.");
    } catch (err) {
      console.error("Error exporting HTML report:", err);
      setError(`Failed to export HTML report: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setExportingHtml(false);
    }
  }, [segments, parameters, cviStatistics, usedFormula]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 pb-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
          Coastal Vulnerability Index Results
        </span>
      </h1>

      {/* Index Information */}
      {selectedIndex && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Index Used: {selectedIndex.name}
            </h2>
            <div className="flex gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {selectedIndex.formula}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {selectedIndex.requiredParameters.length} parameters
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                equal weights
              </span>
            </div>
          </div>
        </div>
      )}

      <ErrorAlert message={error} onClose={() => setError(null)} />

      {/* Main content grid - Top section with map and summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

        {/* Left Column: Map */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md overflow-hidden min-h-[600px] flex flex-col border border-gray-100">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Vulnerability Map</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Shoreline segments colored by calculated CVI score. Click segments for details.
          </p>
          <div className="flex-grow h-full border rounded-lg overflow-hidden shadow-inner" ref={mapContainerRef}>
            {geoJSONForMap ? (
              <Map
                geoJSON={geoJSONForMap}
                segments={segments}
                parameters={parameters}
                selectedSegments={[]}
                selectedParameter={null}
                selectionPolygons={[]}
                onSegmentSelect={(segmentId) => console.log("Segment clicked:", segmentId)}
                onSelectionDelete={() => {}}
                onAreaSelect={() => {}}
                isEditing={false}
                initialBounds={mapBounds}
                stylingMode="cvi"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                {error ? 'Error loading map data.' : 'No results data to display on map.'}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Summary & Legend */}
        <div className="lg:col-span-1 space-y-8">
          {/* Summary Statistics */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Summary Statistics
            </h2>
            {cviStatistics ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    Calculated for <span className="font-medium">{cviStatistics.count}</span> of <span className="font-medium">{cviStatistics.totalSegments}</span> segments.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xs text-gray-500 uppercase block">Min CVI</span>
                      <p className="text-lg font-medium text-gray-800">{cviStatistics.min}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xs text-gray-500 uppercase block">Avg CVI</span>
                      <p className="text-lg font-medium text-gray-800">{cviStatistics.avg}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xs text-gray-500 uppercase block">Max CVI</span>
                      <p className="text-lg font-medium text-gray-800">{cviStatistics.max}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-1">
                  <span className="text-xs text-gray-500 uppercase block mb-3 font-medium">Segment Counts by Category</span>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-600 rounded-full mr-2 border border-green-700"></span>
                      <span className="text-sm text-gray-700 flex-grow">Very Low</span>
                      <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded-md min-w-[2rem] text-center">{cviStatistics.categories.veryLow}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-lime-500 rounded-full mr-2 border border-lime-600"></span>
                      <span className="text-sm text-gray-700 flex-grow">Low</span>
                      <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded-md min-w-[2rem] text-center">{cviStatistics.categories.low}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2 border border-yellow-500"></span>
                      <span className="text-sm text-gray-700 flex-grow">Moderate</span>
                      <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded-md min-w-[2rem] text-center">{cviStatistics.categories.moderate}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-orange-500 rounded-full mr-2 border border-orange-600"></span>
                      <span className="text-sm text-gray-700 flex-grow">High</span>
                      <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded-md min-w-[2rem] text-center">{cviStatistics.categories.high}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-600 rounded-full mr-2 border border-red-700"></span>
                      <span className="text-sm text-gray-700 flex-grow">Very High</span>
                      <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded-md min-w-[2rem] text-center">{cviStatistics.categories.veryHigh}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No CVI statistics available.</p>
            )}
          </div>

          {/* Legend */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Map Legend
            </h2>
            <div className="bg-gray-50 p-3 rounded-lg">
              <CviLegend />
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleGoBack}
                className="w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center"
                title="Return to the parameter assignment and CVI calculation page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Parameter Assignment
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* GeoJSON Export Button */}
                <button
                  onClick={handleExportGeoJSON}
                  disabled={segments.length === 0 || loading}
                  className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  title="Download the results as a GeoJSON file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  GeoJSON
                </button>

                {/* HTML Report Export Button */}
                <button
                  onClick={handleExportHtmlReport}
                  disabled={segments.length === 0 || loading || exportingHtml}
                  className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  title="Download a complete HTML report with map, statistics, and legend"
                >
                  {exportingHtml ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      HTML Report
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleStartNew}
                className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center"
                title="Start a new analysis from the beginning (clears current data)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Start New Analysis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section - Full width below the map */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>
          Vulnerability Analysis Charts
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Visualization of coastal vulnerability data across analyzed shoreline segments.
        </p>
        {cviStatistics ? (
          <CviCharts
            segments={segments}
            parameters={parameters}
            cviStatistics={cviStatistics}
          />
        ) : (
          <p className="text-gray-500 italic">No CVI data available for charts</p>
        )}
      </div>
    </div>
  );
}
