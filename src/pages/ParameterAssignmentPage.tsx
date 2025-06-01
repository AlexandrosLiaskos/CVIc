// src/pages/ParameterAssignmentPage.tsx
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Parameter, SelectionPolygon, Formula } from '../types';
import type { Polygon as GeoJSONPolygon } from 'geojson';
import { MapInteractionPanel } from '../components/parameters/MapInteractionPanel';
import { ParameterValuePanel } from '../components/parameters/ParameterValuePanel';
import { CviFormulaPanel } from '../components/parameters/CviFormulaPanel';
import { SegmentTablePanel } from '../components/parameters/SegmentTablePanel';
import * as turf from '@turf/turf';
import { useParameterAssignmentData } from '../hooks/useParameterAssignmentData';
import { applyParameterValueToSegments } from '../logic/valueAssignmentLogic';
import { calculateAndSaveCVI } from '../utils/cviCalculations';
import { availableFormulas } from '../config/formulas';
import { ParameterAssignmentHeader } from '../components/parameters/ParameterAssignmentHeader';
import { ErrorAlert } from '../components/common/ErrorAlert';


export default function ParameterAssignmentPage() {
  const navigate = useNavigate();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const {
    segments,
    setSegments,
    parameters,
    mapBounds,
    initialCviScores,
    initialFormula,
    loading: dataLoading,
    error: dataError,
    setError: setDataError
  } = useParameterAssignmentData();

  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [activeParameter, setActiveParameter] = useState<Parameter | null>(null);
  const [selectionPolygons, setSelectionPolygons] = useState<SelectionPolygon[]>([]);
  const [currentValueToApply, setCurrentValueToApply] = useState<string | null>(null);
  const [currentVulnerabilityToApply, setCurrentVulnerabilityToApply] = useState<number>(1);
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [cviScores, setCviScores] = useState<Record<string, number>>({});
  const [calculatingCvi, setCalculatingCvi] = useState<boolean>(false);
  const [pageError, setPageError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'parameters' | 'cvi'>('parameters');

  useEffect(() => {
    if (!dataLoading && parameters.length > 0 && !activeParameter) {
      setActiveParameter(parameters[0]);
    }
    if (!dataLoading && initialFormula && !selectedFormula) {
      setSelectedFormula(initialFormula);
    }
    if (!dataLoading && Object.keys(initialCviScores).length > 0 && Object.keys(cviScores).length === 0) {
      setCviScores(initialCviScores);
    }
  }, [dataLoading, parameters, initialFormula, initialCviScores, activeParameter, selectedFormula, cviScores]);

  const completionPercentage = useMemo(() => {
    if (segments.length === 0 || parameters.length === 0) return 0;
    const totalPossibleValues = segments.length * parameters.length;
    let filledValues = 0;
    segments.forEach(segment => {
      parameters.forEach(param => {
        if (segment.parameters && segment.parameters[param.id] !== undefined) filledValues++;
      });
    });
    return totalPossibleValues === 0 ? 0 : Math.round((filledValues / totalPossibleValues) * 100);
  }, [segments, parameters]);

  const geoJSONForMap = useMemo(() => {
    if (!segments || segments.length === 0) return null;
    return {
      type: 'FeatureCollection' as const,
      features: segments.map(segment => ({
        type: 'Feature' as const,
        geometry: segment.geometry,
        properties: {
            ...segment.properties,
            id: segment.id,
            isSelected: selectedSegments.includes(segment.id),
            vulnerabilityIndex: segment.properties.vulnerabilityIndex,
            vulnerabilityFormula: segment.properties.vulnerabilityFormula,
        }
      }))
    };
  }, [segments, selectedSegments]);

  const handleError = (message: string | null) => {
    setPageError(message);
    if (message) console.error("Error:", message);
  };

  const handleSegmentSelect = useCallback((segmentId: string) => {
    setSelectedSegments(prev => prev.includes(segmentId) ? prev.filter(id => id !== segmentId) : [...prev, segmentId]);
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedSegments(segments.map(s => s.id));
  }, [segments]);

  const handleClearSelection = useCallback(() => {
    setSelectedSegments([]);
  }, []);

  const handleParameterSelect = useCallback((parameterId: string) => {
    const parameter = parameters.find(p => p.id === parameterId);
    if (parameter) {
      setActiveParameter(parameter);
      setCurrentValueToApply(null);
      setCurrentVulnerabilityToApply(1);
      console.log("Parameter selected:", parameter.name);
      handleError(null);
    } else {
      console.error("Parameter not found:", parameterId);
      handleError("Selected parameter could not be found.");
    }
  }, [parameters]);

  const handleValueSelect = useCallback((value: string | null, vulnerability?: number) => {
    setCurrentValueToApply(value);
    setCurrentVulnerabilityToApply(vulnerability ?? 1);
    console.log(`Value staged for application: ${value}, Vulnerability: ${vulnerability ?? 1}`);
    handleError(null);
  }, []);

  const handleApplyValue = useCallback(async () => {
    if (!activeParameter || currentValueToApply === null || selectedSegments.length === 0) {
      const errorMsg = !activeParameter ? "Select a parameter first."
                     : currentValueToApply === null ? "Select a value first."
                     : "Select at least one segment on the map.";
      handleError(`Cannot apply value: ${errorMsg}`);
      return;
    }
    handleError(null);

    try {
      const updatedSegments = await applyParameterValueToSegments(
        segments,
        selectedSegments,
        activeParameter,
        currentValueToApply,
        currentVulnerabilityToApply
      );
      setSegments(updatedSegments);
      console.log("Successfully applied value and updated segments state.");
    } catch (err) {
      console.error('Error applying parameter value:', err);
      handleError(err instanceof Error ? err.message : 'Failed to apply value.');
    }
  }, [activeParameter, currentValueToApply, currentVulnerabilityToApply, segments, selectedSegments, setSegments]);

  const handleFormulaSelect = useCallback((formulaType: Formula['type'] | null) => {
    const formula = formulaType ? availableFormulas.find(f => f.type === formulaType) : null;
    setSelectedFormula(formula || null);
    console.log("Selected formula:", formula?.name ?? 'None');
    handleError(null);
  }, []);

  const handleCalculateCvi = useCallback(async () => {
    if (!selectedFormula) { handleError('Please select a CVI formula before calculating.'); return; }
    const allValuesAssigned = segments.every(segment =>
        parameters.every(param => segment.parameters && segment.parameters[param.id] !== undefined)
    );
     if (!allValuesAssigned || completionPercentage < 100) {
       handleError(`Cannot calculate CVI: Assign values for all parameters to all segments first. (${completionPercentage}% complete)`);
       return;
     }

    handleError(null);
    setCalculatingCvi(true);
    console.log(`Calculating CVI using: ${selectedFormula.name}`);

    try {
      await calculateAndSaveCVI(
        segments,
        parameters,
        selectedFormula,
        setSegments,
        setCviScores,
        handleError
      );
      console.log("CVI calculation process finished successfully via utility.");

    } catch (err) {

      console.error("Error during CVI calculation process:", err);
      if (!pageError) {
          handleError(err instanceof Error ? err.message : 'CVI calculation failed.');
      }
      setCviScores({});
    } finally {
      setCalculatingCvi(false);
    }
  }, [segments, parameters, selectedFormula, setSegments, setCviScores, completionPercentage, pageError]);

  const handleSelectionCreate = useCallback((geometry: GeoJSONPolygon) => {
    if (!geometry || !geometry.coordinates || geometry.coordinates.length === 0) {
      console.error("Invalid polygon geometry received for area selection");
      return;
    }

    console.log("Area selection polygon created, finding intersecting segments...");
    const selectionPolygonTurf = turf.polygon(geometry.coordinates);
    const newlySelectedIds: string[] = [];

    segments.forEach(segment => {
        try {

            if (turf.booleanIntersects(segment.geometry, selectionPolygonTurf)) {
                newlySelectedIds.push(segment.id);
            }

        } catch (e) {
            console.warn(`Error checking intersection for segment ${segment.id}:`, e);
        }
    });

    console.log(`Found ${newlySelectedIds.length} segments intersecting the selected area.`);
    setSelectedSegments(prev => [...new Set([...prev, ...newlySelectedIds])]);
  }, [segments]);


  const handleSelectionDelete = useCallback((polygonId: string) => {
    console.log("Selection polygon deletion requested (if applicable):", polygonId);
    setSelectionPolygons(prev => prev.filter(p => p.id !== polygonId));
  }, []);


  const handleContinue = useCallback(async () => {
    const allValuesAssigned = segments.every(segment =>
        parameters.every(param => segment.parameters && segment.parameters[param.id] !== undefined)
    );
    const cviCalculatedForAll = Object.keys(cviScores).length === segments.length;

    if (!allValuesAssigned || completionPercentage < 100) {
       handleError(`Assign values for all parameters to all segments first. (${completionPercentage}% complete)`);
       return;
    }
    if (!cviCalculatedForAll) {
       handleError(`Calculate CVI scores for all ${segments.length} segments first. (${Object.keys(cviScores).length} calculated)`);
       return;
    }

    handleError(null);

    try {
      console.log("All checks passed. Navigating to results page...");

      navigate('/results');
    } catch (err) {
      console.error('Error preparing to navigate or navigating:', err);
      handleError('Failed to proceed to results.');
    }
  }, [segments, parameters, cviScores, completionPercentage, navigate]);

  const cviStatistics = useMemo(() => {
    const scores = Object.values(cviScores);
    if (scores.length === 0) return null;

    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;

    let veryLowCount = 0, lowCount = 0, moderateCount = 0, highCount = 0, veryHighCount = 0;
    scores.forEach(score => {
        const rank = Math.round(score);
        if (rank <= 1) veryLowCount++;
        else if (rank === 2) lowCount++;
        else if (rank === 3) moderateCount++;
        else if (rank === 4) highCount++;
        else if (rank >= 5) veryHighCount++;
    });

    return {
      min: min.toFixed(2),
      max: max.toFixed(2),
      avg: avg.toFixed(2),
      count: scores.length,
      categories: {
        veryLow: veryLowCount, low: lowCount, moderate: moderateCount, high: highCount, veryHigh: veryHighCount
      }
    };
  }, [cviScores]);

  if (dataLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Loading assignment data...</p>
      </div>
    );
  }

  if (dataError) {
     return (
       <div className="p-4 max-w-lg mx-auto mt-10 text-center">
         <ErrorAlert message={dataError} onClose={() => setDataError(null)} />
         <button onClick={() => navigate('/')} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
             Go Home
         </button>
       </div>
     );
   }

  return (
    <div className="flex flex-col h-screen bg-gray-50"> {/* Use full screen height */}
      <div className="max-w-5xl mx-auto w-full px-8 py-4 flex flex-col h-full"> {/* Much more white space with smaller max-width and larger padding */}
        {/* Header - Compact */}
        <div className="flex-shrink-0">
          <ParameterAssignmentHeader
            title="5. Parameter Assignment & CVI Calculation"
            completionPercentage={completionPercentage}
          />
        </div>

        {/* Page-level Error Display - Compact */}
        {pageError && (
          <div className="flex-shrink-0">
            <ErrorAlert message={pageError} onClose={() => handleError(null)} />
          </div>
        )}

        {/* Main Content Area: Normal page flow for natural scrolling */}
        {/* Map gets fixed height, table flows naturally with page scroll */}
        <div className="flex flex-col gap-4 flex-grow">

          {/* Map Section: Balanced height that doesn't dominate the screen */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 h-[500px] bg-transparent relative z-20">

            {/* Left Column: Map Interaction Panel */}
            <div className="lg:col-span-2 flex flex-col h-full overflow-hidden"> {/* Ensures map panel fills its column space */}
              {/* MapInteractionPanel itself should manage its internal layout/scrolling */}
              <div className="flex-grow overflow-hidden"> {/* Let MapInteractionPanel fill this */}
                <MapInteractionPanel
                  segments={segments}
                  parameters={parameters}
                  geoJSON={geoJSONForMap}
                  initialBounds={mapBounds}
                  selectionPolygons={selectionPolygons}
                  selectedSegmentIds={selectedSegments}
                  selectedParameterId={activeParameter?.id ?? null}
                  onSegmentSelect={handleSegmentSelect}
                  onSelectAll={handleSelectAll}
                  onClearSelection={handleClearSelection}
                  onSelectionDelete={handleSelectionDelete}
                  onAreaSelect={handleSelectionCreate}
                  mapContainerRef={mapContainerRef}
                />
              </div>
            </div>

            {/* Right Column: Tabbed Control Panels */}
            <div className="lg:col-span-1 flex flex-col h-full">
              {/* Tab Navigation */}
              <div className="flex bg-gray-100 rounded-t-lg">
                <button
                  onClick={() => setActiveTab('parameters')}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-tl-lg transition-colors ${
                    activeTab === 'parameters'
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Parameter Assignment
                </button>
                <button
                  onClick={() => setActiveTab('cvi')}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-tr-lg transition-colors ${
                    activeTab === 'cvi'
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  CVI Calculation
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-grow bg-white rounded-b-lg overflow-y-auto p-4 relative">
                {activeTab === 'parameters' ? (
                  <ParameterValuePanel
                    parameters={parameters}
                    activeParameter={activeParameter}
                    selectedValue={currentValueToApply}
                    selectedVulnerability={currentVulnerabilityToApply}
                    onParameterSelect={handleParameterSelect}
                    onValueSelect={handleValueSelect}
                    onApplyValue={handleApplyValue}
                    selectedSegmentIds={selectedSegments}
                  />
                ) : (
                  <CviFormulaPanel
                    selectedFormula={selectedFormula}
                    onFormulaSelect={handleFormulaSelect}
                    onCalculateCvi={handleCalculateCvi}
                    completionPercentage={completionPercentage}
                    calculatingCvi={calculatingCvi}
                    cviScores={cviScores}
                    segments={segments}
                  />
                )}
              </div>

              {/* Continue Button - Only show in CVI tab when ready */}
              {activeTab === 'cvi' && (
                <div className="bg-white p-4 rounded-b-lg border-t border-gray-200">
                  <button
                    onClick={handleContinue}
                    className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
                    disabled={completionPercentage < 100 || Object.keys(cviScores).length !== segments.length || calculatingCvi}
                    title={
                       completionPercentage < 100 ? `Complete parameter assignment (${completionPercentage}%) first`
                       : Object.keys(cviScores).length !== segments.length ? `Calculate CVI for all ${segments.length} segments first (${Object.keys(cviScores).length} done)`
                       : calculatingCvi ? 'Calculation in progress...'
                       : 'Proceed to results visualization'
                    }
                  >
                    {calculatingCvi ? (
                      <>
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C0 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        Calculating...
                      </>
                    ) : 'Continue to Results'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Table Section: Natural height, flows with page scroll - Properly separated */}
          <div className="bg-white p-6 rounded-lg shadow mt-4 relative z-10 clear-both">
            <SegmentTablePanel
              segments={segments}
              parameters={parameters}
              selectedSegmentIds={selectedSegments}
              onSegmentSelect={handleSegmentSelect}
              cviScores={cviScores}
              selectedFormula={selectedFormula}
              cviStatistics={cviStatistics}
            />
          </div>

        </div> {/* End of main content grid */}
      </div> {/* End of max-width container */}
    </div>
  );
}
