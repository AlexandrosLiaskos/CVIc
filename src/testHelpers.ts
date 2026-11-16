import type { Parameter, ParameterValue, ShorelineSegment } from './types';

/**
 * Builds a parameter with the fields that the calculation code reads.
 * Only the tests use this file; the application does not import it.
 */
export function makeParameter(id: string, overrides: Partial<Parameter> = {}): Parameter {
  return { id, name: id, description: '', type: 'categorical', weight: 1, ...overrides };
}

/**
 * Builds a shoreline segment whose parameters carry the given vulnerability values.
 * The keys of `vulnerabilities` are parameter ids.
 */
export function makeSegment(id: string, vulnerabilities: Record<string, number>): ShorelineSegment {
  const parameters: Record<string, ParameterValue> = {};
  for (const [parameterId, vulnerability] of Object.entries(vulnerabilities)) {
    parameters[parameterId] = { type: 'categorical', value: String(vulnerability), vulnerability };
  }
  return {
    type: 'Feature',
    id,
    geometry: { type: 'LineString', coordinates: [[0, 0], [0.01, 0]] },
    properties: { id, parameters: { ...parameters } },
    parameters,
  };
}

/** Ids of the six parameters of the Environmental Vulnerability Index, as the ICVI parameter list gives them. */
export const EVI_IDS = [
  'icvi_geomorphological_features',
  'icvi_slope',
  'icvi_shoreline_migration',
  'icvi_ecosystem_type',
  'icvi_conservation_measures',
  'icvi_species_interest',
];

/** Ids of the six parameters of the Socioeconomic Vulnerability Index, as the ICVI parameter list gives them. */
export const SVI_IDS = [
  'icvi_land_use',
  'icvi_building_coast_ratio',
  'icvi_population_density',
  'icvi_economic_activity',
  'icvi_economic_value',
  'icvi_heritage',
];

/** Maps the twelve ICVI parameter ids to the given values: six for the EVI, then six for the SVI. */
export function icviValues(evi: number[], svi: number[]): Record<string, number> {
  const values: Record<string, number> = {};
  EVI_IDS.forEach((id, i) => {
    values[id] = evi[i];
  });
  SVI_IDS.forEach((id, i) => {
    values[id] = svi[i];
  });
  return values;
}
