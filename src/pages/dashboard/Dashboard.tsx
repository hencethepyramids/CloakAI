import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  
  const tools = [
    {
      name: 'Screen Share',
      description: 'Share your screen with AI overlay for real-time assistance',
      icon: 'bi-display',
      color: 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300',
      path: '/screen-share'
    },
    {
      name: 'Resume Builder',
      description: 'Optimize your resume for specific job descriptions',
      icon: 'bi-file-earmark-text',
      color: 'bg-secondary-100 text-secondary-600 dark:bg-secondary-900 dark:text-secondary-300',
      path: '/resume-builder'
    },
    {
      name: 'Interview Simulator',
      description: 'Practice interviews with AI and get feedback',
      icon: 'bi-mic',
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
      path: '/interview-simulator'
    }
  ]
  
  const recentActivities = [
    {
      type: 'interview',
      title: 'Mock Interview - Software Engineer',
      date: '2 hours ago',
      score: 85
    },
    {
      type: 'resume',
      title: 'Resume Optimization - Product Manager',
      date: 'Yesterday',
      matches: 92
    },
    {
      type: 'screen',
      title: 'Screen Share Session',
      date: '3 days ago',
      duration: '45 min'
    }
  ]
  
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}!
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Here's an overview of your career preparation progress.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/screen-share" className="btn btn-primary">
              <i className="bi bi-display mr-2"></i>
              Start Screen Share
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900">
              <i className="bi bi-mic text-primary-600 dark:text-primary-300 text-xl"></i>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Interviews Completed</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-secondary-100 dark:bg-secondary-900">
              <i className="bi bi-file-earmark-text text-secondary-600 dark:text-secondary-300 text-xl"></i>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Resumes Optimized</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <i className="bi bi-clock-history text-green-600 dark:text-green-300 text-xl"></i>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Screen Share Time</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">3.5 hrs</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tools */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link
              key={index}
              to={tool.path}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`p-3 rounded-full ${tool.color} w-12 h-12 flex items-center justify-center`}>
                <i className={`bi ${tool.icon} text-xl`}></i>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                {tool.name}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivities.map((activity, index) => (
              <li key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'interview' 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300' 
                      : activity.type === 'resume'
                        ? 'bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-300'
                        : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'
                  }`}>
                    <i className={`bi ${
                      activity.type === 'interview' 
                        ? 'bi-mic' 
                        : activity.type === 'resume'
                          ? 'bi-file-earmark-text'
                          : 'bi-display'
                    } text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.date}
                    </p>
                  </div>
                  <div>
                    {activity.type === 'interview' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                        Score: {activity.score}%
                      </span>
                    )}
                    {activity.type === 'resume' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200">
                        Match: {activity.matches}%
                      </span>
                    )}
                    {activity.type === 'screen' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {activity.duration}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 text-right">
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 text-sm font-medium">
              View all activity
            </button>
          </div>
        </div>
      </div>
      
      {/* Upgrade Banner */}
      {user?.plan === 'free' && (
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">Upgrade to Pro</h2>
              <p className="mt-1 text-white/80">
                Get unlimited interviews, resume optimizations, and screen sharing.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="btn bg-white text-primary-600 hover:bg-gray-100">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
