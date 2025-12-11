import React from "react";
import { ArrowRight } from "lucide-react";

export default function CTA({ onGetStarted = () => {} }) {
  return (
    <section className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
      <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-blue-100 mb-8 text-lg">Join thousands of students connecting and collaborating</p>
      <button
        onClick={onGetStarted}
        className="group px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
      >
        Create Your Account
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </section>
  );
}
