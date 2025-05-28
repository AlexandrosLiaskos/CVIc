/**
 * DOM Error Handler
 *
 * This utility provides functions to safely access DOM elements and handle errors
 * related to missing elements or null references.
 */

/**
 * Safely get an element by ID with error handling
 * @param id The ID of the element to get
 * @param retryCount Number of retries (default: 3)
 * @param retryDelay Delay between retries in ms (default: 100)
 * @returns The element or null if not found after retries
 */
export function safeGetElementById(
  id: string,
  retryCount: number = 3,
  retryDelay: number = 100
): HTMLElement | null {
  let element = document.getElementById(id);

  if (!element && retryCount > 0) {
    console.warn(`Element with ID "${id}" not found, retrying (${retryCount} attempts left)...`);

    // Set up a retry with a delay
    return new Promise<HTMLElement | null>((resolve) => {
      setTimeout(() => {
        resolve(safeGetElementById(id, retryCount - 1, retryDelay));
      }, retryDelay);
    }) as unknown as HTMLElement | null;
  }

  return element;
}

/**
 * Safely access a property on an object, with a fallback value if the property is null/undefined
 * @param obj The object to access
 * @param propPath The property path (e.g., 'user.profile.name')
 * @param fallback Fallback value if property is null/undefined
 * @returns The property value or fallback
 */
export function safeAccess<T>(obj: any, propPath: string, fallback: T): T {
  try {
    const props = propPath.split('.');
    let result = obj;

    for (const prop of props) {
      if (result === null || result === undefined) {
        return fallback;
      }
      result = result[prop];
    }

    return (result === null || result === undefined) ? fallback : result;
  } catch (error) {
    console.warn(`Error accessing property "${propPath}":`, error);
    return fallback;
  }
}

/**
 * Basic error handler for non-critical errors
 */
export function setupGlobalDOMErrorHandlers(): void {
  if (typeof window === 'undefined') return;

  // Add a simple error event listener for non-critical errors
  window.addEventListener('error', (event) => {
    // Only prevent default for non-critical errors
    if (event.error &&
        (event.error.toString().includes('is null') ||
         event.error.toString().includes('Cannot read property'))) {
      console.warn('Non-critical error caught:', event.error);
      // Prevent the error from crashing the app only for non-critical errors
      event.preventDefault();
    }
  });
}

export default {
  safeGetElementById,
  safeAccess,
  setupGlobalDOMErrorHandlers
};
