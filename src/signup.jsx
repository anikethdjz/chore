import React, { useState } from 'react';
import { User, Mail, Phone, Lock, BookOpen } from 'lucide-react';

/**
 * Props:
 * - defaultType: 'client' | 'solver' (optional)
 * - onSignup(formData) : called when the user submits signup
 * - onSwitchToLogin() : called when the user wants to go to login
 * - onBackToHome() : optional - back to landing
 */
export default function Signup({ defaultType = 'client', onSignup, onSwitchToLogin, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    type: defaultType
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      alert('Please fill all fields');
      return;
    }
    // Create user object
    const user = {
      id: `user-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      type: form.type
    };
    onSignup(user);
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setForm({ ...form, type: 'client' })}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${ form.type === 'client' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            👨‍💼 Client
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, type: 'solver' })}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${ form.type === 'solver' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            🔧 Solver
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
      </form>
    </>
  );
}
