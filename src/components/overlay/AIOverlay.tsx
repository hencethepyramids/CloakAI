import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AIOverlayProps {
  onClose: () => void
  stealthMode?: boolean
  setStealthMode?: (mode: boolean) => void
}

const AIOverlay: React.FC<AIOverlayProps> = ({ 
  onClose, 
  stealthMode = false,
  setStealthMode = () => {}
}) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    { role: 'assistant', content: 'Hi there! I\'m your stealth AI assistant. I\'m completely invisible to screen recording software. How can I help you today?' }
  ])
  const [opacity, setOpacity] = useState(1)
  
  const overlayRef = useRef<HTMLDivElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory])
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+S to toggle stealth mode
      if (e.altKey && e.key === 's') {
        setStealthMode(!stealthMode)
      }
      
      // Alt+O to adjust opacity
      if (e.altKey && e.key === 'o') {
        setOpacity(prev => (prev === 1 ? 0.7 : prev === 0.7 ? 0.4 : 1))
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [stealthMode, setStealthMode])
  
  const handleDragStart = () => {
    setIsDragging(true)
  }
  
  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false)
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y
    })
  }
  
  const handleSendMessage = () => {
    if (!message.trim()) return
    
    // Add user message to chat
    setChatHistory([...chatHistory, { role: 'user', content: message }])
    
    // In a real app, you would send this to your AI backend
    // For now, we'll simulate a response
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: `I received your message: "${message}". Remember, I'm completely invisible to screen recording software and external viewers. This is a simulated response.` 
        }
      ])
    }, 1000)
    
    setMessage('')
  }
  
  return (
    <motion.div
      ref={overlayRef}
      className={`fixed z-50 ${stealthMode ? 'stealth-mode visible' : ''}`}
      style={{ 
        width: 380, 
        height: 500,
        x: position.x, 
        y: position.y,
        opacity: opacity,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: opacity, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {/* Header */}
      <div className="bg-primary-600 dark:bg-primary-700 text-white p-3 cursor-move flex justify-between items-center rounded-t-xl">
        <div className="flex items-center">
          <i className="bi bi-incognito text-xl mr-2"></i>
          <h3 className="font-medium">Stealth AI Assistant</h3>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setStealthMode(!stealthMode)}
            className="p-1 hover:bg-primary-700 dark:hover:bg-primary-800 rounded"
            title={stealthMode ? "Stealth Mode Active" : "Enable Stealth Mode"}
          >
            <i className={`bi ${stealthMode ? 'bi-eye-slash-fill' : 'bi-eye-slash'}`}></i>
          </button>
          <button 
            onClick={() => setOpacity(prev => (prev === 1 ? 0.7 : prev === 0.7 ? 0.4 : 1))}
            className="p-1 hover:bg-primary-700 dark:hover:bg-primary-800 rounded"
            title="Adjust Opacity"
          >
            <i className="bi bi-layers"></i>
          </button>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-primary-700 dark:hover:bg-primary-800 rounded"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
      
      {/* Chat area */}
      <div className="bg-white dark:bg-dark-400 h-[calc(100%-110px)] overflow-y-auto p-4">
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}
          >
            <div 
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                msg.role === 'user' 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-neutral-800 dark:text-neutral-100 rounded-tr-none' 
                  : 'bg-neutral-100 dark:bg-dark-300 text-neutral-800 dark:text-neutral-100 rounded-tl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      
      {/* Input area */}
      <div className="bg-white dark:bg-dark-400 p-3 border-t dark:border-dark-300 rounded-b-xl">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-md dark:bg-dark-300 dark:border-dark-200 dark:text-neutral-100"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-primary-600 dark:bg-primary-700 text-white p-2 rounded-md hover:bg-primary-700 dark:hover:bg-primary-800"
          >
            <i className="bi bi-send"></i>
          </button>
        </div>
        
        {/* Stealth mode indicator */}
        <div className="mt-2 flex justify-between items-center text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center">
            {stealthMode ? (
              <>
                <i className="bi bi-shield-check text-green-500 mr-1"></i>
                <span>Stealth mode active</span>
              </>
            ) : (
              <>
                <i className="bi bi-shield text-yellow-500 mr-1"></i>
                <span>Visible to screen capture</span>
              </>
            )}
          </div>
          <div>
            <span>Alt+S: Toggle stealth • Alt+O: Opacity</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AIOverlay
