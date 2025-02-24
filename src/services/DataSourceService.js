import earthEngineService from './EarthEngineService';

class DataSourceService {
  constructor() {
    this.connections = new Map();
  }

  async connectToGEE(userId) {
    try {
      await earthEngineService.signIn();
      const connected = await earthEngineService.testConnection();

      if (!connected) {
        throw new Error('Failed to connect to Google Earth Engine');
      }

      this.connections.set(userId, {
        type: 'GEE',
        service: earthEngineService
      });
    } catch (error) {
      console.error('Failed to connect to GEE:', error);
      throw error;
    }
  }

  // Handle local file system access
  async connectToLocalFiles(userId, path) {
    if (this.connections.has(`local-${userId}`)) {
      return this.connections.get(`local-${userId}`);
    }

    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.text();
      if (!data.trim()) throw new Error('Empty response from server');
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to access local files:', error);
      throw new Error('Failed to access local file system');
    }
  }

  // Handle pre-processed asset access
  async connectToPreprocessedAssets(userId, assetPath) {
    if (this.connections.has(`preprocessed-${userId}`)) {
      return this.connections.get(`preprocessed-${userId}`);
    }

    try {
      // Here we'll implement access to pre-processed assets
      const connection = {
        basePath: assetPath,
        listAssets: async () => {
          // Implement asset listing logic
        },
        loadAsset: async (assetId) => {
          // Implement asset loading logic
        }
      };

      this.connections.set(`preprocessed-${userId}`, connection);
      return connection;
    } catch (error) {
      console.error('Failed to access preprocessed assets:', error);
      throw new Error('Failed to access preprocessed assets');
    }
  }

  // Disconnect a specific data source
  async disconnect(userId, sourceType) {
    const connectionKey = `${sourceType}-${userId}`;
    if (this.connections.has(connectionKey)) {
      const connection = this.connections.get(connectionKey);
      // Cleanup connection if needed
      this.connections.delete(connectionKey);
    }
  }

  // Disconnect all data sources for a user
  async disconnectAll(userId) {
    const userConnections = Array.from(this.connections.keys())
      .filter(key => key.endsWith(`-${userId}`));

    for (const connectionKey of userConnections) {
      await this.disconnect(userId, connectionKey.split('-')[0]);
    }
  }
}

// Create and export singleton instance
const dataSourceService = new DataSourceService();
export { DataSourceService, dataSourceService };
