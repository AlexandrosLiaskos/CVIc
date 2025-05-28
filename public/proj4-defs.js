/**
 * Proj4 definitions
 * 
 * This script loads common proj4 definitions that might be needed by the application
 */

(function() {
  // Make sure proj4 and proj4.defs exist
  if (!window.proj4 || !window.proj4.defs) {
    console.error('Proj4 or proj4.defs not available');
    return;
  }
  
  // Add common projections
  
  // WGS84
  window.proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
  
  // Web Mercator
  window.proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs');
  
  // UTM zones (North)
  for (let zone = 1; zone <= 60; zone++) {
    const code = 32600 + zone;
    window.proj4.defs(`EPSG:${code}`, `+proj=utm +zone=${zone} +datum=WGS84 +units=m +no_defs`);
  }
  
  // UTM zones (South)
  for (let zone = 1; zone <= 60; zone++) {
    const code = 32700 + zone;
    window.proj4.defs(`EPSG:${code}`, `+proj=utm +zone=${zone} +south +datum=WGS84 +units=m +no_defs`);
  }
  
  console.log('Proj4 definitions loaded');
})();
