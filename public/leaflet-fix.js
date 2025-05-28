/**
 * Leaflet SVG namespace fix
 *
 * This script fixes issues with Leaflet's SVG handling in production builds
 * where minification changes variable names.
 */

// Create SVG namespace helper
const svgNS = "http://www.w3.org/2000/svg";

// Define a factory function for creating SVG elements
const createSvgElement = (name) => {
  return () => document.createElementNS(svgNS, name);
};

// Define the attribute setter function
const setAttr = (el, attrs) => {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  return el;
};

// Create the QO object with all required methods
const QO = {
  defs: createSvgElement('defs'),
  svg: createSvgElement('svg'),
  path: createSvgElement('path'),
  circle: createSvgElement('circle'),
  rect: createSvgElement('rect'),
  line: createSvgElement('line'),
  polyline: createSvgElement('polyline'),
  polygon: createSvgElement('polygon'),
  g: createSvgElement('g'),
  use: createSvgElement('use'),
  symbol: createSvgElement('symbol'),
  clipPath: createSvgElement('clipPath'),
  mask: createSvgElement('mask'),
  setAttr
};

// Also create QI with the same methods
const QI = { ...QO };

// Assign to window
window.QO = QO;
window.QI = QI;

// Create a global helper
window._SVG_NAMESPACE_HELPER = {
  createElementNS: (name) => document.createElementNS(svgNS, name),
  setAttr
};

console.log('Leaflet SVG namespace fix applied for production build');
