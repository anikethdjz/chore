import React, { useState } from 'react';
import { Mail, Lock, BookOpen } from 'lucide-react';

/**
 * Props:
 * - userType: current selected type ('client' | 'solver' | null)
 * - setUserType(type) : set the selected user type
 * - onLogin({ email, password, userType }) : called when the user submits login
 * - onSwitchToSignup() : called when user wants to go to signup
 * - onBackToHome() : optional - back to landing
 */
export default function Login({ userType, setUserType, onLogin, onSwitchToSignup, onClose }) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userType) {
      alert('Please select client or solver');
      return;
    }
    // Simulate login (in real app, call backend)
    const user = {
      id: `user-${Date.now()}`,
      name: loginForm.email.split('@')[0],
      email: loginForm.email,
      type: userType
    };
    onLogin(user);
  };

  return (
    <>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setUserType('client')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${ userType === 'client' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          👨‍💼 Client
        </button>
        <button
          onClick={() => setUserType('solver')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${ userType === 'solver' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          🔧 Solver
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
    </>
  );
}
