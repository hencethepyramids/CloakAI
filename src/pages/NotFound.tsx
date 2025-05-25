import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center">
          <i className="bi bi-exclamation-circle text-primary-500 text-6xl"></i>
        </div>
        <h1 className="mt-6 text-3xl font-display font-bold text-gray-900 dark:text-white">
          404 - Page Not Found
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn btn-primary">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
