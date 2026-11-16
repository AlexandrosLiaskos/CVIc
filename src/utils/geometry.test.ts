import { describe, expect, it } from 'vitest';
import type { Feature, FeatureCollection, LineString, MultiLineString } from 'geojson';
import { segmentShoreline } from './geometry';

// Turf.js measures distances on a sphere with the mean Earth radius R = 6 371 008.8 m
// (node_modules/@turf/helpers). On that sphere an arc of 0.01 degrees along the equator, or along a
// meridian, has the length
//
//   R × 0.01 × π / 180 = 6 371 008.8 × 0.000174533 = 1111.951 m
//
// Along the equator the distance is proportional to the difference in longitude.
const ARC = 1111.951;

const equatorLine: LineString = { type: 'LineString', coordinates: [[0, 0], [0.01, 0]] };
const meridianLine: LineString = { type: 'LineString', coordinates: [[1, 0], [1, 0.01]] };

function collection(...geometries: (LineString | MultiLineString)[]): FeatureCollection<LineString | MultiLineString> {
  const features: Feature<LineString | MultiLineString>[] = geometries.map(geometry => ({
    type: 'Feature',
    properties: {},
    geometry,
  }));
  return { type: 'FeatureCollection', features };
}

describe('segmentShoreline', () => {
  it('divides a line into the smallest number of equal segments that are not longer than the resolution', () => {
    // 1111.951 / 500 = 2.22, so 3 segments are needed; each is 1111.951 / 3 = 370.650 m long
    const segments = segmentShoreline(collection(equatorLine), 500);
    expect(segments).toHaveLength(3);
    for (const segment of segments) {
      expect(segment.properties.length).toBeCloseTo(370.65, 1);
      expect(segment.properties.length).toBeLessThanOrEqual(500);
    }
  });

  it('places the segment ends at equal distances along the line', () => {
    // Thirds of 0.01 degrees of longitude: 0, 0.003333, 0.006667 and 0.01
    const segments = segmentShoreline(collection(equatorLine), 500);
    const ends = segments.map(segment => {
      const coordinates = (segment.geometry as LineString).coordinates;
      return [coordinates[0], coordinates[coordinates.length - 1]];
    });
    expect(ends[0][0][0]).toBeCloseTo(0, 6);
    expect(ends[0][1][0]).toBeCloseTo(0.003333, 6);
    expect(ends[1][0][0]).toBeCloseTo(0.003333, 6);
    expect(ends[1][1][0]).toBeCloseTo(0.006667, 6);
    expect(ends[2][0][0]).toBeCloseTo(0.006667, 6);
    expect(ends[2][1][0]).toBeCloseTo(0.01, 6);
    for (const [start, end] of ends) {
      expect(start[1]).toBeCloseTo(0, 9);
      expect(end[1]).toBeCloseTo(0, 9);
    }
  });

  it('keeps the whole length of the line', () => {
    // 1111.951 / 300 = 3.71, so 4 segments of 277.988 m; their sum is the length of the line
    const segments = segmentShoreline(collection(equatorLine), 300);
    expect(segments).toHaveLength(4);
    const total = segments.reduce((sum, segment) => sum + (segment.properties.length ?? 0), 0);
    expect(total).toBeCloseTo(ARC, 2);
  });

  it('returns the line as one segment when the resolution is longer than the line', () => {
    const segments = segmentShoreline(collection(equatorLine), 2000);
    expect(segments).toHaveLength(1);
    expect(segments[0].properties.length).toBeCloseTo(ARC, 2);
    expect(segments[0].geometry.type).toBe('LineString');
  });

  it('numbers the segments of each line of a MultiLineString separately', () => {
    // Each of the two lines is 1111.951 m long; 1111.951 / 600 = 1.85, so 2 segments of 555.975 m per line
    const multiLine: MultiLineString = {
      type: 'MultiLineString',
      coordinates: [equatorLine.coordinates, meridianLine.coordinates],
    };
    const segments = segmentShoreline(collection(multiLine), 600);
    expect(segments).toHaveLength(4);
    expect(segments.map(segment => segment.properties.lineIndex)).toEqual([0, 0, 1, 1]);
    expect(segments.map(segment => segment.properties.index)).toEqual([0, 1, 0, 1]);
    for (const segment of segments) {
      expect(segment.properties.length).toBeCloseTo(555.975, 2);
    }
  });

  it('gives the segments of all features consecutive ids that start at segment-1', () => {
    const segments = segmentShoreline(collection(equatorLine, meridianLine), 600);
    expect(segments.map(segment => segment.id)).toEqual(['segment-1', 'segment-2', 'segment-3', 'segment-4']);
    expect(segments.map(segment => segment.properties.lineIndex)).toEqual([0, 0, 0, 0]);
    expect(segments.map(segment => segment.properties.index)).toEqual([0, 1, 0, 1]);
  });

  it('creates every segment as a feature without parameter values', () => {
    const [segment] = segmentShoreline(collection(equatorLine), 2000);
    expect(segment.type).toBe('Feature');
    expect(segment.parameters).toEqual({});
    expect(segment.properties.values).toEqual({});
  });

  it('returns no segments for an empty collection', () => {
    expect(segmentShoreline(collection(), 100)).toEqual([]);
  });

  // Expected failure: a defect of the application, which this pull request reports and does not fix.
  //
  // The function writes the id of a segment twice: as the id of the feature and as the property `id`. It
  // increases the counter between the two, so the property is one higher than the feature id: the first
  // segment has the id 'segment-1' and the property id 'segment-2'. The segmentation page
  // (src/pages/SegmentationPage.tsx) stores only the geometry and the properties, and the later pages read
  // the id from the properties. The segments of a shoreline are therefore numbered from 2 in the tables
  // and in the exported files.
  //
  // Remove `.fails` when the two ids agree.
  it.fails('writes the same id to the feature and to its properties', () => {
    const segments = segmentShoreline(collection(equatorLine), 500);
    expect(segments.map(segment => segment.properties.id)).toEqual(segments.map(segment => segment.id));
  });
});
