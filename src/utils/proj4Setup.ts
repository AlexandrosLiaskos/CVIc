/**
 * Utility to properly initialize proj4 for coordinate transformations
 * This fixes the "up.defs is not a function" error in production
 */
import proj4 from 'proj4';

// Common coordinate systems
const commonProjections = {
  // WGS84
  'EPSG:4326': '+proj=longlat +datum=WGS84 +no_defs',
  // Web Mercator
  'EPSG:3857': '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs',
  // UTM zones (common for satellite imagery)
  'EPSG:32601': '+proj=utm +zone=1 +datum=WGS84 +units=m +no_defs',
  'EPSG:32602': '+proj=utm +zone=2 +datum=WGS84 +units=m +no_defs',
  'EPSG:32603': '+proj=utm +zone=3 +datum=WGS84 +units=m +no_defs',
  'EPSG:32604': '+proj=utm +zone=4 +datum=WGS84 +units=m +no_defs',
  'EPSG:32605': '+proj=utm +zone=5 +datum=WGS84 +units=m +no_defs',
  'EPSG:32606': '+proj=utm +zone=6 +datum=WGS84 +units=m +no_defs',
  'EPSG:32607': '+proj=utm +zone=7 +datum=WGS84 +units=m +no_defs',
  'EPSG:32608': '+proj=utm +zone=8 +datum=WGS84 +units=m +no_defs',
  'EPSG:32609': '+proj=utm +zone=9 +datum=WGS84 +units=m +no_defs',
  'EPSG:32610': '+proj=utm +zone=10 +datum=WGS84 +units=m +no_defs',
  'EPSG:32611': '+proj=utm +zone=11 +datum=WGS84 +units=m +no_defs',
  'EPSG:32612': '+proj=utm +zone=12 +datum=WGS84 +units=m +no_defs',
  'EPSG:32613': '+proj=utm +zone=13 +datum=WGS84 +units=m +no_defs',
  'EPSG:32614': '+proj=utm +zone=14 +datum=WGS84 +units=m +no_defs',
  'EPSG:32615': '+proj=utm +zone=15 +datum=WGS84 +units=m +no_defs',
  'EPSG:32616': '+proj=utm +zone=16 +datum=WGS84 +units=m +no_defs',
  'EPSG:32617': '+proj=utm +zone=17 +datum=WGS84 +units=m +no_defs',
  'EPSG:32618': '+proj=utm +zone=18 +datum=WGS84 +units=m +no_defs',
  'EPSG:32619': '+proj=utm +zone=19 +datum=WGS84 +units=m +no_defs',
  'EPSG:32620': '+proj=utm +zone=20 +datum=WGS84 +units=m +no_defs',
  'EPSG:32621': '+proj=utm +zone=21 +datum=WGS84 +units=m +no_defs',
  'EPSG:32622': '+proj=utm +zone=22 +datum=WGS84 +units=m +no_defs',
  'EPSG:32623': '+proj=utm +zone=23 +datum=WGS84 +units=m +no_defs',
  'EPSG:32624': '+proj=utm +zone=24 +datum=WGS84 +units=m +no_defs',
  'EPSG:32625': '+proj=utm +zone=25 +datum=WGS84 +units=m +no_defs',
  'EPSG:32626': '+proj=utm +zone=26 +datum=WGS84 +units=m +no_defs',
  'EPSG:32627': '+proj=utm +zone=27 +datum=WGS84 +units=m +no_defs',
  'EPSG:32628': '+proj=utm +zone=28 +datum=WGS84 +units=m +no_defs',
  'EPSG:32629': '+proj=utm +zone=29 +datum=WGS84 +units=m +no_defs',
  'EPSG:32630': '+proj=utm +zone=30 +datum=WGS84 +units=m +no_defs',
  'EPSG:32631': '+proj=utm +zone=31 +datum=WGS84 +units=m +no_defs',
  'EPSG:32632': '+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs',
  'EPSG:32633': '+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs',
  'EPSG:32634': '+proj=utm +zone=34 +datum=WGS84 +units=m +no_defs',
  'EPSG:32635': '+proj=utm +zone=35 +datum=WGS84 +units=m +no_defs',
  'EPSG:32636': '+proj=utm +zone=36 +datum=WGS84 +units=m +no_defs',
  'EPSG:32637': '+proj=utm +zone=37 +datum=WGS84 +units=m +no_defs',
  'EPSG:32638': '+proj=utm +zone=38 +datum=WGS84 +units=m +no_defs',
  'EPSG:32639': '+proj=utm +zone=39 +datum=WGS84 +units=m +no_defs',
  'EPSG:32640': '+proj=utm +zone=40 +datum=WGS84 +units=m +no_defs',
  'EPSG:32641': '+proj=utm +zone=41 +datum=WGS84 +units=m +no_defs',
  'EPSG:32642': '+proj=utm +zone=42 +datum=WGS84 +units=m +no_defs',
  'EPSG:32643': '+proj=utm +zone=43 +datum=WGS84 +units=m +no_defs',
  'EPSG:32644': '+proj=utm +zone=44 +datum=WGS84 +units=m +no_defs',
  'EPSG:32645': '+proj=utm +zone=45 +datum=WGS84 +units=m +no_defs',
  'EPSG:32646': '+proj=utm +zone=46 +datum=WGS84 +units=m +no_defs',
  'EPSG:32647': '+proj=utm +zone=47 +datum=WGS84 +units=m +no_defs',
  'EPSG:32648': '+proj=utm +zone=48 +datum=WGS84 +units=m +no_defs',
  'EPSG:32649': '+proj=utm +zone=49 +datum=WGS84 +units=m +no_defs',
  'EPSG:32650': '+proj=utm +zone=50 +datum=WGS84 +units=m +no_defs',
  'EPSG:32651': '+proj=utm +zone=51 +datum=WGS84 +units=m +no_defs',
  'EPSG:32652': '+proj=utm +zone=52 +datum=WGS84 +units=m +no_defs',
  'EPSG:32653': '+proj=utm +zone=53 +datum=WGS84 +units=m +no_defs',
  'EPSG:32654': '+proj=utm +zone=54 +datum=WGS84 +units=m +no_defs',
  'EPSG:32655': '+proj=utm +zone=55 +datum=WGS84 +units=m +no_defs',
  'EPSG:32656': '+proj=utm +zone=56 +datum=WGS84 +units=m +no_defs',
  'EPSG:32657': '+proj=utm +zone=57 +datum=WGS84 +units=m +no_defs',
  'EPSG:32658': '+proj=utm +zone=58 +datum=WGS84 +units=m +no_defs',
  'EPSG:32659': '+proj=utm +zone=59 +datum=WGS84 +units=m +no_defs',
  'EPSG:32660': '+proj=utm +zone=60 +datum=WGS84 +units=m +no_defs',
};

/**
 * Initialize proj4 with common coordinate systems
 */
export function initializeProj4() {
  try {
    // Register all common projections
    Object.entries(commonProjections).forEach(([code, def]) => {
      proj4.defs(code, def);
    });
    
    console.log('proj4 initialized successfully with common projections');
    return true;
  } catch (error) {
    console.error('Error initializing proj4:', error);
    return false;
  }
}

/**
 * Transform coordinates from one projection to another
 * @param fromProjection Source projection code (e.g., 'EPSG:4326')
 * @param toProjection Target projection code (e.g., 'EPSG:3857')
 * @param coordinates Coordinates to transform [x, y] or [lon, lat]
 * @returns Transformed coordinates [x, y]
 */
export function transformCoordinates(
  fromProjection: string,
  toProjection: string,
  coordinates: [number, number]
): [number, number] {
  try {
    return proj4(fromProjection, toProjection, coordinates);
  } catch (error) {
    console.error('Error transforming coordinates:', error);
    return coordinates; // Return original coordinates on error
  }
}

// Export the proj4 instance for direct use
export default proj4;
