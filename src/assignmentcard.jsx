// AssignmentCard.jsx
import React from 'react';
import { Star } from 'lucide-react';

/**
 * Props
 * - assignment: { id, title, description, subject, deadline, preferredSolver, postedBy, applicants }
 * - userType: 'client' | 'solver' | null
 * - onApply: (assignmentId) => void
 * - onSelect: (applicant) => void   // used when showing applicants in owner's view
 * - compact: boolean (optional) — use compact layout for lists
 * - showApplicants: boolean (optional) — whether to render applicants section (for owners)
 * - isApplied: boolean (optional) — mark as already applied (for solver)
 */
export default function AssignmentCard({
  assignment,
  userType = null,
  onApply = () => {},
  onSelect = () => {},
  compact = false,
  showApplicants = false,
  isApplied = false
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 ${ compact ? 'p-4' : 'p-8'}`}>
      <div className="flex justify-between items-start">
        <div className="pr-4 flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 truncate">{assignment.title}</h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">{assignment.description}</p>

          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 flex-wrap">
            <span className="flex items-center gap-1">📚 {assignment.subject || 'General'}</span>
            <span className="flex items-center gap-1">📅 {assignment.deadline || 'No deadline'}</span>
            {assignment.preferredSolver && <span className="flex items-center gap-1">👤 {assignment.preferredSolver}</span>}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="text-xs text-gray-500">Posted by <span className="font-medium text-gray-700">{assignment.postedBy || 'anonymous'}</span></div>

          {userType === 'solver' ? (
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => onApply(assignment.id)}
                className={`px-5 py-2 rounded-lg font-medium transition-all text-sm ${isApplied ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg'}`}
                disabled={isApplied}
              >
                {isApplied ? '✓ Applied' : 'Apply (₹1)'}
              </button>
              <div className="text-xs text-gray-500">{assignment.applicants?.length || 0} applicants</div>
            </div>
          ) : (
            <div className="text-xs text-gray-500"><span className="font-medium text-gray-700">{assignment.applicants?.length || 0}</span> applicants</div>
          )}
        </div>
      </div>

      {showApplicants && assignment.applicants && assignment.applicants.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-bold text-gray-900 mb-4">Applicants ({assignment.applicants.length})</p>
          <div className="space-y-3">
            {assignment.applicants.map((app) => (
              <div key={app.id} className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-gray-100">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{app.name}</p>
                  <p className="text-xs text-gray-600 truncate">{app.skills}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span>{app.rating} rating</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelect(app)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all whitespace-nowrap ml-3"
                >
                  Select & Contact
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
