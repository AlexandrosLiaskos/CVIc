import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fromArrayBuffer } from 'geotiff';
import * as cv from 'opencv.js';
import { detectWater, cleanWaterMask, extractShoreline, clipToAoI } from './ShorelineDetection';
import { getFiles } from './fileManager';

export default function ProcessingConsole() {
  const dispatch = useDispatch();
  const sensorConfig = useSelector(state => state.workflow.sensorConfig);
  const areaOfInterest = useSelector(state => state.workflow.areaOfInterest);
  
  const [processingState, setProcessingState] = useState({
    status: 'idle',
    progress: {
      imageCollection: 0,
      waterMask: 0,
      vectorization: 0
    },
    messages: []
  });

  // Enhanced logging function that logs to both console and UI
  const logMessage = (message, level = 'info', details = null) => {
    const timestamp = new Date().toISOString().substring(11, 19); // HH:MM:SS
    const formattedMessage = `[${timestamp}] ${message}`;
    
    // Log to console with appropriate level
    if (level === 'error') {
      console.error(formattedMessage, details || '');
    } else if (level === 'warn') {
      console.warn(formattedMessage, details || '');
    } else {
      console.log(formattedMessage, details || '');
    }
    
    // Add to UI messages with level info
    setProcessingState(prev => ({
      ...prev,
      messages: [...prev.messages, { text: formattedMessage, level, details: JSON.stringify(details) }]
    }));
  };

  // Update progress and log it
  const updateProgress = (stage, value) => {
    logMessage(`${stage} progress: ${value}%`, 'info');
    setProcessingState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        [stage]: value
      }
    }));
  };

  // Add message to processing log
  const addMessage = (message) => {
    logMessage(message);
  };

  const startProcessing = async () => {
    try {
      const selectedFiles = getFiles();
      logMessage('Retrieved files for processing:', 'info', selectedFiles.map(f => ({
        name: f.name,
        size: f.size,
        type: f.type
      })));

      if (!selectedFiles || selectedFiles.length === 0) {
        throw new Error('No files selected for processing');
      }

      setProcessingState(prev => ({
        ...prev,
        status: 'running',
        messages: [...prev.messages, 'Starting image processing...']
      }));

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        if (!(file instanceof File)) {
          throw new Error(`Invalid file object at index ${i}`);
        }

        // Check if file is too large (over 100MB might cause browser issues)
        const MAX_SAFE_FILE_SIZE = 100 * 1024 * 1024; // 100MB
        if (file.size > MAX_SAFE_FILE_SIZE) {
          logMessage(`Warning: File ${file.name} is very large (${(file.size / (1024 * 1024)).toFixed(2)}MB). This may cause browser performance issues.`, 'warn');
          
          // Ask user to confirm before proceeding with large file
          if (!window.confirm(`The file ${file.name} is very large (${(file.size / (1024 * 1024)).toFixed(2)}MB) and may cause your browser to become unresponsive. Continue anyway?`)) {
            logMessage('Processing cancelled by user due to large file size', 'info');
            setProcessingState(prev => ({ ...prev, status: 'idle' }));
            return;
          }
          
          logMessage('User confirmed to proceed with large file', 'info');
        }

        // 1. Read image
        updateProgress('imageCollection', 20);
        logMessage(`Reading image file: ${file.name}...`);
        try {
          logMessage(`Starting to read file: ${file.name}`, 'info', {
            size: file.size,
            type: file.type
          });
          
          // Check if the file is a valid GeoTIFF before attempting to read it
          const isValid = await isValidGeoTIFF(file);
          if (!isValid) {
            logMessage(`File ${file.name} is not a valid GeoTIFF file. Skipping processing.`, 'error');
            continue; // Skip to the next file
          }
          
          // Identify if this is a Sentinel-2 band file
          const bandInfo = identifySentinel2Band(file.name);
          if (bandInfo) {
            logMessage(`Identified file as Sentinel-2 ${bandInfo.band}: ${bandInfo.description} (${bandInfo.resolution})`, 'info');
            
            // Check if we're using the appropriate band for water detection
            if (sensorConfig.sensorType.toLowerCase() === 'sentinel2') {
              const recommendedBands = ['B08', 'B11', 'B12']; // Common bands for water detection
              if (!recommendedBands.includes(bandInfo.band)) {
                logMessage(`Warning: ${bandInfo.band} may not be optimal for water detection. Consider using B08 (NIR), B11 or B12 instead.`, 'warn');
              } else {
                logMessage(`Using ${bandInfo.band} which is suitable for water detection`, 'info');
              }
            }
          } else {
            logMessage(`Could not identify Sentinel-2 band from filename: ${file.name}`, 'warn');
          }
          
          // Add a try/catch with a timeout for the entire file reading operation
          try {
            const imageData = await readImageFile(file);
            logMessage(`Successfully read image: ${file.name}`, 'info', {
              width: imageData.width,
              height: imageData.height,
              bands: imageData.data.length
            });
            updateProgress('imageCollection', 100);

            // 2. Detect water directly from the image data
            updateProgress('waterMask', 20);
            logMessage('Detecting water bodies...', 'info');

            // Log the sensor configuration
            logMessage('Sensor configuration from store:', 'info', sensorConfig);

            // Don't try to guess the type - use what was selected in the UI
            const imageType = sensorConfig.sensorType;
            logMessage(`Using sensor type from UI selection: ${imageType}`);

            // Add the image type to config
            const waterDetectionConfig = {
              ...sensorConfig,
              imageType: imageType.toLowerCase()
            };

            logMessage('Water detection configuration:', 'info', waterDetectionConfig);

            try {
              const waterMask = await detectWater(imageData, sensorConfig.waterIndex, waterDetectionConfig);
              logMessage('Water detection completed', 'info', {
                maskType: waterMask.isRawData ? 'raw pixel data' : 'OpenCV Mat',
                width: waterMask.width || waterMask.cols,
                height: waterMask.height || waterMask.rows
              });
              
              // Clean water mask using configuration settings
              logMessage('Cleaning water mask...', 'info', {
                waterBodySizeThreshold: sensorConfig.waterBodySizeThreshold || 100,
                smoothingKernelSize: sensorConfig.smoothingKernelSize || 2,
                smoothingIterations: sensorConfig.smoothingIterations || 2
              });
              
              const cleanedMask = await cleanWaterMask(waterMask, {
                waterBodySizeThreshold: sensorConfig.waterBodySizeThreshold || 100,
                smoothingKernelSize: sensorConfig.smoothingKernelSize || 2,
                smoothingIterations: sensorConfig.smoothingIterations || 2
              });
              
              logMessage('Water mask cleaning completed', 'info');
              updateProgress('waterMask', 100);

              // 3. Extract shoreline
              updateProgress('vectorization', 40);
              logMessage('Extracting shoreline...', 'info', {
                coastalBuffer: sensorConfig.coastalBuffer || 1.0
              });
              
              try {
                const shoreline = await extractShoreline(cleanedMask, {
                  coastalBuffer: sensorConfig.coastalBuffer || 1.0
                });
                
                logMessage('Shoreline extraction completed', 'info', {
                  featureCount: shoreline.features.length,
                  method: shoreline.features[0]?.properties?.method || 'unknown'
                });
                updateProgress('vectorization', 100);

                // Store results
                dispatch({
                  type: 'SET_PROCESSING_RESULTS',
                  payload: {
                    shoreline,
                    metadata: {
                      processingTime: Date.now(),
                      imageInfo: {
                        width: imageData.width,
                        height: imageData.height,
                        filename: file.name
                      }
                    }
                  }
                });

                logMessage('Processing completed successfully! You can now view the results.', 'info');
              } catch (shorelineError) {
                logMessage(`Error extracting shoreline: ${shorelineError.message}`, 'error', {
                  stack: shorelineError.stack,
                  cleanedMaskType: cleanedMask.isRawData ? 'raw pixel data' : 'OpenCV Mat'
                });
                throw shorelineError;
              }
            } catch (waterDetectionError) {
              logMessage(`Error detecting water: ${waterDetectionError.message}`, 'error', {
                stack: waterDetectionError.stack
              });
              throw waterDetectionError;
            }
          } catch (error) {
            logMessage(`Error: ${error.message || 'Unknown error during processing'}`, 'error', {
              stack: error.stack
            });
            setProcessingState(prev => ({
              ...prev,
              status: 'error'
            }));
            console.error('Processing error:', error);
          }
        } catch (error) {
          logMessage('Detailed error in readImageFile', 'error', {
            error: error.message,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            errorName: error.name,
            errorMessage: error.message,
            errorStack: error.stack
          });
          throw error;
        }
      }

      setProcessingState(prev => ({
        ...prev,
        status: 'completed'
      }));

    } catch (error) {
      console.error('Processing error:', error);
      logMessage(`Error: ${error.message}`, 'error', {
        stack: error.stack
      });
      setProcessingState(prev => ({ ...prev, status: 'error' }));
    }
  };

  // Function to identify Sentinel-2 band from filename
  const identifySentinel2Band = (filename) => {
    // Common Sentinel-2 band patterns
    const bandPatterns = {
      'B01': { description: 'Band 1 - Coastal aerosol (443 nm)', resolution: '60m' },
      'B02': { description: 'Band 2 - Blue (490 nm)', resolution: '10m' },
      'B03': { description: 'Band 3 - Green (560 nm)', resolution: '10m' },
      'B04': { description: 'Band 4 - Red (665 nm)', resolution: '10m' },
      'B05': { description: 'Band 5 - Vegetation Red Edge (705 nm)', resolution: '20m' },
      'B06': { description: 'Band 6 - Vegetation Red Edge (740 nm)', resolution: '20m' },
      'B07': { description: 'Band 7 - Vegetation Red Edge (783 nm)', resolution: '20m' },
      'B08': { description: 'Band 8 - NIR (842 nm)', resolution: '10m' },
      'B8A': { description: 'Band 8A - Narrow NIR (865 nm)', resolution: '20m' },
      'B09': { description: 'Band 9 - Water vapor (945 nm)', resolution: '60m' },
      'B10': { description: 'Band 10 - SWIR - Cirrus (1375 nm)', resolution: '60m' },
      'B11': { description: 'Band 11 - SWIR (1610 nm)', resolution: '20m' },
      'B12': { description: 'Band 12 - SWIR (2190 nm)', resolution: '20m' }
    };
    
    // Check if filename contains any of the band patterns
    for (const [band, info] of Object.entries(bandPatterns)) {
      if (filename.includes(band)) {
        return { band, ...info };
      }
    }
    
    return null;
  };

  const readImageFile = async (file) => {
    try {
      setProcessingState(prev => ({
        ...prev,
        messages: [...prev.messages, { type: 'info', text: `Reading file: ${file.name}` }]
      }));

      const fileBuffer = await file.arrayBuffer();
      const tiff = await fromArrayBuffer(fileBuffer);
      const image = await tiff.getImage();
      const fileDirectory = image.getFileDirectory();

      // Log GeoTIFF metadata but don't throw an error if tags are missing
      if (!fileDirectory.GeoAsciiParamsTag && !fileDirectory.ModelTiepointTag) {
        logMessage('Warning: File may not have complete GeoTIFF metadata, but will attempt to process anyway', 'warn');
      }

      // Get image dimensions
      const width = image.getWidth();
      const height = image.getHeight();

      // Validate dimensions
      if (width <= 0 || height <= 0) {
        throw new Error(`Invalid image dimensions: ${width}x${height}`);
      }
      
      setProcessingState(prev => ({
        ...prev,
        messages: [...prev.messages, { 
          type: 'info', 
          text: `Image dimensions: ${width}x${height}` 
        }]
      }));

      // Check if the image dimensions are too large
      const MAX_DIMENSION = 10000; // Maximum dimension size
      const MAX_PIXEL_COUNT = 100000000; // 100 million pixels max
      
      let scaleFactor = 1;
      let scaledWidth = width;
      let scaledHeight = height;
      
      // Calculate scale factor if image is too large
      if (width > MAX_DIMENSION || height > MAX_DIMENSION || (width * height) > MAX_PIXEL_COUNT) {
        // Calculate scale factor based on the largest dimension
        const widthScale = width > MAX_DIMENSION ? MAX_DIMENSION / width : 1;
        const heightScale = height > MAX_DIMENSION ? MAX_DIMENSION / height : 1;
        const pixelCountScale = (width * height) > MAX_PIXEL_COUNT ? Math.sqrt(MAX_PIXEL_COUNT / (width * height)) : 1;
        
        // Use the smallest scale factor to ensure all constraints are met
        scaleFactor = Math.min(widthScale, heightScale, pixelCountScale);
        
        // Calculate new dimensions
        scaledWidth = Math.floor(width * scaleFactor);
        scaledHeight = Math.floor(height * scaleFactor);
        
        setProcessingState(prev => ({
          ...prev,
          messages: [...prev.messages, { 
            type: 'warn', 
            text: `Image is too large (${width}x${height}), downsampling to ${scaledWidth}x${scaledHeight}` 
          }]
        }));
      }
      
      // Read the data
      const data = await image.readRasters();
      
      // Validate that we have data
      if (!data || data.length === 0) {
        throw new Error(`No raster data found in the image file: ${file.name}`);
      }
      
      setProcessingState(prev => ({
        ...prev,
        messages: [...prev.messages, { 
          type: 'info', 
          text: `Read ${data.length} bands from the image` 
        }]
      }));
      
      // Create a canvas to draw the image
      const canvas = document.createElement('canvas');
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;
      const ctx = canvas.getContext('2d');
      
      // Create ImageData with additional validation
      let imageData;
      try {
        imageData = ctx.createImageData(scaledWidth, scaledHeight);
      } catch (error) {
        throw new Error(`Failed to create image data with dimensions ${scaledWidth}x${scaledHeight}: ${error.message}`);
      }
      
      // Determine which bands to use based on the sensor type
      let redBand, greenBand, blueBand;
      
      // Check if this is a Sentinel-2 image by looking for common band names
      const isSentinel2 = file.name.includes('S2') || file.name.includes('Sentinel2');
      
      if (isSentinel2) {
        // For Sentinel-2, try to identify bands by name or position
        // B4 (Red), B3 (Green), B2 (Blue) are typical RGB bands
        redBand = data[3] || data[0];
        greenBand = data[2] || data[1];
        blueBand = data[1] || data[2];
      } else {
        // Default to first three bands as RGB
        redBand = data[0];
        greenBand = data[1];
        blueBand = data[2];
      }
      
      // Fill the image data
      for (let i = 0; i < scaledWidth * scaledHeight; i++) {
        // Calculate indices
        const idx = i * 4;
        
        // Validate index is within bounds
        if (idx >= imageData.data.length - 3) {
          console.warn(`Index ${idx} is out of bounds for image data length ${imageData.data.length}`);
          continue;
        }
        
        // Calculate the corresponding position in the original image
        const x = i % scaledWidth;
        const y = Math.floor(i / scaledWidth);
        const origX = Math.min(Math.floor(x / scaleFactor), width - 1);
        const origY = Math.min(Math.floor(y / scaleFactor), height - 1);
        const origIdx = origY * width + origX;
        
        // Get pixel values from each band, with bounds checking
        const redValue = redBand && origIdx < redBand.length ? redBand[origIdx] : 0;
        const greenValue = greenBand && origIdx < greenBand.length ? greenBand[origIdx] : 0;
        const blueValue = blueBand && origIdx < blueBand.length ? blueBand[origIdx] : 0;
        
        // Normalize values (assuming 16-bit data, adjust as needed)
        const normalizedRed = Math.min(255, Math.max(0, Math.floor(redValue / 256)));
        const normalizedGreen = Math.min(255, Math.max(0, Math.floor(greenValue / 256)));
        const normalizedBlue = Math.min(255, Math.max(0, Math.floor(blueValue / 256)));
        
        // Set RGBA values
        imageData.data[idx] = normalizedRed;
        imageData.data[idx + 1] = normalizedGreen;
        imageData.data[idx + 2] = normalizedBlue;
        imageData.data[idx + 3] = 255; // Alpha channel
      }
      
      // Apply AoI clipping if available
      if (areaOfInterest) {
        setProcessingState(prev => ({
          ...prev,
          messages: [...prev.messages, { 
            type: 'info', 
            text: `Applying Area of Interest clipping` 
          }]
        }));
        
        try {
          // Scale the AoI bounds if we've downsampled the image
          let scaledAoI = areaOfInterest;
          if (scaleFactor !== 1) {
            if (areaOfInterest.type === 'Feature') {
              // Deep clone the GeoJSON to avoid modifying the original
              scaledAoI = JSON.parse(JSON.stringify(areaOfInterest));
              // Scale the coordinates
              scaledAoI.geometry.coordinates[0] = scaledAoI.geometry.coordinates[0].map(coord => [
                coord[0] * scaleFactor,
                coord[1] * scaleFactor
              ]);
            } else if (Array.isArray(areaOfInterest.coordinates)) {
              // Deep clone the GeoJSON to avoid modifying the original
              scaledAoI = JSON.parse(JSON.stringify(areaOfInterest));
              // Scale the coordinates
              scaledAoI.coordinates[0] = scaledAoI.coordinates[0].map(coord => [
                coord[0] * scaleFactor,
                coord[1] * scaleFactor
              ]);
            }
          }
          
          // Clip the image to the AoI
          const clippedImageData = await clipToAoI(
            { 
              data: imageData.data, 
              width: scaledWidth, 
              height: scaledHeight 
            }, 
            scaledAoI
          );
          
          // Update the image data with the clipped data
          imageData = ctx.createImageData(clippedImageData.width, clippedImageData.height);
          imageData.data.set(clippedImageData.data);
          
          setProcessingState(prev => ({
            ...prev,
            messages: [...prev.messages, { 
              type: 'info', 
              text: `Clipped image to dimensions: ${clippedImageData.width}x${clippedImageData.height}` 
            }]
          }));
        } catch (error) {
          setProcessingState(prev => ({
            ...prev,
            messages: [...prev.messages, { 
              type: 'error', 
              text: `Error clipping to AoI: ${error.message}` 
            }]
          }));
          // Continue with the unclipped image
        }
      } else {
        setProcessingState(prev => ({
          ...prev,
          messages: [...prev.messages, { 
            type: 'info', 
            text: `Processing full image (no AoI defined)` 
          }]
        }));
      }
      
      // Put the image data on the canvas
      ctx.putImageData(imageData, 0, 0);
      
      // Return the processed image data
      return {
        width: imageData.width,
        height: imageData.height,
        data: imageData.data,
        canvas,
        metadata: {
          filename: file.name,
          size: file.size,
          type: file.type,
          geotiff: {
            width,
            height,
            ...fileDirectory
          },
          originalCoordinates: imageData.originalCoordinates
        }
      };
    } catch (error) {
      console.error('Error reading image file:', error);
      setProcessingState(prev => ({
        ...prev,
        messages: [...prev.messages, { 
          type: 'error', 
          text: `Error reading image file: ${error.message}`,
          details: error.stack
        }]
      }));
      throw error;
    }
  };

  // Add a utility function to check if a file is a valid GeoTIFF before processing
  const isValidGeoTIFF = async (file) => {
    try {
      // Basic check for file type - just ensure it's a TIFF file
      if (!file.name.toLowerCase().endsWith('.tif') && !file.name.toLowerCase().endsWith('.tiff')) {
        logMessage(`File ${file.name} is not a TIFF file based on extension`, 'warn');
        return false;
      }
      
      // For more detailed validation, we'll check in the readImageFile function
      // but we'll be lenient and try to process even if some GeoTIFF tags are missing
      return true;
    } catch (error) {
      logMessage(`Error checking if file is a valid TIFF: ${error.message}`, 'error');
      return false;
    }
  };

  return (
    <div className="processing-console">
      <div className="processing-header">
        <h2>Image Processing</h2>
        <div className="processing-summary">
          <span>Detect water bodies and extract shorelines</span>
        </div>
      </div>

      <div className="processing-options">
        <div className="option-group">
          <h3>Processing Options</h3>
          <div className="option-controls">
            {areaOfInterest && (
              <div className="aoi-status">
                <div className="status-indicator success">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>Area of Interest is set and will be used for processing</span>
              </div>
            )}
            {!areaOfInterest && (
              <div className="aoi-status">
                <div className="status-indicator warning">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>No Area of Interest defined. Processing will use the entire image.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="console-header">
        <h3>Processing Console</h3>
        <div className="controls">
          {processingState.status === 'idle' && (
            <button onClick={startProcessing} className="action-button primary-button">Start Processing</button>
          )}
          {processingState.status === 'running' && (
            <button onClick={() => setProcessingState(prev => ({
              ...prev,
              status: 'paused'
            }))} className="action-button secondary-button">
              Pause
            </button>
          )}
          {processingState.status === 'paused' && (
            <button onClick={() => setProcessingState(prev => ({
              ...prev,
              status: 'running'
            }))} className="action-button secondary-button">
              Resume
            </button>
          )}
          {processingState.status === 'completed' && (
            <button 
              onClick={() => window.location.href = '/results'} 
              className="action-button primary-button">
              View Results
            </button>
          )}
          {processingState.status === 'error' && (
            <button onClick={startProcessing} className="action-button primary-button">Retry Processing</button>
          )}
        </div>
      </div>

      <div className="progress-indicators">
        <div className="progress-item">
          <span>Image Collection:</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{width: `${processingState.progress.imageCollection}%`}}
            ></div>
          </div>
          <span>{processingState.progress.imageCollection}%</span>
        </div>

        <div className="progress-item">
          <span>Water Mask:</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{width: `${processingState.progress.waterMask}%`}}
            ></div>
          </div>
          <span>{processingState.progress.waterMask}%</span>
        </div>

        <div className="progress-item">
          <span>Vectorization:</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{width: `${processingState.progress.vectorization}%`}}
            ></div>
          </div>
          <span>{processingState.progress.vectorization}%</span>
        </div>
      </div>

      <div className="console-messages">
        <h4>Processing Log</h4>
        <div className="message-container" style={{
          height: '300px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          fontFamily: 'monospace',
          fontSize: '12px',
          whiteSpace: 'pre-wrap',
          marginBottom: '20px'
        }}>
          {processingState.messages.map((message, index) => {
            // Handle both string messages (legacy) and object messages (new format)
            const isLegacyFormat = typeof message === 'string';
            const text = isLegacyFormat ? message : message.text;
            const level = isLegacyFormat ? 'info' : message.level;
            
            // Set style based on message level
            const style = {
              padding: '3px 5px',
              marginBottom: '2px',
              borderLeft: '3px solid',
              borderLeftColor: level === 'error' ? '#ff5252' : 
                              level === 'warn' ? '#ffb74d' : 
                              '#4caf50'
            };
            
            return (
              <div key={index} className={`message message-${level}`} style={style}>
                {text}
                {!isLegacyFormat && message.details && message.details !== 'null' && (
                  <details>
                    <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginTop: '3px' }}>Details</summary>
                    <pre style={{ 
                      marginTop: '5px', 
                      padding: '5px', 
                      backgroundColor: '#e0e0e0',
                      maxHeight: '100px',
                      overflowY: 'auto'
                    }}>
                      {message.details}
                    </pre>
                  </details>
                )}
              </div>
            );
          })}
        </div>
        <button 
          onClick={() => setProcessingState(prev => ({ ...prev, messages: [] }))}
          style={{ marginBottom: '10px' }}
        >
          Clear Log
        </button>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .processing-console {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1.5rem;
          background: #121212;
          color: #fff;
        }

        .processing-header {
          margin-bottom: 1.5rem;
        }

        .processing-header h2 {
          font-size: 1.8rem;
          margin: 0 0 0.5rem 0;
        }
        
        .processing-summary {
          color: #aaa;
        }

        .processing-options {
          background: #1a1a1a;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .option-group h3 {
          font-size: 1.2rem;
          margin: 0 0 1rem 0;
        }

        .option-controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .option-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #333;
          transition: .4s;
          border-radius: 24px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background-color: #4CAF50;
        }

        input:checked + .toggle-slider:before {
          transform: translateX(26px);
        }

        .aoi-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: #222;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        .status-indicator.success {
          background: rgba(76, 175, 80, 0.2);
          color: #4CAF50;
        }

        .status-indicator.warning {
          background: rgba(255, 152, 0, 0.2);
          color: #FF9800;
        }

        .status-indicator svg {
          width: 16px;
          height: 16px;
        }

        .console-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .console-header h3 {
          font-size: 1.2rem;
          margin: 0;
        }

        .controls {
          display: flex;
          gap: 0.5rem;
        }

        .progress-indicators {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .progress-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .progress-bar {
          width: 100%;
          height: 10px;
          background: #333;
          border-radius: 5px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #4CAF50;
          transition: width 0.5s;
        }

        .console-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          background: #1a1a1a;
          border-radius: 8px;
        }

        .console-messages h4 {
          margin: 0 0 1rem 0;
        }

        .message-container {
          padding: 1rem;
          background: #222;
          border-radius: 4px;
          font-size: 0.9rem;
          color: #fff;
        }

        .message {
          padding: 0.5rem;
          border-bottom: 1px solid #333;
        }

        .message:last-child {
          border-bottom: none;
        }

        .message-info {
          border-left: 3px solid #4CAF50;
        }

        .message-warn {
          border-left: 3px solid #FF9800;
        }

        .message-error {
          border-left: 3px solid #FF5252;
        }

        .message-details {
          padding: 0.5rem;
          background: #333;
          border-radius: 4px;
          font-size: 0.8rem;
        }

        .message-details pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .action-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .primary-button {
          background: #4CAF50;
          color: white;
        }

        .primary-button:hover {
          background: #45a049;
        }

        .secondary-button {
          background: #333;
          color: white;
        }

        .secondary-button:hover {
          background: #444;
        }

        .disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}} />
    </div>
  );
}
