/**
 * A simple replacement for proj4-fully-loaded that uses the regular proj4 package
 * and adds all the necessary projections
 */

// Import the regular proj4 package
import proj4 from 'proj4';

// Add common projections
// WGS84
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');

// Web Mercator
proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs');

// UTM zones (North)
for (let zone = 1; zone <= 60; zone++) {
  const code = 32600 + zone;
  proj4.defs(`EPSG:${code}`, `+proj=utm +zone=${zone} +datum=WGS84 +units=m +no_defs`);
}

// UTM zones (South)
for (let zone = 1; zone <= 60; zone++) {
  const code = 32700 + zone;
  proj4.defs(`EPSG:${code}`, `+proj=utm +zone=${zone} +south +datum=WGS84 +units=m +no_defs`);
}

// Make it available globally for compatibility
if (typeof window !== 'undefined') {
  window.proj4 = proj4;
}

console.log('proj4 with definitions loaded');

// Export the proj4 object
export default proj4;
