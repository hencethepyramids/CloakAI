import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { toast } from 'react-toastify'

const Settings: React.FC = () => {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    updates: true,
    tips: false
  })
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API
    toast.success('Profile updated successfully')
  }
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    
    // In a real app, this would call an API
    toast.success('Password updated successfully')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    })
  }
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Settings
      </h1>
      
      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Profile Settings
          </h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleProfileUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 input"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 input"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="plan" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Plan
                </label>
                <div className="mt-1 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                    {user?.plan === 'free' ? 'Free Plan' : user?.plan === 'pro' ? 'Pro Plan' : 'Enterprise Plan'}
                  </span>
                  {user?.plan !== 'enterprise' && (
                    <button type="button" className="ml-4 text-primary-600 dark:text-primary-400 text-sm font-medium">
                      Upgrade
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Password Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Password
          </h2>
        </div>
        <div className="p-6">
          <form onSubmit={handlePasswordUpdate}>
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 input"
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 input"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm new password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 input"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button type="submit" className="btn btn-primary">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Notifications
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
              </div>
              <button
                type="button"
                onClick={() => handleNotificationChange('email')}
                className={`${
                  notifications.email ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
              >
                <span className="sr-only">Toggle email notifications</span>
                <span
                  className={`${
                    notifications.email ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                >
                  <span
                    className={`${
                      notifications.email ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'
                    } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                  >
                    <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                      <path
                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className={`${
                      notifications.email ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'
                    } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                  >
                    <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Browser notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications in your browser</p>
              </div>
              <button
                type="button"
                onClick={() => handleNotificationChange('browser')}
                className={`${
                  notifications.browser ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
              >
                <span className="sr-only">Toggle browser notifications</span>
                <span
                  className={`${
                    notifications.browser ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                >
                  <span
                    className={`${
                      notifications.browser ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'
                    } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                  >
                    <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                      <path
                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className={`${
                      notifications.browser ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'
                    } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                  >
                    <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Product updates</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about new features</p>
              </div>
              <button
                type="button"
                onClick={() => handleNotificationChange('updates')}
                className={`${
                  notifications.updates ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
              >
                <span className="sr-only">Toggle product updates</span>
                <span
                  className={`${
                    notifications.updates ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                >
                  <span
                    className={`${
                      notifications.updates ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'
                    } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                  >
                    <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                      <path
                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className={`${
                      notifications.updates ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'
                    } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                  >
                    <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Tips and tutorials</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive tips on using the platform</p>
              </div>
              <button
                type="button"
                onClick={() => handleNotificationChange('tips')}
                className={`${
                  notifications.tips ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
              >
                <span className="sr-only">Toggle tips and tutorials</span>
                <span
                  className={`${
                    notifications.tips ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                >
                  <span
                    className={`${
                      notifications.tips ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'
                    } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                  >
                    <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                      <path
                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className={`${
                      notifications.tips ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'
                    } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                  >
                    <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <button type="button" className="btn btn-primary">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
      
      {/* Appearance Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Appearance
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Dark mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark mode</p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className={`${
                theme === 'dark' ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                className={`${
                  theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              >
                <span
                  className={`${
                    theme === 'dark' ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'
                  } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                >
                  <i className="bi bi-sun-fill text-yellow-500 text-xs"></i>
                </span>
                <span
                  className={`${
                    theme === 'dark' ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'
                  } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                >
                  <i className="bi bi-moon-fill text-primary-600 text-xs"></i>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Danger Zone */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-red-200 dark:border-red-900">
        <div className="px-6 py-4 border-b border-red-200 dark:border-red-900">
          <h2 className="text-lg font-medium text-red-600 dark:text-red-400">
            Danger Zone
          </h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Delete account</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Permanently delete your account and all of your data
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button type="button" className="btn bg-red-600 hover:bg-red-700 text-white">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
