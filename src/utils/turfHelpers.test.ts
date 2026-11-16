import { describe, expect, it } from 'vitest';
import type { Feature, LineString } from 'geojson';
import {
  calculateBbox,
  calculateLength,
  checkIntersection,
  createFeature,
  createFeatureCollection,
  createLineString,
  createPolygon,
  sliceLineAlong,
} from './turfHelpers';

// Turf.js measures distances on a sphere with the mean Earth radius R = 6 371 008.8 m. An arc of 0.01
// degrees along the equator is R × 0.01 × π / 180 = 1111.951 m long.

describe('turfHelpers', () => {
  const equatorLine = createLineString([[0, 0], [0.01, 0]]);

  it('creates a line feature with its coordinates and properties', () => {
    const line = createLineString([[1, 2], [3, 4]], { name: 'shore' });
    expect(line.type).toBe('Feature');
    expect(line.geometry).toEqual({ type: 'LineString', coordinates: [[1, 2], [3, 4]] });
    expect(line.properties).toEqual({ name: 'shore' });
  });

  it('creates a polygon feature and a feature from a geometry', () => {
    const ring = [[0, 0], [1, 0], [1, 1], [0, 0]];
    expect(createPolygon([ring]).geometry).toEqual({ type: 'Polygon', coordinates: [ring] });
    const feature = createFeature({ type: 'Point', coordinates: [5, 6] }, { id: 7 });
    expect(feature).toMatchObject({ type: 'Feature', geometry: { type: 'Point', coordinates: [5, 6] }, properties: { id: 7 } });
  });

  it('collects features in a feature collection', () => {
    const features = [createLineString([[0, 0], [1, 1]]), createLineString([[2, 2], [3, 3]])];
    const collection = createFeatureCollection(features);
    expect(collection.type).toBe('FeatureCollection');
    expect(collection.features).toHaveLength(2);
  });

  it('returns the bounding box as west, south, east and north', () => {
    const collection = createFeatureCollection([
      createLineString([[22.86, 39.74], [22.88, 39.69]]),
      createLineString([[22.9, 39.7], [22.85, 39.71]]),
    ]);
    // Lowest longitude 22.85, lowest latitude 39.69, highest longitude 22.9, highest latitude 39.74
    expect(calculateBbox(collection)).toEqual([22.85, 39.69, 22.9, 39.74]);
  });

  it('measures the length of a line in the unit asked for', () => {
    // 1111.951 m = 1.111951 km
    expect(calculateLength(equatorLine, { units: 'meters' })).toBeCloseTo(1111.951, 2);
    expect(calculateLength(equatorLine, { units: 'kilometers' })).toBeCloseTo(1.111951, 5);
  });

  it('tells whether two lines intersect', () => {
    const crossing = createLineString([[0.005, -0.01], [0.005, 0.01]]);
    const apart = createLineString([[0, 0.01], [0.01, 0.01]]);
    expect(checkIntersection(equatorLine, crossing)).toBe(true);
    expect(checkIntersection(equatorLine, apart)).toBe(false);
  });

  it('cuts the part of a line between two distances from its start', () => {
    // A quarter of the line is 277.988 m and three quarters are 833.963 m. On the equator the distance is
    // proportional to the longitude, so the part runs from 0.0025 to 0.0075 degrees and is 555.975 m long.
    const part = sliceLineAlong(equatorLine as Feature<LineString>, 277.988, 833.963, { units: 'meters' });
    const coordinates = part.geometry.coordinates;
    expect(coordinates[0][0]).toBeCloseTo(0.0025, 6);
    expect(coordinates[coordinates.length - 1][0]).toBeCloseTo(0.0075, 6);
    expect(calculateLength(part, { units: 'meters' })).toBeCloseTo(555.975, 2);
  });
});
