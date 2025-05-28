/**
 * Safe JSON parsing utility
 * 
 * This utility provides a safe way to parse JSON with error handling
 */

/**
 * Safely parse JSON with error handling
 * @param jsonString The JSON string to parse
 * @param fallback Optional fallback value if parsing fails
 * @returns The parsed JSON or fallback value
 */
export function safeJsonParse<T>(jsonString: string | null | undefined, fallback: T): T {
  if (!jsonString) {
    console.warn('Attempted to parse null or undefined JSON string');
    return fallback;
  }
  
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.warn('Error parsing JSON:', error);
    console.warn('JSON string that failed to parse:', jsonString.substring(0, 100) + (jsonString.length > 100 ? '...' : ''));
    return fallback;
  }
}

/**
 * Safely stringify JSON with error handling
 * @param value The value to stringify
 * @param fallback Optional fallback string if stringification fails
 * @returns The stringified JSON or fallback string
 */
export function safeJsonStringify(value: any, fallback: string = '{}'): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.warn('Error stringifying JSON:', error);
    return fallback;
  }
}
