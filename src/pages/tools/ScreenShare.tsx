import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import AIOverlay from '../../components/overlay/AIOverlay'

const ScreenShare: React.FC = () => {
  const [isSharing, setIsSharing] = useState(false)
  const [stealthMode, setStealthMode] = useState(true)
  const [showOverlay, setShowOverlay] = useState(true)
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null)
  const [recordAudio, setRecordAudio] = useState(true)
  const [overlayPosition, setOverlayPosition] = useState('corner')
  const [showAIOverlay, setShowAIOverlay] = useState(false)
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+A to toggle AI overlay
      if (e.altKey && e.key === 'a') {
        setShowAIOverlay(prev => !prev)
      }
      
      // Alt+S to toggle stealth mode
      if (e.altKey && e.key === 's') {
        setStealthMode(prev => !prev)
        toast.info(`Stealth mode ${stealthMode ? 'disabled' : 'enabled'}`)
      }
      
      // Alt+P to pause/resume sharing
      if (e.altKey && e.key === 'p' && isSharing) {
        toast.info('Sharing paused/resumed')
      }
      
      // Alt+X to stop sharing
      if (e.altKey && e.key === 'x' && isSharing) {
        handleStopSharing()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSharing, stealthMode])
  
  const handleStartSharing = () => {
    // In a real app, this would use the browser's screen capture API
    // and handle permissions appropriately
    
    if (!selectedScreen) {
      toast.error('Please select a screen to share')
      return
    }
    
    toast.info('Starting screen share with stealth AI overlay...')
    setIsSharing(true)
    
    // Simulate screen sharing
    setTimeout(() => {
      toast.success('Screen sharing active! Press Alt+A to toggle AI overlay')
      setShowAIOverlay(true)
    }, 1500)
  }
  
  const handleStopSharing = () => {
    setIsSharing(false)
    setShowAIOverlay(false)
    toast.info('Screen sharing stopped')
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Stealth Screen Share
          </h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-300">
            Share your screen with AI assistance that's completely invisible to viewers and recording software.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          {isSharing ? (
            <button 
              onClick={handleStopSharing}
              className="btn btn-danger"
            >
              <i className="bi bi-stop-fill mr-2"></i>
              Stop Sharing
            </button>
          ) : (
            <button 
              onClick={handleStartSharing}
              className="btn btn-primary"
            >
              <i className="bi bi-display mr-2"></i>
              Start Sharing
            </button>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Settings */}
        <div className="md:col-span-1 space-y-6">
          <div className="node">
            <div className="node-header">
              <h2 className="node-title">
                <i className="bi bi-gear mr-2"></i>Settings
              </h2>
            </div>
            
            <div className="node-content">
              {/* Screen selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Select what to share
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="entire-screen"
                      name="screen-type"
                      type="radio"
                      checked={selectedScreen === 'entire-screen'}
                      onChange={() => setSelectedScreen('entire-screen')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-dark-300"
                    />
                    <label htmlFor="entire-screen" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                      Entire screen
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="application-window"
                      name="screen-type"
                      type="radio"
                      checked={selectedScreen === 'application-window'}
                      onChange={() => setSelectedScreen('application-window')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-dark-300"
                    />
                    <label htmlFor="application-window" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                      Application window
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="browser-tab"
                      name="screen-type"
                      type="radio"
                      checked={selectedScreen === 'browser-tab'}
                      onChange={() => setSelectedScreen('browser-tab')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-dark-300"
                    />
                    <label htmlFor="browser-tab" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                      Browser tab
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Stealth mode */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Stealth mode</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Make AI overlay invisible to screen capture</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStealthMode(!stealthMode)}
                  className={`toggle ${stealthMode ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-dark-300'}`}
                >
                  <span className="sr-only">Toggle stealth mode</span>
                  <span
                    className={`toggle-dot ${stealthMode ? 'translate-x-5' : 'translate-x-0'}`}
                  ></span>
                </button>
              </div>
              
              {/* Audio recording */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Record audio</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Capture system and microphone audio</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRecordAudio(!recordAudio)}
                  className={`toggle ${recordAudio ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-dark-300'}`}
                >
                  <span className="sr-only">Toggle audio recording</span>
                  <span
                    className={`toggle-dot ${recordAudio ? 'translate-x-5' : 'translate-x-0'}`}
                  ></span>
                </button>
              </div>
              
              {/* AI overlay */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">AI overlay</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Show AI assistant during sharing</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOverlay(!showOverlay)}
                  className={`toggle ${showOverlay ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-dark-300'}`}
                >
                  <span className="sr-only">Toggle AI overlay</span>
                  <span
                    className={`toggle-dot ${showOverlay ? 'translate-x-5' : 'translate-x-0'}`}
                  ></span>
                </button>
              </div>
              
              {/* Overlay position */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Overlay position
                </label>
                <select
                  value={overlayPosition}
                  onChange={(e) => setOverlayPosition(e.target.value)}
                  className="input"
                >
                  <option value="corner">Top-right corner</option>
                  <option value="side">Right side</option>
                  <option value="floating">Floating (draggable)</option>
                  <option value="bottom">Bottom of screen</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="node">
            <div className="node-header">
              <h2 className="node-title">
                <i className="bi bi-keyboard mr-2"></i>Keyboard Shortcuts
              </h2>
            </div>
            
            <div className="node-content">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300">Toggle AI overlay</span>
                  <span className="px-2 py-1 bg-neutral-100 dark:bg-dark-300 rounded text-sm font-mono">Alt + A</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300">Toggle stealth mode</span>
                  <span className="px-2 py-1 bg-neutral-100 dark:bg-dark-300 rounded text-sm font-mono">Alt + S</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300">Pause/resume sharing</span>
                  <span className="px-2 py-1 bg-neutral-100 dark:bg-dark-300 rounded text-sm font-mono">Alt + P</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300">Stop sharing</span>
                  <span className="px-2 py-1 bg-neutral-100 dark:bg-dark-300 rounded text-sm font-mono">Alt + X</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700 dark:text-neutral-300">Adjust overlay opacity</span>
                  <span className="px-2 py-1 bg-neutral-100 dark:bg-dark-300 rounded text-sm font-mono">Alt + O</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Preview and history */}
        <div className="md:col-span-2 space-y-6">
          {/* Preview */}
          <div className="node">
            <div className="node-header">
              <h2 className="node-title">
                <i className="bi bi-display-fill mr-2"></i>
                {isSharing ? 'Live Preview' : 'Preview'}
              </h2>
              
              {isSharing && (
                <span className="badge badge-success">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Live
                </span>
              )}
            </div>
            
            <div className="p-4">
              <div className="aspect-video bg-neutral-100 dark:bg-dark-300 rounded-lg flex items-center justify-center relative">
                {isSharing ? (
                  <div className="text-center">
                    <div className="inline-block p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mb-4">
                      <i className="bi bi-display text-3xl"></i>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">Screen sharing active</p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                      {selectedScreen === 'entire-screen' 
                        ? 'Sharing your entire screen' 
                        : selectedScreen === 'application-window'
                          ? 'Sharing an application window'
                          : 'Sharing a browser tab'}
                    </p>
                    <div className="mt-4 flex justify-center space-x-2">
                      <span className="badge badge-success">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        Live
                      </span>
                      {recordAudio && (
                        <span className="badge badge-danger">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                          Recording Audio
                        </span>
                      )}
                      {stealthMode && (
                        <span className="badge badge-primary">
                          <i className="bi bi-shield-check mr-1"></i>
                          Stealth Mode
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="inline-block p-3 rounded-full bg-neutral-200 text-neutral-500 dark:bg-dark-200 dark:text-neutral-400 mb-4">
                      <i className="bi bi-display text-3xl"></i>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">No active screen share</p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                      Select what to share and click "Start Sharing"
                    </p>
                  </div>
                )}
                
                {/* Stealth mode indicator */}
                {stealthMode && isSharing && (
                  <div className="absolute top-2 right-2 bg-primary-600/90 text-white text-xs px-2 py-1 rounded-md flex items-center">
                    <i className="bi bi-eye-slash mr-1"></i>
                    <span>Stealth Mode Active</span>
                  </div>
                )}
              </div>
              
              {/* Stealth mode explanation */}
              {stealthMode && (
                <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900 rounded-lg">
                  <div className="flex items-start">
                    <i className="bi bi-shield-lock text-primary-600 dark:text-primary-400 text-lg mt-0.5 mr-2"></i>
                    <div>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        <span className="font-medium">Stealth Mode Active:</span> The AI overlay is completely invisible to screen recording software and external viewers. Only you can see and interact with it.
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        This works by rendering the overlay in a special layer that's excluded from screen capture APIs.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Recent sessions */}
          <div className="node">
            <div className="node-header">
              <h2 className="node-title">
                <i className="bi bi-clock-history mr-2"></i>
                Recent Sessions
              </h2>
            </div>
            
            <div className="divide-y divide-neutral-200 dark:divide-dark-300">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      Interview with Acme Corp
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Yesterday at 2:30 PM • 45 minutes
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
                      <i className="bi bi-play-circle"></i>
                    </button>
                    <button className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
                      <i className="bi bi-download"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      Technical Discussion with Team
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      3 days ago • 1 hour 15 minutes
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
                      <i className="bi bi-play-circle"></i>
                    </button>
                    <button className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
                      <i className="bi bi-download"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      Product Demo for Client
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Last week • 30 minutes
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
                      <i className="bi bi-play-circle"></i>
                    </button>
                    <button className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
                      <i className="bi bi-download"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* How stealth mode works */}
          <div className="node">
            <div className="node-header">
              <h2 className="node-title">
                <i className="bi bi-shield-lock mr-2"></i>
                How Stealth Mode Works
              </h2>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  Our stealth technology ensures that the AI assistant overlay is completely invisible to:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <i className="bi bi-camera-video"></i>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Screen Recording Software</h3>
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        Zoom, Teams, OBS, and other recording tools cannot capture the overlay
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <i className="bi bi-people"></i>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Meeting Participants</h3>
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        Other people in your meetings will never see the AI assistant
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <i className="bi bi-broadcast"></i>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Streaming Platforms</h3>
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        Twitch, YouTube, and other streaming services cannot detect the overlay
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <i className="bi bi-eye-slash"></i>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Screen Sharing</h3>
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        When you share your screen, the overlay remains private to you
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-neutral-100 dark:bg-dark-300 rounded-lg text-xs text-neutral-700 dark:text-neutral-300">
                  <p className="font-medium">Technical details:</p>
                  <p className="mt-1">
                    Our stealth technology uses a combination of custom rendering layers and browser API modifications to create a visual overlay that's only visible to the local user. This is achieved by intercepting the browser's compositing process and selectively filtering elements from screen capture APIs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Overlay */}
      {showAIOverlay && (
        <AIOverlay 
          onClose={() => setShowAIOverlay(false)} 
          stealthMode={stealthMode}
          setStealthMode={setStealthMode}
        />
      )}
    </div>
  )
}

export default ScreenShare
