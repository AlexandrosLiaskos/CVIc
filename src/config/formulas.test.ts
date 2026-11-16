import { describe, expect, it } from 'vitest';
import { availableFormulas } from './formulas';
import { IndexCalculatorFactory } from '../calculators/indexCalculatorFactory';
import { IndexRegistry } from '../indices';
import { makeSegment } from '../testHelpers';

describe('availableFormulas', () => {
  it('lists the two ICVI formulas under the types that the ICVI index offers', () => {
    const types = availableFormulas.map(f => f.type);
    expect(types).toContain('icvi-arithmetic');
    expect(types).toContain('icvi-geometric');
  });

  // Expected failures: one defect of the application, which this pull request reports and does not fix.
  //
  // The CVI index offers the formula type 'cvi-geometric' (src/indices/cvi/definition.ts). The calculation
  // accepts that type and stores it in every segment. This list names the CVI formula 'geometric-mean'
  // instead. The Results page (src/pages/ResultsPage.tsx) looks the stored type up in this list, finds no
  // entry for a CVI result, and the HTML report then prints "Formula used: Unknown". The calculation
  // itself refuses the type 'geometric-mean'.
  //
  // Remove `.fails` from both tests when the list and the index use the same type.
  it.fails('lists every formula type that the registered indices offer', () => {
    const listed = availableFormulas.map(f => f.type as string);
    for (const index of IndexRegistry.getAllIndices()) {
      for (const offered of index.availableFormulas ?? []) {
        expect(listed).toContain(offered.id);
      }
    }
  });

  it.fails('lists only formula types that the calculation accepts', () => {
    const segment = makeSegment('s1', {});
    for (const formula of availableFormulas) {
      expect(() => IndexCalculatorFactory.calculate(segment, [], formula)).not.toThrow('Unsupported formula type');
    }
  });
});
