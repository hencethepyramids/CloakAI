import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation()
  const { user, logout } = useAuth()
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'bi-speedometer2' },
    { name: 'Stealth Screen Share', path: '/screen-share', icon: 'bi-display' },
    { name: 'Resume Builder', path: '/resume-builder', icon: 'bi-file-earmark-text' },
    { name: 'Interview Simulator', path: '/interview-simulator', icon: 'bi-mic' },
    { name: 'Settings', path: '/settings', icon: 'bi-gear' }
  ]
  
  const isActive = (path: string) => location.pathname === path
  
  return (
    <>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-20 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-dark-400 shadow-comfy transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-dark-300">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <i className="bi bi-incognito text-primary-500 text-xl"></i>
            <span className="font-mono font-bold text-lg text-neutral-900 dark:text-neutral-100">Stealth AI</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        
        {/* User info */}
        <div className="p-4 border-b dark:border-dark-300">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-300">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">{user?.name}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{user?.email}</p>
            </div>
          </div>
          <div className="mt-3">
            <span className="badge badge-primary">
              {user?.plan === 'free' ? 'Free Plan' : user?.plan === 'pro' ? 'Pro Plan' : 'Enterprise Plan'}
            </span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-dark-300'
              }`}
            >
              <i className={`${item.icon} mr-3`}></i>
              {item.name}
              
              {/* Special badge for stealth mode */}
              {item.path === '/screen-share' && (
                <span className="ml-auto badge badge-primary text-xs">
                  <i className="bi bi-eye-slash text-xs mr-1"></i>
                  Stealth
                </span>
              )}
            </Link>
          ))}
        </nav>
        
        {/* Stealth mode info */}
        <div className="px-4 py-3 mx-4 mt-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-900/50">
          <div className="flex items-start">
            <i className="bi bi-shield-lock text-primary-600 dark:text-primary-400 mt-0.5 mr-2"></i>
            <div>
              <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Stealth Mode Available</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                Press Alt+S to toggle stealth mode during screen sharing
              </p>
            </div>
          </div>
        </div>
        
        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t dark:border-dark-300">
          <button
            onClick={logout}
            className="flex items-center w-full px-3 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-dark-300 rounded-md transition-colors"
          >
            <i className="bi bi-box-arrow-left mr-3"></i>
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
