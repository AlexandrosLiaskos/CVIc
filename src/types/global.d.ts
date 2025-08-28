/**
 * Global type definitions for the application
 */

// Import types from georaster
import type { GeoRaster } from 'georaster';

// Extend the Window interface to include georaster functions
declare global {
  interface Window {
    fromArrays?: (options: any) => Promise<any>;
  }
}
