import { c as commonjsGlobal, a as getAugmentedNamespace, g as getDefaultExportFromCjs, j as jsxRuntimeExports, r as reactExports, u as useNavigate } from "./index-DZm5JGOi.js";
import { e as flattenEach, c as featureCollection$1, a as lineString, g as es, h as es$1, j as es$2, f as feature, k as featureEach$1, p as point, m as multiLineString, M as Map, n as getCviCategory, o as getCviRank, b as bbox$1, q as polygon } from "./Map-VYnvIQGB.js";
import { i as indexedDBService } from "./indexedDBService-C5arrTvJ.js";
import { a as availableFormulas } from "./formulas-CWbHTCK9.js";
import { g as getCoord, a as getGeom, b as getCoords, l as length } from "./index-rbXMtUc0.js";
import { E as ErrorAlert } from "./ErrorAlert-BTuCIGUH.js";
import "./leaflet-src-CgZKRiRt.js";
import "./leaflet.draw-DHK4e1PG.js";
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
function lineSegment(geojson) {
  if (!geojson) {
    throw new Error("geojson is required");
  }
  var results = [];
  flattenEach(geojson, function(feature2) {
    lineSegmentFeature(feature2, results);
  });
  return featureCollection$1(results);
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
var geojsonRbush$1 = { exports: {} };
var rbush_min = { exports: {} };
(function(module, exports) {
  !function(t, i) {
    module.exports = i();
  }(commonjsGlobal, function() {
    function t(t2, r2, e2, a2, h2) {
      !function t3(n2, r3, e3, a3, h3) {
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
      }(t2, r2, e2 || 0, a2 || t2.length - 1, h2 || n);
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
})(rbush_min);
var rbush_minExports = rbush_min.exports;
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(es);
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(es$1);
const require$$3 = /* @__PURE__ */ getAugmentedNamespace(es$2);
var rbush = rbush_minExports;
var helpers = require$$1;
var meta = require$$2;
var turfBBox = require$$3.default;
var featureEach = meta.featureEach;
meta.coordEach;
helpers.polygon;
var featureCollection = helpers.featureCollection;
function geojsonRbush(maxEntries) {
  var tree = new rbush(maxEntries);
  tree.insert = function(feature2) {
    if (feature2.type !== "Feature") throw new Error("invalid feature");
    feature2.bbox = feature2.bbox ? feature2.bbox : turfBBox(feature2);
    return rbush.prototype.insert.call(this, feature2);
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
      featureEach(features, function(feature2) {
        if (feature2.type !== "Feature") throw new Error("invalid features");
        feature2.bbox = feature2.bbox ? feature2.bbox : turfBBox(feature2);
        load.push(feature2);
      });
    }
    return rbush.prototype.load.call(this, load);
  };
  tree.remove = function(feature2, equals) {
    if (feature2.type !== "Feature") throw new Error("invalid feature");
    feature2.bbox = feature2.bbox ? feature2.bbox : turfBBox(feature2);
    return rbush.prototype.remove.call(this, feature2, equals);
  };
  tree.clear = function() {
    return rbush.prototype.clear.call(this);
  };
  tree.search = function(geojson) {
    var features = rbush.prototype.search.call(this, this.toBBox(geojson));
    return featureCollection(features);
  };
  tree.collides = function(geojson) {
    return rbush.prototype.collides.call(this, this.toBBox(geojson));
  };
  tree.all = function() {
    var features = rbush.prototype.all.call(this);
    return featureCollection(features);
  };
  tree.toJSON = function() {
    return rbush.prototype.toJSON.call(this);
  };
  tree.fromJSON = function(json) {
    return rbush.prototype.fromJSON.call(this, json);
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
geojsonRbush$1.exports = geojsonRbush;
geojsonRbush$1.exports.default = geojsonRbush;
var geojsonRbushExports = geojsonRbush$1.exports;
const rbush$1 = /* @__PURE__ */ getDefaultExportFromCjs(geojsonRbushExports);
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
    return featureCollection$1(results);
  }
  var tree = rbush$1();
  tree.load(lineSegment(line2));
  featureEach$1(lineSegment(line1), function(segment) {
    featureEach$1(tree.search(segment), function(match) {
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
  return featureCollection$1(results);
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
  return featureCollection$1(lines);
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
const MapInteractionPanel = ({
  segments,
  parameters,
  selectedSegmentIds,
  selectedParameterId,
  selectionPolygons,
  onSegmentSelect,
  onSelectionDelete,
  onAreaSelect,
  initialBounds,
  geoJSON,
  onSelectAll,
  onClearSelection,
  mapContainerRef,
  isReadOnly = false
  // Default to false if not provided
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-lg shadow h-full flex flex-col", children: [
    !isReadOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 flex-shrink-0 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onSelectAll,
            className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap",
            title: "Select all visible segments",
            disabled: segments.length === 0,
            children: "Select All"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClearSelection,
            className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap",
            title: "Deselect all segments",
            disabled: selectedSegmentIds.length === 0,
            children: "Clear Selection"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 hidden sm:block", children: "Use drawing tools (polygon/rectangle) on map to select segments by area." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow border rounded overflow-hidden", ref: mapContainerRef, children: segments.length > 0 && geoJSON ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Map,
      {
        segments,
        parameters,
        geoJSON,
        selectedSegments: selectedSegmentIds,
        selectedParameter: selectedParameterId,
        selectionPolygons,
        onSegmentSelect: !isReadOnly ? onSegmentSelect : () => {
        },
        onSelectionDelete: !isReadOnly ? onSelectionDelete : () => {
        },
        onAreaSelect: !isReadOnly ? onAreaSelect : () => {
        },
        isEditing: !isReadOnly,
        initialBounds
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center bg-gray-50 text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: segments.length === 0 ? "No shoreline segments loaded." : "Loading shoreline data..." }) }) })
  ] });
};
const ParameterValuePanel = ({
  parameters,
  activeParameter,
  onParameterSelect,
  selectedValue,
  selectedVulnerability,
  onValueSelect,
  onApplyValue,
  selectedSegmentIds
}) => {
  const parameterOptions = reactExports.useMemo(() => {
    if (!activeParameter) return [];
    if (activeParameter.type === "categorical" && activeParameter.options) {
      const options = activeParameter.options.map((option) => ({
        label: option.label,
        value: typeof option.value === "string" ? option.value : String(option.value),
        vulnerability: option.vulnerability
      }));
      const valuesSeen = {};
      options.forEach((option) => {
        if (valuesSeen[option.value]) console.warn(`Duplicate option value detected for ${activeParameter.name}: ${option.value}`);
        valuesSeen[option.value] = true;
      });
      return options;
    } else if (activeParameter.vulnerabilityRanges) {
      const rangesToUse = activeParameter.indexSpecificRankingTable || activeParameter.vulnerabilityRanges;
      const optionsFromRanges = [];
      rangesToUse.forEach((range) => {
        let rangeLabel = `${range.label}`;
        if (range.criteria) {
          rangeLabel += ` - ${range.criteria}`;
        } else if (range.min !== null && range.max !== null) {
          rangeLabel += ` (${range.min} - ${range.max}${activeParameter.unit || ""})`;
        } else if (range.min !== null) {
          rangeLabel += ` (>= ${range.min}${activeParameter.unit || ""})`;
        } else if (range.max !== null) {
          rangeLabel += ` (< ${range.max}${activeParameter.unit || ""})`;
        }
        optionsFromRanges.push({
          label: rangeLabel,
          value: range.value.toString(),
          vulnerability: range.value
        });
      });
      optionsFromRanges.sort((a, b) => a.vulnerability - b.vulnerability);
      return optionsFromRanges;
    } else if (activeParameter.type === "numerical") {
      console.warn(`Numerical parameter "${activeParameter.name}" has no vulnerabilityRanges defined. Using generic 1-5 scale.`);
      const vulnLabels = ["Very Low", "Low", "Moderate", "High", "Very High"];
      return [1, 2, 3, 4, 5].map((i) => ({
        label: `${vulnLabels[i - 1]} (Score: ${i})`,
        value: i.toString(),
        vulnerability: i
      }));
    }
    return [];
  }, [activeParameter]);
  const handleValueChange = (event) => {
    const selectedOptionValue = event.target.value;
    const selectedOption = parameterOptions.find((opt) => opt.value === selectedOptionValue);
    if (selectedOption) {
      onValueSelect(selectedOption.value, selectedOption.vulnerability);
    } else {
      onValueSelect(null, 1);
    }
  };
  const applyButtonText = reactExports.useMemo(() => {
    if (!activeParameter) return "Select a Parameter First";
    if (selectedValue === null) return "Select a Value First";
    if (selectedSegmentIds.length === 0) return "Select Segments First";
    return `Apply ${activeParameter.name}: ${selectedValue} to ${selectedSegmentIds.length} Segments`;
  }, [activeParameter, selectedValue, selectedSegmentIds]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-4", children: "Parameter Values" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4 text-sm text-gray-600", children: [
      selectedSegmentIds.length,
      " selected"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "parameter-select", className: "block text-sm font-medium text-gray-700 mb-2", children: "Select Parameter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "parameter-select",
          value: (activeParameter == null ? void 0 : activeParameter.id) || "",
          onChange: (e) => onParameterSelect(e.target.value),
          className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
          children: parameters.length > 0 ? parameters.map((param) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: param.id, children: param.name }, param.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "No parameters available" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "value-select", className: "block text-sm font-medium text-gray-700 mb-2", children: [
        "Select Value ",
        activeParameter && `for ${activeParameter.name}`
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          id: "value-select",
          value: selectedValue || "",
          onChange: handleValueChange,
          className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
          disabled: !activeParameter || selectedSegmentIds.length === 0,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a value..." }),
            parameterOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: option.value, children: [
              option.label,
              " (Vulnerability: ",
              option.vulnerability,
              ")"
            ] }, option.value)),
            parameterOptions.length === 0 && activeParameter && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "No values available" })
          ]
        }
      ),
      (!activeParameter || selectedSegmentIds.length === 0) && selectedValue === null && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-red-500", children: !activeParameter ? "Select a parameter first" : "Select segments on the map first" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Vulnerability Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 text-gray-600", children: "Value:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selectedValue || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-4 text-gray-600", children: "Vulnerability:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "inline-block w-6 h-6 rounded-full text-white text-center flex items-center justify-center text-xs font-medium",
            style: {
              backgroundColor: (() => {
                if (selectedVulnerability >= 0 && selectedVulnerability < 1) {
                  if (selectedVulnerability < 0.2) return "#1a9850";
                  if (selectedVulnerability < 0.4) return "#91cf60";
                  if (selectedVulnerability < 0.6) return "#fee08b";
                  if (selectedVulnerability < 0.8) return "#fc8d59";
                  return "#d73027";
                }
                const rank = Math.round(selectedVulnerability);
                switch (rank) {
                  case 1:
                    return "#1a9850";
                  case 2:
                    return "#91cf60";
                  case 3:
                    return "#fee08b";
                  case 4:
                    return "#fc8d59";
                  case 5:
                    return "#d73027";
                  default:
                    return "#808080";
                }
              })()
            },
            children: selectedVulnerability || "?"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onApplyValue,
        disabled: !activeParameter || selectedValue === null || selectedSegmentIds.length === 0,
        className: "w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed",
        children: applyButtonText
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-600", children: selectedSegmentIds.length > 0 ? `${selectedSegmentIds.length} segments selected` : "No segments selected. Click on the map or use Select All" }) })
  ] });
};
const CviFormulaPanel = ({
  selectedFormula,
  onCalculateCvi,
  completionPercentage,
  calculatingCvi,
  cviScores,
  segments
}) => {
  const cviStatistics = reactExports.useMemo(() => {
    const scores = Object.values(cviScores);
    if (scores.length === 0) return null;
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;
    let veryLowCount = 0;
    let lowCount = 0;
    let moderateCount = 0;
    let highCount = 0;
    let veryHighCount = 0;
    scores.forEach((score) => {
      const category = getCviCategory(score, selectedFormula == null ? void 0 : selectedFormula.type);
      if (category === "Very Low") veryLowCount++;
      else if (category === "Low") lowCount++;
      else if (category === "Moderate") moderateCount++;
      else if (category === "High") highCount++;
      else if (category === "Very High") veryHighCount++;
    });
    return {
      min: min.toFixed(2),
      max: max.toFixed(2),
      avg: avg.toFixed(2),
      count: scores.length,
      categories: {
        veryLow: veryLowCount,
        low: lowCount,
        moderate: moderateCount,
        high: highCount,
        veryHigh: veryHighCount
      }
    };
  }, [cviScores, selectedFormula]);
  const canCalculate = reactExports.useMemo(() => {
    return completionPercentage >= 100 && selectedFormula !== null && !calculatingCvi;
  }, [completionPercentage, selectedFormula, calculatingCvi]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-4", children: "CVI Calculation" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Index Formula" }),
      selectedFormula ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-900", children: selectedFormula.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full", children: "Auto-selected" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-700 mb-2", children: selectedFormula.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600", children: "✓ Formula automatically determined by your selected coastal vulnerability index" }),
        selectedFormula.name === "CVI" && selectedFormula.type === "geometric-mean" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 p-2 bg-amber-50 border border-amber-200 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Note:" }),
          " Geometric mean formula preferred over traditional CVI formula to avoid distribution distortions and enable proper ranking of results."
        ] }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "No Formula Selected" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600", children: "Please select a coastal vulnerability index in the parameter selection step to automatically set the appropriate formula." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onCalculateCvi,
          disabled: !canCalculate,
          className: "w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: `h-5 w-5 mr-2 ${calculatingCvi ? "animate-spin" : ""}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: calculatingCvi ? (
              // Spinner path (simplified)
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" })
            ) : (
              // Calculator icon path
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 7h6m0 10v-6m-6 2h6m-6-4h6M9 3a1 1 0 011-1h4a1 1 0 011 1v1H9V3zM15 21a2 2 0 01-2 2H11a2 2 0 01-2-2m4-18a2 2 0 00-2-2H11a2 2 0 00-2 2m4 18V7m-4 14V7" })
            ) }),
            calculatingCvi ? "Calculating..." : `Calculate CVI ${selectedFormula ? `(${selectedFormula.name})` : ""}`
          ]
        }
      ),
      !selectedFormula && completionPercentage >= 100 && !calculatingCvi && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-red-600", children: "Please select a formula before calculating." }),
      completionPercentage < 100 && !calculatingCvi && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-amber-600", children: [
        "Complete all parameter values (",
        completionPercentage.toFixed(0),
        "%) before calculating CVI."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-gray-700", children: "Calculation Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 text-gray-600 w-28 flex-shrink-0", children: "Selected Formula:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: (selectedFormula == null ? void 0 : selectedFormula.name) || "None Selected" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 text-gray-600 w-28 flex-shrink-0", children: "Segments w/ CVI:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: Object.keys(cviScores).length }),
        segments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs text-gray-500", children: [
          "(",
          Math.round(Object.keys(cviScores).length / segments.length * 100),
          "% of ",
          segments.length,
          ")"
        ] })
      ] })
    ] }),
    Object.keys(cviScores).length > 0 && cviStatistics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "CVI Score Categories & Stats" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap space-x-4 mb-3", children: [
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs whitespace-nowrap", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 bg-green-600 rounded-full mr-1.5 border border-green-700 flex-shrink-0" }),
          "Very Low ",
          `(1)`,
          " [",
          cviStatistics.categories.veryLow,
          "]"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs whitespace-nowrap", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 bg-lime-500 rounded-full mr-1.5 border border-lime-600 flex-shrink-0" }),
          "Low ",
          `(2)`,
          " [",
          cviStatistics.categories.low,
          "]"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs whitespace-nowrap", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 bg-yellow-400 rounded-full mr-1.5 border border-yellow-500 flex-shrink-0" }),
          "Moderate ",
          `(3)`,
          " [",
          cviStatistics.categories.moderate,
          "]"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs whitespace-nowrap", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 bg-orange-500 rounded-full mr-1.5 border border-orange-600 flex-shrink-0" }),
          "High ",
          `(4)`,
          " [",
          cviStatistics.categories.high,
          "]"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs whitespace-nowrap", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 bg-red-600 rounded-full mr-1.5 border border-red-700 flex-shrink-0" }),
          "Very High ",
          `(5)`,
          " [",
          cviStatistics.categories.veryHigh,
          "]"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-600 grid grid-cols-3 gap-x-2 gap-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Min: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800", children: cviStatistics.min })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Max: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800", children: cviStatistics.max })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Avg: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800", children: cviStatistics.avg })
        ] })
      ] })
    ] })
  ] });
};
const SEGMENTS_PER_PAGE = 10;
const SegmentTablePanel = ({
  segments,
  parameters: enabledParameters,
  selectedSegmentIds,
  onSegmentSelect,
  cviScores,
  selectedFormula,
  cviStatistics
}) => {
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const sortedSegments = reactExports.useMemo(() => {
    const segmentsCopy = [...segments];
    const compareSegmentIds = (idA, idB) => {
      const numA = parseInt(idA.split("-")[1] || "0", 10);
      const numB = parseInt(idB.split("-")[1] || "0", 10);
      return numA - numB;
    };
    segmentsCopy.sort((a, b) => {
      const isSelectedA = selectedSegmentIds.includes(a.id);
      const isSelectedB = selectedSegmentIds.includes(b.id);
      if (isSelectedA !== isSelectedB) {
        return isSelectedA ? -1 : 1;
      }
      return compareSegmentIds(a.id, b.id);
    });
    return segmentsCopy;
  }, [segments, selectedSegmentIds]);
  const paginatedSegments = reactExports.useMemo(() => {
    const startIndex = (currentPage - 1) * SEGMENTS_PER_PAGE;
    return sortedSegments.slice(startIndex, startIndex + SEGMENTS_PER_PAGE);
  }, [sortedSegments, currentPage]);
  const totalPages = Math.ceil(sortedSegments.length / SEGMENTS_PER_PAGE);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const getDisplayId = (segmentId) => {
    return segmentId.includes("segment-") ? segmentId.split("-")[1] : segmentId;
  };
  const getVulnerabilityColor = (vulnerability) => {
    if (vulnerability === null || vulnerability === void 0) return "#808080";
    if (vulnerability >= 0 && vulnerability < 1) {
      if (vulnerability < 0.2) return "#1a9850";
      if (vulnerability < 0.4) return "#91cf60";
      if (vulnerability < 0.6) return "#fee08b";
      if (vulnerability < 0.8) return "#fc8d59";
      return "#d73027";
    }
    const rank = Math.round(vulnerability);
    switch (rank) {
      case 1:
        return "#1a9850";
      case 2:
        return "#91cf60";
      case 3:
        return "#fee08b";
      case 4:
        return "#fc8d59";
      case 5:
        return "#d73027";
      default:
        return "#808080";
    }
  };
  const getCviColor = (score, formula) => {
    if (score === null || score === void 0 || isNaN(score)) return "#808080";
    const rank = getCviRank(score, formula);
    if (rank <= 1) return "#1a9850";
    if (rank === 2) return "#91cf60";
    if (rank === 3) return "#fee08b";
    if (rank === 4) return "#fc8d59";
    if (rank >= 5) return "#d73027";
    return "#808080";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-4", children: "Segment Values" }),
    selectedFormula && cviStatistics && Object.keys(cviScores).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800 mr-2", children: "CVI Calculation:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-700", children: selectedFormula.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-blue-600", children: selectedFormula.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid grid-cols-3 gap-x-4 gap-y-1 text-sm", children: [
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: "Segments:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-blue-800", children: [
            cviStatistics.count,
            " of ",
            segments.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: "Range:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-blue-800", children: [
            cviStatistics.min,
            " - ",
            cviStatistics.max
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: "Average:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800", children: cviStatistics.avg })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3 pt-1 border-t border-blue-100 mt-1 text-xs", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: "Counts:" }),
          " Very Low: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800", children: cviStatistics.categories.veryLow }),
          ", Low: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800", children: cviStatistics.categories.low }),
          ", Moderate: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800", children: cviStatistics.categories.moderate }),
          ", High: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800", children: cviStatistics.categories.high }),
          ", Very High: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800", children: cviStatistics.categories.veryHigh })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full table-auto divide-y divide-gray-200 min-w-max", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[60px]", children: "ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]", children: "Length (m)" }),
          enabledParameters.map((param) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]", title: param.name, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center leading-tight break-words max-w-[90px]", children: param.name }) }) }, param.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CVI" }),
            selectedFormula && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-500 text-xs normal-case", title: selectedFormula.name, children: [
              "(",
              selectedFormula.name.length > 15 ? selectedFormula.name.substring(0, 12) + "..." : selectedFormula.name,
              ")"
            ] })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "bg-white divide-y divide-gray-200", children: [
          paginatedSegments.map((segment, index) => {
            var _a, _b;
            const displayId = getDisplayId(segment.id);
            const isSelected = selectedSegmentIds.includes(segment.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `${isSelected ? "bg-blue-50 font-medium" : index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-100 transition-colors duration-150`,
                onClick: () => onSegmentSelect(segment.id),
                style: { cursor: "pointer" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap text-xs text-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: isSelected,
                        onChange: (e) => {
                          e.stopPropagation();
                          onSegmentSelect(segment.id);
                        },
                        className: "mr-2 h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500",
                        "aria-label": `Select segment ${displayId}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: displayId })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap text-xs text-gray-900", children: typeof ((_a = segment.properties) == null ? void 0 : _a.length) === "number" ? segment.properties.length.toFixed(0) : "N/A" }),
                  enabledParameters.map((param) => {
                    var _a2;
                    const paramValue = (_a2 = segment.parameters) == null ? void 0 : _a2[param.id];
                    const vulnerability = (paramValue == null ? void 0 : paramValue.vulnerability) ?? null;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2 whitespace-nowrap text-xs text-center", children: vulnerability !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", title: `Value: ${(paramValue == null ? void 0 : paramValue.value) ?? "N/A"}, Vulnerability: ${vulnerability}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        title: `Vulnerability: ${vulnerability}`,
                        className: "inline-block w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium",
                        style: { backgroundColor: getVulnerabilityColor(vulnerability) },
                        children: vulnerability
                      }
                    ) }) : "-" }, param.id);
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap text-xs text-gray-900 text-center", children: cviScores[segment.id] !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      title: `CVI Score: ${cviScores[segment.id].toFixed(2)} (${getCviCategory(cviScores[segment.id], segment.properties.vulnerabilityFormula)})`,
                      className: "inline-block w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-medium",
                      style: { backgroundColor: getCviColor(cviScores[segment.id], segment.properties.vulnerabilityFormula) },
                      children: ((_b = segment.properties.vulnerabilityFormula) == null ? void 0 : _b.includes("icvi")) ? cviScores[segment.id].toFixed(2) : getCviRank(cviScores[segment.id], segment.properties.vulnerabilityFormula)
                    }
                  ) : "-" })
                ]
              },
              segment.id
            );
          }),
          paginatedSegments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: enabledParameters.length + 3, className: "px-2 py-4 text-center text-xs text-gray-500", children: "No segments to display for the current page." }) })
        ] })
      ] })
    ] }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between border-t pt-3", children: [
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-500 text-sm", children: [
        "Showing ",
        (currentPage - 1) * SEGMENTS_PER_PAGE + 1,
        " to ",
        Math.min(currentPage * SEGMENTS_PER_PAGE, sortedSegments.length),
        " of ",
        sortedSegments.length,
        " segments"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-1 sm:space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handlePageChange(currentPage - 1),
            disabled: currentPage === 1,
            className: "px-3 py-1 border border-gray-300 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50",
            "aria-label": "Previous page",
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs p-1 text-gray-700", children: [
          " ",
          "Page ",
          currentPage,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handlePageChange(currentPage + 1),
            disabled: currentPage === totalPages,
            className: "px-3 py-1 border border-gray-300 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50",
            "aria-label": "Next page",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
};
const useParameterAssignmentData = () => {
  const navigate = useNavigate();
  const [segments, setSegments] = reactExports.useState([]);
  const [parameters, setParameters] = reactExports.useState([]);
  const [mapBounds, setMapBounds] = reactExports.useState(null);
  const [initialCviScores, setInitialCviScores] = reactExports.useState({});
  const [initialFormula, setInitialFormula] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const loadData = reactExports.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Loading data for Parameter Assignment...");
      const segmentData = await indexedDBService.getShorelineData("current-segments");
      if (!segmentData || !segmentData.features || segmentData.features.length === 0) {
        setError("No segments found. Please complete the segmentation step first.");
        navigate("/segment-table");
        setLoading(false);
        return;
      }
      const parameterData = await indexedDBService.getShorelineData("current-parameters");
      console.log("Raw parameter data from IndexedDB:", parameterData);
      if (!parameterData || !parameterData.features || parameterData.features.length === 0) {
        console.log("No parameter data found in IndexedDB");
        setError("No parameters found. Please complete the parameter selection step first.");
        navigate("/parameter-selection");
        setLoading(false);
        return;
      }
      const indexData = await indexedDBService.getShorelineData("current-index");
      console.log("Raw index data from IndexedDB:", indexData);
      let indexFormula = null;
      if (indexData && indexData.features && indexData.features.length > 0) {
        const savedIndex = indexData.features[0].properties;
        console.log("Loaded saved index:", savedIndex);
        if (savedIndex.formula) {
          const formulaType = savedIndex.formula;
          let formulaName = savedIndex.shortName || savedIndex.name || "Unknown Index";
          let formulaDescription = `${formulaName} formula`;
          indexFormula = {
            type: formulaType,
            name: formulaName,
            description: formulaDescription
          };
          console.log("Set formula from index:", indexFormula);
        }
      } else {
        console.warn("No index data found - formula will need to be selected manually");
      }
      const loadedSegments = segmentData.features.filter((feature2) => feature2 && feature2.geometry && (feature2.geometry.type === "LineString" || feature2.geometry.type === "MultiLineString")).map((feature2, index) => {
        var _a;
        const segmentId = ((_a = feature2.properties) == null ? void 0 : _a.id) || `segment-${index + 1}`;
        const propertiesBase = feature2.properties || {};
        const parametersFromProperties = propertiesBase.parameters && typeof propertiesBase.parameters === "object" ? propertiesBase.parameters : {};
        let length$1 = propertiesBase.length;
        if (length$1 === void 0 || length$1 === null || typeof length$1 !== "number") {
          try {
            length$1 = length(feature2.geometry, { units: "meters" });
          } catch (e) {
            console.warn(`Could not calculate length for segment ${segmentId}:`, e);
            length$1 = 0;
          }
        }
        const finalProperties = {
          ...propertiesBase,
          id: segmentId,
          length: length$1,
          parameters: parametersFromProperties,
          index: propertiesBase.index ?? index + 1,
          vulnerabilityIndex: propertiesBase.vulnerabilityIndex,
          vulnerabilityFormula: propertiesBase.vulnerabilityFormula
        };
        return {
          id: segmentId,
          type: "Feature",
          geometry: feature2.geometry,
          properties: finalProperties,
          parameters: parametersFromProperties
        };
      });
      if (loadedSegments.length === 0) throw new Error("No valid line segments found after filtering");
      console.log(`Processed ${loadedSegments.length} segments`);
      setSegments(loadedSegments);
      if (loadedSegments.length > 0) {
        const featuresForBounds = loadedSegments.map((s) => ({ type: "Feature", geometry: s.geometry, properties: {} }));
        const fc = featureCollection$1(featuresForBounds);
        try {
          const bbox2 = bbox$1(fc);
          if (bbox2 && bbox2.length === 4 && bbox2.every((b) => isFinite(b)) && bbox2[0] <= bbox2[2] && bbox2[1] <= bbox2[3]) {
            const bounds = [[bbox2[1], bbox2[0]], [bbox2[3], bbox2[2]]];
            setMapBounds(bounds);
            console.log("Calculated map bounds:", bounds);
          } else {
            console.warn("Could not calculate valid bounds from segments.");
          }
        } catch (e) {
          console.error("Error calculating bounds:", e);
        }
      }
      console.log("Parameter features from IndexedDB:", parameterData.features);
      const mappedParameters = parameterData.features.map((feature2) => {
        console.log("Feature properties:", feature2.properties);
        return feature2.properties;
      });
      console.log("Mapped parameters:", mappedParameters);
      const loadedParameters = mappedParameters.filter((p) => {
        console.log(`Parameter ${p == null ? void 0 : p.name}: enabled=${p == null ? void 0 : p.enabled}, p !== null: ${p !== null}`);
        return p !== null && p.enabled === true;
      });
      console.log(`Processed ${loadedParameters.length} enabled parameters out of ${mappedParameters.length} total`);
      console.log("Final loaded parameters:", loadedParameters);
      setParameters(loadedParameters);
      const existingScores = loadedSegments.reduce((acc, seg) => {
        if (seg.properties.vulnerabilityIndex !== void 0 && seg.properties.vulnerabilityIndex !== null) {
          acc[seg.id] = seg.properties.vulnerabilityIndex;
        }
        return acc;
      }, {});
      if (Object.keys(existingScores).length > 0) {
        console.log(`Loaded ${Object.keys(existingScores).length} pre-existing CVI scores`);
        setInitialCviScores(existingScores);
      }
      if (indexFormula) {
        console.log(`Setting formula from saved index: ${indexFormula.name}`);
        setInitialFormula(indexFormula);
      } else {
        const firstSegmentWithFormula = loadedSegments.find((seg) => seg.properties.vulnerabilityFormula);
        if (firstSegmentWithFormula == null ? void 0 : firstSegmentWithFormula.properties.vulnerabilityFormula) {
          const formula = availableFormulas.find((f) => f.type === firstSegmentWithFormula.properties.vulnerabilityFormula);
          if (formula) {
            console.log(`Setting fallback formula from segment: ${formula.name}`);
            setInitialFormula(formula);
          } else {
            console.warn(`Segment ${firstSegmentWithFormula.id} has unknown formula type: ${firstSegmentWithFormula.properties.vulnerabilityFormula}`);
          }
        }
      }
    } catch (err) {
      console.error("Error loading data:", err);
      setError(`Failed to load assignment data: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }, [navigate]);
  reactExports.useEffect(() => {
    loadData();
  }, [loadData]);
  return {
    segments,
    setSegments,
    parameters,
    mapBounds,
    initialCviScores,
    initialFormula,
    loading,
    error,
    setError
  };
};
const applyParameterValueToSegments = async (segments, selectedSegmentIds, activeParameter, valueToApply, vulnerabilityToApply) => {
  console.log(`Applying value "${valueToApply}" (vuln: ${vulnerabilityToApply}) for "${activeParameter.name}" to ${selectedSegmentIds.length} segments`);
  let updateOccurred = false;
  const updatedSegments = segments.map((segment) => {
    var _a;
    if (selectedSegmentIds.includes(segment.id)) {
      let paramValue;
      let segmentNeedsUpdate = false;
      if (activeParameter.type === "numerical") {
        const numValue = parseFloat(valueToApply);
        if (!isNaN(numValue)) {
          paramValue = { type: "numerical", value: numValue, vulnerability: vulnerabilityToApply };
        } else {
          console.error(`Skipping segment ${segment.id}: Invalid numerical value ${valueToApply}`);
          return segment;
        }
      } else {
        paramValue = { type: "categorical", value: valueToApply, vulnerability: vulnerabilityToApply };
      }
      const existingValue = (_a = segment.parameters) == null ? void 0 : _a[activeParameter.id];
      if (!existingValue || existingValue.value !== paramValue.value || existingValue.vulnerability !== paramValue.vulnerability) {
        segmentNeedsUpdate = true;
      }
      if (segmentNeedsUpdate) {
        updateOccurred = true;
        const updatedDirectParameters = { ...segment.parameters, [activeParameter.id]: paramValue };
        const currentProperties = segment.properties || { id: segment.id };
        const currentPropertiesParams = currentProperties.parameters && typeof currentProperties.parameters === "object" ? currentProperties.parameters : {};
        const updatedProperties = {
          ...currentProperties,
          parameters: { ...currentPropertiesParams, [activeParameter.id]: paramValue }
        };
        return { ...segment, parameters: updatedDirectParameters, properties: updatedProperties };
      }
    }
    return segment;
  });
  if (updateOccurred) {
    try {
      const featuresToStore = updatedSegments.map((seg) => ({
        type: "Feature",
        geometry: seg.geometry,
        properties: seg.properties
      }));
      await indexedDBService.storeShorelineData("current-segments", {
        type: "FeatureCollection",
        features: featuresToStore
      });
      console.log("Stored updated segments after value application");
    } catch (error) {
      console.error("Failed to store updated segments:", error);
      throw new Error(`Failed to save changes: ${error instanceof Error ? error.message : String(error)}`);
    }
  } else {
    console.log("No actual segment values changed, skipping database update.");
  }
  return updatedSegments;
};
function calculateCompositeIndex(parameters, detection) {
  const { indexType, formula } = detection;
  switch (formula) {
    case "traditional":
      return calculateTraditionalCVI(parameters);
    case "icvi-evi":
    case "icvi-svi":
      return calculateICVIComponent(parameters, indexType);
    case "icvi-composite":
      return calculateICVIComposite(parameters);
    case "icvi-arithmetic":
      return calculateICVIArithmetic(parameters);
    case "icvi-geometric":
      return calculateICVIGeometric(parameters);
    case "pcvi":
      return calculatePCVI(parameters);
    case "ecvi":
      return calculateECVI(parameters);
    case "ccvi-composite":
      return calculateCCVIComposite(parameters);
    case "cvi-se":
      return calculateCVISE(parameters);
    case "sovi":
      return calculateSoVI(parameters);
    case "sevi":
      return calculateSeVI(parameters);
    case "lvi":
      return calculateLVI(parameters);
    case "integrated-cvi":
      return calculateIntegratedCVI(parameters);
    case "gcvi-composite":
      return calculateGCVIComposite(parameters);
    case "gcvi-component":
      return calculateWeightedSum(parameters);
    default:
      return calculateTraditionalCVI(parameters);
  }
}
function calculateTraditionalCVI(parameters) {
  const values = parameters.map((p) => p.vulnerabilityValue || 1);
  const product = values.reduce((acc, val) => acc * val, 1);
  const result = Math.sqrt(product / values.length);
  return {
    value: result,
    formula: `√(∏Vi/n) = √((${values.join("×")})/${values.length}) = √(${product}/${values.length}) = ${result.toFixed(3)}`
  };
}
function calculateICVIComponent(parameters, indexType) {
  const convertedValues = parameters.map((p) => {
    const originalValue = p.vulnerabilityValue || 1;
    return (originalValue - 1) / 4;
  });
  const sum = convertedValues.reduce((acc, val) => acc + val, 0);
  const result = sum / convertedValues.length;
  const componentName = indexType === "ICVI_EVI" ? "EVI" : "SVI";
  return {
    value: result,
    formula: `${componentName} = Σ(Vi)/n = (${convertedValues.map((v) => v.toFixed(3)).join("+")})/${convertedValues.length} = ${result.toFixed(3)}`
  };
}
function calculateICVIComposite(parameters) {
  const eviParams = parameters.filter(
    (p) => ["coastal_geomorphology", "coastal_slope", "ecosystem_type", "environmental_conservancy", "interest_species"].includes(p.id)
  );
  const sviParams = parameters.filter(
    (p) => ["use_of_territory", "building_coast_ratio", "population_density", "economic_value", "sociocultural_heritage"].includes(p.id)
  );
  const eviConverted = eviParams.map((p) => ((p.vulnerabilityValue || 1) - 1) / 4);
  const eviValue = eviConverted.reduce((acc, val) => acc + val, 0) / eviConverted.length;
  const sviConverted = sviParams.map((p) => ((p.vulnerabilityValue || 1) - 1) / 4);
  const sviValue = sviConverted.reduce((acc, val) => acc + val, 0) / sviConverted.length;
  const icviValue = (eviValue + sviValue) / 2;
  return {
    value: icviValue,
    formula: `ICVI = (EVI + SVI)/2 = (${eviValue.toFixed(3)} + ${sviValue.toFixed(3)})/2 = ${icviValue.toFixed(3)}`,
    components: {
      "EVI (50%)": eviValue,
      "SVI (50%)": sviValue
    }
  };
}
function calculateICVIArithmetic(parameters) {
  const eviParams = parameters.filter(
    (p) => ["icvi_geomorphological_features", "icvi_slope", "icvi_shoreline_migration", "icvi_ecosystem_type", "icvi_conservation_measures", "icvi_species_interest"].includes(p.id)
  );
  const sviParams = parameters.filter(
    (p) => ["icvi_land_use", "icvi_building_coast_ratio", "icvi_population_density", "icvi_economic_activity", "icvi_economic_value", "icvi_heritage"].includes(p.id)
  );
  const eviValues = eviParams.map((p) => p.vulnerabilityValue || 0.1);
  const eviValue = eviValues.reduce((acc, val) => acc + val, 0) / eviValues.length;
  const sviValues = sviParams.map((p) => p.vulnerabilityValue || 0.1);
  const sviValue = sviValues.reduce((acc, val) => acc + val, 0) / sviValues.length;
  const icviValue = (eviValue + sviValue) / 2;
  return {
    value: icviValue,
    formula: `ICVI = (EVI + SVI)/2 = (${eviValue.toFixed(3)} + ${sviValue.toFixed(3)})/2 = ${icviValue.toFixed(3)}`,
    components: {
      "EVI (50%)": eviValue,
      "SVI (50%)": sviValue
    }
  };
}
function calculateICVIGeometric(parameters) {
  const eviParams = parameters.filter(
    (p) => ["icvi_geomorphological_features", "icvi_slope", "icvi_shoreline_migration", "icvi_ecosystem_type", "icvi_conservation_measures", "icvi_species_interest"].includes(p.id)
  );
  const sviParams = parameters.filter(
    (p) => ["icvi_land_use", "icvi_building_coast_ratio", "icvi_population_density", "icvi_economic_activity", "icvi_economic_value", "icvi_heritage"].includes(p.id)
  );
  const eviValues = eviParams.map((p) => p.vulnerabilityValue || 0.1);
  const eviProduct = eviValues.reduce((acc, val) => acc * val, 1);
  const eviValue = Math.pow(eviProduct, 1 / eviValues.length);
  const sviValues = sviParams.map((p) => p.vulnerabilityValue || 0.1);
  const sviProduct = sviValues.reduce((acc, val) => acc * val, 1);
  const sviValue = Math.pow(sviProduct, 1 / sviValues.length);
  const icviValue = (eviValue + sviValue) / 2;
  return {
    value: icviValue,
    formula: `ICVI = (EVI + SVI)/2 = (${eviValue.toFixed(4)} + ${sviValue.toFixed(4)})/2 = ${icviValue.toFixed(4)}`,
    components: {
      "EVI (50%)": eviValue,
      "SVI (50%)": sviValue
    }
  };
}
function calculatePCVI(parameters) {
  const values = parameters.map((p) => p.vulnerabilityValue || 1);
  const result = values.reduce((acc, val) => acc + val, 0);
  return {
    value: result,
    formula: `PCVI = Σ(Vi) = ${values.join("+")} = ${result}`
  };
}
function calculateECVI(parameters) {
  const values = parameters.map((p) => p.vulnerabilityValue || 1);
  const result = values.reduce((acc, val) => acc + val, 0);
  return {
    value: result,
    formula: `ECVI = Σ(Vi) = ${values.join("+")} = ${result}`
  };
}
function calculateWeightedSum(parameters, indexType) {
  const weightedValues = parameters.map((p) => (p.vulnerabilityValue || 1) * (p.weight || 1));
  const result = weightedValues.reduce((acc, val) => acc + val, 0);
  const formula = parameters.map(
    (p) => `${p.vulnerabilityValue || 1}×${(p.weight || 1).toFixed(3)}`
  ).join("+");
  return {
    value: result,
    formula: `Σ(Vi×Wi) = ${formula} = ${result.toFixed(3)}`
  };
}
function calculateCCVIComposite(parameters) {
  const pcviParams = parameters.filter(
    (p) => ["beach_width", "dune_width", "coastal_slope", "vegetation_distance", "distance_built_structures", "sea_defences"].includes(p.id)
  );
  const ecviParams = parameters.filter(
    (p) => ["commercial_properties", "residential_properties", "economic_value", "population_density"].includes(p.id)
  );
  const pcviValues = pcviParams.map((p) => p.vulnerabilityValue || 1);
  const pcviSum = pcviValues.reduce((acc, val) => acc + val, 0);
  const ecviValues = ecviParams.map((p) => p.vulnerabilityValue || 1);
  const ecviSum = ecviValues.reduce((acc, val) => acc + val, 0);
  const ccviValue = (pcviSum + ecviSum) / 2;
  return {
    value: ccviValue,
    formula: `CCVI = (PCVI + ECVI)/2 = (${pcviSum} + ${ecviSum})/2 = ${ccviValue.toFixed(3)}`,
    components: {
      "PCVI (50%)": pcviSum,
      "ECVI (50%)": ecviSum
    }
  };
}
function calculateCVISE(parameters) {
  const physicalParams = parameters.filter(
    (p) => ["coastal_geomorphology", "coastal_slope", "sea_level_change", "shoreline_change", "mean_tide_range", "mean_wave_height"].includes(p.id)
  );
  const socioParams = parameters.filter(
    (p) => ["population_density", "economic_value", "infrastructure_density", "social_vulnerability"].includes(p.id)
  );
  const physicalValues = physicalParams.map((p) => p.vulnerabilityValue || 1);
  const physicalProduct = physicalValues.reduce((acc, val) => acc * val, 1);
  const physicalCVI = Math.sqrt(physicalProduct / physicalValues.length);
  const socioValues = socioParams.map((p) => p.vulnerabilityValue || 1);
  const socioSum = socioValues.reduce((acc, val) => acc + val, 0);
  const socioVI = socioSum / socioValues.length;
  const cviSeValue = 0.6 * physicalCVI + 0.4 * socioVI;
  return {
    value: cviSeValue,
    formula: `CVI-SE = 0.6×Physical_CVI + 0.4×Socioeconomic_VI = 0.6×${physicalCVI.toFixed(3)} + 0.4×${socioVI.toFixed(3)} = ${cviSeValue.toFixed(3)}`,
    components: {
      "Physical CVI (60%)": physicalCVI,
      "Socioeconomic VI (40%)": socioVI
    }
  };
}
function calculateArithmeticMean$1(parameters, indexType) {
  const values = parameters.map((p) => p.vulnerabilityValue || 1);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const result = sum / values.length;
  return {
    value: result,
    formula: `Σ(Vi)/n = (${values.join("+")})/${values.length} = ${result.toFixed(3)}`
  };
}
function calculateSoVI(parameters) {
  const result = calculateArithmeticMean$1(parameters);
  return {
    value: result.value,
    formula: `SoVI = Σ(Factor Scores × Weights) ≈ ${result.formula}`
  };
}
function calculateSeVI(parameters) {
  const result = calculateArithmeticMean$1(parameters);
  return {
    value: result.value,
    formula: `SeVI = Σ(Domain_i × Weight_i) = ${result.formula}`
  };
}
function calculateLVI(parameters) {
  const result = calculateArithmeticMean$1(parameters);
  return {
    value: result.value,
    formula: `LVI = (Exposure + Sensitivity - Adaptive Capacity)/3 ≈ ${result.formula}`
  };
}
function calculateIntegratedCVI(parameters) {
  const physicalParams = parameters.filter(
    (p) => ["coastal_geomorphology", "coastal_slope", "sea_level_change", "shoreline_change", "mean_tide_range", "mean_wave_height"].includes(p.id)
  );
  const socioParams = parameters.filter(
    (p) => ["population_density", "economic_value", "social_vulnerability"].includes(p.id)
  );
  const envParams = parameters.filter(
    (p) => ["land_use", "ecosystem_services"].includes(p.id)
  );
  const physicalValues = physicalParams.map((p) => p.vulnerabilityValue || 1);
  const physicalProduct = physicalValues.reduce((acc, val) => acc * val, 1);
  const physicalCVI = Math.sqrt(physicalProduct / physicalValues.length);
  const socioValues = socioParams.map((p) => p.vulnerabilityValue || 1);
  const socioSum = socioValues.reduce((acc, val) => acc + val, 0);
  const socioVI = socioSum / socioValues.length;
  const envValues = envParams.map((p) => p.vulnerabilityValue || 1);
  const envSum = envValues.reduce((acc, val) => acc + val, 0);
  const envVI = envSum / envValues.length;
  const integratedValue = 0.4 * physicalCVI + 0.3 * socioVI + 0.3 * envVI;
  return {
    value: integratedValue,
    formula: `Integrated CVI = 0.4×Physical + 0.3×Social + 0.3×Environmental = 0.4×${physicalCVI.toFixed(3)} + 0.3×${socioVI.toFixed(3)} + 0.3×${envVI.toFixed(3)} = ${integratedValue.toFixed(3)}`,
    components: {
      "Physical (40%)": physicalCVI,
      "Social (30%)": socioVI,
      "Environmental (30%)": envVI
    }
  };
}
function calculateGCVIComposite(parameters) {
  const gsParams = parameters.filter(
    (p) => ["coastal_geotechnical_map", "median_grain_size"].includes(p.id)
  );
  const csParams = parameters.filter(
    (p) => ["coastal_slope", "posidonia_oceanica"].includes(p.id)
  );
  const hsParams = parameters.filter(
    (p) => ["sea_level_change", "mean_tide_range", "mean_wave_height"].includes(p.id)
  );
  const gsValues = gsParams.map((p) => p.vulnerabilityValue || 1);
  const gsWeights = gsParams.map((p) => p.weight || 0.5);
  const gsSum = gsValues.reduce((acc, val, i) => acc + val * gsWeights[i], 0);
  const csValues = csParams.map((p) => p.vulnerabilityValue || 1);
  const csWeights = csParams.map((p) => p.weight || 0.5);
  const csSum = csValues.reduce((acc, val, i) => acc + val * csWeights[i], 0);
  const hsValues = hsParams.map((p) => p.vulnerabilityValue || 1);
  const hsWeights = hsParams.map((p) => p.weight || 1 / 3);
  const hsSum = hsValues.reduce((acc, val, i) => acc + val * hsWeights[i], 0);
  const gcviValue = (gsSum + csSum + hsSum) / 3;
  return {
    value: gcviValue,
    formula: `GCVI = (GS + CS + HS)/3 = (${gsSum.toFixed(3)} + ${csSum.toFixed(3)} + ${hsSum.toFixed(3)})/3 = ${gcviValue.toFixed(3)}`,
    components: {
      "Geotechnical State (33%)": gsSum,
      "Coastline State (33%)": csSum,
      "Hydrodynamic State (33%)": hsSum
    }
  };
}
const calculateGeometricMean = (values, weights) => {
  if (values.length === 0) return 0;
  let product = 1;
  for (let i = 0; i < values.length; i++) {
    const value = Math.max(1e-9, values[i]);
    product *= Math.pow(value, weights[i]);
  }
  return product;
};
const calculateTraditional = (values, weights) => {
  const n = values.length;
  if (n === 0) return 0;
  const firstWeight = weights[0];
  const areWeightsEqual = weights.every((w) => Math.abs(w - firstWeight) < 1e-6);
  if (!areWeightsEqual) {
    console.warn("Traditional formula requires equal weights. Results may not be meaningful.");
  }
  let product = 1;
  for (let i = 0; i < values.length; i++) {
    const value = Math.max(1e-9, values[i]);
    product *= value;
  }
  return Math.sqrt(product / n);
};
const calculateArithmeticMean = (values, weights) => {
  if (values.length === 0) return 0;
  let weightedSum = 0;
  for (let i = 0; i < values.length; i++) {
    weightedSum += values[i] * weights[i];
  }
  return weightedSum;
};
const calculateNonlinearPower = (values, weights) => {
  if (values.length === 0) return 0;
  const weightedSumOfSquares = values.reduce((acc, val, i) => acc + Math.pow(val, 2) * weights[i], 0);
  return Math.sqrt(weightedSumOfSquares);
};
const calculateAndSaveCVI = async (segments, parameters, formula, setSegments, setCviScores, setError) => {
  var _a;
  console.log("Calculating CVI using formula:", formula.name);
  setError(null);
  try {
    const newCviScores = {};
    const updatedSegments = [...segments];
    let segmentsUpdated = false;
    const relevantParameters = parameters.filter((p) => p.weight > 0);
    if (formula.type === "traditional") {
      const firstWeight = ((_a = relevantParameters[0]) == null ? void 0 : _a.weight) || 0;
      const areWeightsEqual = relevantParameters.every((p) => Math.abs(p.weight - firstWeight) < 1e-6);
      if (!areWeightsEqual) {
        const errorMsg = `Traditional formula requires equal weights for all parameters. Please adjust weights in Parameter Selection.`;
        console.error(errorMsg);
        setError(errorMsg);
      }
    }
    segments.forEach((segment, index) => {
      var _a2;
      const hasAllParameters = relevantParameters.every(
        (param) => segment.parameters && segment.parameters[param.id] !== void 0
      );
      if (!hasAllParameters) {
        return;
      }
      const paramValues = [];
      const weights = [];
      relevantParameters.forEach((param) => {
        const paramValue = segment.parameters[param.id];
        const vulnerability = Math.max(1, Math.min(5, paramValue.vulnerability));
        if (paramValue.vulnerability !== vulnerability) {
          console.warn(`Parameter ${param.name} for segment ${segment.id} has vulnerability ${paramValue.vulnerability} outside 1-5 range. Clamped to ${vulnerability}.`);
        }
        paramValues.push(vulnerability);
        weights.push(param.weight);
      });
      let cviScore;
      switch (formula.type) {
        case "geometric-mean":
          cviScore = calculateGeometricMean(paramValues, weights);
          break;
        case "traditional":
          cviScore = calculateTraditional(paramValues, weights);
          break;
        case "arithmetic-mean":
          cviScore = calculateArithmeticMean(paramValues, weights);
          break;
        case "nonlinear-power":
          cviScore = calculateNonlinearPower(paramValues, weights);
          break;
        case "icvi-evi":
        case "icvi-svi":
        case "icvi-composite":
        case "icvi-arithmetic":
        case "icvi-geometric":
        case "pcvi":
        case "ecvi":
        case "ccvi-composite":
        case "cvi-se":
        case "sovi":
        case "sevi":
        case "lvi":
        case "integrated-cvi":
        case "gcvi-composite":
        case "gcvi-component":
          console.log(`Processing composite formula: ${formula.type}`);
          console.log(`Available parameters: ${relevantParameters.map((p) => p.id).join(", ")}`);
          const parametersWithValues = relevantParameters.map((param) => {
            const segmentValue = segment.parameters[param.id];
            return {
              ...param,
              vulnerabilityValue: (segmentValue == null ? void 0 : segmentValue.vulnerability) || 1
            };
          });
          let indexType = formula.type.toUpperCase().replace("-", "_");
          switch (formula.type) {
            case "cvi-se":
              indexType = "CVI_SE";
              break;
            case "icvi-evi":
              indexType = "ICVI_EVI";
              break;
            case "icvi-svi":
              indexType = "ICVI_SVI";
              break;
            case "icvi-composite":
            case "icvi-arithmetic":
            case "icvi-geometric":
              indexType = "ICVI";
              break;
            case "ccvi-composite":
              indexType = "CCVI";
              break;
            case "integrated-cvi":
              indexType = "INTEGRATED_CVI";
              break;
            case "gcvi-composite":
              indexType = "GCVI";
              break;
            case "gcvi-component":
              indexType = "GCVI_GS";
              break;
            default:
              indexType = formula.type.toUpperCase().replace("-", "_");
          }
          const syntheticDetection = {
            indexType,
            indexName: formula.name,
            formula: formula.type,
            confidence: 1
          };
          try {
            const result = calculateCompositeIndex(parametersWithValues, syntheticDetection);
            cviScore = result.value;
            console.log(`Composite calculation successful: ${result.formula}`);
          } catch (compositeError) {
            console.error(`Composite calculation failed for ${formula.type}:`, compositeError);
            console.warn(`Falling back to traditional calculation`);
            cviScore = calculateTraditional(paramValues, weights);
          }
          break;
        default:
          console.warn(`Unknown formula type: ${formula.type}. Defaulting to geometric mean.`);
          cviScore = calculateGeometricMean(paramValues, weights);
      }
      cviScore = Math.round(cviScore * 100) / 100;
      newCviScores[segment.id] = cviScore;
      if (((_a2 = updatedSegments[index]) == null ? void 0 : _a2.properties) && (updatedSegments[index].properties.vulnerabilityIndex !== cviScore || updatedSegments[index].properties.vulnerabilityFormula !== formula.type)) {
        updatedSegments[index].properties.vulnerabilityIndex = cviScore;
        updatedSegments[index].properties.vulnerabilityFormula = formula.type;
        segmentsUpdated = true;
      }
    });
    const geoJsonToStore = {
      type: "FeatureCollection",
      features: updatedSegments.map((seg) => ({
        type: "Feature",
        geometry: seg.geometry,
        properties: seg.properties
      }))
    };
    if (segmentsUpdated) {
      try {
        await indexedDBService.storeShorelineData("current-segments", geoJsonToStore);
        setSegments(updatedSegments);
        console.log("Saved CVI scores to segments in IndexedDB");
      } catch (dbErr) {
        console.error("Failed to save CVI scores to IndexedDB:", dbErr);
        setError("Failed to save calculated CVI scores locally. Calculations are shown but may be lost if you leave the page.");
      }
    } else if (Object.keys(newCviScores).length > 0) {
      console.log("CVI scores calculated, but no segment properties changed. Data already consistent in IndexedDB if previously saved.");
    }
    setCviScores(newCviScores);
    console.log(`Calculated CVI scores for ${Object.keys(newCviScores).length} segments.`);
  } catch (calculationError) {
    console.error("Error during CVI calculation:", calculationError);
    setError(`An error occurred during CVI calculation: ${calculationError instanceof Error ? calculationError.message : String(calculationError)}`);
    setCviScores({});
  }
};
const ParameterAssignmentHeader = ({
  title,
  completionPercentage
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-800", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: "Overall Completion:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 bg-gray-200 rounded-full h-2.5 mt-1 dark:bg-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-blue-600 h-2.5 rounded-full",
          style: { width: `${completionPercentage}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mt-0.5", children: [
        completionPercentage,
        "%"
      ] })
    ] })
  ] });
};
function ParameterAssignmentPage() {
  const navigate = useNavigate();
  const mapContainerRef = reactExports.useRef(null);
  const {
    segments,
    setSegments,
    parameters,
    mapBounds,
    initialCviScores,
    initialFormula,
    loading: dataLoading,
    error: dataError,
    setError: setDataError
  } = useParameterAssignmentData();
  const [selectedSegments, setSelectedSegments] = reactExports.useState([]);
  const [activeParameter, setActiveParameter] = reactExports.useState(null);
  const [selectionPolygons, setSelectionPolygons] = reactExports.useState([]);
  const [currentValueToApply, setCurrentValueToApply] = reactExports.useState(null);
  const [currentVulnerabilityToApply, setCurrentVulnerabilityToApply] = reactExports.useState(1);
  const [selectedFormula, setSelectedFormula] = reactExports.useState(null);
  const [cviScores, setCviScores] = reactExports.useState({});
  const [calculatingCvi, setCalculatingCvi] = reactExports.useState(false);
  const [pageError, setPageError] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("parameters");
  reactExports.useEffect(() => {
    if (!dataLoading && parameters.length > 0 && !activeParameter) {
      setActiveParameter(parameters[0]);
    }
    if (!dataLoading && initialFormula && !selectedFormula) {
      setSelectedFormula(initialFormula);
    }
    if (!dataLoading && Object.keys(initialCviScores).length > 0 && Object.keys(cviScores).length === 0) {
      setCviScores(initialCviScores);
    }
  }, [dataLoading, parameters, initialFormula, initialCviScores, activeParameter, selectedFormula, cviScores]);
  const completionPercentage = reactExports.useMemo(() => {
    if (segments.length === 0 || parameters.length === 0) return 0;
    const totalPossibleValues = segments.length * parameters.length;
    let filledValues = 0;
    segments.forEach((segment) => {
      parameters.forEach((param) => {
        if (segment.parameters && segment.parameters[param.id] !== void 0) filledValues++;
      });
    });
    return totalPossibleValues === 0 ? 0 : Math.round(filledValues / totalPossibleValues * 100);
  }, [segments, parameters]);
  const geoJSONForMap = reactExports.useMemo(() => {
    if (!segments || segments.length === 0) return null;
    return {
      type: "FeatureCollection",
      features: segments.map((segment) => ({
        type: "Feature",
        geometry: segment.geometry,
        properties: {
          ...segment.properties,
          id: segment.id,
          isSelected: selectedSegments.includes(segment.id),
          vulnerabilityIndex: segment.properties.vulnerabilityIndex,
          vulnerabilityFormula: segment.properties.vulnerabilityFormula
        }
      }))
    };
  }, [segments, selectedSegments]);
  const handleError = (message) => {
    setPageError(message);
    if (message) console.error("Error:", message);
  };
  const handleSegmentSelect = reactExports.useCallback((segmentId) => {
    setSelectedSegments((prev) => prev.includes(segmentId) ? prev.filter((id) => id !== segmentId) : [...prev, segmentId]);
  }, []);
  const handleSelectAll = reactExports.useCallback(() => {
    setSelectedSegments(segments.map((s) => s.id));
  }, [segments]);
  const handleClearSelection = reactExports.useCallback(() => {
    setSelectedSegments([]);
  }, []);
  const handleParameterSelect = reactExports.useCallback((parameterId) => {
    const parameter = parameters.find((p) => p.id === parameterId);
    if (parameter) {
      setActiveParameter(parameter);
      setCurrentValueToApply(null);
      setCurrentVulnerabilityToApply(1);
      console.log("Parameter selected:", parameter.name);
      handleError(null);
    } else {
      console.error("Parameter not found:", parameterId);
      handleError("Selected parameter could not be found.");
    }
  }, [parameters]);
  const handleValueSelect = reactExports.useCallback((value, vulnerability) => {
    setCurrentValueToApply(value);
    setCurrentVulnerabilityToApply(vulnerability ?? 1);
    console.log(`Value staged for application: ${value}, Vulnerability: ${vulnerability ?? 1}`);
    handleError(null);
  }, []);
  const handleApplyValue = reactExports.useCallback(async () => {
    if (!activeParameter || currentValueToApply === null || selectedSegments.length === 0) {
      const errorMsg = !activeParameter ? "Select a parameter first." : currentValueToApply === null ? "Select a value first." : "Select at least one segment on the map.";
      handleError(`Cannot apply value: ${errorMsg}`);
      return;
    }
    handleError(null);
    try {
      const updatedSegments = await applyParameterValueToSegments(
        segments,
        selectedSegments,
        activeParameter,
        currentValueToApply,
        currentVulnerabilityToApply
      );
      setSegments(updatedSegments);
      console.log("Successfully applied value and updated segments state.");
    } catch (err) {
      console.error("Error applying parameter value:", err);
      handleError(err instanceof Error ? err.message : "Failed to apply value.");
    }
  }, [activeParameter, currentValueToApply, currentVulnerabilityToApply, segments, selectedSegments, setSegments]);
  const handleCalculateCvi = reactExports.useCallback(async () => {
    if (!selectedFormula) {
      handleError("Please select a CVI formula before calculating.");
      return;
    }
    const allValuesAssigned = segments.every(
      (segment) => parameters.every((param) => segment.parameters && segment.parameters[param.id] !== void 0)
    );
    if (!allValuesAssigned || completionPercentage < 100) {
      handleError(`Cannot calculate CVI: Assign values for all parameters to all segments first. (${completionPercentage}% complete)`);
      return;
    }
    handleError(null);
    setCalculatingCvi(true);
    console.log(`Calculating CVI using: ${selectedFormula.name}`);
    try {
      await calculateAndSaveCVI(
        segments,
        parameters,
        selectedFormula,
        setSegments,
        setCviScores,
        handleError
      );
      console.log("CVI calculation process finished successfully via utility.");
    } catch (err) {
      console.error("Error during CVI calculation process:", err);
      if (!pageError) {
        handleError(err instanceof Error ? err.message : "CVI calculation failed.");
      }
      setCviScores({});
    } finally {
      setCalculatingCvi(false);
    }
  }, [segments, parameters, selectedFormula, setSegments, setCviScores, completionPercentage, pageError]);
  const handleSelectionCreate = reactExports.useCallback((geometry) => {
    if (!geometry || !geometry.coordinates || geometry.coordinates.length === 0) {
      console.error("Invalid polygon geometry received for area selection");
      return;
    }
    console.log("Area selection polygon created, finding intersecting segments...");
    const selectionPolygonTurf = polygon(geometry.coordinates);
    const newlySelectedIds = [];
    segments.forEach((segment) => {
      try {
        if (booleanIntersects(segment.geometry, selectionPolygonTurf)) {
          newlySelectedIds.push(segment.id);
        }
      } catch (e) {
        console.warn(`Error checking intersection for segment ${segment.id}:`, e);
      }
    });
    console.log(`Found ${newlySelectedIds.length} segments intersecting the selected area.`);
    setSelectedSegments((prev) => [.../* @__PURE__ */ new Set([...prev, ...newlySelectedIds])]);
  }, [segments]);
  const handleSelectionDelete = reactExports.useCallback((polygonId) => {
    console.log("Selection polygon deletion requested (if applicable):", polygonId);
    setSelectionPolygons((prev) => prev.filter((p) => p.id !== polygonId));
  }, []);
  const handleContinue = reactExports.useCallback(async () => {
    const allValuesAssigned = segments.every(
      (segment) => parameters.every((param) => segment.parameters && segment.parameters[param.id] !== void 0)
    );
    const cviCalculatedForAll = Object.keys(cviScores).length === segments.length;
    if (!allValuesAssigned || completionPercentage < 100) {
      handleError(`Assign values for all parameters to all segments first. (${completionPercentage}% complete)`);
      return;
    }
    if (!cviCalculatedForAll) {
      handleError(`Calculate CVI scores for all ${segments.length} segments first. (${Object.keys(cviScores).length} calculated)`);
      return;
    }
    handleError(null);
    try {
      console.log("All checks passed. Navigating to results page...");
      navigate("/results");
    } catch (err) {
      console.error("Error preparing to navigate or navigating:", err);
      handleError("Failed to proceed to results.");
    }
  }, [segments, parameters, cviScores, completionPercentage, navigate]);
  const cviStatistics = reactExports.useMemo(() => {
    const scores = Object.values(cviScores);
    if (scores.length === 0) return null;
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;
    let veryLowCount = 0, lowCount = 0, moderateCount = 0, highCount = 0, veryHighCount = 0;
    scores.forEach((score) => {
      const rank = Math.round(score);
      if (rank <= 1) veryLowCount++;
      else if (rank === 2) lowCount++;
      else if (rank === 3) moderateCount++;
      else if (rank === 4) highCount++;
      else if (rank >= 5) veryHighCount++;
    });
    return {
      min: min.toFixed(2),
      max: max.toFixed(2),
      avg: avg.toFixed(2),
      count: scores.length,
      categories: {
        veryLow: veryLowCount,
        low: lowCount,
        moderate: moderateCount,
        high: highCount,
        veryHigh: veryHighCount
      }
    };
  }, [cviScores]);
  if (dataLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "ml-4 text-gray-600", children: "Loading assignment data..." })
    ] });
  }
  if (dataError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 max-w-lg mx-auto mt-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorAlert, { message: dataError, onClose: () => setDataError(null) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/"), className: "mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Go Home" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto w-full px-8 py-4 flex flex-col h-full", children: [
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ParameterAssignmentHeader,
        {
          title: "5. Parameter Assignment & CVI Calculation",
          completionPercentage
        }
      ) }),
      pageError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorAlert, { message: pageError, onClose: () => handleError(null) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col space-y-8 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-1 h-[500px] bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col h-full overflow-hidden", children: [
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-grow overflow-hidden", children: [
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MapInteractionPanel,
                {
                  segments,
                  parameters,
                  geoJSON: geoJSONForMap,
                  initialBounds: mapBounds,
                  selectionPolygons,
                  selectedSegmentIds: selectedSegments,
                  selectedParameterId: (activeParameter == null ? void 0 : activeParameter.id) ?? null,
                  onSegmentSelect: handleSegmentSelect,
                  onSelectAll: handleSelectAll,
                  onClearSelection: handleClearSelection,
                  onSelectionDelete: handleSelectionDelete,
                  onAreaSelect: handleSelectionCreate,
                  mapContainerRef
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 flex flex-col h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-gray-100 rounded-t-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setActiveTab("parameters"),
                  className: `flex-1 px-4 py-3 text-sm font-medium rounded-tl-lg transition-colors ${activeTab === "parameters" ? "bg-white text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`,
                  children: "Parameter Assignment"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setActiveTab("cvi"),
                  className: `flex-1 px-4 py-3 text-sm font-medium rounded-tr-lg transition-colors ${activeTab === "cvi" ? "bg-white text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`,
                  children: "CVI Calculation"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow bg-white rounded-b-lg overflow-y-auto p-4 relative max-h-[400px]", children: activeTab === "parameters" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              ParameterValuePanel,
              {
                parameters,
                activeParameter,
                selectedValue: currentValueToApply,
                selectedVulnerability: currentVulnerabilityToApply,
                onParameterSelect: handleParameterSelect,
                onValueSelect: handleValueSelect,
                onApplyValue: handleApplyValue,
                selectedSegmentIds: selectedSegments
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              CviFormulaPanel,
              {
                selectedFormula,
                onCalculateCvi: handleCalculateCvi,
                completionPercentage,
                calculatingCvi,
                cviScores,
                segments
              }
            ) }),
            activeTab === "cvi" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-4 rounded-b-lg border-t border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleContinue,
                className: "w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200",
                disabled: completionPercentage < 100 || Object.keys(cviScores).length !== segments.length || calculatingCvi,
                title: completionPercentage < 100 ? `Complete parameter assignment (${completionPercentage}%) first` : Object.keys(cviScores).length !== segments.length ? `Calculate CVI for all ${segments.length} segments first (${Object.keys(cviScores).length} done)` : calculatingCvi ? "Calculation in progress..." : "Proceed to results visualization",
                children: calculatingCvi ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { "aria-hidden": "true", role: "status", className: "inline w-4 h-4 mr-2 text-white animate-spin", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C0 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "#E5E7EB" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentColor" })
                  ] }),
                  "Calculating..."
                ] }) : "Continue to Results"
              }
            ) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-6 rounded-lg shadow border-t-4 border-gray-100", style: { minHeight: "200px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SegmentTablePanel,
          {
            segments,
            parameters,
            selectedSegmentIds: selectedSegments,
            onSegmentSelect: handleSegmentSelect,
            cviScores,
            selectedFormula,
            cviStatistics
          }
        ) }) })
      ] }),
      " "
    ] }),
    " "
  ] });
}
export {
  ParameterAssignmentPage as default
};
//# sourceMappingURL=ParameterAssignmentPage-DrIWauvL.js.map
