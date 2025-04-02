import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Parameter, ShorelineSegment, ParameterValue, SelectionPolygon, Formula, ParameterOption } from '../types';
import type { FeatureCollection, LineString, MultiLineString, Polygon as GeoJSONPolygon } from 'geojson';
import L from 'leaflet';
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
  const [selectionPolygons, setSelectionPolygons] = useState<SelectionPolygon[]>([]);
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
    // Reason: Ensure initial formula from hook is set only once
    if (!dataLoading && initialFormula && !selectedFormula) {
      setSelectedFormula(initialFormula);
    }
    // Reason: Ensure initial CVI scores from hook are set only once
    if (!dataLoading && Object.keys(initialCviScores).length > 0 && Object.keys(cviScores).length === 0) {
      setCviScores(initialCviScores);
    }
  // Dependencies ensure this effect runs when data finishes loading or initial values change
  }, [dataLoading, parameters, initialFormula, initialCviScores, activeParameter, selectedFormula, cviScores]);


  // Calculate completion percentage
  const completionPercentage = useMemo(() => {
    // Reason: Avoid calculation if data isn't loaded
    if (segments.length === 0 || parameters.length === 0) return 0;
    const totalPossibleValues = segments.length * parameters.length;
    let filledValues = 0;
    // Reason: Iterate through segments and parameters to count assigned values
    segments.forEach(segment => {
      parameters.forEach(param => {
        // Read from the direct parameters property, assumed synced
        if (segment.parameters && segment.parameters[param.id] !== undefined) filledValues++;
      });
    });
    return Math.round((filledValues / totalPossibleValues) * 100);
  // Dependencies ensure recalculation when segments or parameters change
  }, [segments, parameters]);


  // Memoize the geoJSON for the map
  const geoJSONForMap = useMemo(() => {
    // Reason: Prevent re-rendering of the map if only selection changes without segment data changing
    if (!segments || segments.length === 0) return null; // Handle empty segments
    return {
      type: 'FeatureCollection' as const,
      features: segments.map(segment => ({
        type: 'Feature' as const,
        geometry: segment.geometry,
        // Ensure properties passed to map include necessary fields like id and isSelected
        properties: {
            ...segment.properties, // Spread original properties
            id: segment.id,
            isSelected: selectedSegments.includes(segment.id)
        }
      }))
    };
  // Dependencies ensure regeneration when segment data or selection changes
  }, [segments, selectedSegments]);


  // --- Handlers ---

  // Generic error handler for UI feedback
  const handleError = (message: string | null) => {
    setPageError(message);
    if (message) console.error("Error:", message);
  };

  // Toggle segment selection state
  const handleSegmentSelect = useCallback((segmentId: string) => {
    // Reason: Update selected segments array immutably
    setSelectedSegments(prev => prev.includes(segmentId) ? prev.filter(id => id !== segmentId) : [...prev, segmentId]);
  // No dependencies needed as it only relies on its argument and previous state
  }, []);

  // Select all segments currently loaded
  const handleSelectAll = useCallback(() => {
    // Reason: Set selection to all segment IDs
    setSelectedSegments(segments.map(s => s.id));
  // Dependency on segments ensures it uses the current segment list
  }, [segments]);

  // Clear all selected segments
  const handleClearSelection = useCallback(() => {
    // Reason: Reset selection to an empty array
    setSelectedSegments([]);
    console.log("Selection cleared."); // Add console log for debugging
  // No dependencies needed
  }, []);

  // Set the active parameter for value assignment
  const handleParameterSelect = useCallback((parameterId: string) => {
    const parameter = parameters.find(p => p.id === parameterId);
    if (parameter) {
      setActiveParameter(parameter);
      setCurrentValueToApply(null); // Reset staged value
      setCurrentVulnerabilityToApply(1); // Reset staged vulnerability
      console.log("Parameter selected:", parameter.name);
      handleError(null); // Clear potential errors from previous selections
    } else {
      console.error("Parameter not found:", parameterId);
      handleError("Selected parameter could not be found.");
    }
  // Dependency on parameters ensures the correct parameter object is found
  }, [parameters]);

  // Stage the value and vulnerability selected in the ParameterValuePanel
  const handleValueSelect = useCallback((value: string | null, vulnerability?: number) => {
    // Reason: Update state with the value/vulnerability to be applied
    setCurrentValueToApply(value);
    setCurrentVulnerabilityToApply(vulnerability ?? 1);
    console.log(`Value staged for application: ${value}, Vulnerability: ${vulnerability ?? 1}`);
    handleError(null); // Clear potential errors from previous selections
  // No dependencies needed as it only relies on its arguments
  }, []);

  // Apply the staged value/vulnerability to the selected segments
  const handleApplyValue = useCallback(async () => {
    // Reason: Validate prerequisites before attempting to apply
    if (!activeParameter || currentValueToApply === null || selectedSegments.length === 0) {
      const errorMsg = !activeParameter ? "Select a parameter first."
                     : currentValueToApply === null ? "Select a value first."
                     : "Select at least one segment on the map.";
      handleError(`Cannot apply value: ${errorMsg}`);
      return;
    }
    handleError(null); // Clear error on successful attempt start

    // Reason: Delegate the core logic and DB update to the utility function
    try {
      const updatedSegments = await applyParameterValueToSegments(
        segments,
        selectedSegments,
        activeParameter,
        currentValueToApply,
        currentVulnerabilityToApply
      );
      // Update local state with the result (which includes DB persistence)
      setSegments(updatedSegments);
      console.log("Successfully applied value and updated segments state.");
      // Optionally clear selection after applying
      // handleClearSelection();
    } catch (err) {
      console.error('Error applying parameter value:', err);
      handleError(err instanceof Error ? err.message : 'Failed to apply value.');
    }
  // Dependencies ensure the handler uses the latest state for application
  }, [activeParameter, currentValueToApply, currentVulnerabilityToApply, segments, selectedSegments, setSegments]);

  // Update the selected CVI calculation formula
  const handleFormulaSelect = useCallback((formulaType: Formula['type'] | null) => {
    // Reason: Find the full Formula object based on the selected type
    const formula = formulaType ? availableFormulas.find(f => f.type === formulaType) : null;
    setSelectedFormula(formula || null); // Ensure it's null if not found or type is null
    console.log("Selected formula:", formula?.name ?? 'None');
    handleError(null);
  // No dependencies needed as it uses the constant availableFormulas
  }, []);

  // Trigger the CVI calculation process
  const handleCalculateCvi = useCallback(async () => {
    // Reason: Central place for all pre-calculation checks.
    if (!selectedFormula) { handleError('Please select a CVI formula before calculating.'); return; }
    const allValuesAssigned = segments.every(segment =>
      parameters.every(param => segment.parameters && segment.parameters[param.id] !== undefined)
    );
    // Reason: Check both logical completeness and the derived percentage state.
    if (!allValuesAssigned || completionPercentage < 100) {
       handleError(`Cannot calculate CVI: Assign values for all parameters to all segments first. (Completion: ${completionPercentage}%)`);
       return;
    }

    handleError(null);
    setCalculatingCvi(true);
    console.log(`Calculating CVI using: ${selectedFormula.name}`);

    // Reason: Delegate the calculation and saving logic to the utility function
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
    } catch (err) {
      // This catch block might be redundant if calculateAndSaveCVI handles its own errors via setError
      console.error("Error during CVI calculation process:", err);
      handleError(err instanceof Error ? err.message : 'CVI calculation failed.');
      setCviScores({}); // Reset scores on failure
    } finally {
      setCalculatingCvi(false); // Ensure this runs regardless of success/failure
    }
  // Dependencies ensure the handler uses the latest data and selections
  }, [segments, parameters, selectedFormula, setSegments, setCviScores, completionPercentage]);

  // Handle area selection completion (polygon drawn on map)
  const handleSelectionCreate = useCallback((geometry: GeoJSONPolygon) => {
    // Reason: Validate input geometry immediately.
    if (!geometry || !geometry.coordinates || geometry.coordinates.length === 0) {
      console.error("Invalid polygon geometry received for area selection");
      return;
    }

    console.log("Area selection polygon created, finding intersecting segments...");
    const selectionPolygonTurf = turf.polygon(geometry.coordinates);
    // Reason: Identify segments within the drawn polygon using robust point-in-polygon check.
    const newlySelectedIds: string[] = [];

    segments.forEach(segment => {
        try {
            const segmentFeature = turf.feature(segment.geometry);
            // Check intersection: Use midpoint check for efficiency and robustness against minor overlaps.
            const center = turf.centerOfMass(segmentFeature);
            if (turf.booleanPointInPolygon(center, selectionPolygonTurf)) {
                newlySelectedIds.push(segment.id);
            }
        } catch (e) {
            // Reason: Log errors during intersection checks without stopping the process.
            console.warn(`Error checking intersection for segment ${segment.id}:`, e);
        }
    });

    console.log(`Found ${newlySelectedIds.length} segments within the selected area.`);
    // Reason: Update the selection state immutably, removing duplicates using Set.
    setSelectedSegments(prev => [...new Set([...prev, ...newlySelectedIds])]);

    // Note: Storing the drawn polygon is commented out as it's often cleared visually immediately.
    // const newPolygon: SelectionPolygon = { id: `polygon-${Date.now()}`, geometry };
    // setSelectionPolygons(prev => [...prev, newPolygon]);

    // TODO: Confirm Map component clears the drawn layer after calling onAreaSelect.
    // Responsibility for clearing the visual polygon usually lies with the map component after event emission.
  // Dependency on segments ensures it checks against the current segment list
  }, [segments]);

  const handleSelectionDelete = useCallback((polygonId: string) => {
    // This might be less relevant if polygons are cleared immediately after selection
    setSelectionPolygons(prev => prev.filter(p => p.id !== polygonId));
  // No dependencies needed
  }, []);

  const handleContinue = useCallback(async () => {
    // Reason: Central place for all pre-navigation checks.
    const missingValues = segments.some(segment =>
      parameters.some(parameter => !segment.parameters || segment.parameters[parameter.id] === undefined)
    );
    // Reason: Ensure data integrity and CVI calculation before proceeding.
    if (missingValues || completionPercentage < 100) {
       handleError(`Assign values for all parameters to all segments first. (${completionPercentage}% complete)`);
       return;
    }
    if (Object.keys(cviScores).length !== segments.length) {
       handleError('Calculate CVI scores for all segments first.');
       return;
    }

    handleError(null);

    try {
      console.log("All checks passed. Navigating to results page...");
      // Note: calculateAndSaveCVI should handle saving segments with CVI. Final save here is redundant.
      navigate('/results'); // Navigate to the results display page
    } catch (err) {
      console.error('Error preparing to navigate or navigating:', err);
      handleError('Failed to proceed to results.');
    }
  // Dependencies ensure checks are based on the latest state before navigation
  }, [segments, parameters, cviScores, completionPercentage, navigate]);

  // Calculate CVI statistics for SegmentTablePanel
  const cviStatistics = useMemo(() => {
    const scores = Object.values(cviScores);
    // Reason: Avoid calculation if no scores are available
    if (scores.length === 0) return null;

    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;

    // Reason: Define vulnerability categories clearly for statistics.
    const lowCount = scores.filter(v => v < 2.5).length; // Example range
    const mediumCount = scores.filter(v => v >= 2.5 && v < 3.5).length; // Example range
    const highCount = scores.filter(v => v >= 3.5).length; // Example range

    return {
      min: min.toFixed(2),
      max: max.toFixed(2),
      avg: avg.toFixed(2),
      count: scores.length,
      categories: { low: lowCount, medium: mediumCount, high: highCount }
    };
  // Dependency ensures recalculation when scores change
  }, [cviScores]);

  // --- Render ---

  // Loading state from the hook
  if (dataLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Loading data...</p>
      </div>
    );
  }

  // Display data loading error prominently and block further rendering
  if (dataError) {
     return (
       <div className="p-4">
         <ErrorAlert message={dataError} onClose={() => setDataError(null)} />
         <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
             Go Home
         </button>
       </div>
     );
   }

  return (
    <div className="flex flex-col h-screen p-4 space-y-4 bg-gray-50">
      {/* Use the extracted header component */}
      <ParameterAssignmentHeader
        title="Parameter Assignment & CVI Calculation"
        completionPercentage={completionPercentage}
      />

      {/* Error Display */}
      <ErrorAlert message={pageError} onClose={() => handleError(null)} />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow overflow-hidden">
        
        {/* Left Column: Map */}
        <div className="lg:col-span-2 flex flex-col space-y-4 overflow-y-auto">
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
            onClearSelection={handleClearSelection} // Pass the clear selection handler
            // onSelectionCreate prop removed as onAreaSelect is used
            onSelectionDelete={handleSelectionDelete}
            onAreaSelect={handleSelectionCreate} // Correct prop for polygon completion
            mapContainerRef={mapContainerRef}
          />
        </div>

        {/* Right Column: Controls */}
        <div className="lg:col-span-1 flex flex-col space-y-4 overflow-y-auto pr-2">
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
          <CviFormulaPanel
            selectedFormula={selectedFormula}
            onFormulaSelect={handleFormulaSelect} // Pass handler directly
            onCalculateCvi={handleCalculateCvi} // Pass handler
            completionPercentage={completionPercentage}
            calculatingCvi={calculatingCvi}
            cviScores={cviScores} // Pass scores for potential display/checks
            segments={segments} // Pass segments for potential checks
          />
          {/* Action Buttons */}
          <div className="bg-white p-4 rounded-lg shadow sticky bottom-0">
            <button
              onClick={handleContinue}
              className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
              // Reason: Disable button based on completion, CVI calculation status, and whether scores exist for all segments.
              disabled={completionPercentage < 100 || Object.keys(cviScores).length !== segments.length || calculatingCvi}
              title={
                 completionPercentage < 100 ? `Complete parameter assignment (${completionPercentage}%) first`
                 : Object.keys(cviScores).length !== segments.length ? `Calculate CVI for all ${segments.length} segments first`
                 : calculatingCvi ? 'Calculation in progress...'
                 : 'Proceed to results visualization'
              }
            >
              {calculatingCvi ? 'Calculating...' : 'Continue to Results'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Table */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col h-1/3 min-h-[250px] overflow-y-auto flex-shrink-0"> {/* Adjusted height: removed max-h, added h-1/3, min-h, overflow-y-auto, flex-shrink-0 */}
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
    </div>
  );
}