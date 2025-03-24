import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ShorelinePage from './pages/ShorelinePage'
import { ParameterPage } from './pages/ParameterPage'

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShorelinePage />} />
        <Route path="/shoreline" element={<ShorelinePage />} />
        <Route path="/parameters" element={<ParameterPage />} />
      </Routes>
    </Router>
  )
}
