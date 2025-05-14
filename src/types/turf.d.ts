declare module '@turf/turf' {
  import * as GeoJSON from 'geojson';

  // Basic GeoJSON types
  export type Position = GeoJSON.Position;
  export type Point = GeoJSON.Point;
  export type LineString = GeoJSON.LineString;
  export type Polygon = GeoJSON.Polygon;
  export type MultiPoint = GeoJSON.MultiPoint;
  export type MultiLineString = GeoJSON.MultiLineString;
  export type MultiPolygon = GeoJSON.MultiPolygon;
  export type GeometryCollection = GeoJSON.GeometryCollection;
  export type Feature<G = any, P = any> = GeoJSON.Feature<G, P>;
  export type FeatureCollection<G = any, P = any> = GeoJSON.FeatureCollection<G, P>;

  // Common turf functions used in the project
  export function polygon(coordinates: Position[][], properties?: any): Feature<Polygon>;
  export function booleanIntersects(feature1: any, feature2: any): boolean;
  export function featureCollection(features: Feature[]): FeatureCollection;
  export function bbox(geojson: FeatureCollection | Feature | any): [number, number, number, number];
  export function length(geojson: any, options?: { units: string }): number;
  export function feature(geometry: any, properties?: any): Feature;
  export function lineString(coordinates: Position[], properties?: any): Feature<LineString>;
  export function lineSliceAlong(line: Feature<LineString> | LineString, startDist: number, stopDist: number, options?: { units: string }): Feature<LineString>;

  // Add other turf functions as needed
}
