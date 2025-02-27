import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFiles } from './fileManager';

export default function SensorSelection() {
  const dispatch = useDispatch();
  const { sensorConfig } = useSelector(state => state.workflow);
  const areaOfInterest = useSelector(state => state.workflow.areaOfInterest);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [bandConfiguration, setBandConfiguration] = useState({});
  const [waterIndex, setWaterIndex] = useState('Band8');

  // Initialize temporal range and sensor type if not set
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    if (!sensorConfig.temporalRange?.start || !sensorConfig.temporalRange?.end) {
      dispatch({
        type: 'SET_SENSOR_CONFIG',
        payload: {
          temporalRange: {
            start: today,
            end: today
          }
        }
      });
    }

    if (!sensorConfig.sensorType) {
      dispatch({
        type: 'SET_SENSOR_CONFIG',
        payload: {
          sensorType: 'Sentinel2'
        }
      });
    }
  }, []);

  const allowedTypes = ['.tif', '.tiff', '.nc', '.h5', '.zip', '.safe', '.SAFE'];

  const waterIndices = {
    'Sentinel2': [
      { label: 'Band 8 (NIR Band)', value: 'Band8' },
      { label: 'MNDWI (Modified Normalized Difference Water Index)', value: 'MNDWI' },
      { label: 'NDWI (Normalized Difference Water Index)', value: 'NDWI' },
      { label: 'AWEInsh (Automated Water Extraction Index - No Shadow)', value: 'AWEInsh' },
      { label: 'AWEIsh (Automated Water Extraction Index - Shadow)', value: 'AWEIsh' },
      { label: 'SMBWI (Sentinel Multi-Band Water Index)', value: 'SMBWI' },
      { label: 'WRI (Water Ratio Index)', value: 'WRI' },
      { label: 'NDWI2 (Normalized Difference Water Index 2)', value: 'NDWI2' }
    ],
    'Sentinel1': [
      { label: 'VV/VH Ratio', value: 'VVVH_RATIO' },
      { label: 'VV Threshold', value: 'VV_THRESHOLD' }
    ],
    'Landsat': [
      { label: 'AWEI (Automated Water Extraction Index)', value: 'AWEI' },
      { label: 'MNDWI', value: 'MNDWI' },
      { label: 'NDWI', value: 'NDWI' }
    ]
  };

  const handleFileChange = (files) => {
    const validFiles = Array.from(files).filter(file =>
      allowedTypes.some(type => file.name.toLowerCase().endsWith(type))
    );

    if (validFiles.length !== files.length) {
      alert(`Some files were skipped. Allowed formats: ${allowedTypes.join(', ')}`);
    }

    // Create serializable file info
    const fileInfo = validFiles.map(file => ({
      id: `file-${Date.now()}-${file.name}`,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }));

    // Store actual files in file manager
    setFiles(validFiles);
    setSelectedFiles(validFiles); // Keep local state

    // Log files for debugging
    console.log('Storing files:', validFiles.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type
    })));

    // Only send serializable data to Redux
    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: {
        fileInfo: fileInfo
      }
    });

    const newBandConfigs = {};
    validFiles.forEach(file => {
      const fileId = `file-${Date.now()}-${file.name}`;
      newBandConfigs[fileId] = {
        processingLevel: detectProcessingLevel(file.name),
        selectedBands: getDefaultBands(sensorConfig.sensorType),
      };
    });

    setBandConfiguration(prev => ({...prev, ...newBandConfigs}));

    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: {
        bandConfiguration: {...bandConfiguration, ...newBandConfigs}
      }
    });
  };

  const detectProcessingLevel = (filename) => {
    filename = filename.toLowerCase();
    if (filename.includes('l2a') || filename.includes('_2a')) {
      return 'L2A';
    } else if (filename.includes('l1c') || filename.includes('_1c')) {
      return 'L1C';
    } else if (filename.includes('grd')) {
      return 'GRD';
    } else if (filename.includes('slc')) {
      return 'SLC';
    }
    return 'Unknown';
  };

  const getDefaultBands = (sensorType) => {
    switch(sensorType) {
      case 'Sentinel1':
        return ['VV', 'VH'];
      case 'Sentinel2':
        return ['B2', 'B3', 'B4', 'B8'];
      case 'Landsat':
        return ['B2', 'B3', 'B4', 'B5'];
      default:
        return [];
    }
  };

  const handleBandSelection = (fileId, bands) => {
    setBandConfiguration(prev => ({
      ...prev,
      [fileId]: {
        ...prev[fileId],
        selectedBands: bands
      }
    }));

    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: {
        bandConfiguration: {
          ...bandConfiguration,
          [fileId]: {
            ...bandConfiguration[fileId],
            selectedBands: bands
          }
        }
      }
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles(prev => {
      const newFiles = prev.filter((_, index) => index !== indexToRemove);
      dispatch({
        type: 'SET_SENSOR_CONFIG',
        payload: { fileInfo: selectedFiles.filter((_, index) => index !== indexToRemove) }
      });
      return newFiles;
    });
  };

  const handleSensorTypeChange = (type) => {
    // Update sensor type in Redux
    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: {
        sensorType: type,
        // Reset water index when changing sensor type
        waterIndex: waterIndices[type]?.[0]?.value || 'Band8'
      }
    });
    // Update local state
    setWaterIndex(waterIndices[type]?.[0]?.value || 'Band8');
  };

  const handleDateChange = (field, value) => {
    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: {
        temporalRange: {
          ...sensorConfig.temporalRange,
          [field]: value || new Date().toISOString().split('T')[0]
        }
      }
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getBandOptions = (sensorType, processingLevel) => {
    if (sensorType === 'Sentinel1') {
      return ['VV', 'VH', 'HH', 'HV'];
    } else if (sensorType === 'Sentinel2') {
      const bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11', 'B12'];
      if (processingLevel === 'L2A') {
        bands.push('SCL');
      }
      return bands;
    } else if (sensorType === 'Landsat') {
      return ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11'];
    }
    return [];
  };

  const handleWaterIndexChange = (index) => {
    setWaterIndex(index);
    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: {
        waterIndex: index
      }
    });
  };

  const renderWaterIndexSelection = () => {
    if (!sensorConfig.sensorType) return null;

    return (
      <div className="option-section water-index">
        <div className="section-header">
          <h3>Water Index Selection</h3>
          <span className="section-info">Choose the water index for shoreline detection</span>
        </div>
        <div className="water-index-options">
          {waterIndices[sensorConfig.sensorType].map((index) => (
            <button
              key={index.value}
              className={waterIndex === index.value ? 'active' : ''}
              onClick={() => handleWaterIndexChange(index.value)}
            >
              <div className="index-info">
                <span className="index-name">{index.label}</span>
                <span className="index-description">
                  {index.value === 'Band8' ? 'Direct NIR band thresholding' : ''}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const getIndexDescription = (indexValue) => {
    const descriptions = {
      'MNDWI': 'Best for general water body detection',
      'NDWI': 'Suitable for surface water detection',
      'Band8': 'Direct NIR band analysis',
      'AWEInsh': 'Optimized for non-shadow areas',
      'AWEIsh': 'Optimized for shadowed areas',
      'SMBWI': 'Multi-band analysis for Sentinel-2',
      'WRI': 'Ratio-based water detection',
      'NDWI2': 'Alternative NDWI formulation',
      'VVVH_RATIO': 'SAR polarization ratio analysis',
      'VV_THRESHOLD': 'Single polarization threshold',
      'AWEI': 'Enhanced water extraction index'
    };
    return descriptions[indexValue] || '';
  };

  const validateConfiguration = () => {
    if (!sensorConfig.sensorType) {
      alert('Please select a sensor type');
      return false;
    }

    if (!waterIndex) {
      alert('Please select a water index');
      return false;
    }

    if (!selectedFiles.length) {
      alert('Please upload at least one file');
      return false;
    }

    if (!sensorConfig.temporalRange?.start || !sensorConfig.temporalRange?.end) {
      alert('Please select a date range');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateConfiguration()) return;

    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: {
        sensorType: sensorConfig.sensorType,
        waterIndex: waterIndex,
        fileInfo: selectedFiles.map(file => ({
          id: fileInfo.find(info => info.name === file.name).id,
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        })),
        bandConfiguration: bandConfiguration,
        temporalRange: sensorConfig.temporalRange,
        useAoI: true, // Always use AoI when available
        aoiBounds: areaOfInterest, // Use the AoI from Redux store
        processingConfig: {
          method: waterIndex,
          otsuThreshold: true,
          smoothing: true,
          minPatchSize: 100,
          ...(sensorConfig.sensorType === 'Sentinel1' && {
            speckleFilter: true,
            filterSize: 3
          })
        }
      }
    });

    dispatch({ type: 'SET_WORKFLOW_STEP', payload: 'processing' });
  };

  return (
    <div className="sensor-selection">
      <div className="sensor-header">
        <h2>Sensor Selection</h2>
        <div className="sensor-summary">
          <span>Configure data source and processing parameters</span>
        </div>
      </div>

      <div className="sensor-content">
        <div className="sensor-main-options">
          <div className="option-section sensor-type">
            <div className="section-header">
              <h3>Sensor Type</h3>
              <span className="section-info">Choose your preferred satellite sensor</span>
            </div>
            <div className="sensor-options">
              {['Sentinel1', 'Sentinel2', 'Landsat'].map(type => (
                <button
                  key={type}
                  className={sensorConfig.sensorType === type ? 'active' : ''}
                  onClick={() => handleSensorTypeChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {renderWaterIndexSelection()}

          <div className="option-section source-type">
            <div className="section-header">
              <h3>Satellite Data Upload</h3>
              <span className="section-info">Upload your satellite data files</span>
            </div>
            <div className="source-options">
              <div
                className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={allowedTypes.join(',')}
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="file-input"
                />
                <div className="upload-content">
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                  </svg>
                  <div className="upload-text">
                    <span className="primary-text">Drag & drop files here</span>
                    <span className="secondary-text">or click to browse</span>
                  </div>
                  <div className="file-types">
                    Supported formats: {allowedTypes.join(', ')}
                  </div>
                </div>
              </div>

              {selectedFiles.length > 0 && (
                <div className="selected-files">
                  <h4>Selected Files</h4>
                  <div className="file-list">
                    {selectedFiles.map((file, index) => {
                      const fileId = `file-${index}-${file.name}`;
                      const fileConfig = bandConfiguration[fileId] || {
                        processingLevel: 'Unknown',
                        selectedBands: []
                      };

                      return (
                        <div key={index} className="file-item">
                          <div className="file-info">
                            <span className="file-name">{file.name}</span>
                            <span className="file-size">{formatFileSize(file.size)}</span>
                            <div className="file-details">
                              <div className="processing-level">
                                <label>Processing Level:</label>
                                <select
                                  value={fileConfig.processingLevel}
                                  onChange={(e) => {
                                    const newLevel = e.target.value;
                                    setBandConfiguration(prev => ({
                                      ...prev,
                                      [fileId]: {
                                        ...prev[fileId],
                                        processingLevel: newLevel
                                      }
                                    }));
                                  }}
                                >
                                  {sensorConfig.sensorType === 'Sentinel1' ? (
                                    <>
                                      <option value="GRD">GRD</option>
                                      <option value="SLC">SLC</option>
                                    </>
                                  ) : sensorConfig.sensorType === 'Sentinel2' ? (
                                    <>
                                      <option value="L1C">L1C</option>
                                      <option value="L2A">L2A</option>
                                    </>
                                  ) : (
                                    <>
                                      <option value="L1">Level 1</option>
                                      <option value="L2">Level 2</option>
                                    </>
                                  )}
                                </select>
                              </div>
                              <div className="band-selection">
                                <label>Bands:</label>
                                <div className="band-options">
                                  {getBandOptions(sensorConfig.sensorType, fileConfig.processingLevel).map(band => (
                                    <label key={band} className="band-checkbox">
                                      <input
                                        type="checkbox"
                                        checked={fileConfig.selectedBands?.includes(band)}
                                        onChange={(e) => {
                                          const newBands = e.target.checked
                                            ? [...(fileConfig.selectedBands || []), band]
                                            : (fileConfig.selectedBands || []).filter(b => b !== band);
                                          handleBandSelection(fileId, newBands);
                                        }}
                                      />
                                      {band}
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="remove-file"
                            onClick={() => removeFile(index)}
                            title="Remove file"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sensor-parameters">
          <div className="section-header">
            <h3>Processing Parameters</h3>
            <span className="section-info">Configure temporal range</span>
          </div>
          <div className="parameter-grid">
            <div className="parameter-group">
              <label>Date Range</label>
              <div className="date-inputs">
                <input
                  type="date"
                  value={sensorConfig.temporalRange?.start || new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                />
                <span>to</span>
                <input
                  type="date"
                  value={sensorConfig.temporalRange?.end || new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .file-upload-area {
          border: 2px dashed #333;
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #1a1a1a;
        }

        .file-upload-area:hover,
        .file-upload-area.drag-active {
          border-color: #4CAF50;
          background: rgba(76, 175, 80, 0.1);
        }

        .file-input {
          display: none;
        }

        .upload-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .upload-icon {
          width: 48px;
          height: 48px;
          color: #4CAF50;
        }

        .upload-text {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .primary-text {
          font-size: 1.1rem;
          color: #fff;
        }

        .secondary-text {
          color: #888;
        }

        .file-types {
          font-size: 0.9rem;
          color: #666;
          margin-top: 0.5rem;
        }

        .selected-files {
          margin-top: 1.5rem;
          background: #1a1a1a;
          border-radius: 8px;
          padding: 1rem;
        }

        .selected-files h4 {
          margin-bottom: 1rem;
          color: #fff;
        }

        .file-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .file-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: #242424;
          border-radius: 4px;
          border: 1px solid #333;
        }

        .file-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .file-name {
          color: #fff;
          font-size: 0.9rem;
        }

        .file-size {
          color: #888;
          font-size: 0.8rem;
        }

        .remove-file {
          background: none;
          border: none;
          color: #666;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          transition: all 0.2s ease;
        }

        .remove-file:hover {
          color: #ff4444;
        }

        .water-index-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .water-index-options button {
          background: #2a2a2a;
          border: 1px solid #333;
          border-radius: 6px;
          padding: 1rem;
          color: #fff;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .water-index-options button:hover {
          background: #333;
          transform: translateY(-1px);
        }

        .water-index-options button.active {
          background: #4CAF50;
          border-color: #45a049;
        }

        .index-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .index-name {
          font-weight: 500;
        }

        .index-description {
          font-size: 0.85rem;
          color: #aaa;
        }

        .water-index-options button.active .index-description {
          color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
}
