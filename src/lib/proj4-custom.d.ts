/**
 * Type declarations for custom proj4 implementation
 */

// Import the original proj4 types
import * as originalProj4 from 'proj4';

// Export the same type as the original proj4
declare const proj4: typeof originalProj4;
export default proj4;
