import React, { useState } from 'react';
import { User, Mail, Phone, Lock } from 'lucide-react';

/**
 * Props:
 * - onSignup(user) : called when the user submits signup (receives user object)
 * - onClose(): optional
 *
 * Behavior:
 * - No explicit role switch. Default account type is 'solver'.
 * - A checkbox "Enable posting (become client)" allows creating a client at signup.
 * - Added fields: stream (select) and sem (select 1..8)
 */
export default function Signup({ onSignup, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  // If checked, user will be created as client (can post immediately)
  const [enablePosting, setEnablePosting] = useState(false);

  // profile fields
  const [stream, setStream] = useState('');
  const [sem, setSem] = useState(''); // string '1'..'8'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      alert('Please fill all required fields');
      return;
    }
    const user = {
      id: `user-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      type: enablePosting ? 'client' : 'solver',
      isClientUpgradeAvailable: enablePosting ? false : true,
      stream: stream || undefined,
      sem: sem ? Number(sem) : undefined,
    };
    if (typeof onSignup === 'function') onSignup(user);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
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

        {/* New profile fields: stream + sem */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stream</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
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

        <div className="flex items-center gap-3">
          <input
            id="enablePosting"
            type="checkbox"
            checked={enablePosting}
            onChange={(e) => setEnablePosting(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="enablePosting" className="text-sm text-gray-700">
            Enable posting (become client)
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          Create Account
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-600 text-center">
        By default you will be a <strong>solver</strong>. You can enable posting if you want to create assignments now.
      </div>
    </>
  );
}
