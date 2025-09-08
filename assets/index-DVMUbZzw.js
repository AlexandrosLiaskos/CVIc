import { a as getAugmentedNamespace, g as getDefaultExportFromCjs } from "./georaster-layer-D-eO7TID.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var version = "2.0.3";
var slice = [].slice;
var noabort = {};
function Queue(size) {
  if (!(size >= 1)) throw new Error();
  this._size = size;
  this._call = this._error = null;
  this._tasks = [];
  this._data = [];
  this._waiting = this._active = this._ended = this._start = 0;
}
Queue.prototype = queue.prototype = {
  constructor: Queue,
  defer: function(callback) {
    if (typeof callback !== "function" || this._call) throw new Error();
    if (this._error != null) return this;
    var t = slice.call(arguments, 1);
    t.push(callback);
    ++this._waiting, this._tasks.push(t);
    poke(this);
    return this;
  },
  abort: function() {
    if (this._error == null) abort(this, new Error("abort"));
    return this;
  },
  await: function(callback) {
    if (typeof callback !== "function" || this._call) throw new Error();
    this._call = function(error, results) {
      callback.apply(null, [error].concat(results));
    };
    maybeNotify(this);
    return this;
  },
  awaitAll: function(callback) {
    if (typeof callback !== "function" || this._call) throw new Error();
    this._call = callback;
    maybeNotify(this);
    return this;
  }
};
function poke(q) {
  if (!q._start) try {
    start(q);
  } catch (e) {
    if (q._tasks[q._ended + q._active - 1]) abort(q, e);
  }
}
function start(q) {
  while (q._start = q._waiting && q._active < q._size) {
    var i = q._ended + q._active, t = q._tasks[i], j = t.length - 1, c = t[j];
    t[j] = end(q, i);
    --q._waiting, ++q._active;
    t = c.apply(null, t);
    if (!q._tasks[i]) continue;
    q._tasks[i] = t || noabort;
  }
}
function end(q, i) {
  return function(e, r) {
    if (!q._tasks[i]) return;
    --q._active, ++q._ended;
    q._tasks[i] = null;
    if (q._error != null) return;
    if (e != null) {
      abort(q, e);
    } else {
      q._data[i] = r;
      if (q._waiting) poke(q);
      else maybeNotify(q);
    }
  };
}
function abort(q, e) {
  var i = q._tasks.length, t;
  q._error = e;
  q._data = void 0;
  q._waiting = NaN;
  while (--i >= 0) {
    if (t = q._tasks[i]) {
      q._tasks[i] = null;
      if (t.abort) try {
        t.abort();
      } catch (e2) {
      }
    }
  }
  q._active = NaN;
  maybeNotify(q);
}
function maybeNotify(q) {
  if (!q._active && q._call) q._call(q._error, q._data);
}
function queue(concurrency) {
  return new Queue(arguments.length ? +concurrency : Infinity);
}
const d3Queue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  queue,
  version
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(d3Queue);
var leafletImage;
var hasRequiredLeafletImage;
function requireLeafletImage() {
  if (hasRequiredLeafletImage) return leafletImage;
  hasRequiredLeafletImage = 1;
  var queue2 = require$$0.queue;
  var cacheBusterDate = +/* @__PURE__ */ new Date();
  leafletImage = function leafletImage2(map, callback) {
    var hasMapbox = !!L.mapbox;
    var dimensions = map.getSize(), layerQueue = new queue2(1);
    var canvas = document.createElement("canvas");
    canvas.width = dimensions.x;
    canvas.height = dimensions.y;
    var ctx = canvas.getContext("2d");
    var dummycanvas = document.createElement("canvas");
    dummycanvas.width = 1;
    dummycanvas.height = 1;
    var dummyctx = dummycanvas.getContext("2d");
    dummyctx.fillStyle = "rgba(0,0,0,0)";
    dummyctx.fillRect(0, 0, 1, 1);
    map.eachLayer(drawTileLayer);
    map.eachLayer(drawEsriDynamicLayer);
    if (map._pathRoot) {
      layerQueue.defer(handlePathRoot, map._pathRoot);
    } else if (map._panes) {
      var firstCanvas = map._panes.overlayPane.getElementsByTagName("canvas").item(0);
      if (firstCanvas) {
        layerQueue.defer(handlePathRoot, firstCanvas);
      }
    }
    map.eachLayer(drawMarkerLayer);
    layerQueue.awaitAll(layersDone);
    function drawTileLayer(l) {
      if (l instanceof L.TileLayer) layerQueue.defer(handleTileLayer, l);
      else if (l._heat) layerQueue.defer(handlePathRoot, l._canvas);
    }
    function drawMarkerLayer(l) {
      if (l instanceof L.Marker && l.options.icon instanceof L.Icon) {
        layerQueue.defer(handleMarkerLayer, l);
      }
    }
    function drawEsriDynamicLayer(l) {
      if (!L.esri) return;
      if (l instanceof L.esri.DynamicMapLayer) {
        layerQueue.defer(handleEsriDymamicLayer, l);
      }
    }
    function done() {
      callback(null, canvas);
    }
    function layersDone(err, layers) {
      if (err) throw err;
      layers.forEach(function(layer) {
        if (layer && layer.canvas) {
          ctx.drawImage(layer.canvas, 0, 0);
        }
      });
      done();
    }
    function handleTileLayer(layer, callback2) {
      var isCanvasLayer = L.TileLayer.Canvas && layer instanceof L.TileLayer.Canvas, canvas2 = document.createElement("canvas");
      canvas2.width = dimensions.x;
      canvas2.height = dimensions.y;
      var ctx2 = canvas2.getContext("2d"), bounds = map.getPixelBounds(), zoom = map.getZoom(), tileSize = layer.options.tileSize;
      if (zoom > layer.options.maxZoom || zoom < layer.options.minZoom || // mapbox.tileLayer
      hasMapbox && layer instanceof L.mapbox.tileLayer && !layer.options.tiles) {
        return callback2();
      }
      var tileBounds = L.bounds(
        bounds.min.divideBy(tileSize)._floor(),
        bounds.max.divideBy(tileSize)._floor()
      ), tiles = [], j, i, tileQueue = new queue2(1);
      for (j = tileBounds.min.y; j <= tileBounds.max.y; j++) {
        for (i = tileBounds.min.x; i <= tileBounds.max.x; i++) {
          tiles.push(new L.Point(i, j));
        }
      }
      tiles.forEach(function(tilePoint) {
        var originalTilePoint = tilePoint.clone();
        if (layer._adjustTilePoint) {
          layer._adjustTilePoint(tilePoint);
        }
        var tilePos = originalTilePoint.scaleBy(new L.Point(tileSize, tileSize)).subtract(bounds.min);
        if (tilePoint.y >= 0) {
          if (isCanvasLayer) {
            var tile = layer._tiles[tilePoint.x + ":" + tilePoint.y];
            tileQueue.defer(canvasTile, tile, tilePos, tileSize);
          } else {
            var url = addCacheString(layer.getTileUrl(tilePoint));
            tileQueue.defer(loadTile, url, tilePos, tileSize);
          }
        }
      });
      tileQueue.awaitAll(tileQueueFinish);
      function canvasTile(tile, tilePos, tileSize2, callback3) {
        callback3(null, {
          img: tile,
          pos: tilePos,
          size: tileSize2
        });
      }
      function loadTile(url, tilePos, tileSize2, callback3) {
        var im = new Image();
        im.crossOrigin = "";
        im.onload = function() {
          callback3(null, {
            img: this,
            pos: tilePos,
            size: tileSize2
          });
        };
        im.onerror = function(e) {
          if (layer.options.errorTileUrl != "" && e.target.errorCheck === void 0) {
            e.target.errorCheck = true;
            e.target.src = layer.options.errorTileUrl;
          } else {
            callback3(null, {
              img: dummycanvas,
              pos: tilePos,
              size: tileSize2
            });
          }
        };
        im.src = url;
      }
      function tileQueueFinish(err, data) {
        data.forEach(drawTile);
        callback2(null, { canvas: canvas2 });
      }
      function drawTile(d) {
        ctx2.drawImage(
          d.img,
          Math.floor(d.pos.x),
          Math.floor(d.pos.y),
          d.size,
          d.size
        );
      }
    }
    function handlePathRoot(root, callback2) {
      var bounds = map.getPixelBounds(), origin = map.getPixelOrigin(), canvas2 = document.createElement("canvas");
      canvas2.width = dimensions.x;
      canvas2.height = dimensions.y;
      var ctx2 = canvas2.getContext("2d");
      var pos = L.DomUtil.getPosition(root).subtract(bounds.min).add(origin);
      try {
        ctx2.drawImage(root, pos.x, pos.y, canvas2.width - pos.x * 2, canvas2.height - pos.y * 2);
        callback2(null, {
          canvas: canvas2
        });
      } catch (e) {
        console.error("Element could not be drawn on canvas", root);
      }
    }
    function handleMarkerLayer(marker, callback2) {
      var canvas2 = document.createElement("canvas"), ctx2 = canvas2.getContext("2d"), pixelBounds = map.getPixelBounds(), minPoint = new L.Point(pixelBounds.min.x, pixelBounds.min.y), pixelPoint = map.project(marker.getLatLng()), isBase64 = /^data\:/.test(marker._icon.src), url = isBase64 ? marker._icon.src : addCacheString(marker._icon.src), im = new Image(), options = marker.options.icon.options, size = options.iconSize, pos = pixelPoint.subtract(minPoint), anchor = L.point(options.iconAnchor || size && size.divideBy(2, true));
      if (size instanceof L.Point) size = [size.x, size.y];
      var x = Math.round(pos.x - size[0] + anchor.x), y = Math.round(pos.y - anchor.y);
      canvas2.width = dimensions.x;
      canvas2.height = dimensions.y;
      im.crossOrigin = "";
      im.onload = function() {
        ctx2.drawImage(this, x, y, size[0], size[1]);
        callback2(null, {
          canvas: canvas2
        });
      };
      im.src = url;
      if (isBase64) im.onload();
    }
    function handleEsriDymamicLayer(dynamicLayer, callback2) {
      var canvas2 = document.createElement("canvas");
      canvas2.width = dimensions.x;
      canvas2.height = dimensions.y;
      var ctx2 = canvas2.getContext("2d");
      var im = new Image();
      im.crossOrigin = "";
      im.src = addCacheString(dynamicLayer._currentImage._image.src);
      im.onload = function() {
        ctx2.drawImage(im, 0, 0);
        callback2(null, {
          canvas: canvas2
        });
      };
    }
    function addCacheString(url) {
      if (isDataURL(url) || url.indexOf("mapbox.com/styles/v1") !== -1) {
        return url;
      }
      return url + (url.match(/\?/) ? "&" : "?") + "cache=" + cacheBusterDate;
    }
    function isDataURL(url) {
      var dataURLRegex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
      return !!url.match(dataURLRegex);
    }
  };
  return leafletImage;
}
var leafletImageExports = requireLeafletImage();
const index = /* @__PURE__ */ getDefaultExportFromCjs(leafletImageExports);
const index$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [leafletImageExports]);
export {
  index$1 as i
};
//# sourceMappingURL=index-DVMUbZzw.js.map
