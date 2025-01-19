import React from 'react';

const CallToActionSection = () => {
  return (
    <section className="cta-section bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Join Our Community Today</h2>
        <p className="text-xl mb-8">Become a part of our supportive community and start your journey towards recovery and resilience.</p>
        <button className="cta-button bg-white text-blue-500 py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">Sign Up Now</button>
      </div>
    </section>
  );
};

export default CallToActionSection;