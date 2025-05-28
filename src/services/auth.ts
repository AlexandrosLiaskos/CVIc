import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseAuthStateChanged,
  type User as FirebaseUser,
  Auth
} from 'firebase/auth'
import { app, isFirebaseInitialized } from '../lib/firebase'
import type { User } from '../types'

// Create a dummy auth object for when Firebase is not initialized
const dummyAuth = {
  currentUser: null,
  onAuthStateChanged: (callback: any) => {
    callback(null);
    return () => {}; // Return a no-op unsubscribe function
  }
} as unknown as Auth;

// Only initialize auth if Firebase is properly initialized
let auth: Auth;
let googleProvider: GoogleAuthProvider;

try {
  if (isFirebaseInitialized) {
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } else {
    console.warn('Firebase not initialized. Using dummy auth.');
    auth = dummyAuth;
    googleProvider = {} as GoogleAuthProvider;
  }
} catch (error) {
  console.error('Error initializing auth:', error);
  auth = dummyAuth;
  googleProvider = {} as GoogleAuthProvider;
}

export async function signInWithGoogle(): Promise<User> {
  // Check if Firebase is initialized
  if (!isFirebaseInitialized) {
    console.warn('Firebase not initialized. Cannot sign in.');
    throw new Error('Authentication is not available. Please check your internet connection and try again.');
  }

  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    return {
      id: user.uid,
      email: user.email || '',
      displayName: user.displayName || null,
      photoURL: user.photoURL || null
    }
  } catch (error) {
    console.error('Error signing in with Google:', error)
    throw error
  }
}

export async function signOut(): Promise<void> {
  // Check if Firebase is initialized
  if (!isFirebaseInitialized) {
    console.warn('Firebase not initialized. Cannot sign out.');
    return; // Just return without error to allow the UI to update
  }

  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export function onAuthStateChanged(callback: (user: User | null) => void): () => void {
  // If Firebase is not initialized, immediately return null user
  if (!isFirebaseInitialized) {
    console.warn('Firebase not initialized. Auth state will always be null.');

    // In production, we want to immediately return null to avoid loading spinner
    setTimeout(() => {
      console.log('Calling auth callback with null user due to Firebase not being initialized');
      callback(null);
    }, 0);

    return () => {}; // Return a no-op unsubscribe function
  }

  console.log('Setting up Firebase auth state change listener');

  try {
    return firebaseAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'No user');

      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || null,
          photoURL: firebaseUser.photoURL || null
        }
        callback(user)
      } else {
        callback(null)
      }
    })
  } catch (error) {
    console.error('Error setting up auth state listener:', error);

    // If there's an error, still call the callback with null to avoid loading spinner
    setTimeout(() => callback(null), 0);
    return () => {}; // Return a no-op unsubscribe function
  }
}

export function getCurrentUser(): User | null {
  // If Firebase is not initialized, return null
  if (!isFirebaseInitialized) {
    return null;
  }

  const firebaseUser = auth.currentUser
  if (!firebaseUser) return null

  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName || null,
    photoURL: firebaseUser.photoURL || null
  }
}

export function isAuthenticated(): boolean {
  // If Firebase is not initialized, user is not authenticated
  if (!isFirebaseInitialized) {
    return false;
  }

  return auth.currentUser !== null
}

export function getUserId(): string | null {
  // If Firebase is not initialized, return null
  if (!isFirebaseInitialized) {
    return null;
  }

  return auth.currentUser?.uid || null
}