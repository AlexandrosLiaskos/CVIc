import type { Parameter, ShorelineSegment } from '../types';

export interface ICVIResult {
  value: number;
  formula: string;
  components: {
    evi: number;
    svi: number;
  };
}

/**
 * ICVI Calculator - Handles Integrated Coastal Vulnerability Index calculations
 * Supports both arithmetic and geometric mean approaches
 */
export class ICVICalculator {
  /**
   * Calculate ICVI using arithmetic mean approach
   * EVI = (a+b+c+d+e+f)/6, SVI = (g+h+i+j+k+l)/6, ICVI = (EVI+SVI)/2
   */
  static calculateArithmetic(parameters: Parameter[]): ICVIResult {
    const { eviValues, sviValues } = this.extractEVISVIValues(parameters);
    
    // Calculate EVI: Arithmetic mean of 0.1-0.9 values
    const eviValue = eviValues.reduce((acc, val) => acc + val, 0) / eviValues.length;
    
    // Calculate SVI: Arithmetic mean of 0.1-0.9 values
    const sviValue = sviValues.reduce((acc, val) => acc + val, 0) / sviValues.length;
    
    // ICVI = (EVI + SVI)/2
    const icviValue = (eviValue + sviValue) / 2;
    
    return {
      value: icviValue,
      formula: `ICVI = (EVI + SVI)/2 = (${eviValue.toFixed(3)} + ${sviValue.toFixed(3)})/2 = ${icviValue.toFixed(3)}`,
      components: {
        evi: eviValue,
        svi: sviValue
      }
    };
  }

  /**
   * Calculate ICVI using geometric mean approach
   * EVI = ⁶√(a×b×c×d×e×f), SVI = ⁶√(g×h×i×j×k×l), ICVI = (EVI+SVI)/2
   */
  static calculateGeometric(parameters: Parameter[]): ICVIResult {
    const { eviValues, sviValues } = this.extractEVISVIValues(parameters);
    
    // Calculate EVI: Geometric mean (6th root of product) of 0.1-0.9 values
    const eviProduct = eviValues.reduce((acc, val) => acc * val, 1);
    const eviValue = Math.pow(eviProduct, 1 / eviValues.length);
    
    // Calculate SVI: Geometric mean (6th root of product) of 0.1-0.9 values
    const sviProduct = sviValues.reduce((acc, val) => acc * val, 1);
    const sviValue = Math.pow(sviProduct, 1 / sviValues.length);
    
    // ICVI = (EVI + SVI)/2
    const icviValue = (eviValue + sviValue) / 2;
    
    return {
      value: icviValue,
      formula: `ICVI = (EVI + SVI)/2 = (${eviValue.toFixed(4)} + ${sviValue.toFixed(4)})/2 = ${icviValue.toFixed(4)}`,
      components: {
        evi: eviValue,
        svi: sviValue
      }
    };
  }

  /**
   * Extract EVI and SVI parameter values from parameters
   */
  private static extractEVISVIValues(parameters: Parameter[]) {
    // EVI parameters (6 parameters)
    const eviParams = parameters.filter(p =>
      ['icvi_geomorphological_features', 'icvi_slope', 'icvi_shoreline_migration', 
       'icvi_ecosystem_type', 'icvi_conservation_measures', 'icvi_species_interest'].includes(p.id)
    );

    // SVI parameters (6 parameters)
    const sviParams = parameters.filter(p =>
      ['icvi_land_use', 'icvi_building_coast_ratio', 'icvi_population_density', 
       'icvi_economic_activity', 'icvi_economic_value', 'icvi_heritage'].includes(p.id)
    );

    const eviValues = eviParams.map(p => p.vulnerabilityValue || 0.1);
    const sviValues = sviParams.map(p => p.vulnerabilityValue || 0.1);
    
    return { eviValues, sviValues };
  }

  /**
   * Extract ICVI parameter values from a segment
   */
  static extractValues(segment: ShorelineSegment, parameters: Parameter[]): Parameter[] {
    return parameters.map(param => {
      const segmentValue = segment.parameters?.[param.id];
      return {
        ...param,
        vulnerabilityValue: segmentValue?.vulnerability || 0.1
      };
    });
  }

  /**
   * Validate that segment has all required ICVI parameters
   */
  static hasAllParameters(segment: ShorelineSegment, parameters: Parameter[]): boolean {
    return parameters.every(param => 
      segment.parameters && segment.parameters[param.id] !== undefined
    );
  }
}