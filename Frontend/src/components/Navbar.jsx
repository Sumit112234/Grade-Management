import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Check if the current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle scroll event to change navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Links for the navbar
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Academic Analysis', path: '/analysis' },
    { title: 'Attendance', path: '/attendance' },
    { title: 'Career Paths', path: '/career-paths' },
    { title: 'Resources', path: '/resources' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and title */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">SC</span>
            </motion.div>
            <span className={`font-bold text-xl ${scrolled ? 'text-indigo-700' : 'text-indigo-800'}`}>
              StudyCare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-indigo-700'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {link.title}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* User menu and profile */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/notifications" className="text-gray-600 hover:text-indigo-600 relative">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Link>
            
            <div className="flex items-center">
              <Link to="/profile" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">
                  JS
                </div>
                <span className="text-sm font-medium text-gray-700">John Smith</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden bg-white shadow-lg ${isOpen ? 'block' : 'hidden'}`}
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          <div className="pt-4 pb-2 border-t border-gray-200">
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Your Profile
            </Link>
            <Link
              to="/notifications"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Notifications (3)
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;