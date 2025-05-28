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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener');

    // Set a timeout to ensure loading state doesn't get stuck
    const timeoutId = setTimeout(() => {
      console.log('AuthProvider: Force ending loading state after timeout');
      setLoading(false);
    }, 3000); // 3 seconds max loading time

    const unsubscribe = onAuthStateChanged((authUser) => {
      console.log('AuthProvider: Auth state changed, user:', authUser ? 'logged in' : 'not logged in');
      setUser(authUser)
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
      await firebaseSignInWithGoogle()
    } catch (err) {
      console.error("Sign in error:", err)
      setError(err instanceof Error ? err.message : 'Failed to sign in.')
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    setError(null)
    try {
      await firebaseSignOut()
    } catch (err) {
      console.error("Sign out error:", err)
      setError(err instanceof Error ? err.message : 'Failed to sign out.')
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
