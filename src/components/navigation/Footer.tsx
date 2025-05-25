import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2">
              <i className="bi bi-lightning-charge-fill text-primary-500 text-2xl"></i>
              <span className="font-display font-bold text-xl text-gray-900 dark:text-white">WebSparks AI</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              Revolutionizing the way professionals prepare for interviews, optimize resumes, and receive real-time AI assistance.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/#features" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                  <i className="bi bi-twitter mr-2"></i>Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                  <i className="bi bi-linkedin mr-2"></i>LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                  <i className="bi bi-github mr-2"></i>GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} WebSparks AI. All rights reserved.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs text-center mt-2">
            Designed by WebSparks AI
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
