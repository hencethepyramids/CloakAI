import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layouts
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Pages
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboard'
import ScreenShare from './pages/tools/ScreenShare'
import ResumeBuilder from './pages/tools/ResumeBuilder'
import InterviewSimulator from './pages/tools/InterviewSimulator'
import Settings from './pages/dashboard/Settings'
import NotFound from './pages/NotFound'

// Context
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

// Components
import ProtectedRoute from './components/auth/ProtectedRoute'
import AIOverlay from './components/overlay/AIOverlay'

const App: React.FC = () => {
  const location = useLocation()
  const [showOverlay, setShowOverlay] = useState(false)
  const [stealthMode, setStealthMode] = useState(true)
  
  // Toggle AI overlay with keyboard shortcut (Alt+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        setShowOverlay(prev => !prev)
      }
      
      // Alt+S to toggle stealth mode
      if (e.altKey && e.key === 's') {
        setStealthMode(prev => !prev)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        {showOverlay && (
          <AIOverlay 
            onClose={() => setShowOverlay(false)} 
            stealthMode={stealthMode}
            setStealthMode={setStealthMode}
          />
        )}
        
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/screen-share" element={<ScreenShare />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/interview-simulator" element={<InterviewSimulator />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
