// src/components/parameters/MapInteractionPanel.tsx
import React from 'react';
import L from 'leaflet';
import type { FeatureCollection, Polygon as GeoJSONPolygon } from 'geojson';
import type { ShorelineSegment, Parameter, SelectionPolygon } from '../../types'; // Adjust path as necessary if types are elsewhere
import Map from '../maps/Map'; // Adjust path as necessary

interface MapInteractionPanelProps {
  /** Array of all shoreline segments */
  segments: ShorelineSegment[];
  /** Array of all available parameters */
  parameters: Parameter[];
  /** Array of IDs for the currently selected segments */
  selectedSegmentIds: string[];
  /** ID of the parameter currently active for styling/value assignment */
  selectedParameterId: string | null;
  /** Array of polygon geometries used for selection */
  selectionPolygons: SelectionPolygon[];
  /** Handler for selecting a single segment on the map */
  onSegmentSelect: (segmentId: string) => void; // Signature matches parent expectation
  /** Handler called when a selection polygon is created */
  onSelectionCreate: (polygon: SelectionPolygon) => void;
  /** Handler called when a selection polygon is deleted */
  onSelectionDelete: (polygonId: string) => void;
  /** Handler called when an area selection is completed (e.g., drawing a polygon) */
  onAreaSelect: (geometry: GeoJSONPolygon) => void;
  /** Initial map bounds to focus on */
  initialBounds?: L.LatLngBoundsExpression | null;
  /** GeoJSON data representing the segments for the map */
  geoJSON?: FeatureCollection | null;
  /** Handler to select all segments */
  onSelectAll: () => void;
  /** Handler to clear the current segment selection */
  onClearSelection: () => void;
  /** Ref for the map container div, if needed externally */
  mapContainerRef?: React.RefObject<HTMLDivElement>;
}

/* *
 * Component managing the map display and its primary interaction controls
 * (selection buttons, drawing information) within the parameter assignment page. It occupies its allocated space and ensures the map fills it.
 */
export const MapInteractionPanel: React.FC<Omit<MapInteractionPanelProps, 'onSelectionCreate'>> = ({
  segments,
  parameters,
  selectedSegmentIds,
  selectedParameterId,
  selectionPolygons,
  onSegmentSelect,
  onSelectionDelete,
  onAreaSelect,
  initialBounds,
  geoJSON,
  onSelectAll,
  onClearSelection,
  mapContainerRef
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col"> {/* Ensure it fills height and uses flex column */}
      {/* Map Controls */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0"> {/* Prevent controls from growing/shrinking */}
        <div>
          <button
            onClick={onSelectAll}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md mr-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            title="Select all visible segments"
            disabled={segments.length === 0} // Disable if no segments
          >
            Select All
          </button>
          <button
            onClick={onClearSelection}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            title="Deselect all segments"
            disabled={selectedSegmentIds.length === 0} // Disable if nothing selected
          >
            Clear Selection
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Use drawing tools (polygon/rectangle) on map to select segments by area.
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-grow border rounded overflow-hidden" ref={mapContainerRef}> {/* Allow map container to grow and hide overflow */}
        {/* Conditionally render map or loading state */}
        {segments.length > 0 && geoJSON ? (
          <Map
            // Data props
            segments={segments}
            parameters={parameters}
            geoJSON={geoJSON} // Passed through

            // State props
            selectedSegments={selectedSegmentIds}
            selectedParameter={selectedParameterId}
            selectionPolygons={selectionPolygons}

            // Interaction handlers
            onSegmentSelect={onSegmentSelect} // Passed through, signature matches expectation
            onSelectionDelete={onSelectionDelete} // Passed through
            onAreaSelect={onAreaSelect} // Passed through

            // Configuration props
            isEditing={true} // Always editing in this specific panel context
            initialBounds={initialBounds} // Passed through

            // zoomToFeatureId is not used directly by this panel,
            // but could be managed by a parent component if needed.
          />
        ) : (
          // Loading or empty state
          <div className="h-full flex items-center justify-center bg-gray-50 text-gray-500"> {/* Consistent background */}
            <p className="text-gray-500">
              {segments.length === 0 ? "No shoreline segments loaded." : "Loading shoreline data..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Default export can be useful in some setups, but named export is often preferred for clarity
// export default MapInteractionPanel;