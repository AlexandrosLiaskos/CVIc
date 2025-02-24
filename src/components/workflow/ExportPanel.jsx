import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ExportPanel() {
  const dispatch = useDispatch();
  const { sensorConfig } = useSelector(state => state.workflow);
  const [exportConfig, setExportConfig] = useState({
    formats: {
      vector: {
        shp: true,
        geojson: false,
        kml: false
      },
      raster: {
        geotiff: true,
        png: false,
        jpeg2000: false
      },
      metadata: {
        xml: true,
        txt: false,
        json: false
      }
    },
    projection: 'EPSG:4326',
    includeMetadata: true,
    exportPath: ''
  });

  const handleFormatToggle = (category, format) => {
    setExportConfig(prev => ({
      ...prev,
      formats: {
        ...prev.formats,
        [category]: {
          ...prev.formats[category],
          [format]: !prev.formats[category][format]
        }
      }
    }));
  };

  const handleExport = () => {
    // Implement export logic here
    console.log('Exporting with config:', exportConfig);
  };

  return (
    <div className="export-panel">
      <h2>Export Results</h2>

      <div className="export-options">
        <div className="export-section">
          <h3>Vector Outputs</h3>
          <div className="format-options">
            <label>
              <input
                type="checkbox"
                checked={exportConfig.formats.vector.shp}
                onChange={() => handleFormatToggle('vector', 'shp')}
              />
              Shoreline (Shapefile)
            </label>
            <label>
              <input
                type="checkbox"
                checked={exportConfig.formats.vector.geojson}
                onChange={() => handleFormatToggle('vector', 'geojson')}
              />
              GeoJSON
            </label>
            <label>
              <input
                type="checkbox"
                checked={exportConfig.formats.vector.kml}
                onChange={() => handleFormatToggle('vector', 'kml')}
              />
              KML
            </label>
          </div>
        </div>

        <div className="export-section">
          <h3>Raster Outputs</h3>
          <div className="format-options">
            <label>
              <input
                type="checkbox"
                checked={exportConfig.formats.raster.geotiff}
                onChange={() => handleFormatToggle('raster', 'geotiff')}
              />
              Water Mask (GeoTIFF)
            </label>
            <label>
              <input
                type="checkbox"
                checked={exportConfig.formats.raster.png}
                onChange={() => handleFormatToggle('raster', 'png')}
              />
              Index Layer (PNG)
            </label>
            <label>
              <input
                type="checkbox"
                checked={exportConfig.formats.raster.jpeg2000}
                onChange={() => handleFormatToggle('raster', 'jpeg2000')}
              />
              RGB Composite (JPEG2000)
            </label>
          </div>
        </div>

        <div className="export-section">
          <h3>Metadata & Reports</h3>
          <div className="format-options">
            <label>
              <input
                type="checkbox"
                checked={exportConfig.formats.metadata.xml}
                onChange={() => handleFormatToggle('metadata', 'xml')}
              />
              ISO 19115-2 (XML)
            </label>
            <label>
              <input
                type="checkbox"
                checked={exportConfig.formats.metadata.txt}
                onChange={() => handleFormatToggle('metadata', 'txt')}
              />
              Processing Log (TXT)
            </label>
            <label>
              <input
                type="checkbox"
                checked={exportConfig.formats.metadata.json}
                onChange={() => handleFormatToggle('metadata', 'json')}
              />
              QC Report (JSON)
            </label>
          </div>
        </div>

        <div className="export-section">
          <h3>Export Settings</h3>
          <div className="settings-group">
            <div className="setting-item">
              <label>Projection</label>
              <select
                value={exportConfig.projection}
                onChange={(e) => setExportConfig(prev => ({ ...prev, projection: e.target.value }))}
              >
                <option value="EPSG:4326">WGS84 (EPSG:4326)</option>
                <option value="EPSG:3857">Web Mercator (EPSG:3857)</option>
                <option value="UTM">UTM Zone (Auto)</option>
              </select>
            </div>

            <div className="setting-item">
              <label>Export Directory</label>
              <div className="path-input">
                <input
                  type="text"
                  value={exportConfig.exportPath}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, exportPath: e.target.value }))}
                  placeholder="Select export directory..."
                />
                <button>Browse</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="export-summary">
        <h3>Export Summary</h3>
        <div className="summary-content">
          <div>Selected Formats: {Object.entries(exportConfig.formats)
            .flatMap(([category, formats]) =>
              Object.entries(formats)
                .filter(([_, enabled]) => enabled)
                .map(([format]) => format)
            ).join(', ')}
          </div>
          <div>Projection: {exportConfig.projection}</div>
          <div>Output Directory: {exportConfig.exportPath || '(Not selected)'}</div>
        </div>
      </div>

      <div className="workflow-actions">
        <button onClick={() => dispatch({ type: 'SET_WORKFLOW_STEP', payload: 'results' })}>
          Back
        </button>
        <button
          className="primary-button"
          onClick={handleExport}
          disabled={!exportConfig.exportPath}
        >
          Export Results
        </button>
      </div>
    </div>
  );
}
