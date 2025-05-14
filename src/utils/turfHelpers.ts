import * as turf from '@turf/turf';
import type { Feature, FeatureCollection, Geometry, LineString } from 'geojson';

/**
 * Creates a feature collection from an array of features
 */
export function createFeatureCollection(features: Feature[]): FeatureCollection {
  return turf.featureCollection(features);
}

/**
 * Calculates the bounding box of a GeoJSON object
 */
export function calculateBbox(geojson: FeatureCollection | Feature): [number, number, number, number] {
  return turf.bbox(geojson);
}

/**
 * Calculates the length of a GeoJSON object
 */
export function calculateLength(geojson: Feature | Geometry, options?: { units: string }): number {
  return turf.length(geojson, options);
}

/**
 * Creates a feature from a geometry
 */
export function createFeature(geometry: Geometry, properties?: any): Feature {
  return turf.feature(geometry, properties);
}

/**
 * Creates a line string feature
 */
export function createLineString(coordinates: number[][], properties?: any): Feature {
  return turf.lineString(coordinates, properties);
}

/**
 * Creates a polygon feature
 */
export function createPolygon(coordinates: number[][][], properties?: any): Feature {
  return turf.polygon(coordinates, properties);
}

/**
 * Checks if two features intersect
 */
export function checkIntersection(feature1: Feature | Geometry, feature2: Feature | Geometry): boolean {
  return turf.booleanIntersects(feature1, feature2);
}

/**
 * Slices a line at specified distances
 */
export function sliceLineAlong(line: Feature<LineString> | LineString, startDist: number, stopDist: number, options?: { units: string }): Feature<LineString> {
  return turf.lineSliceAlong(line, startDist, stopDist, options);
}
