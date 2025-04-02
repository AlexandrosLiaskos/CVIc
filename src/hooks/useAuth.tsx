import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User } from '../types'
import {
  signInWithGoogle as firebaseSignInWithGoogle,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from '../services/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signIn: () => Promise<void>
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

/**
 * Provides authentication state and actions to the application.
 * Uses Firebase for authentication.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true) // Start as true for initial check
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged((authUser) => {
      // Reason: Update user state based on Firebase auth status
      setUser(authUser)
      setLoading(false) // Set loading to false once auth state is determined
      setError(null)    // Clear any previous errors on state change
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, []) // Empty dependency array ensures this runs only once on mount

  /**
   * Initiates the Google sign-in process.
   */
  const signIn = async () => {
    setLoading(true)
    setError(null)
    try {
      await firebaseSignInWithGoogle()
      // User state will be updated by onAuthStateChanged listener
    } catch (err) {
      console.error("Sign in error:", err)
      setError(err instanceof Error ? err.message : 'Failed to sign in.')
      setLoading(false) // Ensure loading is false on error
    }
    // setLoading(false) // Loading is set to false by onAuthStateChanged
  }

  /**
   * Signs the current user out.
   */
  const signOut = async () => {
    setLoading(true)
    setError(null)
    try {
      await firebaseSignOut()
      // User state will be updated by onAuthStateChanged listener to null
    } catch (err) {
      console.error("Sign out error:", err)
      setError(err instanceof Error ? err.message : 'Failed to sign out.')
      setLoading(false) // Ensure loading is false on error
    }
    // setLoading(false) // Loading is set to false by onAuthStateChanged
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
} 