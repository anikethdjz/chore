import React from 'react';
import { BookOpen, Users, Zap, Shield, Star, ArrowRight } from 'lucide-react';

export default function LandingPage({ onGetStarted = () => {} }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* debug element removed */}
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskConnect
              </span>
            </div>
            <button className="px-6 py-2 bg-transparent text-blue-600 hover:text-blue-700 font-medium rounded-lg transition-colors border border-blue-600 hover:border-blue-700">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Connect. Collaborate.
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Accomplish Together.
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            The marketplace where students post assignments and talented solvers compete to help. 
            Simple, affordable, and efficient.
          </p>
          <button onClick={onGetStarted} className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Post Assignments</h3>
            <p className="text-gray-600">
              Students pay just ₹5 to post their assignments and receive applications from qualified solvers.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Apply to Help</h3>
            <p className="text-gray-600">
              Solvers pay ₹1 per application to showcase their skills and compete for opportunities.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Connect Directly</h3>
            <p className="text-gray-600">
              Choose the best solver and get their contact details to discuss work and payment privately.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 mt-20 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">₹5</div>
              <div className="text-blue-100">Per Assignment Post</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₹1</div>
              <div className="text-blue-100">Per Application</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Transparent Process</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 mb-16 text-lg">Simple, fast, and efficient</p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Post Assignment</h4>
                <p className="text-gray-600 text-sm">Students share their assignment details and requirements</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Solvers Apply</h4>
                <p className="text-gray-600 text-sm">Qualified individuals apply with their resumes and skills</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Review & Select</h4>
                <p className="text-gray-600 text-sm">Choose the best solver based on profiles and experience</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  4
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Collaborate</h4>
                <p className="text-gray-600 text-sm">Connect directly and complete the work together</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-gray-900 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8 text-lg">Join thousands of students connecting and collaborating</p>
          <button onClick={onGetStarted} className="group px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
            Create Your Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 TaskConnect. Connecting students and solvers seamlessly.</p>
        </div>
      </footer>
    </div>
  );
}