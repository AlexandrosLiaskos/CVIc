import React, { Suspense } from 'react';

// Loading component for lazy-loaded routes
export const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);

// Simple wrapper for lazy-loaded components
export function LazyWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
}