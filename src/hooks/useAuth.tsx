import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { signInWithGoogle, signOut as firebaseSignOut, onAuthStateChanged } from '../services/auth'
import type { User } from '../types'

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
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async () => {
    try {
      setError(null)
      const user = await signInWithGoogle()
      setUser(user)
    } catch (err) {
      setError('Failed to sign in')
      throw err
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      await firebaseSignOut()
      setUser(null)
    } catch (err) {
      setError('Failed to sign out')
      throw err
    }
  }

  const value = {
    user,
    loading,
    error,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 