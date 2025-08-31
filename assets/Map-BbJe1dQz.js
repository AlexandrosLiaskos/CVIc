import { r as reactExports, L, j as jsxRuntimeExports } from "./index-DMu4DUtd.js";
import "./leaflet.draw-DHK4e1PG.js";
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
var unitsFactors = {
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
  radians: 1 / earthRadius,
  yards: 1.0936133
};
var areaFactors = {
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
function geometry(type, coordinates, _options) {
  switch (type) {
    case "Point":
      return point(coordinates).geometry;
    case "LineString":
      return lineString(coordinates).geometry;
    case "Polygon":
      return polygon(coordinates).geometry;
    case "MultiPoint":
      return multiPoint(coordinates).geometry;
    case "MultiLineString":
      return multiLineString(coordinates).geometry;
    case "MultiPolygon":
      return multiPolygon(coordinates).geometry;
    default:
      throw new Error(type + " is invalid");
  }
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
function points(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  return featureCollection(coordinates.map(function(coords) {
    return point(coords, properties);
  }), options);
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
function polygons(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  return featureCollection(coordinates.map(function(coords) {
    return polygon(coords, properties);
  }), options);
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
function lineStrings(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  return featureCollection(coordinates.map(function(coords) {
    return lineString(coords, properties);
  }), options);
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
function multiPoint(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: "MultiPoint",
    coordinates
  };
  return feature(geom, properties, options);
}
function multiPolygon(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: "MultiPolygon",
    coordinates
  };
  return feature(geom, properties, options);
}
function geometryCollection(geometries, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: "GeometryCollection",
    geometries
  };
  return feature(geom, properties, options);
}
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
function lengthToRadians(distance, units) {
  if (units === void 0) {
    units = "kilometers";
  }
  var factor = factors[units];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return distance / factor;
}
function lengthToDegrees(distance, units) {
  return radiansToDegrees(lengthToRadians(distance, units));
}
function bearingToAzimuth(bearing) {
  var angle = bearing % 360;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}
function radiansToDegrees(radians) {
  var degrees = radians % (2 * Math.PI);
  return degrees * 180 / Math.PI;
}
function degreesToRadians(degrees) {
  var radians = degrees % 360;
  return radians * Math.PI / 180;
}
function convertLength(length, originalUnit, finalUnit) {
  if (originalUnit === void 0) {
    originalUnit = "kilometers";
  }
  if (finalUnit === void 0) {
    finalUnit = "kilometers";
  }
  if (!(length >= 0)) {
    throw new Error("length must be a positive number");
  }
  return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
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
  var startFactor = areaFactors[originalUnit];
  if (!startFactor) {
    throw new Error("invalid original units");
  }
  var finalFactor = areaFactors[finalUnit];
  if (!finalFactor) {
    throw new Error("invalid final units");
  }
  return area / startFactor * finalFactor;
}
function isNumber(num) {
  return !isNaN(num) && num !== null && !Array.isArray(num);
}
function isObject(input) {
  return !!input && input.constructor === Object;
}
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
    if (!isNumber(num)) {
      throw new Error("bbox must only contain numbers");
    }
  });
}
function validateId(id) {
  if (!id) {
    throw new Error("id is required");
  }
  if (["string", "number"].indexOf(typeof id) === -1) {
    throw new Error("id must be a number or a string");
  }
}
const es$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  areaFactors,
  bearingToAzimuth,
  convertArea,
  convertLength,
  degreesToRadians,
  earthRadius,
  factors,
  feature,
  featureCollection,
  geometry,
  geometryCollection,
  isNumber,
  isObject,
  lengthToDegrees,
  lengthToRadians,
  lineString,
  lineStrings,
  multiLineString,
  multiPoint,
  multiPolygon,
  point,
  points,
  polygon,
  polygons,
  radiansToDegrees,
  radiansToLength,
  round,
  unitsFactors,
  validateBBox,
  validateId
}, Symbol.toStringTag, { value: "Module" }));
function coordEach(geojson, callback, excludeWrapCoord) {
  if (geojson === null) return;
  var j, k, l, geometry2, stopG, coords, geometryMaybeCollection, wrapShrink = 0, coordIndex = 0, isGeometryCollection, type = geojson.type, isFeatureCollection = type === "FeatureCollection", isFeature = type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry2 = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;
      if (geometry2 === null) continue;
      coords = geometry2.coordinates;
      var geomType = geometry2.type;
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
          for (j = 0; j < geometry2.geometries.length; j++)
            if (coordEach(geometry2.geometries[j], callback, excludeWrapCoord) === false)
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
  coordEach(
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
function featureEach(geojson, callback) {
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
  featureEach(geojson, function(currentFeature, featureIndex) {
    if (featureIndex === 0 && initialValue === void 0)
      previousValue = currentFeature;
    else previousValue = callback(previousValue, currentFeature, featureIndex);
  });
  return previousValue;
}
function coordAll(geojson) {
  var coords = [];
  coordEach(geojson, function(coord) {
    coords.push(coord);
  });
  return coords;
}
function geomEach(geojson, callback) {
  var i, j, g, geometry2, stopG, geometryMaybeCollection, isGeometryCollection, featureProperties, featureBBox, featureId, featureIndex = 0, isFeatureCollection = geojson.type === "FeatureCollection", isFeature = geojson.type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[i].geometry : isFeature ? geojson.geometry : geojson;
    featureProperties = isFeatureCollection ? geojson.features[i].properties : isFeature ? geojson.properties : {};
    featureBBox = isFeatureCollection ? geojson.features[i].bbox : isFeature ? geojson.bbox : void 0;
    featureId = isFeatureCollection ? geojson.features[i].id : isFeature ? geojson.id : void 0;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (g = 0; g < stopG; g++) {
      geometry2 = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection;
      if (geometry2 === null) {
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
      switch (geometry2.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (callback(
            geometry2,
            featureIndex,
            featureProperties,
            featureBBox,
            featureId
          ) === false)
            return false;
          break;
        }
        case "GeometryCollection": {
          for (j = 0; j < geometry2.geometries.length; j++) {
            if (callback(
              geometry2.geometries[j],
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
  geomEach(
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
function flattenEach(geojson, callback) {
  geomEach(geojson, function(geometry2, featureIndex, properties, bbox2, id) {
    var type = geometry2 === null ? null : geometry2.type;
    switch (type) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        if (callback(
          feature(geometry2, properties, { bbox: bbox2, id }),
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
    for (var multiFeatureIndex = 0; multiFeatureIndex < geometry2.coordinates.length; multiFeatureIndex++) {
      var coordinate = geometry2.coordinates[multiFeatureIndex];
      var geom = {
        type: geomType,
        coordinates: coordinate
      };
      if (callback(feature(geom, properties), featureIndex, multiFeatureIndex) === false)
        return false;
    }
  });
}
function flattenReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  flattenEach(
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
function lineEach(geojson, callback) {
  if (!geojson) throw new Error("geojson is required");
  flattenEach(geojson, function(feature2, featureIndex, multiFeatureIndex) {
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
            lineString(coords[geometryIndex], feature2.properties),
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
  if (!isObject(options)) throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var segmentIndex = options.segmentIndex || 0;
  var properties = options.properties;
  var geometry2;
  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry2 = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry2 = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry2 = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (geometry2 === null) return null;
  var coords = geometry2.coordinates;
  switch (geometry2.type) {
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
      if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
      return lineString(
        [coords[segmentIndex], coords[segmentIndex + 1]],
        properties,
        options
      );
    case "Polygon":
      if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
      return lineString(
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
      return lineString(
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
      return lineString(
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
  if (!isObject(options)) throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var coordIndex = options.coordIndex || 0;
  var properties = options.properties;
  var geometry2;
  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry2 = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry2 = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry2 = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (geometry2 === null) return null;
  var coords = geometry2.coordinates;
  switch (geometry2.type) {
    case "Point":
      return point(coords, properties, options);
    case "MultiPoint":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      return point(coords[multiFeatureIndex], properties, options);
    case "LineString":
      if (coordIndex < 0) coordIndex = coords.length + coordIndex;
      return point(coords[coordIndex], properties, options);
    case "Polygon":
      if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
      if (coordIndex < 0)
        coordIndex = coords[geometryIndex].length + coordIndex;
      return point(coords[geometryIndex][coordIndex], properties, options);
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (coordIndex < 0)
        coordIndex = coords[multiFeatureIndex].length + coordIndex;
      return point(coords[multiFeatureIndex][coordIndex], properties, options);
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (coordIndex < 0)
        coordIndex = coords[multiFeatureIndex][geometryIndex].length - coordIndex;
      return point(
        coords[multiFeatureIndex][geometryIndex][coordIndex],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}
const es$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  coordAll,
  coordEach,
  coordReduce,
  featureEach,
  featureReduce,
  findPoint,
  findSegment,
  flattenEach,
  flattenReduce,
  geomEach,
  geomReduce,
  lineEach,
  lineReduce,
  propEach,
  propReduce,
  segmentEach,
  segmentReduce
}, Symbol.toStringTag, { value: "Module" }));
function bbox(geojson) {
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
bbox["default"] = bbox;
const es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bbox
}, Symbol.toStringTag, { value: "Module" }));
const ICVI_ARITHMETIC_RANGES = [
  { min: 0, max: 0.2, label: "Very Low", rank: 1 },
  { min: 0.2, max: 0.4, label: "Low", rank: 2 },
  { min: 0.4, max: 0.6, label: "Moderate", rank: 3 },
  { min: 0.6, max: 0.8, label: "High", rank: 4 },
  { min: 0.8, max: 1, label: "Very High", rank: 5 }
];
const getCviCategory = (score, formula) => {
  if (score === void 0 || score === null || isNaN(score)) return "No Data";
  if (formula === "icvi-arithmetic") {
    const range = ICVI_ARITHMETIC_RANGES.find((r) => score >= r.min && (score < r.max || r.max === 1 && score <= r.max));
    return range ? range.label : "No Data";
  }
  if (formula === "icvi-geometric") {
    const range = ICVI_ARITHMETIC_RANGES.find((r) => score >= r.min && (score < r.max || r.max === 1 && score <= r.max));
    return range ? range.label : "No Data";
  }
  const rank = Math.round(score);
  if (rank <= 1) return "Very Low";
  if (rank === 2) return "Low";
  if (rank === 3) return "Moderate";
  if (rank === 4) return "High";
  if (rank >= 5) return "Very High";
  return "No Data";
};
const getCviRank = (score, formula) => {
  if (score === void 0 || score === null || isNaN(score)) return 0;
  if (formula === "icvi-arithmetic") {
    const range = ICVI_ARITHMETIC_RANGES.find((r) => score >= r.min && (score < r.max || r.max === 1 && score <= r.max));
    return range ? range.rank : 0;
  }
  if (formula === "icvi-geometric") {
    const range = ICVI_ARITHMETIC_RANGES.find((r) => score >= r.min && (score < r.max || r.max === 1 && score <= r.max));
    return range ? range.rank : 0;
  }
  return Math.round(score);
};
const getCviColor = (score, formula) => {
  if (score === void 0 || score === null || isNaN(score)) return "#808080";
  const rank = getCviRank(score, formula);
  if (rank <= 1) return "#1a9850";
  if (rank === 2) return "#91cf60";
  if (rank === 3) return "#fee08b";
  if (rank === 4) return "#fc8d59";
  if (rank >= 5) return "#d73027";
  return "#808080";
};
function getFeatureStyle(feature2, segments, parameters, selectedSegments, selectedParameterId, stylingMode = "parameter") {
  var _a, _b, _c, _d;
  const segmentId = (_a = feature2.properties) == null ? void 0 : _a.id;
  const isSelected = segmentId ? selectedSegments.includes(segmentId) : false;
  const cviScore = (_b = feature2.properties) == null ? void 0 : _b.vulnerabilityIndex;
  if (stylingMode === "cvi") {
    const formula = (_c = feature2.properties) == null ? void 0 : _c.vulnerabilityFormula;
    const color = getCviColor(cviScore, formula);
    return {
      color: isSelected ? "#0ea5e9" : color,
      weight: isSelected ? 5 : 3,
      opacity: isSelected ? 1 : 0.8,
      fillOpacity: isSelected ? 0.4 : 0.2
    };
  }
  const segmentData = segmentId ? segments.find((s) => s.id === segmentId) : null;
  const parameter = selectedParameterId ? parameters.find((p) => p.id === selectedParameterId) : null;
  if (!selectedParameterId || !parameter || !(segmentData == null ? void 0 : segmentData.parameters)) {
    return {
      color: isSelected ? "#FF4500" : "#3388ff",
      weight: isSelected ? 5 : 3,
      opacity: 1
    };
  }
  const paramValue = segmentData.parameters[selectedParameterId];
  if (!paramValue) {
    return {
      color: isSelected ? "#FF4500" : "#808080",
      weight: isSelected ? 5 : 2,
      opacity: isSelected ? 1 : 0.6,
      dashArray: "5,5"
    };
  }
  let valueColor = "#3388ff";
  const vulnerabilityScore = paramValue.vulnerability;
  if (parameter.type === "categorical" && parameter.options) {
    const option = parameter.options.find((o) => o.value === paramValue.value);
    valueColor = (option == null ? void 0 : option.color) || getCviColor(vulnerabilityScore, (_d = feature2.properties) == null ? void 0 : _d.vulnerabilityFormula);
  } else if (parameter.type === "numerical" && parameter.vulnerabilityRanges) {
    const range = parameter.vulnerabilityRanges.find((r) => r.value === vulnerabilityScore);
    valueColor = (range == null ? void 0 : range.color) || "#808080";
  }
  return {
    color: isSelected ? "#FF4500" : valueColor,
    weight: isSelected ? 5 : 3,
    opacity: 1
  };
}
const Map = ({
  segments,
  parameters,
  selectedSegments,
  selectedParameter,
  onSegmentSelect,
  onSelectionDelete,
  onAreaSelect,
  isEditing,
  initialBounds,
  geoJSON,
  zoomToFeatureId,
  stylingMode = "parameter"
}) => {
  const mapRef = reactExports.useRef(null);
  const drawControlRef = reactExports.useRef(null);
  const segmentsLayerRef = reactExports.useRef(null);
  const drawnItemsRef = reactExports.useRef(null);
  const [isMapInitialized, setIsMapInitialized] = reactExports.useState(false);
  const handleSegmentClick = reactExports.useCallback((feature2, layer) => {
    if (feature2.properties && feature2.properties.id) {
      const segmentId = feature2.properties.id;
      console.log("Map: Segment clicked:", segmentId);
      onSegmentSelect(segmentId);
      if (mapRef.current && layer instanceof L.Path) {
        const props = feature2.properties || {};
        let popupContent = `<b>Segment ID:</b> ${props.id}`;
        if (props.cviScore !== void 0) {
          popupContent += `<br/><b>CVI Score:</b> ${props.cviScore.toFixed(2)}`;
          popupContent += `<br/><b>Category:</b> ${props.cviCategory}`;
        }
        if (props.length !== void 0) {
          popupContent += `<br/><b>Length:</b> ${props.length.toFixed(2)}m`;
        }
        layer.bindPopup(popupContent).openPopup();
      }
    }
  }, [onSegmentSelect]);
  reactExports.useEffect(() => {
    console.log("Map Effect 1: Initializing map instance...");
    if (mapRef.current || typeof window === "undefined") return;
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      console.error("Map container 'map' not found");
      return;
    }
    if (mapContainer._leaflet_id) {
      console.warn("Map container already had a Leaflet ID. Clearing it.");
      mapContainer._leaflet_id = null;
    }
    try {
      const mapInstance = L.map("map", {
        center: [20, 0],
        zoom: 2,
        zoomControl: true
      });
      mapRef.current = mapInstance;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);
      const drawnItemsInstance = new L.FeatureGroup();
      mapInstance.addLayer(drawnItemsInstance);
      drawnItemsRef.current = drawnItemsInstance;
      setIsMapInitialized(true);
      console.log("Map Effect 1: Map instance created.");
    } catch (error) {
      console.error("Map Effect 1: Error initializing map:", error);
    }
    return () => {
      console.log("Map Effect 1: Cleaning up map instance.");
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      drawnItemsRef.current = null;
      segmentsLayerRef.current = null;
      setIsMapInitialized(false);
    };
  }, []);
  reactExports.useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !isMapInitialized) {
      console.log("Map Effect 2: Skipping data layer update (map not ready).");
      return;
    }
    if (segmentsLayerRef.current) {
      mapInstance.removeLayer(segmentsLayerRef.current);
      segmentsLayerRef.current = null;
      console.log("Map Effect 2: Removed existing segments layer.");
    }
    if (geoJSON && geoJSON.features && geoJSON.features.length > 0) {
      console.log(`Map Effect 2: Creating GeoJSON layer with ${geoJSON.features.length} features (Styling: ${stylingMode}).`);
      const segmentsLayer = L.geoJSON(geoJSON, {
        style: (feature2) => {
          if (!feature2) return { color: "#808080", weight: 1 };
          return getFeatureStyle(
            feature2,
            segments,
            parameters,
            selectedSegments,
            selectedParameter,
            stylingMode
          );
        },
        onEachFeature: (feature2, layer) => {
          layer.on({
            mouseover: (e) => {
              var _a;
              const targetLayer = e.target;
              const segmentId = (_a = feature2.properties) == null ? void 0 : _a.id;
              if (segmentId && !selectedSegments.includes(segmentId)) {
                if (targetLayer instanceof L.Path) {
                  targetLayer.setStyle({ weight: 5 });
                  targetLayer.bringToFront();
                }
              }
            },
            mouseout: (e) => {
              var _a;
              const targetLayer = e.target;
              const segmentId = (_a = feature2.properties) == null ? void 0 : _a.id;
              if (segmentId && !selectedSegments.includes(segmentId)) {
                if (segmentsLayerRef.current && targetLayer instanceof L.Path) {
                  segmentsLayerRef.current.resetStyle(targetLayer);
                }
              }
            },
            click: () => handleSegmentClick(feature2, layer)
          });
          const props = feature2.properties || {};
          let tooltipContent = `ID: ${props.id}`;
          if (props.cviScore !== void 0) tooltipContent += ` | CVI: ${props.cviScore.toFixed(2)}`;
          layer.bindTooltip(tooltipContent, { sticky: true });
        }
      }).addTo(mapInstance);
      segmentsLayerRef.current = segmentsLayer;
      console.log("Map Effect 2: Added new segments layer.");
    } else {
      console.log("Map Effect 2: No features in geoJSON to display.");
    }
  }, [geoJSON, segments, parameters, selectedSegments, selectedParameter, stylingMode, handleSegmentClick, isMapInitialized]);
  reactExports.useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !isMapInitialized) {
      console.log("Map Effect 3: Skipping bounds fitting (map not ready).");
      return;
    }
    if (zoomToFeatureId && segmentsLayerRef.current) {
      console.log("Map Effect 3: Skipping general bounds fitting because zoomToFeatureId is active.");
      return;
    }
    let targetBounds = null;
    if (initialBounds) {
      try {
        const bounds = initialBounds instanceof L.LatLngBounds ? initialBounds : L.latLngBounds(initialBounds);
        if (bounds.isValid()) {
          targetBounds = bounds;
          console.log("Map Effect 3: Using provided initialBounds", targetBounds.toBBoxString());
        } else {
          console.warn("Map Effect 3: Provided initialBounds are invalid.");
        }
      } catch (e) {
        console.error("Map Effect 3: Error processing provided initialBounds:", e);
      }
    }
    if (!targetBounds && geoJSON && geoJSON.features && geoJSON.features.length > 0) {
      console.log("Map Effect 3: Calculating bounds from geoJSON data.");
      try {
        const validFeatures = geoJSON.features.filter((f) => f && f.geometry);
        if (validFeatures.length > 0) {
          const featureCollection$1 = featureCollection(validFeatures);
          const bbox$1 = bbox(featureCollection$1);
          if (bbox$1 && bbox$1.length === 4 && bbox$1.every((b) => isFinite(b)) && bbox$1[0] <= bbox$1[2] && bbox$1[1] <= bbox$1[3]) {
            targetBounds = L.latLngBounds([
              [bbox$1[1], bbox$1[0]],
              [bbox$1[3], bbox$1[2]]
            ]);
            console.log("Map Effect 3: Calculated bounds from geoJSON", targetBounds.toBBoxString());
          } else {
            console.warn("Map Effect 3: Calculated bbox is invalid.", bbox$1);
          }
        } else {
          console.log("Map Effect 3: No valid features found in geoJSON for bounds calculation.");
        }
      } catch (e) {
        console.error("Map Effect 3: Error calculating bounds from geoJSON:", e);
      }
    }
    if (targetBounds && targetBounds.isValid()) {
      console.log("Map Effect 3: Fitting map to bounds:", targetBounds.toBBoxString());
      setTimeout(() => {
        mapInstance.fitBounds(targetBounds, { padding: [50, 50], maxZoom: 18 });
      }, 100);
    } else if (!initialBounds) {
      console.warn("Map Effect 3: No valid bounds found to fit. Resetting to default view.");
      mapInstance.setView([20, 0], 2);
    }
  }, [geoJSON, initialBounds, isMapInitialized, zoomToFeatureId]);
  reactExports.useEffect(() => {
    const mapInstance = mapRef.current;
    const segmentsLayer = segmentsLayerRef.current;
    if (!mapInstance || !segmentsLayer || !zoomToFeatureId || !isMapInitialized) {
      return;
    }
    console.log(`Map Effect 4: Attempting to zoom to feature ID: ${zoomToFeatureId}`);
    let foundLayer = null;
    segmentsLayer.eachLayer((layer) => {
      var _a;
      const feature2 = layer.feature;
      if (((_a = feature2 == null ? void 0 : feature2.properties) == null ? void 0 : _a.id) === zoomToFeatureId) {
        foundLayer = layer;
      }
    });
    if (foundLayer && typeof foundLayer.getBounds === "function") {
      const bounds = foundLayer.getBounds();
      if (bounds.isValid()) {
        console.log(`Map Effect 4: Found feature ${zoomToFeatureId}, flying to bounds:`, bounds.toBBoxString());
        mapInstance.flyToBounds(bounds, { padding: [100, 100], maxZoom: 18, duration: 1 });
      } else {
        console.warn(`Map Effect 4: Feature ${zoomToFeatureId} found, but its bounds are invalid.`);
      }
    } else {
      console.warn(`Map Effect 4: Feature with ID ${zoomToFeatureId} not found in the segments layer or has no bounds.`);
    }
  }, [zoomToFeatureId, isMapInitialized]);
  reactExports.useEffect(() => {
    const mapInstance = mapRef.current;
    const drawnItemsInstance = drawnItemsRef.current;
    if (!mapInstance || !drawnItemsInstance || !isMapInitialized) {
      console.log("Map Effect 5: Skipping draw control setup (map not ready).");
      return;
    }
    console.log(`Map Effect 5: Setting up draw controls (isEditing: ${isEditing}).`);
    if (drawControlRef.current) {
      console.log("Map Effect 5: Removing previous draw control.");
      try {
        mapInstance.removeControl(drawControlRef.current);
      } catch (e) {
        console.warn("Minor error removing old draw control", e);
      }
      drawControlRef.current = null;
    }
    mapInstance.off(L.Draw.Event.CREATED);
    mapInstance.off(L.Draw.Event.DELETED);
    mapInstance.off(L.Draw.Event.DRAWSTART);
    mapInstance.off(L.Draw.Event.DRAWSTOP);
    if (isEditing) {
      console.log("Map Effect 5: Adding Leaflet Draw controls.");
      const drawControlInstance = new L.Control.Draw({
        draw: {
          polyline: false,
          rectangle: false,
          circle: false,
          circlemarker: false,
          marker: false,
          polygon: {
            allowIntersection: false,
            showArea: false,
            shapeOptions: { color: "#007bff", weight: 2, opacity: 0.7, fillOpacity: 0.1 }
          }
        },
        edit: {
          featureGroup: drawnItemsInstance,
          remove: true
        }
      });
      mapInstance.addControl(drawControlInstance);
      drawControlRef.current = drawControlInstance;
      mapInstance.on(L.Draw.Event.DRAWSTART, (e) => {
        console.log(`Draw Event: START (${e.layerType})`);
        drawnItemsInstance.clearLayers();
      });
      mapInstance.on(L.Draw.Event.CREATED, (e) => {
        const layer = e.layer;
        const type = e.layerType;
        console.log(`Draw Event: CREATED (${type})`);
        if (type === "polygon") {
          try {
            const layerWithGeoJSON = layer;
            if (typeof layerWithGeoJSON.toGeoJSON === "function") {
              const feature2 = layerWithGeoJSON.toGeoJSON();
              if (feature2.geometry && feature2.geometry.type === "Polygon") {
                const geoJsonGeom = feature2.geometry;
                console.log("Map: Passing geometry to onAreaSelect:", JSON.stringify(geoJsonGeom));
                onAreaSelect(geoJsonGeom);
                setTimeout(() => {
                  try {
                    if (mapInstance.hasLayer(layer)) {
                      mapInstance.removeLayer(layer);
                      console.log("Map: Removed temporary drawing layer after CREATED event.");
                    }
                  } catch (removeError) {
                    console.warn("Map: Error removing temporary drawing layer:", removeError);
                  }
                }, 0);
              } else {
                console.error("Map: Created layer is not a valid Polygon GeoJSON", feature2);
              }
            } else {
              console.error("Map: Created layer does not have toGeoJSON method.");
            }
          } catch (error) {
            console.error("Map: Error processing created geometry:", error);
          }
        } else {
          setTimeout(() => mapInstance.removeLayer(layer), 0);
        }
      });
      mapInstance.on(L.Draw.Event.DELETED, () => {
        console.log("Draw Event: DELETED (Selection shape removed by user)");
      });
      mapInstance.on(L.Draw.Event.DRAWSTOP, () => {
        console.log(`Draw Event: STOP`);
      });
    } else {
      console.log("Map Effect 5: Editing disabled, draw controls not added.");
    }
    return () => {
      console.log("Map Effect 5: Cleaning up draw controls and listeners.");
      if (mapRef.current && drawControlRef.current) {
        try {
          mapRef.current.removeControl(drawControlRef.current);
        } catch (e) {
          console.warn("Minor error removing draw control on effect cleanup", e);
        }
        drawControlRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.off(L.Draw.Event.CREATED);
        mapRef.current.off(L.Draw.Event.DELETED);
        mapRef.current.off(L.Draw.Event.DRAWSTART);
        mapRef.current.off(L.Draw.Event.DRAWSTOP);
      }
    };
  }, [isEditing, onAreaSelect, onSelectionDelete, isMapInitialized]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "map", style: { height: "100%", width: "100%", minHeight: "400px" } });
};
Map.displayName = "MapComponent";
export {
  Map as M,
  lineString as a,
  bbox as b,
  featureCollection as c,
  degreesToRadians as d,
  flattenEach as e,
  feature as f,
  es$2 as g,
  es$1 as h,
  isObject as i,
  es as j,
  featureEach as k,
  lengthToRadians as l,
  multiLineString as m,
  getCviCategory as n,
  getCviRank as o,
  point as p,
  polygon as q,
  radiansToDegrees as r,
  radiansToLength as s,
  segmentReduce as t
};
//# sourceMappingURL=Map-BbJe1dQz.js.map
