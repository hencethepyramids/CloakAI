import React, { useState } from 'react'
import { toast } from 'react-toastify'

interface Question {
  id: number
  text: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface Answer {
  questionId: number
  audioUrl?: string
  transcription?: string
  feedback?: {
    clarity: number
    relevance: number
    confidence: number
    overall: number
    strengths: string[]
    improvements: string[]
  }
}

const InterviewSimulator: React.FC = () => {
  const [jobRole, setJobRole] = useState('')
  const [experience, setExperience] = useState('mid')
  const [interviewType, setInterviewType] = useState('behavioral')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isInterviewActive, setIsInterviewActive] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  
  // Mock questions for different interview types
  const mockQuestions = {
    behavioral: [
      { id: 1, text: 'Tell me about a time when you had to overcome a significant challenge at work.', category: 'Problem Solving', difficulty: 'medium' as const },
      { id: 2, text: 'Describe a situation where you had to work with a difficult team member.', category: 'Teamwork', difficulty: 'medium' as const },
      { id: 3, text: 'Give an example of a goal you set and how you achieved it.', category: 'Achievement', difficulty: 'easy' as const },
      { id: 4, text: 'Tell me about a time when you had to make a difficult decision with limited information.', category: 'Decision Making', difficulty: 'hard' as const },
      { id: 5, text: 'Describe a situation where you had to adapt to a significant change at work.', category: 'Adaptability', difficulty: 'medium' as const }
    ],
    technical: [
      { id: 1, text: 'Explain the difference between REST and GraphQL APIs.', category: 'Web Development', difficulty: 'medium' as const },
      { id: 2, text: 'How would you optimize a slow-performing database query?', category: 'Databases', difficulty: 'hard' as const },
      { id: 3, text: 'Explain the concept of dependency injection and its benefits.', category: 'Software Design', difficulty: 'medium' as const },
      { id: 4, text: 'What is the difference between synchronous and asynchronous programming?', category: 'Programming Concepts', difficulty: 'easy' as const },
      { id: 5, text: 'Describe how you would design a scalable microservice architecture.', category: 'System Design', difficulty: 'hard' as const }
    ],
    case: [
      { id: 1, text: 'How would you launch a new product in a competitive market?', category: 'Product Strategy', difficulty: 'hard' as const },
      { id: 2, text: 'A key client is threatening to leave. How would you handle this situation?', category: 'Client Management', difficulty: 'medium' as const },
      { id: 3, text: 'Your team is consistently missing deadlines. How would you address this?', category: 'Project Management', difficulty: 'medium' as const },
      { id: 4, text: 'How would you prioritize features for a new software release with limited resources?', category: 'Resource Allocation', difficulty: 'hard' as const },
      { id: 5, text: 'Describe how you would analyze and improve a declining product.', category: 'Business Analysis', difficulty: 'medium' as const }
    ]
  }
  
  const handleGenerateInterview = () => {
    if (!jobRole.trim()) {
      toast.error('Please enter a job role')
      return
    }
    
    setIsGenerating(true)
    
    // Simulate API call to generate questions
    setTimeout(() => {
      // Select questions based on interview type
      const selectedQuestions = mockQuestions[interviewType as keyof typeof mockQuestions] || mockQuestions.behavioral
      
      setQuestions(selectedQuestions)
      setAnswers(selectedQuestions.map(q => ({ questionId: q.id })))
      setIsGenerating(false)
      setIsInterviewActive(true)
      setCurrentQuestionIndex(0)
      
      toast.success('Interview questions generated!')
    }, 2000)
  }
  
  const handleStartRecording = () => {
    // In a real app, this would use the browser's audio recording API
    setIsRecording(true)
    toast.info('Recording started...')
    
    // Simulate recording for 10 seconds
    setTimeout(() => {
      handleStopRecording()
    }, 10000)
  }
  
  const handleStopRecording = () => {
    setIsRecording(false)
    toast.success('Recording saved')
    
    // Simulate processing the recording
    setTimeout(() => {
      const updatedAnswers = [...answers]
      updatedAnswers[currentQuestionIndex] = {
        ...updatedAnswers[currentQuestionIndex],
        transcription: 'This is a simulated transcription of your answer. In a real application, this would be the actual transcription of your recorded response to the question.',
        feedback: {
          clarity: Math.floor(Math.random() * 30) + 70,
          relevance: Math.floor(Math.random() * 30) + 70,
          confidence: Math.floor(Math.random() * 30) + 70,
          overall: Math.floor(Math.random() * 30) + 70,
          strengths: [
            'Good structure in your response',
            'Provided specific examples',
            'Clear communication style'
          ],
          improvements: [
            'Could provide more quantifiable results',
            'Consider using the STAR method more explicitly',
            'Add more context about your specific role'
          ]
        }
      }
      
      setAnswers(updatedAnswers)
    }, 2000)
  }
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      toast.success('Interview completed!')
    }
  }
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }
  
  const handleFinishInterview = () => {
    toast.success('Interview session saved!')
    setIsInterviewActive(false)
  }
  
  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswer = answers[currentQuestionIndex]
  
  return (
    <div className="space-y-8">
      {!isInterviewActive ? (
        <>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Interview Simulator
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Practice interviews with AI and get detailed feedback on your responses.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Configure Your Interview
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="job-role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Role
                </label>
                <input
                  type="text"
                  id="job-role"
                  placeholder="e.g., Software Engineer, Product Manager"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Experience Level
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setExperience('entry')}
                    className={`py-2 px-4 rounded-md text-sm font-medium ${
                      experience === 'entry'
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Entry Level
                  </button>
                  <button
                    type="button"
                    onClick={() => setExperience('mid')}
                    className={`py-2 px-4 rounded-md text-sm font-medium ${
                      experience === 'mid'
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Mid Level
                  </button>
                  <button
                    type="button"
                    onClick={() => setExperience('senior')}
                    className={`py-2 px-4 rounded-md text-sm font-medium ${
                      experience === 'senior'
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Senior Level
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Interview Type
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setInterviewType('behavioral')}
                    className={`py-2 px-4 rounded-md text-sm font-medium ${
                      interviewType === 'behavioral'
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Behavioral
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterviewType('technical')}
                    className={`py-2 px-4 rounded-md text-sm font-medium ${
                      interviewType === 'technical'
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Technical
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterviewType('case')}
                    className={`py-2 px-4 rounded-md text-sm font-medium ${
                      interviewType === 'case'
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Case Study
                  </button>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={handleGenerateInterview}
                  disabled={isGenerating}
                  className="btn btn-primary w-full flex justify-center items-center"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Interview...
                    </>
                  ) : (
                    'Start Interview'
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Interview Tips
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <i className="bi bi-check text-primary-600 dark:text-primary-300 text-sm"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Use the STAR method</span> - Situation, Task, Action, Result - to structure your answers to behavioral questions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <i className="bi bi-check text-primary-600 dark:text-primary-300 text-sm"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Speak clearly and at a moderate pace</span> - This helps the AI transcribe your answers accurately.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <i className="bi bi-check text-primary-600 dark:text-primary-300 text-sm"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Provide specific examples</span> - Quantify your achievements when possible.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <i className="bi bi-check text-primary-600 dark:text-primary-300 text-sm"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Review your feedback</span> - Pay attention to the AI's suggestions to improve your responses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {interviewType === 'behavioral' 
                  ? 'Behavioral Interview' 
                  : interviewType === 'technical'
                    ? 'Technical Interview'
                    : 'Case Study Interview'}
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {jobRole} • {experience === 'entry' ? 'Entry Level' : experience === 'mid' ? 'Mid Level' : 'Senior Level'}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={handleFinishInterview}
                className="btn btn-outline"
              >
                Finish Interview
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - Questions */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Questions
                  </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
                  {questions.map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-full text-left p-4 ${
                        index === currentQuestionIndex 
                          ? 'bg-primary-50 dark:bg-primary-900/20' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          answers[index]?.feedback 
                            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {answers[index]?.feedback ? (
                            <i className="bi bi-check"></i>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {question.text.length > 50 ? question.text.substring(0, 50) + '...' : question.text}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              question.difficulty === 'easy' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : question.difficulty === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {question.difficulty}
                            </span>
                            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                              {question.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column - Current question and answer */}
            <div className="md:col-span-2 space-y-6">
              {/* Current question */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      className={`p-1 rounded ${
                        currentQuestionIndex === 0 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex === questions.length - 1}
                      className={`p-1 rounded ${
                        currentQuestionIndex === questions.length - 1 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-900 dark:text-white">
                    {currentQuestion?.text}
                  </p>
                  <div className="flex items-center mt-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      currentQuestion?.difficulty === 'easy' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : currentQuestion?.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {currentQuestion?.difficulty}
                    </span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      {currentQuestion?.category}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  {isRecording ? (
                    <button
                      onClick={handleStopRecording}
                      className="btn bg-red-600 hover:bg-red-700 text-white w-full flex justify-center items-center"
                    >
                      <i className="bi bi-stop-fill mr-2"></i>
                      Stop Recording
                    </button>
                  ) : (
                    <button
                      onClick={handleStartRecording}
                      className="btn btn-primary w-full flex justify-center items-center"
                    >
                      <i className="bi bi-mic-fill mr-2"></i>
                      Record Answer
                    </button>
                  )}
                </div>
              </div>
              
              {/* Answer and feedback */}
              {currentAnswer?.transcription && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b dark:border-gray-700">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Your Answer
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {currentAnswer.transcription}
                      </p>
                    </div>
                    
                    {currentAnswer.feedback && (
                      <div className="mt-6">
                        <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                          Feedback
                        </h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {currentAnswer.feedback.overall}%
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Overall
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {currentAnswer.feedback.clarity}%
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Clarity
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {currentAnswer.feedback.relevance}%
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Relevance
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {currentAnswer.feedback.confidence}%
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Confidence
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                              <i className="bi bi-check-circle-fill text-green-500 mr-2"></i>
                              Strengths
                            </h4>
                            <ul className="space-y-2">
                              {currentAnswer.feedback.strengths.map((strength, index) => (
                                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                                  <i className="bi bi-check text-green-500 mt-1 mr-2"></i>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                              <i className="bi bi-arrow-up-circle-fill text-primary-500 mr-2"></i>
                              Areas for Improvement
                            </h4>
                            <ul className="space-y-2">
                              {currentAnswer.feedback.improvements.map((improvement, index) => (
                                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                                  <i className="bi bi-arrow-up text-primary-500 mt-1 mr-2"></i>
                                  {improvement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default InterviewSimulator
