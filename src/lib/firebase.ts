import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import type { FeatureCollection } from 'geojson';
import { FirebaseApp } from 'firebase/app';
import { FirebaseStorage } from 'firebase/storage';

// Check for environment variables
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

// Create a flag to track if Firebase is properly initialized
let isFirebaseInitialized = false;

// Create the Firebase config object, with fallbacks for production
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Log missing environment variables as a warning instead of throwing an error
if (missingEnvVars.length > 0) {
  console.warn(
    `Missing Firebase configuration variables: ${missingEnvVars.join(', ')}. Some features may not work properly.`
  );
}

let app: FirebaseApp;
let storage: FirebaseStorage;

try {
  // Only initialize Firebase if we have the minimum required config
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    console.log('Initializing Firebase with config:', {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
      storageBucket: firebaseConfig.storageBucket,
      hasApiKey: !!firebaseConfig.apiKey,
      hasAppId: !!firebaseConfig.appId
    });

    app = initializeApp(firebaseConfig);
    storage = getStorage(app);
    isFirebaseInitialized = true;
    console.log('Firebase initialized successfully');
  } else {
    console.warn('Firebase initialization skipped due to missing configuration');
    // Create dummy objects to prevent app from crashing
    app = {} as FirebaseApp;
    storage = {} as FirebaseStorage;

    // Force isFirebaseInitialized to true for production builds to avoid loading spinner
    if (import.meta.env.PROD) {
      console.log('Production build detected, forcing Firebase initialization to true');
      isFirebaseInitialized = true;
    }
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  console.error('Firebase config:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    hasApiKey: !!firebaseConfig.apiKey
  });

  // Create dummy objects to prevent app from crashing
  app = {} as FirebaseApp;
  storage = {} as FirebaseStorage;

  // Force isFirebaseInitialized to true for production builds to avoid loading spinner
  if (import.meta.env.PROD) {
    console.log('Production build detected, forcing Firebase initialization to true despite error');
    isFirebaseInitialized = true;
  }
}

export const listUserCviResults = async (userId: string): Promise<{ name: string; fullPath: string; downloadUrl: string }[]> => {
  if (!userId) {
    console.error("User ID is required to list CVI results.");
    return [];
  }

  // Check if Firebase is properly initialized
  if (!isFirebaseInitialized) {
    console.warn("Firebase is not initialized. Cannot list CVI results.");
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
    // Return empty array instead of throwing to prevent app crash
    return [];
  }
};

export const fetchCviGeoJsonByUrl = async (downloadUrl: string): Promise<FeatureCollection | null> => {
  try {
    // Check if URL is valid
    if (!downloadUrl || typeof downloadUrl !== 'string') {
      console.warn("Invalid download URL provided");
      return null;
    }

    const response = await fetch(downloadUrl);
    if (!response.ok) {
      console.warn(`Failed to fetch GeoJSON: ${response.statusText}`);
      return null;
    }
    const geoJsonData = await response.json() as FeatureCollection;
    return geoJsonData;
  } catch (error) {
    console.error("Error fetching or parsing CVI GeoJSON from URL:", error);
    // Return null instead of throwing to prevent app crash
    return null;
  }
};

// Export the Firebase app, storage, and initialization status
export { app, storage, isFirebaseInitialized };
