import { beforeEach, describe, expect, it, vi } from 'vitest';
import { calculateAndSaveIndex } from './indexCalculations';
import { indexedDBService } from '../services/indexedDBService';
import { EVI_IDS, SVI_IDS, icviValues, makeParameter, makeSegment } from '../testHelpers';
import type { Formula } from '../types';

// The storage of the browser is replaced, so the test runs without a browser and checks what the function
// computes and what it hands to the storage.
vi.mock('../services/indexedDBService', () => ({
  indexedDBService: { storeShorelineData: vi.fn(() => Promise.resolve('current-segments')) },
}));

const cviFormula: Formula = { type: 'cvi-geometric', name: 'CVI', description: '' };
const icviFormula: Formula = { type: 'icvi-geometric', name: 'ICVI', description: '' };
const cviParameters = ['a', 'b', 'c', 'd', 'e', 'f'].map(id => makeParameter(id, { weight: 1 / 6 }));
const icviParameters = [...EVI_IDS, ...SVI_IDS].map(id => makeParameter(id, { weight: 1 / 12 }));

describe('calculateAndSaveIndex', () => {
  const setSegments = vi.fn();
  const setScores = vi.fn();
  const setError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('rounds the CVI of each segment to two decimals and stores it with the formula type', async () => {
    // s1: 1 × 2 × 3 × 4 × 5 × 5 = 600 and 600^(1/6) = 2.904191, which rounds to 2.90
    // s2: 1 × 4 × 1 × 4 × 1 × 4 = 64 and 64^(1/6) = 2
    const segments = [
      makeSegment('s1', { a: 1, b: 2, c: 3, d: 4, e: 5, f: 5 }),
      makeSegment('s2', { a: 1, b: 4, c: 1, d: 4, e: 1, f: 4 }),
    ];
    await calculateAndSaveIndex(segments, cviParameters, cviFormula, setSegments, setScores, setError);

    expect(setScores).toHaveBeenCalledWith({ s1: 2.9, s2: 2 });
    const stored = setSegments.mock.calls[0][0];
    expect(stored[0].properties.vulnerabilityIndex).toBe(2.9);
    expect(stored[0].properties.vulnerabilityFormula).toBe('cvi-geometric');
    expect(indexedDBService.storeShorelineData).toHaveBeenCalledTimes(1);
    expect(vi.mocked(indexedDBService.storeShorelineData).mock.calls[0][0]).toBe('current-segments');
    expect(setError).toHaveBeenLastCalledWith(null);
  });

  it('rounds the geometric ICVI of a segment to two decimals', async () => {
    // EVI = 0.004725^(1/6) = 0.409638; SVI = 0.099225^(1/6) = 0.680409
    // ICVI = (0.409638 + 0.680409) / 2 = 0.545024, which rounds to 0.55
    const segments = [makeSegment('s1', icviValues([0.1, 0.3, 0.5, 0.7, 0.9, 0.5], [0.9, 0.9, 0.7, 0.7, 0.5, 0.5]))];
    await calculateAndSaveIndex(segments, icviParameters, icviFormula, setSegments, setScores, setError);
    expect(setScores).toHaveBeenCalledWith({ s1: 0.55 });
  });

  it('gives no score to a segment that lacks a value', async () => {
    const segments = [
      makeSegment('s1', { a: 1, b: 2, c: 3 }),
      makeSegment('s2', { a: 3, b: 3, c: 3, d: 3, e: 3, f: 3 }),
    ];
    await calculateAndSaveIndex(segments, cviParameters, cviFormula, setSegments, setScores, setError);
    // s2: (3^6)^(1/6) = 3
    expect(setScores).toHaveBeenCalledWith({ s2: 3 });
  });

  it('reports an error and computes nothing when there are no segments', async () => {
    await calculateAndSaveIndex([], cviParameters, cviFormula, setSegments, setScores, setError);
    expect(setScores).not.toHaveBeenCalled();
    expect(indexedDBService.storeShorelineData).not.toHaveBeenCalled();
    expect(setError).toHaveBeenLastCalledWith(expect.stringContaining('No segments found for calculation'));
  });

  it('reports an error when no parameter has a weight above zero', async () => {
    const parameters = cviParameters.map(parameter => ({ ...parameter, weight: 0 }));
    const segments = [makeSegment('s1', { a: 1, b: 2, c: 3, d: 4, e: 5, f: 5 })];
    await calculateAndSaveIndex(segments, parameters, cviFormula, setSegments, setScores, setError);
    expect(setScores).not.toHaveBeenCalled();
    expect(setError).toHaveBeenLastCalledWith(expect.stringContaining('No relevant parameters found for calculation'));
  });
});
