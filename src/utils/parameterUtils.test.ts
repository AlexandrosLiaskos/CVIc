import { describe, expect, it } from 'vitest';
import { ParameterCategory, getParameterCategory, getParameterCategoryCounts } from './parameterUtils';
import { CVIIndex, ICVIIndex } from '../indices';

describe('getParameterCategory', () => {
  it('returns the category and its label for a standard parameter name', () => {
    expect(getParameterCategory('coastal_slope')).toEqual({ category: ParameterCategory.PHYSICAL, label: 'Physical' });
    expect(getParameterCategory('mean_wave_height')).toEqual({ category: ParameterCategory.HYDROCLIMATE, label: 'Hydroclimate' });
    expect(getParameterCategory('shoreline_change')).toEqual({ category: ParameterCategory.SHORELINE, label: 'Shoreline' });
    expect(getParameterCategory('ecosystem_type')).toEqual({ category: ParameterCategory.ENVIRONMENTAL, label: 'Environmental' });
    expect(getParameterCategory('population_density')).toEqual({ category: ParameterCategory.SOCIOECONOMIC, label: 'Socioeconomic' });
  });

  it('returns the physical category for a name that it does not know', () => {
    expect(getParameterCategory('not_a_parameter')).toEqual({ category: ParameterCategory.PHYSICAL, label: 'Physical' });
  });
});

describe('getParameterCategoryCounts', () => {
  it('counts the six CVI parameters by category', () => {
    // Geomorphology and coastal slope are physical (2). Sea-level change, tide range and wave height
    // are hydroclimate (3). Shoreline change is a shoreline parameter (1).
    const names = CVIIndex.requiredParameters.map(parameter => parameter.standardName);
    expect(getParameterCategoryCounts(names)).toEqual({ Physical: 2, Hydroclimate: 3, Shoreline: 1 });
  });

  it('returns an empty object for an empty list', () => {
    expect(getParameterCategoryCounts([])).toEqual({});
  });

  // Expected failure: a defect of the application, which this pull request reports and does not fix.
  //
  // The ICVI lists six socioeconomic parameters (src/indices/icvi/parameters.ts). One of them, the
  // socio-economic activity, has the standard name 'economic_activity', which the category table of
  // parameterUtils.ts does not contain. The function then returns the physical category for it, and the
  // parameter selection page shows 3 physical and 5 socioeconomic parameters for the ICVI in place of 2
  // and 6.
  //
  // Remove `.fails` when the category table contains 'economic_activity'.
  it.fails('counts the six socioeconomic parameters of the ICVI as socioeconomic', () => {
    const names = ICVIIndex.requiredParameters.slice(6).map(parameter => parameter.standardName);
    expect(getParameterCategoryCounts(names)).toEqual({ Socioeconomic: 6 });
  });
});
