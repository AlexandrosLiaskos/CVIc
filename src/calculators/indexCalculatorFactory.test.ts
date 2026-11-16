import { describe, expect, it } from 'vitest';
import { IndexCalculatorFactory } from './indexCalculatorFactory';
import { IndexRegistry } from '../indices';
import { icviValues, makeParameter, makeSegment, EVI_IDS, SVI_IDS } from '../testHelpers';
import type { Formula } from '../types';

function formula(type: string): Formula {
  return { type: type as Formula['type'], name: type, description: '' };
}

const cviParameters = ['a', 'b', 'c', 'd', 'e', 'f'].map(id => makeParameter(id));
const icviParameters = [...EVI_IDS, ...SVI_IDS].map(id => makeParameter(id));

describe('IndexCalculatorFactory.calculate', () => {
  it('computes the CVI as the geometric mean of the ranks of a segment', () => {
    // 1 × 4 × 1 × 4 × 1 × 4 = 64 = 2^6, so CVI = 2
    const segment = makeSegment('s1', { a: 1, b: 4, c: 1, d: 4, e: 1, f: 4 });
    const result = IndexCalculatorFactory.calculate(segment, cviParameters, formula('cvi-geometric'));
    expect(result.value).toBeCloseTo(2, 12);
    expect(result.formula).toBe('CVI = ⁿ√(∏Vi) = 2.000');
  });

  it('computes the arithmetic ICVI of a segment with its two components', () => {
    // EVI = 3.0 / 6 = 0.5; SVI = 4.2 / 6 = 0.7; ICVI = (0.5 + 0.7) / 2 = 0.6
    const segment = makeSegment('s1', icviValues([0.1, 0.3, 0.5, 0.7, 0.9, 0.5], [0.9, 0.9, 0.7, 0.7, 0.5, 0.5]));
    const result = IndexCalculatorFactory.calculate(segment, icviParameters, formula('icvi-arithmetic'));
    expect(result.value).toBeCloseTo(0.6, 12);
    expect(result.components?.['EVI (50%)']).toBeCloseTo(0.5, 12);
    expect(result.components?.['SVI (50%)']).toBeCloseTo(0.7, 12);
  });

  it('computes the geometric ICVI of a segment with its two components', () => {
    // EVI = (0.09^3)^(1/6) = 0.3; SVI = 0.9; ICVI = (0.3 + 0.9) / 2 = 0.6
    const segment = makeSegment('s1', icviValues([0.1, 0.9, 0.1, 0.9, 0.1, 0.9], Array(6).fill(0.9)));
    const result = IndexCalculatorFactory.calculate(segment, icviParameters, formula('icvi-geometric'));
    expect(result.value).toBeCloseTo(0.6, 12);
    expect(result.components?.['EVI (50%)']).toBeCloseTo(0.3, 12);
    expect(result.components?.['SVI (50%)']).toBeCloseTo(0.9, 12);
  });

  it('refuses a formula type that it does not know', () => {
    const segment = makeSegment('s1', { a: 1 });
    expect(() => IndexCalculatorFactory.calculate(segment, cviParameters, formula('traditional'))).toThrow(
      'Unsupported formula type: traditional',
    );
  });

  it('computes every formula that the registered indices offer', () => {
    for (const index of IndexRegistry.getAllIndices()) {
      const types = new Set([index.formula, ...(index.availableFormulas ?? []).map(f => f.id)]);
      const parameters = index.requiredParameters.map(p => makeParameter(p.id));
      // Every parameter takes the middle class of its ranking table
      const middle = Object.fromEntries(index.requiredParameters.map(p => [p.id, p.rankingTable[2].value]));
      const segment = makeSegment('s1', middle);
      for (const type of types) {
        const result = IndexCalculatorFactory.calculate(segment, parameters, formula(type));
        // With all values equal to the middle class, every mean equals that class: 3 for the CVI, 0.5 for the ICVI
        expect(result.value).toBeCloseTo(index.requiredParameters[0].rankingTable[2].value, 12);
      }
    }
  });
});

describe('IndexCalculatorFactory.hasAllParameters', () => {
  it('is true only when the segment has a value for every parameter', () => {
    const complete = makeSegment('s1', { a: 1, b: 2, c: 3, d: 4, e: 5, f: 5 });
    const incomplete = makeSegment('s2', { a: 1, b: 2 });
    expect(IndexCalculatorFactory.hasAllParameters(complete, cviParameters, formula('cvi-geometric'))).toBe(true);
    expect(IndexCalculatorFactory.hasAllParameters(incomplete, cviParameters, formula('cvi-geometric'))).toBe(false);
    expect(IndexCalculatorFactory.hasAllParameters(incomplete, cviParameters, formula('icvi-arithmetic'))).toBe(false);
  });

  it('is false for a formula type that it does not know', () => {
    const complete = makeSegment('s1', { a: 1, b: 2, c: 3, d: 4, e: 5, f: 5 });
    expect(IndexCalculatorFactory.hasAllParameters(complete, cviParameters, formula('traditional'))).toBe(false);
  });
});
