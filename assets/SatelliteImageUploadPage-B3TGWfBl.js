import { p as parseGeoraster, u as useNavigate, j as jsxRuntimeExports } from "./index-D694obFq.js";
import { b as reactExports } from "./leaflet-CCUyKKIY.js";
import { f as fromArrayBuffer } from "./geotiff-70LCDX0v.js";
import { i as indexedDBService } from "./indexedDBService-C0Tzj_Tb.js";
import { E as ErrorAlert } from "./ErrorAlert-DlvKuJCH.js";
import { F as ForwardRef } from "./ArrowUpTrayIcon-CaILkGVF.js";
import { F as ForwardRef$1 } from "./PhotoIcon-DzvH1I97.js";
import { F as ForwardRef$2 } from "./XCircleIcon-DfrkDXVE.js";
import { F as ForwardRef$3 } from "./ArrowLeftIcon-DL0uFl_m.js";
import { F as ForwardRef$4 } from "./ArrowRightIcon-Dk6_6lE4.js";
import "./georaster-layer-D-eO7TID.js";
import "./georaster-UMjhm2qh.js";
const MAX_FILE_SIZE = 1024 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/tiff",
  "image/geotiff",
  "application/octet-stream"
  // Some GeoTIFF files might have this MIME type
];
const SENTINEL_UTM_ZONES = {
  // UTM Zone 1 (180°W to 174°W)
  "01": [-180, -80, -174, 84],
  // UTM Zone 2 (174°W to 168°W)
  "02": [-174, -80, -168, 84],
  // UTM Zone 3 (168°W to 162°W)
  "03": [-168, -80, -162, 84],
  // UTM Zone 4 (162°W to 156°W)
  "04": [-162, -80, -156, 84],
  // UTM Zone 5 (156°W to 150°W)
  "05": [-156, -80, -150, 84],
  // UTM Zone 6 (150°W to 144°W)
  "06": [-150, -80, -144, 84],
  // UTM Zone 7 (144°W to 138°W)
  "07": [-144, -80, -138, 84],
  // UTM Zone 8 (138°W to 132°W)
  "08": [-138, -80, -132, 84],
  // UTM Zone 9 (132°W to 126°W)
  "09": [-132, -80, -126, 84],
  // UTM Zone 10 (126°W to 120°W)
  "10": [-126, -80, -120, 84],
  // UTM Zone 11 (120°W to 114°W)
  "11": [-120, -80, -114, 84],
  // UTM Zone 12 (114°W to 108°W)
  "12": [-114, -80, -108, 84],
  // UTM Zone 13 (108°W to 102°W)
  "13": [-108, -80, -102, 84],
  // UTM Zone 14 (102°W to 96°W)
  "14": [-102, -80, -96, 84],
  // UTM Zone 15 (96°W to 90°W)
  "15": [-96, -80, -90, 84],
  // UTM Zone 16 (90°W to 84°W)
  "16": [-90, -80, -84, 84],
  // UTM Zone 17 (84°W to 78°W)
  "17": [-84, -80, -78, 84],
  // UTM Zone 18 (78°W to 72°W)
  "18": [-78, -80, -72, 84],
  // UTM Zone 19 (72°W to 66°W)
  "19": [-72, -80, -66, 84],
  // UTM Zone 20 (66°W to 60°W)
  "20": [-66, -80, -60, 84],
  // UTM Zone 21 (60°W to 54°W)
  "21": [-60, -80, -54, 84],
  // UTM Zone 22 (54°W to 48°W)
  "22": [-54, -80, -48, 84],
  // UTM Zone 23 (48°W to 42°W)
  "23": [-48, -80, -42, 84],
  // UTM Zone 24 (42°W to 36°W)
  "24": [-42, -80, -36, 84],
  // UTM Zone 25 (36°W to 30°W)
  "25": [-36, -80, -30, 84],
  // UTM Zone 26 (30°W to 24°W)
  "26": [-30, -80, -24, 84],
  // UTM Zone 27 (24°W to 18°W)
  "27": [-24, -80, -18, 84],
  // UTM Zone 28 (18°W to 12°W)
  "28": [-18, -80, -12, 84],
  // UTM Zone 29 (12°W to 6°W)
  "29": [-12, -80, -6, 84],
  // UTM Zone 30 (6°W to 0°)
  "30": [-6, -80, 0, 84],
  // UTM Zone 31 (0° to 6°E)
  "31": [0, -80, 6, 84],
  // UTM Zone 32 (6°E to 12°E)
  "32": [6, -80, 12, 84],
  // UTM Zone 33 (12°E to 18°E)
  "33": [12, -80, 18, 84],
  // UTM Zone 34 (18°E to 24°E)
  "34": [18, -80, 24, 84],
  // UTM Zone 35 (24°E to 30°E)
  "35": [24, -80, 30, 84],
  // UTM Zone 36 (30°E to 36°E)
  "36": [30, -80, 36, 84],
  // UTM Zone 37 (36°E to 42°E)
  "37": [36, -80, 42, 84],
  // UTM Zone 38 (42°E to 48°E)
  "38": [42, -80, 48, 84],
  // UTM Zone 39 (48°E to 54°E)
  "39": [48, -80, 54, 84],
  // UTM Zone 40 (54°E to 60°E)
  "40": [54, -80, 60, 84],
  // UTM Zone 41 (60°E to 66°E)
  "41": [60, -80, 66, 84],
  // UTM Zone 42 (66°E to 72°E)
  "42": [66, -80, 72, 84],
  // UTM Zone 43 (72°E to 78°E)
  "43": [72, -80, 78, 84],
  // UTM Zone 44 (78°E to 84°E)
  "44": [78, -80, 84, 84],
  // UTM Zone 45 (84°E to 90°E)
  "45": [84, -80, 90, 84],
  // UTM Zone 46 (90°E to 96°E)
  "46": [90, -80, 96, 84],
  // UTM Zone 47 (96°E to 102°E)
  "47": [96, -80, 102, 84],
  // UTM Zone 48 (102°E to 108°E)
  "48": [102, -80, 108, 84],
  // UTM Zone 49 (108°E to 114°E)
  "49": [108, -80, 114, 84],
  // UTM Zone 50 (114°E to 120°E)
  "50": [114, -80, 120, 84],
  // UTM Zone 51 (120°E to 126°E)
  "51": [120, -80, 126, 84],
  // UTM Zone 52 (126°E to 132°E)
  "52": [126, -80, 132, 84],
  // UTM Zone 53 (132°E to 138°E)
  "53": [132, -80, 138, 84],
  // UTM Zone 54 (138°E to 144°E)
  "54": [138, -80, 144, 84],
  // UTM Zone 55 (144°E to 150°E)
  "55": [144, -80, 150, 84],
  // UTM Zone 56 (150°E to 156°E)
  "56": [150, -80, 156, 84],
  // UTM Zone 57 (156°E to 162°E)
  "57": [156, -80, 162, 84],
  // UTM Zone 58 (162°E to 168°E)
  "58": [162, -80, 168, 84],
  // UTM Zone 59 (168°E to 174°E)
  "59": [168, -80, 174, 84],
  // UTM Zone 60 (174°E to 180°E)
  "60": [174, -80, 180, 84]
};
function validateImageFile(file) {
  if (!file) {
    throw new Error("No file provided");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
  }
  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  const isValidExtension = ["tif", "tiff"].includes(fileExtension || "");
  if (!ALLOWED_TYPES.includes(file.type) && !isValidExtension) {
    throw new Error("Invalid file type. Please upload a GeoTIFF file.");
  }
}
function extractSentinelInfo(filename) {
  const info = {};
  const utmMatch = filename.match(/T(\d{2})[A-Z]{3}/);
  if (utmMatch && utmMatch[1]) {
    info.utmZone = utmMatch[1];
  }
  const dateMatch = filename.match(/(\d{8})T\d{6}/);
  if (dateMatch && dateMatch[1]) {
    const dateStr = dateMatch[1];
    info.date = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
  }
  const bandMatch = filename.match(/B(\d{2})/);
  if (bandMatch && bandMatch[0]) {
    info.band = bandMatch[0];
  }
  if (filename.includes("TCI")) {
    info.productType = "True Color Image";
  }
  const satelliteMatch = filename.match(/S2[AB]/);
  if (satelliteMatch && satelliteMatch[0]) {
    info.satellite = satelliteMatch[0];
  } else if (filename.includes("_20")) {
    info.satellite = "Sentinel-2";
  }
  if (!info.utmZone) {
    const coordMatch = filename.match(/(\d{1,2})(?:N|S)_(\d{1,3})(?:E|W)/i);
    if (coordMatch) {
      const lng = parseInt(coordMatch[2]);
      if (!isNaN(lng)) {
        const utmZone = Math.floor((lng + 180) / 6) + 1;
        if (utmZone >= 1 && utmZone <= 60) {
          info.utmZone = utmZone.toString().padStart(2, "0");
        }
      }
    }
  }
  const resolutionMatch = filename.match(/(\d+)m/);
  if (resolutionMatch && resolutionMatch[1]) {
    info.productType = (info.productType || "") + ` ${resolutionMatch[1]}m resolution`;
  }
  return info;
}
async function extractBoundsFromGeoTIFF(arrayBuffer, filename) {
  try {
    const tiff = await fromArrayBuffer(arrayBuffer);
    const image = await tiff.getImage();
    const geoKeys = image.getGeoKeys();
    const fileDirectory = image.getFileDirectory();
    let xMin, yMin, xMax, yMax;
    try {
      [xMin, yMin, xMax, yMax] = image.getBoundingBox();
      if (!isFinite(xMin) || !isFinite(yMin) || !isFinite(xMax) || !isFinite(yMax) || xMin === xMax || yMin === yMax) {
        throw new Error("Invalid bounding box values");
      }
    } catch (boundingBoxError) {
      console.warn("Error getting bounding box directly, trying alternative method:", boundingBoxError);
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
        throw new Error("Cannot determine bounds from GeoTIFF metadata");
      }
    }
    console.log("GeoTIFF Metadata:", {
      width: image.getWidth(),
      height: image.getHeight(),
      geoKeys,
      boundingBox: [xMin, yMin, xMax, yMax],
      resolution: image.getResolution(),
      origin: fileDirectory.ModelTiepoint ? fileDirectory.ModelTiepoint.slice(3, 5) : "Not available",
      pixelScale: fileDirectory.ModelPixelScale || "Not available"
    });
    return [xMin, yMin, xMax, yMax];
  } catch (error) {
    console.error("Error extracting bounds from GeoTIFF:", error);
    const sentinelInfo = extractSentinelInfo(filename);
    console.log("Extracted Sentinel info from filename:", sentinelInfo);
    if (sentinelInfo.utmZone && SENTINEL_UTM_ZONES[sentinelInfo.utmZone]) {
      console.log(`Using predefined bounds for UTM zone ${sentinelInfo.utmZone}`);
      return SENTINEL_UTM_ZONES[sentinelInfo.utmZone];
    }
    throw new Error("Failed to extract bounds from the image. It may not be properly georeferenced.");
  }
}
async function createGeoRaster(arrayBuffer, filename) {
  try {
    if (!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) {
      throw new Error("Invalid array buffer provided to createGeoRaster");
    }
    console.log("Creating GeoRaster from array buffer of size:", arrayBuffer.byteLength);
    const tiff = await fromArrayBuffer(arrayBuffer);
    const image = await tiff.getImage();
    const width = image.getWidth();
    const height = image.getHeight();
    let xMin, yMin, xMax, yMax;
    try {
      [xMin, yMin, xMax, yMax] = image.getBoundingBox();
      if (!isFinite(xMin) || !isFinite(yMin) || !isFinite(xMax) || !isFinite(yMax) || xMin === xMax || yMin === yMax) {
        throw new Error("Invalid bounding box values");
      }
    } catch (boundingBoxError) {
      console.warn("Error getting bounding box for GeoRaster, trying alternative method:", boundingBoxError);
      const fileDirectory2 = image.getFileDirectory();
      if (fileDirectory2.ModelPixelScale && fileDirectory2.ModelTiepoint) {
        const [scaleX, scaleY] = fileDirectory2.ModelPixelScale;
        const [, , , originX, originY] = fileDirectory2.ModelTiepoint;
        xMin = originX;
        yMax = originY;
        xMax = originX + width * scaleX;
        yMin = originY - height * scaleY;
      } else {
        throw new Error("Cannot determine bounds from GeoTIFF metadata");
      }
    }
    const fileDirectory = image.getFileDirectory();
    const geoKeys = image.getGeoKeys();
    console.log("GeoTIFF Details:", {
      width,
      height,
      boundingBox: [xMin, yMin, xMax, yMax],
      samplesPerPixel: fileDirectory.SamplesPerPixel || 1,
      bitsPerSample: fileDirectory.BitsPerSample,
      photometricInterpretation: fileDirectory.PhotometricInterpretation,
      hasColorMap: !!fileDirectory.ColorMap,
      projection: geoKeys?.ProjectedCSTypeGeoKey || "Unknown",
      modelTransformation: fileDirectory.ModelTransformationTag,
      modelTiepoint: fileDirectory.ModelTiepoint,
      modelPixelScale: fileDirectory.ModelPixelScale
    });
    const rasters = await image.readRasters({
      interleave: true,
      // This can help with some GeoTIFF formats
      pool: null,
      // Don't use a worker pool for small files
      window: [0, 0, width, height]
      // Read the entire image
    });
    const sampleValues = [];
    for (let i = 0; i < Math.min(rasters.length, 3); i++) {
      const band = rasters[i];
      if (band) {
        const samples = [];
        const step = Math.floor(band.length / 10);
        for (let j = 0; j < band.length; j += step) {
          if (samples.length < 10) samples.push(band[j]);
        }
        const validSamples = samples.filter((v) => v !== null && v !== void 0);
        const min = validSamples.length > 0 ? Math.min(...validSamples) : null;
        const max = validSamples.length > 0 ? Math.max(...validSamples) : null;
        sampleValues.push({ band: i, samples, min, max });
      }
    }
    console.log("Sample raster values:", sampleValues);
    let noDataValue = 0;
    if (fileDirectory.GDAL_NODATA !== void 0) {
      noDataValue = parseFloat(fileDirectory.GDAL_NODATA);
      console.log("Using GDAL_NODATA value:", noDataValue);
    }
    if (filename && filename.includes("False_color")) {
      console.log("Detected Sentinel-2 false color image");
      const sampleValues2 = [];
      for (let i = 0; i < Math.min(rasters.length, 3); i++) {
        const band = rasters[i];
        if (band) {
          if (band && typeof band.slice === "function") {
            try {
              const samples = Array.from(band.slice(0, 10));
              sampleValues2.push({ band: i, samples });
            } catch (error) {
              console.warn(`Could not slice band ${i}:`, error);
              const samples = [];
              if (typeof band.length === "number") {
                for (let j = 0; j < Math.min(band.length, 10); j++) {
                  if (band[j] !== void 0) {
                    samples.push(band[j]);
                  }
                }
              }
              sampleValues2.push({ band: i, samples });
            }
          } else if (Array.isArray(band)) {
            const samples = band.slice(0, 10);
            sampleValues2.push({ band: i, samples });
          } else {
            console.warn(`Band ${i} is not sliceable, type:`, typeof band);
            sampleValues2.push({ band: i, samples: [] });
          }
        }
      }
      console.log("Sentinel-2 sample values:", sampleValues2);
    }
    const mins = [];
    const maxs = [];
    for (let i = 0; i < Math.min(rasters.length, 3); i++) {
      const band = rasters[i];
      if (band) {
        const samples = [];
        const step = Math.max(1, Math.floor(band.length / 1e3));
        for (let j = 0; j < band.length; j += step) {
          if (band[j] !== noDataValue && band[j] !== void 0 && band[j] !== null) {
            samples.push(band[j]);
          }
        }
        const min = samples.length > 0 ? Math.min(...samples) : 0;
        const max = samples.length > 0 ? Math.max(...samples) : 65535;
        mins.push(min);
        maxs.push(max);
      }
    }
    console.log("Calculated min/max values for bands:", mins, maxs);
    console.log("Skipping array processing to improve performance for large images");
    console.log("Creating GeoRaster using arrayBuffer directly with these parameters:", {
      noDataValue,
      projection: 4326,
      xmin: xMin,
      ymin: yMin,
      xmax: xMax,
      ymax: yMax,
      pixelWidth: (xMax - xMin) / width,
      pixelHeight: (yMax - yMin) / height,
      arrayBufferSize: arrayBuffer.byteLength,
      minsLength: mins.length,
      maxsLength: maxs.length
    });
    console.log("Using arrayBuffer directly to avoid memory issues with large images");
    const georasterResult = await parseGeoraster(arrayBuffer, {
      noDataValue,
      projection: 4326,
      // WGS84
      xmin: xMin,
      ymin: yMin,
      xmax: xMax,
      ymax: yMax,
      pixelWidth: (xMax - xMin) / width,
      pixelHeight: (yMax - yMin) / height
    });
    console.log("GeoRaster created with properties:", {
      dimensions: georasterResult.dimensions,
      pixelWidth: georasterResult.pixelWidth,
      pixelHeight: georasterResult.pixelHeight,
      noDataValue: georasterResult.noDataValue,
      projection: georasterResult.projection,
      numberOfRasters: georasterResult.numberOfRasters,
      bounds: [georasterResult.xmin, georasterResult.ymin, georasterResult.xmax, georasterResult.ymax]
    });
    return georasterResult;
  } catch (error) {
    console.error("Error creating GeoRaster:", error);
    if (filename) {
      const sentinelInfo = extractSentinelInfo(filename);
      if (sentinelInfo.utmZone) {
        console.warn("Could not create GeoRaster for Sentinel-2 image.");
      }
    }
    throw new Error("Failed to create GeoRaster from the image.");
  }
}
async function processSatelliteImage(file) {
  try {
    validateImageFile(file);
    if (file.size > 500 * 1024 * 1024) {
      console.warn("Large file detected, processing with reduced functionality to prevent browser freeze");
    }
    const arrayBuffer = await file.arrayBuffer();
    let bounds;
    let georaster = null;
    let isSentinel = false;
    const isCOG = file.name.includes("COG") || file.name.includes("cog") || file.name.includes("cloud_optimized") || file.name.includes("cloud-optimized");
    const sentinelInfo = extractSentinelInfo(file.name);
    if (file.name.includes("S2") || file.name.match(/T\d{2}[A-Z]{3}/) || file.name.includes("TCI") || sentinelInfo.satellite) {
      console.log("Detected Sentinel-2 image from filename");
      isSentinel = true;
    }
    const isCopernicus = file.name.includes("Copernicus") || file.name.includes("copernicus") || file.type === "image/tiff" || file.type === "image/geotiff";
    if (isCopernicus) {
      console.log("Detected Copernicus image based on filename or type");
    }
    try {
      bounds = await extractBoundsFromGeoTIFF(arrayBuffer, file.name);
      try {
        const isCopernicus2 = file.name.includes("Copernicus") || file.name.includes("copernicus") || file.type === "image/tiff" || file.type === "image/geotiff";
        if (isCopernicus2) {
          console.log("Using special handling for Copernicus GeoTIFF");
          try {
            const tiff = await fromArrayBuffer(arrayBuffer);
            const image = await tiff.getImage();
            const width = image.getWidth();
            const height = image.getHeight();
            const [xMin, yMin, xMax, yMax] = image.getBoundingBox();
            georaster = await parseGeoraster(arrayBuffer, {
              noDataValue: 0,
              projection: 4326,
              // WGS84
              xmin: xMin,
              ymin: yMin,
              xmax: xMax,
              ymax: yMax,
              pixelWidth: (xMax - xMin) / width,
              pixelHeight: (yMax - yMin) / height
            });
            console.log("Copernicus GeoRaster created successfully:", georaster);
          } catch (copernicusError) {
            console.warn("Error with special Copernicus handling, falling back to standard approach:", copernicusError);
            georaster = await createGeoRaster(arrayBuffer, file.name);
          }
        } else {
          georaster = await createGeoRaster(arrayBuffer, file.name);
        }
        console.log("GeoRaster created successfully:", georaster);
        if (file.name.includes("False_color")) {
          console.log("This is a Sentinel-2 false color image, trying alternative GeoRaster creation");
          try {
            const tiff = await fromArrayBuffer(arrayBuffer);
            const image = await tiff.getImage();
            const width = image.getWidth();
            const height = image.getHeight();
            const [xMin, yMin, xMax, yMax] = image.getBoundingBox();
            const rasters = await image.readRasters();
            const altMins = [];
            const altMaxs = [];
            for (let i = 0; i < Math.min(rasters.length, 3); i++) {
              const band = rasters[i];
              if (band) {
                const samples = [];
                const step = Math.max(1, Math.floor(band.length / 1e3));
                for (let j = 0; j < band.length; j += step) {
                  if (band[j] !== 0 && band[j] !== void 0 && band[j] !== null) {
                    samples.push(band[j]);
                  }
                }
                const min = samples.length > 0 ? Math.min(...samples) : 0;
                const max = samples.length > 0 ? Math.max(...samples) : 65535;
                altMins.push(min);
                altMaxs.push(max);
              }
            }
            console.log("Alternative min/max values for bands:", altMins, altMaxs);
            const alternativeGeoraster = await parseGeoraster(arrayBuffer, {
              noDataValue: 0,
              projection: 4326,
              // WGS84
              xmin: xMin,
              ymin: yMin,
              xmax: xMax,
              ymax: yMax,
              pixelWidth: (xMax - xMin) / width,
              pixelHeight: (yMax - yMin) / height
              // mins: altMins.length > 0 ? altMins : undefined,
              // maxs: altMaxs.length > 0 ? altMaxs : undefined,
            });
            console.log("Alternative GeoRaster created successfully:", alternativeGeoraster);
            georaster = alternativeGeoraster;
          } catch (alternativeError) {
            console.warn("Could not create alternative GeoRaster, using the original one:", alternativeError);
          }
        }
      } catch (geoRasterError) {
        console.warn("Could not create GeoRaster, falling back to simple image overlay:", geoRasterError);
      }
    } catch (boundsError) {
      console.warn("Could not extract bounds from image:", boundsError);
      if (isSentinel && sentinelInfo.utmZone && SENTINEL_UTM_ZONES[sentinelInfo.utmZone]) {
        console.log(`Using predefined bounds for Sentinel-2 UTM zone ${sentinelInfo.utmZone}`);
        bounds = SENTINEL_UTM_ZONES[sentinelInfo.utmZone];
      } else {
        console.log("Using default bounds (Europe)");
        bounds = [-10, 35, 30, 60];
      }
    }
    const id = `image-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    let url = null;
    if (!georaster) {
      url = URL.createObjectURL(file);
    }
    return {
      id,
      name: file.name,
      url,
      bounds,
      timestamp: Date.now(),
      georaster,
      // Store the original array buffer for GeoTIFF files (for OpenLayers)
      arrayBuffer,
      metadata: {
        size: file.size,
        type: file.type,
        isSentinel,
        isCOG,
        sentinelInfo
      }
    };
  } catch (error) {
    console.error("Error processing satellite image:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to process satellite image");
  }
}
function releaseProcessedImage(image) {
  if (image.url) {
    URL.revokeObjectURL(image.url);
  }
}
function SatelliteImageUploadPage() {
  const navigate = useNavigate();
  const [images, setImages] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const loadImages = async () => {
      try {
        const savedImages = await indexedDBService.getAllSatelliteImages();
        setImages(savedImages);
      } catch (err) {
        console.error("Error loading saved images:", err);
        setError("Failed to load saved images. You can continue with new uploads.");
      }
    };
    loadImages();
    return () => {
      images.forEach((image) => {
        releaseProcessedImage(image);
      });
    };
  }, [images]);
  const handleFileProcess = reactExports.useCallback(async (file) => {
    if (!file) return;
    setError(null);
    setLoading(true);
    try {
      const processedImage = await processSatelliteImage(file);
      await indexedDBService.storeSatelliteImage(processedImage.id, processedImage);
      setImages((prevImages) => [...prevImages, processedImage]);
      console.log("Satellite image processed and stored successfully.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to process satellite image. Ensure it is a valid georeferenced image file.";
      setError(message);
      console.error("Error processing satellite image:", err);
    } finally {
      setLoading(false);
    }
  }, []);
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        handleFileProcess(file);
      });
    }
    e.target.value = "";
  };
  const handleDrop = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach((file) => {
        handleFileProcess(file);
      });
      e.dataTransfer.clearData();
    }
  }, [handleFileProcess]);
  const handleDragOver = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  const handleDragLeave = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  const handleRemoveImage = async (imageId) => {
    try {
      const imageToRemove = images.find((img) => img.id === imageId);
      if (imageToRemove) {
        releaseProcessedImage(imageToRemove);
      }
      await indexedDBService.deleteSatelliteImage(imageId);
      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
      console.log(`Image ${imageId} removed successfully.`);
    } catch (err) {
      console.error("Error removing image:", err);
      setError("Failed to remove image. Please try again.");
    }
  };
  const handleBack = () => {
    navigate("/shoreline-source");
  };
  const handleContinue = () => {
    if (images.length === 0) {
      setError("Please upload at least one satellite image before continuing.");
      return;
    }
    navigate("/enhanced-shoreline-digitization");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold text-primary-900 tracking-tight", children: "Upload Satellite Images" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg text-gray-600", children: "Upload georeferenced satellite images to digitize shorelines." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorAlert, { message: error, onClose: () => setError(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-5 w-5 text-blue-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z", clipRule: "evenodd" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-blue-800", children: "About Supported File Formats" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-sm text-blue-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "GeoTIFF & Cloud Optimized GeoTIFF (COG):" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 mt-1 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Both standard GeoTIFF and COG formats are fully supported" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "COG files provide better performance for web-based viewing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Images will be displayed in their correct geographic location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Files must contain proper georeferencing information" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 mb-8 bg-white p-8 rounded-lg shadow-md border border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onDrop: handleDrop,
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          className: `relative block w-full rounded-lg border-2 ${isDragging ? "border-primary-500 bg-primary-50" : "border-dashed border-gray-300"} p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "file",
                id: "satellite-image",
                accept: ".tif,.tiff",
                onChange: handleFileChange,
                className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                disabled: loading,
                multiple: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "mx-auto h-12 w-12 text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 block text-sm font-medium text-gray-900", children: "Drag & drop your satellite images here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-gray-500", children: "or click to browse files" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-4 block text-xs text-gray-500", children: "Supports GeoTIFF (.tif, .tiff) and Cloud Optimized GeoTIFF (COG) formats. Max 1GB per file." })
          ]
        }
      ),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700", children: "Processing image..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "This may take a moment for larger files." })
      ] })
    ] }),
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-gray-800 mb-4", children: [
        "Uploaded Images (",
        images.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: images.map((image) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-6 w-6 text-gray-500 mr-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-800", children: image.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
              "Uploaded ",
              new Date(image.timestamp).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-500 space-y-1", children: [
              image.metadata?.isSentinel ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-primary-600", children: [
                  image.metadata?.sentinelInfo?.satellite || "Sentinel-2",
                  " Image",
                  image.metadata?.sentinelInfo?.productType && ` - ${image.metadata.sentinelInfo.productType}`
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  image.metadata?.sentinelInfo?.utmZone && `UTM Zone: ${image.metadata.sentinelInfo.utmZone}`,
                  image.metadata?.sentinelInfo?.band && ` • Band: ${image.metadata.sentinelInfo.band}`,
                  image.metadata?.sentinelInfo?.date && ` • Date: ${image.metadata.sentinelInfo.date}`
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "Bounds: ",
                  image.bounds[0].toFixed(2),
                  "°W, ",
                  image.bounds[1].toFixed(2),
                  "°S, ",
                  image.bounds[2].toFixed(2),
                  "°E, ",
                  image.bounds[3].toFixed(2),
                  "°N"
                ] })
              ] }) : image.georaster ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-green-600", children: "GeoTIFF with embedded georeferencing" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  "Bounds: ",
                  image.bounds[0].toFixed(2),
                  "°W, ",
                  image.bounds[1].toFixed(2),
                  "°S, ",
                  image.bounds[2].toFixed(2),
                  "°E, ",
                  image.bounds[3].toFixed(2),
                  "°N"
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Bounds: ",
                image.bounds[0].toFixed(2),
                "°W, ",
                image.bounds[1].toFixed(2),
                "°S, ",
                image.bounds[2].toFixed(2),
                "°E, ",
                image.bounds[3].toFixed(2),
                "°N"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Size: ",
                image.metadata?.size ? (image.metadata.size / (1024 * 1024)).toFixed(2) : "?",
                " MB"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleRemoveImage(image.id),
            className: "text-gray-500 hover:text-red-500 transition-colors",
            title: "Remove image",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "h-5 w-5" })
          }
        )
      ] }, image.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleBack,
          className: "inline-flex items-center justify-center bg-gray-100 text-gray-700 font-semibold px-6 py-3 text-base rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$3, { className: "mr-2 h-5 w-5" }),
            "Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleContinue,
          disabled: images.length === 0 || loading,
          className: "inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          children: [
            "Continue to Enhanced Digitization",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$4, { className: "ml-2 h-5 w-5" })
          ]
        }
      )
    ] })
  ] });
}
export {
  SatelliteImageUploadPage as default
};
//# sourceMappingURL=SatelliteImageUploadPage-B3TGWfBl.js.map
