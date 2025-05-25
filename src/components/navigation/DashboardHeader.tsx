import React from 'react'
import { useTheme } from '../../context/ThemeContext'

interface DashboardHeaderProps {
  onMenuClick: () => void
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-dark-400 shadow-sm border-b border-neutral-200 dark:border-dark-300">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="md:hidden text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
        >
          <i className="bi bi-list text-xl"></i>
        </button>
        
        <div className="flex-1 md:ml-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="bi bi-search text-neutral-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 dark:border-dark-300 rounded-md leading-5 bg-white dark:bg-dark-300 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 rounded-full hover:bg-neutral-100 dark:hover:bg-dark-300"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <i className="bi bi-sun"></i>
            ) : (
              <i className="bi bi-moon"></i>
            )}
          </button>
          
          <button 
            className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 rounded-full hover:bg-neutral-100 dark:hover:bg-dark-300 relative"
            title="Notifications"
          >
            <i className="bi bi-bell"></i>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <button 
            className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 rounded-full hover:bg-neutral-100 dark:hover:bg-dark-300"
            title="Help"
          >
            <i className="bi bi-question-circle"></i>
          </button>
          
          <button 
            className="p-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 relative"
            title="Toggle stealth mode"
          >
            <i className="bi bi-incognito"></i>
          </button>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
