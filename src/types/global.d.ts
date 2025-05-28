/**
 * Global type definitions for the application
 */

// Import types from proj4 and georaster
import type { GeoRaster } from 'georaster';
import type proj4 from 'proj4';

// Extend the Window interface to include proj4 and georaster functions
declare global {
  interface Window {
    proj4?: typeof proj4;
    fromArrays?: (options: any) => Promise<any>;
  }
}
