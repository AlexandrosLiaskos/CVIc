import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { AuthProvider } from './hooks/useAuth'
import { initializeProj4 } from './utils/proj4Setup'

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);

  // Special handling for proj4 errors
  if (event.error && event.error.message && event.error.message.includes('defs is not a function')) {
    console.warn('Detected proj4 initialization error, attempting to fix...');

    // Try to fix proj4 if it exists in the window object
    if (window.proj4) {
      if (typeof window.proj4.default === 'function') {
        window.proj4 = window.proj4.default;
        console.log('Fixed proj4 using default export');
      }
    }

    // Prevent the white screen by showing a helpful message
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; font-family: sans-serif;">
          <h2>Loading application...</h2>
          <p>If the application doesn't load within a few seconds, please try refreshing the page.</p>
        </div>
      `;

      // Try to reload the application after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }
});

// Initialize proj4 with common coordinate systems
// This prevents the "up.defs is not a function" error in production
try {
  initializeProj4();
  console.log('proj4 initialized successfully');
} catch (error) {
  console.error('Error initializing proj4:', error);
}

// Ensure the DOM is fully loaded before rendering
const renderApp = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('Root element not found. Retrying in 100ms...');
    setTimeout(renderApp, 100);
    return;
  }

  try {
    // Check if proj4 is properly initialized
    if (window.proj4 && typeof window.proj4.defs !== 'function') {
      console.warn('proj4 is not properly initialized, attempting to fix...');
      if (typeof window.proj4.default === 'function') {
        window.proj4 = window.proj4.default;
        console.log('Fixed proj4 using default export');
      }
    }

    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <AuthProvider>
          <App />
        </AuthProvider>
      </React.StrictMode>,
    );
    console.log('Application rendered successfully');
  } catch (error) {
    console.error('Error rendering application:', error);

    // Show a helpful error message instead of a white screen
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; font-family: sans-serif;">
          <h2>Error Loading Application</h2>
          <p>There was a problem loading the application. Please try refreshing the page.</p>
          <p>If the problem persists, please contact support.</p>
          <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 10px;">
            Refresh Page
          </button>
        </div>
      `;
    }
  }
};

// Start rendering when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
