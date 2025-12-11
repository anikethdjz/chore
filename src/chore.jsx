// chore.jsx
import React, { useEffect, useState, useMemo } from 'react';
import AssignmentCard from './assignmentcard';
import Login from './login';
import Signup from './signup';
import LandingPage from './landingpage';

export default function Chore() {
  const [assignments, setAssignments] = useState([]);
  const [userAssignments, setUserAssignments] = useState([]);
  const [appliedAssignments, setAppliedAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // UI modal state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // NEW: filter & sort state
  const [filters, setFilters] = useState({ stream: 'all', sortBy: 'deadline' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.warn('user restore failed', e);
    }
  }, []);

  useEffect(() => {
    loadAllAssignments();
  }, []);

  useEffect(() => {
    if (user && user.type === 'client') loadUserAssignments();
    else setUserAssignments([]);
    if (user && user.type === 'solver') loadAppliedAssignmentsForSolver();
    else setAppliedAssignments([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function loadAllAssignments() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/assignments');
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      setAssignments(data);
    } catch (e) {
      console.warn('Using fallback demo assignments.', e);
      setAssignments([
        {
          id: 'a1',
          title: 'CS Assignment - Linked Lists',
          description: 'Implement singly and doubly linked lists, with tests.',
          subject: 'Data Structures',
          stream: 'cse',
          deadline: '2025-12-20',
          postedAt: '2025-11-28',
          preferredSolver: '3rd year CS',
          postedBy: 'Riya',
          applicants: [],
        },
        {
          id: 'a2',
          title: 'Math Assignment - Integrals',
          description: 'Solve integrals and write LaTeX steps.',
          subject: 'Calculus',
          stream: 'eee',
          deadline: '2025-12-25',
          postedAt: '2025-11-30',
          preferredSolver: 'Any',
          postedBy: 'Arjun',
          applicants: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function loadUserAssignments() {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user.id}/assignments`);
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      setUserAssignments(data);
    } catch (e) {
      console.warn('Fallback: filter local assignments for user.', e);
      setUserAssignments(assignments.filter((a) => a.postedBy === user.name));
    } finally {
      setLoading(false);
    }
  }

  async function loadAppliedAssignmentsForSolver() {
    if (!user) return;
    try {
      const res = await fetch(`/api/users/${user.id}/applications`);
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      setAppliedAssignments(Array.isArray(data) ? data : []);
    } catch (e) {
      console.warn('No applications data; clearing applied list.', e);
      setAppliedAssignments([]);
    }
  }

  async function handleApplyToAssignment(assignmentId) {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (user.type !== 'solver') {
      alert('Only solvers can apply.');
      return;
    }
    if (appliedAssignments.includes(assignmentId)) return;

    setAppliedAssignments((p) => [...p, assignmentId]);

    try {
      const res = await fetch(`/api/assignments/${assignmentId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!res.ok) {
        setAppliedAssignments((p) => p.filter((id) => id !== assignmentId));
        throw new Error('apply failed');
      }
      setAssignments((prev) =>
        prev.map((a) => {
          if (a.id === assignmentId) {
            const newApplicants = a.applicants ? [...a.applicants] : [];
            if (!newApplicants.find((ap) => ap.id === user.id)) {
              newApplicants.push({ id: user.id, name: user.name, skills: '', rating: 0 });
            }
            return { ...a, applicants: newApplicants };
          }
          return a;
        })
      );
      alert('Applied successfully.');
    } catch (e) {
      console.error(e);
      alert('Apply failed.');
    }
  }

  async function handleSelectSolver(applicant, assignmentId) {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (user.type !== 'client') {
      alert('Only clients can select a solver.');
      return;
    }

    const ok = window.confirm(`Select ${applicant.name} for this assignment?`);
    if (!ok) return;

    try {
      const res = await fetch(`/api/assignments/${assignmentId}/select`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedApplicantId: applicant.id, clientId: user.id }),
      });
      if (!res.ok) throw new Error('select failed');
      alert(`Selected ${applicant.name}.`);
      setUserAssignments((prev) => prev.map((ass) => (ass.id === assignmentId ? { ...ass, assignedTo: applicant } : ass)));
    } catch (e) {
      console.error(e);
      alert('Selection failed.');
    }
  }

  // Called by Login/Signup components when auth succeeds
  function handleAuthSuccess(u) {
    if (!u) return;
    const normalized = {
      ...u,
      // default to solver if missing
      type: u.type || 'solver',
      isClientUpgradeAvailable: u.type !== 'client',
      // preserve stream & sem from u if provided
      stream: u.stream || u.stream === '' ? u.stream : undefined,
      sem: u.sem || u.sem === 0 ? u.sem : undefined,
    };
    setUser(normalized);
    try {
      localStorage.setItem('user', JSON.stringify(normalized));
    } catch (e) {
      console.warn('localStorage set failed', e);
    }
    setShowLoginModal(false);
    setShowSignupModal(false);
  }

  function handleLogout() {
    try {
      localStorage.removeItem('user');
    } catch (e) {
      console.warn('localStorage remove failed', e);
    }
    setUser(null);
  }

  // ---- Posting / upgrade flow ----
  async function upgradeUserToClient() {
    if (!user) return;
    try {
      await new Promise((res) => setTimeout(res, 600));
      const updated = { ...user, type: 'client', isClientUpgradeAvailable: false };
      setUser(updated);
      try {
        localStorage.setItem('user', JSON.stringify(updated));
      } catch (e) {
        console.warn('localStorage set failed', e);
      }
      setShowUpgradeModal(false);
      setShowPostModal(true);
      alert('Account upgraded to client. You can now post assignments.');
    } catch (e) {
      console.error(e);
      alert('Upgrade failed. Try again.');
    }
  }

  function handleRequestPost() {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (user.type === 'client') {
      setShowPostModal(true);
      return;
    }
    if (user.isClientUpgradeAvailable) {
      setShowUpgradeModal(true);
    } else {
      alert('Posting not available for your account.');
    }
  }

  // Post new assignment via a small inline form modal
  function PostAssignmentModal({ onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [deadline, setDeadline] = useState('');
    const [stream, setStream] = useState('');

    async function submit() {
      if (!title.trim()) return alert('Title required');
      const newAssignment = {
        id: `a-${Date.now()}`,
        title,
        description,
        subject: subject || 'General',
        stream: stream || 'all',
        deadline,
        postedAt: new Date().toISOString().slice(0, 10),
        preferredSolver: '',
        postedBy: user?.name || 'anonymous',
        postedByUserId: user?.id,
        applicants: [],
      };

      setAssignments((p) => [newAssignment, ...p]);
      setUserAssignments((p) => [newAssignment, ...p]);
      onClose();

      try {
        const res = await fetch('/api/assignments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAssignment),
        });
        if (!res.ok) throw new Error('post failed');
      } catch (e) {
        console.warn('Assignment post to server failed; local only.', e);
      }
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Post New Assignment</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="e.g., Data Structures Assignment"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Describe the assignment..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="e.g., Computer Science"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stream (optional)</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="e.g., cse, eee, ece"
                value={stream}
                onChange={(e) => setStream(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition" onClick={onClose}>
                Cancel
              </button>
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition" onClick={submit}>
                Post Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function UpgradeToClientModal({ onClose }) {
    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Upgrade to Post Assignments</h3>
            <button className="text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>
              ✕
            </button>
          </div>

          <p className="text-gray-700 mb-6">
            Your account is currently a <strong>solver</strong>. To post assignments you need a client account.
            Upgrading will let you post assignments and review applicants. (This demo simulates the upgrade.)
          </p>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
            <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700" onClick={onClose}>
              Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white" onClick={upgradeUserToClient}>
              Confirm & Upgrade
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderHeader() {
    return (
      <header className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TaskConnect</h1>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{user.type}</div>
                </div>
                <button
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition" onClick={() => setShowLoginModal(true)}>
                  Login
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition" onClick={() => setShowSignupModal(true)}>
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    );
  }

  const streams = useMemo(() => {
    const set = new Set();
    for (const a of assignments) {
      if (a.stream) set.add(a.stream);
    }
    return ['all', ...Array.from(set)];
  }, [assignments]);

  const visible = useMemo(() => {
    const filtered = assignments.filter((a) => {
      if (!a) return false;
      const streamMatch = filters.stream === 'all' || (a.stream && a.stream === filters.stream);
      return streamMatch;
    });

    const sorted = filtered.slice().sort((x, y) => {
      const parseDate = (d) => {
        if (!d) return 0;
        const t = Date.parse(d);
        return Number.isNaN(t) ? 0 : t;
      };

      if (filters.sortBy === 'deadline') {
        return parseDate(x.deadline) - parseDate(y.deadline);
      }

      if (filters.sortBy === 'posted') {
        return parseDate(y.postedAt) - parseDate(x.postedAt);
      }

      if (filters.sortBy === 'subject') {
        const ax = (x.subject || '').toLowerCase();
        const ay = (y.subject || '').toLowerCase();
        if (ax < ay) return -1;
        if (ax > ay) return 1;
        return 0;
      }

      return 0;
    });

    return sorted;
  }, [assignments, filters]);

  if (!user) {
    return (
      <>
        <LandingPage onGetStarted={() => setShowLoginModal(true)} onViewAssignments={() => setShowSignupModal(true)} />

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Login</h3>
                <button className="text-gray-400 hover:text-gray-600 text-2xl" onClick={() => setShowLoginModal(false)}>
                  ✕
                </button>
              </div>
              <Login onLogin={handleAuthSuccess} onClose={() => setShowLoginModal(false)} />
              <div className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  className="text-blue-600 font-medium hover:underline"
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowSignupModal(true);
                  }}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Signup Modal */}
        {showSignupModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Sign up</h3>
                <button className="text-gray-400 hover:text-gray-600 text-2xl" onClick={() => setShowSignupModal(false)}>
                  ✕
                </button> 
              </div>
              <Signup onSignup={handleAuthSuccess} onClose={() => setShowSignupModal(false)} />
              <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  className="text-blue-600 font-medium hover:underline"
                  onClick={() => {
                    setShowSignupModal(false);
                    setShowLoginModal(true);
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {renderHeader()}

        {error && <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">{error}</div>}

        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Browse Assignments</h2>
              <p className="text-gray-600">Find and solve assignments from students</p>
            </div>

            <div className="flex items-center gap-3">
              {(user && user.type === 'client') || (user && user.isClientUpgradeAvailable) ? (
                <button
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                  onClick={handleRequestPost}
                >
                  + Post Assignment
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 mr-2">Stream</label>
              <select
                value={filters.stream}
                onChange={(e) => setFilters((p) => ({ ...p, stream: e.target.value }))}
                className="px-3 py-2 border border-gray-200 rounded-lg bg-white"
              >
                {streams.map((s) => (
                  <option key={s} value={s}>
                    {s === 'all' ? 'All streams' : s.toUpperCase()}
                  </option>
                ))}
              </select>

              <label className="text-sm text-gray-600 ml-4 mr-2">Sort by</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((p) => ({ ...p, sortBy: e.target.value }))}
                className="px-3 py-2 border border-gray-200 rounded-lg bg-white"
              >
                <option value="deadline">Deadline (earliest)</option>
                <option value="posted">Posted (newest)</option>
                <option value="subject">Subject (A → Z)</option>
              </select>

              <button
                className="ml-4 px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm"
                onClick={() => setFilters({ stream: 'all', sortBy: 'deadline' })}
                title="Clear filters"
              >
                Clear
              </button>
            </div>

            <div className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-900">{visible.length}</span> of <span className="font-medium text-gray-900">{assignments.length}</span> assignments
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12"><div className="text-gray-600 font-medium">Loading assignments...</div></div>
          ) : visible.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm"><div className="text-gray-600">No assignments match the selected filters.</div></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((a) => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                  userType={user ? user.type : null}
                  onApply={(id) => handleApplyToAssignment(id)}
                  compact={false}
                  isApplied={appliedAssignments.includes(a.id)}
                />
              ))}
            </div>
          )}
        </section>

        {user && user.type === 'client' && (
          <section className="mt-12">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Your Posted Assignments</h2>
              <p className="text-gray-600">Manage and review submissions</p>
            </div>

            {userAssignments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm"><div className="text-gray-600">You haven't posted any assignments yet.</div></div>
            ) : (
              <div className="space-y-4">
                {userAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    userType={user.type}
                    showApplicants={true}
                    onSelect={(applicant) => handleSelectSolver(applicant, assignment.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {showPostModal && user && user.type === 'client' && <PostAssignmentModal onClose={() => setShowPostModal(false)} />}

      {showUpgradeModal && <UpgradeToClientModal onClose={() => setShowUpgradeModal(false)} />}
    </div>
  );
}
