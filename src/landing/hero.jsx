import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero({ onGetStarted = () => {}, onViewAssignments = () => {} }) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
      <div>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
          Connect. Collaborate.
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Accomplish Together.
          </span>
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          The marketplace where students post assignments and talented solvers compete to help. Simple,
          affordable, and efficient.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={onGetStarted}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onViewAssignments}
            className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 hover:shadow"
          >
            Browse Assignments
          </button>
        </div>
      </div>
    </main>
  );
}
