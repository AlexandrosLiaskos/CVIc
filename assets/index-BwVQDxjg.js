import { d as degreesToRadians, n as radiansToLength, s as segmentReduce } from "./Map-DjBdLXso.js";
function getCoord(coord) {
  if (!coord) {
    throw new Error("coord is required");
  }
  if (!Array.isArray(coord)) {
    if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
      return coord.geometry.coordinates;
    }
    if (coord.type === "Point") {
      return coord.coordinates;
    }
  }
  if (Array.isArray(coord) && coord.length >= 2 && !Array.isArray(coord[0]) && !Array.isArray(coord[1])) {
    return coord;
  }
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function getCoords(coords) {
  if (Array.isArray(coords)) {
    return coords;
  }
  if (coords.type === "Feature") {
    if (coords.geometry !== null) {
      return coords.geometry.coordinates;
    }
  } else {
    if (coords.coordinates) {
      return coords.coordinates;
    }
  }
  throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
function getGeom(geojson) {
  if (geojson.type === "Feature") {
    return geojson.geometry;
  }
  return geojson;
}
function distance(from, to, options) {
  if (options === void 0) {
    options = {};
  }
  var coordinates1 = getCoord(from);
  var coordinates2 = getCoord(to);
  var dLat = degreesToRadians(coordinates2[1] - coordinates1[1]);
  var dLon = degreesToRadians(coordinates2[0] - coordinates1[0]);
  var lat1 = degreesToRadians(coordinates1[1]);
  var lat2 = degreesToRadians(coordinates2[1]);
  var a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  return radiansToLength(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), options.units);
}
function length(geojson, options) {
  if (options === void 0) {
    options = {};
  }
  return segmentReduce(geojson, function(previousValue, segment) {
    var coords = segment.geometry.coordinates;
    return previousValue + distance(coords[0], coords[1], options);
  }, 0);
}
export {
  getGeom as a,
  getCoords as b,
  distance as d,
  getCoord as g,
  length as l
};
//# sourceMappingURL=index-BwVQDxjg.js.map
