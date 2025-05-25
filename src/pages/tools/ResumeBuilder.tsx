import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ResumeBuilder: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [matchScore, setMatchScore] = useState(0)
  
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      // Check file type
      if (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
        toast.error('Please upload a PDF or DOCX file')
        return
      }
      
      setResumeFile(file)
      toast.success('Resume uploaded successfully')
    }
  }
  
  const handleAnalyzeResume = () => {
    if (!resumeFile) {
      toast.error('Please upload your resume')
      return
    }
    
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description')
      return
    }
    
    setIsAnalyzing(true)
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
      setMatchScore(Math.floor(Math.random() * 30) + 60) // Random score between 60-90
      toast.success('Resume analysis complete!')
    }, 3000)
  }
  
  const improvementSuggestions = [
    {
      category: 'Keywords',
      description: 'Add more industry-specific keywords',
      suggestions: ['machine learning', 'data analysis', 'Python', 'TensorFlow']
    },
    {
      category: 'Experience',
      description: 'Quantify your achievements',
      suggestions: ['Add metrics to your project outcomes', 'Include percentage improvements']
    },
    {
      category: 'Skills',
      description: 'Add missing technical skills',
      suggestions: ['Cloud platforms (AWS/Azure)', 'CI/CD pipelines', 'Docker']
    }
  ]
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Resume Optimizer
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          Upload your resume and job descriptions to get AI-powered optimization suggestions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Upload and input */}
        <div className="space-y-6">
          {/* Resume upload */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Upload Your Resume
            </h2>
            
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              {resumeFile ? (
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <i className="bi bi-file-earmark-text text-primary-500 text-3xl"></i>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {resumeFile.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {(resumeFile.size / 1024).toFixed(2)} KB
                  </p>
                  <button
                    onClick={() => setResumeFile(null)}
                    className="mt-4 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500"
                  >
                    Replace file
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <i className="bi bi-cloud-arrow-up text-gray-400 text-3xl"></i>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Drag and drop your resume here
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    or click to browse (PDF or DOCX)
                  </p>
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleResumeUpload}
                  />
                  <button
                    onClick={() => document.getElementById('resume-upload')?.click()}
                    className="mt-4 btn btn-outline text-sm"
                  >
                    Browse files
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Job description */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Job Description
            </h2>
            
            <div>
              <label htmlFor="job-description" className="sr-only">
                Job Description
              </label>
              <textarea
                id="job-description"
                rows={8}
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              ></textarea>
            </div>
            
            <div className="mt-4">
              <button
                onClick={handleAnalyzeResume}
                disabled={isAnalyzing || !resumeFile || !jobDescription.trim()}
                className="btn btn-primary w-full flex justify-center items-center"
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  'Analyze Resume'
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Right column - Results */}
        <div className="space-y-6">
          {analysisComplete ? (
            <>
              {/* Match score */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Resume Match Score
                </h2>
                
                <div className="flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200 dark:text-gray-700"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className={`${
                          matchScore >= 80 
                            ? 'text-green-500' 
                            : matchScore >= 70 
                              ? 'text-yellow-500' 
                              : 'text-red-500'
                        }`}
                        strokeWidth="10"
                        strokeDasharray={`${2 * Math.PI * 45 * matchScore / 100} ${2 * Math.PI * 45 * (1 - matchScore / 100)}`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">{matchScore}%</span>
                    </div>
                  </div>
                </div>
                
                <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                  {matchScore >= 80 
                    ? 'Great match! Your resume is well-aligned with this job.' 
                    : matchScore >= 70 
                      ? 'Good match. Some improvements could help your application.' 
                      : 'Your resume needs optimization for this job.'}
                </p>
              </div>
              
              {/* Improvement suggestions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Improvement Suggestions
                  </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {improvementSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-6">
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full ${
                          suggestion.category === 'Keywords' 
                            ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300' 
                            : suggestion.category === 'Experience'
                              ? 'bg-secondary-100 text-secondary-600 dark:bg-secondary-900 dark:text-secondary-300'
                              : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                        } mr-4`}>
                          <i className={`bi ${
                            suggestion.category === 'Keywords' 
                              ? 'bi-tags' 
                              : suggestion.category === 'Experience'
                                ? 'bi-briefcase'
                                : 'bi-tools'
                          }`}></i>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {suggestion.category}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            {suggestion.description}
                          </p>
                          <ul className="mt-2 space-y-1">
                            {suggestion.suggestions.map((item, i) => (
                              <li key={i} className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <i className="bi bi-plus-circle text-primary-500 mr-1"></i>
                                {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Optimized resume */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Optimized Resume
                  </h2>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      <i className="bi bi-download"></i>
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      <i className="bi bi-printer"></i>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Our AI has generated an optimized version of your resume tailored for this job description. 
                    Review the changes and download the updated file.
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">John Doe</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">johndoe@example.com</span>
                    </div>
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                      <p className="font-medium text-gray-900 dark:text-white">Professional Summary</p>
                      <p>
                        <span className="bg-green-100 dark:bg-green-900 px-1">Experienced software engineer</span> with 5+ years of expertise in 
                        <span className="bg-green-100 dark:bg-green-900 px-1">full-stack development</span>, 
                        <span className="bg-green-100 dark:bg-green-900 px-1">machine learning</span>, and 
                        <span className="bg-green-100 dark:bg-green-900 px-1">cloud infrastructure</span>. 
                        Proven track record of delivering high-quality solutions that drive business growth.
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white mt-2">Experience</p>
                      <p>
                        <span className="font-medium">Senior Developer, XYZ Company</span><br />
                        Led development of <span className="bg-green-100 dark:bg-green-900 px-1">machine learning models</span> that 
                        <span className="bg-green-100 dark:bg-green-900 px-1">improved prediction accuracy by 35%</span>. 
                        Architected and implemented <span className="bg-green-100 dark:bg-green-900 px-1">cloud-based solutions</span> using 
                        <span className="bg-green-100 dark:bg-green-900 px-1">AWS</span> and 
                        <span className="bg-green-100 dark:bg-green-900 px-1">Docker</span>.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button className="btn btn-primary">
                      <i className="bi bi-download mr-2"></i>
                      Download Optimized Resume
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full flex flex-col items-center justify-center text-center">
              <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                <i className="bi bi-file-earmark-text text-gray-500 dark:text-gray-400 text-3xl"></i>
              </div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Resume Analysis
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-md">
                Upload your resume and paste a job description to get AI-powered optimization suggestions and an improved version of your resume.
              </p>
              <div className="mt-6 space-y-4 w-full max-w-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-300 font-medium">1</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Upload your resume</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF or DOCX format</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-300 font-medium">2</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Paste job description</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">From the job you're applying to</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-300 font-medium">3</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Get optimization suggestions</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">AI-powered resume improvements</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
