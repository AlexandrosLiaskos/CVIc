// src/components/parameters/MapInteractionPanel.tsx
import React from 'react';
import L from 'leaflet';
import type { FeatureCollection, Polygon as GeoJSONPolygon } from 'geojson';
import type { ShorelineSegment, Parameter, SelectionPolygon } from '../../types';
import Map from '../maps/Map';

interface MapInteractionPanelProps {
  segments: ShorelineSegment[];
  parameters: Parameter[];
  selectedSegmentIds: string[];
  selectedParameterId: string | null;
  selectionPolygons: SelectionPolygon[];
  onSegmentSelect: (segmentId: string) => void;
  onSelectionDelete: (polygonId: string) => void;
  onAreaSelect: (geometry: GeoJSONPolygon) => void;
  initialBounds?: L.LatLngBoundsExpression | null;
  geoJSON?: FeatureCollection | null;
  onSelectAll: () => void;
  onClearSelection: () => void;
  mapContainerRef?: React.RefObject<HTMLDivElement>;
  isReadOnly?: boolean; // Added isReadOnly prop
}

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
  mapContainerRef,
  isReadOnly = false, // Default to false if not provided
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-full flex flex-col">
      {/* Map Controls - Conditionally render if not read-only */}
      {!isReadOnly && (
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <div>
            <button
              onClick={onSelectAll}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md mr-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              title="Select all visible segments"
              disabled={segments.length === 0}
            >
              Select All
            </button>
            <button
              onClick={onClearSelection}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              title="Deselect all segments"
              disabled={selectedSegmentIds.length === 0}
            >
              Clear Selection
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Use drawing tools (polygon/rectangle) on map to select segments by area.
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="flex-grow border rounded overflow-hidden" ref={mapContainerRef}>
        {segments.length > 0 && geoJSON ? (
          <Map
            segments={segments}
            parameters={parameters}
            geoJSON={geoJSON}
            selectedSegments={selectedSegmentIds}
            selectedParameter={selectedParameterId}
            selectionPolygons={selectionPolygons}
            // Pass through onSegmentSelect only if not read-only, otherwise pass a no-op
            onSegmentSelect={!isReadOnly ? onSegmentSelect : () => {}}
            onSelectionDelete={!isReadOnly ? onSelectionDelete : () => {}} 
            onAreaSelect={!isReadOnly ? onAreaSelect : () => {}}
            // isEditing controls Leaflet.Draw initialization in the Map component
            isEditing={!isReadOnly} 
            initialBounds={initialBounds}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-50 text-gray-500">
            <p className="text-gray-500">
              {segments.length === 0 ? "No shoreline segments loaded." : "Loading shoreline data..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
