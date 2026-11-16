import { describe, expect, it } from 'vitest';
import { CVICalculator } from './cviCalculator';
import { makeParameter, makeSegment } from '../testHelpers';

// The formula that the application states for the CVI (src/indices/cvi/definition.ts and
// src/config/formulas.ts) is the geometric mean of the n parameter ranks:
//
//   CVI = (V1 × V2 × … × Vn)^(1/n)
//
// Every expected value below is worked out from this definition by hand.

describe('CVICalculator.calculate', () => {
  it('returns the common rank when all six ranks are equal', () => {
    // (1^6)^(1/6) = 1, (3^6)^(1/6) = 3 and (5^6)^(1/6) = 5
    expect(CVICalculator.calculate([1, 1, 1, 1, 1, 1])).toBeCloseTo(1, 12);
    expect(CVICalculator.calculate([3, 3, 3, 3, 3, 3])).toBeCloseTo(3, 12);
    expect(CVICalculator.calculate([5, 5, 5, 5, 5, 5])).toBeCloseTo(5, 12);
  });

  it('returns the sixth root of the product of six ranks', () => {
    // 1 × 4 × 1 × 4 × 1 × 4 = 64 = 2^6, so the sixth root is 2
    expect(CVICalculator.calculate([1, 4, 1, 4, 1, 4])).toBeCloseTo(2, 12);
    // 1 × 2 × 3 × 4 × 5 × 5 = 600
    // ln 600 = 6.396930; 6.396930 / 6 = 1.066155; e^1.066155 = 2.904191
    expect(CVICalculator.calculate([1, 2, 3, 4, 5, 5])).toBeCloseTo(2.904191, 6);
  });

  it('takes the root of the number of values, which need not be six', () => {
    // 2 × 8 = 16 and 16^(1/2) = 4
    expect(CVICalculator.calculate([2, 8])).toBeCloseTo(4, 12);
    // 3 × 9 × 27 = 729 = 9^3 and 729^(1/3) = 9
    expect(CVICalculator.calculate([3, 9, 27])).toBeCloseTo(9, 12);
  });

  it('does not depend on the order of the ranks', () => {
    // The product 600 is the same in any order, so the result is 2.904191 as above
    expect(CVICalculator.calculate([5, 5, 4, 3, 2, 1])).toBeCloseTo(2.904191, 6);
    expect(CVICalculator.calculate([3, 5, 1, 5, 2, 4])).toBeCloseTo(2.904191, 6);
  });

  it('lies between the lowest and the highest rank', () => {
    // A geometric mean of positive numbers is never below their minimum or above their maximum
    const result = CVICalculator.calculate([2, 2, 3, 4, 4, 5]);
    expect(result).toBeGreaterThanOrEqual(2);
    expect(result).toBeLessThanOrEqual(5);
  });

  it('returns 0 for an empty list of values', () => {
    expect(CVICalculator.calculate([])).toBe(0);
  });

  it('replaces a value of zero by 1e-9, as the code comment states', () => {
    // (1e-9 × 1)^(1/2) = 1e-4.5 = 3.162278e-5
    expect(CVICalculator.calculate([0, 1])).toBeCloseTo(3.162278e-5, 10);
  });
});

describe('CVICalculator.extractValues', () => {
  const parameters = [makeParameter('a'), makeParameter('b'), makeParameter('c')];

  it('reads the vulnerability of each parameter in the order of the parameter list', () => {
    const segment = makeSegment('s1', { c: 5, a: 1, b: 3 });
    expect(CVICalculator.extractValues(segment, parameters)).toEqual([1, 3, 5]);
  });

  it('limits each vulnerability to the range from 1 to 5', () => {
    const segment = makeSegment('s1', { a: 0.2, b: 3, c: 7 });
    expect(CVICalculator.extractValues(segment, parameters)).toEqual([1, 3, 5]);
  });

  it('leaves out a parameter that has no value in the segment', () => {
    const segment = makeSegment('s1', { a: 2, c: 4 });
    expect(CVICalculator.extractValues(segment, parameters)).toEqual([2, 4]);
  });
});

describe('CVICalculator.hasAllParameters', () => {
  const parameters = [makeParameter('a'), makeParameter('b')];

  it('is true when the segment has a value for every parameter', () => {
    expect(CVICalculator.hasAllParameters(makeSegment('s1', { a: 1, b: 2 }), parameters)).toBe(true);
  });

  it('is false when a value is missing', () => {
    expect(CVICalculator.hasAllParameters(makeSegment('s1', { a: 1 }), parameters)).toBe(false);
  });
});
