/**
 * Main entry point for the application
 *
 * This file initializes the React application.
 */

// Import map libraries to ensure proper initialization
import './utils/mapLibraries';

// Import React and other dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', error);
    console.error('Component Stack:', errorInfo.componentStack);
    // You could send this to an error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h1>CVIc - Coastal Vulnerability Index Compiler</h1>
          <p>Something went wrong. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Check if we're in development or production
const isDev = import.meta.env.DEV;
console.log(`Running in ${isDev ? 'development' : 'production'} mode`);
console.log(`Base URL: ${import.meta.env.BASE_URL}`);
console.log(`Current URL: ${window.location.href}`);
console.log(`Current pathname: ${window.location.pathname}`);

// Initialize the app
console.log('Initializing React application');
const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('Root element found, rendering app');

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </React.StrictMode>,
    );
  } catch (error) {
    console.error('Error rendering application:', error);

    // Show a fallback UI
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h1>CVIc - Coastal Vulnerability Index Compiler</h1>
        <p>The application failed to initialize. Please try refreshing the page.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 20px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `;
  }
} else {
  console.error('Root element not found');
}
