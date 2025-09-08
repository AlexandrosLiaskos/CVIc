import { u as useNavigate, j as jsxRuntimeExports } from "./index-D694obFq.js";
import { b as reactExports } from "./leaflet-CCUyKKIY.js";
import { p as proj4 } from "./georaster-layer-D-eO7TID.js";
import { i as indexedDBService } from "./indexedDBService-C0Tzj_Tb.js";
import { M as Map } from "./Map-DjRk7Cda.js";
import { E as ErrorAlert } from "./ErrorAlert-DlvKuJCH.js";
import { F as ForwardRef$1 } from "./ArrowUpTrayIcon-CaILkGVF.js";
import { F as ForwardRef$2 } from "./CheckCircleIcon-B9WHPi_i.js";
import { F as ForwardRef$3 } from "./XCircleIcon-DfrkDXVE.js";
import "./georaster-UMjhm2qh.js";
import "./geotiff-70LCDX0v.js";
/* empty css                      */
import "./turf-C25yoSNr.js";
function DocumentIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const ForwardRef = /* @__PURE__ */ reactExports.forwardRef(DocumentIcon);
var d, g = () => new DecompressionStream("deflate-raw");
try {
  g(), d = async (t) => {
    let s = g(), e = s.writable.getWriter(), f = s.readable.getReader(), a, i = [], r = 0, l = 0, o;
    for (e.write(t), e.close(); !(o = await f.read()).done; ) a = o.value, i.push(a), r += a.length;
    return !i[1] && a || (a = new Uint8Array(r), i.map((n) => (a.set(n, l), l += n.length))), a;
  };
} catch {
}
var U = new TextDecoder(), u = (t) => {
  throw new Error("but-unzip~" + t);
}, h = (t) => U.decode(t);
function* m(t, s = d) {
  let e = t.length - 20, f = Math.max(e - 65516, 2);
  for (; (e = t.lastIndexOf(80, e - 1)) !== -1 && !(t[e + 1] === 75 && t[e + 2] === 5 && t[e + 3] === 6) && e > f; ) ;
  e === -1 && u(2);
  let a = (n, w) => t.subarray(e += n, e += w), i = new DataView(t.buffer, t.byteOffset), r = (n) => i.getUint16(n + e, true), l = (n) => i.getUint32(n + e, true), o = r(10);
  for (o !== r(8) && u(3), e = l(16); o--; ) {
    let n = r(10), w = r(30), b = r(32), p = l(20), y = l(42), x = h(a(46, r(28))), D = h(a(w, b)), v = e, c;
    e = y, c = a(30 + r(26) + r(28), p), yield { filename: x, comment: D, read: () => n & 8 ? s(c) : n ? u(1) : c }, e = v;
  }
}
const regex$1 = /.+\.(shp|dbf|json|prj|cpg)$/i;
const unzip = async (buffer) => {
  const files = {};
  const proms = [];
  for (const entry of m(buffer)) {
    if (!regex$1.test(entry.filename)) {
      continue;
    }
    proms.push(Promise.resolve(entry.read()).then((bytes) => files[entry.filename] = bytes));
  }
  await Promise.all(proms);
  const out = {};
  const decoder = new TextDecoder();
  for (const [key, value] of Object.entries(files)) {
    if (key.slice(-3).toLowerCase() === "shp" || key.slice(-3).toLowerCase() === "dbf") {
      out[key] = new DataView(value.buffer, value.byteOffset, value.byteLength);
    } else {
      out[key] = decoder.decode(value);
    }
  }
  return out;
};
const URL$1 = globalThis.URL;
const combine$1 = (base, type) => {
  if (!type) {
    return base;
  }
  const url = new URL$1(base);
  url.pathname = `${url.pathname}.${type}`;
  return url.href;
};
async function binaryAjax(_url, type) {
  const url = combine$1(_url, type);
  const isOptionalTxt = type === "prj" || type === "cpg";
  try {
    const resp = await fetch(url);
    if (resp.status > 399) {
      throw new Error(resp.statusText);
    }
    if (isOptionalTxt) {
      return resp.text();
    }
    const parsed = await resp.arrayBuffer();
    return new DataView(parsed);
  } catch (e) {
    if (isOptionalTxt || type === "dbf") {
      return false;
    }
    throw e;
  }
}
function isClockWise(array) {
  let sum = 0;
  let i = 1;
  const len = array.length;
  let prev, cur;
  const bbox = [array[0][0], array[0][1], array[0][0], array[0][1]];
  while (i < len) {
    prev = cur || array[0];
    cur = array[i];
    sum += (cur[0] - prev[0]) * (cur[1] + prev[1]);
    i++;
    if (cur[0] < bbox[0]) {
      bbox[0] = cur[0];
    }
    if (cur[1] < bbox[1]) {
      bbox[1] = cur[1];
    }
    if (cur[0] > bbox[2]) {
      bbox[2] = cur[0];
    }
    if (cur[1] > bbox[3]) {
      bbox[3] = cur[1];
    }
  }
  return {
    ring: array,
    clockWise: sum > 0,
    bbox,
    children: []
  };
}
function contains(outer, inner) {
  if (outer.bbox[0] > inner.bbox[0]) {
    return false;
  }
  if (outer.bbox[1] > inner.bbox[1]) {
    return false;
  }
  if (outer.bbox[2] < inner.bbox[2]) {
    return false;
  }
  if (outer.bbox[3] < inner.bbox[3]) {
    return false;
  }
  return true;
}
function handleRings(rings) {
  const outers = [];
  const inners = [];
  for (const ring of rings) {
    const proccessed = isClockWise(ring);
    if (proccessed.clockWise) {
      outers.push(proccessed);
    } else {
      inners.push(proccessed);
    }
  }
  for (const inner of inners) {
    for (const outer of outers) {
      if (contains(outer, inner)) {
        outer.children.push(inner.ring);
        break;
      }
    }
  }
  const out = [];
  for (const outer of outers) {
    out.push([outer.ring].concat(outer.children));
  }
  return out;
}
ParseShp.prototype.parsePoint = function(data) {
  return {
    type: "Point",
    coordinates: this.parseCoord(data, 0)
  };
};
ParseShp.prototype.parseZPoint = function(data) {
  const pointXY = this.parsePoint(data);
  pointXY.coordinates.push(data.getFloat64(16, true));
  return pointXY;
};
ParseShp.prototype.parsePointArray = function(data, offset, num) {
  const out = [];
  let done = 0;
  while (done < num) {
    out.push(this.parseCoord(data, offset));
    offset += 16;
    done++;
  }
  return out;
};
ParseShp.prototype.parseZPointArray = function(data, zOffset, num, coordinates) {
  let i = 0;
  while (i < num) {
    coordinates[i].push(data.getFloat64(zOffset, true));
    i++;
    zOffset += 8;
  }
  return coordinates;
};
ParseShp.prototype.parseArrayGroup = function(data, offset, partOffset, num, tot) {
  const out = [];
  let done = 0;
  let curNum;
  let nextNum = 0;
  let pointNumber;
  while (done < num) {
    done++;
    partOffset += 4;
    curNum = nextNum;
    if (done === num) {
      nextNum = tot;
    } else {
      nextNum = data.getInt32(partOffset, true);
    }
    pointNumber = nextNum - curNum;
    if (!pointNumber) {
      continue;
    }
    out.push(this.parsePointArray(data, offset, pointNumber));
    offset += pointNumber << 4;
  }
  return out;
};
ParseShp.prototype.parseZArrayGroup = function(data, zOffset, num, coordinates) {
  let i = 0;
  while (i < num) {
    coordinates[i] = this.parseZPointArray(data, zOffset, coordinates[i].length, coordinates[i]);
    zOffset += coordinates[i].length << 3;
    i++;
  }
  return coordinates;
};
ParseShp.prototype.parseMultiPoint = function(data) {
  const out = {};
  const num = data.getInt32(32, true);
  if (!num) {
    return null;
  }
  const mins = this.parseCoord(data, 0);
  const maxs = this.parseCoord(data, 16);
  out.bbox = [
    mins[0],
    mins[1],
    maxs[0],
    maxs[1]
  ];
  const offset = 36;
  if (num === 1) {
    out.type = "Point";
    out.coordinates = this.parseCoord(data, offset);
  } else {
    out.type = "MultiPoint";
    out.coordinates = this.parsePointArray(data, offset, num);
  }
  return out;
};
ParseShp.prototype.parseZMultiPoint = function(data) {
  const geoJson = this.parseMultiPoint(data);
  if (!geoJson) {
    return null;
  }
  let num;
  if (geoJson.type === "Point") {
    geoJson.coordinates.push(data.getFloat64(72, true));
    return geoJson;
  } else {
    num = geoJson.coordinates.length;
  }
  const zOffset = 52 + (num << 4);
  geoJson.coordinates = this.parseZPointArray(data, zOffset, num, geoJson.coordinates);
  return geoJson;
};
ParseShp.prototype.parsePolyline = function(data) {
  const out = {};
  const numParts = data.getInt32(32, true);
  if (!numParts) {
    return null;
  }
  const mins = this.parseCoord(data, 0);
  const maxs = this.parseCoord(data, 16);
  out.bbox = [
    mins[0],
    mins[1],
    maxs[0],
    maxs[1]
  ];
  const num = data.getInt32(36, true);
  let offset, partOffset;
  if (numParts === 1) {
    out.type = "LineString";
    offset = 44;
    out.coordinates = this.parsePointArray(data, offset, num);
  } else {
    out.type = "MultiLineString";
    offset = 40 + (numParts << 2);
    partOffset = 40;
    out.coordinates = this.parseArrayGroup(data, offset, partOffset, numParts, num);
  }
  return out;
};
ParseShp.prototype.parseZPolyline = function(data) {
  const geoJson = this.parsePolyline(data);
  if (!geoJson) {
    return null;
  }
  const num = geoJson.coordinates.length;
  let zOffset;
  if (geoJson.type === "LineString") {
    zOffset = 60 + (num << 4);
    geoJson.coordinates = this.parseZPointArray(data, zOffset, num, geoJson.coordinates);
    return geoJson;
  } else {
    const totalPoints = geoJson.coordinates.reduce(function(a, v) {
      return a + v.length;
    }, 0);
    zOffset = 56 + (totalPoints << 4) + (num << 2);
    geoJson.coordinates = this.parseZArrayGroup(data, zOffset, num, geoJson.coordinates);
    return geoJson;
  }
};
ParseShp.prototype.polyFuncs = function(out) {
  if (!out) {
    return out;
  }
  if (out.type === "LineString") {
    out.type = "Polygon";
    out.coordinates = [out.coordinates];
    return out;
  } else {
    out.coordinates = handleRings(out.coordinates);
    if (out.coordinates.length === 1) {
      out.type = "Polygon";
      out.coordinates = out.coordinates[0];
      return out;
    } else {
      out.type = "MultiPolygon";
      return out;
    }
  }
};
ParseShp.prototype.parsePolygon = function(data) {
  return this.polyFuncs(this.parsePolyline(data));
};
ParseShp.prototype.parseZPolygon = function(data) {
  return this.polyFuncs(this.parseZPolyline(data));
};
const shpFuncObj = {
  1: "parsePoint",
  3: "parsePolyline",
  5: "parsePolygon",
  8: "parseMultiPoint",
  11: "parseZPoint",
  13: "parseZPolyline",
  15: "parseZPolygon",
  18: "parseZMultiPoint"
};
function makeParseCoord(trans) {
  if (trans) {
    return function(data, offset) {
      const args = [data.getFloat64(offset, true), data.getFloat64(offset + 8, true)];
      return trans.inverse(args);
    };
  } else {
    return function(data, offset) {
      return [data.getFloat64(offset, true), data.getFloat64(offset + 8, true)];
    };
  }
}
function ParseShp(buffer, trans) {
  if (!(this instanceof ParseShp)) {
    return new ParseShp(buffer, trans);
  }
  this.buffer = buffer;
  this.headers = this.parseHeader();
  this.shpFuncs(trans);
  this.rows = this.getRows();
}
ParseShp.prototype.shpFuncs = function(tran) {
  let num = this.headers.shpCode;
  if (num > 20) {
    num -= 20;
  }
  if (!(num in shpFuncObj)) {
    throw new Error(`I don't know shp type "${num}"`);
  }
  this.parseFunc = this[shpFuncObj[num]];
  this.parseCoord = makeParseCoord(tran);
};
ParseShp.prototype.getShpCode = function() {
  return this.parseHeader().shpCode;
};
ParseShp.prototype.parseHeader = function() {
  const view = this.buffer;
  return {
    length: view.getInt32(6 << 2) << 1,
    version: view.getInt32(7 << 2, true),
    shpCode: view.getInt32(8 << 2, true),
    bbox: [
      view.getFloat64(9 << 2, true),
      view.getFloat64(11 << 2, true),
      view.getFloat64(13 << 2, true),
      view.getFloat64(15 << 2, true)
    ]
  };
};
ParseShp.prototype.getRows = function() {
  let offset = 100;
  const len = this.buffer.byteLength - 8;
  const out = [];
  let current;
  while (offset <= len) {
    current = this.getRow(offset);
    if (!current) {
      break;
    }
    offset += 8;
    offset += current.len;
    if (current.type) {
      out.push(this.parseFunc(current.data));
    } else {
      out.push(null);
    }
  }
  return out;
};
ParseShp.prototype.getRow = function(offset) {
  const id = this.buffer.getInt32(offset);
  const len = this.buffer.getInt32(offset + 4) << 1;
  if (len === 0) {
    return {
      id,
      len,
      type: 0
    };
  }
  if (offset + len + 8 > this.buffer.byteLength) {
    return;
  }
  return {
    id,
    len,
    data: new DataView(this.buffer.buffer, this.buffer.byteOffset + offset + 12, len - 4),
    type: this.buffer.getInt32(offset + 8, true)
  };
};
function parseShp(buffer, trans) {
  return new ParseShp(buffer, trans).rows;
}
var regex = /^(?:ANSI\s)?(\d+)$/m;
function createDecoder(encoding, second) {
  if (!encoding) {
    return browserDecoder;
  }
  try {
    new TextDecoder(encoding.trim());
  } catch (e) {
    var match = regex.exec(encoding);
    if (match && !second) {
      return createDecoder("windows-" + match[1], true);
    } else {
      encoding = void 0;
      return browserDecoder;
    }
  }
  return browserDecoder;
  function browserDecoder(buffer) {
    var decoder = new TextDecoder(encoding ? encoding : void 0);
    var out = decoder.decode(buffer, {
      stream: true
    }) + decoder.decode();
    return out.replace(/\0/g, "").trim();
  }
}
function dbfHeader(data) {
  var out = {};
  out.lastUpdated = new Date(data.getUint8(1) + 1900, data.getUint8(2), data.getUint8(3));
  out.records = data.getUint32(4, true);
  out.headerLen = data.getUint16(8, true);
  out.recLen = data.getUint16(10, true);
  return out;
}
function dbfRowHeader(data, headerLen, decoder) {
  var out = [];
  var offset = 32;
  while (offset < headerLen) {
    out.push({
      name: decoder(new Uint8Array(data.buffer.slice(data.byteOffset + offset, data.byteOffset + offset + 11))),
      dataType: String.fromCharCode(data.getUint8(offset + 11)),
      len: data.getUint8(offset + 16),
      decimal: data.getUint8(offset + 17)
    });
    if (data.getUint8(offset + 32) === 13) {
      break;
    } else {
      offset += 32;
    }
  }
  return out;
}
function rowFuncs(buffer, offset, len, type, decoder) {
  const data = new Uint8Array(buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + len));
  var textData = decoder(data);
  switch (type) {
    case "N":
    case "F":
    case "O":
      return parseFloat(textData, 10);
    case "D":
      return new Date(textData.slice(0, 4), parseInt(textData.slice(4, 6), 10) - 1, textData.slice(6, 8));
    case "L":
      return textData.toLowerCase() === "y" || textData.toLowerCase() === "t";
    default:
      return textData;
  }
}
function parseRow(buffer, offset, rowHeaders, decoder) {
  var out = {};
  var i = 0;
  var len = rowHeaders.length;
  var field;
  var header;
  while (i < len) {
    header = rowHeaders[i];
    field = rowFuncs(buffer, offset, header.len, header.dataType, decoder);
    offset += header.len;
    if (typeof field !== "undefined") {
      out[header.name] = field;
    }
    i++;
  }
  return out;
}
function parseDbf(buffer, encoding) {
  var decoder = createDecoder(encoding);
  var header = dbfHeader(buffer);
  var rowHeaders = dbfRowHeader(buffer, header.headerLen - 1, decoder);
  var offset = (rowHeaders.length + 1 << 5) + 2;
  var recLen = header.recLen;
  var records = header.records;
  var out = [];
  while (records) {
    out.push(parseRow(buffer, offset, rowHeaders, decoder));
    offset += recLen;
    records--;
  }
  return out;
}
const URL = globalThis.URL;
const toUitn8Arr = (b) => {
  if (!b) {
    throw new Error("forgot to pass buffer");
  }
  if (isArrayBuffer(b)) {
    return new Uint8Array(b);
  }
  if (isArrayBuffer(b.buffer)) {
    if (b.BYTES_PER_ELEMENT === 1) {
      return b;
    }
    return new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
  }
  throw new Error("invalid buffer like object");
};
const txtDecoder = new TextDecoder();
const toString = (possibleString) => {
  if (!possibleString) {
    return;
  }
  if (typeof possibleString === "string") {
    return possibleString;
  }
  if (isArrayBuffer(possibleString) || ArrayBuffer.isView(possibleString) || isDataView(possibleString)) {
    return txtDecoder.decode(possibleString);
  }
};
const toDataView = (b) => {
  if (!b) {
    throw new Error("forgot to pass buffer");
  }
  if (isDataView(b)) {
    return b;
  }
  if (isArrayBuffer(b)) {
    return new DataView(b);
  }
  if (isArrayBuffer(b.buffer)) {
    return new DataView(b.buffer, b.byteOffset, b.byteLength);
  }
  throw new Error("invalid buffer like object");
};
function isArrayBuffer(subject) {
  return subject instanceof globalThis.ArrayBuffer || Object.prototype.toString.call(subject) === "[object ArrayBuffer]";
}
function isDataView(subject) {
  return subject instanceof globalThis.DataView || Object.prototype.toString.call(subject) === "[object DataView]";
}
const combine = function([shp, dbf]) {
  const out = {};
  out.type = "FeatureCollection";
  out.features = [];
  let i = 0;
  const len = shp.length;
  if (!dbf) {
    dbf = [];
  }
  while (i < len) {
    out.features.push({
      type: "Feature",
      geometry: shp[i],
      properties: dbf[i] || {}
    });
    i++;
  }
  return out;
};
const parseZip = async function(buffer, whiteList) {
  let key;
  buffer = toUitn8Arr(buffer);
  const zip = await unzip(buffer);
  const names = [];
  whiteList = whiteList || [];
  for (key in zip) {
    if (key.indexOf("__MACOSX") !== -1) {
      continue;
    }
    if (key.slice(-4).toLowerCase() === ".shp") {
      names.push(key.slice(0, -4));
      zip[key.slice(0, -3) + key.slice(-3).toLowerCase()] = zip[key];
    } else if (key.slice(-4).toLowerCase() === ".prj") {
      zip[key.slice(0, -3) + key.slice(-3).toLowerCase()] = proj4(zip[key]);
    } else if (key.slice(-5).toLowerCase() === ".json" || whiteList.indexOf(key.split(".").pop()) > -1) {
      names.push(key.slice(0, -3) + key.slice(-3).toLowerCase());
    } else if (key.slice(-4).toLowerCase() === ".dbf" || key.slice(-4).toLowerCase() === ".cpg") {
      zip[key.slice(0, -3) + key.slice(-3).toLowerCase()] = zip[key];
    }
  }
  if (!names.length) {
    throw new Error("no layers founds");
  }
  const geojson = names.map(function(name) {
    let parsed, dbf;
    const lastDotIdx = name.lastIndexOf(".");
    if (lastDotIdx > -1 && name.slice(lastDotIdx).indexOf("json") > -1) {
      parsed = JSON.parse(zip[name]);
      parsed.fileName = name.slice(0, lastDotIdx);
    } else if (whiteList.indexOf(name.slice(lastDotIdx + 1)) > -1) {
      parsed = zip[name];
      parsed.fileName = name;
    } else {
      if (zip[name + ".dbf"]) {
        dbf = parseDbf(zip[name + ".dbf"], zip[name + ".cpg"]);
      }
      parsed = combine([parseShp(zip[name + ".shp"], zip[name + ".prj"]), dbf]);
      parsed.fileName = name;
    }
    return parsed;
  });
  if (geojson.length === 1) {
    return geojson[0];
  } else {
    return geojson;
  }
};
async function getZip(base, whiteList) {
  const a = await binaryAjax(base);
  return parseZip(a, whiteList);
}
const handleShp = async (base) => {
  const args = await Promise.all([
    binaryAjax(base, "shp"),
    binaryAjax(base, "prj")
  ]);
  let prj = false;
  try {
    if (args[1]) {
      prj = proj4(args[1]);
    }
  } catch (e) {
    prj = false;
  }
  return parseShp(args[0], prj);
};
const handleDbf = async (base) => {
  const [dbf, cpg] = await Promise.all([
    binaryAjax(base, "dbf"),
    binaryAjax(base, "cpg")
  ]);
  if (!dbf) {
    return;
  }
  return parseDbf(dbf, cpg);
};
const checkSuffix = (base, suffix) => {
  const url = new URL(base, globalThis?.document?.location);
  return url.pathname.slice(-4).toLowerCase() === suffix;
};
const fromObject = ({ shp, dbf, cpg, prj }) => {
  const things = [
    _parseShp(shp, prj)
  ];
  if (dbf) {
    things.push(_parseDbf(dbf, cpg));
  }
  return combine(things);
};
const getShapefile = async function(base, whiteList) {
  if (typeof base !== "string") {
    if (isArrayBuffer(base) || ArrayBuffer.isView(base) || isDataView(base)) {
      return parseZip(base);
    }
    if (base.shp) {
      return fromObject(base);
    }
    throw new TypeError("must be a string, some sort of Buffer, or an object with at least a .shp property");
  }
  if (checkSuffix(base, ".zip")) {
    return getZip(base, whiteList);
  }
  if (checkSuffix(base, ".shp")) {
    base = base.slice(0, -4);
  }
  const results = await Promise.all([
    handleShp(base),
    handleDbf(base)
  ]);
  return combine(results);
};
const _parseShp = function(shp, prj) {
  shp = toDataView(shp);
  prj = toString(prj);
  if (typeof prj === "string") {
    try {
      prj = proj4(prj);
    } catch (e) {
      prj = false;
    }
  }
  return parseShp(shp, prj);
};
const _parseDbf = function(dbf, cpg) {
  dbf = toDataView(dbf);
  cpg = toString(cpg);
  return parseDbf(dbf, cpg);
};
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ALLOWED_TYPES = ["application/zip", "application/x-zip-compressed"];
function validateFile(file) {
  if (!file) {
    throw new Error("No file provided");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Invalid file type. Please upload a ZIP file containing shapefile components.");
  }
}
function validateCoordinate(coord) {
  if (!Array.isArray(coord) || coord.length < 2) return false;
  const [lon, lat] = coord;
  return typeof lon === "number" && typeof lat === "number" && lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90;
}
function validateGeoJSON(geoJSON) {
  if (!geoJSON || typeof geoJSON !== "object") {
    throw new Error("Invalid GeoJSON: not an object");
  }
  if (geoJSON.type !== "FeatureCollection") {
    throw new Error("Invalid GeoJSON: not a FeatureCollection");
  }
  if (!Array.isArray(geoJSON.features)) {
    throw new Error("Invalid GeoJSON: features is not an array");
  }
  if (geoJSON.features.length === 0) {
    throw new Error("Invalid GeoJSON: no features found");
  }
  geoJSON.features.forEach((feature, index) => {
    if (!feature.geometry) {
      throw new Error(`Invalid feature at index ${index}: no geometry`);
    }
    if (feature.geometry.type !== "LineString" && feature.geometry.type !== "MultiLineString") {
      throw new Error(`Invalid feature at index ${index}: geometry must be LineString or MultiLineString`);
    }
    if (feature.geometry.type === "LineString") {
      feature.geometry.coordinates.forEach((coord, i) => {
        if (!validateCoordinate(coord)) {
          throw new Error(`Invalid coordinate at index ${i} in feature ${index}`);
        }
      });
    } else {
      feature.geometry.coordinates.forEach((line, lineIndex) => {
        line.forEach((coord, i) => {
          if (!validateCoordinate(coord)) {
            throw new Error(`Invalid coordinate at index ${i} in line ${lineIndex} of feature ${index}`);
          }
        });
      });
    }
  });
}
async function processShapefile(file) {
  try {
    validateFile(file);
    const arrayBuffer = await file.arrayBuffer();
    const result = await getShapefile(arrayBuffer);
    const geoJSON = Array.isArray(result) ? result[0] : result;
    validateGeoJSON(geoJSON);
    const cleanedGeoJSON = cleanGeoJSON(geoJSON);
    return { geoJSON: cleanedGeoJSON };
  } catch (error) {
    console.error("Error processing shapefile:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to process shapefile");
  }
}
function cleanGeoJSON(geoJSON) {
  const cleanedFeatures = geoJSON.features.map((feature) => ({
    ...feature,
    properties: {
      ...feature.properties || {},
      _id: void 0,
      id: void 0,
      ...Object.fromEntries(
        Object.entries(feature.properties || {}).filter(
          ([key]) => !key.startsWith("_") && !key.includes("password") && !key.includes("secret")
        )
      )
    }
  }));
  return {
    type: "FeatureCollection",
    features: cleanedFeatures
  };
}
function ShorelinePage() {
  const navigate = useNavigate();
  const [geoJSON, setGeoJSON] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [fileName, setFileName] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const handleFileProcess = reactExports.useCallback(async (file) => {
    if (!file) return;
    setError(null);
    setLoading(true);
    setGeoJSON(null);
    setFileName(null);
    try {
      const result = await processShapefile(file);
      setGeoJSON(result.geoJSON);
      setFileName(file.name);
      console.log("Shapefile processed successfully.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to process shapefile. Ensure it is a valid ZIP containing required .shp, .shx, and .dbf files.";
      setError(message);
      console.error("Error processing shapefile:", err);
    } finally {
      setLoading(false);
    }
  }, []);
  const handleFileChange = (e) => {
    handleFileProcess(e.target.files?.[0] ?? null);
    e.target.value = "";
  };
  const handleDrop = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
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
  const handleRemoveFile = () => {
    setGeoJSON(null);
    setFileName(null);
    setError(null);
  };
  const handleContinue = async () => {
    if (!geoJSON) return;
    setLoading(true);
    setError(null);
    try {
      const shorelineId = "current-shoreline";
      await indexedDBService.storeShorelineData(shorelineId, geoJSON);
      console.log("Shoreline data stored in IndexedDB.");
      navigate("/segmentation");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save shoreline data. Please try again.";
      setError(message);
      console.error("Error storing shoreline data:", err);
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold text-primary-900 tracking-tight", children: "1. Upload Shoreline Data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg text-gray-600", children: "Begin by uploading your shoreline data as a zipped Shapefile (.zip)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorAlert, { message: error, onClose: () => setError(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 mb-8 bg-white p-8 rounded-lg shadow-md border border-gray-200", children: [
      !fileName && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                id: "shapefile",
                accept: ".zip,application/zip,application/x-zip-compressed",
                onChange: handleFileChange,
                className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                disabled: loading
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "mx-auto h-12 w-12 text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 block text-sm font-medium text-gray-900", children: "Drag & drop your zipped shapefile here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-gray-500", children: "or click to browse files" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-4 block text-xs text-gray-500", children: "Must be a .zip containing .shp, .shx, and .dbf files. Max 50MB." })
          ]
        }
      ),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700", children: "Processing file..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "This may take a moment for larger files." })
      ] }),
      !loading && fileName && geoJSON && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 px-4 bg-green-50 border border-green-200 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "mx-auto h-12 w-12 text-green-500 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-green-800 mb-1", children: "File processed successfully!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center text-xs text-gray-600 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "w-4 h-4 mr-1.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-xs", children: fileName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleRemoveFile,
            className: "inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$3, { className: "w-4 h-4 mr-1.5 text-gray-500" }),
              "Remove and Upload New File"
            ]
          }
        )
      ] })
    ] }),
    geoJSON && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Shoreline Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-100 rounded-lg shadow-inner border border-gray-200 overflow-hidden h-96", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Map,
        {
          geoJSON,
          segments: [],
          parameters: [],
          selectedParameter: null,
          selectedSegments: [],
          selectionPolygons: [],
          onSegmentSelect: () => {
          },
          onSelectionDelete: () => {
          },
          onAreaSelect: () => {
          },
          isEditing: false
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleContinue,
        disabled: loading || !geoJSON,
        className: "inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        title: !geoJSON ? "Upload a shapefile first" : "Proceed to segment the shoreline",
        children: loading && !geoJSON ? "Processing..." : loading && geoJSON ? "Saving..." : "Continue to Segmentation"
      }
    ) })
  ] });
}
export {
  ShorelinePage as default
};
//# sourceMappingURL=ShorelinePage-CeJ9IkbK.js.map
