import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import { fromLonLat, transformExtent } from 'ol/proj';
import { getCenter } from 'ol/extent';
import * as GeoTIFF from 'geotiff';

export default function SensorSelection() {
  const dispatch = useDispatch();
  const { sensorConfig } = useSelector(state => state.workflow);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [bandConfiguration, setBandConfiguration] = useState({});
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [shouldZoomToData, setShouldZoomToData] = useState(false);
  const [thumbnails, setThumbnails] = useState({});
  const [fileMetadata, setFileMetadata] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const allowedTypes = ['.tif', '.tiff', '.nc', '.h5', '.zip', '.safe', '.SAFE'];

  const handleFileChange = async (files) => {
    const validFiles = Array.from(files).filter(file =>
      allowedTypes.some(type => file.name.toLowerCase().endsWith(type))
    );

    if (validFiles.length !== files.length) {
      alert(`Some files were skipped. Allowed formats: ${allowedTypes.join(', ')}`);
    }

    setIsProcessing(true);

    const newBandConfigs = {};
    const newThumbnails = {};
    const newMetadata = {};

    for (const file of validFiles) {
      const fileId = `file-${Date.now()}-${file.name}`;
      const detectedProcessingLevel = detectProcessingLevel(file.name);

      newBandConfigs[fileId] = {
        processingLevel: detectedProcessingLevel,
        selectedBands: getDefaultBands(sensorConfig.sensorType),
      };

      if (file.name.toLowerCase().endsWith('.tif') || file.name.toLowerCase().endsWith('.tiff')) {
        try {
          const arrayBuffer = await readFileAsArrayBuffer(file);

          const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
          const image = await tiff.getImage();

          const fileDirectory = image.fileDirectory;
          const geoKeys = image.geoKeys;

          const width = fileDirectory.ImageWidth;
          const height = fileDirectory.ImageLength;

          const bbox = image.getBoundingBox();
          const resolution = image.getResolution();

          const rasters = await image.readRasters({
            width: Math.min(width, 256),
            height: Math.min(height, 256),
            resampleMethod: 'bilinear'
          });

          newMetadata[fileId] = {
            dimensions: { width, height },
            bbox: bbox,
            resolution: resolution,
            bands: fileDirectory.BitsPerSample.length,
            samplesPerPixel: fileDirectory.SamplesPerPixel,
            projection: geoKeys ? `EPSG:${geoKeys.ProjectedCSTypeGeoKey || 4326}` : 'Unknown',
            processingLevel: detectedProcessingLevel,
            sensor: determineSensorFromMetadata(fileDirectory, file.name)
          };

          if (rasters.length >= 3) {
            const canvas = document.createElement('canvas');
            canvas.width = rasters[0].width;
            canvas.height = rasters[0].height;
            const ctx = canvas.getContext('2d');

            const imageData = ctx.createImageData(canvas.width, canvas.height);

            for (let i = 0; i < rasters[0].length; i++) {
              const r = Math.min(255, Math.max(0, rasters[0][i] / 10000 * 255));
              const g = Math.min(255, Math.max(0, rasters[1][i] / 10000 * 255));
              const b = Math.min(255, Math.max(0, rasters[2][i] / 10000 * 255));

              imageData.data[i * 4] = r;
              imageData.data[i * 4 + 1] = g;
              imageData.data[i * 4 + 2] = b;
              imageData.data[i * 4 + 3] = 255;
            }

            ctx.putImageData(imageData, 0, 0);
            newThumbnails[fileId] = canvas.toDataURL();
          } else {
            const canvas = document.createElement('canvas');
            canvas.width = rasters[0].width;
            canvas.height = rasters[0].height;
            const ctx = canvas.getContext('2d');

            const imageData = ctx.createImageData(canvas.width, canvas.height);

            for (let i = 0; i < rasters[0].length; i++) {
              const val = Math.min(255, Math.max(0, rasters[0][i] / 10000 * 255));

              imageData.data[i * 4] = val;
              imageData.data[i * 4 + 1] = val;
              imageData.data[i * 4 + 2] = val;
              imageData.data[i * 4 + 3] = 255;
            }

            ctx.putImageData(imageData, 0, 0);
            newThumbnails[fileId] = canvas.toDataURL();
          }
        } catch (err) {
          console.error('Error processing GeoTIFF:', err);
          newThumbnails[fileId] = createPlaceholderThumbnail(file.name, sensorConfig.sensorType);
          newMetadata[fileId] = {
            error: 'Failed to read metadata',
            processingLevel: detectedProcessingLevel,
            sensorType: sensorConfig.sensorType
          };
        }
      } else {
        newThumbnails[fileId] = createPlaceholderThumbnail(file.name, sensorConfig.sensorType);
        newMetadata[fileId] = {
          processingLevel: detectedProcessingLevel,
          sensorType: sensorConfig.sensorType,
          fileType: file.name.split('.').pop().toUpperCase(),
          size: formatFileSize(file.size)
        };
      }
    }

    setBandConfiguration(prev => ({...prev, ...newBandConfigs}));
    setFileMetadata(prev => ({...prev, ...newMetadata}));
    setThumbnails(prev => ({...prev, ...newThumbnails}));

    setSelectedFiles(prev => [...prev, ...validFiles]);
    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: {
        files: [...selectedFiles, ...validFiles],
        bandConfiguration: {...bandConfiguration, ...newBandConfigs},
        metadata: {...fileMetadata, ...newMetadata}
      }
    });

    setIsProcessing(false);

    if (validFiles.length > 0) {
      setShouldZoomToData(true);
    }
  };

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsArrayBuffer(file);
    });
  };

  const createPlaceholderThumbnail = (filename, sensorType) => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = getLayerColor(sensorType);
    ctx.lineWidth = 10;
    for (let i = -200; i < 400; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 200, 200);
      ctx.stroke();
    }

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GeoTIFF Preview', 100, 90);
    ctx.font = '12px Arial';
    ctx.fillText(filename.length > 20 ? filename.substring(0, 17) + '...' : filename, 100, 110);

    return canvas.toDataURL();
  };

  const determineSensorFromMetadata = (fileDirectory, filename) => {
    const lowerName = filename.toLowerCase();
    if (lowerName.includes('s2') || lowerName.includes('sentinel-2') || lowerName.includes('sentinel2')) {
      return 'Sentinel2';
    } else if (lowerName.includes('s1') || lowerName.includes('sentinel-1') || lowerName.includes('sentinel1')) {
      return 'Sentinel1';
    } else if (lowerName.includes('landsat') || lowerName.includes('lc08') || lowerName.includes('lc09')) {
      return 'Landsat';
    }

    return 'Unknown';
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

    const updatedBandConfig = {};
    Object.keys(bandConfiguration).forEach(fileId => {
      updatedBandConfig[fileId] = {
        ...bandConfiguration[fileId],
        selectedBands: getDefaultBands(type)
      };
    });

    setBandConfiguration(updatedBandConfig);

    dispatch({
      type: 'SET_SENSOR_CONFIG',
      payload: {
        bandConfiguration: updatedBandConfig
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

  const getEstimatedExtent = (sensorType) => {
    switch(sensorType) {
      case 'Sentinel1':
        return [-5, 40, 5, 50]; // Western Europe (rough bounds)
      case 'Sentinel2':
        return [10, 30, 20, 40]; // North Africa (rough bounds)
      case 'Landsat':
        return [-120, 30, -100, 45]; // Western US (rough bounds)
      default:
        return [-180, -85, 180, 85]; // World
    }
  };

  const getLayerColor = (sensorType) => {
    switch(sensorType) {
      case 'Sentinel1': return 'rgba(65, 105, 225, 0.8)'; // Blue for radar
      case 'Sentinel2': return 'rgba(50, 205, 50, 0.8)'; // Green for optical
      case 'Landsat': return 'rgba(255, 165, 0, 0.8)'; // Orange for Landsat
      default: return 'rgba(200, 200, 200, 0.8)';
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.setTarget(undefined);
      mapInstanceRef.current = null;
    }

    if (selectedFiles.length > 0) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
          projection: 'EPSG:3857'
        }),
        controls: []
      });

      mapInstanceRef.current = map;

      const actualExtents = [];
      const fileIds = Object.keys(fileMetadata);

      for (const fileId of fileIds) {
        const metadata = fileMetadata[fileId];
        if (metadata && metadata.bbox) {
          try {
            const bbox = metadata.bbox;
            const webMercatorExtent = transformExtent(
              [bbox[0], bbox[1], bbox[2], bbox[3]],
              metadata.projection || 'EPSG:4326',
              'EPSG:3857'
            );
            actualExtents.push(webMercatorExtent);

            const satelliteLayer = new ImageLayer({
              source: new Static({
                url: thumbnails[fileId] || createPlaceholderThumbnail("No thumbnail", sensorConfig.sensorType),
                imageExtent: webMercatorExtent,
                projection: 'EPSG:3857'
              }),
              opacity: 0.8
            });

            map.addLayer(satelliteLayer);
          } catch (e) {
            console.error('Error processing bbox:', e);
          }
        }
      }

      if (actualExtents.length > 0 && shouldZoomToData) {
        const combinedExtent = actualExtents.reduce((acc, extent) => {
          if (!acc) return extent;
          return [
            Math.min(acc[0], extent[0]),
            Math.min(acc[1], extent[1]),
            Math.max(acc[2], extent[2]),
            Math.max(acc[3], extent[3])
          ];
        }, null);

        if (combinedExtent) {
          map.getView().fit(combinedExtent, {
            padding: [50, 50, 50, 50],
            duration: 1000
          });
          setShouldZoomToData(false);
          return;
        }
      }

      const extent = getEstimatedExtent(sensorConfig.sensorType);
      const webMercatorExtent = transformExtent(extent, 'EPSG:4326', 'EPSG:3857');

      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = getLayerColor(sensorConfig.sensorType);
      ctx.fillRect(0, 0, 256, 256);

      const satelliteLayer = new ImageLayer({
        source: new Static({
          url: canvas.toDataURL(),
          imageExtent: webMercatorExtent,
          projection: 'EPSG:3857'
        }),
        opacity: 0.7
      });

      map.addLayer(satelliteLayer);

      if (shouldZoomToData) {
        map.getView().fit(webMercatorExtent, {
          padding: [50, 50, 50, 50],
          duration: 1000
        });
        setShouldZoomToData(false);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [selectedFiles, fileMetadata, sensorConfig.sensorType, shouldZoomToData, thumbnails]);

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
              <button
                className={sensorConfig.sensorType === 'Sentinel1' ? 'active' : ''}
                onClick={() => handleSensorTypeChange('Sentinel1')}
              >
                <div className="sensor-info">
                  <span className="sensor-name">Sentinel-1</span>
                  <span className="sensor-specs">5-20m Resolution • 6-12 days Revisit • Radar</span>
                </div>
              </button>
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

        {selectedFiles.length > 0 && (
          <div className="preview-map-section">
            <div className="section-header">
              <h3>Data Preview</h3>
              <span className="section-info">Spatial preview and metadata</span>
            </div>

            {isProcessing ? (
              <div className="processing-indicator">
                <div className="spinner"></div>
                <span>Processing satellite data...</span>
              </div>
            ) : (
              <>
                <div className="preview-layout">
                  <div className="preview-map-container" ref={mapRef}></div>

                  <div className="thumbnail-gallery">
                    <h4>File Preview</h4>
                    <div className="thumbnails">
                      {selectedFiles.map((file, index) => {
                        const fileId = `file-${index}-${file.name}`;
                        const metadata = fileMetadata[fileId] || {};

                        return (
                          <div className="thumbnail-item" key={fileId}>
                            <div className="thumbnail-image">
                              {thumbnails[fileId] ? (
                                <img src={thumbnails[fileId]} alt={file.name} />
                              ) : (
                                <div className="thumbnail-placeholder">
                                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="thumbnail-info">
                              <div className="thumbnail-filename">{file.name.length > 20 ? file.name.substring(0, 17) + '...' : file.name}</div>
                              {metadata.error ? (
                                <div className="thumbnail-error">{metadata.error}</div>
                              ) : (
                                <div className="metadata-summary">
                                  {metadata.dimensions && (
                                    <span className="metadata-item">
                                      {metadata.dimensions.width}×{metadata.dimensions.height}px
                                    </span>
                                  )}
                                  {metadata.bands && (
                                    <span className="metadata-item">
                                      {metadata.bands} bands
                                    </span>
                                  )}
                                  {metadata.processingLevel && (
                                    <span className="metadata-item">
                                      {metadata.processingLevel}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {Object.keys(fileMetadata).length > 0 && (
                  <div className="metadata-panel">
                    <h4>Extracted Metadata</h4>
                    <div className="metadata-grid">
                      {Object.entries(fileMetadata).map(([fileId, metadata]) => {
                        const fileName = selectedFiles.find((_, index) => `file-${index}-${_.name}` === fileId)?.name || 'Unknown file';

                        if (!metadata || metadata.error) return null;

                        return (
                          <div className="metadata-card" key={fileId}>
                            <h5>{fileName.length > 25 ? fileName.substring(0, 22) + '...' : fileName}</h5>
                            <div className="metadata-details">
                              {metadata.dimensions && (
                                <div className="metadata-row">
                                  <span className="metadata-label">Dimensions:</span>
                                  <span className="metadata-value">{metadata.dimensions.width}×{metadata.dimensions.height}px</span>
                                </div>
                              )}
                              {metadata.projection && (
                                <div className="metadata-row">
                                  <span className="metadata-label">Projection:</span>
                                  <span className="metadata-value">{metadata.projection}</span>
                                </div>
                              )}
                              {metadata.bbox && (
                                <div className="metadata-row">
                                  <span className="metadata-label">Bounds:</span>
                                  <span className="metadata-value small">
                                    [{metadata.bbox.map(v => v.toFixed(4)).join(', ')}]
                                  </span>
                                </div>
                              )}
                              {metadata.resolution && (
                                <div className="metadata-row">
                                  <span className="metadata-label">Resolution:</span>
                                  <span className="metadata-value">
                                    {metadata.resolution[0].toFixed(2)}×{metadata.resolution[1].toFixed(2)}
                                  </span>
                                </div>
                              )}
                              {metadata.processingLevel && (
                                <div className="metadata-row">
                                  <span className="metadata-label">Level:</span>
                                  <span className="metadata-value">{metadata.processingLevel}</span>
                                </div>
                              )}
                              {metadata.bands && (
                                <div className="metadata-row">
                                  <span className="metadata-label">Bands:</span>
                                  <span className="metadata-value">{metadata.bands}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="preview-controls">
                  <button
                    className="map-button"
                    onClick={() => setShouldZoomToData(true)}
                    title="Zoom to data extent"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15 10.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M19.5 19.5L14.625 14.625" />
                    </svg>
                    <span>Zoom to Data</span>
                  </button>
                </div>
              </>
            )}

            <div className="preview-note">
              <svg viewBox="0 0 24 24" className="info-icon" width="16" height="16" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Note: This preview extracts metadata and creates a quick visualization of your satellite data. Complete processing will happen in the next step.</span>
            </div>
          </div>
        )}
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

        .preview-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 1rem;
          margin-top: 1rem;
        }

        .preview-map-container {
          height: 300px;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 1rem;
          border: 1px solid #333;
        }

        .thumbnail-gallery {
          background: #1a1a1a;
          border-radius: 4px;
          padding: 1rem;
          border: 1px solid #333;
          height: 300px;
          overflow-y: auto;
        }

        .thumbnail-gallery h4 {
          margin-bottom: 0.75rem;
          color: #fff;
          font-size: 0.95rem;
        }

        .thumbnails {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .thumbnail-item {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          padding: 0.5rem;
          border-radius: 4px;
          background: #242424;
          border: 1px solid #333;
        }

        .thumbnail-image {
          width: 60px;
          height: 60px;
          background: #333;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .thumbnail-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumbnail-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: #666;
        }

        .thumbnail-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
          min-width: 0;
        }

        .thumbnail-filename {
          font-size: 0.85rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .preview-controls {
          display: flex;
          justify-content: center;
          margin-top: 10px;
          gap: 10px;
        }

        .map-button {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #333;
          border: 1px solid #444;
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .map-button:hover {
          background: #444;
          transform: translateY(-1px);
        }

        .map-button:active {
          transform: translateY(0);
        }

        .preview-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.75rem;
          color: #888;
          font-size: 0.85rem;
        }

        .info-icon {
          color: #4CAF50;
          min-width: 16px;
        }

        @media (max-width: 768px) {
          .preview-layout {
            grid-template-columns: 1fr;
          }

          .thumbnail-gallery {
            height: auto;
            max-height: 200px;
          }
        }

        .processing-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          flex-direction: column;
          gap: 1rem;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border-top: 4px solid #4CAF50;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .metadata-summary {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          font-size: 0.75rem;
          color: #aaa;
          margin-top: 0.25rem;
        }

        .metadata-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.1rem 0.4rem;
          border-radius: 3px;
        }

        .thumbnail-error {
          color: #ff6b6b;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .metadata-panel {
          background: #1a1a1a;
          border-radius: 4px;
          padding: 1rem;
          margin-top: 1rem;
          border: 1px solid #333;
        }

        .metadata-panel h4 {
          margin-bottom: 0.75rem;
          color: #fff;
          font-size: 0.95rem;
        }

        .metadata-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        }

        .metadata-card {
          background: #242424;
          border-radius: 4px;
          padding: 1rem;
          border: 1px solid #333;
        }

        .metadata-card h5 {
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          color: #4CAF50;
          border-bottom: 1px solid #333;
          padding-bottom: 0.5rem;
        }

        .metadata-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .metadata-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .metadata-label {
          color: #aaa;
        }

        .metadata-value {
          color: #fff;
          font-family: 'Courier New', monospace;
        }

        .metadata-value.small {
          font-size: 0.75rem;
          word-break: break-all;
        }
      `}</style>
    </div>
  );
}
