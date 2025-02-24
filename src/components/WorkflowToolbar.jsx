import { useState } from 'react';

export default function WorkflowToolbar() {
  const [activeBasemap, setActiveBasemap] = useState('OSM');
  const [drawingMode, setDrawingMode] = useState('none');

  return (
    <div className="toolbar-controls">
      <div className="basemap-selector">
        <button
          title="OpenStreetMap"
          className={activeBasemap === 'OSM' ? 'active' : ''}
          onClick={() => setActiveBasemap('OSM')}
        >
          🗺️
        </button>
        <button
          title="Satellite"
          className={activeBasemap === 'Satellite' ? 'active' : ''}
          onClick={() => setActiveBasemap('Satellite')}
        >
          🛰️
        </button>
        <button
          title="Topographic"
          className={activeBasemap === 'Topo' ? 'active' : ''}
          onClick={() => setActiveBasemap('Topo')}
        >
          ⛰️
        </button>
      </div>

      <div className="tool-divider"></div>

      <div className="drawing-tools">
        <button
          title="Draw Polygon"
          className={drawingMode === 'polygon' ? 'active' : ''}
          onClick={() => setDrawingMode('polygon')}
        >
          ⬡
        </button>
        <button
          title="Draw Rectangle"
          className={drawingMode === 'rectangle' ? 'active' : ''}
          onClick={() => setDrawingMode('rectangle')}
        >
          ⬜
        </button>
        <button
          title="Freehand Drawing"
          className={drawingMode === 'freehand' ? 'active' : ''}
          onClick={() => setDrawingMode('freehand')}
        >
          ✏️
        </button>
        <button
          title="Delete Selected"
          className="delete-button"
          disabled={true}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
