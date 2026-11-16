import { beforeEach, describe, expect, it, vi } from 'vitest';
import { safeJsonParse, safeJsonStringify } from './safeJsonParse';

describe('safeJsonParse', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('parses valid JSON', () => {
    expect(safeJsonParse('{"a": [1, 2, 3]}', {})).toEqual({ a: [1, 2, 3] });
  });

  it('returns the fallback for text that is not JSON, and for missing text', () => {
    expect(safeJsonParse('{not json', 'fallback')).toBe('fallback');
    expect(safeJsonParse(null, 0)).toBe(0);
    expect(safeJsonParse(undefined, 0)).toBe(0);
    expect(safeJsonParse('', 0)).toBe(0);
  });
});

describe('safeJsonStringify', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('writes a value as JSON', () => {
    expect(safeJsonStringify({ a: 1 })).toBe('{"a":1}');
  });

  it('returns the fallback for a value that refers to itself', () => {
    const value: Record<string, unknown> = {};
    value.self = value;
    expect(safeJsonStringify(value)).toBe('{}');
    expect(safeJsonStringify(value, 'null')).toBe('null');
  });
});
