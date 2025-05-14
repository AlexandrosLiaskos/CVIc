import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth'
import { app } from '../lib/firebase'
import type { User } from '../types'

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export async function signInWithGoogle(): Promise<User> {
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
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export function onAuthStateChanged(callback: (user: User | null) => void): () => void {
  return firebaseAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
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
}

export function getCurrentUser(): User | null {
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
  return auth.currentUser !== null
}

export function getUserId(): string | null {
  return auth.currentUser?.uid || null
}