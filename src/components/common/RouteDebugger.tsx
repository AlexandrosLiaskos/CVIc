import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * A component that displays debugging information about the current route
 * and provides tools to help diagnose routing issues.
 */
export const RouteDebugger: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    // Get the base URL from the environment
    setBaseUrl(import.meta.env.BASE_URL || '/');
    
    // Only show in development or when debug parameter is present
    const isDev = import.meta.env.DEV;
    const hasDebugParam = new URLSearchParams(window.location.search).has('debug');
    setIsVisible(isDev || hasDebugParam);
  }, []);

  if (!isVisible) return null;

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 right-0 bg-white border border-gray-300 shadow-lg p-4 m-4 rounded-lg text-xs max-w-md z-50 opacity-90 hover:opacity-100">
      <h3 className="font-bold text-sm mb-2 text-primary-700">Route Debugger</h3>
      
      <div className="mb-3">
        <div className="grid grid-cols-2 gap-1">
          <div className="font-semibold">Path:</div>
          <div>{location.pathname}</div>
          
          <div className="font-semibold">Hash:</div>
          <div>{location.hash}</div>
          
          <div className="font-semibold">Search:</div>
          <div>{location.search}</div>
          
          <div className="font-semibold">Base URL:</div>
          <div>{baseUrl}</div>
          
          <div className="font-semibold">Full URL:</div>
          <div className="break-all">{window.location.href}</div>
        </div>
      </div>
      
      <div className="mb-3">
        <h4 className="font-semibold mb-1 text-primary-600">Quick Navigation</h4>
        <div className="flex flex-wrap gap-1">
          <button 
            onClick={() => handleNavigate('/')}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
          >
            Root
          </button>
          <button 
            onClick={() => handleNavigate('/home')}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigate('/login')}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
          >
            Login
          </button>
        </div>
      </div>
      
      <div className="text-right">
        <button 
          onClick={() => setIsVisible(false)}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Hide
        </button>
      </div>
    </div>
  );
};

export default RouteDebugger;
