import { describe, expect, it } from 'vitest';
import { ICVICalculator } from './icviCalculator';
import { EVI_IDS, SVI_IDS, makeParameter, makeSegment } from '../testHelpers';
import type { Parameter } from '../types';

// The formulas that the application states for the ICVI (src/config/formulas.ts), with the six
// environmental values a to f and the six socioeconomic values g to l, each between 0.1 and 0.9:
//
//   arithmetic:  EVI = (a + b + c + d + e + f) / 6     SVI = (g + h + i + j + k + l) / 6
//   geometric:   EVI = (a × b × c × d × e × f)^(1/6)   SVI = (g × h × i × j × k × l)^(1/6)
//   both:        ICVI = (EVI + SVI) / 2
//
// Every expected value below is worked out from these definitions by hand.

/** The twelve ICVI parameters with the given values: six for the EVI, then six for the SVI. */
function parametersWithValues(evi: (number | undefined)[], svi: (number | undefined)[]): Parameter[] {
  return [
    ...EVI_IDS.map((id, i) => makeParameter(id, { vulnerabilityValue: evi[i] })),
    ...SVI_IDS.map((id, i) => makeParameter(id, { vulnerabilityValue: svi[i] })),
  ];
}

describe('ICVICalculator.calculateArithmetic', () => {
  it('averages the six environmental and the six socioeconomic values, then the two indices', () => {
    // EVI = (0.1 + 0.3 + 0.5 + 0.7 + 0.9 + 0.5) / 6 = 3.0 / 6 = 0.5
    // SVI = (0.9 + 0.9 + 0.7 + 0.7 + 0.5 + 0.5) / 6 = 4.2 / 6 = 0.7
    // ICVI = (0.5 + 0.7) / 2 = 0.6
    const result = ICVICalculator.calculateArithmetic(
      parametersWithValues([0.1, 0.3, 0.5, 0.7, 0.9, 0.5], [0.9, 0.9, 0.7, 0.7, 0.5, 0.5]),
    );
    expect(result.components.evi).toBeCloseTo(0.5, 12);
    expect(result.components.svi).toBeCloseTo(0.7, 12);
    expect(result.value).toBeCloseTo(0.6, 12);
  });

  it('returns the ends of the scale when all values are at one end', () => {
    // All values 0.1: EVI = SVI = 0.6 / 6 = 0.1 and ICVI = 0.1. All values 0.9: ICVI = 0.9.
    const lowest = ICVICalculator.calculateArithmetic(parametersWithValues(Array(6).fill(0.1), Array(6).fill(0.1)));
    const highest = ICVICalculator.calculateArithmetic(parametersWithValues(Array(6).fill(0.9), Array(6).fill(0.9)));
    expect(lowest.value).toBeCloseTo(0.1, 12);
    expect(highest.value).toBeCloseTo(0.9, 12);
  });

  it('gives the two indices equal weight', () => {
    // EVI = 0.9 and SVI = 0.1 give (0.9 + 0.1) / 2 = 0.5, and so do EVI = 0.1 and SVI = 0.9
    const first = ICVICalculator.calculateArithmetic(parametersWithValues(Array(6).fill(0.9), Array(6).fill(0.1)));
    const second = ICVICalculator.calculateArithmetic(parametersWithValues(Array(6).fill(0.1), Array(6).fill(0.9)));
    expect(first.value).toBeCloseTo(0.5, 12);
    expect(second.value).toBeCloseTo(0.5, 12);
    expect(first.components).toEqual({ evi: expect.closeTo(0.9, 12), svi: expect.closeTo(0.1, 12) });
  });

  it('writes the calculation as text with three decimals', () => {
    const result = ICVICalculator.calculateArithmetic(
      parametersWithValues([0.1, 0.3, 0.5, 0.7, 0.9, 0.5], [0.9, 0.9, 0.7, 0.7, 0.5, 0.5]),
    );
    expect(result.formula).toBe('ICVI = (EVI + SVI)/2 = (0.500 + 0.700)/2 = 0.600');
  });

  it('counts a parameter without a value as 0.1', () => {
    // EVI = (0.9 × 5 + 0.1) / 6 = 4.6 / 6 = 0.766667; SVI = 0.9; ICVI = (0.766667 + 0.9) / 2 = 0.833333
    const result = ICVICalculator.calculateArithmetic(
      parametersWithValues([0.9, 0.9, 0.9, 0.9, 0.9, undefined], Array(6).fill(0.9)),
    );
    expect(result.components.evi).toBeCloseTo(0.766667, 6);
    expect(result.value).toBeCloseTo(0.833333, 6);
  });

  it('ignores a parameter that belongs to neither index', () => {
    const parameters = [
      ...parametersWithValues(Array(6).fill(0.5), Array(6).fill(0.5)),
      makeParameter('another_parameter', { vulnerabilityValue: 0.9 }),
    ];
    // Without the extra parameter: EVI = SVI = 0.5 and ICVI = 0.5
    expect(ICVICalculator.calculateArithmetic(parameters).value).toBeCloseTo(0.5, 12);
  });
});

describe('ICVICalculator.calculateGeometric', () => {
  it('takes the sixth root of each product, then the mean of the two indices', () => {
    // EVI: 0.1 × 0.9 × 0.1 × 0.9 × 0.1 × 0.9 = 0.09^3 = 0.000729 = 0.3^6, so EVI = 0.3
    // SVI: 0.9^6, so SVI = 0.9
    // ICVI = (0.3 + 0.9) / 2 = 0.6
    const result = ICVICalculator.calculateGeometric(
      parametersWithValues([0.1, 0.9, 0.1, 0.9, 0.1, 0.9], Array(6).fill(0.9)),
    );
    expect(result.components.evi).toBeCloseTo(0.3, 12);
    expect(result.components.svi).toBeCloseTo(0.9, 12);
    expect(result.value).toBeCloseTo(0.6, 12);
  });

  it('agrees with a logarithm calculation for mixed values', () => {
    // EVI: 0.1 × 0.3 × 0.5 × 0.7 × 0.9 × 0.5 = 0.004725
    //      ln 0.004725 = -5.354888; -5.354888 / 6 = -0.892481; e^-0.892481 = 0.409638
    // SVI: 0.9 × 0.9 × 0.7 × 0.7 × 0.5 × 0.5 = 0.099225
    //      ln 0.099225 = -2.310365; -2.310365 / 6 = -0.385061; e^-0.385061 = 0.680409
    // ICVI = (0.409638 + 0.680409) / 2 = 0.545024
    const result = ICVICalculator.calculateGeometric(
      parametersWithValues([0.1, 0.3, 0.5, 0.7, 0.9, 0.5], [0.9, 0.9, 0.7, 0.7, 0.5, 0.5]),
    );
    expect(result.components.evi).toBeCloseTo(0.409638, 6);
    expect(result.components.svi).toBeCloseTo(0.680409, 6);
    expect(result.value).toBeCloseTo(0.545024, 6);
  });

  it('writes the calculation as text with four decimals', () => {
    const result = ICVICalculator.calculateGeometric(
      parametersWithValues([0.1, 0.9, 0.1, 0.9, 0.1, 0.9], Array(6).fill(0.9)),
    );
    expect(result.formula).toBe('ICVI = (EVI + SVI)/2 = (0.3000 + 0.9000)/2 = 0.6000');
  });

  it('is never above the arithmetic result for the same values', () => {
    // The geometric mean of positive numbers is at most their arithmetic mean
    const parameters = parametersWithValues([0.1, 0.3, 0.5, 0.7, 0.9, 0.5], [0.9, 0.9, 0.7, 0.7, 0.5, 0.5]);
    const geometric = ICVICalculator.calculateGeometric(parameters).value;
    const arithmetic = ICVICalculator.calculateArithmetic(parameters).value;
    expect(geometric).toBeLessThanOrEqual(arithmetic);
  });

  it('counts a parameter without a value as 0.1', () => {
    // EVI: 0.1 × 0.9 × 0.1 × 0.9 × 0.9 × (missing, 0.1) = 0.000729, so EVI = 0.3; SVI = 0.3; ICVI = 0.3
    const result = ICVICalculator.calculateGeometric(
      parametersWithValues([0.1, 0.9, 0.1, 0.9, 0.9, undefined], Array(6).fill(0.3)),
    );
    expect(result.value).toBeCloseTo(0.3, 12);
  });
});

describe('ICVICalculator.extractValues', () => {
  const parameters = [makeParameter('icvi_slope'), makeParameter('icvi_land_use')];

  it('copies the vulnerability of the segment into each parameter', () => {
    const segment = makeSegment('s1', { icvi_slope: 0.7, icvi_land_use: 0.3 });
    const result = ICVICalculator.extractValues(segment, parameters);
    expect(result.map(p => p.id)).toEqual(['icvi_slope', 'icvi_land_use']);
    expect(result.map(p => p.vulnerabilityValue)).toEqual([0.7, 0.3]);
  });

  it('gives 0.1 to a parameter that has no value in the segment', () => {
    const segment = makeSegment('s1', { icvi_slope: 0.7 });
    const result = ICVICalculator.extractValues(segment, parameters);
    expect(result.map(p => p.vulnerabilityValue)).toEqual([0.7, 0.1]);
  });
});

describe('ICVICalculator.hasAllParameters', () => {
  const parameters = [makeParameter('icvi_slope'), makeParameter('icvi_land_use')];

  it('is true only when the segment has a value for every parameter', () => {
    expect(ICVICalculator.hasAllParameters(makeSegment('s1', { icvi_slope: 0.7, icvi_land_use: 0.3 }), parameters)).toBe(true);
    expect(ICVICalculator.hasAllParameters(makeSegment('s1', { icvi_slope: 0.7 }), parameters)).toBe(false);
  });
});
