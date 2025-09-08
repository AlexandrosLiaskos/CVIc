import { openDB, IDBPDatabase } from 'idb';
import type { FeatureCollection } from 'geojson';
import type { ProcessedImage } from './imageProcessor';

const DB_NAME = 'shorelineDB';
const DB_VERSION = 2; // Increased version to handle schema updates
const SHORELINE_STORE = 'shorelineData';
const IMAGE_STORE = 'satelliteImages';

interface ShorelineStore {
  id: string;
  data: FeatureCollection;
  timestamp: number;
}

interface ImageStore {
  id: string;
  data: ProcessedImage;
  timestamp: number;
}

class IndexedDBService {
  private db: IDBPDatabase | null = null;

  async initialize(): Promise<void> {
    try {
      this.db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          // Create the shoreline store if it doesn't exist
          if (!db.objectStoreNames.contains(SHORELINE_STORE)) {
            db.createObjectStore(SHORELINE_STORE, { keyPath: 'id' });
          }

          // Create the satellite image store if it doesn't exist
          if (!db.objectStoreNames.contains(IMAGE_STORE)) {
            db.createObjectStore(IMAGE_STORE, { keyPath: 'id' });
          }
        },
        blocked() {
          console.warn('Database upgrade blocked. Please close other tabs/windows using this application.');
        },
        blocking() {
          console.warn('Database is blocking other connections. Closing current connection.');
        },
      });
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error);

      // Handle version mismatch by deleting and recreating the database
      if (error instanceof DOMException &&
          (error.name === 'VersionError' ||
           error.message.includes('higher version') ||
           error.message.includes('version requested'))) {
        console.warn('Database version mismatch detected. Recreating database...');
        try {
          await this.deleteDatabase();
          // Wait a bit for the deletion to complete
          await new Promise(resolve => setTimeout(resolve, 100));
          return this.initialize();
        } catch (deleteError) {
          console.error('Failed to delete and recreate database:', deleteError);
          throw new Error('Database version conflict. Please refresh the page or clear your browser data.');
        }
      }

      throw new Error('Failed to initialize database storage. Please try again.');
    }
  }

  private async deleteDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const deleteRequest = indexedDB.deleteDatabase(DB_NAME);

      deleteRequest.onsuccess = () => {
        console.log('Database deleted successfully');
        resolve();
      };

      deleteRequest.onerror = () => {
        console.error('Failed to delete database:', deleteRequest.error);
        reject(deleteRequest.error);
      };

      deleteRequest.onblocked = () => {
        console.warn('Database deletion blocked. Please close other tabs/windows using this application.');
        // Still resolve to allow retry
        resolve();
      };
    });
  }

  // Shoreline data methods
  async storeShorelineData(id: string, data: FeatureCollection): Promise<void> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      const storeData: ShorelineStore = {
        id,
        data,
        timestamp: Date.now(),
      };
      await this.db!.put(SHORELINE_STORE, storeData);
    } catch (error) {
      console.error('Failed to store shoreline data:', error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        throw new Error('Storage quota exceeded. Please try with a smaller file or clear some space.');
      }
      throw new Error('Failed to store shoreline data. Please try again.');
    }
  }

  async getShorelineData(id: string): Promise<FeatureCollection | null> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      const result: ShorelineStore | undefined = await this.db!.get(SHORELINE_STORE, id);
      return result ? result.data : null;
    } catch (error) {
      console.error('Failed to retrieve shoreline data:', error);
      throw new Error('Failed to retrieve shoreline data. Please try again.');
    }
  }

  async deleteShorelineData(id: string): Promise<void> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      await this.db!.delete(SHORELINE_STORE, id);
    } catch (error) {
      console.error('Failed to delete shoreline data:', error);
      throw new Error('Failed to delete shoreline data. Please try again.');
    }
  }

  async clearAllShorelineData(): Promise<void> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      await this.db!.clear(SHORELINE_STORE);
    } catch (error) {
      console.error('Failed to clear shoreline data:', error);
      throw new Error('Failed to clear shoreline data. Please try again.');
    }
  }

  // Satellite image methods
  async storeSatelliteImage(id: string, data: ProcessedImage): Promise<void> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      let processedBlob: Blob | undefined;

      // If we have a georaster, convert it to a web-compatible format
      if (data.georaster && data.georaster.toCanvas) {
        try {
          // Convert georaster to canvas (web-compatible raster format)
          console.log('Georaster info:', {
            width: data.georaster.width,
            height: data.georaster.height,
            numberOfRasters: data.georaster.numberOfRasters,
            mins: data.georaster.mins,
            maxs: data.georaster.maxs,
            ranges: data.georaster.ranges,
            noDataValue: data.georaster.noDataValue
          });

          const canvas = data.georaster.toCanvas({
            width: Math.min(1024, data.georaster.width), // Limit size for performance
            height: Math.min(1024, data.georaster.height),
            pixelValuesToColorFn: (values: number[]) => {
              // Log first few pixel values to understand the data range
              if (Math.random() < 0.001) { // Log 0.1% of pixels to avoid spam
                console.log('Sample pixel values:', values);
              }

              // Handle different band configurations
              if (values.length >= 3) {
                // RGB or multi-band image
                const [r, g, b] = values;
                
                // Get the actual min/max ranges from georaster
                const rMin = data.georaster.mins?.[0] || 0;
                const rMax = data.georaster.maxs?.[0] || 255;
                const gMin = data.georaster.mins?.[1] || 0;
                const gMax = data.georaster.maxs?.[1] || 255;
                const bMin = data.georaster.mins?.[2] || 0;
                const bMax = data.georaster.maxs?.[2] || 255;
                
                // Normalize values based on actual data range
                const normalizeValue = (val: number, min: number, max: number) => {
                  if (val === null || val === undefined || !isFinite(val)) return 0;
                  if (val === data.georaster.noDataValue) return 0;
                  // Normalize from [min, max] to [0, 255]
                  const normalized = ((val - min) / (max - min)) * 255;
                  return Math.max(0, Math.min(255, Math.round(normalized)));
                };
                
                return `rgb(${normalizeValue(r, rMin, rMax)}, ${normalizeValue(g, gMin, gMax)}, ${normalizeValue(b, bMin, bMax)})`;
              } else if (values.length === 1) {
                // Single band (grayscale)
                const val = values[0];
                if (val === null || val === undefined || !isFinite(val)) return 'rgba(0,0,0,0)';
                if (val === data.georaster.noDataValue) return 'rgba(0,0,0,0)';
                
                // Get the actual min/max range for single band
                const min = data.georaster.mins?.[0] || 0;
                const max = data.georaster.maxs?.[0] || 255;
                
                // Normalize from [min, max] to [0, 255]
                const normalized = ((val - min) / (max - min)) * 255;
                const clampedValue = Math.max(0, Math.min(255, Math.round(normalized)));
                return `rgb(${clampedValue}, ${clampedValue}, ${clampedValue})`;
              }
              return 'rgba(0,0,0,0)'; // Transparent for invalid values
            }
          });
          
          // Convert canvas to blob (binary data for storage)
          processedBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob: Blob | null) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to convert canvas to blob'));
              }
            }, 'image/png', 0.9); // High quality PNG
          });

          console.log('Converted georaster to web-compatible blob format');
        } catch (error) {
          console.warn('Failed to convert georaster to blob, storing metadata only:', error);
        }
      }

      // Create serializable data for storage
      const serializableData = {
        id: data.id,
        name: data.name,
        bounds: data.bounds,
        timestamp: data.timestamp,
        metadata: data.metadata,
        url: null, // Will be created on retrieval
        processedBlob: processedBlob // Store the processed raster data
        // Don't store the heavy georaster or arrayBuffer objects
      };

      const storeData: ImageStore = {
        id,
        data: serializableData as ProcessedImage,
        timestamp: Date.now(),
      };
      
      await this.db!.put(IMAGE_STORE, storeData);
      console.log('Satellite image stored successfully with processed blob');
    } catch (error) {
      console.error('Failed to store satellite image:', error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        throw new Error('Storage quota exceeded. Please try with a smaller file or clear some space.');
      }
      throw new Error('Failed to store satellite image. Please try again.');
    }
  }

  async getSatelliteImage(id: string): Promise<ProcessedImage | null> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      const result: ImageStore | undefined = await this.db!.get(IMAGE_STORE, id);
      if (!result) {
        return null;
      }

      const storedData = result.data;
      
      // If we have a processed blob but no current URL, create a new Object URL
      if ((storedData as any).processedBlob && !storedData.url) {
        try {
          // Create a data URL instead of blob URL to avoid CORS issues
          const blob = (storedData as any).processedBlob;
          const reader = new FileReader();
          
          const dataUrl = await new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
          });
          
          storedData.url = dataUrl;
          console.log('Created data URL for stored processed blob');
        } catch (error) {
          console.warn('Failed to create data URL from stored blob:', error);
        }
      }

      return storedData;
    } catch (error) {
      console.error('Failed to retrieve satellite image:', error);
      throw new Error('Failed to retrieve satellite image. Please try again.');
    }
  }

  async getAllSatelliteImages(): Promise<ProcessedImage[]> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      const allImages: ImageStore[] = await this.db!.getAll(IMAGE_STORE);
      
      // Process each image to recreate data URLs from stored blobs if needed
      const processedImages = await Promise.all(
        allImages.map(async (item) => {
          const storedData = item.data;
          
          // If we have a processed blob but no current URL, create a new data URL
          if ((storedData as any).processedBlob && !storedData.url) {
            try {
              // Create a data URL instead of blob URL to avoid CORS issues
              const blob = (storedData as any).processedBlob;
              const reader = new FileReader();
              
              const dataUrl = await new Promise<string>((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = () => reject(reader.error);
                reader.readAsDataURL(blob);
              });
              
              storedData.url = dataUrl;
              console.log('Created data URL for stored processed blob');
            } catch (error) {
              console.warn('Failed to create data URL from stored blob for image:', storedData.id, error);
            }
          }
          
          return storedData;
        })
      );

      return processedImages;
    } catch (error) {
      console.error('Failed to retrieve satellite images:', error);
      throw new Error('Failed to retrieve satellite images. Please try again.');
    }
  }

  async deleteSatelliteImage(id: string): Promise<void> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      await this.db!.delete(IMAGE_STORE, id);
    } catch (error) {
      console.error('Failed to delete satellite image:', error);
      throw new Error('Failed to delete satellite image. Please try again.');
    }
  }

  async clearAllSatelliteImages(): Promise<void> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      await this.db!.clear(IMAGE_STORE);
    } catch (error) {
      console.error('Failed to clear satellite images:', error);
      throw new Error('Failed to clear satellite images. Please try again.');
    }
  }

  // General methods
  async clearAllData(): Promise<void> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      await this.db!.clear(SHORELINE_STORE);
      await this.db!.clear(IMAGE_STORE);
    } catch (error) {
      console.error('Failed to clear all data:', error);
      throw new Error('Failed to clear all data. Please try again.');
    }
  }

  // Development utility method to completely reset the database
  async resetDatabase(): Promise<void> {
    try {
      if (this.db) {
        this.db.close();
        this.db = null;
      }
      await this.deleteDatabase();
      await this.initialize();
      console.log('Database reset successfully');
    } catch (error) {
      console.error('Failed to reset database:', error);
      throw new Error('Failed to reset database. Please try again.');
    }
  }
}

// Export a singleton instance
export const indexedDBService = new IndexedDBService();
