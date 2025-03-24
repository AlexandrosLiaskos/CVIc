import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function RootPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to CVIc
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Coastal Vulnerability Index Compiler
      </p>
      
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 mb-8">
          CVIc helps coastal managers, researchers, and policy makers assess shoreline vulnerability
          to coastal hazards such as erosion, flooding, and sea-level rise.
        </p>

        {user ? (
          <div className="space-y-4">
            <Link
              to="/shoreline"
              className="btn btn-primary block w-full"
            >
              Start New Analysis
            </Link>
            <Link
              to="/results-manager"
              className="btn btn-secondary block w-full"
            >
              View Previous Results
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              Please sign in to start using CVIc.
            </p>
            <Link
              to="/login"
              className="btn btn-primary block w-full"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 