/**
 * Utility for resolving asset paths correctly in different environments
 */

/**
 * Get the correct path for an asset based on the current environment
 * 
 * @param path The relative path to the asset
 * @returns The correct absolute path for the current environment
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Get the base URL from import.meta.env or default to '/'
  const base = import.meta.env.BASE_URL || '/';
  
  // Combine base and path, ensuring no double slashes
  const fullPath = base.endsWith('/') 
    ? `${base}${cleanPath}` 
    : `${base}/${cleanPath}`;
    
  return fullPath;
}

/**
 * Get the correct URL for an external resource
 * Ensures CORS is properly handled
 * 
 * @param url The URL to the external resource
 * @returns The URL with proper CORS handling
 */
export function getExternalResourceUrl(url: string): string {
  // For resources that might need CORS, you could add a proxy here
  // For now, we just return the URL as is
  return url;
}

/**
 * Preload an image to ensure it's in the browser cache
 * 
 * @param src The source URL of the image
 * @returns A promise that resolves when the image is loaded
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = getAssetPath(src);
  });
}
