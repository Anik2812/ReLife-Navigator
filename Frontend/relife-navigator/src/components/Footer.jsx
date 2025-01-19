import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <a href="#privacy-policy" className="hover:underline mx-2">Privacy Policy</a>
          <a href="#contact-us" className="hover:underline mx-2">Contact Us</a>
        </div>
        <div className="social-icons flex justify-center space-x-4">
          <a href="#facebook" className="hover:text-blue-500"><FaFacebook size={24} /></a>
          <a href="#twitter" className="hover:text-blue-400"><FaTwitter size={24} /></a>
          <a href="#instagram" className="hover:text-pink-500"><FaInstagram size={24} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;