import { CVIIndex } from './cvi';
import { ICVIIndex } from './icvi';
import type { StandardizedCoastalIndex, IndexSpecificParameter } from '../types/indexSpecificTypes';

/**
 * Central registry for all coastal vulnerability indices
 * Provides a clean, modular way to access index definitions
 */
export class IndexRegistry {
  private static indices = new Map<string, StandardizedCoastalIndex>([
    [CVIIndex.id, CVIIndex],
    [ICVIIndex.id, ICVIIndex]
  ]);

  /**
   * Get all available indices
   */
  static getAllIndices(): StandardizedCoastalIndex[] {
    return Array.from(this.indices.values());
  }

  /**
   * Get index by ID
   */
  static getIndexById(id: string): StandardizedCoastalIndex | undefined {
    return this.indices.get(id);
  }

  /**
   * Get all parameters for all indices
   */
  static getAllParameters(): IndexSpecificParameter[] {
    const allParameters: IndexSpecificParameter[] = [];
    
    for (const index of this.indices.values()) {
      allParameters.push(...index.requiredParameters);
    }
    
    return allParameters;
  }

  /**
   * Get parameters for a specific index
   */
  static getParametersForIndex(indexId: string): IndexSpecificParameter[] {
    const index = this.getIndexById(indexId);
    return index ? index.requiredParameters : [];
  }

  /**
   * Find parameter by standard name across all indices
   */
  static getParameterByStandardName(standardName: string): IndexSpecificParameter | undefined {
    const allParameters = this.getAllParameters();
    return allParameters.find(p => p.standardName === standardName);
  }

  /**
   * Get vulnerability value from parameter value
   */
  static getVulnerabilityFromValue(parameter: IndexSpecificParameter, value: string | number): number {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    
    // For categorical parameters, find exact match
    if (parameter.type === 'categorical') {
      const match = parameter.rankingTable.find(rank => 
        rank.criteria.toLowerCase().includes(value.toString().toLowerCase())
      );
      return match ? match.value : 1;
    }
    
    // For numerical parameters, find appropriate range
    for (const rank of parameter.rankingTable) {
      // This is a simplified approach - in practice, you'd need more sophisticated range matching
      if (numericValue <= rank.value) {
        return rank.value;
      }
    }
    
    return parameter.rankingTable[parameter.rankingTable.length - 1].value;
  }

  /**
   * Validate parameters for an index
   */
  static validateIndexParameters(indexId: string, parameters: IndexSpecificParameter[], weights?: Record<string, number>): { isValid: boolean; errors: string[] } {
    const index = this.getIndexById(indexId);
    if (!index) {
      return { isValid: false, errors: ['Index not found'] };
    }

    const errors: string[] = [];
    
    for (const rule of index.validationRules) {
      if (!rule.validate(parameters, weights)) {
        errors.push(rule.message);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Register a new index (for extensibility)
   */
  static registerIndex(index: StandardizedCoastalIndex): void {
    this.indices.set(index.id, index);
  }

  /**
   * Check if an index is registered
   */
  static hasIndex(id: string): boolean {
    return this.indices.has(id);
  }
}