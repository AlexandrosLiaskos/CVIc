// ---- File: src/router.tsx ----
import { createHashRouter, RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { LazyWrapper } from './components/common/LoadingComponents';

// Use hash router for better compatibility with static hosting
// This avoids the need for server-side configuration
// Hash router format: /#/path instead of /path

import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Import RootPage directly to ensure it's always available
import RootPage from './pages/RootPage';
const ShorelineSelectionPage = lazy(() => import('./pages/ShorelineSelectionPage'));
const ShorelineSourcePage = lazy(() => import('./pages/ShorelineSourcePage'));
const SatelliteImageUploadPage = lazy(() => import('./pages/SatelliteImageUploadPage'));
const EnhancedShorelineDigitizationPage = lazy(() => import('./pages/EnhancedShorelineDigitizationPage'));
const AOISelectionPage = lazy(() => import('./pages/AOISelectionPage'));
const ShorelinePage = lazy(() => import('./pages/ShorelinePage'));
const SegmentationPage = lazy(() => import('./pages/SegmentationPage'));
const SegmentTablePage = lazy(() => import('./pages/SegmentTablePage'));
const ParameterSelectionPage = lazy(() => import('./pages/ParameterSelectionPage'));
const ParameterAssignmentPage = lazy(() => import('./pages/ParameterAssignmentPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));



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
        path: 'shoreline-selection',
        element: (
          <LazyWrapper>
            <ShorelineSelectionPage />
          </LazyWrapper>
        )
      },
      {
        path: 'shoreline-source',
        element: (
          <LazyWrapper>
            <ShorelineSourcePage />
          </LazyWrapper>
        )
      },
      {
        path: 'satellite-upload',
        element: (
          <LazyWrapper>
            <SatelliteImageUploadPage />
          </LazyWrapper>
        )
      },
      {
        path: 'enhanced-shoreline-digitization',
        element: (
          <LazyWrapper>
            <EnhancedShorelineDigitizationPage />
          </LazyWrapper>
        )
      },
      {
        path: 'aoi-selection',
        element: (
          <LazyWrapper>
            <AOISelectionPage />
          </LazyWrapper>
        )
      },
      {
        path: 'shoreline',
        element: (
          <LazyWrapper>
            <ShorelinePage />
          </LazyWrapper>
        )
      },
      {
        path: 'segmentation',
        element: (
          <LazyWrapper>
            <SegmentationPage />
          </LazyWrapper>
        )
      },
      {
        path: 'segment-table',
        element: (
          <LazyWrapper>
            <SegmentTablePage />
          </LazyWrapper>
        )
      },
      {
        path: 'parameter-selection',
        element: (
          <LazyWrapper>
            <ParameterSelectionPage />
          </LazyWrapper>
        )
      },
      {
        path: 'parameter-assignment',
        element: (
          <LazyWrapper>
            <ParameterAssignmentPage />
          </LazyWrapper>
        )
      },
      {
        path: 'results',
        element: (
          <LazyWrapper>
            <ResultsPage />
          </LazyWrapper>
        )
      }
    ]
  }
];

// Create the router with the routes
console.log('Creating hash router with routes:', routes);
export const router = createHashRouter(routes);
console.log('Hash router created successfully');
