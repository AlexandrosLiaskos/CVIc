import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function SensorSelection() {
  const dispatch = useDispatch();
  const { sensorConfig } = useSelector(state => state.workflow);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const allowedTypes = ['.tif', '.tiff', '.nc', '.h5'];

  const handleFileChange = (files) => {
    const validFiles = Array.from(files).filter(file =>
      allowedTypes.some(type => file.name.toLowerCase().endsWith(type))
    );

    if (validFiles.length !== files.length) {
      alert(`Some files were skipped. Allowed formats: ${allowedTypes.join(', ')}`);
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: { files: [...selectedFiles, ...validFiles] }
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
        payload: { files: newFiles }
      });
      return newFiles;
    });
  };

  const handleSensorTypeChange = (type) => {
    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: {
        sensorType: type
      }
    });
  };

  const handleDateChange = (field, value) => {
    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: {
        temporalRange: {
          ...sensorConfig.temporalRange,
          [field]: value
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
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="file-item">
                        <div className="file-info">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">{formatFileSize(file.size)}</span>
                        </div>
                        <button
                          className="remove-file"
                          onClick={() => removeFile(index)}
                          title="Remove file"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="option-section sensor-type">
            <div className="section-header">
              <h3>Sensor Type</h3>
              <span className="section-info">Choose your preferred satellite sensor</span>
            </div>
            <div className="sensor-options">
              <button
                className={sensorConfig.sensorType === 'Sentinel2' ? 'active' : ''}
                onClick={() => handleSensorTypeChange('Sentinel2')}
              >
                <div className="sensor-info">
                  <span className="sensor-name">Sentinel-2</span>
                  <span className="sensor-specs">10m Resolution • 5 days Revisit</span>
                </div>
              </button>
              <button
                className={sensorConfig.sensorType === 'Landsat' ? 'active' : ''}
                onClick={() => handleSensorTypeChange('Landsat')}
              >
                <div className="sensor-info">
                  <span className="sensor-name">Landsat</span>
                  <span className="sensor-specs">30m Resolution • 16 days Revisit</span>
                </div>
              </button>
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
                  value={sensorConfig.temporalRange?.start || ''}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                />
                <span>to</span>
                <input
                  type="date"
                  value={sensorConfig.temporalRange?.end || ''}
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
      `}</style>
    </div>
  );
}
