import { fromArrayBuffer } from 'geotiff';
// Import the named exports for direct access
import { fromArrays } from 'georaster';

// Define TypedArray type for better type checking
type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | Uint8ClampedArray;

// Maximum file size (1GB)
const MAX_FILE_SIZE = 1024 * 1024 * 1024;

// Allowed image file types
const ALLOWED_TYPES = [
  'image/tiff',
  'image/geotiff',
  'application/octet-stream', // Some GeoTIFF files might have this MIME type
];

// Sentinel-2 specific information
// These are approximate bounds for different UTM zones
// Each UTM zone is 6 degrees wide
const SENTINEL_UTM_ZONES: Record<string, [number, number, number, number]> = {
  // UTM Zone 1 (180°W to 174°W)
  '01': [-180, -80, -174, 84],
  // UTM Zone 2 (174°W to 168°W)
  '02': [-174, -80, -168, 84],
  // UTM Zone 3 (168°W to 162°W)
  '03': [-168, -80, -162, 84],
  // UTM Zone 4 (162°W to 156°W)
  '04': [-162, -80, -156, 84],
  // UTM Zone 5 (156°W to 150°W)
  '05': [-156, -80, -150, 84],
  // UTM Zone 6 (150°W to 144°W)
  '06': [-150, -80, -144, 84],
  // UTM Zone 7 (144°W to 138°W)
  '07': [-144, -80, -138, 84],
  // UTM Zone 8 (138°W to 132°W)
  '08': [-138, -80, -132, 84],
  // UTM Zone 9 (132°W to 126°W)
  '09': [-132, -80, -126, 84],
  // UTM Zone 10 (126°W to 120°W)
  '10': [-126, -80, -120, 84],
  // UTM Zone 11 (120°W to 114°W)
  '11': [-120, -80, -114, 84],
  // UTM Zone 12 (114°W to 108°W)
  '12': [-114, -80, -108, 84],
  // UTM Zone 13 (108°W to 102°W)
  '13': [-108, -80, -102, 84],
  // UTM Zone 14 (102°W to 96°W)
  '14': [-102, -80, -96, 84],
  // UTM Zone 15 (96°W to 90°W)
  '15': [-96, -80, -90, 84],
  // UTM Zone 16 (90°W to 84°W)
  '16': [-90, -80, -84, 84],
  // UTM Zone 17 (84°W to 78°W)
  '17': [-84, -80, -78, 84],
  // UTM Zone 18 (78°W to 72°W)
  '18': [-78, -80, -72, 84],
  // UTM Zone 19 (72°W to 66°W)
  '19': [-72, -80, -66, 84],
  // UTM Zone 20 (66°W to 60°W)
  '20': [-66, -80, -60, 84],
  // UTM Zone 21 (60°W to 54°W)
  '21': [-60, -80, -54, 84],
  // UTM Zone 22 (54°W to 48°W)
  '22': [-54, -80, -48, 84],
  // UTM Zone 23 (48°W to 42°W)
  '23': [-48, -80, -42, 84],
  // UTM Zone 24 (42°W to 36°W)
  '24': [-42, -80, -36, 84],
  // UTM Zone 25 (36°W to 30°W)
  '25': [-36, -80, -30, 84],
  // UTM Zone 26 (30°W to 24°W)
  '26': [-30, -80, -24, 84],
  // UTM Zone 27 (24°W to 18°W)
  '27': [-24, -80, -18, 84],
  // UTM Zone 28 (18°W to 12°W)
  '28': [-18, -80, -12, 84],
  // UTM Zone 29 (12°W to 6°W)
  '29': [-12, -80, -6, 84],
  // UTM Zone 30 (6°W to 0°)
  '30': [-6, -80, 0, 84],
  // UTM Zone 31 (0° to 6°E)
  '31': [0, -80, 6, 84],
  // UTM Zone 32 (6°E to 12°E)
  '32': [6, -80, 12, 84],
  // UTM Zone 33 (12°E to 18°E)
  '33': [12, -80, 18, 84],
  // UTM Zone 34 (18°E to 24°E)
  '34': [18, -80, 24, 84],
  // UTM Zone 35 (24°E to 30°E)
  '35': [24, -80, 30, 84],
  // UTM Zone 36 (30°E to 36°E)
  '36': [30, -80, 36, 84],
  // UTM Zone 37 (36°E to 42°E)
  '37': [36, -80, 42, 84],
  // UTM Zone 38 (42°E to 48°E)
  '38': [42, -80, 48, 84],
  // UTM Zone 39 (48°E to 54°E)
  '39': [48, -80, 54, 84],
  // UTM Zone 40 (54°E to 60°E)
  '40': [54, -80, 60, 84],
  // UTM Zone 41 (60°E to 66°E)
  '41': [60, -80, 66, 84],
  // UTM Zone 42 (66°E to 72°E)
  '42': [66, -80, 72, 84],
  // UTM Zone 43 (72°E to 78°E)
  '43': [72, -80, 78, 84],
  // UTM Zone 44 (78°E to 84°E)
  '44': [78, -80, 84, 84],
  // UTM Zone 45 (84°E to 90°E)
  '45': [84, -80, 90, 84],
  // UTM Zone 46 (90°E to 96°E)
  '46': [90, -80, 96, 84],
  // UTM Zone 47 (96°E to 102°E)
  '47': [96, -80, 102, 84],
  // UTM Zone 48 (102°E to 108°E)
  '48': [102, -80, 108, 84],
  // UTM Zone 49 (108°E to 114°E)
  '49': [108, -80, 114, 84],
  // UTM Zone 50 (114°E to 120°E)
  '50': [114, -80, 120, 84],
  // UTM Zone 51 (120°E to 126°E)
  '51': [120, -80, 126, 84],
  // UTM Zone 52 (126°E to 132°E)
  '52': [126, -80, 132, 84],
  // UTM Zone 53 (132°E to 138°E)
  '53': [132, -80, 138, 84],
  // UTM Zone 54 (138°E to 144°E)
  '54': [138, -80, 144, 84],
  // UTM Zone 55 (144°E to 150°E)
  '55': [144, -80, 150, 84],
  // UTM Zone 56 (150°E to 156°E)
  '56': [150, -80, 156, 84],
  // UTM Zone 57 (156°E to 162°E)
  '57': [156, -80, 162, 84],
  // UTM Zone 58 (162°E to 168°E)
  '58': [162, -80, 168, 84],
  // UTM Zone 59 (168°E to 174°E)
  '59': [168, -80, 174, 84],
  // UTM Zone 60 (174°E to 180°E)
  '60': [174, -80, 180, 84],
};

export interface ProcessedImage {
  id: string;
  name: string;
  url: string;
  bounds: [number, number, number, number]; // [west, south, east, north]
  timestamp: number;
  metadata?: {
    size?: number;
    type?: string;
    isSentinel?: boolean;
    isCOG?: boolean; // Flag to indicate if this is a Cloud Optimized GeoTIFF
    sentinelInfo?: {
      utmZone?: string;
      date?: string;
      band?: string;
      satellite?: string;
      productType?: string;
    };
    [key: string]: any;
  };
  georaster?: any; // GeoRaster object for use with georaster-layer-for-leaflet
  arrayBuffer?: ArrayBuffer; // Original array buffer for use with OpenLayers
}

/**
 * Validates a satellite image file
 */
export function validateImageFile(file: File): void {
  if (!file) {
    throw new Error('No file provided');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
  }

  // Check if the file type is allowed or if the file extension is valid
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const isValidExtension = ['tif', 'tiff'].includes(fileExtension || '');

  if (!ALLOWED_TYPES.includes(file.type) && !isValidExtension) {
    throw new Error('Invalid file type. Please upload a GeoTIFF file.');
  }
}

/**
 * Try to extract Sentinel-2 specific information from the filename
 * Sentinel-2 filenames follow patterns like:
 * - S2A_MSIL1C_20220101T103241_N0301_R108_T32TPN_20220101T124837.SAFE
 * - S2A_MSIL2A_20230615T103031_N0509_R108_T32UME_20230615T180447.SAFE
 * - T34VDN_20250322T100041_TCI_10m.tif (True Color Image)
 */
function extractSentinelInfo(filename: string): { utmZone?: string, date?: string, band?: string, satellite?: string, productType?: string } {
  const info: { utmZone?: string, date?: string, band?: string, satellite?: string, productType?: string } = {};

  // Try to extract UTM zone (e.g., T32TPN -> 32)
  const utmMatch = filename.match(/T(\d{2})[A-Z]{3}/);
  if (utmMatch && utmMatch[1]) {
    info.utmZone = utmMatch[1];
  }

  // Try to extract date (YYYYMMDD format)
  const dateMatch = filename.match(/(\d{8})T\d{6}/);
  if (dateMatch && dateMatch[1]) {
    const dateStr = dateMatch[1];
    // Format the date as YYYY-MM-DD for better display
    info.date = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
  }

  // Try to extract band (e.g., B08)
  const bandMatch = filename.match(/B(\d{2})/);
  if (bandMatch && bandMatch[0]) {
    info.band = bandMatch[0];
  }

  // Check for TCI (True Color Image)
  if (filename.includes('TCI')) {
    info.productType = 'True Color Image';
  }

  // Try to extract satellite (S2A or S2B)
  const satelliteMatch = filename.match(/S2[AB]/);
  if (satelliteMatch && satelliteMatch[0]) {
    info.satellite = satelliteMatch[0];
  } else if (filename.includes('_20')) {
    // If filename contains a date but no explicit satellite marker,
    // it's likely a Sentinel-2 product
    info.satellite = 'Sentinel-2';
  }

  // If we couldn't extract a UTM zone but the filename contains numbers that might be coordinates
  // Try to guess the UTM zone from any numbers that look like coordinates
  if (!info.utmZone) {
    // Look for patterns that might indicate coordinates
    const coordMatch = filename.match(/(\d{1,2})(?:N|S)_(\d{1,3})(?:E|W)/i);
    if (coordMatch) {
      // const lat = parseInt(coordMatch[1]); // Not used
      const lng = parseInt(coordMatch[2]);

      // Rough calculation of UTM zone from longitude
      // UTM zones are 6 degrees wide, starting at -180
      if (!isNaN(lng)) {
        const utmZone = Math.floor((lng + 180) / 6) + 1;
        if (utmZone >= 1 && utmZone <= 60) {
          info.utmZone = utmZone.toString().padStart(2, '0');
        }
      }
    }
  }

  // Extract resolution if present (e.g., 10m, 20m, 60m)
  const resolutionMatch = filename.match(/(\d+)m/);
  if (resolutionMatch && resolutionMatch[1]) {
    info.productType = (info.productType || '') + ` ${resolutionMatch[1]}m resolution`;
  }

  return info;
}

/**
 * Extracts bounds from a GeoTIFF file
 */
async function extractBoundsFromGeoTIFF(arrayBuffer: ArrayBuffer, filename: string): Promise<[number, number, number, number]> {
  try {
    // Parse the GeoTIFF
    const tiff = await fromArrayBuffer(arrayBuffer);

    // Get the first image (most GeoTIFFs only have one)
    const image = await tiff.getImage();
    const geoKeys = image.getGeoKeys();

    // Get the file's metadata
    const fileDirectory = image.getFileDirectory();

    // Try to get the bounding box, with fallback for problematic files
    let xMin, yMin, xMax, yMax;
    try {
      [xMin, yMin, xMax, yMax] = image.getBoundingBox();

      // Validate the bounding box - sometimes we get invalid values
      if (!isFinite(xMin) || !isFinite(yMin) || !isFinite(xMax) || !isFinite(yMax) ||
          xMin === xMax || yMin === yMax) {
        throw new Error('Invalid bounding box values');
      }
    } catch (boundingBoxError) {
      console.warn('Error getting bounding box directly, trying alternative method:', boundingBoxError);

      // Try to calculate bounds from ModelPixelScale and ModelTiepoint
      if (fileDirectory.ModelPixelScale && fileDirectory.ModelTiepoint) {
        const [scaleX, scaleY] = fileDirectory.ModelPixelScale;
        const [, , , originX, originY] = fileDirectory.ModelTiepoint;
        const width = image.getWidth();
        const height = image.getHeight();

        xMin = originX;
        yMax = originY;
        xMax = originX + width * scaleX;
        yMin = originY - height * scaleY;
      } else {
        // If we still can't get bounds, throw an error to be caught by the outer try/catch
        throw new Error('Cannot determine bounds from GeoTIFF metadata');
      }
    }

    console.log('GeoTIFF Metadata:', {
      width: image.getWidth(),
      height: image.getHeight(),
      geoKeys,
      boundingBox: [xMin, yMin, xMax, yMax],
      resolution: image.getResolution(),
      origin: fileDirectory.ModelTiepoint ? fileDirectory.ModelTiepoint.slice(3, 5) : 'Not available',
      pixelScale: fileDirectory.ModelPixelScale || 'Not available'
    });

    // Return the bounding box as [west, south, east, north]
    return [xMin, yMin, xMax, yMax];
  } catch (error) {
    console.error('Error extracting bounds from GeoTIFF:', error);

    // Try to extract Sentinel-2 specific information from the filename
    const sentinelInfo = extractSentinelInfo(filename);
    console.log('Extracted Sentinel info from filename:', sentinelInfo);

    if (sentinelInfo.utmZone && SENTINEL_UTM_ZONES[sentinelInfo.utmZone]) {
      console.log(`Using predefined bounds for UTM zone ${sentinelInfo.utmZone}`);
      return SENTINEL_UTM_ZONES[sentinelInfo.utmZone];
    }

    throw new Error('Failed to extract bounds from the image. It may not be properly georeferenced.');
  }
}

/**
 * Creates a GeoRaster object from a GeoTIFF file
 */
async function createGeoRaster(arrayBuffer: ArrayBuffer, filename?: string): Promise<any> {
  try {
    // Validate input
    if (!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) {
      throw new Error('Invalid array buffer provided to createGeoRaster');
    }

    console.log('Creating GeoRaster from array buffer of size:', arrayBuffer.byteLength);

    // Parse the GeoTIFF
    const tiff = await fromArrayBuffer(arrayBuffer);
    const image = await tiff.getImage();
    const width = image.getWidth();
    const height = image.getHeight();

    // Get bounding box with validation
    let xMin, yMin, xMax, yMax;
    try {
      [xMin, yMin, xMax, yMax] = image.getBoundingBox();

      // Validate the bounding box - sometimes we get invalid values
      if (!isFinite(xMin) || !isFinite(yMin) || !isFinite(xMax) || !isFinite(yMax) ||
          xMin === xMax || yMin === yMax) {
        throw new Error('Invalid bounding box values');
      }
    } catch (boundingBoxError) {
      console.warn('Error getting bounding box for GeoRaster, trying alternative method:', boundingBoxError);

      // Try to calculate bounds from ModelPixelScale and ModelTiepoint
      const fileDirectory = image.getFileDirectory();
      if (fileDirectory.ModelPixelScale && fileDirectory.ModelTiepoint) {
        const [scaleX, scaleY] = fileDirectory.ModelPixelScale;
        const [, , , originX, originY] = fileDirectory.ModelTiepoint;

        xMin = originX;
        yMax = originY;
        xMax = originX + width * scaleX;
        yMin = originY - height * scaleY;
      } else {
        // If we still can't get bounds, throw an error to be caught by the outer try/catch
        throw new Error('Cannot determine bounds from GeoTIFF metadata');
      }
    }

    // Get the file's metadata
    const fileDirectory = image.getFileDirectory();
    const geoKeys = image.getGeoKeys();

    // Log detailed information for debugging
    console.log('GeoTIFF Details:', {
      width,
      height,
      boundingBox: [xMin, yMin, xMax, yMax],
      samplesPerPixel: fileDirectory.SamplesPerPixel || 1,
      bitsPerSample: fileDirectory.BitsPerSample,
      photometricInterpretation: fileDirectory.PhotometricInterpretation,
      hasColorMap: !!fileDirectory.ColorMap,
      projection: geoKeys?.ProjectedCSTypeGeoKey || 'Unknown',
      modelTransformation: fileDirectory.ModelTransformationTag,
      modelTiepoint: fileDirectory.ModelTiepoint,
      modelPixelScale: fileDirectory.ModelPixelScale
    });

    // Read the raster data with options
    const rasters = await image.readRasters({
      interleave: true, // This can help with some GeoTIFF formats
      pool: null, // Don't use a worker pool for small files
      window: [0, 0, width, height] // Read the entire image
    });

    // Log some sample values from the rasters to understand the data range
    const sampleValues = [];
    for (let i = 0; i < Math.min(rasters.length, 3); i++) {
      const band = rasters[i] as TypedArray;
      if (band) {
        const samples = [];
        const step = Math.floor(band.length / 10);
        for (let j = 0; j < band.length; j += step) {
          if (samples.length < 10) samples.push(band[j]);
        }

        // Calculate min/max for this band
        const validSamples = samples.filter(v => v !== null && v !== undefined);
        const min = validSamples.length > 0 ? Math.min(...validSamples) : null;
        const max = validSamples.length > 0 ? Math.max(...validSamples) : null;

        sampleValues.push({ band: i, samples, min, max });
      }
    }
    console.log('Sample raster values:', sampleValues);

    // Determine the noDataValue
    let noDataValue = 0;
    if (fileDirectory.GDAL_NODATA !== undefined) {
      noDataValue = parseFloat(fileDirectory.GDAL_NODATA);
      console.log('Using GDAL_NODATA value:', noDataValue);
    }

    // For Sentinel-2 false color images, we need special handling
    let dataScale = 1;
    // let isSentinel2FalseColor = false; // Not used

    if (filename && filename.includes('False_color')) {
      // This is a Sentinel-2 false color image
      console.log('Detected Sentinel-2 false color image');

      // For Sentinel-2 data, we'll keep the original values
      // The scaling will be done in the pixelValuesToColorFn function
      dataScale = 1;

      // Log some sample values from the first few pixels
      const sampleValues = [];
      for (let i = 0; i < Math.min(rasters.length, 3); i++) {
        const band = rasters[i];
        if (band) {
          // Check if band has slice method (TypedArray or Array)
          if (band && typeof (band as any).slice === 'function') {
            try {
              const samples = Array.from((band as any).slice(0, 10));
              sampleValues.push({ band: i, samples });
            } catch (error) {
              console.warn(`Could not slice band ${i}:`, error);
              // Try to get samples without slice if possible
              const samples = [];
              if (typeof (band as any).length === 'number') {
                for (let j = 0; j < Math.min((band as any).length, 10); j++) {
                  if ((band as any)[j] !== undefined) {
                    samples.push((band as any)[j]);
                  }
                }
              }
              sampleValues.push({ band: i, samples });
            }
          } else if (Array.isArray(band)) {
            // Handle case where band is a regular array
            const samples = band.slice(0, 10);
            sampleValues.push({ band: i, samples });
          } else {
            // Handle case where band is something else
            console.warn(`Band ${i} is not sliceable, type:`, typeof band);
            sampleValues.push({ band: i, samples: [] });
          }
        }
      }
      console.log('Sentinel-2 sample values:', sampleValues);
    }

    // Calculate min/max values for each band
    const mins: number[] = [];
    const maxs: number[] = [];

    for (let i = 0; i < Math.min(rasters.length, 3); i++) {
      const band = rasters[i] as TypedArray;
      if (band) {
        // Sample values to estimate min/max (faster than scanning the whole array)
        const samples: number[] = [];
        const step = Math.max(1, Math.floor(band.length / 1000));
        for (let j = 0; j < band.length; j += step) {
          if (band[j] !== noDataValue && band[j] !== undefined && band[j] !== null) {
            samples.push(band[j]);
          }
        }

        // Calculate min/max for this band
        const min = samples.length > 0 ? Math.min(...samples) : 0;
        const max = samples.length > 0 ? Math.max(...samples) : 65535;

        mins.push(min);
        maxs.push(max);
      }
    }

    console.log('Calculated min/max values for bands:', mins, maxs);

    // Process the arrays if needed (e.g., scaling values)
    const processedArrays = Array.from({ length: rasters.length }, (_, i) => {
      const band = rasters[i];
      if (dataScale !== 1) {
        // Create a new array with scaled values
        const typedBand = band as TypedArray;
        const newArray = new Float32Array(typedBand.length);
        for (let j = 0; j < typedBand.length; j++) {
          newArray[j] = typedBand[j] === noDataValue ? noDataValue : typedBand[j] * dataScale;
        }
        return newArray;
      }
      return band;
    });

    // Create a GeoRaster object with improved configuration
    // Use the directly imported fromArrays function
    console.log('Creating GeoRaster with fromArrays using these parameters:', {
      noDataValue,
      projection: 4326,
      xmin: xMin,
      ymin: yMin,
      xmax: xMax,
      ymax: yMax,
      pixelWidth: (xMax - xMin) / width,
      pixelHeight: (yMax - yMin) / height,
      arraysLength: processedArrays.length,
      minsLength: mins.length,
      maxsLength: maxs.length
    });

    // Validate arrays before passing to fromArrays
    if (!processedArrays || !Array.isArray(processedArrays) || processedArrays.length === 0) {
      throw new Error('Invalid or empty arrays provided to fromArrays');
    }

    // Check if fromArrays is available
    let fromArraysFunction = fromArrays;

    if (typeof fromArraysFunction !== 'function') {
      console.error('Local fromArrays is not a function!', typeof fromArraysFunction);

      // Try to get it from the window object
      if (typeof window !== 'undefined' && typeof (window as any).fromArrays === 'function') {
        console.log('Using window.fromArrays instead');
        fromArraysFunction = (window as any).fromArrays;
      } else {
        console.error('Failed to get fromArrays function');
        throw new Error('GeoRaster library not properly loaded. fromArrays is not a function.');
      }
    }

    // Create the GeoRaster with the available function
    const georaster = await fromArraysFunction({
      noDataValue: noDataValue,
      projection: 4326, // WGS84
      xmin: xMin,
      ymin: yMin,
      xmax: xMax,
      ymax: yMax,
      pixelWidth: (xMax - xMin) / width,
      pixelHeight: (yMax - yMin) / height,
      arrays: processedArrays,
      mins: mins.length > 0 ? mins : undefined,
      maxs: maxs.length > 0 ? maxs : undefined,
    });

    // Log the created georaster for debugging
    console.log('GeoRaster created with properties:', {
      dimensions: georaster.dimensions,
      pixelWidth: georaster.pixelWidth,
      pixelHeight: georaster.pixelHeight,
      noDataValue: georaster.noDataValue,
      projection: georaster.projection,
      numberOfRasters: georaster.numberOfRasters,
      bounds: [georaster.xmin, georaster.ymin, georaster.xmax, georaster.ymax]
    });

    return georaster;
  } catch (error) {
    console.error('Error creating GeoRaster:', error);

    // If we have a filename, check if it's a Sentinel-2 image
    if (filename) {
      const sentinelInfo = extractSentinelInfo(filename);
      if (sentinelInfo.utmZone) {
        console.warn('Could not create GeoRaster for Sentinel-2 image.');
      }
    }

    throw new Error('Failed to create GeoRaster from the image.');
  }
}

/**
 * Processes a satellite image file and returns a web-compatible version
 */
export async function processSatelliteImage(file: File): Promise<ProcessedImage> {
  try {
    validateImageFile(file);

    // Read the file as an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Initialize variables
    let bounds: [number, number, number, number];
    let georaster: any = null;
    let isSentinel = false;

    // Check if this is a COG (Cloud Optimized GeoTIFF) file
    const isCOG = file.name.includes('COG') ||
                file.name.includes('cog') ||
                file.name.includes('cloud_optimized') ||
                file.name.includes('cloud-optimized');

    // Extract Sentinel-2 information from filename
    const sentinelInfo = extractSentinelInfo(file.name);

    // Check if this is a Sentinel-2 image based on filename
    if (file.name.includes('S2') || file.name.match(/T\d{2}[A-Z]{3}/) ||
        file.name.includes('TCI') || sentinelInfo.satellite) {
      console.log('Detected Sentinel-2 image from filename');
      isSentinel = true;
    }

    // Check if this is a Copernicus image
    const isCopernicus = file.name.includes('Copernicus') ||
                         file.name.includes('copernicus') ||
                         file.type === 'image/tiff' ||
                         file.type === 'image/geotiff';

    if (isCopernicus) {
      console.log('Detected Copernicus image based on filename or type');
    }

    // Try to extract bounds from the GeoTIFF
    try {
        bounds = await extractBoundsFromGeoTIFF(arrayBuffer, file.name);

        // Try to create a GeoRaster object
        try {
          // Check if this is a Copernicus image
          const isCopernicus = file.name.includes('Copernicus') ||
                              file.name.includes('copernicus') ||
                              file.type === 'image/tiff' ||
                              file.type === 'image/geotiff';

          if (isCopernicus) {
            console.log('Using special handling for Copernicus GeoTIFF');
            // For Copernicus images, we'll try a more robust approach
            try {
              // Try to create a GeoRaster for Copernicus data
              const tiff = await fromArrayBuffer(arrayBuffer);
              const image = await tiff.getImage();
              const width = image.getWidth();
              const height = image.getHeight();

              // Get the bounding box
              const [xMin, yMin, xMax, yMax] = image.getBoundingBox();

              // Read the raster data with specific options for Copernicus
              const rasters = await image.readRasters({
                interleave: true,
                pool: null,
                window: [0, 0, width, height]
              });

              // Get the appropriate fromArrays function
              let fromArraysFunction = fromArrays;
              if (typeof fromArraysFunction !== 'function') {
                console.error('Local fromArrays is not a function in Copernicus handling!', typeof fromArraysFunction);

                // Try to get it from the window object
                if (typeof window !== 'undefined' && typeof (window as any).fromArrays === 'function') {
                  console.log('Using window.fromArrays instead for Copernicus image');
                  fromArraysFunction = (window as any).fromArrays;
                } else {
                  console.error('Failed to get fromArrays function for Copernicus image');
                  throw new Error('GeoRaster library not properly loaded for Copernicus image. fromArrays is not a function.');
                }
              }

              // Create a GeoRaster object using the available function
              georaster = await fromArraysFunction({
                noDataValue: 0,
                projection: 4326, // WGS84
                xmin: xMin,
                ymin: yMin,
                xmax: xMax,
                ymax: yMax,
                pixelWidth: (xMax - xMin) / width,
                pixelHeight: (yMax - yMin) / height,
                arrays: Array.from({ length: rasters.length }, (_, i) => rasters[i]),
              });

              console.log('Copernicus GeoRaster created successfully:', georaster);
            } catch (copernicusError) {
              console.warn('Error with special Copernicus handling, falling back to standard approach:', copernicusError);
              // Fall back to standard approach
              georaster = await createGeoRaster(arrayBuffer, file.name);
            }
          } else {
            // Standard approach for non-Copernicus images
            georaster = await createGeoRaster(arrayBuffer, file.name);
          }

          console.log('GeoRaster created successfully:', georaster);

          // If this is a Sentinel-2 false color image, let's try a different approach
          if (file.name.includes('False_color')) {
            console.log('This is a Sentinel-2 false color image, trying alternative GeoRaster creation');

            // Try using the georaster library directly
            try {
              // Parse the GeoTIFF
              const tiff = await fromArrayBuffer(arrayBuffer);
              const image = await tiff.getImage();
              const width = image.getWidth();
              const height = image.getHeight();
              const [xMin, yMin, xMax, yMax] = image.getBoundingBox();

              // Read the raster data with options
              const rasters = await image.readRasters();

              // Use the already imported GeoRaster library
              // No need to import again

              // Calculate min/max values for each band
              const altMins: number[] = [];
              const altMaxs: number[] = [];

              for (let i = 0; i < Math.min(rasters.length, 3); i++) {
                const band = rasters[i] as TypedArray;
                if (band) {
                  // Sample values to estimate min/max
                  const samples: number[] = [];
                  const step = Math.max(1, Math.floor(band.length / 1000));
                  for (let j = 0; j < band.length; j += step) {
                    if (band[j] !== 0 && band[j] !== undefined && band[j] !== null) {
                      samples.push(band[j]);
                    }
                  }

                  // Calculate min/max for this band
                  const min = samples.length > 0 ? Math.min(...samples) : 0;
                  const max = samples.length > 0 ? Math.max(...samples) : 65535;

                  altMins.push(min);
                  altMaxs.push(max);
                }
              }

              console.log('Alternative min/max values for bands:', altMins, altMaxs);

              // Get the appropriate fromArrays function for alternative approach
              let fromArraysFunction = fromArrays;
              if (typeof fromArraysFunction !== 'function') {
                console.error('Local fromArrays is not a function in alternative approach!', typeof fromArraysFunction);

                // Try to get it from the window object
                if (typeof window !== 'undefined' && typeof (window as any).fromArrays === 'function') {
                  console.log('Using window.fromArrays instead for alternative approach');
                  fromArraysFunction = (window as any).fromArrays;
                } else {
                  console.error('Failed to get fromArrays function for alternative approach');
                  throw new Error('GeoRaster library not properly loaded for alternative approach. fromArrays is not a function.');
                }
              }

              // Create a GeoRaster object with improved configuration using the available function
              const alternativeGeoraster = await fromArraysFunction({
                noDataValue: 0,
                projection: 4326, // WGS84
                xmin: xMin,
                ymin: yMin,
                xmax: xMax,
                ymax: yMax,
                pixelWidth: (xMax - xMin) / width,
                pixelHeight: (yMax - yMin) / height,
                arrays: Array.from({ length: rasters.length }, (_, i) => rasters[i]), // Use arrays instead of values
                mins: altMins.length > 0 ? altMins : undefined,
                maxs: altMaxs.length > 0 ? altMaxs : undefined,
              });

              console.log('Alternative GeoRaster created successfully:', alternativeGeoraster);

              // Use the alternative georaster if it was created successfully
              georaster = alternativeGeoraster;
            } catch (alternativeError) {
              console.warn('Could not create alternative GeoRaster, using the original one:', alternativeError);
            }
          }
        } catch (geoRasterError) {
          console.warn('Could not create GeoRaster, falling back to simple image overlay:', geoRasterError);
        }
      } catch (boundsError) {
        console.warn('Could not extract bounds from image:', boundsError);

        // If it's a Sentinel image and we have the UTM zone, use predefined bounds
        if (isSentinel && sentinelInfo.utmZone && SENTINEL_UTM_ZONES[sentinelInfo.utmZone]) {
          console.log(`Using predefined bounds for Sentinel-2 UTM zone ${sentinelInfo.utmZone}`);
          bounds = SENTINEL_UTM_ZONES[sentinelInfo.utmZone];
        } else {
          // For non-Sentinel images or if we can't determine the UTM zone,
          // default to a reasonable area (Europe)
          console.log('Using default bounds (Europe)');
          bounds = [-10, 35, 30, 60]; // Western Europe
        }
      }

    // Create a unique ID for the image
    const id = `image-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Create a URL for the image
    const url = URL.createObjectURL(file);

    return {
      id,
      name: file.name,
      url,
      bounds,
      timestamp: Date.now(),
      georaster,
      // Store the original array buffer for GeoTIFF files (for OpenLayers)
      arrayBuffer: arrayBuffer,
      metadata: {
        size: file.size,
        type: file.type,
        isSentinel,
        isCOG,
        sentinelInfo
      }
    };
  } catch (error) {
    console.error('Error processing satellite image:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to process satellite image');
  }
}

/**
 * Releases resources associated with a processed image
 */
export function releaseProcessedImage(image: ProcessedImage): void {
  // Revoke the object URL to free up memory
  URL.revokeObjectURL(image.url);
}
