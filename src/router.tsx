// ---- File: src/router.tsx ----
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import RootPage from './pages/RootPage';
import LoginPage from './pages/LoginPage';
import ShorelinePage from './pages/ShorelinePage';
import SegmentationPage from './pages/SegmentationPage';
import SegmentTablePage from './pages/SegmentTablePage';
import ParameterSelectionPage from './pages/ParameterSelectionPage';
import ParameterAssignmentPage from './pages/ParameterAssignmentPage';
import ResultsPage from './pages/ResultsPage';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export const router = createBrowserRouter([
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
        path: 'login',
        element: <LoginPage />
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
]);
