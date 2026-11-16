import { beforeEach, describe, expect, it, vi } from 'vitest';
import { applyParameterValueToSegments } from './valueAssignmentLogic';
import { indexedDBService } from '../services/indexedDBService';
import { makeParameter, makeSegment } from '../testHelpers';

// The storage of the browser is replaced, so the test runs without a browser.
vi.mock('../services/indexedDBService', () => ({
  indexedDBService: { storeShorelineData: vi.fn(() => Promise.resolve('current-segments')) },
}));

describe('applyParameterValueToSegments', () => {
  const geomorphology = makeParameter('cvi_coastal_geomorphology', { type: 'categorical' });
  const slope = makeParameter('cvi_coastal_slope', { type: 'numerical' });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('writes the value and its vulnerability to the selected segments only', async () => {
    const segments = [makeSegment('s1', {}), makeSegment('s2', {}), makeSegment('s3', {})];
    const result = await applyParameterValueToSegments(segments, ['s1', 's3'], geomorphology, '5', 5);

    const expected = { type: 'categorical', value: '5', vulnerability: 5 };
    expect(result[0].parameters.cvi_coastal_geomorphology).toEqual(expected);
    expect(result[0].properties.parameters?.cvi_coastal_geomorphology).toEqual(expected);
    expect(result[2].parameters.cvi_coastal_geomorphology).toEqual(expected);
    expect(result[1]).toBe(segments[1]);
    expect(result[1].parameters).toEqual({});
    expect(indexedDBService.storeShorelineData).toHaveBeenCalledTimes(1);
  });

  it('stores the value of a numerical parameter as a number', async () => {
    const segments = [makeSegment('s1', {})];
    const result = await applyParameterValueToSegments(segments, ['s1'], slope, '3.5', 4);
    expect(result[0].parameters.cvi_coastal_slope).toEqual({ type: 'numerical', value: 3.5, vulnerability: 4 });
  });

  it('leaves a segment unchanged when the value of a numerical parameter is not a number', async () => {
    const segments = [makeSegment('s1', {})];
    const result = await applyParameterValueToSegments(segments, ['s1'], slope, 'steep', 4);
    expect(result[0]).toBe(segments[0]);
    expect(indexedDBService.storeShorelineData).not.toHaveBeenCalled();
  });

  it('keeps the values of the other parameters of a segment', async () => {
    const segments = [makeSegment('s1', { cvi_mean_tide_range: 2 })];
    const result = await applyParameterValueToSegments(segments, ['s1'], geomorphology, '3', 3);
    expect(Object.keys(result[0].parameters).sort()).toEqual(['cvi_coastal_geomorphology', 'cvi_mean_tide_range']);
    expect(result[0].parameters.cvi_mean_tide_range.vulnerability).toBe(2);
  });

  it('does not store anything when the value is already assigned', async () => {
    const segments = [makeSegment('s1', {})];
    const first = await applyParameterValueToSegments(segments, ['s1'], geomorphology, '5', 5);
    vi.mocked(indexedDBService.storeShorelineData).mockClear();
    const second = await applyParameterValueToSegments(first, ['s1'], geomorphology, '5', 5);
    expect(second[0]).toBe(first[0]);
    expect(indexedDBService.storeShorelineData).not.toHaveBeenCalled();
  });
});
