import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">ReLife Navigator</div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/quiz" className="hover:text-blue-400 transition-colors">Quiz</Link>
          <Link to="/recovery-hub" className="hover:text-blue-400 transition-colors">Recovery Hub</Link>
          <Link to="/community" className="hover:text-blue-400 transition-colors">Community</Link>
          <Link to="/disaster-relief-map" className="hover:text-blue-400 transition-colors">Disaster Relief Map</Link>
          <button onClick={toggleDarkMode} className="ml-4">
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <div className="relative">
            <button onClick={toggleProfileMenu} className="hover:text-blue-400 transition-colors flex items-center">
              <FaUserCircle size={24} />
              {user && <span className="ml-2">{user.name}</span>}
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg py-2">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
                <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-700 w-full text-left">Logout</button>
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
          <Link to="/quiz" className="block px-4 py-2 hover:bg-gray-700">Quiz</Link>
          <Link to="/recovery-hub" className="block px-4 py-2 hover:bg-gray-700">Recovery Hub</Link>
          <Link to="/community" className="block px-4 py-2 hover:bg-gray-700">Community</Link>
          <Link to="/disaster-relief-map" className="block px-4 py-2 hover:bg-gray-700">Disaster Relief Map</Link>
          <button onClick={toggleDarkMode} className="block px-4 py-2 hover:bg-gray-700">
            {isDarkMode ? '🌙' : '☀️'}
          </button>
          <div className="relative">
            <button onClick={toggleProfileMenu} className="block px-4 py-2 hover:bg-gray-700">Profile</button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg py-2">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
                <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-700 w-full text-left">Logout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;