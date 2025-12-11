import React from "react";
import Header from "./landing/header";
import Hero from "./landing/hero";
import FeaturesGrid from "./landing/featuregrid";
import CTA from "./landing/CTA";
import Footer from "./landing/footer";

/**
 * LandingPage
 * - Keep this as the single canonical landing page
 * - Props:
 *    onGetStarted: fn
 *    onViewAssignments: fn
 *    onLogin: fn
 *    onSignUp: fn
 */
export default function LandingPage({
  onGetStarted = () => {},
  onViewAssignments = () => {},
  onLogin = () => {},
  onSignUp = () => {},
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onLogin={onLogin} onSignUp={onSignUp} />
      <Hero onGetStarted={onGetStarted} onViewAssignments={onViewAssignments} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturesGrid />
        <CTA onGetStarted={onGetStarted} />
      </div>
      <Footer />
    </div>
  );
}
