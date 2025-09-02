import { RouterProvider } from 'react-router-dom'
import { router } from './router'

/**
 * App component that properly uses the router
 * This is an alternative entry point that matches the setup in main.tsx
 * Note: The main entry point is main.tsx, this file is kept for reference
 */
export const App = () => {
  return (
    <RouterProvider router={router} />
  )
}
