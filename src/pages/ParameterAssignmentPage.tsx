// src/pages/ParameterAssignmentPage.tsx
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Parameter, ShorelineSegment, ParameterValue, SelectionPolygon, Formula, ParameterOption } from '../types';
import type { FeatureCollection, LineString, MultiLineString, Polygon as GeoJSONPolygon } from 'geojson';
import L from 'leaflet';
import { MapInteractionPanel } from '../components/parameters/MapInteractionPanel';
import { ParameterValuePanel } from '../components/parameters/ParameterValuePanel';
import { CviFormulaPanel } from '../components/parameters/CviFormulaPanel';
import { SegmentTablePanel } from '../components/parameters/SegmentTablePanel';
// @ts-ignore - Suppress TS error for Turf module resolution issues
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

  // Use the custom hook to manage data loading and state
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

  // Local UI State
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [activeParameter, setActiveParameter] = useState<Parameter | null>(null);
  const [selectionPolygons, setSelectionPolygons] = useState<SelectionPolygon[]>([]); // Keep for potential future use, though maybe not rendered
  // State related to value assignment (managed primarily via handlers)
  const [currentValueToApply, setCurrentValueToApply] = useState<string | null>(null);
  const [currentVulnerabilityToApply, setCurrentVulnerabilityToApply] = useState<number>(1);
  // State for CVI formula selection and calculation
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [cviScores, setCviScores] = useState<Record<string, number>>({});
  const [calculatingCvi, setCalculatingCvi] = useState<boolean>(false);
  const [pageError, setPageError] = useState<string | null>(null);


  // Effect to set initial parameter, formula, and CVI scores once data loads
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


  // Calculate completion percentage
  const completionPercentage = useMemo(() => {
    if (segments.length === 0 || parameters.length === 0) return 0;
    const totalPossibleValues = segments.length * parameters.length;
    let filledValues = 0;
    segments.forEach(segment => {
      parameters.forEach(param => {
        // Use direct parameters property for check
        if (segment.parameters && segment.parameters[param.id] !== undefined) filledValues++;
      });
    });
    return totalPossibleValues === 0 ? 0 : Math.round((filledValues / totalPossibleValues) * 100);
  }, [segments, parameters]);


  // Memoize the geoJSON for the map
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
            // Include CVI score if available, useful for map popups/tooltips even in parameter mode
            vulnerabilityIndex: segment.properties.vulnerabilityIndex,
            vulnerabilityFormula: segment.properties.vulnerabilityFormula,
        }
      }))
    };
  }, [segments, selectedSegments]);


  // --- Handlers ---

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
      // Delegate update logic and DB persistence to the utility function
      const updatedSegments = await applyParameterValueToSegments(
        segments,
        selectedSegments,
        activeParameter,
        currentValueToApply,
        currentVulnerabilityToApply
      );
      // Update local state AFTER successful persistence (handled within applyParameterValueToSegments)
      setSegments(updatedSegments); // This state update triggers re-renders
      console.log("Successfully applied value and updated segments state.");
      // Optional: Clear selection after applying? User might want to keep it.
      // handleClearSelection();
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
    // Re-check completion based on current segments and parameters state
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
      // Call the utility, passing state setters and the error handler
      await calculateAndSaveCVI(
        segments,
        parameters,
        selectedFormula,
        setSegments, // Pass setter for segment updates (stores CVI in properties)
        setCviScores, // Pass setter for CVI scores map
        handleError // Pass error handler
      );
      console.log("CVI calculation process finished successfully via utility.");
      // setSegments and setCviScores are called within calculateAndSaveCVI
    } catch (err) {
      // calculateAndSaveCVI should use handleError, but catch here as a fallback
      console.error("Error during CVI calculation process:", err);
      if (!pageError) { // Avoid overwriting specific error from calculateAndSaveCVI
          handleError(err instanceof Error ? err.message : 'CVI calculation failed.');
      }
      setCviScores({}); // Reset scores on failure
    } finally {
      setCalculatingCvi(false);
    }
  }, [segments, parameters, selectedFormula, setSegments, setCviScores, completionPercentage, pageError]); // Added pageError dependency


  // Handle area selection completion (polygon drawn on map)
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
            // Check for intersection using booleanIntersects for better accuracy
            if (turf.booleanIntersects(segment.geometry, selectionPolygonTurf)) {
                newlySelectedIds.push(segment.id);
            }
            // Alternative: Check if segment midpoint is within polygon (less accurate for long segments)
            // const midpoint = turf.midpoint(turf.feature(segment.geometry));
            // if (turf.booleanPointInPolygon(midpoint, selectionPolygonTurf)) {
            //     newlySelectedIds.push(segment.id);
            // }
        } catch (e) {
            console.warn(`Error checking intersection for segment ${segment.id}:`, e);
        }
    });

    console.log(`Found ${newlySelectedIds.length} segments intersecting the selected area.`);
    // Add newly selected segments to the existing selection, removing duplicates
    setSelectedSegments(prev => [...new Set([...prev, ...newlySelectedIds])]);

    // We don't store the selection polygon itself in state for rendering,
    // as it's usually temporary. The map clears the visual drawing.
    // const newPolygon: SelectionPolygon = { id: `polygon-${Date.now()}`, geometry };
    // setSelectionPolygons(prev => [...prev, newPolygon]);

  }, [segments]);


  const handleSelectionDelete = useCallback((polygonId: string) => {
    // This handler is kept for completeness but might not be actively used
    // if selection polygons aren't stored/rendered persistently.
    // If needed, it would remove a polygon from the `selectionPolygons` state.
    console.log("Selection polygon deletion requested (if applicable):", polygonId);
    setSelectionPolygons(prev => prev.filter(p => p.id !== polygonId));
  }, []);


  const handleContinue = useCallback(async () => {
    // Final checks before navigating
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
      // Data is already saved in IndexedDB via applyParameterValueToSegments and calculateAndSaveCVI
      navigate('/results'); // Navigate to the results display page
    } catch (err) {
      console.error('Error preparing to navigate or navigating:', err);
      handleError('Failed to proceed to results.');
    }
  }, [segments, parameters, cviScores, completionPercentage, navigate]);


  // Calculate CVI statistics for SegmentTablePanel
  const cviStatistics = useMemo(() => {
    const scores = Object.values(cviScores);
    if (scores.length === 0) return null;

    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;

    // Use CVI categories consistent with results page/legend
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


  // --- Render ---

  if (dataLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Loading assignment data...</p>
      </div>
    );
  }

  // Handle critical data loading errors
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

  // Render main page content if no critical errors
  return (
    // Use flex-col for the entire page container
    <div className="flex flex-col h-[calc(100vh-64px)] p-4 space-y-4 bg-gray-50"> {/* Adjust height based on nav height */}
      {/* Header - Takes its own space */}
      <ParameterAssignmentHeader
        title="5. Parameter Assignment & CVI Calculation"
        completionPercentage={completionPercentage}
      />

      {/* Page-level Error Display - Takes its own space */}
      <ErrorAlert message={pageError} onClose={() => handleError(null)} />

      {/* Main Content Area: Use CSS Grid to allocate space */}
      {/* Defines two rows: top takes flexible space (min 0), bottom takes min 250px, max 1 fraction */}
      {/* Use flex-grow on this grid container to make it fill the remaining vertical space */}
      {/* Give top row more weight (e.g., 2fr) and bottom row 1fr, respecting min height */}
      {/* Equal fractional growth, respecting minimum heights */}
      <div className="grid grid-rows-[minmax(400px,1fr)_minmax(250px,1fr)] gap-4 flex-grow overflow-hidden">

        {/* Top Row: Map and Controls (takes remaining space, internal scrolling if needed) */}
        {/* Apply overflow-hidden here to contain its children properly within the grid row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">

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

          {/* Right Column: Control Panels (Scrollable) */}
          {/* This column needs to scroll if its content overflows the space allocated by the grid row */}
          <div className="lg:col-span-1 flex flex-col space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {/* Parameter Value Assignment */}
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
            {/* CVI Formula Selection and Calculation */}
            <CviFormulaPanel
              selectedFormula={selectedFormula}
              onFormulaSelect={handleFormulaSelect}
              onCalculateCvi={handleCalculateCvi}
              completionPercentage={completionPercentage}
              calculatingCvi={calculatingCvi}
              cviScores={cviScores}
              segments={segments}
            />
            {/* Continue Button (Sticky at the bottom of this scrolling column) */}
            {/* Use `mt-auto` to push the button down if content is short, */}
            {/* `sticky bottom-0` keeps it visible when scrolling */}
            <div className="bg-white p-4 rounded-lg shadow sticky bottom-0 border-t border-gray-200 mt-auto">
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
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    Calculating...
                  </>
                ) : 'Continue to Results'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Segment Table */}
        {/* Apply overflow-hidden to contain the table panel within the row's bounds */}
        {/* The SegmentTablePanel component itself handles internal scrolling */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col overflow-hidden">
          {/* The SegmentTablePanel component needs flex-grow to fill this container */}
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
    </div> // End of page container
  );
}


// Add to index.css or a global style sheet for custom scrollbars (optional)
/*
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1; // Tailwind gray-300
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; // Tailwind gray-400
}
*/