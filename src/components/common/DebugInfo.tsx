import React, { useState, useEffect } from 'react';

interface DebugInfoProps {
  showByDefault?: boolean;
}

export const DebugInfo: React.FC<DebugInfoProps> = ({ showByDefault = false }) => {
  const [isVisible, setIsVisible] = useState(showByDefault);
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
          
          {/* Environment Variables */}
          <section>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Environment Variables</h3>
            <div className="bg-gray-50 p-3 rounded">
              <pre className="text-xs overflow-auto max-h-40">
                {JSON.stringify(envVars, null, 2)}
              </pre>
            </div>
          </section>
          
          {/* Local Storage */}
          <section>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Local Storage</h3>
            <div className="bg-gray-50 p-3 rounded">
              <pre className="text-xs overflow-auto max-h-40">
                {JSON.stringify(Object.fromEntries(
                  Object.keys(localStorage).map(key => [key, localStorage.getItem(key)])
                ), null, 2)}
              </pre>
            </div>
          </section>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => setIsVisible(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
