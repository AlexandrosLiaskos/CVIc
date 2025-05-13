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
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser)
      setLoading(false) 
      setError(null)    
    })

    return () => unsubscribe()
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