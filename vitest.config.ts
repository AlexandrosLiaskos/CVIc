import { defineConfig } from 'vitest/config';

// The tests run in Node.js, without a browser. This file is separate from vite.config.ts, so the
// tests do not use the settings of the application build and do not change them.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
