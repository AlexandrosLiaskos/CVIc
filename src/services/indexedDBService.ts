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
      });
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error);
      throw new Error('Failed to initialize database storage. Please try again.');
    }
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
      const storeData: ImageStore = {
        id,
        data,
        timestamp: Date.now(),
      };
      await this.db!.put(IMAGE_STORE, storeData);
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
      return result ? result.data : null;
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
      return allImages.map(item => item.data);
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
}

// Export a singleton instance
export const indexedDBService = new IndexedDBService();