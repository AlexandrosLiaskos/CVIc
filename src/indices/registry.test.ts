import { describe, expect, it } from 'vitest';
import { CVIIndex, ICVIIndex, IndexRegistry } from './index';
import { ICVICalculator } from '../calculators/icviCalculator';
import { makeParameter } from '../testHelpers';

const LABELS = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];

describe('IndexRegistry', () => {
  it('holds the CVI and the ICVI', () => {
    expect(IndexRegistry.getAllIndices().map(index => index.id)).toEqual(['cvi-thieler-1999', 'icvi-alcantara-2024']);
    expect(IndexRegistry.hasIndex('cvi-thieler-1999')).toBe(true);
    expect(IndexRegistry.hasIndex('unknown')).toBe(false);
    expect(IndexRegistry.getIndexById('icvi-alcantara-2024')).toBe(ICVIIndex);
    expect(IndexRegistry.getIndexById('unknown')).toBeUndefined();
  });

  it('returns the parameters of an index, and none for an unknown index', () => {
    // The CVI has 6 parameters and the ICVI has 12, so all indices together have 18
    expect(IndexRegistry.getParametersForIndex('cvi-thieler-1999')).toHaveLength(6);
    expect(IndexRegistry.getParametersForIndex('icvi-alcantara-2024')).toHaveLength(12);
    expect(IndexRegistry.getParametersForIndex('unknown')).toEqual([]);
    expect(IndexRegistry.getAllParameters()).toHaveLength(18);
  });
});

describe('ranking tables of the CVI', () => {
  it('rank every parameter in five classes with the values 1 to 5', () => {
    expect(CVIIndex.requiredParameters).toHaveLength(6);
    for (const parameter of CVIIndex.requiredParameters) {
      expect(parameter.rankingTable.map(rank => rank.value)).toEqual([1, 2, 3, 4, 5]);
      expect(parameter.rankingTable.map(rank => rank.label)).toEqual(LABELS);
      expect(parameter.indexId).toBe('cvi-thieler-1999');
    }
  });

  it('give the six parameters equal weights that add up to 1', () => {
    // 6 × (1/6) = 1
    const total = CVIIndex.requiredParameters.reduce((sum, parameter) => sum + parameter.weight, 0);
    expect(total).toBeCloseTo(1, 12);
    for (const parameter of CVIIndex.requiredParameters) {
      expect(parameter.weight).toBeCloseTo(1 / 6, 12);
    }
  });
});

describe('ranking tables of the ICVI', () => {
  it('rank every parameter in five classes with the values 0.1, 0.3, 0.5, 0.7 and 0.9', () => {
    expect(ICVIIndex.requiredParameters).toHaveLength(12);
    for (const parameter of ICVIIndex.requiredParameters) {
      expect(parameter.rankingTable.map(rank => rank.value)).toEqual([0.1, 0.3, 0.5, 0.7, 0.9]);
      expect(parameter.rankingTable.map(rank => rank.label)).toEqual(LABELS);
      expect(parameter.indexId).toBe('icvi-alcantara-2024');
    }
  });

  it('give the twelve parameters equal weights that add up to 1', () => {
    // 12 × (1/12) = 1
    const total = ICVIIndex.requiredParameters.reduce((sum, parameter) => sum + parameter.weight, 0);
    expect(total).toBeCloseTo(1, 12);
  });

  it('list six environmental parameters first and six socioeconomic parameters second, under the ids that the calculator reads', () => {
    // The calculator selects the parameters of each index by id. With 0.9 for the first six parameters
    // of the list and 0.1 for the last six, it must return EVI = 0.9 and SVI = 0.1.
    const parameters = ICVIIndex.requiredParameters.map((parameter, i) =>
      makeParameter(parameter.id, { vulnerabilityValue: i < 6 ? 0.9 : 0.1 }),
    );
    const result = ICVICalculator.calculateArithmetic(parameters);
    expect(result.components.evi).toBeCloseTo(0.9, 12);
    expect(result.components.svi).toBeCloseTo(0.1, 12);
  });
});

describe('IndexRegistry.validateIndexParameters', () => {
  it('accepts the six parameters of the CVI', () => {
    expect(IndexRegistry.validateIndexParameters('cvi-thieler-1999', CVIIndex.requiredParameters)).toEqual({
      isValid: true,
      errors: [],
    });
  });

  it('rejects a CVI with five parameters', () => {
    const result = IndexRegistry.validateIndexParameters('cvi-thieler-1999', CVIIndex.requiredParameters.slice(0, 5));
    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(['CVI requires exactly 6 parameters']);
  });

  it('accepts the twelve parameters of the ICVI, with or without equal weights of 1/12', () => {
    const weights = Object.fromEntries(ICVIIndex.requiredParameters.map(parameter => [parameter.id, 1 / 12]));
    expect(IndexRegistry.validateIndexParameters('icvi-alcantara-2024', ICVIIndex.requiredParameters).isValid).toBe(true);
    expect(IndexRegistry.validateIndexParameters('icvi-alcantara-2024', ICVIIndex.requiredParameters, weights).isValid).toBe(true);
  });

  it('rejects ICVI weights that are not all 1/12', () => {
    const weights = Object.fromEntries(ICVIIndex.requiredParameters.map(parameter => [parameter.id, 1 / 12]));
    weights.icvi_slope = 0.5;
    const result = IndexRegistry.validateIndexParameters('icvi-alcantara-2024', ICVIIndex.requiredParameters, weights);
    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(['ICVI requires equal weights (1/12 each)']);
  });

  it('reports an unknown index', () => {
    expect(IndexRegistry.validateIndexParameters('unknown', [])).toEqual({ isValid: false, errors: ['Index not found'] });
  });
});

describe('IndexRegistry.getVulnerabilityFromValue', () => {
  const geomorphology = CVIIndex.requiredParameters.find(parameter => parameter.id === 'cvi_coastal_geomorphology')!;
  const slope = CVIIndex.requiredParameters.find(parameter => parameter.id === 'cvi_coastal_slope')!;

  it('finds the rank of a categorical value in the criteria of the ranking table', () => {
    // CVI geomorphology: "Salt marsh" is in the criteria of rank 5, "Estuary" in rank 4, "Medium cliffs" in rank 2
    expect(IndexRegistry.getVulnerabilityFromValue(geomorphology, 'Salt marsh')).toBe(5);
    expect(IndexRegistry.getVulnerabilityFromValue(geomorphology, 'estuary')).toBe(4);
    expect(IndexRegistry.getVulnerabilityFromValue(geomorphology, 'Medium cliffs')).toBe(2);
  });

  it('gives rank 1 to a categorical value that no criterion contains', () => {
    expect(IndexRegistry.getVulnerabilityFromValue(geomorphology, 'Volcano')).toBe(1);
  });

  // Expected failure: a defect of the application, which this pull request reports and does not fix.
  //
  // For a numerical parameter the function compares the measured value with the rank numbers 1 to 5,
  // not with the limits in the criteria of the ranking table. The CVI table of the coastal slope reads:
  // rank 1 for more than 14.7 %, rank 2 for 10.9 to 14.6 %, rank 3 for 7.2 to 10.8 %, rank 4 for 3.6 to
  // 7.1 % and rank 5 for less than 3.5 %. The function returns rank 5 for a slope of 20 % and rank 2 for a
  // slope of 2 %. No other file of the application calls this function at present; the user picks the
  // class of each parameter from the ranking table by hand.
  //
  // Remove `.fails` when the function reads the limits of the ranking table.
  it.fails('finds the rank of a numerical value from the limits of the ranking table', () => {
    expect(IndexRegistry.getVulnerabilityFromValue(slope, 20)).toBe(1);
    expect(IndexRegistry.getVulnerabilityFromValue(slope, 12)).toBe(2);
    expect(IndexRegistry.getVulnerabilityFromValue(slope, 9)).toBe(3);
    expect(IndexRegistry.getVulnerabilityFromValue(slope, 5)).toBe(4);
    expect(IndexRegistry.getVulnerabilityFromValue(slope, 2)).toBe(5);
  });
});
