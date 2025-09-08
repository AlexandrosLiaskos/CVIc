import { g as getDefaultExportFromCjs } from "./georaster-layer-D-eO7TID.js";
var earthRadius = 63710088e-1;
var factors = {
  centimeters: earthRadius * 100,
  centimetres: earthRadius * 100,
  degrees: earthRadius / 111325,
  feet: earthRadius * 3.28084,
  inches: earthRadius * 39.37,
  kilometers: earthRadius / 1e3,
  kilometres: earthRadius / 1e3,
  meters: earthRadius,
  metres: earthRadius,
  miles: earthRadius / 1609.344,
  millimeters: earthRadius * 1e3,
  millimetres: earthRadius * 1e3,
  nauticalmiles: earthRadius / 1852,
  radians: 1,
  yards: earthRadius * 1.0936
};
function feature(geom, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var feat = { type: "Feature" };
  if (options.id === 0 || options.id) {
    feat.id = options.id;
  }
  if (options.bbox) {
    feat.bbox = options.bbox;
  }
  feat.properties = properties || {};
  feat.geometry = geom;
  return feat;
}
function point(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  if (!coordinates) {
    throw new Error("coordinates is required");
  }
  if (!Array.isArray(coordinates)) {
    throw new Error("coordinates must be an Array");
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be at least 2 numbers long");
  }
  if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
    throw new Error("coordinates must contain numbers");
  }
  var geom = {
    type: "Point",
    coordinates
  };
  return feature(geom, properties, options);
}
function polygon(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
    var ring = coordinates_1[_i];
    if (ring.length < 4) {
      throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
    }
    for (var j = 0; j < ring[ring.length - 1].length; j++) {
      if (ring[ring.length - 1][j] !== ring[0][j]) {
        throw new Error("First and last Position are not equivalent.");
      }
    }
  }
  var geom = {
    type: "Polygon",
    coordinates
  };
  return feature(geom, properties, options);
}
function lineString(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be an array of two or more positions");
  }
  var geom = {
    type: "LineString",
    coordinates
  };
  return feature(geom, properties, options);
}
function featureCollection(features, options) {
  if (options === void 0) {
    options = {};
  }
  var fc = { type: "FeatureCollection" };
  if (options.id) {
    fc.id = options.id;
  }
  if (options.bbox) {
    fc.bbox = options.bbox;
  }
  fc.features = features;
  return fc;
}
function multiLineString(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: "MultiLineString",
    coordinates
  };
  return feature(geom, properties, options);
}
function radiansToLength(radians, units) {
  if (units === void 0) {
    units = "kilometers";
  }
  var factor = factors[units];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return radians * factor;
}
function lengthToRadians(distance2, units) {
  if (units === void 0) {
    units = "kilometers";
  }
  var factor = factors[units];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return distance2 / factor;
}
function radiansToDegrees(radians) {
  var degrees = radians % (2 * Math.PI);
  return degrees * 180 / Math.PI;
}
function degreesToRadians(degrees) {
  var radians = degrees % 360;
  return radians * Math.PI / 180;
}
function isNumber(num) {
  return !isNaN(num) && num !== null && !Array.isArray(num);
}
function isObject(input) {
  return !!input && input.constructor === Object;
}
function coordEach(geojson, callback, excludeWrapCoord) {
  if (geojson === null) return;
  var j, k, l, geometry, stopG, coords, geometryMaybeCollection, wrapShrink = 0, coordIndex = 0, isGeometryCollection, type = geojson.type, isFeatureCollection = type === "FeatureCollection", isFeature = type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;
      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;
      wrapShrink = 0;
      switch (geomType) {
        case null:
          break;
        case "Point":
          if (callback(
            coords,
            coordIndex,
            featureIndex,
            multiFeatureIndex,
            geometryIndex
          ) === false)
            return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (callback(
              coords[j],
              coordIndex,
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false)
              return false;
            coordIndex++;
            if (geomType === "MultiPoint") multiFeatureIndex++;
          }
          if (geomType === "LineString") multiFeatureIndex++;
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (callback(
                coords[j][k],
                coordIndex,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              ) === false)
                return false;
              coordIndex++;
            }
            if (geomType === "MultiLineString") multiFeatureIndex++;
            if (geomType === "Polygon") geometryIndex++;
          }
          if (geomType === "Polygon") multiFeatureIndex++;
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (callback(
                  coords[j][k][l],
                  coordIndex,
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false)
                  return false;
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry.geometries.length; j++)
            if (coordEach(geometry.geometries[j], callback) === false)
              return false;
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}
function featureEach(geojson, callback) {
  if (geojson.type === "Feature") {
    callback(geojson, 0);
  } else if (geojson.type === "FeatureCollection") {
    for (var i = 0; i < geojson.features.length; i++) {
      if (callback(geojson.features[i], i) === false) break;
    }
  }
}
function geomEach(geojson, callback) {
  var i, j, g, geometry, stopG, geometryMaybeCollection, isGeometryCollection, featureProperties, featureBBox, featureId, featureIndex = 0, isFeatureCollection = geojson.type === "FeatureCollection", isFeature = geojson.type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[i].geometry : isFeature ? geojson.geometry : geojson;
    featureProperties = isFeatureCollection ? geojson.features[i].properties : isFeature ? geojson.properties : {};
    featureBBox = isFeatureCollection ? geojson.features[i].bbox : isFeature ? geojson.bbox : void 0;
    featureId = isFeatureCollection ? geojson.features[i].id : isFeature ? geojson.id : void 0;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection;
      if (geometry === null) {
        if (callback(
          null,
          featureIndex,
          featureProperties,
          featureBBox,
          featureId
        ) === false)
          return false;
        continue;
      }
      switch (geometry.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (callback(
            geometry,
            featureIndex,
            featureProperties,
            featureBBox,
            featureId
          ) === false)
            return false;
          break;
        }
        case "GeometryCollection": {
          for (j = 0; j < geometry.geometries.length; j++) {
            if (callback(
              geometry.geometries[j],
              featureIndex,
              featureProperties,
              featureBBox,
              featureId
            ) === false)
              return false;
          }
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    featureIndex++;
  }
}
function flattenEach(geojson, callback) {
  geomEach(geojson, function(geometry, featureIndex, properties, bbox2, id) {
    var type = geometry === null ? null : geometry.type;
    switch (type) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        if (callback(
          feature(geometry, properties, { bbox: bbox2, id }),
          featureIndex,
          0
        ) === false)
          return false;
        return;
    }
    var geomType;
    switch (type) {
      case "MultiPoint":
        geomType = "Point";
        break;
      case "MultiLineString":
        geomType = "LineString";
        break;
      case "MultiPolygon":
        geomType = "Polygon";
        break;
    }
    for (var multiFeatureIndex = 0; multiFeatureIndex < geometry.coordinates.length; multiFeatureIndex++) {
      var coordinate = geometry.coordinates[multiFeatureIndex];
      var geom = {
        type: geomType,
        coordinates: coordinate
      };
      if (callback(feature(geom, properties), featureIndex, multiFeatureIndex) === false)
        return false;
    }
  });
}
function segmentEach(geojson, callback) {
  flattenEach(geojson, function(feature2, featureIndex, multiFeatureIndex) {
    var segmentIndex = 0;
    if (!feature2.geometry) return;
    var type = feature2.geometry.type;
    if (type === "Point" || type === "MultiPoint") return;
    var previousCoords;
    var previousFeatureIndex = 0;
    var previousMultiIndex = 0;
    var prevGeomIndex = 0;
    if (coordEach(
      feature2,
      function(currentCoord, coordIndex, featureIndexCoord, multiPartIndexCoord, geometryIndex) {
        if (previousCoords === void 0 || featureIndex > previousFeatureIndex || multiPartIndexCoord > previousMultiIndex || geometryIndex > prevGeomIndex) {
          previousCoords = currentCoord;
          previousFeatureIndex = featureIndex;
          previousMultiIndex = multiPartIndexCoord;
          prevGeomIndex = geometryIndex;
          segmentIndex = 0;
          return;
        }
        var currentSegment = lineString(
          [previousCoords, currentCoord],
          feature2.properties
        );
        if (callback(
          currentSegment,
          featureIndex,
          multiFeatureIndex,
          geometryIndex,
          segmentIndex
        ) === false)
          return false;
        segmentIndex++;
        previousCoords = currentCoord;
      }
    ) === false)
      return false;
  });
}
function segmentReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  var started = false;
  segmentEach(
    geojson,
    function(currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
      if (started === false && initialValue === void 0)
        previousValue = currentSegment;
      else
        previousValue = callback(
          previousValue,
          currentSegment,
          featureIndex,
          multiFeatureIndex,
          geometryIndex,
          segmentIndex
        );
      started = true;
    }
  );
  return previousValue;
}
function bbox$1(geojson) {
  var result = [Infinity, Infinity, -Infinity, -Infinity];
  coordEach(geojson, function(coord) {
    if (result[0] > coord[0]) {
      result[0] = coord[0];
    }
    if (result[1] > coord[1]) {
      result[1] = coord[1];
    }
    if (result[2] < coord[0]) {
      result[2] = coord[0];
    }
    if (result[3] < coord[1]) {
      result[3] = coord[1];
    }
  });
  return result;
}
bbox$1["default"] = bbox$1;
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
function booleanPointInPolygon(point2, polygon2, options) {
  if (options === void 0) {
    options = {};
  }
  if (!point2) {
    throw new Error("point is required");
  }
  if (!polygon2) {
    throw new Error("polygon is required");
  }
  var pt = getCoord(point2);
  var geom = getGeom(polygon2);
  var type = geom.type;
  var bbox2 = polygon2.bbox;
  var polys = geom.coordinates;
  if (bbox2 && inBBox(pt, bbox2) === false) {
    return false;
  }
  if (type === "Polygon") {
    polys = [polys];
  }
  var insidePoly = false;
  for (var i = 0; i < polys.length && !insidePoly; i++) {
    if (inRing(pt, polys[i][0], options.ignoreBoundary)) {
      var inHole = false;
      var k = 1;
      while (k < polys[i].length && !inHole) {
        if (inRing(pt, polys[i][k], !options.ignoreBoundary)) {
          inHole = true;
        }
        k++;
      }
      if (!inHole) {
        insidePoly = true;
      }
    }
  }
  return insidePoly;
}
function inRing(pt, ring, ignoreBoundary) {
  var isInside = false;
  if (ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1]) {
    ring = ring.slice(0, ring.length - 1);
  }
  for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    var xi = ring[i][0];
    var yi = ring[i][1];
    var xj = ring[j][0];
    var yj = ring[j][1];
    var onBoundary = pt[1] * (xi - xj) + yi * (xj - pt[0]) + yj * (pt[0] - xi) === 0 && (xi - pt[0]) * (xj - pt[0]) <= 0 && (yi - pt[1]) * (yj - pt[1]) <= 0;
    if (onBoundary) {
      return !ignoreBoundary;
    }
    var intersect = yi > pt[1] !== yj > pt[1] && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi;
    if (intersect) {
      isInside = !isInside;
    }
  }
  return isInside;
}
function inBBox(pt, bbox2) {
  return bbox2[0] <= pt[0] && bbox2[1] <= pt[1] && bbox2[2] >= pt[0] && bbox2[3] >= pt[1];
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
function destination(origin, distance2, bearing2, options) {
  if (options === void 0) {
    options = {};
  }
  var coordinates1 = getCoord(origin);
  var longitude1 = degreesToRadians(coordinates1[0]);
  var latitude1 = degreesToRadians(coordinates1[1]);
  var bearingRad = degreesToRadians(bearing2);
  var radians = lengthToRadians(distance2, options.units);
  var latitude2 = Math.asin(Math.sin(latitude1) * Math.cos(radians) + Math.cos(latitude1) * Math.sin(radians) * Math.cos(bearingRad));
  var longitude2 = longitude1 + Math.atan2(Math.sin(bearingRad) * Math.sin(radians) * Math.cos(latitude1), Math.cos(radians) - Math.sin(latitude1) * Math.sin(latitude2));
  var lng = radiansToDegrees(longitude2);
  var lat = radiansToDegrees(latitude2);
  return point([lng, lat], options.properties);
}
function bearing(start, end, options) {
  if (options === void 0) {
    options = {};
  }
  if (options.final === true) {
    return calculateFinalBearing(start, end);
  }
  var coordinates1 = getCoord(start);
  var coordinates2 = getCoord(end);
  var lon1 = degreesToRadians(coordinates1[0]);
  var lon2 = degreesToRadians(coordinates2[0]);
  var lat1 = degreesToRadians(coordinates1[1]);
  var lat2 = degreesToRadians(coordinates2[1]);
  var a = Math.sin(lon2 - lon1) * Math.cos(lat2);
  var b = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  return radiansToDegrees(Math.atan2(a, b));
}
function calculateFinalBearing(start, end) {
  var bear = bearing(end, start);
  bear = (bear + 180) % 360;
  return bear;
}
function lineSegment(geojson) {
  if (!geojson) {
    throw new Error("geojson is required");
  }
  var results = [];
  flattenEach(geojson, function(feature2) {
    lineSegmentFeature(feature2, results);
  });
  return featureCollection(results);
}
function lineSegmentFeature(geojson, results) {
  var coords = [];
  var geometry = geojson.geometry;
  if (geometry !== null) {
    switch (geometry.type) {
      case "Polygon":
        coords = getCoords(geometry);
        break;
      case "LineString":
        coords = [getCoords(geometry)];
    }
    coords.forEach(function(coord) {
      var segments = createSegments(coord, geojson.properties);
      segments.forEach(function(segment) {
        segment.id = results.length;
        results.push(segment);
      });
    });
  }
}
function createSegments(coords, properties) {
  var segments = [];
  coords.reduce(function(previousCoords, currentCoords) {
    var segment = lineString([previousCoords, currentCoords], properties);
    segment.bbox = bbox(previousCoords, currentCoords);
    segments.push(segment);
    return currentCoords;
  });
  return segments;
}
function bbox(coords1, coords2) {
  var x1 = coords1[0];
  var y1 = coords1[1];
  var x2 = coords2[0];
  var y2 = coords2[1];
  var west = x1 < x2 ? x1 : x2;
  var south = y1 < y2 ? y1 : y2;
  var east = x1 > x2 ? x1 : x2;
  var north = y1 > y2 ? y1 : y2;
  return [west, south, east, north];
}
var geojsonRbush = { exports: {} };
var rbush_min$1 = { exports: {} };
var rbush_min = rbush_min$1.exports;
var hasRequiredRbush_min;
function requireRbush_min() {
  if (hasRequiredRbush_min) return rbush_min$1.exports;
  hasRequiredRbush_min = 1;
  (function(module, exports) {
    !(function(t, i) {
      module.exports = i();
    })(rbush_min, function() {
      function t(t2, r2, e2, a2, h2) {
        !(function t3(n2, r3, e3, a3, h3) {
          for (; a3 > e3; ) {
            if (a3 - e3 > 600) {
              var o2 = a3 - e3 + 1, s2 = r3 - e3 + 1, l2 = Math.log(o2), f2 = 0.5 * Math.exp(2 * l2 / 3), u2 = 0.5 * Math.sqrt(l2 * f2 * (o2 - f2) / o2) * (s2 - o2 / 2 < 0 ? -1 : 1), m2 = Math.max(e3, Math.floor(r3 - s2 * f2 / o2 + u2)), c2 = Math.min(a3, Math.floor(r3 + (o2 - s2) * f2 / o2 + u2));
              t3(n2, r3, m2, c2, h3);
            }
            var p2 = n2[r3], d2 = e3, x = a3;
            for (i(n2, e3, r3), h3(n2[a3], p2) > 0 && i(n2, e3, a3); d2 < x; ) {
              for (i(n2, d2, x), d2++, x--; h3(n2[d2], p2) < 0; ) d2++;
              for (; h3(n2[x], p2) > 0; ) x--;
            }
            0 === h3(n2[e3], p2) ? i(n2, e3, x) : i(n2, ++x, a3), x <= r3 && (e3 = x + 1), r3 <= x && (a3 = x - 1);
          }
        })(t2, r2, e2 || 0, a2 || t2.length - 1, h2 || n);
      }
      function i(t2, i2, n2) {
        var r2 = t2[i2];
        t2[i2] = t2[n2], t2[n2] = r2;
      }
      function n(t2, i2) {
        return t2 < i2 ? -1 : t2 > i2 ? 1 : 0;
      }
      var r = function(t2) {
        void 0 === t2 && (t2 = 9), this._maxEntries = Math.max(4, t2), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
      };
      function e(t2, i2, n2) {
        if (!n2) return i2.indexOf(t2);
        for (var r2 = 0; r2 < i2.length; r2++) if (n2(t2, i2[r2])) return r2;
        return -1;
      }
      function a(t2, i2) {
        h(t2, 0, t2.children.length, i2, t2);
      }
      function h(t2, i2, n2, r2, e2) {
        e2 || (e2 = p(null)), e2.minX = 1 / 0, e2.minY = 1 / 0, e2.maxX = -1 / 0, e2.maxY = -1 / 0;
        for (var a2 = i2; a2 < n2; a2++) {
          var h2 = t2.children[a2];
          o(e2, t2.leaf ? r2(h2) : h2);
        }
        return e2;
      }
      function o(t2, i2) {
        return t2.minX = Math.min(t2.minX, i2.minX), t2.minY = Math.min(t2.minY, i2.minY), t2.maxX = Math.max(t2.maxX, i2.maxX), t2.maxY = Math.max(t2.maxY, i2.maxY), t2;
      }
      function s(t2, i2) {
        return t2.minX - i2.minX;
      }
      function l(t2, i2) {
        return t2.minY - i2.minY;
      }
      function f(t2) {
        return (t2.maxX - t2.minX) * (t2.maxY - t2.minY);
      }
      function u(t2) {
        return t2.maxX - t2.minX + (t2.maxY - t2.minY);
      }
      function m(t2, i2) {
        return t2.minX <= i2.minX && t2.minY <= i2.minY && i2.maxX <= t2.maxX && i2.maxY <= t2.maxY;
      }
      function c(t2, i2) {
        return i2.minX <= t2.maxX && i2.minY <= t2.maxY && i2.maxX >= t2.minX && i2.maxY >= t2.minY;
      }
      function p(t2) {
        return { children: t2, height: 1, leaf: true, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
      }
      function d(i2, n2, r2, e2, a2) {
        for (var h2 = [n2, r2]; h2.length; ) if (!((r2 = h2.pop()) - (n2 = h2.pop()) <= e2)) {
          var o2 = n2 + Math.ceil((r2 - n2) / e2 / 2) * e2;
          t(i2, o2, n2, r2, a2), h2.push(n2, o2, o2, r2);
        }
      }
      return r.prototype.all = function() {
        return this._all(this.data, []);
      }, r.prototype.search = function(t2) {
        var i2 = this.data, n2 = [];
        if (!c(t2, i2)) return n2;
        for (var r2 = this.toBBox, e2 = []; i2; ) {
          for (var a2 = 0; a2 < i2.children.length; a2++) {
            var h2 = i2.children[a2], o2 = i2.leaf ? r2(h2) : h2;
            c(t2, o2) && (i2.leaf ? n2.push(h2) : m(t2, o2) ? this._all(h2, n2) : e2.push(h2));
          }
          i2 = e2.pop();
        }
        return n2;
      }, r.prototype.collides = function(t2) {
        var i2 = this.data;
        if (!c(t2, i2)) return false;
        for (var n2 = []; i2; ) {
          for (var r2 = 0; r2 < i2.children.length; r2++) {
            var e2 = i2.children[r2], a2 = i2.leaf ? this.toBBox(e2) : e2;
            if (c(t2, a2)) {
              if (i2.leaf || m(t2, a2)) return true;
              n2.push(e2);
            }
          }
          i2 = n2.pop();
        }
        return false;
      }, r.prototype.load = function(t2) {
        if (!t2 || !t2.length) return this;
        if (t2.length < this._minEntries) {
          for (var i2 = 0; i2 < t2.length; i2++) this.insert(t2[i2]);
          return this;
        }
        var n2 = this._build(t2.slice(), 0, t2.length - 1, 0);
        if (this.data.children.length) if (this.data.height === n2.height) this._splitRoot(this.data, n2);
        else {
          if (this.data.height < n2.height) {
            var r2 = this.data;
            this.data = n2, n2 = r2;
          }
          this._insert(n2, this.data.height - n2.height - 1, true);
        }
        else this.data = n2;
        return this;
      }, r.prototype.insert = function(t2) {
        return t2 && this._insert(t2, this.data.height - 1), this;
      }, r.prototype.clear = function() {
        return this.data = p([]), this;
      }, r.prototype.remove = function(t2, i2) {
        if (!t2) return this;
        for (var n2, r2, a2, h2 = this.data, o2 = this.toBBox(t2), s2 = [], l2 = []; h2 || s2.length; ) {
          if (h2 || (h2 = s2.pop(), r2 = s2[s2.length - 1], n2 = l2.pop(), a2 = true), h2.leaf) {
            var f2 = e(t2, h2.children, i2);
            if (-1 !== f2) return h2.children.splice(f2, 1), s2.push(h2), this._condense(s2), this;
          }
          a2 || h2.leaf || !m(h2, o2) ? r2 ? (n2++, h2 = r2.children[n2], a2 = false) : h2 = null : (s2.push(h2), l2.push(n2), n2 = 0, r2 = h2, h2 = h2.children[0]);
        }
        return this;
      }, r.prototype.toBBox = function(t2) {
        return t2;
      }, r.prototype.compareMinX = function(t2, i2) {
        return t2.minX - i2.minX;
      }, r.prototype.compareMinY = function(t2, i2) {
        return t2.minY - i2.minY;
      }, r.prototype.toJSON = function() {
        return this.data;
      }, r.prototype.fromJSON = function(t2) {
        return this.data = t2, this;
      }, r.prototype._all = function(t2, i2) {
        for (var n2 = []; t2; ) t2.leaf ? i2.push.apply(i2, t2.children) : n2.push.apply(n2, t2.children), t2 = n2.pop();
        return i2;
      }, r.prototype._build = function(t2, i2, n2, r2) {
        var e2, h2 = n2 - i2 + 1, o2 = this._maxEntries;
        if (h2 <= o2) return a(e2 = p(t2.slice(i2, n2 + 1)), this.toBBox), e2;
        r2 || (r2 = Math.ceil(Math.log(h2) / Math.log(o2)), o2 = Math.ceil(h2 / Math.pow(o2, r2 - 1))), (e2 = p([])).leaf = false, e2.height = r2;
        var s2 = Math.ceil(h2 / o2), l2 = s2 * Math.ceil(Math.sqrt(o2));
        d(t2, i2, n2, l2, this.compareMinX);
        for (var f2 = i2; f2 <= n2; f2 += l2) {
          var u2 = Math.min(f2 + l2 - 1, n2);
          d(t2, f2, u2, s2, this.compareMinY);
          for (var m2 = f2; m2 <= u2; m2 += s2) {
            var c2 = Math.min(m2 + s2 - 1, u2);
            e2.children.push(this._build(t2, m2, c2, r2 - 1));
          }
        }
        return a(e2, this.toBBox), e2;
      }, r.prototype._chooseSubtree = function(t2, i2, n2, r2) {
        for (; r2.push(i2), !i2.leaf && r2.length - 1 !== n2; ) {
          for (var e2 = 1 / 0, a2 = 1 / 0, h2 = void 0, o2 = 0; o2 < i2.children.length; o2++) {
            var s2 = i2.children[o2], l2 = f(s2), u2 = (m2 = t2, c2 = s2, (Math.max(c2.maxX, m2.maxX) - Math.min(c2.minX, m2.minX)) * (Math.max(c2.maxY, m2.maxY) - Math.min(c2.minY, m2.minY)) - l2);
            u2 < a2 ? (a2 = u2, e2 = l2 < e2 ? l2 : e2, h2 = s2) : u2 === a2 && l2 < e2 && (e2 = l2, h2 = s2);
          }
          i2 = h2 || i2.children[0];
        }
        var m2, c2;
        return i2;
      }, r.prototype._insert = function(t2, i2, n2) {
        var r2 = n2 ? t2 : this.toBBox(t2), e2 = [], a2 = this._chooseSubtree(r2, this.data, i2, e2);
        for (a2.children.push(t2), o(a2, r2); i2 >= 0 && e2[i2].children.length > this._maxEntries; ) this._split(e2, i2), i2--;
        this._adjustParentBBoxes(r2, e2, i2);
      }, r.prototype._split = function(t2, i2) {
        var n2 = t2[i2], r2 = n2.children.length, e2 = this._minEntries;
        this._chooseSplitAxis(n2, e2, r2);
        var h2 = this._chooseSplitIndex(n2, e2, r2), o2 = p(n2.children.splice(h2, n2.children.length - h2));
        o2.height = n2.height, o2.leaf = n2.leaf, a(n2, this.toBBox), a(o2, this.toBBox), i2 ? t2[i2 - 1].children.push(o2) : this._splitRoot(n2, o2);
      }, r.prototype._splitRoot = function(t2, i2) {
        this.data = p([t2, i2]), this.data.height = t2.height + 1, this.data.leaf = false, a(this.data, this.toBBox);
      }, r.prototype._chooseSplitIndex = function(t2, i2, n2) {
        for (var r2, e2, a2, o2, s2, l2, u2, m2 = 1 / 0, c2 = 1 / 0, p2 = i2; p2 <= n2 - i2; p2++) {
          var d2 = h(t2, 0, p2, this.toBBox), x = h(t2, p2, n2, this.toBBox), v = (e2 = d2, a2 = x, o2 = void 0, s2 = void 0, l2 = void 0, u2 = void 0, o2 = Math.max(e2.minX, a2.minX), s2 = Math.max(e2.minY, a2.minY), l2 = Math.min(e2.maxX, a2.maxX), u2 = Math.min(e2.maxY, a2.maxY), Math.max(0, l2 - o2) * Math.max(0, u2 - s2)), M = f(d2) + f(x);
          v < m2 ? (m2 = v, r2 = p2, c2 = M < c2 ? M : c2) : v === m2 && M < c2 && (c2 = M, r2 = p2);
        }
        return r2 || n2 - i2;
      }, r.prototype._chooseSplitAxis = function(t2, i2, n2) {
        var r2 = t2.leaf ? this.compareMinX : s, e2 = t2.leaf ? this.compareMinY : l;
        this._allDistMargin(t2, i2, n2, r2) < this._allDistMargin(t2, i2, n2, e2) && t2.children.sort(r2);
      }, r.prototype._allDistMargin = function(t2, i2, n2, r2) {
        t2.children.sort(r2);
        for (var e2 = this.toBBox, a2 = h(t2, 0, i2, e2), s2 = h(t2, n2 - i2, n2, e2), l2 = u(a2) + u(s2), f2 = i2; f2 < n2 - i2; f2++) {
          var m2 = t2.children[f2];
          o(a2, t2.leaf ? e2(m2) : m2), l2 += u(a2);
        }
        for (var c2 = n2 - i2 - 1; c2 >= i2; c2--) {
          var p2 = t2.children[c2];
          o(s2, t2.leaf ? e2(p2) : p2), l2 += u(s2);
        }
        return l2;
      }, r.prototype._adjustParentBBoxes = function(t2, i2, n2) {
        for (var r2 = n2; r2 >= 0; r2--) o(i2[r2], t2);
      }, r.prototype._condense = function(t2) {
        for (var i2 = t2.length - 1, n2 = void 0; i2 >= 0; i2--) 0 === t2[i2].children.length ? i2 > 0 ? (n2 = t2[i2 - 1].children).splice(n2.indexOf(t2[i2]), 1) : this.clear() : a(t2[i2], this.toBBox);
      }, r;
    });
  })(rbush_min$1);
  return rbush_min$1.exports;
}
var js$2 = {};
var hasRequiredJs$2;
function requireJs$2() {
  if (hasRequiredJs$2) return js$2;
  hasRequiredJs$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.earthRadius = 63710088e-1;
    exports.factors = {
      centimeters: exports.earthRadius * 100,
      centimetres: exports.earthRadius * 100,
      degrees: exports.earthRadius / 111325,
      feet: exports.earthRadius * 3.28084,
      inches: exports.earthRadius * 39.37,
      kilometers: exports.earthRadius / 1e3,
      kilometres: exports.earthRadius / 1e3,
      meters: exports.earthRadius,
      metres: exports.earthRadius,
      miles: exports.earthRadius / 1609.344,
      millimeters: exports.earthRadius * 1e3,
      millimetres: exports.earthRadius * 1e3,
      nauticalmiles: exports.earthRadius / 1852,
      radians: 1,
      yards: exports.earthRadius * 1.0936
    };
    exports.unitsFactors = {
      centimeters: 100,
      centimetres: 100,
      degrees: 1 / 111325,
      feet: 3.28084,
      inches: 39.37,
      kilometers: 1 / 1e3,
      kilometres: 1 / 1e3,
      meters: 1,
      metres: 1,
      miles: 1 / 1609.344,
      millimeters: 1e3,
      millimetres: 1e3,
      nauticalmiles: 1 / 1852,
      radians: 1 / exports.earthRadius,
      yards: 1.0936133
    };
    exports.areaFactors = {
      acres: 247105e-9,
      centimeters: 1e4,
      centimetres: 1e4,
      feet: 10.763910417,
      hectares: 1e-4,
      inches: 1550.003100006,
      kilometers: 1e-6,
      kilometres: 1e-6,
      meters: 1,
      metres: 1,
      miles: 386e-9,
      millimeters: 1e6,
      millimetres: 1e6,
      yards: 1.195990046
    };
    function feature2(geom, properties, options) {
      if (options === void 0) {
        options = {};
      }
      var feat = { type: "Feature" };
      if (options.id === 0 || options.id) {
        feat.id = options.id;
      }
      if (options.bbox) {
        feat.bbox = options.bbox;
      }
      feat.properties = properties || {};
      feat.geometry = geom;
      return feat;
    }
    exports.feature = feature2;
    function geometry(type, coordinates, _options) {
      switch (type) {
        case "Point":
          return point2(coordinates).geometry;
        case "LineString":
          return lineString2(coordinates).geometry;
        case "Polygon":
          return polygon2(coordinates).geometry;
        case "MultiPoint":
          return multiPoint(coordinates).geometry;
        case "MultiLineString":
          return multiLineString2(coordinates).geometry;
        case "MultiPolygon":
          return multiPolygon(coordinates).geometry;
        default:
          throw new Error(type + " is invalid");
      }
    }
    exports.geometry = geometry;
    function point2(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      if (!coordinates) {
        throw new Error("coordinates is required");
      }
      if (!Array.isArray(coordinates)) {
        throw new Error("coordinates must be an Array");
      }
      if (coordinates.length < 2) {
        throw new Error("coordinates must be at least 2 numbers long");
      }
      if (!isNumber2(coordinates[0]) || !isNumber2(coordinates[1])) {
        throw new Error("coordinates must contain numbers");
      }
      var geom = {
        type: "Point",
        coordinates
      };
      return feature2(geom, properties, options);
    }
    exports.point = point2;
    function points(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      return featureCollection2(coordinates.map(function(coords) {
        return point2(coords, properties);
      }), options);
    }
    exports.points = points;
    function polygon2(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
          throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
          if (ring[ring.length - 1][j] !== ring[0][j]) {
            throw new Error("First and last Position are not equivalent.");
          }
        }
      }
      var geom = {
        type: "Polygon",
        coordinates
      };
      return feature2(geom, properties, options);
    }
    exports.polygon = polygon2;
    function polygons(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      return featureCollection2(coordinates.map(function(coords) {
        return polygon2(coords, properties);
      }), options);
    }
    exports.polygons = polygons;
    function lineString2(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
      }
      var geom = {
        type: "LineString",
        coordinates
      };
      return feature2(geom, properties, options);
    }
    exports.lineString = lineString2;
    function lineStrings(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      return featureCollection2(coordinates.map(function(coords) {
        return lineString2(coords, properties);
      }), options);
    }
    exports.lineStrings = lineStrings;
    function featureCollection2(features, options) {
      if (options === void 0) {
        options = {};
      }
      var fc = { type: "FeatureCollection" };
      if (options.id) {
        fc.id = options.id;
      }
      if (options.bbox) {
        fc.bbox = options.bbox;
      }
      fc.features = features;
      return fc;
    }
    exports.featureCollection = featureCollection2;
    function multiLineString2(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      var geom = {
        type: "MultiLineString",
        coordinates
      };
      return feature2(geom, properties, options);
    }
    exports.multiLineString = multiLineString2;
    function multiPoint(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      var geom = {
        type: "MultiPoint",
        coordinates
      };
      return feature2(geom, properties, options);
    }
    exports.multiPoint = multiPoint;
    function multiPolygon(coordinates, properties, options) {
      if (options === void 0) {
        options = {};
      }
      var geom = {
        type: "MultiPolygon",
        coordinates
      };
      return feature2(geom, properties, options);
    }
    exports.multiPolygon = multiPolygon;
    function geometryCollection(geometries, properties, options) {
      if (options === void 0) {
        options = {};
      }
      var geom = {
        type: "GeometryCollection",
        geometries
      };
      return feature2(geom, properties, options);
    }
    exports.geometryCollection = geometryCollection;
    function round(num, precision) {
      if (precision === void 0) {
        precision = 0;
      }
      if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
      }
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(num * multiplier) / multiplier;
    }
    exports.round = round;
    function radiansToLength2(radians, units) {
      if (units === void 0) {
        units = "kilometers";
      }
      var factor = exports.factors[units];
      if (!factor) {
        throw new Error(units + " units is invalid");
      }
      return radians * factor;
    }
    exports.radiansToLength = radiansToLength2;
    function lengthToRadians2(distance2, units) {
      if (units === void 0) {
        units = "kilometers";
      }
      var factor = exports.factors[units];
      if (!factor) {
        throw new Error(units + " units is invalid");
      }
      return distance2 / factor;
    }
    exports.lengthToRadians = lengthToRadians2;
    function lengthToDegrees(distance2, units) {
      return radiansToDegrees2(lengthToRadians2(distance2, units));
    }
    exports.lengthToDegrees = lengthToDegrees;
    function bearingToAzimuth(bearing2) {
      var angle = bearing2 % 360;
      if (angle < 0) {
        angle += 360;
      }
      return angle;
    }
    exports.bearingToAzimuth = bearingToAzimuth;
    function radiansToDegrees2(radians) {
      var degrees = radians % (2 * Math.PI);
      return degrees * 180 / Math.PI;
    }
    exports.radiansToDegrees = radiansToDegrees2;
    function degreesToRadians2(degrees) {
      var radians = degrees % 360;
      return radians * Math.PI / 180;
    }
    exports.degreesToRadians = degreesToRadians2;
    function convertLength(length2, originalUnit, finalUnit) {
      if (originalUnit === void 0) {
        originalUnit = "kilometers";
      }
      if (finalUnit === void 0) {
        finalUnit = "kilometers";
      }
      if (!(length2 >= 0)) {
        throw new Error("length must be a positive number");
      }
      return radiansToLength2(lengthToRadians2(length2, originalUnit), finalUnit);
    }
    exports.convertLength = convertLength;
    function convertArea(area, originalUnit, finalUnit) {
      if (originalUnit === void 0) {
        originalUnit = "meters";
      }
      if (finalUnit === void 0) {
        finalUnit = "kilometers";
      }
      if (!(area >= 0)) {
        throw new Error("area must be a positive number");
      }
      var startFactor = exports.areaFactors[originalUnit];
      if (!startFactor) {
        throw new Error("invalid original units");
      }
      var finalFactor = exports.areaFactors[finalUnit];
      if (!finalFactor) {
        throw new Error("invalid final units");
      }
      return area / startFactor * finalFactor;
    }
    exports.convertArea = convertArea;
    function isNumber2(num) {
      return !isNaN(num) && num !== null && !Array.isArray(num);
    }
    exports.isNumber = isNumber2;
    function isObject2(input) {
      return !!input && input.constructor === Object;
    }
    exports.isObject = isObject2;
    function validateBBox(bbox2) {
      if (!bbox2) {
        throw new Error("bbox is required");
      }
      if (!Array.isArray(bbox2)) {
        throw new Error("bbox must be an Array");
      }
      if (bbox2.length !== 4 && bbox2.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
      }
      bbox2.forEach(function(num) {
        if (!isNumber2(num)) {
          throw new Error("bbox must only contain numbers");
        }
      });
    }
    exports.validateBBox = validateBBox;
    function validateId(id) {
      if (!id) {
        throw new Error("id is required");
      }
      if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
      }
    }
    exports.validateId = validateId;
  })(js$2);
  return js$2;
}
var js$1 = {};
var hasRequiredJs$1;
function requireJs$1() {
  if (hasRequiredJs$1) return js$1;
  hasRequiredJs$1 = 1;
  Object.defineProperty(js$1, "__esModule", { value: true });
  var helpers = /* @__PURE__ */ requireJs$2();
  function coordEach2(geojson, callback, excludeWrapCoord) {
    if (geojson === null) return;
    var j, k, l, geometry, stopG, coords, geometryMaybeCollection, wrapShrink = 0, coordIndex = 0, isGeometryCollection, type = geojson.type, isFeatureCollection = type === "FeatureCollection", isFeature = type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
    for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
      geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;
      isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
      stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
      for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
        var multiFeatureIndex = 0;
        var geometryIndex = 0;
        geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;
        if (geometry === null) continue;
        coords = geometry.coordinates;
        var geomType = geometry.type;
        wrapShrink = excludeWrapCoord && (geomType === "Polygon" || geomType === "MultiPolygon") ? 1 : 0;
        switch (geomType) {
          case null:
            break;
          case "Point":
            if (callback(
              coords,
              coordIndex,
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false)
              return false;
            coordIndex++;
            multiFeatureIndex++;
            break;
          case "LineString":
          case "MultiPoint":
            for (j = 0; j < coords.length; j++) {
              if (callback(
                coords[j],
                coordIndex,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              ) === false)
                return false;
              coordIndex++;
              if (geomType === "MultiPoint") multiFeatureIndex++;
            }
            if (geomType === "LineString") multiFeatureIndex++;
            break;
          case "Polygon":
          case "MultiLineString":
            for (j = 0; j < coords.length; j++) {
              for (k = 0; k < coords[j].length - wrapShrink; k++) {
                if (callback(
                  coords[j][k],
                  coordIndex,
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false)
                  return false;
                coordIndex++;
              }
              if (geomType === "MultiLineString") multiFeatureIndex++;
              if (geomType === "Polygon") geometryIndex++;
            }
            if (geomType === "Polygon") multiFeatureIndex++;
            break;
          case "MultiPolygon":
            for (j = 0; j < coords.length; j++) {
              geometryIndex = 0;
              for (k = 0; k < coords[j].length; k++) {
                for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                  if (callback(
                    coords[j][k][l],
                    coordIndex,
                    featureIndex,
                    multiFeatureIndex,
                    geometryIndex
                  ) === false)
                    return false;
                  coordIndex++;
                }
                geometryIndex++;
              }
              multiFeatureIndex++;
            }
            break;
          case "GeometryCollection":
            for (j = 0; j < geometry.geometries.length; j++)
              if (coordEach2(geometry.geometries[j], callback, excludeWrapCoord) === false)
                return false;
            break;
          default:
            throw new Error("Unknown Geometry Type");
        }
      }
    }
  }
  function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
    var previousValue = initialValue;
    coordEach2(
      geojson,
      function(currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
        if (coordIndex === 0 && initialValue === void 0)
          previousValue = currentCoord;
        else
          previousValue = callback(
            previousValue,
            currentCoord,
            coordIndex,
            featureIndex,
            multiFeatureIndex,
            geometryIndex
          );
      },
      excludeWrapCoord
    );
    return previousValue;
  }
  function propEach(geojson, callback) {
    var i;
    switch (geojson.type) {
      case "FeatureCollection":
        for (i = 0; i < geojson.features.length; i++) {
          if (callback(geojson.features[i].properties, i) === false) break;
        }
        break;
      case "Feature":
        callback(geojson.properties, 0);
        break;
    }
  }
  function propReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    propEach(geojson, function(currentProperties, featureIndex) {
      if (featureIndex === 0 && initialValue === void 0)
        previousValue = currentProperties;
      else
        previousValue = callback(previousValue, currentProperties, featureIndex);
    });
    return previousValue;
  }
  function featureEach2(geojson, callback) {
    if (geojson.type === "Feature") {
      callback(geojson, 0);
    } else if (geojson.type === "FeatureCollection") {
      for (var i = 0; i < geojson.features.length; i++) {
        if (callback(geojson.features[i], i) === false) break;
      }
    }
  }
  function featureReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    featureEach2(geojson, function(currentFeature, featureIndex) {
      if (featureIndex === 0 && initialValue === void 0)
        previousValue = currentFeature;
      else previousValue = callback(previousValue, currentFeature, featureIndex);
    });
    return previousValue;
  }
  function coordAll(geojson) {
    var coords = [];
    coordEach2(geojson, function(coord) {
      coords.push(coord);
    });
    return coords;
  }
  function geomEach2(geojson, callback) {
    var i, j, g, geometry, stopG, geometryMaybeCollection, isGeometryCollection, featureProperties, featureBBox, featureId, featureIndex = 0, isFeatureCollection = geojson.type === "FeatureCollection", isFeature = geojson.type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
    for (i = 0; i < stop; i++) {
      geometryMaybeCollection = isFeatureCollection ? geojson.features[i].geometry : isFeature ? geojson.geometry : geojson;
      featureProperties = isFeatureCollection ? geojson.features[i].properties : isFeature ? geojson.properties : {};
      featureBBox = isFeatureCollection ? geojson.features[i].bbox : isFeature ? geojson.bbox : void 0;
      featureId = isFeatureCollection ? geojson.features[i].id : isFeature ? geojson.id : void 0;
      isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
      stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
      for (g = 0; g < stopG; g++) {
        geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection;
        if (geometry === null) {
          if (callback(
            null,
            featureIndex,
            featureProperties,
            featureBBox,
            featureId
          ) === false)
            return false;
          continue;
        }
        switch (geometry.type) {
          case "Point":
          case "LineString":
          case "MultiPoint":
          case "Polygon":
          case "MultiLineString":
          case "MultiPolygon": {
            if (callback(
              geometry,
              featureIndex,
              featureProperties,
              featureBBox,
              featureId
            ) === false)
              return false;
            break;
          }
          case "GeometryCollection": {
            for (j = 0; j < geometry.geometries.length; j++) {
              if (callback(
                geometry.geometries[j],
                featureIndex,
                featureProperties,
                featureBBox,
                featureId
              ) === false)
                return false;
            }
            break;
          }
          default:
            throw new Error("Unknown Geometry Type");
        }
      }
      featureIndex++;
    }
  }
  function geomReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    geomEach2(
      geojson,
      function(currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
        if (featureIndex === 0 && initialValue === void 0)
          previousValue = currentGeometry;
        else
          previousValue = callback(
            previousValue,
            currentGeometry,
            featureIndex,
            featureProperties,
            featureBBox,
            featureId
          );
      }
    );
    return previousValue;
  }
  function flattenEach2(geojson, callback) {
    geomEach2(geojson, function(geometry, featureIndex, properties, bbox2, id) {
      var type = geometry === null ? null : geometry.type;
      switch (type) {
        case null:
        case "Point":
        case "LineString":
        case "Polygon":
          if (callback(
            helpers.feature(geometry, properties, { bbox: bbox2, id }),
            featureIndex,
            0
          ) === false)
            return false;
          return;
      }
      var geomType;
      switch (type) {
        case "MultiPoint":
          geomType = "Point";
          break;
        case "MultiLineString":
          geomType = "LineString";
          break;
        case "MultiPolygon":
          geomType = "Polygon";
          break;
      }
      for (var multiFeatureIndex = 0; multiFeatureIndex < geometry.coordinates.length; multiFeatureIndex++) {
        var coordinate = geometry.coordinates[multiFeatureIndex];
        var geom = {
          type: geomType,
          coordinates: coordinate
        };
        if (callback(helpers.feature(geom, properties), featureIndex, multiFeatureIndex) === false)
          return false;
      }
    });
  }
  function flattenReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    flattenEach2(
      geojson,
      function(currentFeature, featureIndex, multiFeatureIndex) {
        if (featureIndex === 0 && multiFeatureIndex === 0 && initialValue === void 0)
          previousValue = currentFeature;
        else
          previousValue = callback(
            previousValue,
            currentFeature,
            featureIndex,
            multiFeatureIndex
          );
      }
    );
    return previousValue;
  }
  function segmentEach2(geojson, callback) {
    flattenEach2(geojson, function(feature2, featureIndex, multiFeatureIndex) {
      var segmentIndex = 0;
      if (!feature2.geometry) return;
      var type = feature2.geometry.type;
      if (type === "Point" || type === "MultiPoint") return;
      var previousCoords;
      var previousFeatureIndex = 0;
      var previousMultiIndex = 0;
      var prevGeomIndex = 0;
      if (coordEach2(
        feature2,
        function(currentCoord, coordIndex, featureIndexCoord, multiPartIndexCoord, geometryIndex) {
          if (previousCoords === void 0 || featureIndex > previousFeatureIndex || multiPartIndexCoord > previousMultiIndex || geometryIndex > prevGeomIndex) {
            previousCoords = currentCoord;
            previousFeatureIndex = featureIndex;
            previousMultiIndex = multiPartIndexCoord;
            prevGeomIndex = geometryIndex;
            segmentIndex = 0;
            return;
          }
          var currentSegment = helpers.lineString(
            [previousCoords, currentCoord],
            feature2.properties
          );
          if (callback(
            currentSegment,
            featureIndex,
            multiFeatureIndex,
            geometryIndex,
            segmentIndex
          ) === false)
            return false;
          segmentIndex++;
          previousCoords = currentCoord;
        }
      ) === false)
        return false;
    });
  }
  function segmentReduce2(geojson, callback, initialValue) {
    var previousValue = initialValue;
    var started = false;
    segmentEach2(
      geojson,
      function(currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
        if (started === false && initialValue === void 0)
          previousValue = currentSegment;
        else
          previousValue = callback(
            previousValue,
            currentSegment,
            featureIndex,
            multiFeatureIndex,
            geometryIndex,
            segmentIndex
          );
        started = true;
      }
    );
    return previousValue;
  }
  function lineEach(geojson, callback) {
    if (!geojson) throw new Error("geojson is required");
    flattenEach2(geojson, function(feature2, featureIndex, multiFeatureIndex) {
      if (feature2.geometry === null) return;
      var type = feature2.geometry.type;
      var coords = feature2.geometry.coordinates;
      switch (type) {
        case "LineString":
          if (callback(feature2, featureIndex, multiFeatureIndex, 0, 0) === false)
            return false;
          break;
        case "Polygon":
          for (var geometryIndex = 0; geometryIndex < coords.length; geometryIndex++) {
            if (callback(
              helpers.lineString(coords[geometryIndex], feature2.properties),
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false)
              return false;
          }
          break;
      }
    });
  }
  function lineReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    lineEach(
      geojson,
      function(currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
        if (featureIndex === 0 && initialValue === void 0)
          previousValue = currentLine;
        else
          previousValue = callback(
            previousValue,
            currentLine,
            featureIndex,
            multiFeatureIndex,
            geometryIndex
          );
      }
    );
    return previousValue;
  }
  function findSegment(geojson, options) {
    options = options || {};
    if (!helpers.isObject(options)) throw new Error("options is invalid");
    var featureIndex = options.featureIndex || 0;
    var multiFeatureIndex = options.multiFeatureIndex || 0;
    var geometryIndex = options.geometryIndex || 0;
    var segmentIndex = options.segmentIndex || 0;
    var properties = options.properties;
    var geometry;
    switch (geojson.type) {
      case "FeatureCollection":
        if (featureIndex < 0)
          featureIndex = geojson.features.length + featureIndex;
        properties = properties || geojson.features[featureIndex].properties;
        geometry = geojson.features[featureIndex].geometry;
        break;
      case "Feature":
        properties = properties || geojson.properties;
        geometry = geojson.geometry;
        break;
      case "Point":
      case "MultiPoint":
        return null;
      case "LineString":
      case "Polygon":
      case "MultiLineString":
      case "MultiPolygon":
        geometry = geojson;
        break;
      default:
        throw new Error("geojson is invalid");
    }
    if (geometry === null) return null;
    var coords = geometry.coordinates;
    switch (geometry.type) {
      case "Point":
      case "MultiPoint":
        return null;
      case "LineString":
        if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
        return helpers.lineString(
          [coords[segmentIndex], coords[segmentIndex + 1]],
          properties,
          options
        );
      case "Polygon":
        if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
        if (segmentIndex < 0)
          segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
        return helpers.lineString(
          [
            coords[geometryIndex][segmentIndex],
            coords[geometryIndex][segmentIndex + 1]
          ],
          properties,
          options
        );
      case "MultiLineString":
        if (multiFeatureIndex < 0)
          multiFeatureIndex = coords.length + multiFeatureIndex;
        if (segmentIndex < 0)
          segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
        return helpers.lineString(
          [
            coords[multiFeatureIndex][segmentIndex],
            coords[multiFeatureIndex][segmentIndex + 1]
          ],
          properties,
          options
        );
      case "MultiPolygon":
        if (multiFeatureIndex < 0)
          multiFeatureIndex = coords.length + multiFeatureIndex;
        if (geometryIndex < 0)
          geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
        if (segmentIndex < 0)
          segmentIndex = coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
        return helpers.lineString(
          [
            coords[multiFeatureIndex][geometryIndex][segmentIndex],
            coords[multiFeatureIndex][geometryIndex][segmentIndex + 1]
          ],
          properties,
          options
        );
    }
    throw new Error("geojson is invalid");
  }
  function findPoint(geojson, options) {
    options = options || {};
    if (!helpers.isObject(options)) throw new Error("options is invalid");
    var featureIndex = options.featureIndex || 0;
    var multiFeatureIndex = options.multiFeatureIndex || 0;
    var geometryIndex = options.geometryIndex || 0;
    var coordIndex = options.coordIndex || 0;
    var properties = options.properties;
    var geometry;
    switch (geojson.type) {
      case "FeatureCollection":
        if (featureIndex < 0)
          featureIndex = geojson.features.length + featureIndex;
        properties = properties || geojson.features[featureIndex].properties;
        geometry = geojson.features[featureIndex].geometry;
        break;
      case "Feature":
        properties = properties || geojson.properties;
        geometry = geojson.geometry;
        break;
      case "Point":
      case "MultiPoint":
        return null;
      case "LineString":
      case "Polygon":
      case "MultiLineString":
      case "MultiPolygon":
        geometry = geojson;
        break;
      default:
        throw new Error("geojson is invalid");
    }
    if (geometry === null) return null;
    var coords = geometry.coordinates;
    switch (geometry.type) {
      case "Point":
        return helpers.point(coords, properties, options);
      case "MultiPoint":
        if (multiFeatureIndex < 0)
          multiFeatureIndex = coords.length + multiFeatureIndex;
        return helpers.point(coords[multiFeatureIndex], properties, options);
      case "LineString":
        if (coordIndex < 0) coordIndex = coords.length + coordIndex;
        return helpers.point(coords[coordIndex], properties, options);
      case "Polygon":
        if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
        if (coordIndex < 0)
          coordIndex = coords[geometryIndex].length + coordIndex;
        return helpers.point(coords[geometryIndex][coordIndex], properties, options);
      case "MultiLineString":
        if (multiFeatureIndex < 0)
          multiFeatureIndex = coords.length + multiFeatureIndex;
        if (coordIndex < 0)
          coordIndex = coords[multiFeatureIndex].length + coordIndex;
        return helpers.point(coords[multiFeatureIndex][coordIndex], properties, options);
      case "MultiPolygon":
        if (multiFeatureIndex < 0)
          multiFeatureIndex = coords.length + multiFeatureIndex;
        if (geometryIndex < 0)
          geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
        if (coordIndex < 0)
          coordIndex = coords[multiFeatureIndex][geometryIndex].length - coordIndex;
        return helpers.point(
          coords[multiFeatureIndex][geometryIndex][coordIndex],
          properties,
          options
        );
    }
    throw new Error("geojson is invalid");
  }
  js$1.coordAll = coordAll;
  js$1.coordEach = coordEach2;
  js$1.coordReduce = coordReduce;
  js$1.featureEach = featureEach2;
  js$1.featureReduce = featureReduce;
  js$1.findPoint = findPoint;
  js$1.findSegment = findSegment;
  js$1.flattenEach = flattenEach2;
  js$1.flattenReduce = flattenReduce;
  js$1.geomEach = geomEach2;
  js$1.geomReduce = geomReduce;
  js$1.lineEach = lineEach;
  js$1.lineReduce = lineReduce;
  js$1.propEach = propEach;
  js$1.propReduce = propReduce;
  js$1.segmentEach = segmentEach2;
  js$1.segmentReduce = segmentReduce2;
  return js$1;
}
var js = {};
var hasRequiredJs;
function requireJs() {
  if (hasRequiredJs) return js;
  hasRequiredJs = 1;
  Object.defineProperty(js, "__esModule", { value: true });
  var meta_1 = /* @__PURE__ */ requireJs$1();
  function bbox2(geojson) {
    var result = [Infinity, Infinity, -Infinity, -Infinity];
    meta_1.coordEach(geojson, function(coord) {
      if (result[0] > coord[0]) {
        result[0] = coord[0];
      }
      if (result[1] > coord[1]) {
        result[1] = coord[1];
      }
      if (result[2] < coord[0]) {
        result[2] = coord[0];
      }
      if (result[3] < coord[1]) {
        result[3] = coord[1];
      }
    });
    return result;
  }
  bbox2["default"] = bbox2;
  js.default = bbox2;
  return js;
}
var hasRequiredGeojsonRbush;
function requireGeojsonRbush() {
  if (hasRequiredGeojsonRbush) return geojsonRbush.exports;
  hasRequiredGeojsonRbush = 1;
  var rbush2 = requireRbush_min();
  var helpers = /* @__PURE__ */ requireJs$2();
  var meta = /* @__PURE__ */ requireJs$1();
  var turfBBox = requireJs().default;
  var featureEach2 = meta.featureEach;
  meta.coordEach;
  helpers.polygon;
  var featureCollection2 = helpers.featureCollection;
  function geojsonRbush$1(maxEntries) {
    var tree = new rbush2(maxEntries);
    tree.insert = function(feature2) {
      if (feature2.type !== "Feature") throw new Error("invalid feature");
      feature2.bbox = feature2.bbox ? feature2.bbox : turfBBox(feature2);
      return rbush2.prototype.insert.call(this, feature2);
    };
    tree.load = function(features) {
      var load = [];
      if (Array.isArray(features)) {
        features.forEach(function(feature2) {
          if (feature2.type !== "Feature") throw new Error("invalid features");
          feature2.bbox = feature2.bbox ? feature2.bbox : turfBBox(feature2);
          load.push(feature2);
        });
      } else {
        featureEach2(features, function(feature2) {
          if (feature2.type !== "Feature") throw new Error("invalid features");
          feature2.bbox = feature2.bbox ? feature2.bbox : turfBBox(feature2);
          load.push(feature2);
        });
      }
      return rbush2.prototype.load.call(this, load);
    };
    tree.remove = function(feature2, equals) {
      if (feature2.type !== "Feature") throw new Error("invalid feature");
      feature2.bbox = feature2.bbox ? feature2.bbox : turfBBox(feature2);
      return rbush2.prototype.remove.call(this, feature2, equals);
    };
    tree.clear = function() {
      return rbush2.prototype.clear.call(this);
    };
    tree.search = function(geojson) {
      var features = rbush2.prototype.search.call(this, this.toBBox(geojson));
      return featureCollection2(features);
    };
    tree.collides = function(geojson) {
      return rbush2.prototype.collides.call(this, this.toBBox(geojson));
    };
    tree.all = function() {
      var features = rbush2.prototype.all.call(this);
      return featureCollection2(features);
    };
    tree.toJSON = function() {
      return rbush2.prototype.toJSON.call(this);
    };
    tree.fromJSON = function(json) {
      return rbush2.prototype.fromJSON.call(this, json);
    };
    tree.toBBox = function(geojson) {
      var bbox2;
      if (geojson.bbox) bbox2 = geojson.bbox;
      else if (Array.isArray(geojson) && geojson.length === 4) bbox2 = geojson;
      else if (Array.isArray(geojson) && geojson.length === 6) bbox2 = [geojson[0], geojson[1], geojson[3], geojson[4]];
      else if (geojson.type === "Feature") bbox2 = turfBBox(geojson);
      else if (geojson.type === "FeatureCollection") bbox2 = turfBBox(geojson);
      else throw new Error("invalid geojson");
      return {
        minX: bbox2[0],
        minY: bbox2[1],
        maxX: bbox2[2],
        maxY: bbox2[3]
      };
    };
    return tree;
  }
  geojsonRbush.exports = geojsonRbush$1;
  geojsonRbush.exports.default = geojsonRbush$1;
  return geojsonRbush.exports;
}
var geojsonRbushExports = requireGeojsonRbush();
const rbush = /* @__PURE__ */ getDefaultExportFromCjs(geojsonRbushExports);
function lineIntersect(line1, line2) {
  var unique = {};
  var results = [];
  if (line1.type === "LineString") {
    line1 = feature(line1);
  }
  if (line2.type === "LineString") {
    line2 = feature(line2);
  }
  if (line1.type === "Feature" && line2.type === "Feature" && line1.geometry !== null && line2.geometry !== null && line1.geometry.type === "LineString" && line2.geometry.type === "LineString" && line1.geometry.coordinates.length === 2 && line2.geometry.coordinates.length === 2) {
    var intersect = intersects(line1, line2);
    if (intersect) {
      results.push(intersect);
    }
    return featureCollection(results);
  }
  var tree = rbush();
  tree.load(lineSegment(line2));
  featureEach(lineSegment(line1), function(segment) {
    featureEach(tree.search(segment), function(match) {
      var intersect2 = intersects(segment, match);
      if (intersect2) {
        var key = getCoords(intersect2).join(",");
        if (!unique[key]) {
          unique[key] = true;
          results.push(intersect2);
        }
      }
    });
  });
  return featureCollection(results);
}
function intersects(line1, line2) {
  var coords1 = getCoords(line1);
  var coords2 = getCoords(line2);
  if (coords1.length !== 2) {
    throw new Error("<intersects> line1 must only contain 2 coordinates");
  }
  if (coords2.length !== 2) {
    throw new Error("<intersects> line2 must only contain 2 coordinates");
  }
  var x1 = coords1[0][0];
  var y1 = coords1[0][1];
  var x2 = coords1[1][0];
  var y2 = coords1[1][1];
  var x3 = coords2[0][0];
  var y3 = coords2[0][1];
  var x4 = coords2[1][0];
  var y4 = coords2[1][1];
  var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  var numeA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  var numeB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
  if (denom === 0) {
    if (numeA === 0 && numeB === 0) {
      return null;
    }
    return null;
  }
  var uA = numeA / denom;
  var uB = numeB / denom;
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    var x = x1 + uA * (x2 - x1);
    var y = y1 + uA * (y2 - y1);
    return point([x, y]);
  }
  return null;
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
function lineSliceAlong(line, startDist, stopDist, options) {
  options = options || {};
  if (!isObject(options)) throw new Error("options is invalid");
  var coords;
  var slice = [];
  if (line.type === "Feature") coords = line.geometry.coordinates;
  else if (line.type === "LineString") coords = line.coordinates;
  else throw new Error("input must be a LineString Feature or Geometry");
  var origCoordsLength = coords.length;
  var travelled = 0;
  var overshot, direction, interpolated;
  for (var i = 0; i < coords.length; i++) {
    if (startDist >= travelled && i === coords.length - 1) break;
    else if (travelled > startDist && slice.length === 0) {
      overshot = startDist - travelled;
      if (!overshot) {
        slice.push(coords[i]);
        return lineString(slice);
      }
      direction = bearing(coords[i], coords[i - 1]) - 180;
      interpolated = destination(coords[i], overshot, direction, options);
      slice.push(interpolated.geometry.coordinates);
    }
    if (travelled >= stopDist) {
      overshot = stopDist - travelled;
      if (!overshot) {
        slice.push(coords[i]);
        return lineString(slice);
      }
      direction = bearing(coords[i], coords[i - 1]) - 180;
      interpolated = destination(coords[i], overshot, direction, options);
      slice.push(interpolated.geometry.coordinates);
      return lineString(slice);
    }
    if (travelled >= startDist) {
      slice.push(coords[i]);
    }
    if (i === coords.length - 1) {
      return lineString(slice);
    }
    travelled += distance(coords[i], coords[i + 1], options);
  }
  if (travelled < startDist && coords.length === origCoordsLength)
    throw new Error("Start position is beyond line");
  var last = coords[coords.length - 1];
  return lineString([last, last]);
}
function polygonToLine(poly, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = getGeom(poly);
  if (!options.properties && poly.type === "Feature") {
    options.properties = poly.properties;
  }
  switch (geom.type) {
    case "Polygon":
      return polygonToLine$1(geom, options);
    case "MultiPolygon":
      return multiPolygonToLine(geom, options);
    default:
      throw new Error("invalid poly");
  }
}
function polygonToLine$1(poly, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = getGeom(poly);
  var coords = geom.coordinates;
  var properties = options.properties ? options.properties : poly.type === "Feature" ? poly.properties : {};
  return coordsToLine(coords, properties);
}
function multiPolygonToLine(multiPoly, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = getGeom(multiPoly);
  var coords = geom.coordinates;
  var properties = options.properties ? options.properties : multiPoly.type === "Feature" ? multiPoly.properties : {};
  var lines = [];
  coords.forEach(function(coord) {
    lines.push(coordsToLine(coord, properties));
  });
  return featureCollection(lines);
}
function coordsToLine(coords, properties) {
  if (coords.length > 1) {
    return multiLineString(coords, properties);
  }
  return lineString(coords[0], properties);
}
function booleanDisjoint(feature1, feature2) {
  var bool = true;
  flattenEach(feature1, function(flatten1) {
    flattenEach(feature2, function(flatten2) {
      if (bool === false) {
        return false;
      }
      bool = disjoint(flatten1.geometry, flatten2.geometry);
    });
  });
  return bool;
}
function disjoint(geom1, geom2) {
  switch (geom1.type) {
    case "Point":
      switch (geom2.type) {
        case "Point":
          return !compareCoords(geom1.coordinates, geom2.coordinates);
        case "LineString":
          return !isPointOnLine(geom2, geom1);
        case "Polygon":
          return !booleanPointInPolygon(geom1, geom2);
      }
      break;
    case "LineString":
      switch (geom2.type) {
        case "Point":
          return !isPointOnLine(geom1, geom2);
        case "LineString":
          return !isLineOnLine(geom1, geom2);
        case "Polygon":
          return !isLineInPoly(geom2, geom1);
      }
      break;
    case "Polygon":
      switch (geom2.type) {
        case "Point":
          return !booleanPointInPolygon(geom2, geom1);
        case "LineString":
          return !isLineInPoly(geom1, geom2);
        case "Polygon":
          return !isPolyInPoly(geom2, geom1);
      }
  }
  return false;
}
function isPointOnLine(lineString2, pt) {
  for (var i = 0; i < lineString2.coordinates.length - 1; i++) {
    if (isPointOnLineSegment(lineString2.coordinates[i], lineString2.coordinates[i + 1], pt.coordinates)) {
      return true;
    }
  }
  return false;
}
function isLineOnLine(lineString1, lineString2) {
  var doLinesIntersect = lineIntersect(lineString1, lineString2);
  if (doLinesIntersect.features.length > 0) {
    return true;
  }
  return false;
}
function isLineInPoly(polygon2, lineString2) {
  for (var _i = 0, _a = lineString2.coordinates; _i < _a.length; _i++) {
    var coord = _a[_i];
    if (booleanPointInPolygon(coord, polygon2)) {
      return true;
    }
  }
  var doLinesIntersect = lineIntersect(lineString2, polygonToLine(polygon2));
  if (doLinesIntersect.features.length > 0) {
    return true;
  }
  return false;
}
function isPolyInPoly(feature1, feature2) {
  for (var _i = 0, _a = feature1.coordinates[0]; _i < _a.length; _i++) {
    var coord1 = _a[_i];
    if (booleanPointInPolygon(coord1, feature2)) {
      return true;
    }
  }
  for (var _b = 0, _c = feature2.coordinates[0]; _b < _c.length; _b++) {
    var coord2 = _c[_b];
    if (booleanPointInPolygon(coord2, feature1)) {
      return true;
    }
  }
  var doLinesIntersect = lineIntersect(polygonToLine(feature1), polygonToLine(feature2));
  if (doLinesIntersect.features.length > 0) {
    return true;
  }
  return false;
}
function isPointOnLineSegment(lineSegmentStart, lineSegmentEnd, pt) {
  var dxc = pt[0] - lineSegmentStart[0];
  var dyc = pt[1] - lineSegmentStart[1];
  var dxl = lineSegmentEnd[0] - lineSegmentStart[0];
  var dyl = lineSegmentEnd[1] - lineSegmentStart[1];
  var cross = dxc * dyl - dyc * dxl;
  if (cross !== 0) {
    return false;
  }
  if (Math.abs(dxl) >= Math.abs(dyl)) {
    if (dxl > 0) {
      return lineSegmentStart[0] <= pt[0] && pt[0] <= lineSegmentEnd[0];
    } else {
      return lineSegmentEnd[0] <= pt[0] && pt[0] <= lineSegmentStart[0];
    }
  } else if (dyl > 0) {
    return lineSegmentStart[1] <= pt[1] && pt[1] <= lineSegmentEnd[1];
  } else {
    return lineSegmentEnd[1] <= pt[1] && pt[1] <= lineSegmentStart[1];
  }
}
function compareCoords(pair1, pair2) {
  return pair1[0] === pair2[0] && pair1[1] === pair2[1];
}
function booleanIntersects(feature1, feature2) {
  var bool = false;
  flattenEach(feature1, function(flatten1) {
    flattenEach(feature2, function(flatten2) {
      if (bool === true) {
        return true;
      }
      bool = !booleanDisjoint(flatten1.geometry, flatten2.geometry);
    });
  });
  return bool;
}
export {
  length as a,
  lineSliceAlong as b,
  bbox$1 as c,
  featureCollection as d,
  booleanIntersects as e,
  feature as f,
  lineString as l,
  polygon as p
};
//# sourceMappingURL=turf-C25yoSNr.js.map
