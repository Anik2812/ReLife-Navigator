import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CallToActionSection from './components/CallToActionSection';
import ContactFormSection from './components/ContactFormSection';
import Footer from './components/Footer';
import QuizPage from './components/QuizPage';
import PersonalRecoveryHub from './components/PersonalRecoveryHub';
import CommunityPage from './components/CommunityPage';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <FeaturesSection />
              <TestimonialsSection />
              <CallToActionSection />
              <ContactFormSection />
            </>
          } />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/recovery-hub" element={<PersonalRecoveryHub />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;