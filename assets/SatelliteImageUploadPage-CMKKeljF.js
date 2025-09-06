const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/raw-CQeAqXQw.js","assets/basedecoder-RlaJh0FT.js","assets/lzw-kmdQUqnI.js","assets/jpeg-CSNja8bo.js","assets/deflate-DlMz3x58.js","assets/pako.esm-ByZNE5QS.js","assets/packbits-Ds9W8fyQ.js","assets/lerc-CaWUXXDU.js","assets/index-OGmXEiPu.js","assets/index-Cj-sxlKB.css","assets/georaster.browser.bundle.min-DTXAUKPf.js","assets/indexedDBService-6nGGrobl.js","assets/ErrorAlert-DJAxFQVn.js","assets/ArrowUpTrayIcon-Bj9VK4d3.js","assets/PhotoIcon-DIEK_dBz.js","assets/XCircleIcon-D4MNRGzI.js","assets/ArrowLeftIcon-DWgRlps3.js","assets/ArrowRightIcon-DXPWG9X6.js","assets/webimage-d8IPIyfb.js"])))=>i.map(i=>d[i]);
import { g as getDefaultExportFromCjs, _ as __vitePreload, u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-OGmXEiPu.js";
import { a as georaster_browser_bundle_minExports } from "./georaster.browser.bundle.min-DTXAUKPf.js";
import { i as indexedDBService } from "./indexedDBService-6nGGrobl.js";
import { E as ErrorAlert } from "./ErrorAlert-DJAxFQVn.js";
import { F as ForwardRef } from "./ArrowUpTrayIcon-Bj9VK4d3.js";
import { F as ForwardRef$1 } from "./PhotoIcon-DIEK_dBz.js";
import { F as ForwardRef$2 } from "./XCircleIcon-D4MNRGzI.js";
import { F as ForwardRef$3 } from "./ArrowLeftIcon-DWgRlps3.js";
import { F as ForwardRef$4 } from "./ArrowRightIcon-DXPWG9X6.js";
function uncurryThis(target) {
  return (thisArg, ...args) => {
    return ReflectApply(target, thisArg, args);
  };
}
function uncurryThisGetter(target, key) {
  return uncurryThis(
    ReflectGetOwnPropertyDescriptor(
      target,
      key
    ).get
  );
}
const {
  apply: ReflectApply,
  getOwnPropertyDescriptor: ReflectGetOwnPropertyDescriptor,
  getPrototypeOf: ReflectGetPrototypeOf,
  ownKeys: ReflectOwnKeys
} = Reflect;
const {
  iterator: SymbolIterator,
  toStringTag: SymbolToStringTag
} = Symbol;
const NativeObject = Object;
const {
  create: ObjectCreate,
  defineProperty: ObjectDefineProperty
} = NativeObject;
const NativeArray = Array;
const ArrayPrototype = NativeArray.prototype;
const NativeArrayPrototypeSymbolIterator = ArrayPrototype[SymbolIterator];
const ArrayPrototypeSymbolIterator = uncurryThis(NativeArrayPrototypeSymbolIterator);
const NativeArrayBuffer = ArrayBuffer;
const ArrayBufferPrototype = NativeArrayBuffer.prototype;
uncurryThisGetter(ArrayBufferPrototype, "byteLength");
const NativeSharedArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : null;
NativeSharedArrayBuffer && uncurryThisGetter(NativeSharedArrayBuffer.prototype, "byteLength");
const TypedArray = ReflectGetPrototypeOf(Uint8Array);
TypedArray.from;
const TypedArrayPrototype = TypedArray.prototype;
TypedArrayPrototype[SymbolIterator];
uncurryThis(TypedArrayPrototype.keys);
uncurryThis(
  TypedArrayPrototype.values
);
uncurryThis(
  TypedArrayPrototype.entries
);
uncurryThis(TypedArrayPrototype.set);
uncurryThis(
  TypedArrayPrototype.reverse
);
uncurryThis(TypedArrayPrototype.fill);
uncurryThis(
  TypedArrayPrototype.copyWithin
);
uncurryThis(TypedArrayPrototype.sort);
uncurryThis(TypedArrayPrototype.slice);
uncurryThis(
  TypedArrayPrototype.subarray
);
uncurryThisGetter(
  TypedArrayPrototype,
  "buffer"
);
uncurryThisGetter(
  TypedArrayPrototype,
  "byteOffset"
);
uncurryThisGetter(
  TypedArrayPrototype,
  "length"
);
uncurryThisGetter(
  TypedArrayPrototype,
  SymbolToStringTag
);
const NativeUint8Array = Uint8Array;
const NativeUint16Array = Uint16Array;
const NativeUint32Array = Uint32Array;
const NativeFloat32Array = Float32Array;
const ArrayIteratorPrototype = ReflectGetPrototypeOf([][SymbolIterator]());
const ArrayIteratorPrototypeNext = uncurryThis(ArrayIteratorPrototype.next);
const GeneratorPrototypeNext = uncurryThis((function* () {
})().next);
const IteratorPrototype = ReflectGetPrototypeOf(ArrayIteratorPrototype);
const DataViewPrototype = DataView.prototype;
const DataViewPrototypeGetUint16 = uncurryThis(
  DataViewPrototype.getUint16
);
const NativeWeakMap = WeakMap;
const WeakMapPrototype = NativeWeakMap.prototype;
const WeakMapPrototypeGet = uncurryThis(WeakMapPrototype.get);
const WeakMapPrototypeSet = uncurryThis(WeakMapPrototype.set);
const arrayIterators = new NativeWeakMap();
const SafeIteratorPrototype = ObjectCreate(null, {
  next: {
    value: function next() {
      const arrayIterator = WeakMapPrototypeGet(arrayIterators, this);
      return ArrayIteratorPrototypeNext(arrayIterator);
    }
  },
  [SymbolIterator]: {
    value: function values() {
      return this;
    }
  }
});
function safeIfNeeded(array) {
  if (array[SymbolIterator] === NativeArrayPrototypeSymbolIterator && ArrayIteratorPrototype.next === ArrayIteratorPrototypeNext) {
    return array;
  }
  const safe = ObjectCreate(SafeIteratorPrototype);
  WeakMapPrototypeSet(arrayIterators, safe, ArrayPrototypeSymbolIterator(array));
  return safe;
}
const generators = new NativeWeakMap();
const DummyArrayIteratorPrototype = ObjectCreate(IteratorPrototype, {
  next: {
    value: function next2() {
      const generator = WeakMapPrototypeGet(generators, this);
      return GeneratorPrototypeNext(generator);
    },
    writable: true,
    configurable: true
  }
});
for (const key of ReflectOwnKeys(ArrayIteratorPrototype)) {
  if (key === "next") {
    continue;
  }
  ObjectDefineProperty(DummyArrayIteratorPrototype, key, ReflectGetOwnPropertyDescriptor(ArrayIteratorPrototype, key));
}
const buffer = new NativeArrayBuffer(4);
const floatView = new NativeFloat32Array(buffer);
const uint32View = new NativeUint32Array(buffer);
const baseTable = new NativeUint16Array(512);
const shiftTable = new NativeUint8Array(512);
for (let i = 0; i < 256; ++i) {
  const e = i - 127;
  if (e < -24) {
    baseTable[i] = 0;
    baseTable[i | 256] = 32768;
    shiftTable[i] = 24;
    shiftTable[i | 256] = 24;
  } else if (e < -14) {
    baseTable[i] = 1024 >> -e - 14;
    baseTable[i | 256] = 1024 >> -e - 14 | 32768;
    shiftTable[i] = -e - 1;
    shiftTable[i | 256] = -e - 1;
  } else if (e <= 15) {
    baseTable[i] = e + 15 << 10;
    baseTable[i | 256] = e + 15 << 10 | 32768;
    shiftTable[i] = 13;
    shiftTable[i | 256] = 13;
  } else if (e < 128) {
    baseTable[i] = 31744;
    baseTable[i | 256] = 64512;
    shiftTable[i] = 24;
    shiftTable[i | 256] = 24;
  } else {
    baseTable[i] = 31744;
    baseTable[i | 256] = 64512;
    shiftTable[i] = 13;
    shiftTable[i | 256] = 13;
  }
}
const mantissaTable = new NativeUint32Array(2048);
for (let i = 1; i < 1024; ++i) {
  let m = i << 13;
  let e = 0;
  while ((m & 8388608) === 0) {
    m <<= 1;
    e -= 8388608;
  }
  m &= -8388609;
  e += 947912704;
  mantissaTable[i] = m | e;
}
for (let i = 1024; i < 2048; ++i) {
  mantissaTable[i] = 939524096 + (i - 1024 << 13);
}
const exponentTable = new NativeUint32Array(64);
for (let i = 1; i < 31; ++i) {
  exponentTable[i] = i << 23;
}
exponentTable[31] = 1199570944;
exponentTable[32] = 2147483648;
for (let i = 33; i < 63; ++i) {
  exponentTable[i] = 2147483648 + (i - 32 << 23);
}
exponentTable[63] = 3347054592;
const offsetTable = new NativeUint16Array(64);
for (let i = 1; i < 64; ++i) {
  if (i !== 32) {
    offsetTable[i] = 1024;
  }
}
function convertToNumber(float16bits) {
  const i = float16bits >> 10;
  uint32View[0] = mantissaTable[offsetTable[i] + (float16bits & 1023)] + exponentTable[i];
  return floatView[0];
}
function getFloat16(dataView, byteOffset, ...opts) {
  return convertToNumber(
    DataViewPrototypeGetUint16(dataView, byteOffset, ...safeIfNeeded(opts))
  );
}
var getAttribute$1 = { exports: {} };
var hasRequiredGetAttribute;
function requireGetAttribute() {
  if (hasRequiredGetAttribute) return getAttribute$1.exports;
  hasRequiredGetAttribute = 1;
  function getAttribute2(tag, attributeName, options) {
    const debug = options && options.debug || false;
    if (debug) console.log("[xml-utils] getting " + attributeName + " in " + tag);
    const xml = typeof tag === "object" ? tag.outer : tag;
    const opening = xml.slice(0, xml.indexOf(">") + 1);
    const quotechars = ['"', "'"];
    for (let i = 0; i < quotechars.length; i++) {
      const char = quotechars[i];
      const pattern = attributeName + "\\=" + char + "([^" + char + "]*)" + char;
      if (debug) console.log("[xml-utils] pattern:", pattern);
      const re = new RegExp(pattern);
      const match = re.exec(opening);
      if (debug) console.log("[xml-utils] match:", match);
      if (match) return match[1];
    }
  }
  getAttribute$1.exports = getAttribute2;
  getAttribute$1.exports.default = getAttribute2;
  return getAttribute$1.exports;
}
var getAttributeExports = requireGetAttribute();
const getAttribute = /* @__PURE__ */ getDefaultExportFromCjs(getAttributeExports);
var findTagsByName$1 = { exports: {} };
var findTagByName = { exports: {} };
var indexOfMatch = { exports: {} };
var hasRequiredIndexOfMatch;
function requireIndexOfMatch() {
  if (hasRequiredIndexOfMatch) return indexOfMatch.exports;
  hasRequiredIndexOfMatch = 1;
  function indexOfMatch$1(xml, pattern, startIndex) {
    const re = new RegExp(pattern);
    const match = re.exec(xml.slice(startIndex));
    if (match) return startIndex + match.index;
    else return -1;
  }
  indexOfMatch.exports = indexOfMatch$1;
  indexOfMatch.exports.default = indexOfMatch$1;
  return indexOfMatch.exports;
}
var indexOfMatchEnd = { exports: {} };
var hasRequiredIndexOfMatchEnd;
function requireIndexOfMatchEnd() {
  if (hasRequiredIndexOfMatchEnd) return indexOfMatchEnd.exports;
  hasRequiredIndexOfMatchEnd = 1;
  function indexOfMatchEnd$1(xml, pattern, startIndex) {
    const re = new RegExp(pattern);
    const match = re.exec(xml.slice(startIndex));
    if (match) return startIndex + match.index + match[0].length - 1;
    else return -1;
  }
  indexOfMatchEnd.exports = indexOfMatchEnd$1;
  indexOfMatchEnd.exports.default = indexOfMatchEnd$1;
  return indexOfMatchEnd.exports;
}
var countSubstring = { exports: {} };
var hasRequiredCountSubstring;
function requireCountSubstring() {
  if (hasRequiredCountSubstring) return countSubstring.exports;
  hasRequiredCountSubstring = 1;
  function countSubstring$1(string, substring) {
    const pattern = new RegExp(substring, "g");
    const match = string.match(pattern);
    return match ? match.length : 0;
  }
  countSubstring.exports = countSubstring$1;
  countSubstring.exports.default = countSubstring$1;
  return countSubstring.exports;
}
var hasRequiredFindTagByName;
function requireFindTagByName() {
  if (hasRequiredFindTagByName) return findTagByName.exports;
  hasRequiredFindTagByName = 1;
  const indexOfMatch2 = requireIndexOfMatch();
  const indexOfMatchEnd2 = requireIndexOfMatchEnd();
  const countSubstring2 = requireCountSubstring();
  function findTagByName$1(xml, tagName, options) {
    const debug = options && options.debug || false;
    const nested = !(options && typeof options.nested === false);
    const startIndex = options && options.startIndex || 0;
    if (debug) console.log("[xml-utils] starting findTagByName with", tagName, " and ", options);
    const start = indexOfMatch2(xml, `<${tagName}[ 
>/]`, startIndex);
    if (debug) console.log("[xml-utils] start:", start);
    if (start === -1) return void 0;
    const afterStart = xml.slice(start + tagName.length);
    let relativeEnd = indexOfMatchEnd2(afterStart, "^[^<]*[ /]>", 0);
    const selfClosing = relativeEnd !== -1 && afterStart[relativeEnd - 1] === "/";
    if (debug) console.log("[xml-utils] selfClosing:", selfClosing);
    if (selfClosing === false) {
      if (nested) {
        let startIndex2 = 0;
        let openings = 1;
        let closings = 0;
        while ((relativeEnd = indexOfMatchEnd2(afterStart, "[ /]" + tagName + ">", startIndex2)) !== -1) {
          const clip = afterStart.substring(startIndex2, relativeEnd + 1);
          openings += countSubstring2(clip, "<" + tagName + "[ \n	>]");
          closings += countSubstring2(clip, "</" + tagName + ">");
          if (closings >= openings) break;
          startIndex2 = relativeEnd;
        }
      } else {
        relativeEnd = indexOfMatchEnd2(afterStart, "[ /]" + tagName + ">", 0);
      }
    }
    const end = start + tagName.length + relativeEnd + 1;
    if (debug) console.log("[xml-utils] end:", end);
    if (end === -1) return void 0;
    const outer = xml.slice(start, end);
    let inner;
    if (selfClosing) {
      inner = null;
    } else {
      inner = outer.slice(outer.indexOf(">") + 1, outer.lastIndexOf("<"));
    }
    return { inner, outer, start, end };
  }
  findTagByName.exports = findTagByName$1;
  findTagByName.exports.default = findTagByName$1;
  return findTagByName.exports;
}
var hasRequiredFindTagsByName;
function requireFindTagsByName() {
  if (hasRequiredFindTagsByName) return findTagsByName$1.exports;
  hasRequiredFindTagsByName = 1;
  const findTagByName2 = requireFindTagByName();
  function findTagsByName2(xml, tagName, options) {
    const tags = [];
    const debug = options && options.debug || false;
    const nested = options && typeof options.nested === "boolean" ? options.nested : true;
    let startIndex = options && options.startIndex || 0;
    let tag;
    while (tag = findTagByName2(xml, tagName, { debug, startIndex })) {
      if (nested) {
        startIndex = tag.start + 1 + tagName.length;
      } else {
        startIndex = tag.end;
      }
      tags.push(tag);
    }
    if (debug) console.log("findTagsByName found", tags.length, "tags");
    return tags;
  }
  findTagsByName$1.exports = findTagsByName2;
  findTagsByName$1.exports.default = findTagsByName2;
  return findTagsByName$1.exports;
}
var findTagsByNameExports = requireFindTagsByName();
const findTagsByName = /* @__PURE__ */ getDefaultExportFromCjs(findTagsByNameExports);
const fieldTagNames = {
  // TIFF Baseline
  315: "Artist",
  258: "BitsPerSample",
  265: "CellLength",
  264: "CellWidth",
  320: "ColorMap",
  259: "Compression",
  33432: "Copyright",
  306: "DateTime",
  338: "ExtraSamples",
  266: "FillOrder",
  289: "FreeByteCounts",
  288: "FreeOffsets",
  291: "GrayResponseCurve",
  290: "GrayResponseUnit",
  316: "HostComputer",
  270: "ImageDescription",
  257: "ImageLength",
  256: "ImageWidth",
  271: "Make",
  281: "MaxSampleValue",
  280: "MinSampleValue",
  272: "Model",
  254: "NewSubfileType",
  274: "Orientation",
  262: "PhotometricInterpretation",
  284: "PlanarConfiguration",
  296: "ResolutionUnit",
  278: "RowsPerStrip",
  277: "SamplesPerPixel",
  305: "Software",
  279: "StripByteCounts",
  273: "StripOffsets",
  255: "SubfileType",
  263: "Threshholding",
  282: "XResolution",
  283: "YResolution",
  // TIFF Extended
  326: "BadFaxLines",
  327: "CleanFaxData",
  343: "ClipPath",
  328: "ConsecutiveBadFaxLines",
  433: "Decode",
  434: "DefaultImageColor",
  269: "DocumentName",
  336: "DotRange",
  321: "HalftoneHints",
  346: "Indexed",
  347: "JPEGTables",
  285: "PageName",
  297: "PageNumber",
  317: "Predictor",
  319: "PrimaryChromaticities",
  532: "ReferenceBlackWhite",
  339: "SampleFormat",
  340: "SMinSampleValue",
  341: "SMaxSampleValue",
  559: "StripRowCounts",
  330: "SubIFDs",
  292: "T4Options",
  293: "T6Options",
  325: "TileByteCounts",
  323: "TileLength",
  324: "TileOffsets",
  322: "TileWidth",
  301: "TransferFunction",
  318: "WhitePoint",
  344: "XClipPathUnits",
  286: "XPosition",
  529: "YCbCrCoefficients",
  531: "YCbCrPositioning",
  530: "YCbCrSubSampling",
  345: "YClipPathUnits",
  287: "YPosition",
  // EXIF
  37378: "ApertureValue",
  40961: "ColorSpace",
  36868: "DateTimeDigitized",
  36867: "DateTimeOriginal",
  34665: "Exif IFD",
  36864: "ExifVersion",
  33434: "ExposureTime",
  41728: "FileSource",
  37385: "Flash",
  40960: "FlashpixVersion",
  33437: "FNumber",
  42016: "ImageUniqueID",
  37384: "LightSource",
  37500: "MakerNote",
  37377: "ShutterSpeedValue",
  37510: "UserComment",
  // IPTC
  33723: "IPTC",
  // ICC
  34675: "ICC Profile",
  // XMP
  700: "XMP",
  // GDAL
  42112: "GDAL_METADATA",
  42113: "GDAL_NODATA",
  // Photoshop
  34377: "Photoshop",
  // GeoTiff
  33550: "ModelPixelScale",
  33922: "ModelTiepoint",
  34264: "ModelTransformation",
  34735: "GeoKeyDirectory",
  34736: "GeoDoubleParams",
  34737: "GeoAsciiParams",
  // LERC
  50674: "LercParameters"
};
const fieldTags = {};
for (const key in fieldTagNames) {
  if (fieldTagNames.hasOwnProperty(key)) {
    fieldTags[fieldTagNames[key]] = parseInt(key, 10);
  }
}
const arrayFields = [
  fieldTags.BitsPerSample,
  fieldTags.ExtraSamples,
  fieldTags.SampleFormat,
  fieldTags.StripByteCounts,
  fieldTags.StripOffsets,
  fieldTags.StripRowCounts,
  fieldTags.TileByteCounts,
  fieldTags.TileOffsets,
  fieldTags.SubIFDs
];
const fieldTypeNames = {
  1: "BYTE",
  2: "ASCII",
  3: "SHORT",
  4: "LONG",
  5: "RATIONAL",
  6: "SBYTE",
  7: "UNDEFINED",
  8: "SSHORT",
  9: "SLONG",
  10: "SRATIONAL",
  11: "FLOAT",
  12: "DOUBLE",
  // IFD offset, suggested by https://owl.phy.queensu.ca/~phil/exiftool/standards.html
  13: "IFD",
  // introduced by BigTIFF
  16: "LONG8",
  17: "SLONG8",
  18: "IFD8"
};
const fieldTypes = {};
for (const key in fieldTypeNames) {
  if (fieldTypeNames.hasOwnProperty(key)) {
    fieldTypes[fieldTypeNames[key]] = parseInt(key, 10);
  }
}
const photometricInterpretations = {
  WhiteIsZero: 0,
  BlackIsZero: 1,
  RGB: 2,
  Palette: 3,
  CMYK: 5,
  YCbCr: 6,
  CIELab: 8
};
const ExtraSamplesValues = {
  Unspecified: 0
};
const LercParameters = {
  AddCompression: 1
};
const LercAddCompression = {
  None: 0,
  Deflate: 1,
  Zstandard: 2
};
const geoKeyNames = {
  1024: "GTModelTypeGeoKey",
  1025: "GTRasterTypeGeoKey",
  1026: "GTCitationGeoKey",
  2048: "GeographicTypeGeoKey",
  2049: "GeogCitationGeoKey",
  2050: "GeogGeodeticDatumGeoKey",
  2051: "GeogPrimeMeridianGeoKey",
  2052: "GeogLinearUnitsGeoKey",
  2053: "GeogLinearUnitSizeGeoKey",
  2054: "GeogAngularUnitsGeoKey",
  2055: "GeogAngularUnitSizeGeoKey",
  2056: "GeogEllipsoidGeoKey",
  2057: "GeogSemiMajorAxisGeoKey",
  2058: "GeogSemiMinorAxisGeoKey",
  2059: "GeogInvFlatteningGeoKey",
  2060: "GeogAzimuthUnitsGeoKey",
  2061: "GeogPrimeMeridianLongGeoKey",
  2062: "GeogTOWGS84GeoKey",
  3072: "ProjectedCSTypeGeoKey",
  3073: "PCSCitationGeoKey",
  3074: "ProjectionGeoKey",
  3075: "ProjCoordTransGeoKey",
  3076: "ProjLinearUnitsGeoKey",
  3077: "ProjLinearUnitSizeGeoKey",
  3078: "ProjStdParallel1GeoKey",
  3079: "ProjStdParallel2GeoKey",
  3080: "ProjNatOriginLongGeoKey",
  3081: "ProjNatOriginLatGeoKey",
  3082: "ProjFalseEastingGeoKey",
  3083: "ProjFalseNorthingGeoKey",
  3084: "ProjFalseOriginLongGeoKey",
  3085: "ProjFalseOriginLatGeoKey",
  3086: "ProjFalseOriginEastingGeoKey",
  3087: "ProjFalseOriginNorthingGeoKey",
  3088: "ProjCenterLongGeoKey",
  3089: "ProjCenterLatGeoKey",
  3090: "ProjCenterEastingGeoKey",
  3091: "ProjCenterNorthingGeoKey",
  3092: "ProjScaleAtNatOriginGeoKey",
  3093: "ProjScaleAtCenterGeoKey",
  3094: "ProjAzimuthAngleGeoKey",
  3095: "ProjStraightVertPoleLongGeoKey",
  3096: "ProjRectifiedGridAngleGeoKey",
  4096: "VerticalCSTypeGeoKey",
  4097: "VerticalCitationGeoKey",
  4098: "VerticalDatumGeoKey",
  4099: "VerticalUnitsGeoKey"
};
function fromWhiteIsZero(raster, max) {
  const { width, height } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  let value;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    value = 256 - raster[i] / max * 256;
    rgbRaster[j] = value;
    rgbRaster[j + 1] = value;
    rgbRaster[j + 2] = value;
  }
  return rgbRaster;
}
function fromBlackIsZero(raster, max) {
  const { width, height } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  let value;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    value = raster[i] / max * 256;
    rgbRaster[j] = value;
    rgbRaster[j + 1] = value;
    rgbRaster[j + 2] = value;
  }
  return rgbRaster;
}
function fromPalette(raster, colorMap) {
  const { width, height } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  const greenOffset = colorMap.length / 3;
  const blueOffset = colorMap.length / 3 * 2;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    const mapIndex = raster[i];
    rgbRaster[j] = colorMap[mapIndex] / 65536 * 256;
    rgbRaster[j + 1] = colorMap[mapIndex + greenOffset] / 65536 * 256;
    rgbRaster[j + 2] = colorMap[mapIndex + blueOffset] / 65536 * 256;
  }
  return rgbRaster;
}
function fromCMYK(cmykRaster) {
  const { width, height } = cmykRaster;
  const rgbRaster = new Uint8Array(width * height * 3);
  for (let i = 0, j = 0; i < cmykRaster.length; i += 4, j += 3) {
    const c = cmykRaster[i];
    const m = cmykRaster[i + 1];
    const y = cmykRaster[i + 2];
    const k = cmykRaster[i + 3];
    rgbRaster[j] = 255 * ((255 - c) / 256) * ((255 - k) / 256);
    rgbRaster[j + 1] = 255 * ((255 - m) / 256) * ((255 - k) / 256);
    rgbRaster[j + 2] = 255 * ((255 - y) / 256) * ((255 - k) / 256);
  }
  return rgbRaster;
}
function fromYCbCr(yCbCrRaster) {
  const { width, height } = yCbCrRaster;
  const rgbRaster = new Uint8ClampedArray(width * height * 3);
  for (let i = 0, j = 0; i < yCbCrRaster.length; i += 3, j += 3) {
    const y = yCbCrRaster[i];
    const cb = yCbCrRaster[i + 1];
    const cr = yCbCrRaster[i + 2];
    rgbRaster[j] = y + 1.402 * (cr - 128);
    rgbRaster[j + 1] = y - 0.34414 * (cb - 128) - 0.71414 * (cr - 128);
    rgbRaster[j + 2] = y + 1.772 * (cb - 128);
  }
  return rgbRaster;
}
const Xn = 0.95047;
const Yn = 1;
const Zn = 1.08883;
function fromCIELab(cieLabRaster) {
  const { width, height } = cieLabRaster;
  const rgbRaster = new Uint8Array(width * height * 3);
  for (let i = 0, j = 0; i < cieLabRaster.length; i += 3, j += 3) {
    const L = cieLabRaster[i + 0];
    const a_ = cieLabRaster[i + 1] << 24 >> 24;
    const b_ = cieLabRaster[i + 2] << 24 >> 24;
    let y = (L + 16) / 116;
    let x = a_ / 500 + y;
    let z = y - b_ / 200;
    let r;
    let g;
    let b;
    x = Xn * (x * x * x > 8856e-6 ? x * x * x : (x - 16 / 116) / 7.787);
    y = Yn * (y * y * y > 8856e-6 ? y * y * y : (y - 16 / 116) / 7.787);
    z = Zn * (z * z * z > 8856e-6 ? z * z * z : (z - 16 / 116) / 7.787);
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : 12.92 * r;
    g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : 12.92 * g;
    b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : 12.92 * b;
    rgbRaster[j] = Math.max(0, Math.min(1, r)) * 255;
    rgbRaster[j + 1] = Math.max(0, Math.min(1, g)) * 255;
    rgbRaster[j + 2] = Math.max(0, Math.min(1, b)) * 255;
  }
  return rgbRaster;
}
const registry = /* @__PURE__ */ new Map();
function addDecoder(cases, importFn) {
  if (!Array.isArray(cases)) {
    cases = [cases];
  }
  cases.forEach((c) => registry.set(c, importFn));
}
async function getDecoder(fileDirectory) {
  const importFn = registry.get(fileDirectory.Compression);
  if (!importFn) {
    throw new Error(`Unknown compression method identifier: ${fileDirectory.Compression}`);
  }
  const Decoder = await importFn();
  return new Decoder(fileDirectory);
}
addDecoder([void 0, 1], () => __vitePreload(() => import("./raw-CQeAqXQw.js"), true ? __vite__mapDeps([0,1]) : void 0).then((m) => m.default));
addDecoder(5, () => __vitePreload(() => import("./lzw-kmdQUqnI.js"), true ? __vite__mapDeps([2,1]) : void 0).then((m) => m.default));
addDecoder(6, () => {
  throw new Error("old style JPEG compression is not supported.");
});
addDecoder(7, () => __vitePreload(() => import("./jpeg-CSNja8bo.js"), true ? __vite__mapDeps([3,1]) : void 0).then((m) => m.default));
addDecoder([8, 32946], () => __vitePreload(() => import("./deflate-DlMz3x58.js"), true ? __vite__mapDeps([4,5,1]) : void 0).then((m) => m.default));
addDecoder(32773, () => __vitePreload(() => import("./packbits-Ds9W8fyQ.js"), true ? __vite__mapDeps([6,1]) : void 0).then((m) => m.default));
addDecoder(
  34887,
  () => __vitePreload(() => import("./lerc-CaWUXXDU.js"), true ? __vite__mapDeps([7,5,8,9,1,10,11,12,13,14,15,16,17]) : void 0).then(async (m) => {
    await m.zstd.init();
    return m;
  }).then((m) => m.default)
);
addDecoder(50001, () => __vitePreload(() => import("./webimage-d8IPIyfb.js"), true ? __vite__mapDeps([18,1]) : void 0).then((m) => m.default));
function copyNewSize(array, width, height, samplesPerPixel = 1) {
  return new (Object.getPrototypeOf(array)).constructor(width * height * samplesPerPixel);
}
function resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  return valueArrays.map((array) => {
    const newArray = copyNewSize(array, outWidth, outHeight);
    for (let y = 0; y < outHeight; ++y) {
      const cy = Math.min(Math.round(relY * y), inHeight - 1);
      for (let x = 0; x < outWidth; ++x) {
        const cx = Math.min(Math.round(relX * x), inWidth - 1);
        const value = array[cy * inWidth + cx];
        newArray[y * outWidth + x] = value;
      }
    }
    return newArray;
  });
}
function lerp(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
}
function resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  return valueArrays.map((array) => {
    const newArray = copyNewSize(array, outWidth, outHeight);
    for (let y = 0; y < outHeight; ++y) {
      const rawY = relY * y;
      const yl = Math.floor(rawY);
      const yh = Math.min(Math.ceil(rawY), inHeight - 1);
      for (let x = 0; x < outWidth; ++x) {
        const rawX = relX * x;
        const tx = rawX % 1;
        const xl = Math.floor(rawX);
        const xh = Math.min(Math.ceil(rawX), inWidth - 1);
        const ll = array[yl * inWidth + xl];
        const hl = array[yl * inWidth + xh];
        const lh = array[yh * inWidth + xl];
        const hh = array[yh * inWidth + xh];
        const value = lerp(
          lerp(ll, hl, tx),
          lerp(lh, hh, tx),
          rawY % 1
        );
        newArray[y * outWidth + x] = value;
      }
    }
    return newArray;
  });
}
function resample(valueArrays, inWidth, inHeight, outWidth, outHeight, method = "nearest") {
  switch (method.toLowerCase()) {
    case "nearest":
      return resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight);
    case "bilinear":
    case "linear":
      return resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight);
    default:
      throw new Error(`Unsupported resampling method: '${method}'`);
  }
}
function resampleNearestInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);
  for (let y = 0; y < outHeight; ++y) {
    const cy = Math.min(Math.round(relY * y), inHeight - 1);
    for (let x = 0; x < outWidth; ++x) {
      const cx = Math.min(Math.round(relX * x), inWidth - 1);
      for (let i = 0; i < samples; ++i) {
        const value = valueArray[cy * inWidth * samples + cx * samples + i];
        newArray[y * outWidth * samples + x * samples + i] = value;
      }
    }
  }
  return newArray;
}
function resampleBilinearInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);
  for (let y = 0; y < outHeight; ++y) {
    const rawY = relY * y;
    const yl = Math.floor(rawY);
    const yh = Math.min(Math.ceil(rawY), inHeight - 1);
    for (let x = 0; x < outWidth; ++x) {
      const rawX = relX * x;
      const tx = rawX % 1;
      const xl = Math.floor(rawX);
      const xh = Math.min(Math.ceil(rawX), inWidth - 1);
      for (let i = 0; i < samples; ++i) {
        const ll = valueArray[yl * inWidth * samples + xl * samples + i];
        const hl = valueArray[yl * inWidth * samples + xh * samples + i];
        const lh = valueArray[yh * inWidth * samples + xl * samples + i];
        const hh = valueArray[yh * inWidth * samples + xh * samples + i];
        const value = lerp(
          lerp(ll, hl, tx),
          lerp(lh, hh, tx),
          rawY % 1
        );
        newArray[y * outWidth * samples + x * samples + i] = value;
      }
    }
  }
  return newArray;
}
function resampleInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples, method = "nearest") {
  switch (method.toLowerCase()) {
    case "nearest":
      return resampleNearestInterleaved(
        valueArray,
        inWidth,
        inHeight,
        outWidth,
        outHeight,
        samples
      );
    case "bilinear":
    case "linear":
      return resampleBilinearInterleaved(
        valueArray,
        inWidth,
        inHeight,
        outWidth,
        outHeight,
        samples
      );
    default:
      throw new Error(`Unsupported resampling method: '${method}'`);
  }
}
function sum(array, start, end) {
  let s = 0;
  for (let i = start; i < end; ++i) {
    s += array[i];
  }
  return s;
}
function arrayForType(format, bitsPerSample, size) {
  switch (format) {
    case 1:
      if (bitsPerSample <= 8) {
        return new Uint8Array(size);
      } else if (bitsPerSample <= 16) {
        return new Uint16Array(size);
      } else if (bitsPerSample <= 32) {
        return new Uint32Array(size);
      }
      break;
    case 2:
      if (bitsPerSample === 8) {
        return new Int8Array(size);
      } else if (bitsPerSample === 16) {
        return new Int16Array(size);
      } else if (bitsPerSample === 32) {
        return new Int32Array(size);
      }
      break;
    case 3:
      switch (bitsPerSample) {
        case 16:
        case 32:
          return new Float32Array(size);
        case 64:
          return new Float64Array(size);
      }
      break;
  }
  throw Error("Unsupported data format/bitsPerSample");
}
function needsNormalization(format, bitsPerSample) {
  if ((format === 1 || format === 2) && bitsPerSample <= 32 && bitsPerSample % 8 === 0) {
    return false;
  } else if (format === 3 && (bitsPerSample === 16 || bitsPerSample === 32 || bitsPerSample === 64)) {
    return false;
  }
  return true;
}
function normalizeArray(inBuffer, format, planarConfiguration, samplesPerPixel, bitsPerSample, tileWidth, tileHeight) {
  const view = new DataView(inBuffer);
  const outSize = planarConfiguration === 2 ? tileHeight * tileWidth : tileHeight * tileWidth * samplesPerPixel;
  const samplesToTransfer = planarConfiguration === 2 ? 1 : samplesPerPixel;
  const outArray = arrayForType(format, bitsPerSample, outSize);
  const bitMask = parseInt("1".repeat(bitsPerSample), 2);
  if (format === 1) {
    let pixelBitSkip;
    if (planarConfiguration === 1) {
      pixelBitSkip = samplesPerPixel * bitsPerSample;
    } else {
      pixelBitSkip = bitsPerSample;
    }
    let bitsPerLine = tileWidth * pixelBitSkip;
    if ((bitsPerLine & 7) !== 0) {
      bitsPerLine = bitsPerLine + 7 & -8;
    }
    for (let y = 0; y < tileHeight; ++y) {
      const lineBitOffset = y * bitsPerLine;
      for (let x = 0; x < tileWidth; ++x) {
        const pixelBitOffset = lineBitOffset + x * samplesToTransfer * bitsPerSample;
        for (let i = 0; i < samplesToTransfer; ++i) {
          const bitOffset = pixelBitOffset + i * bitsPerSample;
          const outIndex = (y * tileWidth + x) * samplesToTransfer + i;
          const byteOffset = Math.floor(bitOffset / 8);
          const innerBitOffset = bitOffset % 8;
          if (innerBitOffset + bitsPerSample <= 8) {
            outArray[outIndex] = view.getUint8(byteOffset) >> 8 - bitsPerSample - innerBitOffset & bitMask;
          } else if (innerBitOffset + bitsPerSample <= 16) {
            outArray[outIndex] = view.getUint16(byteOffset) >> 16 - bitsPerSample - innerBitOffset & bitMask;
          } else if (innerBitOffset + bitsPerSample <= 24) {
            const raw = view.getUint16(byteOffset) << 8 | view.getUint8(byteOffset + 2);
            outArray[outIndex] = raw >> 24 - bitsPerSample - innerBitOffset & bitMask;
          } else {
            outArray[outIndex] = view.getUint32(byteOffset) >> 32 - bitsPerSample - innerBitOffset & bitMask;
          }
        }
      }
    }
  }
  return outArray.buffer;
}
class GeoTIFFImage {
  /**
   * @constructor
   * @param {Object} fileDirectory The parsed file directory
   * @param {Object} geoKeys The parsed geo-keys
   * @param {DataView} dataView The DataView for the underlying file.
   * @param {Boolean} littleEndian Whether the file is encoded in little or big endian
   * @param {Boolean} cache Whether or not decoded tiles shall be cached
   * @param {import('./source/basesource').BaseSource} source The datasource to read from
   */
  constructor(fileDirectory, geoKeys, dataView, littleEndian, cache, source) {
    this.fileDirectory = fileDirectory;
    this.geoKeys = geoKeys;
    this.dataView = dataView;
    this.littleEndian = littleEndian;
    this.tiles = cache ? {} : null;
    this.isTiled = !fileDirectory.StripOffsets;
    const planarConfiguration = fileDirectory.PlanarConfiguration;
    this.planarConfiguration = typeof planarConfiguration === "undefined" ? 1 : planarConfiguration;
    if (this.planarConfiguration !== 1 && this.planarConfiguration !== 2) {
      throw new Error("Invalid planar configuration.");
    }
    this.source = source;
  }
  /**
   * Returns the associated parsed file directory.
   * @returns {Object} the parsed file directory
   */
  getFileDirectory() {
    return this.fileDirectory;
  }
  /**
   * Returns the associated parsed geo keys.
   * @returns {Object} the parsed geo keys
   */
  getGeoKeys() {
    return this.geoKeys;
  }
  /**
   * Returns the width of the image.
   * @returns {Number} the width of the image
   */
  getWidth() {
    return this.fileDirectory.ImageWidth;
  }
  /**
   * Returns the height of the image.
   * @returns {Number} the height of the image
   */
  getHeight() {
    return this.fileDirectory.ImageLength;
  }
  /**
   * Returns the number of samples per pixel.
   * @returns {Number} the number of samples per pixel
   */
  getSamplesPerPixel() {
    return typeof this.fileDirectory.SamplesPerPixel !== "undefined" ? this.fileDirectory.SamplesPerPixel : 1;
  }
  /**
   * Returns the width of each tile.
   * @returns {Number} the width of each tile
   */
  getTileWidth() {
    return this.isTiled ? this.fileDirectory.TileWidth : this.getWidth();
  }
  /**
   * Returns the height of each tile.
   * @returns {Number} the height of each tile
   */
  getTileHeight() {
    if (this.isTiled) {
      return this.fileDirectory.TileLength;
    }
    if (typeof this.fileDirectory.RowsPerStrip !== "undefined") {
      return Math.min(this.fileDirectory.RowsPerStrip, this.getHeight());
    }
    return this.getHeight();
  }
  getBlockWidth() {
    return this.getTileWidth();
  }
  getBlockHeight(y) {
    if (this.isTiled || (y + 1) * this.getTileHeight() <= this.getHeight()) {
      return this.getTileHeight();
    } else {
      return this.getHeight() - y * this.getTileHeight();
    }
  }
  /**
   * Calculates the number of bytes for each pixel across all samples. Only full
   * bytes are supported, an exception is thrown when this is not the case.
   * @returns {Number} the bytes per pixel
   */
  getBytesPerPixel() {
    let bytes = 0;
    for (let i = 0; i < this.fileDirectory.BitsPerSample.length; ++i) {
      bytes += this.getSampleByteSize(i);
    }
    return bytes;
  }
  getSampleByteSize(i) {
    if (i >= this.fileDirectory.BitsPerSample.length) {
      throw new RangeError(`Sample index ${i} is out of range.`);
    }
    return Math.ceil(this.fileDirectory.BitsPerSample[i] / 8);
  }
  getReaderForSample(sampleIndex) {
    const format = this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[sampleIndex] : 1;
    const bitsPerSample = this.fileDirectory.BitsPerSample[sampleIndex];
    switch (format) {
      case 1:
        if (bitsPerSample <= 8) {
          return DataView.prototype.getUint8;
        } else if (bitsPerSample <= 16) {
          return DataView.prototype.getUint16;
        } else if (bitsPerSample <= 32) {
          return DataView.prototype.getUint32;
        }
        break;
      case 2:
        if (bitsPerSample <= 8) {
          return DataView.prototype.getInt8;
        } else if (bitsPerSample <= 16) {
          return DataView.prototype.getInt16;
        } else if (bitsPerSample <= 32) {
          return DataView.prototype.getInt32;
        }
        break;
      case 3:
        switch (bitsPerSample) {
          case 16:
            return function(offset, littleEndian) {
              return getFloat16(this, offset, littleEndian);
            };
          case 32:
            return DataView.prototype.getFloat32;
          case 64:
            return DataView.prototype.getFloat64;
        }
        break;
    }
    throw Error("Unsupported data format/bitsPerSample");
  }
  getSampleFormat(sampleIndex = 0) {
    return this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[sampleIndex] : 1;
  }
  getBitsPerSample(sampleIndex = 0) {
    return this.fileDirectory.BitsPerSample[sampleIndex];
  }
  getArrayForSample(sampleIndex, size) {
    const format = this.getSampleFormat(sampleIndex);
    const bitsPerSample = this.getBitsPerSample(sampleIndex);
    return arrayForType(format, bitsPerSample, size);
  }
  /**
   * Returns the decoded strip or tile.
   * @param {Number} x the strip or tile x-offset
   * @param {Number} y the tile y-offset (0 for stripped images)
   * @param {Number} sample the sample to get for separated samples
   * @param {import("./geotiff").Pool|import("./geotiff").BaseDecoder} poolOrDecoder the decoder or decoder pool
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise.<ArrayBuffer>}
   */
  async getTileOrStrip(x, y, sample, poolOrDecoder, signal) {
    const numTilesPerRow = Math.ceil(this.getWidth() / this.getTileWidth());
    const numTilesPerCol = Math.ceil(this.getHeight() / this.getTileHeight());
    let index;
    const { tiles } = this;
    if (this.planarConfiguration === 1) {
      index = y * numTilesPerRow + x;
    } else if (this.planarConfiguration === 2) {
      index = sample * numTilesPerRow * numTilesPerCol + y * numTilesPerRow + x;
    }
    let offset;
    let byteCount;
    if (this.isTiled) {
      offset = this.fileDirectory.TileOffsets[index];
      byteCount = this.fileDirectory.TileByteCounts[index];
    } else {
      offset = this.fileDirectory.StripOffsets[index];
      byteCount = this.fileDirectory.StripByteCounts[index];
    }
    const slice = (await this.source.fetch([{ offset, length: byteCount }], signal))[0];
    let request;
    if (tiles === null || !tiles[index]) {
      request = (async () => {
        let data = await poolOrDecoder.decode(this.fileDirectory, slice);
        const sampleFormat = this.getSampleFormat();
        const bitsPerSample = this.getBitsPerSample();
        if (needsNormalization(sampleFormat, bitsPerSample)) {
          data = normalizeArray(
            data,
            sampleFormat,
            this.planarConfiguration,
            this.getSamplesPerPixel(),
            bitsPerSample,
            this.getTileWidth(),
            this.getBlockHeight(y)
          );
        }
        return data;
      })();
      if (tiles !== null) {
        tiles[index] = request;
      }
    } else {
      request = tiles[index];
    }
    return { x, y, sample, data: await request };
  }
  /**
   * Internal read function.
   * @private
   * @param {Array} imageWindow The image window in pixel coordinates
   * @param {Array} samples The selected samples (0-based indices)
   * @param {TypedArray|TypedArray[]} valueArrays The array(s) to write into
   * @param {Boolean} interleave Whether or not to write in an interleaved manner
   * @param {import("./geotiff").Pool|AbstractDecoder} poolOrDecoder the decoder or decoder pool
   * @param {number} width the width of window to be read into
   * @param {number} height the height of window to be read into
   * @param {number} resampleMethod the resampling method to be used when interpolating
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise<ReadRasterResult>}
   */
  async _readRaster(imageWindow, samples, valueArrays, interleave, poolOrDecoder, width, height, resampleMethod, signal) {
    const tileWidth = this.getTileWidth();
    const tileHeight = this.getTileHeight();
    const imageWidth = this.getWidth();
    const imageHeight = this.getHeight();
    const minXTile = Math.max(Math.floor(imageWindow[0] / tileWidth), 0);
    const maxXTile = Math.min(
      Math.ceil(imageWindow[2] / tileWidth),
      Math.ceil(imageWidth / tileWidth)
    );
    const minYTile = Math.max(Math.floor(imageWindow[1] / tileHeight), 0);
    const maxYTile = Math.min(
      Math.ceil(imageWindow[3] / tileHeight),
      Math.ceil(imageHeight / tileHeight)
    );
    const windowWidth = imageWindow[2] - imageWindow[0];
    let bytesPerPixel = this.getBytesPerPixel();
    const srcSampleOffsets = [];
    const sampleReaders = [];
    for (let i = 0; i < samples.length; ++i) {
      if (this.planarConfiguration === 1) {
        srcSampleOffsets.push(sum(this.fileDirectory.BitsPerSample, 0, samples[i]) / 8);
      } else {
        srcSampleOffsets.push(0);
      }
      sampleReaders.push(this.getReaderForSample(samples[i]));
    }
    const promises = [];
    const { littleEndian } = this;
    for (let yTile = minYTile; yTile < maxYTile; ++yTile) {
      for (let xTile = minXTile; xTile < maxXTile; ++xTile) {
        let getPromise;
        if (this.planarConfiguration === 1) {
          getPromise = this.getTileOrStrip(xTile, yTile, 0, poolOrDecoder, signal);
        }
        for (let sampleIndex = 0; sampleIndex < samples.length; ++sampleIndex) {
          const si = sampleIndex;
          const sample = samples[sampleIndex];
          if (this.planarConfiguration === 2) {
            bytesPerPixel = this.getSampleByteSize(sample);
            getPromise = this.getTileOrStrip(xTile, yTile, sample, poolOrDecoder, signal);
          }
          const promise = getPromise.then((tile) => {
            const buffer2 = tile.data;
            const dataView = new DataView(buffer2);
            const blockHeight = this.getBlockHeight(tile.y);
            const firstLine = tile.y * tileHeight;
            const firstCol = tile.x * tileWidth;
            const lastLine = firstLine + blockHeight;
            const lastCol = (tile.x + 1) * tileWidth;
            const reader = sampleReaders[si];
            const ymax = Math.min(blockHeight, blockHeight - (lastLine - imageWindow[3]), imageHeight - firstLine);
            const xmax = Math.min(tileWidth, tileWidth - (lastCol - imageWindow[2]), imageWidth - firstCol);
            for (let y = Math.max(0, imageWindow[1] - firstLine); y < ymax; ++y) {
              for (let x = Math.max(0, imageWindow[0] - firstCol); x < xmax; ++x) {
                const pixelOffset = (y * tileWidth + x) * bytesPerPixel;
                const value = reader.call(
                  dataView,
                  pixelOffset + srcSampleOffsets[si],
                  littleEndian
                );
                let windowCoordinate;
                if (interleave) {
                  windowCoordinate = (y + firstLine - imageWindow[1]) * windowWidth * samples.length + (x + firstCol - imageWindow[0]) * samples.length + si;
                  valueArrays[windowCoordinate] = value;
                } else {
                  windowCoordinate = (y + firstLine - imageWindow[1]) * windowWidth + x + firstCol - imageWindow[0];
                  valueArrays[si][windowCoordinate] = value;
                }
              }
            }
          });
          promises.push(promise);
        }
      }
    }
    await Promise.all(promises);
    if (width && imageWindow[2] - imageWindow[0] !== width || height && imageWindow[3] - imageWindow[1] !== height) {
      let resampled;
      if (interleave) {
        resampled = resampleInterleaved(
          valueArrays,
          imageWindow[2] - imageWindow[0],
          imageWindow[3] - imageWindow[1],
          width,
          height,
          samples.length,
          resampleMethod
        );
      } else {
        resampled = resample(
          valueArrays,
          imageWindow[2] - imageWindow[0],
          imageWindow[3] - imageWindow[1],
          width,
          height,
          resampleMethod
        );
      }
      resampled.width = width;
      resampled.height = height;
      return resampled;
    }
    valueArrays.width = width || imageWindow[2] - imageWindow[0];
    valueArrays.height = height || imageWindow[3] - imageWindow[1];
    return valueArrays;
  }
  /**
   * Reads raster data from the image. This function reads all selected samples
   * into separate arrays of the correct type for that sample or into a single
   * combined array when `interleave` is set. When provided, only a subset
   * of the raster is read for each sample.
   *
   * @param {ReadRasterOptions} [options={}] optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded arrays as a promise
   */
  async readRasters({
    window: wnd,
    samples = [],
    interleave,
    pool = null,
    width,
    height,
    resampleMethod,
    fillValue,
    signal
  } = {}) {
    const imageWindow = wnd || [0, 0, this.getWidth(), this.getHeight()];
    if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) {
      throw new Error("Invalid subsets");
    }
    const imageWindowWidth = imageWindow[2] - imageWindow[0];
    const imageWindowHeight = imageWindow[3] - imageWindow[1];
    const numPixels = imageWindowWidth * imageWindowHeight;
    const samplesPerPixel = this.getSamplesPerPixel();
    if (!samples || !samples.length) {
      for (let i = 0; i < samplesPerPixel; ++i) {
        samples.push(i);
      }
    } else {
      for (let i = 0; i < samples.length; ++i) {
        if (samples[i] >= samplesPerPixel) {
          return Promise.reject(new RangeError(`Invalid sample index '${samples[i]}'.`));
        }
      }
    }
    let valueArrays;
    if (interleave) {
      const format = this.fileDirectory.SampleFormat ? Math.max.apply(null, this.fileDirectory.SampleFormat) : 1;
      const bitsPerSample = Math.max.apply(null, this.fileDirectory.BitsPerSample);
      valueArrays = arrayForType(format, bitsPerSample, numPixels * samples.length);
      if (fillValue) {
        valueArrays.fill(fillValue);
      }
    } else {
      valueArrays = [];
      for (let i = 0; i < samples.length; ++i) {
        const valueArray = this.getArrayForSample(samples[i], numPixels);
        if (Array.isArray(fillValue) && i < fillValue.length) {
          valueArray.fill(fillValue[i]);
        } else if (fillValue && !Array.isArray(fillValue)) {
          valueArray.fill(fillValue);
        }
        valueArrays.push(valueArray);
      }
    }
    const poolOrDecoder = pool || await getDecoder(this.fileDirectory);
    const result = await this._readRaster(
      imageWindow,
      samples,
      valueArrays,
      interleave,
      poolOrDecoder,
      width,
      height,
      resampleMethod,
      signal
    );
    return result;
  }
  /**
   * Reads raster data from the image as RGB. The result is always an
   * interleaved typed array.
   * Colorspaces other than RGB will be transformed to RGB, color maps expanded.
   * When no other method is applicable, the first sample is used to produce a
   * grayscale image.
   * When provided, only a subset of the raster is read for each sample.
   *
   * @param {Object} [options] optional parameters
   * @param {Array<number>} [options.window] the subset to read data from in pixels.
   * @param {boolean} [options.interleave=true] whether the data shall be read
   *                                             in one single array or separate
   *                                             arrays.
   * @param {import("./geotiff").Pool} [options.pool=null] The optional decoder pool to use.
   * @param {number} [options.width] The desired width of the output. When the width is no the
   *                                 same as the images, resampling will be performed.
   * @param {number} [options.height] The desired height of the output. When the width is no the
   *                                  same as the images, resampling will be performed.
   * @param {string} [options.resampleMethod='nearest'] The desired resampling method.
   * @param {boolean} [options.enableAlpha=false] Enable reading alpha channel if present.
   * @param {AbortSignal} [options.signal] An AbortSignal that may be signalled if the request is
   *                                       to be aborted
   * @returns {Promise<ReadRasterResult>} the RGB array as a Promise
   */
  async readRGB({
    window: window2,
    interleave = true,
    pool = null,
    width,
    height,
    resampleMethod,
    enableAlpha = false,
    signal
  } = {}) {
    const imageWindow = window2 || [0, 0, this.getWidth(), this.getHeight()];
    if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) {
      throw new Error("Invalid subsets");
    }
    const pi = this.fileDirectory.PhotometricInterpretation;
    if (pi === photometricInterpretations.RGB) {
      let s = [0, 1, 2];
      if (!(this.fileDirectory.ExtraSamples === ExtraSamplesValues.Unspecified) && enableAlpha) {
        s = [];
        for (let i = 0; i < this.fileDirectory.BitsPerSample.length; i += 1) {
          s.push(i);
        }
      }
      return this.readRasters({
        window: window2,
        interleave,
        samples: s,
        pool,
        width,
        height,
        resampleMethod,
        signal
      });
    }
    let samples;
    switch (pi) {
      case photometricInterpretations.WhiteIsZero:
      case photometricInterpretations.BlackIsZero:
      case photometricInterpretations.Palette:
        samples = [0];
        break;
      case photometricInterpretations.CMYK:
        samples = [0, 1, 2, 3];
        break;
      case photometricInterpretations.YCbCr:
      case photometricInterpretations.CIELab:
        samples = [0, 1, 2];
        break;
      default:
        throw new Error("Invalid or unsupported photometric interpretation.");
    }
    const subOptions = {
      window: imageWindow,
      interleave: true,
      samples,
      pool,
      width,
      height,
      resampleMethod,
      signal
    };
    const { fileDirectory } = this;
    const raster = await this.readRasters(subOptions);
    const max = 2 ** this.fileDirectory.BitsPerSample[0];
    let data;
    switch (pi) {
      case photometricInterpretations.WhiteIsZero:
        data = fromWhiteIsZero(raster, max);
        break;
      case photometricInterpretations.BlackIsZero:
        data = fromBlackIsZero(raster, max);
        break;
      case photometricInterpretations.Palette:
        data = fromPalette(raster, fileDirectory.ColorMap);
        break;
      case photometricInterpretations.CMYK:
        data = fromCMYK(raster);
        break;
      case photometricInterpretations.YCbCr:
        data = fromYCbCr(raster);
        break;
      case photometricInterpretations.CIELab:
        data = fromCIELab(raster);
        break;
      default:
        throw new Error("Unsupported photometric interpretation.");
    }
    if (!interleave) {
      const red = new Uint8Array(data.length / 3);
      const green = new Uint8Array(data.length / 3);
      const blue = new Uint8Array(data.length / 3);
      for (let i = 0, j = 0; i < data.length; i += 3, ++j) {
        red[j] = data[i];
        green[j] = data[i + 1];
        blue[j] = data[i + 2];
      }
      data = [red, green, blue];
    }
    data.width = raster.width;
    data.height = raster.height;
    return data;
  }
  /**
   * Returns an array of tiepoints.
   * @returns {Object[]}
   */
  getTiePoints() {
    if (!this.fileDirectory.ModelTiepoint) {
      return [];
    }
    const tiePoints = [];
    for (let i = 0; i < this.fileDirectory.ModelTiepoint.length; i += 6) {
      tiePoints.push({
        i: this.fileDirectory.ModelTiepoint[i],
        j: this.fileDirectory.ModelTiepoint[i + 1],
        k: this.fileDirectory.ModelTiepoint[i + 2],
        x: this.fileDirectory.ModelTiepoint[i + 3],
        y: this.fileDirectory.ModelTiepoint[i + 4],
        z: this.fileDirectory.ModelTiepoint[i + 5]
      });
    }
    return tiePoints;
  }
  /**
   * Returns the parsed GDAL metadata items.
   *
   * If sample is passed to null, dataset-level metadata will be returned.
   * Otherwise only metadata specific to the provided sample will be returned.
   *
   * @param {number} [sample=null] The sample index.
   * @returns {Object}
   */
  getGDALMetadata(sample = null) {
    const metadata = {};
    if (!this.fileDirectory.GDAL_METADATA) {
      return null;
    }
    const string = this.fileDirectory.GDAL_METADATA;
    let items = findTagsByName(string, "Item");
    if (sample === null) {
      items = items.filter((item) => getAttribute(item, "sample") === void 0);
    } else {
      items = items.filter((item) => Number(getAttribute(item, "sample")) === sample);
    }
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      metadata[getAttribute(item, "name")] = item.inner;
    }
    return metadata;
  }
  /**
   * Returns the GDAL nodata value
   * @returns {number|null}
   */
  getGDALNoData() {
    if (!this.fileDirectory.GDAL_NODATA) {
      return null;
    }
    const string = this.fileDirectory.GDAL_NODATA;
    return Number(string.substring(0, string.length - 1));
  }
  /**
   * Returns the image origin as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @returns {Array<number>} The origin as a vector
   */
  getOrigin() {
    const tiePoints = this.fileDirectory.ModelTiepoint;
    const modelTransformation = this.fileDirectory.ModelTransformation;
    if (tiePoints && tiePoints.length === 6) {
      return [
        tiePoints[3],
        tiePoints[4],
        tiePoints[5]
      ];
    }
    if (modelTransformation) {
      return [
        modelTransformation[3],
        modelTransformation[7],
        modelTransformation[11]
      ];
    }
    throw new Error("The image does not have an affine transformation.");
  }
  /**
   * Returns the image resolution as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @param {GeoTIFFImage} [referenceImage=null] A reference image to calculate the resolution from
   *                                             in cases when the current image does not have the
   *                                             required tags on its own.
   * @returns {Array<number>} The resolution as a vector
   */
  getResolution(referenceImage = null) {
    const modelPixelScale = this.fileDirectory.ModelPixelScale;
    const modelTransformation = this.fileDirectory.ModelTransformation;
    if (modelPixelScale) {
      return [
        modelPixelScale[0],
        -modelPixelScale[1],
        modelPixelScale[2]
      ];
    }
    if (modelTransformation) {
      if (modelTransformation[1] === 0 && modelTransformation[4] === 0) {
        return [
          modelTransformation[0],
          -modelTransformation[5],
          modelTransformation[10]
        ];
      }
      return [
        Math.sqrt(modelTransformation[0] * modelTransformation[0] + modelTransformation[4] * modelTransformation[4]),
        -Math.sqrt(modelTransformation[1] * modelTransformation[1] + modelTransformation[5] * modelTransformation[5]),
        modelTransformation[10]
      ];
    }
    if (referenceImage) {
      const [refResX, refResY, refResZ] = referenceImage.getResolution();
      return [
        refResX * referenceImage.getWidth() / this.getWidth(),
        refResY * referenceImage.getHeight() / this.getHeight(),
        refResZ * referenceImage.getWidth() / this.getWidth()
      ];
    }
    throw new Error("The image does not have an affine transformation.");
  }
  /**
   * Returns whether or not the pixels of the image depict an area (or point).
   * @returns {Boolean} Whether the pixels are a point
   */
  pixelIsArea() {
    return this.geoKeys.GTRasterTypeGeoKey === 1;
  }
  /**
   * Returns the image bounding box as an array of 4 values: min-x, min-y,
   * max-x and max-y. When the image has no affine transformation, then an
   * exception is thrown.
   * @param {boolean} [tilegrid=false] If true return extent for a tilegrid
   *                                   without adjustment for ModelTransformation.
   * @returns {Array<number>} The bounding box
   */
  getBoundingBox(tilegrid = false) {
    const height = this.getHeight();
    const width = this.getWidth();
    if (this.fileDirectory.ModelTransformation && !tilegrid) {
      const [a, b, c, d, e, f, g, h] = this.fileDirectory.ModelTransformation;
      const corners = [
        [0, 0],
        [0, height],
        [width, 0],
        [width, height]
      ];
      const projected = corners.map(([I, J]) => [
        d + a * I + b * J,
        h + e * I + f * J
      ]);
      const xs = projected.map((pt) => pt[0]);
      const ys = projected.map((pt) => pt[1]);
      return [
        Math.min(...xs),
        Math.min(...ys),
        Math.max(...xs),
        Math.max(...ys)
      ];
    } else {
      const origin = this.getOrigin();
      const resolution = this.getResolution();
      const x1 = origin[0];
      const y1 = origin[1];
      const x2 = x1 + resolution[0] * width;
      const y2 = y1 + resolution[1] * height;
      return [
        Math.min(x1, x2),
        Math.min(y1, y2),
        Math.max(x1, x2),
        Math.max(y1, y2)
      ];
    }
  }
}
class DataView64 {
  constructor(arrayBuffer) {
    this._dataView = new DataView(arrayBuffer);
  }
  get buffer() {
    return this._dataView.buffer;
  }
  getUint64(offset, littleEndian) {
    const left = this.getUint32(offset, littleEndian);
    const right = this.getUint32(offset + 4, littleEndian);
    let combined;
    if (littleEndian) {
      combined = left + 2 ** 32 * right;
      if (!Number.isSafeInteger(combined)) {
        throw new Error(
          `${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`
        );
      }
      return combined;
    }
    combined = 2 ** 32 * left + right;
    if (!Number.isSafeInteger(combined)) {
      throw new Error(
        `${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`
      );
    }
    return combined;
  }
  // adapted from https://stackoverflow.com/a/55338384/8060591
  getInt64(offset, littleEndian) {
    let value = 0;
    const isNegative = (this._dataView.getUint8(offset + (littleEndian ? 7 : 0)) & 128) > 0;
    let carrying = true;
    for (let i = 0; i < 8; i++) {
      let byte = this._dataView.getUint8(offset + (littleEndian ? i : 7 - i));
      if (isNegative) {
        if (carrying) {
          if (byte !== 0) {
            byte = ~(byte - 1) & 255;
            carrying = false;
          }
        } else {
          byte = ~byte & 255;
        }
      }
      value += byte * 256 ** i;
    }
    if (isNegative) {
      value = -value;
    }
    return value;
  }
  getUint8(offset, littleEndian) {
    return this._dataView.getUint8(offset, littleEndian);
  }
  getInt8(offset, littleEndian) {
    return this._dataView.getInt8(offset, littleEndian);
  }
  getUint16(offset, littleEndian) {
    return this._dataView.getUint16(offset, littleEndian);
  }
  getInt16(offset, littleEndian) {
    return this._dataView.getInt16(offset, littleEndian);
  }
  getUint32(offset, littleEndian) {
    return this._dataView.getUint32(offset, littleEndian);
  }
  getInt32(offset, littleEndian) {
    return this._dataView.getInt32(offset, littleEndian);
  }
  getFloat16(offset, littleEndian) {
    return getFloat16(this._dataView, offset, littleEndian);
  }
  getFloat32(offset, littleEndian) {
    return this._dataView.getFloat32(offset, littleEndian);
  }
  getFloat64(offset, littleEndian) {
    return this._dataView.getFloat64(offset, littleEndian);
  }
}
class DataSlice {
  constructor(arrayBuffer, sliceOffset, littleEndian, bigTiff) {
    this._dataView = new DataView(arrayBuffer);
    this._sliceOffset = sliceOffset;
    this._littleEndian = littleEndian;
    this._bigTiff = bigTiff;
  }
  get sliceOffset() {
    return this._sliceOffset;
  }
  get sliceTop() {
    return this._sliceOffset + this.buffer.byteLength;
  }
  get littleEndian() {
    return this._littleEndian;
  }
  get bigTiff() {
    return this._bigTiff;
  }
  get buffer() {
    return this._dataView.buffer;
  }
  covers(offset, length) {
    return this.sliceOffset <= offset && this.sliceTop >= offset + length;
  }
  readUint8(offset) {
    return this._dataView.getUint8(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readInt8(offset) {
    return this._dataView.getInt8(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readUint16(offset) {
    return this._dataView.getUint16(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readInt16(offset) {
    return this._dataView.getInt16(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readUint32(offset) {
    return this._dataView.getUint32(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readInt32(offset) {
    return this._dataView.getInt32(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readFloat32(offset) {
    return this._dataView.getFloat32(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readFloat64(offset) {
    return this._dataView.getFloat64(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readUint64(offset) {
    const left = this.readUint32(offset);
    const right = this.readUint32(offset + 4);
    let combined;
    if (this._littleEndian) {
      combined = left + 2 ** 32 * right;
      if (!Number.isSafeInteger(combined)) {
        throw new Error(
          `${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`
        );
      }
      return combined;
    }
    combined = 2 ** 32 * left + right;
    if (!Number.isSafeInteger(combined)) {
      throw new Error(
        `${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`
      );
    }
    return combined;
  }
  // adapted from https://stackoverflow.com/a/55338384/8060591
  readInt64(offset) {
    let value = 0;
    const isNegative = (this._dataView.getUint8(offset + (this._littleEndian ? 7 : 0)) & 128) > 0;
    let carrying = true;
    for (let i = 0; i < 8; i++) {
      let byte = this._dataView.getUint8(
        offset + (this._littleEndian ? i : 7 - i)
      );
      if (isNegative) {
        if (carrying) {
          if (byte !== 0) {
            byte = ~(byte - 1) & 255;
            carrying = false;
          }
        } else {
          byte = ~byte & 255;
        }
      }
      value += byte * 256 ** i;
    }
    if (isNegative) {
      value = -value;
    }
    return value;
  }
  readOffset(offset) {
    if (this._bigTiff) {
      return this.readUint64(offset);
    }
    return this.readUint32(offset);
  }
}
class BaseSource {
  /**
   *
   * @param {Slice[]} slices
   * @returns {ArrayBuffer[]}
   */
  async fetch(slices, signal = void 0) {
    return Promise.all(
      slices.map((slice) => this.fetchSlice(slice, signal))
    );
  }
  /**
   *
   * @param {Slice} slice
   * @returns {ArrayBuffer}
   */
  async fetchSlice(slice) {
    throw new Error(`fetching of slice ${slice} not possible, not implemented`);
  }
  /**
   * Returns the filesize if already determined and null otherwise
   */
  get fileSize() {
    return null;
  }
  async close() {
  }
}
class AbortError extends Error {
  constructor(params) {
    super(params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AbortError);
    }
    this.name = "AbortError";
  }
}
class ArrayBufferSource extends BaseSource {
  constructor(arrayBuffer) {
    super();
    this.arrayBuffer = arrayBuffer;
  }
  fetchSlice(slice, signal) {
    if (signal && signal.aborted) {
      throw new AbortError("Request aborted");
    }
    return this.arrayBuffer.slice(slice.offset, slice.offset + slice.length);
  }
}
function makeBufferSource(arrayBuffer) {
  return new ArrayBufferSource(arrayBuffer);
}
function getFieldTypeLength(fieldType) {
  switch (fieldType) {
    case fieldTypes.BYTE:
    case fieldTypes.ASCII:
    case fieldTypes.SBYTE:
    case fieldTypes.UNDEFINED:
      return 1;
    case fieldTypes.SHORT:
    case fieldTypes.SSHORT:
      return 2;
    case fieldTypes.LONG:
    case fieldTypes.SLONG:
    case fieldTypes.FLOAT:
    case fieldTypes.IFD:
      return 4;
    case fieldTypes.RATIONAL:
    case fieldTypes.SRATIONAL:
    case fieldTypes.DOUBLE:
    case fieldTypes.LONG8:
    case fieldTypes.SLONG8:
    case fieldTypes.IFD8:
      return 8;
    default:
      throw new RangeError(`Invalid field type: ${fieldType}`);
  }
}
function parseGeoKeyDirectory(fileDirectory) {
  const rawGeoKeyDirectory = fileDirectory.GeoKeyDirectory;
  if (!rawGeoKeyDirectory) {
    return null;
  }
  const geoKeyDirectory = {};
  for (let i = 4; i <= rawGeoKeyDirectory[3] * 4; i += 4) {
    const key = geoKeyNames[rawGeoKeyDirectory[i]];
    const location = rawGeoKeyDirectory[i + 1] ? fieldTagNames[rawGeoKeyDirectory[i + 1]] : null;
    const count = rawGeoKeyDirectory[i + 2];
    const offset = rawGeoKeyDirectory[i + 3];
    let value = null;
    if (!location) {
      value = offset;
    } else {
      value = fileDirectory[location];
      if (typeof value === "undefined" || value === null) {
        throw new Error(`Could not get value of geoKey '${key}'.`);
      } else if (typeof value === "string") {
        value = value.substring(offset, offset + count - 1);
      } else if (value.subarray) {
        value = value.subarray(offset, offset + count);
        if (count === 1) {
          value = value[0];
        }
      }
    }
    geoKeyDirectory[key] = value;
  }
  return geoKeyDirectory;
}
function getValues(dataSlice, fieldType, count, offset) {
  let values2 = null;
  let readMethod = null;
  const fieldTypeLength = getFieldTypeLength(fieldType);
  switch (fieldType) {
    case fieldTypes.BYTE:
    case fieldTypes.ASCII:
    case fieldTypes.UNDEFINED:
      values2 = new Uint8Array(count);
      readMethod = dataSlice.readUint8;
      break;
    case fieldTypes.SBYTE:
      values2 = new Int8Array(count);
      readMethod = dataSlice.readInt8;
      break;
    case fieldTypes.SHORT:
      values2 = new Uint16Array(count);
      readMethod = dataSlice.readUint16;
      break;
    case fieldTypes.SSHORT:
      values2 = new Int16Array(count);
      readMethod = dataSlice.readInt16;
      break;
    case fieldTypes.LONG:
    case fieldTypes.IFD:
      values2 = new Uint32Array(count);
      readMethod = dataSlice.readUint32;
      break;
    case fieldTypes.SLONG:
      values2 = new Int32Array(count);
      readMethod = dataSlice.readInt32;
      break;
    case fieldTypes.LONG8:
    case fieldTypes.IFD8:
      values2 = new Array(count);
      readMethod = dataSlice.readUint64;
      break;
    case fieldTypes.SLONG8:
      values2 = new Array(count);
      readMethod = dataSlice.readInt64;
      break;
    case fieldTypes.RATIONAL:
      values2 = new Uint32Array(count * 2);
      readMethod = dataSlice.readUint32;
      break;
    case fieldTypes.SRATIONAL:
      values2 = new Int32Array(count * 2);
      readMethod = dataSlice.readInt32;
      break;
    case fieldTypes.FLOAT:
      values2 = new Float32Array(count);
      readMethod = dataSlice.readFloat32;
      break;
    case fieldTypes.DOUBLE:
      values2 = new Float64Array(count);
      readMethod = dataSlice.readFloat64;
      break;
    default:
      throw new RangeError(`Invalid field type: ${fieldType}`);
  }
  if (!(fieldType === fieldTypes.RATIONAL || fieldType === fieldTypes.SRATIONAL)) {
    for (let i = 0; i < count; ++i) {
      values2[i] = readMethod.call(
        dataSlice,
        offset + i * fieldTypeLength
      );
    }
  } else {
    for (let i = 0; i < count; i += 2) {
      values2[i] = readMethod.call(
        dataSlice,
        offset + i * fieldTypeLength
      );
      values2[i + 1] = readMethod.call(
        dataSlice,
        offset + (i * fieldTypeLength + 4)
      );
    }
  }
  if (fieldType === fieldTypes.ASCII) {
    return new TextDecoder("utf-8").decode(values2);
  }
  return values2;
}
class ImageFileDirectory {
  constructor(fileDirectory, geoKeyDirectory, nextIFDByteOffset) {
    this.fileDirectory = fileDirectory;
    this.geoKeyDirectory = geoKeyDirectory;
    this.nextIFDByteOffset = nextIFDByteOffset;
  }
}
class GeoTIFFImageIndexError extends Error {
  constructor(index) {
    super(`No image at index ${index}`);
    this.index = index;
  }
}
class GeoTIFFBase {
  /**
   * (experimental) Reads raster data from the best fitting image. This function uses
   * the image with the lowest resolution that is still a higher resolution than the
   * requested resolution.
   * When specified, the `bbox` option is translated to the `window` option and the
   * `resX` and `resY` to `width` and `height` respectively.
   * Then, the [readRasters]{@link GeoTIFFImage#readRasters} method of the selected
   * image is called and the result returned.
   * @see GeoTIFFImage.readRasters
   * @param {import('./geotiffimage').ReadRasterOptions} [options={}] optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded array(s), with `height` and `width`, as a promise
   */
  async readRasters(options = {}) {
    const { window: imageWindow, width, height } = options;
    let { resX, resY, bbox } = options;
    const firstImage = await this.getImage();
    let usedImage = firstImage;
    const imageCount = await this.getImageCount();
    const imgBBox = firstImage.getBoundingBox();
    if (imageWindow && bbox) {
      throw new Error('Both "bbox" and "window" passed.');
    }
    if (width || height) {
      if (imageWindow) {
        const [oX, oY] = firstImage.getOrigin();
        const [rX, rY] = firstImage.getResolution();
        bbox = [
          oX + imageWindow[0] * rX,
          oY + imageWindow[1] * rY,
          oX + imageWindow[2] * rX,
          oY + imageWindow[3] * rY
        ];
      }
      const usedBBox = bbox || imgBBox;
      if (width) {
        if (resX) {
          throw new Error("Both width and resX passed");
        }
        resX = (usedBBox[2] - usedBBox[0]) / width;
      }
      if (height) {
        if (resY) {
          throw new Error("Both width and resY passed");
        }
        resY = (usedBBox[3] - usedBBox[1]) / height;
      }
    }
    if (resX || resY) {
      const allImages = [];
      for (let i = 0; i < imageCount; ++i) {
        const image = await this.getImage(i);
        const { SubfileType: subfileType, NewSubfileType: newSubfileType } = image.fileDirectory;
        if (i === 0 || subfileType === 2 || newSubfileType & 1) {
          allImages.push(image);
        }
      }
      allImages.sort((a, b) => a.getWidth() - b.getWidth());
      for (let i = 0; i < allImages.length; ++i) {
        const image = allImages[i];
        const imgResX = (imgBBox[2] - imgBBox[0]) / image.getWidth();
        const imgResY = (imgBBox[3] - imgBBox[1]) / image.getHeight();
        usedImage = image;
        if (resX && resX > imgResX || resY && resY > imgResY) {
          break;
        }
      }
    }
    let wnd = imageWindow;
    if (bbox) {
      const [oX, oY] = firstImage.getOrigin();
      const [imageResX, imageResY] = usedImage.getResolution(firstImage);
      wnd = [
        Math.round((bbox[0] - oX) / imageResX),
        Math.round((bbox[1] - oY) / imageResY),
        Math.round((bbox[2] - oX) / imageResX),
        Math.round((bbox[3] - oY) / imageResY)
      ];
      wnd = [
        Math.min(wnd[0], wnd[2]),
        Math.min(wnd[1], wnd[3]),
        Math.max(wnd[0], wnd[2]),
        Math.max(wnd[1], wnd[3])
      ];
    }
    return usedImage.readRasters({ ...options, window: wnd });
  }
}
class GeoTIFF extends GeoTIFFBase {
  /**
   * @constructor
   * @param {*} source The datasource to read from.
   * @param {boolean} littleEndian Whether the image uses little endian.
   * @param {boolean} bigTiff Whether the image uses bigTIFF conventions.
   * @param {number} firstIFDOffset The numeric byte-offset from the start of the image
   *                                to the first IFD.
   * @param {GeoTIFFOptions} [options] further options.
   */
  constructor(source, littleEndian, bigTiff, firstIFDOffset, options = {}) {
    super();
    this.source = source;
    this.littleEndian = littleEndian;
    this.bigTiff = bigTiff;
    this.firstIFDOffset = firstIFDOffset;
    this.cache = options.cache || false;
    this.ifdRequests = [];
    this.ghostValues = null;
  }
  async getSlice(offset, size) {
    const fallbackSize = this.bigTiff ? 4048 : 1024;
    return new DataSlice(
      (await this.source.fetch([{
        offset,
        length: typeof size !== "undefined" ? size : fallbackSize
      }]))[0],
      offset,
      this.littleEndian,
      this.bigTiff
    );
  }
  /**
   * Instructs to parse an image file directory at the given file offset.
   * As there is no way to ensure that a location is indeed the start of an IFD,
   * this function must be called with caution (e.g only using the IFD offsets from
   * the headers or other IFDs).
   * @param {number} offset the offset to parse the IFD at
   * @returns {Promise<ImageFileDirectory>} the parsed IFD
   */
  async parseFileDirectoryAt(offset) {
    const entrySize = this.bigTiff ? 20 : 12;
    const offsetSize = this.bigTiff ? 8 : 2;
    let dataSlice = await this.getSlice(offset);
    const numDirEntries = this.bigTiff ? dataSlice.readUint64(offset) : dataSlice.readUint16(offset);
    const byteSize = numDirEntries * entrySize + (this.bigTiff ? 16 : 6);
    if (!dataSlice.covers(offset, byteSize)) {
      dataSlice = await this.getSlice(offset, byteSize);
    }
    const fileDirectory = {};
    let i = offset + (this.bigTiff ? 8 : 2);
    for (let entryCount = 0; entryCount < numDirEntries; i += entrySize, ++entryCount) {
      const fieldTag = dataSlice.readUint16(i);
      const fieldType = dataSlice.readUint16(i + 2);
      const typeCount = this.bigTiff ? dataSlice.readUint64(i + 4) : dataSlice.readUint32(i + 4);
      let fieldValues;
      let value;
      const fieldTypeLength = getFieldTypeLength(fieldType);
      const valueOffset = i + (this.bigTiff ? 12 : 8);
      if (fieldTypeLength * typeCount <= (this.bigTiff ? 8 : 4)) {
        fieldValues = getValues(dataSlice, fieldType, typeCount, valueOffset);
      } else {
        const actualOffset = dataSlice.readOffset(valueOffset);
        const length = getFieldTypeLength(fieldType) * typeCount;
        if (dataSlice.covers(actualOffset, length)) {
          fieldValues = getValues(dataSlice, fieldType, typeCount, actualOffset);
        } else {
          const fieldDataSlice = await this.getSlice(actualOffset, length);
          fieldValues = getValues(fieldDataSlice, fieldType, typeCount, actualOffset);
        }
      }
      if (typeCount === 1 && arrayFields.indexOf(fieldTag) === -1 && !(fieldType === fieldTypes.RATIONAL || fieldType === fieldTypes.SRATIONAL)) {
        value = fieldValues[0];
      } else {
        value = fieldValues;
      }
      fileDirectory[fieldTagNames[fieldTag]] = value;
    }
    const geoKeyDirectory = parseGeoKeyDirectory(fileDirectory);
    const nextIFDByteOffset = dataSlice.readOffset(
      offset + offsetSize + entrySize * numDirEntries
    );
    return new ImageFileDirectory(
      fileDirectory,
      geoKeyDirectory,
      nextIFDByteOffset
    );
  }
  async requestIFD(index) {
    if (this.ifdRequests[index]) {
      return this.ifdRequests[index];
    } else if (index === 0) {
      this.ifdRequests[index] = this.parseFileDirectoryAt(this.firstIFDOffset);
      return this.ifdRequests[index];
    } else if (!this.ifdRequests[index - 1]) {
      try {
        this.ifdRequests[index - 1] = this.requestIFD(index - 1);
      } catch (e) {
        if (e instanceof GeoTIFFImageIndexError) {
          throw new GeoTIFFImageIndexError(index);
        }
        throw e;
      }
    }
    this.ifdRequests[index] = (async () => {
      const previousIfd = await this.ifdRequests[index - 1];
      if (previousIfd.nextIFDByteOffset === 0) {
        throw new GeoTIFFImageIndexError(index);
      }
      return this.parseFileDirectoryAt(previousIfd.nextIFDByteOffset);
    })();
    return this.ifdRequests[index];
  }
  /**
   * Get the n-th internal subfile of an image. By default, the first is returned.
   *
   * @param {number} [index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  async getImage(index = 0) {
    const ifd = await this.requestIFD(index);
    return new GeoTIFFImage(
      ifd.fileDirectory,
      ifd.geoKeyDirectory,
      this.dataView,
      this.littleEndian,
      this.cache,
      this.source
    );
  }
  /**
   * Returns the count of the internal subfiles.
   *
   * @returns {Promise<number>} the number of internal subfile images
   */
  async getImageCount() {
    let index = 0;
    let hasNext = true;
    while (hasNext) {
      try {
        await this.requestIFD(index);
        ++index;
      } catch (e) {
        if (e instanceof GeoTIFFImageIndexError) {
          hasNext = false;
        } else {
          throw e;
        }
      }
    }
    return index;
  }
  /**
   * Get the values of the COG ghost area as a parsed map.
   * See https://gdal.org/drivers/raster/cog.html#header-ghost-area for reference
   * @returns {Promise<Object>} the parsed ghost area or null, if no such area was found
   */
  async getGhostValues() {
    const offset = this.bigTiff ? 16 : 8;
    if (this.ghostValues) {
      return this.ghostValues;
    }
    const detectionString = "GDAL_STRUCTURAL_METADATA_SIZE=";
    const heuristicAreaSize = detectionString.length + 100;
    let slice = await this.getSlice(offset, heuristicAreaSize);
    if (detectionString === getValues(slice, fieldTypes.ASCII, detectionString.length, offset)) {
      const valuesString = getValues(slice, fieldTypes.ASCII, heuristicAreaSize, offset);
      const firstLine = valuesString.split("\n")[0];
      const metadataSize = Number(firstLine.split("=")[1].split(" ")[0]) + firstLine.length;
      if (metadataSize > heuristicAreaSize) {
        slice = await this.getSlice(offset, metadataSize);
      }
      const fullString = getValues(slice, fieldTypes.ASCII, metadataSize, offset);
      this.ghostValues = {};
      fullString.split("\n").filter((line) => line.length > 0).map((line) => line.split("=")).forEach(([key, value]) => {
        this.ghostValues[key] = value;
      });
    }
    return this.ghostValues;
  }
  /**
   * Parse a (Geo)TIFF file from the given source.
   *
   * @param {*} source The source of data to parse from.
   * @param {GeoTIFFOptions} [options] Additional options.
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   */
  static async fromSource(source, options, signal) {
    const headerData = (await source.fetch([{ offset: 0, length: 1024 }], signal))[0];
    const dataView = new DataView64(headerData);
    const BOM = dataView.getUint16(0, 0);
    let littleEndian;
    if (BOM === 18761) {
      littleEndian = true;
    } else if (BOM === 19789) {
      littleEndian = false;
    } else {
      throw new TypeError("Invalid byte order value.");
    }
    const magicNumber = dataView.getUint16(2, littleEndian);
    let bigTiff;
    if (magicNumber === 42) {
      bigTiff = false;
    } else if (magicNumber === 43) {
      bigTiff = true;
      const offsetByteSize = dataView.getUint16(4, littleEndian);
      if (offsetByteSize !== 8) {
        throw new Error("Unsupported offset byte-size.");
      }
    } else {
      throw new TypeError("Invalid magic number.");
    }
    const firstIFDOffset = bigTiff ? dataView.getUint64(8, littleEndian) : dataView.getUint32(4, littleEndian);
    return new GeoTIFF(source, littleEndian, bigTiff, firstIFDOffset, options);
  }
  /**
   * Closes the underlying file buffer
   * N.B. After the GeoTIFF has been completely processed it needs
   * to be closed but only if it has been constructed from a file.
   */
  close() {
    if (typeof this.source.close === "function") {
      return this.source.close();
    }
    return false;
  }
}
async function fromArrayBuffer(arrayBuffer, signal) {
  return GeoTIFF.fromSource(makeBufferSource(arrayBuffer), signal);
}
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
    let dataScale = 1;
    if (filename && filename.includes("False_color")) {
      console.log("Detected Sentinel-2 false color image");
      dataScale = 1;
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
    const processedArrays = Array.from({ length: rasters.length }, (_, i) => {
      const band = rasters[i];
      if (dataScale !== 1) {
        const typedBand = band;
        const newArray = new Float32Array(typedBand.length);
        for (let j = 0; j < typedBand.length; j++) {
          newArray[j] = typedBand[j] === noDataValue ? noDataValue : typedBand[j] * dataScale;
        }
        return newArray;
      }
      return band;
    });
    console.log("Creating GeoRaster with fromArrays using these parameters:", {
      noDataValue,
      projection: 4326,
      xmin: xMin,
      ymin: yMin,
      xmax: xMax,
      ymax: yMax,
      pixelWidth: (xMax - xMin) / width,
      pixelHeight: (yMax - yMin) / height,
      arraysLength: processedArrays.length,
      minsLength: mins.length,
      maxsLength: maxs.length
    });
    if (!processedArrays || !Array.isArray(processedArrays) || processedArrays.length === 0) {
      throw new Error("Invalid or empty arrays provided to fromArrays");
    }
    let fromArraysFunction = georaster_browser_bundle_minExports.fromArrays;
    if (typeof fromArraysFunction !== "function") {
      console.error("Local fromArrays is not a function!", typeof fromArraysFunction);
      if (typeof window !== "undefined" && typeof window.fromArrays === "function") {
        console.log("Using window.fromArrays instead");
        fromArraysFunction = window.fromArrays;
      } else {
        console.error("Failed to get fromArrays function");
        throw new Error("GeoRaster library not properly loaded. fromArrays is not a function.");
      }
    }
    const georaster = await fromArraysFunction({
      noDataValue,
      projection: 4326,
      // WGS84
      xmin: xMin,
      ymin: yMin,
      xmax: xMax,
      ymax: yMax,
      pixelWidth: (xMax - xMin) / width,
      pixelHeight: (yMax - yMin) / height,
      arrays: processedArrays,
      mins: mins.length > 0 ? mins : void 0,
      maxs: maxs.length > 0 ? maxs : void 0
    });
    console.log("GeoRaster created with properties:", {
      dimensions: georaster.dimensions,
      pixelWidth: georaster.pixelWidth,
      pixelHeight: georaster.pixelHeight,
      noDataValue: georaster.noDataValue,
      projection: georaster.projection,
      numberOfRasters: georaster.numberOfRasters,
      bounds: [georaster.xmin, georaster.ymin, georaster.xmax, georaster.ymax]
    });
    return georaster;
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
            const rasters = await image.readRasters({
              interleave: true,
              pool: null,
              window: [0, 0, width, height]
            });
            let fromArraysFunction = georaster_browser_bundle_minExports.fromArrays;
            if (typeof fromArraysFunction !== "function") {
              console.error("Local fromArrays is not a function in Copernicus handling!", typeof fromArraysFunction);
              if (typeof window !== "undefined" && typeof window.fromArrays === "function") {
                console.log("Using window.fromArrays instead for Copernicus image");
                fromArraysFunction = window.fromArrays;
              } else {
                console.error("Failed to get fromArrays function for Copernicus image");
                throw new Error("GeoRaster library not properly loaded for Copernicus image. fromArrays is not a function.");
              }
            }
            georaster = await fromArraysFunction({
              noDataValue: 0,
              projection: 4326,
              // WGS84
              xmin: xMin,
              ymin: yMin,
              xmax: xMax,
              ymax: yMax,
              pixelWidth: (xMax - xMin) / width,
              pixelHeight: (yMax - yMin) / height,
              arrays: Array.from({ length: rasters.length }, (_, i) => rasters[i])
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
            let fromArraysFunction = georaster_browser_bundle_minExports.fromArrays;
            if (typeof fromArraysFunction !== "function") {
              console.error("Local fromArrays is not a function in alternative approach!", typeof fromArraysFunction);
              if (typeof window !== "undefined" && typeof window.fromArrays === "function") {
                console.log("Using window.fromArrays instead for alternative approach");
                fromArraysFunction = window.fromArrays;
              } else {
                console.error("Failed to get fromArrays function for alternative approach");
                throw new Error("GeoRaster library not properly loaded for alternative approach. fromArrays is not a function.");
              }
            }
            const alternativeGeoraster = await fromArraysFunction({
              noDataValue: 0,
              projection: 4326,
              // WGS84
              xmin: xMin,
              ymin: yMin,
              xmax: xMax,
              ymax: yMax,
              pixelWidth: (xMax - xMin) / width,
              pixelHeight: (yMax - yMin) / height,
              arrays: Array.from({ length: rasters.length }, (_, i) => rasters[i]),
              // Use arrays instead of values
              mins: altMins.length > 0 ? altMins : void 0,
              maxs: altMaxs.length > 0 ? altMaxs : void 0
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
    const url = URL.createObjectURL(file);
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
  URL.revokeObjectURL(image.url);
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
const SatelliteImageUploadPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SatelliteImageUploadPage
}, Symbol.toStringTag, { value: "Module" }));
export {
  LercParameters as L,
  SatelliteImageUploadPage$1 as S,
  LercAddCompression as a
};
//# sourceMappingURL=SatelliteImageUploadPage-CMKKeljF.js.map
