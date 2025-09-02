import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const RouterDebug: React.FC = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [routeInfo, setRouteInfo] = useState({
    pathname: '',
    hash: '',
    search: '',
    state: null as unknown,
    key: ''
  });

  useEffect(() => {
    setRouteInfo({
      pathname: location.pathname,
      hash: location.hash,
      search: location.search,
      state: location.state,
      key: location.key
    });
  }, [location]);

  // Check if we're in development or if debug param is present
  useEffect(() => {
    const isDev = import.meta.env.DEV;
    const hasDebugParam = new URLSearchParams(window.location.search).has('debug');
    setVisible(isDev || hasDebugParam);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-2 text-xs z-50 opacity-80">
      <div className="flex justify-between">
        <div>
          <strong>Path:</strong> {routeInfo.pathname}
        </div>
        <div>
          <strong>Hash:</strong> {routeInfo.hash}
        </div>
        <div>
          <strong>Search:</strong> {routeInfo.search}
        </div>
        <div>
          <button 
            onClick={() => setVisible(false)}
            className="bg-red-500 text-white px-2 py-0.5 rounded text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
