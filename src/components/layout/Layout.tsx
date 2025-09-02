import { Link, useLocation, Outlet } from 'react-router-dom';
import { Footer } from './Footer';

export const Layout = () => {
  console.log('Layout component rendering');
  const location = useLocation();

  // Get the current path
  const currentPath = location.pathname;
  console.log('Current path:', currentPath);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and title */}
            <div className="flex items-center">
              <Link to="/home" className="flex items-center">
                <span className="text-xl font-semibold text-gray-900">
                  CVIc
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-4">
              <Link
                to="/home"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shoreline-selection"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                New Analysis
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 w-full">
        <div className="px-4 py-6 sm:px-0 h-full">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};