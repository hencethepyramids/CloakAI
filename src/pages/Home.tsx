import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white leading-tight">
                Your All-in-One <span className="text-primary-600 dark:text-primary-400">AI Assistant</span> for Career Success
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
                Combining interview preparation, resume optimization, and real-time AI assistance in one powerful platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="btn btn-primary text-center px-8 py-3 text-lg">
                  Get Started Free
                </Link>
                <a href="#features" className="btn btn-outline text-center px-8 py-3 text-lg dark:border-gray-700 dark:text-white">
                  Learn More
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                  alt="AI Assistant Dashboard" 
                  className="w-full h-auto"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 to-secondary-600/30 mix-blend-multiply"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-float">
                <div className="flex items-center space-x-2">
                  <i className="bi bi-mic-fill text-primary-500 text-xl"></i>
                  <span className="font-medium">Interview in progress...</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <i className="bi bi-file-earmark-text text-secondary-500 text-xl"></i>
                  <span className="font-medium">Resume optimized!</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
              All the tools you need to succeed
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Our platform combines three powerful AI tools to help you excel in your career journey.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div data-aos="fade-up" className="card p-6 h-full flex flex-col">
              <div className="h-12 w-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                <i className="bi bi-display text-primary-600 dark:text-primary-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Screen Share with AI Overlay
              </h3>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                Share your screen during interviews or meetings with our hidden AI assistant overlay providing real-time guidance only you can see.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Hidden from screen recordings</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Toggle with keyboard shortcuts</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Real-time AI suggestions</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div data-aos="fade-up" data-aos-delay="100" className="card p-6 h-full flex flex-col">
              <div className="h-12 w-12 rounded-lg bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center mb-4">
                <i className="bi bi-file-earmark-text text-secondary-600 dark:text-secondary-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Resume Optimization
              </h3>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                Upload your resume and job descriptions to get AI-powered suggestions to make your application stand out to recruiters and ATS systems.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">ATS optimization</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Job description matching</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Keyword optimization</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div data-aos="fade-up" data-aos-delay="200" className="card p-6 h-full flex flex-col">
              <div className="h-12 w-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                <i className="bi bi-mic text-primary-600 dark:text-primary-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Interview Simulation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                Practice with our AI interviewer that adapts to your industry, role, and experience level, providing detailed feedback to improve.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Role-specific questions</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Detailed performance feedback</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Audio recording & transcription</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Our platform is designed to be intuitive and powerful, helping you at every step of your career journey.
            </p>
          </div>
          
          <div className="mt-16 relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            
            {/* Steps */}
            <div className="space-y-12 md:space-y-0">
              {/* Step 1 */}
              <div data-aos="fade-right" className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="md:text-right">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Create Your Profile
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Sign up and upload your resume to get started. Our AI will analyze your experience and skills to personalize your experience.
                    </p>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 flex md:justify-start justify-center">
                  <div className="relative">
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900 z-10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                      alt="Create profile" 
                      className="w-64 h-64 object-cover rounded-xl shadow-lg"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div data-aos="fade-left" className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="md:order-last">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Optimize Your Resume
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Upload job descriptions and let our AI help you tailor your resume to highlight the most relevant skills and experiences.
                    </p>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 flex md:justify-end justify-center">
                  <div className="relative">
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900 z-10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                      alt="Resume optimization" 
                      className="w-64 h-64 object-cover rounded-xl shadow-lg"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div data-aos="fade-right" className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="md:text-right">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Practice Interviews
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Engage with our AI interviewer to practice answering common and role-specific questions, receiving feedback to improve.
                    </p>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 flex md:justify-start justify-center">
                  <div className="relative">
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900 z-10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                      alt="Interview practice" 
                      className="w-64 h-64 object-cover rounded-xl shadow-lg"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div data-aos="fade-left" className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="md:order-last">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Get Real-Time Assistance
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Use our screen sharing tool with AI overlay during actual interviews or meetings to receive real-time guidance and support.
                    </p>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 flex md:justify-end justify-center">
                  <div className="relative">
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900 z-10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                      alt="Real-time assistance" 
                      className="w-64 h-64 object-cover rounded-xl shadow-lg"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Choose the plan that works best for your needs.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div data-aos="fade-up" className="card p-6 flex flex-col border-t-4 border-gray-300 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Free
              </h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$0</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 flex-grow">
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Basic resume analysis</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">5 practice interview questions</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Limited AI chat assistance</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-x-circle-fill text-red-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">No screen sharing</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-x-circle-fill text-red-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">No audio recording</span>
                </li>
              </ul>
              <Link to="/register" className="mt-8 btn btn-outline w-full text-center">
                Get Started
              </Link>
            </div>
            
            {/* Pro Plan */}
            <div data-aos="fade-up" data-aos-delay="100" className="card p-6 flex flex-col border-t-4 border-primary-500 shadow-xl scale-105 z-10">
              <div className="absolute -top-5 left-0 right-0 flex justify-center">
                <span className="bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Pro
              </h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$19</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 flex-grow">
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Advanced resume optimization</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Unlimited practice interviews</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Full AI chat assistance</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Screen sharing with AI overlay</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Audio recording & transcription</span>
                </li>
              </ul>
              <Link to="/register" className="mt-8 btn btn-primary w-full text-center">
                Get Started
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div data-aos="fade-up" data-aos-delay="200" className="card p-6 flex flex-col border-t-4 border-secondary-500">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Enterprise
              </h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$49</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 flex-grow">
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Priority support</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Custom interview scenarios</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Team collaboration features</span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Advanced analytics</span>
                </li>
              </ul>
              <Link to="/register" className="mt-8 btn btn-secondary w-full text-center">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Ready to transform your career journey?
          </h2>
          <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto">
            Join thousands of professionals who are using our platform to prepare for interviews, optimize their resumes, and get real-time AI assistance.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Get Started Free
            </Link>
            <Link to="/login" className="btn border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
              Log In
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
