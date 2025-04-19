// ---- File: src/pages/ResultsPage.tsx ----
import React, { useState, useEffect, useMemo, useCallback } from 'react'; // Added useCallback
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
// @ts-ignore - Suppress TS error for Turf module resolution issues
import * as turf from '@turf/turf';
import { indexedDBService } from '../services/indexedDBService';
import Map from '../components/maps/Map';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { CviLegend } from '../components/results/CviLegend';
import type { ShorelineSegment, Parameter, Formula, ShorelineSegmentProperties } from '../types'; // Added ShorelineSegmentProperties
import type { FeatureCollection, LineString, MultiLineString, Feature } from 'geojson'; // Added Feature
import { getCviCategory } from '../utils/vulnerabilityMapping';
import { availableFormulas } from '../config/formulas';

/**
 * Page to display the final CVI results on a map and summary statistics.
 */
export default function ResultsPage() {
  const navigate = useNavigate();
  const [segments, setSegments] = useState<ShorelineSegment[]>([]);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [usedFormula, setUsedFormula] = useState<Formula | null>(null);
  const [mapBounds, setMapBounds] = useState<L.LatLngBoundsExpression | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from IndexedDB
  useEffect(() => {
    const loadResultsData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Loading data for Results Page...");

        // Load Segments
        const segmentData = await indexedDBService.getShorelineData('current-segments');
        if (!segmentData || !segmentData.features || segmentData.features.length === 0) {
          throw new Error('No segments found. Please complete previous steps.');
        }

        const loadedSegments = segmentData.features
          .filter(feature => feature && feature.geometry && (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') && feature.properties?.vulnerabilityIndex !== undefined)
          .map((feature, index) => {
            // Ensure segment structure matches ShorelineSegment, especially properties
            const properties = feature.properties || {};
            return {
              id: properties.id || `segment-${index + 1}`,
              type: 'Feature' as const,
              geometry: feature.geometry as LineString | MultiLineString,
              properties: {
                ...properties,
                id: properties.id || `segment-${index + 1}`, // Ensure ID
                vulnerabilityIndex: properties.vulnerabilityIndex,
                vulnerabilityFormula: properties.vulnerabilityFormula,
                // Ensure parameters exists within properties for export consistency
                parameters: properties.parameters || {}
              },
              parameters: properties.parameters || {} // Ensure direct parameters exists
            };
          });

        if (loadedSegments.length === 0) {
          throw new Error('No segments with calculated CVI scores found. Please calculate CVI first.');
        }
        console.log(`Loaded ${loadedSegments.length} segments with CVI scores.`);
        setSegments(loadedSegments as ShorelineSegment[]);

        // Determine used formula from the first segment
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


        // Load Parameters (optional, could be useful for context)
        const parameterData = await indexedDBService.getShorelineData('current-parameters');
        if (parameterData && parameterData.features) {
          const loadedParameters = parameterData.features
            .map(feature => feature.properties as Parameter)
            .filter((p): p is Parameter => p !== null && p.enabled === true);
          setParameters(loadedParameters);
          console.log(`Loaded ${loadedParameters.length} enabled parameters.`);
        }

        // Calculate map bounds
        const featuresForBounds = loadedSegments.map(s => ({ type: 'Feature' as const, geometry: s.geometry, properties: {} }));
        const fc = turf.featureCollection(featuresForBounds);
        try {
          const bbox = turf.bbox(fc);
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

  // Prepare GeoJSON for the map, styling based on CVI
  const geoJSONForMap = useMemo(() => {
    if (segments.length === 0) return null;
    return {
      type: 'FeatureCollection' as const,
      features: segments.map(segment => ({
        type: 'Feature' as const,
        geometry: segment.geometry,
        properties: {
          ...segment.properties, // Include all original properties
          id: segment.id, // Ensure ID is present for selection/interaction
          // Add CVI score directly for easier access in map styling/popups
          cviScore: segment.properties.vulnerabilityIndex,
          cviCategory: getCviCategory(segment.properties.vulnerabilityIndex ?? null), // Use null if undefined
        },
      })),
    };
  }, [segments]);

  // Calculate CVI statistics
  const cviStatistics = useMemo(() => {
    const scores = segments.map(s => s.properties.vulnerabilityIndex).filter(score => score !== undefined && score !== null) as number[];
    if (scores.length === 0) return null;

    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;

    let veryLowCount = 0;
    let lowCount = 0;
    let moderateCount = 0;
    let highCount = 0;
    let veryHighCount = 0;
    scores.forEach(score => {
      const category = getCviCategory(score);
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
      totalSegments: segments.length, // Include total segments for context
      categories: { veryLow: veryLowCount, low: lowCount, moderate: moderateCount, high: highCount, veryHigh: veryHighCount }
    };
  }, [segments]);

  const handleStartNew = () => {
    // Optional: Clear IndexedDB before starting new? Or just navigate?
    // Consider adding a confirmation dialog.
    navigate('/shoreline');
  };

  const handleGoBack = () => {
    navigate('/parameter-assignment');
  };

  // Handler for exporting GeoJSON
  const handleExportGeoJSON = useCallback(() => {
    if (segments.length === 0) {
      setError("No segment data available to export.");
      return;
    }
    setError(null); // Clear previous errors

    try {
      // 1. Prepare the features for export
      const exportFeatures = segments.map(segment => {
        // Create a properties object for export, including CVI details
        const exportProperties: ShorelineSegmentProperties & { cvi_score?: number; cvi_category?: string } = {
          ...segment.properties, // Include all original properties
          cvi_score: segment.properties.vulnerabilityIndex, // Add explicit CVI score field
          cvi_category: getCviCategory(segment.properties.vulnerabilityIndex ?? null), // Add explicit category
        };
        // Optional: remove the nested 'parameters' from the export properties if it feels redundant
        // delete exportProperties.parameters;

        return {
          type: 'Feature' as const,
          geometry: segment.geometry,
          properties: exportProperties,
        };
      });

      // 2. Create the FeatureCollection
      const exportFeatureCollection: FeatureCollection = {
        type: 'FeatureCollection',
        features: exportFeatures as Feature[], // Cast because exportProperties might have extra fields
      };

      // 3. Convert to JSON string
      const jsonString = JSON.stringify(exportFeatureCollection, null, 2); // Pretty print with 2 spaces

      // 4. Create a Blob
      const blob = new Blob([jsonString], { type: 'application/geo+json' });

      // 5. Create a download link and trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cvic_results.geojson'; // Filename for the download
      document.body.appendChild(a); // Append to body to ensure click works
      a.click();

      // 6. Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log("GeoJSON export triggered.");

    } catch (err) {
      console.error("Error exporting GeoJSON:", err);
      setError(`Failed to export GeoJSON: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, [segments]); // Dependency: segments array

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Coastal Vulnerability Index Results</h1>

      <ErrorAlert message={error} onClose={() => setError(null)} />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Map */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow overflow-hidden min-h-[600px] flex flex-col">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Vulnerability Map</h2>
           <p className="text-sm text-gray-600 mb-4">
            Shoreline segments colored by calculated CVI score. Click segments for details. Formula used: <span className="font-medium">{usedFormula?.name || 'Unknown'}</span>.
           </p>
          <div className="flex-grow h-full border rounded">
            {geoJSONForMap ? (
              <Map
                geoJSON={geoJSONForMap}
                segments={segments} // Pass segments for potential popups/interactions if needed
                parameters={parameters} // Pass parameters if needed for context
                selectedSegments={[]} // No selection state needed here typically
                selectedParameter={null} // No parameter selection needed
                selectionPolygons={[]}
                onSegmentSelect={(segmentId) => console.log("Segment clicked:", segmentId)} // Basic click handler for now
                onSelectionDelete={() => {}}
                onAreaSelect={() => {}}
                isEditing={false} // Not editing on results page
                initialBounds={mapBounds}
                stylingMode="cvi" // Tell Map component to style by CVI score
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                {error ? 'Error loading map data.' : 'No results data to display on map.'}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Summary & Legend */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Summary Statistics</h2>
            {cviStatistics ? (
              <div className="space-y-3">
                 <p className="text-sm text-gray-600">
                    Calculated for <span className="font-medium">{cviStatistics.count}</span> of <span className="font-medium">{cviStatistics.totalSegments}</span> segments.
                 </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-500 uppercase">Min CVI</span>
                    <p className="text-lg font-medium text-gray-800">{cviStatistics.min}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase">Max CVI</span>
                    <p className="text-lg font-medium text-gray-800">{cviStatistics.max}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-gray-500 uppercase">Average CVI</span>
                    <p className="text-lg font-medium text-gray-800">{cviStatistics.avg}</p>
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t">
                  <span className="text-xs text-gray-500 uppercase block mb-1">Segment Counts by Category</span>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-700">Very Low:</span>
                    <span className="font-medium text-gray-800">{cviStatistics.categories.veryLow}</span>
                  </div>
                   <div className="flex justify-between items-center">
                    <span className="text-sm text-lime-600">Low:</span>
                    <span className="font-medium text-gray-800">{cviStatistics.categories.low}</span>
                  </div>
                   <div className="flex justify-between items-center">
                    <span className="text-sm text-yellow-600">Moderate:</span>
                    <span className="font-medium text-gray-800">{cviStatistics.categories.moderate}</span>
                  </div>
                   <div className="flex justify-between items-center">
                    <span className="text-sm text-orange-600">High:</span>
                    <span className="font-medium text-gray-800">{cviStatistics.categories.high}</span>
                  </div>
                   <div className="flex justify-between items-center">
                    <span className="text-sm text-red-700">Very High:</span>
                    <span className="font-medium text-gray-800">{cviStatistics.categories.veryHigh}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No CVI statistics available.</p>
            )}
          </div>

          {/* Legend */}
          <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Map Legend</h2>
              <CviLegend />
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
             <h2 className="text-xl font-semibold mb-4 text-gray-700">Actions</h2>
             <div className="space-y-3">
                 <button
                   onClick={handleGoBack}
                   className="w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                   title="Return to the parameter assignment and CVI calculation page"
                 >
                   Back to Parameter Assignment
                 </button>
                 {/* Export Button Added Here */}
                  <button
                    onClick={handleExportGeoJSON}
                    disabled={segments.length === 0 || loading}
                    className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Download the results as a GeoJSON file"
                  >
                    Export Results (GeoJSON)
                  </button>
                 <button
                   onClick={handleStartNew}
                   className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                   title="Start a new analysis from the beginning (clears current data)"
                 >
                   Start New Analysis
                 </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}