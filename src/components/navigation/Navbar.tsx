import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])
  
  return (
    <nav className={`fixed w-full z-30 transition-all duration-300 ${
      isScrolled ? 'bg-white dark:bg-gray-900 shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <i className="bi bi-lightning-charge-fill text-primary-500 text-2xl"></i>
            <span className="font-display font-bold text-xl text-gray-900 dark:text-white">WebSparks AI</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#features" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
              Features
            </Link>
            <Link to="/#pricing" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
              Pricing
            </Link>
            <button 
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
            >
              {theme === 'dark' ? (
                <i className="bi bi-sun"></i>
              ) : (
                <i className="bi bi-moon"></i>
              )}
            </button>
            
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary">
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 text-gray-700 dark:text-gray-300"
            >
              {theme === 'dark' ? (
                <i className="bi bi-sun"></i>
              ) : (
                <i className="bi bi-moon"></i>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300"
            >
              {mobileMenuOpen ? (
                <i className="bi bi-x-lg text-xl"></i>
              ) : (
                <i className="bi bi-list text-xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/#features" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Features
            </Link>
            <Link to="/#pricing" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Pricing
            </Link>
            
            {isAuthenticated ? (
              <Link to="/dashboard" className="block px-3 py-2 text-white bg-primary-500 hover:bg-primary-600 rounded-md">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Log in
                </Link>
                <Link to="/register" className="block px-3 py-2 text-white bg-primary-500 hover:bg-primary-600 rounded-md">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
