import React from "react";
import { BookOpen, Users, Zap } from "lucide-react";

export default function FeaturesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-8 mt-8">
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

      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 mt-12 text-white">
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

      {/* How it works */}
      <div className="mt-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-gray-600 mb-8 text-lg">Simple, fast, and efficient</p>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { n: 1, title: "Post Assignment", desc: "Students share their assignment details and requirements", color: "bg-blue-600" },
            { n: 2, title: "Solvers Apply", desc: "Qualified individuals apply with their resumes and skills", color: "bg-purple-600" },
            { n: 3, title: "Review & Select", desc: "Choose the best solver based on profiles and experience", color: "bg-green-600" },
            { n: 4, title: "Collaborate", desc: "Connect directly and complete the work together", color: "bg-orange-600" },
          ].map((step) => (
            <div key={step.n} className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className={`${step.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4`}>
                  {step.n}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
