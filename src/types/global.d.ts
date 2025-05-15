/**
 * Global type definitions for the application
 */

// Extend the Window interface to include proj4
interface Window {
  proj4?: any;
  fixProj4Error?: () => void;
}
