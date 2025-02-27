// ShorelineDetection.js
import * as cv from 'opencv.js';

/**
 * State configuration for shoreline detection with default values
 */
export const defaultConfig = {
  waterBodySizeThreshold: 10,
  smoothingKernelSize: 2,
  smoothingIterations: 2,
  coastalBuffer: 1.0,
  sarVotesRequired: 2,
  useCustomThreshold: false,
  waterThreshold: 0,
  // AoI is always used when available
  useAoI: true,
  aoiBounds: null // Will be in format [minX, minY, maxX, maxY] in pixel coordinates or GeoJSON
};

// Check if OpenCV is available
const isOpenCVAvailable = () => {
  const available = typeof cv !== 'undefined' && cv !== null;
  console.log(`OpenCV availability check: ${available ? 'AVAILABLE' : 'NOT AVAILABLE'}`);
  if (available) {
    console.log(`OpenCV version: ${cv.version ? cv.version.major + '.' + cv.version.minor + '.' + cv.version.revision : 'unknown'}`);
  }
  return available;
};

// Wait for OpenCV to be ready
const waitForOpenCV = async () => {
  return new Promise((resolve) => {
    // If OpenCV is already available, resolve immediately
    if (isOpenCVAvailable()) {
      console.log('OpenCV is already available and ready to use');
      resolve(true);
      return;
    }

    console.log('Waiting for OpenCV to be ready...');
    
    // If window.onCvReady is already defined, we need to chain our callback
    const originalOnCvReady = window.onCvReady;
    window.onCvReady = () => {
      console.log('OpenCV is now ready - callback triggered');
      if (originalOnCvReady) {
        originalOnCvReady();
      }
      resolve(true);
    };

    // If OpenCV doesn't load within 5 seconds, continue with fallback
    setTimeout(() => {
      console.warn('OpenCV did not load in time (5 second timeout), using fallback methods');
      resolve(false);
    }, 5000);
  });
};

/**
 * Detects water bodies from SAR imagery (Sentinel-1) using multiple methods
 * and a voting system as described in the GEE script
 */
export const detectWaterFromSAR = async (imageData) => {
  try {
    await waitForOpenCV();

    const { data, width, height } = imageData;

    // Ensure we have VV and VH bands
    if (data.length < 2) {
      throw new Error('SAR data requires at least 2 bands (VV and VH)');
    }

    const vvBand = data[0]; // VV polarization
    const vhBand = data[1]; // VH polarization

    // Convert to OpenCV matrices
    const vvMat = cv.matFromArray(height, width, cv.CV_32F, new Float32Array(vvBand));
    const vhMat = cv.matFromArray(height, width, cv.CV_32F, new Float32Array(vhBand));

    // 1. Otsu threshold on VV band (water appears dark in VV)
    const vvThresh = new cv.Mat();
    cv.threshold(vvMat, vvThresh, 0, 1, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);

    // 2. Otsu threshold on VH band (water appears dark in VH)
    const vhThresh = new cv.Mat();
    cv.threshold(vhMat, vhThresh, 0, 1, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);

    // 3. Create VV/VH ratio
    const vvLinear = new cv.Mat();
    const vhLinear = new cv.Mat();

    // Convert dB to linear scale: 10^(band/10)
    vvMat.convertTo(vvLinear, cv.CV_32F, 0.1, 0);
    cv.exp(vvLinear, vvLinear);
    cv.multiply(vvLinear, new cv.Scalar(10), vvLinear);

    vhMat.convertTo(vhLinear, cv.CV_32F, 0.1, 0);
    cv.exp(vhLinear, vhLinear);
    cv.multiply(vhLinear, new cv.Scalar(10), vhLinear);

    // Calculate ratio
    const ratioMat = new cv.Mat();
    cv.divide(vvLinear, vhLinear, ratioMat);

    // Otsu threshold on ratio (water typically has higher ratio)
    const ratioThresh = new cv.Mat();
    cv.threshold(ratioMat, ratioThresh, 0, 1, cv.THRESH_BINARY + cv.THRESH_OTSU);

    // Combine results based on voting
    const waterMask = new cv.Mat();
    cv.add(vvThresh, vhThresh, waterMask);
    cv.add(waterMask, ratioThresh, waterMask);

    // Apply threshold based on sarVotesRequired config (default 2)
    const votesRequired = imageData.config?.sarVotesRequired || 2;
    const finalMask = new cv.Mat();
    cv.threshold(waterMask, finalMask, votesRequired - 0.5, 1, cv.THRESH_BINARY);

    // Clean up matrices
    vvMat.delete();
    vhMat.delete();
    vvThresh.delete();
    vhThresh.delete();
    vvLinear.delete();
    vhLinear.delete();
    ratioMat.delete();
    ratioThresh.delete();
    waterMask.delete();

    return finalMask;
  } catch (error) {
    console.error('Error in detectWaterFromSAR:', error);
    throw error;
  }
};

/**
 * Calculate water indices for optical imagery (Sentinel-2)
 * Implements all water indices described in the GEE script
 */
export const calculateWaterIndex = async (imageData, indexName) => {
  try {
    await waitForOpenCV();
    
    console.log('Calculating water index:', indexName);
    
    if (!imageData || !imageData.data) {
      console.error('Invalid image data for index calculation');
      return null;
    }
    
    const { width, height, data } = imageData;
    
    // Create OpenCV matrices for each band
    const bands = [];
    const numBands = Math.min(data.length / 4, 12); // Maximum 12 bands
    
    for (let b = 0; b < numBands; b++) {
      const band = new cv.Mat(height, width, cv.CV_32F);
      for (let i = 0; i < height * width; i++) {
        band.data32F[i] = data[i * 4 + (b % 3)] / 255.0; // Normalize to 0-1
      }
      bands.push(band);
    }
    
    console.log(`Created ${bands.length} band matrices`);
    
    let resultMat;
    
    // Define band indices for Sentinel-2
    const bandsIndex = {
      B2: 1,  // Blue
      B3: 2,  // Green
      B4: 3,  // Red
      B8: 7,  // NIR
      B11: 10, // SWIR1
      B12: 11  // SWIR2
    };

    // Extract needed bands
    const blue = bands[bandsIndex.B2 - 1]; // Blue
    const green = bands[bandsIndex.B3 - 1]; // Green
    const red = bands[bandsIndex.B4 - 1]; // Red
    const nir = bands[bandsIndex.B8 - 1]; // NIR
    const swir1 = bands[bandsIndex.B11 - 1]; // SWIR1
    const swir2 = bands[bandsIndex.B12 - 1]; // SWIR2

    switch(indexName) {
      case 'Band8':
        resultMat = nir;
        break;

      case 'NDWI':
        // NDWI = (Green - NIR) / (Green + NIR)
        resultMat = new cv.Mat();
        cv.subtract(green, nir, resultMat);
        cv.add(green, nir, green);
        cv.divide(resultMat, green, resultMat);
        break;

      case 'MNDWI':
        // MNDWI = (Green - SWIR1) / (Green + SWIR1)
        resultMat = new cv.Mat();
        cv.subtract(green, swir1, resultMat);
        cv.add(green, swir1, green);
        cv.divide(resultMat, green, resultMat);
        break;

      case 'AWEInsh':
        // AWEInsh = 4 * (GREEN - SWIR1) - (0.25 * NIR + 2.75 * SWIR2)
        resultMat = new cv.Mat();
        cv.subtract(green, swir1, resultMat);
        cv.multiply(resultMat, new cv.Scalar(4), resultMat);
        cv.multiply(nir, new cv.Scalar(0.25), nir);
        cv.multiply(swir2, new cv.Scalar(2.75), swir2);
        cv.add(nir, swir2, nir);
        cv.subtract(resultMat, nir, resultMat);
        break;

      case 'AWEIsh':
        // AWEIsh = BLUE + 2.5 * GREEN - 1.5 * (NIR + SWIR1) - 0.25 * SWIR2
        resultMat = new cv.Mat();
        cv.multiply(green, new cv.Scalar(2.5), green);
        cv.add(blue, green, resultMat);
        cv.add(nir, swir1, nir);
        cv.multiply(nir, new cv.Scalar(1.5), nir);
        cv.multiply(swir2, new cv.Scalar(0.25), swir2);
        cv.add(nir, swir2, nir);
        cv.subtract(resultMat, nir, resultMat);
        break;

      case 'SMBWI':
        // SMBWI = (B2 + B3 + B4) / (B8 + B11 + B12)
        resultMat = new cv.Mat();
        cv.add(blue, green, blue);
        cv.add(blue, red, blue);
        cv.add(nir, swir1, nir);
        cv.add(nir, swir2, nir);
        cv.divide(blue, nir, resultMat);
        break;

      case 'WRI':
        // WRI = (GREEN + RED) / (NIR + SWIR1)
        resultMat = new cv.Mat();
        cv.add(green, red, green);
        cv.add(nir, swir1, nir);
        cv.divide(green, nir, resultMat);
        break;

      case 'NDWI2':
        // NDWI2 = (NIR - SWIR1) / (NIR + SWIR1)
        resultMat = new cv.Mat();
        cv.subtract(nir, swir1, resultMat);
        cv.add(nir, swir1, nir);
        cv.divide(resultMat, nir, resultMat);
        break;

      default:
        // Default to MNDWI if index not recognized
        resultMat = new cv.Mat();
        cv.subtract(green, swir1, resultMat);
        cv.add(green, swir1, green);
        cv.divide(resultMat, green, resultMat);
    }

    // Clean up
    for (let band of bands) {
      band.delete();
    }

    return resultMat;
  } catch (error) {
    console.error(`Error calculating water index ${indexName}:`, error);
    throw error;
  }
};

/**
 * Detects water from optical imagery (Sentinel-2) using Otsu threshold
 * on the chosen water index or custom threshold.
 */
export const detectWaterFromOptical = async (imageData, indexName) => {
  try {
    console.log('Detecting water from optical imagery using index:', indexName);
    
    if (!imageData || !imageData.data) {
      console.error('Invalid image data for water detection');
      return null;
    }
    
    // Special case for Band8 (NIR)
    if (indexName === 'Band8' && imageData.data.length >= 4) {
      // Create a matrix from the NIR band (usually band 4 in Sentinel-2)
      const nirBand = new cv.Mat(imageData.height, imageData.width, cv.CV_8UC1);
      for (let i = 0; i < imageData.height * imageData.width; i++) {
        nirBand.data[i] = imageData.data[i * 4 + 3]; // Use the 4th band (NIR)
      }
      
      // Invert the NIR band (water appears dark in NIR)
      const waterMask = new cv.Mat();
      cv.bitwise_not(nirBand, waterMask);
      
      // Apply Otsu thresholding
      const thresholdValue = new cv.Mat();
      cv.threshold(waterMask, waterMask, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);
      
      nirBand.delete();
      thresholdValue.delete();
      
      return waterMask;
    }

    // Calculate water index
    const waterIndexMat = await calculateWaterIndex(imageData, indexName);
    
    if (!waterIndexMat) {
      console.error('Failed to calculate water index');
      return null;
    }

    // Normalize index for visualization (0-255)
    const normalizedMat = new cv.Mat();
    cv.normalize(waterIndexMat, normalizedMat, 0, 255, cv.NORM_MINMAX, cv.CV_8U);

    const config = imageData.config || {};

    // Apply thresholding
    const waterMask = new cv.Mat();
    if (config.useCustomThreshold) {
      // Use custom threshold if specified
      const threshold = config.waterThreshold || 0;

      // For Band8, water is darker (less than threshold)
      if (indexName === 'Band8') {
        cv.threshold(normalizedMat, waterMask, threshold * 255, 1, cv.THRESH_BINARY_INV);
      } else {
        // For other indices, water is brighter (greater than threshold)
        cv.threshold(normalizedMat, waterMask, threshold * 255, 1, cv.THRESH_BINARY);
      }
    } else {
      // Use Otsu's method
      if (indexName === 'Band8') {
        cv.threshold(normalizedMat, waterMask, 0, 1, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);
      } else {
        cv.threshold(normalizedMat, waterMask, 0, 1, cv.THRESH_BINARY + cv.THRESH_OTSU);
      }
    }

    // Clean up
    waterIndexMat.delete();
    normalizedMat.delete();

    return waterMask;
  } catch (error) {
    console.error(`Error detecting water using ${indexName}:`, error);
    throw error;
  }
};

/**
 * Detects water in Landsat 8/9 using AWEI + Otsu thresholding.
 */
export const detectWaterFromLandsat = async (imageData) => {
  try {
    await waitForOpenCV();

    const { data, width, height } = imageData;

    // Define band indices for Landsat 8/9 (SR = Surface Reflectance)
    const bands = {
      SR_B2: 1, // Blue
      SR_B3: 2, // Green
      SR_B5: 4, // NIR
      SR_B6: 5, // SWIR1
      SR_B7: 6  // SWIR2
    };

    // Extract needed bands
    const green = data[bands.SR_B3];
    const nir = data[bands.SR_B5];
    const swir1 = data[bands.SR_B6];
    const swir2 = data[bands.SR_B7];

    // Calculate AWEI = 4 * (GREEN - SWIR1) - (0.25 * NIR + 2.75 * SWIR2)
    const aweiData = new Float32Array(width * height);
    for (let i = 0; i < aweiData.length; i++) {
      aweiData[i] = 4 * (green[i] - swir1[i]) - (0.25 * nir[i] + 2.75 * swir2[i]);
    }

    // Create OpenCV matrix with AWEI
    const aweiMat = cv.matFromArray(height, width, cv.CV_32F, aweiData);

    // Normalize for visualization (0-255)
    const normalizedMat = new cv.Mat();
    cv.normalize(aweiMat, normalizedMat, 0, 255, cv.NORM_MINMAX, cv.CV_8U);

    // Apply Otsu's thresholding
    const waterMask = new cv.Mat();
    cv.threshold(normalizedMat, waterMask, 0, 1, cv.THRESH_BINARY + cv.THRESH_OTSU);

    // Clean up
    aweiMat.delete();
    normalizedMat.delete();

    return waterMask;
  } catch (error) {
    console.error('Error detecting water from Landsat:', error);
    throw error;
  }
};

/**
 * Clips an image to the specified Area of Interest (AoI)
 * @param {Object} imageData - The image data containing width, height, and data array
 * @param {Object} aoiBounds - The bounds of the AoI in GeoJSON format or as pixel coordinates [minX, minY, maxX, maxY]
 * @returns {Object} The clipped image data
 */
export const clipToAoI = async (imageData, aoiBounds) => {
  if (!aoiBounds) {
    console.log('No AoI bounds provided, returning original image');
    return imageData;
  }

  if (!imageData || !imageData.width || !imageData.height || !imageData.data) {
    console.error('Invalid image data for clipping');
    return imageData;
  }

  try {
    console.log('Clipping image to AoI:', aoiBounds);
    
    // Determine the type of AoI bounds and process accordingly
    if (Array.isArray(aoiBounds) && aoiBounds.length === 4) {
      // Pixel coordinates [minX, minY, maxX, maxY]
      return await clipToPixel(imageData, aoiBounds);
    } else if (aoiBounds.type === 'Feature' || (aoiBounds.coordinates && Array.isArray(aoiBounds.coordinates))) {
      // GeoJSON format
      return await clipToGeoJSON(imageData, aoiBounds);
    } else {
      console.error('Unsupported AoI format:', aoiBounds);
      return imageData;
    }
  } catch (error) {
    console.error('Error in clipToAoI:', error);
    return imageData;
  }
};

/**
 * Clips an image to the specified Area of Interest (AoI) using GeoJSON coordinates
 * @param {Object} imageData - The image data containing width, height, and data array
 * @param {Object} aoiBounds - The bounds of the AoI in the format of GeoJSON coordinates
 * @returns {Object} The clipped image data
 */
export const clipToGeoJSON = async (imageData, aoiBounds) => {
  if (!aoiBounds) {
    console.log('No AoI bounds provided, returning original image');
    return imageData;
  }

  try {
    console.log('Clipping image to AoI:', aoiBounds);
    
    // Validate imageData
    if (!imageData || !imageData.width || !imageData.height || !imageData.data) {
      console.error('Invalid image data for clipping');
      return imageData;
    }
    
    // Convert GeoJSON coordinates to pixel coordinates
    // This is a simplified version - in a real app, you'd use proper geo-transformation
    let minX, minY, maxX, maxY;
    
    if (aoiBounds.type === 'Feature' && aoiBounds.geometry && aoiBounds.geometry.coordinates) {
      // Extract coordinates from GeoJSON Feature
      const coordinates = aoiBounds.geometry.coordinates[0]; // First polygon, assuming it's the outer ring
      
      if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0) {
        console.error('Invalid coordinates in GeoJSON Feature');
        return imageData;
      }
      
      // Initialize with first coordinate
      minX = maxX = coordinates[0][0];
      minY = maxY = coordinates[0][1];
      
      // Find min/max values
      for (const coord of coordinates) {
        minX = Math.min(minX, coord[0]);
        minY = Math.min(minY, coord[1]);
        maxX = Math.max(maxX, coord[0]);
        maxY = Math.max(maxY, coord[1]);
      }
    } else if (Array.isArray(aoiBounds.coordinates) && aoiBounds.coordinates.length > 0) {
      // Extract coordinates from GeoJSON Polygon format
      const coordinates = aoiBounds.coordinates[0]; // First polygon, assuming it's the outer ring
      
      if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0) {
        console.error('Invalid coordinates in GeoJSON Polygon');
        return imageData;
      }
      
      // Initialize with first coordinate
      minX = maxX = coordinates[0][0];
      minY = maxY = coordinates[0][1];
      
      // Find min/max values
      for (const coord of coordinates) {
        minX = Math.min(minX, coord[0]);
        minY = Math.min(minY, coord[1]);
        maxX = Math.max(maxX, coord[0]);
        maxY = Math.max(maxY, coord[1]);
      }
    } else {
      console.error('Invalid AoI bounds format', aoiBounds);
      return imageData;
    }
    
    // Convert to pixel coordinates (assuming image coordinates match the GeoJSON coordinates)
    // In a real application, you would use proper geo-transformation based on the image's georeference
    const pixelMinX = Math.max(0, Math.floor(minX));
    const pixelMinY = Math.max(0, Math.floor(minY));
    const pixelMaxX = Math.min(imageData.width - 1, Math.ceil(maxX));
    const pixelMaxY = Math.min(imageData.height - 1, Math.ceil(maxY));
    
    // Calculate dimensions of the clipped image
    const clipWidth = pixelMaxX - pixelMinX + 1;
    const clipHeight = pixelMaxY - pixelMinY + 1;
    
    console.log(`Clipping to region: (${pixelMinX},${pixelMinY}) to (${pixelMaxX},${pixelMaxY}), size: ${clipWidth}x${clipHeight}`);
    
    if (clipWidth <= 0 || clipHeight <= 0) {
      console.error('Invalid clip dimensions:', clipWidth, clipHeight);
      return imageData;
    }
    
    // Create a new image data array for the clipped region
    const clippedData = new Uint8ClampedArray(clipWidth * clipHeight * 4);
    
    // Copy pixel data from the original image to the clipped image
    for (let y = 0; y < clipHeight; y++) {
      for (let x = 0; x < clipWidth; x++) {
        const srcIdx = ((pixelMinY + y) * imageData.width + (pixelMinX + x)) * 4;
        const dstIdx = (y * clipWidth + x) * 4;
        
        clippedData[dstIdx] = imageData.data[srcIdx];         // R
        clippedData[dstIdx + 1] = imageData.data[srcIdx + 1]; // G
        clippedData[dstIdx + 2] = imageData.data[srcIdx + 2]; // B
        clippedData[dstIdx + 3] = imageData.data[srcIdx + 3]; // A
      }
    }
    
    // Return the clipped image data
    return {
      width: clipWidth,
      height: clipHeight,
      data: clippedData,
      // Store the original coordinates for reference
      originalCoordinates: {
        x: pixelMinX,
        y: pixelMinY,
        width: clipWidth,
        height: clipHeight
      }
    };
  } catch (error) {
    console.error('Error clipping image to AoI:', error);
    return imageData;
  }
};

/**
 * Clips an image to the specified Area of Interest (AoI) using pixel coordinates
 * @param {Object} imageData - The image data containing width, height, and data array
 * @param {Array} aoiBounds - The bounds of the AoI in pixel coordinates [minX, minY, maxX, maxY]
 * @returns {Object} The clipped image data
 */
export const clipToPixel = async (imageData, aoiBounds) => {
  if (!aoiBounds) {
    console.log('No AoI bounds provided, returning original image');
    return imageData;
  }

  try {
    console.log('Clipping image to AoI:', aoiBounds);
    
    // Validate imageData
    if (!imageData || !imageData.width || !imageData.height || !imageData.data) {
      console.error('Invalid image data for clipping');
      return imageData;
    }
    
    // Validate aoiBounds is an array with 4 elements
    if (!Array.isArray(aoiBounds) || aoiBounds.length !== 4) {
      console.error('Invalid AoI bounds format, expected [minX, minY, maxX, maxY]');
      return imageData;
    }
    
    // Extract pixel coordinates from the bounds array
    const [pixelMinX, pixelMinY, pixelMaxX, pixelMaxY] = aoiBounds;
    
    // Validate that the coordinates are numbers
    if (isNaN(pixelMinX) || isNaN(pixelMinY) || isNaN(pixelMaxX) || isNaN(pixelMaxY)) {
      console.error('Invalid AoI bounds, coordinates must be numbers');
      return imageData;
    }
    
    // Ensure the coordinates are within the image bounds
    const safeMinX = Math.max(0, Math.floor(pixelMinX));
    const safeMinY = Math.max(0, Math.floor(pixelMinY));
    const safeMaxX = Math.min(imageData.width - 1, Math.ceil(pixelMaxX));
    const safeMaxY = Math.min(imageData.height - 1, Math.ceil(pixelMaxY));
    
    // Calculate dimensions of the clipped image
    const clipWidth = safeMaxX - safeMinX + 1;
    const clipHeight = safeMaxY - safeMinY + 1;
    
    console.log(`Clipping to region: (${safeMinX},${safeMinY}) to (${safeMaxX},${safeMaxY}), size: ${clipWidth}x${clipHeight}`);
    
    if (clipWidth <= 0 || clipHeight <= 0) {
      console.error('Invalid clip dimensions:', clipWidth, clipHeight);
      return imageData;
    }
    
    // Create a new image data array for the clipped region
    const clippedData = new Uint8ClampedArray(clipWidth * clipHeight * 4);
    
    // Copy pixel data from the original image to the clipped image
    for (let y = 0; y < clipHeight; y++) {
      for (let x = 0; x < clipWidth; x++) {
        const srcIdx = ((safeMinY + y) * imageData.width + (safeMinX + x)) * 4;
        const dstIdx = (y * clipWidth + x) * 4;
        
        clippedData[dstIdx] = imageData.data[srcIdx];         // R
        clippedData[dstIdx + 1] = imageData.data[srcIdx + 1]; // G
        clippedData[dstIdx + 2] = imageData.data[srcIdx + 2]; // B
        clippedData[dstIdx + 3] = imageData.data[srcIdx + 3]; // A
      }
    }
    
    // Return the clipped image data
    return {
      width: clipWidth,
      height: clipHeight,
      data: clippedData,
      // Store the original coordinates for reference
      originalCoordinates: {
        x: safeMinX,
        y: safeMinY,
        width: clipWidth,
        height: clipHeight
      }
    };
  } catch (error) {
    console.error('Error clipping image to AoI:', error);
    return imageData;
  }
};

/**
 * Clean water mask using morphological operations and size filtering
 */
export const cleanWaterMask = async (waterMask, config = {}) => {
  try {
    await waitForOpenCV();

    // Set defaults from config or use defaults
    const minWaterBodySize = config.waterBodySizeThreshold || defaultConfig.waterBodySizeThreshold;
    const kernelSize = config.smoothingKernelSize || defaultConfig.smoothingKernelSize;
    const iterations = config.smoothingIterations || defaultConfig.smoothingIterations;

    // Clone the mask to avoid modifying the original
    const cleanedMask = waterMask.clone();

    // Create kernel for morphological operations
    const kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(kernelSize, kernelSize));

    // Perform smoothing (opening followed by closing)
    for (let i = 0; i < iterations; i++) {
      // Opening (erosion then dilation) - removes small objects
      cv.morphologyEx(cleanedMask, cleanedMask, cv.MORPH_OPEN, kernel);

      // Closing (dilation then erosion) - fills small holes
      cv.morphologyEx(cleanedMask, cleanedMask, cv.MORPH_CLOSE, kernel);
    }

    // Remove small water bodies
    if (minWaterBodySize > 0) {
      // Find contours
      const contours = new cv.MatVector();
      const hierarchy = new cv.Mat();

      // Use a clone for finding contours since the function modifies the input
      const tempMask = cleanedMask.clone();
      cv.findContours(tempMask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
      tempMask.delete();

      // Create empty mask
      const filteredMask = cv.Mat.zeros(cleanedMask.rows, cleanedMask.cols, cv.CV_8U);

      // Draw only contours with area >= minWaterBodySize
      for (let i = 0; i < contours.size(); i++) {
        const area = cv.contourArea(contours.get(i));
        if (area >= minWaterBodySize) {
          const white = new cv.Scalar(255, 255, 255, 255);
          cv.drawContours(filteredMask, contours, i, white, -1); // -1 fills the contour
        }
      }

      // Clean up
      contours.delete();
      hierarchy.delete();
      cleanedMask.delete();

      return filteredMask;
    }

    // Clean up
    kernel.delete();

    return cleanedMask;
  } catch (error) {
    console.error('Error in cleanWaterMask:', error);
    throw error;
  }
};

/**
 * Extract shoreline directly from pixel data without OpenCV
 * This is a fallback method when OpenCV processing fails
 */
export const extractShorelineFromPixels = (waterMask, config = {}) => {
  try {
    console.log('Starting extractShorelineFromPixels with config:', config);
    
    // Get dimensions from the water mask
    let width, height, pixelData;
    
    // Handle different input formats
    if (waterMask.cols && waterMask.rows) {
      // It's an OpenCV Mat
      width = waterMask.cols;
      height = waterMask.rows;
      try {
        console.log(`Extracting pixel data from OpenCV Mat (${width}x${height})`);
        pixelData = new Uint8Array(waterMask.data);
      } catch (error) {
        console.warn('Failed to get pixel data from OpenCV Mat:', error);
        throw new Error('Cannot extract pixel data from OpenCV Mat');
      }
    } else if (waterMask.width && waterMask.height && waterMask.data) {
      // It's a raw data object with dimensions
      width = waterMask.width;
      height = waterMask.height;
      console.log(`Using raw data object with dimensions ${width}x${height}`);
      
      // Handle different data formats
      if (Array.isArray(waterMask.data)) {
        // It's an array of bands
        console.log(`Raw data has ${waterMask.data.length} bands`);
        if (waterMask.data.length > 0) {
          // Use the first band
          pixelData = waterMask.data[0];
          console.log(`Using first band with ${pixelData.length} pixels`);
        } else {
          throw new Error('No band data available');
        }
      } else {
        // It's a direct pixel array
        pixelData = waterMask.data;
        console.log(`Using direct pixel array with ${pixelData.length} pixels`);
      }
    } else {
      console.error('Unknown water mask format:', waterMask);
      throw new Error('Unsupported water mask format for pixel extraction');
    }

    if (!pixelData || pixelData.length === 0) {
      throw new Error('No pixel data available for shoreline extraction');
    }

    console.log(`Processing ${width}x${height} pixel data for shoreline extraction (${pixelData.length} pixels)`);

    // Find the boundary pixels (where water meets land)
    const boundaryPoints = [];
    const visited = new Set();

    // Helper to check if a pixel is a boundary pixel (water pixel with at least one land neighbor)
    const isBoundaryPixel = (x, y) => {
      if (x < 0 || x >= width || y < 0 || y >= height) return false;

      const idx = y * width + x;
      // Check if this is a water pixel (value > 0)
      if (pixelData[idx] === 0) return false;

      // Check if any of the 8 neighbors is land (value === 0)
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;

          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const neighborIdx = ny * width + nx;
            if (pixelData[neighborIdx] === 0) {
              return true; // This is a boundary pixel
            }
          }
        }
      }

      return false;
    };

    // Scan the image to find boundary pixels
    console.log('Scanning image for boundary pixels...');
    let scanCount = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        scanCount++;
        if (scanCount % 1000000 === 0) {
          console.log(`Scanning progress: ${Math.round((scanCount / (width * height)) * 100)}%`);
        }
        
        if (isBoundaryPixel(x, y)) {
          const key = `${x},${y}`;
          if (!visited.has(key)) {
            visited.add(key);
            boundaryPoints.push([x, y]);
          }
        }
      }
    }

    console.log(`Found ${boundaryPoints.length} boundary points from ${scanCount} pixels scanned`);

    // If we have very few points, it might be an error
    if (boundaryPoints.length < 3) {
      console.warn('Very few boundary points found, shoreline extraction may be inaccurate');
    }

    // Create a GeoJSON feature from the boundary points
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: boundaryPoints
      },
      properties: {
        id: 0,
        length: boundaryPoints.length,
        method: 'direct-pixel'
      }
    };

    console.log('Successfully created GeoJSON feature from boundary points');
    
    // Return as GeoJSON FeatureCollection
    return {
      type: 'FeatureCollection',
      features: [feature]
    };
  } catch (error) {
    console.error('Error in extractShorelineFromPixels:', error);
    throw error;
  }
};

/**
 * Extract shoreline from binary water mask
 */
export const extractShoreline = async (waterMask, config = {}) => {
  try {
    console.log('Starting shoreline extraction with config:', config);
    
    // Set defaults from config or use defaults
    const coastalBuffer = config.coastalBuffer || defaultConfig.coastalBuffer;

    // Check if OpenCV is available
    const opencvAvailable = await waitForOpenCV();
    if (!opencvAvailable) {
      console.log('OpenCV not available, using direct pixel method for shoreline extraction');
      return extractShorelineFromPixels(waterMask, config);
    }

    // Try OpenCV method first
    try {
      console.log('Using OpenCV for shoreline extraction');
      
      // Log water mask info
      if (waterMask.cols && waterMask.rows) {
        console.log(`Water mask dimensions: ${waterMask.cols}x${waterMask.rows}, type: ${waterMask.type()}`);
      } else {
        console.log('Water mask is not an OpenCV Mat, attempting to convert');
      }
      
      // Find contours in the water mask
      const contours = new cv.MatVector();
      const hierarchy = new cv.Mat();

      // Clone to prevent modifying original
      console.log('Cloning water mask for contour detection');
      const tempMask = waterMask.clone();
      
      console.log('Finding contours in water mask');
      cv.findContours(tempMask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
      console.log(`Found ${contours.size()} contours`);
      tempMask.delete();

      // Convert contours to GeoJSON features
      const features = [];
      for (let i = 0; i < contours.size(); i++) {
        const contour = contours.get(i);
        const points = [];

        // Get coordinates from contour (OpenCV stores them as x,y pairs)
        for (let j = 0; j < contour.data32S.length; j += 2) {
          points.push([
            contour.data32S[j],
            contour.data32S[j + 1]
          ]);
        }

        const length = cv.arcLength(contour, true);
        const area = cv.contourArea(contour);
        
        console.log(`Contour ${i}: ${points.length} points, length: ${length}, area: ${area}`);

        // Create GeoJSON feature
        features.push({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: points
          },
          properties: {
            id: i,
            length: length,
            area: area,
            method: 'opencv'
          }
        });
      }

      // Clean up
      console.log('Cleaning up OpenCV resources');
      contours.delete();
      hierarchy.delete();

      console.log(`Successfully extracted ${features.length} shoreline features using OpenCV`);
      
      // Return as GeoJSON FeatureCollection
      return {
        type: 'FeatureCollection',
        features: features
      };
    } catch (opencvError) {
      console.warn('OpenCV shoreline extraction failed, falling back to direct pixel method:', opencvError);

      // Fall back to direct pixel method
      return extractShorelineFromPixels(waterMask, config);
    }
  } catch (error) {
    console.error('Error in extractShoreline:', error);
    throw error;
  }
};

/**
 * Simple fallback water detection when OpenCV is not available
 * This uses a basic threshold on the first band of the image
 */
export const detectWaterWithoutOpenCV = (imageData, threshold = 0.3) => {
  try {
    console.log('Starting simple water detection without OpenCV');
    
    const { data, width, height } = imageData;
    
    // Use the first band for thresholding
    const band = data[0];
    if (!band || band.length === 0) {
      throw new Error('No band data available for water detection');
    }
    
    console.log(`Performing simple threshold-based water detection on ${width}x${height} image`);
    
    // Create a binary mask using the threshold
    const mask = new Uint8Array(width * height);
    
    // Find min/max values for auto-thresholding
    let min = Infinity;
    let max = -Infinity;
    
    for (let i = 0; i < band.length; i++) {
      const value = band[i];
      if (value < min) min = value;
      if (value > max) max = value;
    }
    
    // Calculate threshold if not provided (simple method)
    const autoThreshold = min + (max - min) * threshold;
    const actualThreshold = threshold > 1 ? threshold : autoThreshold;
    
    console.log(`Water detection using threshold: ${actualThreshold} (min: ${min}, max: ${max})`);
    
    // Apply threshold to create binary mask
    let waterPixels = 0;
    for (let i = 0; i < band.length; i++) {
      // Invert the logic: values below threshold are water (255), above are land (0)
      const isWater = band[i] < actualThreshold;
      mask[i] = isWater ? 255 : 0;
      if (isWater) waterPixels++;
    }
    
    console.log(`Water detection complete: ${waterPixels} water pixels (${(waterPixels / band.length * 100).toFixed(2)}% of image)`);
    
    return {
      data: mask,
      width,
      height,
      isRawData: true
    };
  } catch (error) {
    console.error('Error in detectWaterWithoutOpenCV:', error);
    throw error;
  }
};

/**
 * Main detection function that uses the appropriate method based on input image type
 */
export const detectWater = async (imageData, waterIndex, config = {}) => {
  try {
    console.log('Starting water detection with config:', config);
    
    // Store config in the imageData for use by other functions
    imageData.config = config;

    console.log('Detecting water using:', {
      waterIndex,
      imageType: config.imageType || 'unknown',
      sensorType: config.sensorType || 'unknown',
      bands: imageData.data.length
    });

    // Check if OpenCV is available
    const opencvAvailable = await waitForOpenCV();
    if (!opencvAvailable) {
      console.log('OpenCV not available, using simple threshold-based water detection');
      return await detectWaterWithoutOpenCV(imageData, config.waterThreshold || 0.3);
    }

    console.log('OpenCV is available, proceeding with advanced water detection');
    
    let result;
    
    // ALWAYS use optical processing for Sentinel-2 (case insensitive check)
    if (config.sensorType?.toLowerCase() === 'sentinel2' ||
        config.imageType?.toLowerCase() === 'sentinel2') {
      console.log('Using Sentinel-2 optical processing');
      result = await detectWaterFromOptical(imageData, waterIndex);
    }
    // For Sentinel-1 SAR data
    else if (config.sensorType?.toLowerCase() === 'sentinel1' ||
        config.imageType?.toLowerCase() === 'sentinel1') {
      if (imageData.data.length >= 2) {
        console.log('Using Sentinel-1 SAR processing');
        result = await detectWaterFromSAR(imageData);
      } else {
        console.log('Not enough bands for SAR processing, using optical method');
        result = await detectWaterFromOptical(imageData, waterIndex || 'Band8');
      }
    }
    // For Landsat
    else if (config.sensorType?.toLowerCase() === 'landsat' ||
        config.imageType?.toLowerCase() === 'landsat') {
      console.log('Using Landsat processing');
      result = await detectWaterFromLandsat(imageData);
    }
    // Default case - use optical processing with the first band
    else {
      console.log('No specific processing determined, defaulting to optical with first band');
      result = await detectWaterFromOptical(imageData, 'Band8');
    }
    
    if (!result) {
      throw new Error('Water detection failed to produce a result');
    }
    
    return result;
  } catch (error) {
    console.error('Error in detectWater:', error);
    throw error;
  }
};
