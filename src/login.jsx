import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

/**
 * Props:
 * - onLogin(user) : called when the user submits login (receives full user object)
 * - onClose(): optional
 *
 * NOTE: For demo this component logs users in as 'solver' by default.
 * Login now accepts optional profile fields: stream and sem (semester 1..8).
 * If provided, they are included in the returned user object so the app can persist them.
 */
export default function Login({ onLogin, onClose }) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [stream, setStream] = useState(''); // optional
  const [sem, setSem] = useState(''); // optional: '1'..'8'

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: create a user and treat them as solver by default.
    const user = {
      id: `user-${Date.now()}`,
      name: (loginForm.email && loginForm.email.split('@')[0]) || 'User',
      email: loginForm.email,
      type: 'solver', // default role
      isClientUpgradeAvailable: true,
      stream: stream || undefined,
      sem: sem ? Number(sem) : undefined,
    };
    if (typeof onLogin === 'function') onLogin(user);
  };

  return (
    <>
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

          {/* Optional profile completion fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stream (optional)</label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="">Choose stream</option>
                <option value="cse">CSE</option>
                <option value="ece">ECE</option>
                <option value="eee">EEE</option>
                <option value="civil">CIVIL</option>
                <option value="mech">MECH</option>
                <option value="other">OTHER</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester (optional)</label>
              <select
                value={sem}
                onChange={(e) => setSem(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="">Choose sem</option>
                <option value="1">Sem 1</option>
                <option value="2">Sem 2</option>
                <option value="3">Sem 3</option>
                <option value="4">Sem 4</option>
                <option value="5">Sem 5</option>
                <option value="6">Sem 6</option>
                <option value="7">Sem 7</option>
                <option value="8">Sem 8</option>
              </select>
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

      <div className="mt-4 text-sm text-gray-600 text-center">
        By default you will be logged in as a <strong>solver</strong>. You can optionally fill stream & sem now to complete your profile.
      </div>
    </>
  );
}
