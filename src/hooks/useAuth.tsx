import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User } from '../types'
import {
  signInWithGoogle as firebaseSignInWithGoogle,
  signInAsGuest as firebaseSignInAsGuest,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from '../services/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signIn: () => Promise<void>
  signInAsGuest: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)


export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [guestUser, setGuestUser] = useState<User | null>(null)

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener');

    // Set a timeout to ensure loading state doesn't get stuck
    const timeoutId = setTimeout(() => {
      console.log('AuthProvider: Force ending loading state after timeout');
      setLoading(false);
    }, 3000); // 3 seconds max loading time

    const unsubscribe = onAuthStateChanged((authUser) => {
      console.log('AuthProvider: Auth state changed, user:', authUser ? 'logged in' : 'not logged in');
      // Only update user if it's not a guest user (guest users are managed separately)
      if (!guestUser) {
        setUser(authUser)
      }
      setLoading(false)
      setError(null)

      // Clear the timeout since we got a response
      clearTimeout(timeoutId);
    })

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    }
  }, [])

  const signIn = async () => {
    setLoading(true)
    setError(null)
    try {
      const user = await firebaseSignInWithGoogle()
      setUser(user)
      setGuestUser(null) // Clear any guest user
    } catch (err) {
      console.error("Sign in error:", err)
      setError(err instanceof Error ? err.message : 'Failed to sign in.')
      setLoading(false)
    }
  }

  const signInAsGuest = async () => {
    setLoading(true)
    setError(null)
    try {
      const guest = await firebaseSignInAsGuest()
      setGuestUser(guest)
      setUser(guest) // Set as current user
      setLoading(false)
    } catch (err) {
      console.error("Guest sign in error:", err)
      setError(err instanceof Error ? err.message : 'Failed to start demo mode.')
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    setError(null)
    try {
      const currentUser = user || guestUser
      await firebaseSignOut(currentUser)
      setUser(null)
      setGuestUser(null)
      setLoading(false)
    } catch (err) {
      console.error("Sign out error:", err)
      setError(err instanceof Error ? err.message : 'Failed to sign out.')
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signInAsGuest, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
