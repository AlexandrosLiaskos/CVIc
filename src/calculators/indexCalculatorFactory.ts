import type { Parameter, ShorelineSegment, Formula } from '../types/index';
import { CVICalculator } from './cviCalculator';
import { ICVICalculator } from './icviCalculator';

export interface CalculationResult {
  value: number;
  formula?: string;
  components?: Record<string, number>;
}

/**
 * Factory for creating and managing different index calculators
 * Provides a clean interface for calculating any supported index
 */
export class IndexCalculatorFactory {
  /**
   * Calculate index value for a segment using the specified formula
   */
  static calculate(
    segment: ShorelineSegment,
    parameters: Parameter[],
    formula: Formula
  ): CalculationResult {
    switch (formula.type) {
      case 'cvi-geometric':
        return this.calculateCVI(segment, parameters);
        
      case 'icvi-arithmetic':
        return this.calculateICVIArithmetic(segment, parameters);
        
      case 'icvi-geometric':
        return this.calculateICVIGeometric(segment, parameters);
        
      default:
        throw new Error(`Unsupported formula type: ${formula.type}`);
    }
  }

  /**
   * Check if segment has all required parameters for the formula
   */
  static hasAllParameters(
    segment: ShorelineSegment,
    parameters: Parameter[],
    formula: Formula
  ): boolean {
    switch (formula.type) {
      case 'cvi-geometric':
        return CVICalculator.hasAllParameters(segment, parameters);
        
      case 'icvi-arithmetic':
      case 'icvi-geometric':
        return ICVICalculator.hasAllParameters(segment, parameters);
        
      default:
        return false;
    }
  }

  /**
   * Calculate CVI for a segment
   */
  private static calculateCVI(segment: ShorelineSegment, parameters: Parameter[]): CalculationResult {
    const values = CVICalculator.extractValues(segment, parameters);
    const result = CVICalculator.calculate(values);
    
    return {
      value: result,
      formula: `CVI = ⁿ√(∏Vi) = ${result.toFixed(3)}`
    };
  }

  /**
   * Calculate ICVI using arithmetic mean
   */
  private static calculateICVIArithmetic(segment: ShorelineSegment, parameters: Parameter[]): CalculationResult {
    const parametersWithValues = ICVICalculator.extractValues(segment, parameters);
    const result = ICVICalculator.calculateArithmetic(parametersWithValues);
    
    return {
      value: result.value,
      formula: result.formula,
      components: {
        'EVI (50%)': result.components.evi,
        'SVI (50%)': result.components.svi
      }
    };
  }

  /**
   * Calculate ICVI using geometric mean
   */
  private static calculateICVIGeometric(segment: ShorelineSegment, parameters: Parameter[]): CalculationResult {
    const parametersWithValues = ICVICalculator.extractValues(segment, parameters);
    const result = ICVICalculator.calculateGeometric(parametersWithValues);
    
    return {
      value: result.value,
      formula: result.formula,
      components: {
        'EVI (50%)': result.components.evi,
        'SVI (50%)': result.components.svi
      }
    };
  }
}