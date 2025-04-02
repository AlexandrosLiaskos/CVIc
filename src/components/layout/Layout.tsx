import { Link, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const navigation = [
]

export const Layout = () => {
  const location = useLocation()
  const { user, loading, signOut } = useAuth()

  // Remove the base path from the location pathname for comparison
  const currentPath = location.pathname.replace('/CVIc', '')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-primary-600">
                  CVIc
                </Link>
              </div>
              {user && (
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        currentPath === item.href
                          ? 'border-primary-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">{user.displayName}</span>
                  <button
                    onClick={() => signOut()}
                    className="btn btn-secondary text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary text-sm">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
} 