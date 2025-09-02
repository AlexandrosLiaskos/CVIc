import React, { useState, useEffect } from 'react';

interface DebugPanelProps {
  showByDefault?: boolean;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ showByDefault = false }) => {
  const [isVisible, setIsVisible] = useState(showByDefault);
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [assetLoadStatus, setAssetLoadStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Collect environment variables
    const vars: Record<string, string> = {};
    Object.keys(import.meta.env).forEach((key) => {
      // Don't include the actual values of sensitive variables
      if (key.includes('API_KEY') || key.includes('SECRET')) {
        vars[key] = '[REDACTED]';
      } else {
        vars[key] = String(import.meta.env[key]);
      }
    });
    setEnvVars(vars);

    // Update window size on resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Check asset loading status
    const checkAssets = () => {
      const assets = {
        css: document.querySelector('link[href*="index"][href$=".css"]') !== null,
        js: document.querySelector('script[src*="index"][src$=".js"]') !== null,
        leafletCss: document.querySelector('link[href*="leaflet.css"]') !== null,
        leafletDrawCss: document.querySelector('link[href*="leaflet.draw.css"]') !== null,
      };
      setAssetLoadStatus(assets);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', checkAssets);
    
    // Initial check
    checkAssets();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', checkAssets);
    };
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50"
        title="Show Debug Info"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM6.293 6.707a1 1 0 011.414 0L9 8.414l1.293-1.293a1 1 0 111.414 1.414L10.414 10l1.293 1.293a1 1 0 01-1.414 1.414L9 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L7.586 10 6.293 8.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Debug Information</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Basic Info */}
          <section>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Basic Information</h3>
            <div className="bg-gray-50 p-3 rounded">
              <p><strong>User Agent:</strong> {navigator.userAgent}</p>
              <p><strong>Window Size:</strong> {windowSize.width} x {windowSize.height}</p>
              <p><strong>Firebase:</strong> Disabled (Local-only mode)</p>
              <p><strong>Base URL:</strong> {window.location.origin}</p>
              <p><strong>Current Path:</strong> {window.location.pathname}</p>
              <p><strong>Hash:</strong> {window.location.hash}</p>
            </div>
          </section>

          {/* Asset Loading Status */}
          <section>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Asset Loading Status</h3>
            <div className="bg-gray-50 p-3 rounded">
              {Object.entries(assetLoadStatus).map(([asset, loaded]) => (
                <p key={asset}>
                  <strong>{asset}:</strong> {loaded ? '✅ Loaded' : '❌ Not Loaded'}
                </p>
              ))}
            </div>
          </section>

          {/* Environment Variables */}
          <section>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Environment Variables</h3>
            <div className="bg-gray-50 p-3 rounded">
              {Object.entries(envVars).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
            </div>
          </section>

          {/* Test Actions */}
          <section>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Test Actions</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => window.location.reload()}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Reload Page
              </button>
              <button 
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  alert('Local storage and session storage cleared');
                }}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear Storage
              </button>
              <button 
                onClick={() => {
                  const img = new Image();
                  img.onload = () => alert('Test image loaded successfully');
                  img.onerror = () => alert('Failed to load test image');
                  img.src = '/vite.svg';
                }}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Test Image Loading
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
