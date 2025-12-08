import React, { useState } from 'react';
import { BookOpen, Users, Zap, ArrowRight, X, Upload, Mail, Phone, User, Lock, FileText, Calendar, DollarSign, Search, Star, Award } from 'lucide-react';

export default function AssignmentMarketplace({ initialView = 'landing' }) {
  const [currentView, setCurrentView] = useState(initialView); // landing, login, signup, dashboard, postAssignment, browseAssignments
  const [userType, setUserType] = useState(null); // 'client' or 'solver'
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  // Sample data
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Data Structures Assignment",
      description: "Need help with binary trees and graph algorithms",
      subject: "Computer Science",
      deadline: "2024-12-15",
      preferredSolver: "CS student, 3rd year+",
      postedBy: "student123",
      applicants: [
        { id: 1, name: "Rahul Kumar", rating: 4.8, skills: "DSA, C++, Python", resume: "3rd year CS student with 2 years coding experience" },
        { id: 2, name: "Priya Sharma", rating: 4.9, skills: "Algorithms, Java", resume: "4th year CS, Gold medalist" }
      ]
    },
    {
      id: 2,
      title: "Calculus Problem Set",
      description: "Integration and differentiation problems",
      subject: "Mathematics",
      deadline: "2024-12-12",
      preferredSolver: "Math major",
      postedBy: "mathstudent",
      applicants: []
    }
  ]);

  const [userAssignments, setUserAssignments] = useState([]);
  const [appliedAssignments, setAppliedAssignments] = useState([]);

  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', phone: '', type: 'client' });
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    description: '',
    subject: '',
    deadline: '',
    preferredSolver: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login - do nothing, just show signup instead
    setCurrentView('signup');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate signup
    setUser({ name: signupForm.name, email: signupForm.email, phone: signupForm.phone, type: signupForm.type });
    setUserType(signupForm.type);
    setCurrentView('dashboard');
  };

  const handlePostAssignment = (e) => {
    e.preventDefault();
    const newAssignment = {
      id: assignments.length + 1,
      ...assignmentForm,
      postedBy: user.email,
      applicants: []
    };
    setAssignments([newAssignment, ...assignments]);
    setUserAssignments([newAssignment, ...userAssignments]);
    setModalContent({
      type: 'success',
      title: 'Assignment Posted!',
      message: 'Your assignment has been posted successfully. Payment of ₹5 processed.'
    });
    setShowModal(true);
    setAssignmentForm({ title: '', description: '', subject: '', deadline: '', preferredSolver: '' });
  };

  const handleApplyToAssignment = (assignmentId) => {
    setModalContent({
      type: 'confirm',
      title: 'Apply to Assignment',
      message: 'Pay ₹1 to apply for this assignment. Your profile will be shared with the client.',
      onConfirm: () => {
        setAppliedAssignments([...appliedAssignments, assignmentId]);
        setModalContent({
          type: 'success',
          title: 'Application Submitted!',
          message: 'Your application has been submitted. Payment of ₹1 processed.'
        });
      }
    });
    setShowModal(true);
  };

  const handleSelectSolver = (applicant) => {
    setModalContent({
      type: 'contact',
      title: 'Solver Contact Details',
      applicant: applicant,
      message: 'You can now contact this solver directly to discuss the work.'
    });
    setShowModal(true);
  };

  // Landing Page
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TaskConnect
                </span>
              </div>
              <button 
                onClick={() => { setCurrentView('signup'); }}
                className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
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
            <button 
              onClick={() => { setCurrentView('signup'); }}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

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
        </div>
      </div>
    );
  }

  // Login Page
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Login as {userType === 'client' ? 'Client' : 'Solver'}</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setUserType('client')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                userType === 'client' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Client
            </button>
            <button
              onClick={() => setUserType('solver')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                userType === 'solver' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Solver
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Login
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => setCurrentView('signup')} className="text-blue-600 font-medium hover:underline">
              Sign up
            </button>
          </p>
          <p className="text-center mt-2 text-sm text-gray-500">
            (Login is disabled - please sign up instead)
          </p>

          <button
            onClick={() => setCurrentView('landing')}
            className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Signup Page
  if (currentView === 'signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">Join TaskConnect today</p>
          </div>

          <form onSubmit={handleSignup}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSignupForm({...signupForm, type: 'client'})}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      signupForm.type === 'client' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignupForm({...signupForm, type: 'solver'})}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      signupForm.type === 'solver' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Solver
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={signupForm.phone}
                    onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <button onClick={() => {}} className="text-gray-400 font-medium cursor-not-allowed" disabled>
              Login (Disabled)
            </button>
          </p>

          <button
            onClick={() => setCurrentView('landing')}
            className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Dashboard
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TaskConnect
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Hello, {user.name}</span>
                <button
                  onClick={() => { setUser(null); setCurrentView('landing'); }}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Assignments</p>
                  <p className="text-3xl font-bold text-gray-900">{assignments.length}</p>
                </div>
                <FileText className="w-12 h-12 text-blue-600" />
              </div>
            </div>

            {user.type === 'client' ? (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">My Posts</p>
                    <p className="text-3xl font-bold text-gray-900">{userAssignments.length}</p>
                  </div>
                  <BookOpen className="w-12 h-12 text-purple-600" />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Applications</p>
                    <p className="text-3xl font-bold text-gray-900">{appliedAssignments.length}</p>
                  </div>
                  <Users className="w-12 h-12 text-purple-600" />
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Rating</p>
                  <p className="text-3xl font-bold text-gray-900">4.8</p>
                </div>
                <Star className="w-12 h-12 text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            {user.type === 'client' && (
              <button
                onClick={() => setCurrentView('postAssignment')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Post Assignment
              </button>
            )}
            <button
              onClick={() => setCurrentView('browseAssignments')}
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg hover:shadow-lg transition-all flex items-center gap-2 border border-gray-200"
            >
              <Search className="w-5 h-5" />
              Browse Assignments
            </button>
          </div>

          {user.type === 'client' && userAssignments.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Posted Assignments</h3>
              <div className="space-y-4">
                {userAssignments.map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{assignment.title}</h4>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {assignment.applicants.length} Applicants
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{assignment.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📚 {assignment.subject}</span>
                      <span>📅 {assignment.deadline}</span>
                    </div>
                    {assignment.applicants.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="font-medium text-gray-900 mb-2">Applicants:</p>
                        <div className="space-y-2">
                          {assignment.applicants.map((applicant) => (
                            <div key={applicant.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">{applicant.name}</p>
                                <p className="text-sm text-gray-600">{applicant.skills}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  <span className="text-sm text-gray-600">{applicant.rating}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleSelectSolver(applicant)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                              >
                                Select & Get Contact
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{modalContent.title}</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {modalContent.type === 'contact' ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">{modalContent.applicant.name}</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">📧 Email: solver@example.com</p>
                      <p className="text-gray-600">📞 Phone: +91 98765 43210</p>
                      <p className="text-gray-600">💼 Skills: {modalContent.applicant.skills}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-gray-600">Rating: {modalContent.applicant.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{modalContent.message}</p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Got it!
                  </button>
                </div>
              ) : modalContent.type === 'confirm' ? (
                <div className="space-y-4">
                  <p className="text-gray-600">{modalContent.message}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        modalContent.onConfirm();
                        setShowModal(false);
                      }}
                      className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Confirm Payment
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-gray-600 text-center">{modalContent.message}</p>
                  <button
                    onClick={() => { setShowModal(false); setCurrentView('dashboard'); }}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}