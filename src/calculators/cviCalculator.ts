import type { Parameter, ShorelineSegment } from '../types';

/**
 * CVI Calculator - Handles Coastal Vulnerability Index calculations
 * Uses true geometric mean: CVI = ⁿ√(∏Vi)
 */
export class CVICalculator {
  /**
   * Calculate CVI for a single set of values
   */
  static calculate(values: number[]): number {
    if (values.length === 0) return 0;
    
    // True geometric mean: CVI = ⁿ√(∏Vi) = (∏Vi)^(1/n)
    let product = 1.0;
    for (let i = 0; i < values.length; i++) {
      const value = Math.max(1e-9, values[i]); // Prevent log(0) issues
      product *= value;
    }
    
    // Return nth root of product (true geometric mean)
    return Math.pow(product, 1 / values.length);
  }

  /**
   * Extract CVI parameter values from a segment
   */
  static extractValues(segment: ShorelineSegment, parameters: Parameter[]): number[] {
    const values: number[] = [];
    
    parameters.forEach(param => {
      const paramValue = segment.parameters?.[param.id];
      if (paramValue) {
        const vulnerability = Math.max(1, Math.min(5, paramValue.vulnerability));
        values.push(vulnerability);
      }
    });
    
    return values;
  }

  /**
   * Validate that segment has all required CVI parameters
   */
  static hasAllParameters(segment: ShorelineSegment, parameters: Parameter[]): boolean {
    return parameters.every(param => 
      segment.parameters && segment.parameters[param.id] !== undefined
    );
  }
}