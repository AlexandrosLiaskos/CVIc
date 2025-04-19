import { openDB, IDBPDatabase } from 'idb';
import type { FeatureCollection } from 'geojson';

const DB_NAME = 'shorelineDB';
const DB_VERSION = 1;
const STORE_NAME = 'shorelineData';

interface ShorelineStore {
  id: string;
  data: FeatureCollection;
  timestamp: number;
}

class IndexedDBService {
  private db: IDBPDatabase | null = null;

  async initialize(): Promise<void> {
    try {
      this.db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          // Create the object store if it doesn't exist
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          }
        },
      });
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error);
      throw new Error('Failed to initialize database storage. Please try again.');
    }
  }

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
      await this.db!.put(STORE_NAME, storeData);
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
      const result: ShorelineStore | undefined = await this.db!.get(STORE_NAME, id);
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
      await this.db!.delete(STORE_NAME, id);
    } catch (error) {
      console.error('Failed to delete shoreline data:', error);
      throw new Error('Failed to delete shoreline data. Please try again.');
    }
  }

  async clearAllData(): Promise<void> {
    if (!this.db) {
      await this.initialize();
    }

    try {
      await this.db!.clear(STORE_NAME);
    } catch (error) {
      console.error('Failed to clear shoreline data:', error);
      throw new Error('Failed to clear shoreline data. Please try again.');
    }
  }
}

// Export a singleton instance
export const indexedDBService = new IndexedDBService(); 