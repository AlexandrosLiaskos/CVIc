import { lazy, Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './hooks/useAuth'

// Simple loading component
const LoadingComponent = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
  </div>
)

/**
 * App component that properly uses the router
 * This is an alternative entry point that matches the setup in main.tsx
 * Note: The main entry point is main.tsx, this file is kept for reference
 */
export const App = () => {
  return (
    <AuthProvider>
      <>
        <RouterProvider router={router} />
      </>
    </AuthProvider>
  )
}
