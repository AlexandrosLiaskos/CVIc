/**
 * Global type definitions for the application
 */



// Extend the Window interface to include georaster functions
declare global {
  interface Window {
    fromArrays?: (options: any) => Promise<any>;
  }
}
