import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Navigate Life’s Challenges with Confidence</h1>
        <p className="text-xl md:text-2xl mb-8">ReLife Navigator empowers users with tailored action plans, emotional support, and disaster relief resources.</p>
        <button className="cta-button bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">Get Started</button>
      </div>
    </section>
  );
};

export default HeroSection;