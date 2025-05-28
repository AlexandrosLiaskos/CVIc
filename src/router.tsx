// ---- File: src/router.tsx ----
import { createHashRouter, Navigate, RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Use hash router for better compatibility with static hosting
// This avoids the need for server-side configuration
// Hash router format: /#/path instead of /path

import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useAuth } from './hooks/useAuth';

// Import RootPage directly to ensure it's always available
import RootPage from './pages/RootPage';
// Import LoginPage directly as well to avoid lazy loading issues
import LoginPage from './pages/LoginPage';
const ShorelineSelectionPage = lazy(() => import('./pages/ShorelineSelectionPage'));
const ShorelineSourcePage = lazy(() => import('./pages/ShorelineSourcePage'));
const SatelliteImageUploadPage = lazy(() => import('./pages/SatelliteImageUploadPage'));
const ShorelineDigitizationPage = lazy(() => import('./pages/ShorelineDigitizationPage'));
const EnhancedShorelineDigitizationPage = lazy(() => import('./pages/EnhancedShorelineDigitizationPage'));
const AOISelectionPage = lazy(() => import('./pages/AOISelectionPage'));
const ShorelinePage = lazy(() => import('./pages/ShorelinePage'));
const SegmentationPage = lazy(() => import('./pages/SegmentationPage'));
const SegmentTablePage = lazy(() => import('./pages/SegmentTablePage'));
const ParameterSelectionPage = lazy(() => import('./pages/ParameterSelectionPage'));
const ParameterAssignmentPage = lazy(() => import('./pages/ParameterAssignmentPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));

// Loading component for lazy-loaded routes
const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingComponent />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
}

// Define routes as a separate array for better organization
const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    errorElement: <div>Something went wrong</div>,
    children: [
      {
        index: true,
        element: <RootPage />
      },
      {
        path: 'home',
        element: <RootPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'shoreline-selection',
        element: (
          <ProtectedRoute>
            <ShorelineSelectionPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'shoreline-source',
        element: (
          <ProtectedRoute>
            <ShorelineSourcePage />
          </ProtectedRoute>
        )
      },
      {
        path: 'satellite-upload',
        element: (
          <ProtectedRoute>
            <SatelliteImageUploadPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'shoreline-digitization',
        element: (
          <ProtectedRoute>
            <ShorelineDigitizationPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'enhanced-shoreline-digitization',
        element: (
          <ProtectedRoute>
            <EnhancedShorelineDigitizationPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'aoi-selection',
        element: (
          <ProtectedRoute>
            <AOISelectionPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'shoreline',
        element: (
          <ProtectedRoute>
            <ShorelinePage />
          </ProtectedRoute>
        )
      },
      {
        path: 'segmentation',
        element: (
          <ProtectedRoute>
            <SegmentationPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'segment-table',
        element: (
          <ProtectedRoute>
            <SegmentTablePage />
          </ProtectedRoute>
        )
      },
      {
        path: 'parameter-selection',
        element: (
          <ProtectedRoute>
            <ParameterSelectionPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'parameter-assignment',
        element: (
          <ProtectedRoute>
            <ParameterAssignmentPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'results',
        element: (
          <ProtectedRoute>
            <ResultsPage />
          </ProtectedRoute>
        )
      }
    ]
  }
];

// Create the router with the routes
export const router = createHashRouter(routes);
