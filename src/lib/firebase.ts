import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import type { FeatureCollection } from 'geojson';

const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
] as const;

const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !import.meta.env[envVar]
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required Firebase configuration variables: ${missingEnvVars.join(', ')}`
  );
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

import { FirebaseApp } from 'firebase/app';
import { FirebaseStorage } from 'firebase/storage';

let app: FirebaseApp;
let storage: FirebaseStorage;

try {
  app = initializeApp(firebaseConfig);
  storage = getStorage(app);
} catch (error) {
  console.error('Error initializing Firebase:', error);
  console.error('Firebase config:', {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey ? '***' : undefined // Hide API key in logs
  });
  throw error;
}

export const listUserCviResults = async (userId: string): Promise<{ name: string; fullPath: string; downloadUrl: string }[]> => {
  if (!userId) {
    console.error("User ID is required to list CVI results.");
    return [];
  }
  const resultsPath = `users/${userId}/cvi_results/`;
  const listRef = ref(storage, resultsPath);

  try {
    const res = await listAll(listRef);
    const files = await Promise.all(
      res.items.map(async (itemRef) => {
        const downloadUrl = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          fullPath: itemRef.fullPath,
          downloadUrl: downloadUrl,
        };
      })
    );

    files.sort((a, b) => b.name.localeCompare(a.name));
    return files;
  } catch (error) {
    console.error("Error listing CVI results from Firebase Storage:", error);
    throw error;
  }
};

export const fetchCviGeoJsonByUrl = async (downloadUrl: string): Promise<FeatureCollection | null> => {
  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch GeoJSON: ${response.statusText}`);
    }
    const geoJsonData = await response.json() as FeatureCollection;
    return geoJsonData;
  } catch (error) {
    console.error("Error fetching or parsing CVI GeoJSON from URL:", error);
    throw error;
  }
};

export { app, storage };
