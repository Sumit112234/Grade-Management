import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useStudent } from '../context/userContext';
import ImageSlider from './ImageSlider';
import ImageSliderDashboard from './ImageSliderDashboard';

const HomePage = () => {
  const { student } = useStudent();
  const navigate = useNavigate();

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const staggerItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  const float = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  // Quick actions for logged-in users
  const quickActions = [
    { 
      title: 'Academic Dashboard', 
      icon: '📚', 
      description: 'Access your personalized learning dashboard',
      path: '/dashboard',
      bgColor: 'from-blue-500 to-indigo-600'
    },
    { 
      title: 'Course Explorer', 
      icon: '🔍', 
      description: 'Discover new courses and learning paths',
      path: '/courses',
      bgColor: 'from-purple-500 to-pink-600'
    },
    { 
      title: 'Career Resources', 
      icon: '🚀', 
      description: 'Explore career opportunities and resources',
      path: '/career-resources',
      bgColor: 'from-green-500 to-teal-600'
    },
    { 
      title: 'Student Support', 
      icon: '🤝', 
      description: 'Get help with academic or personal issues',
      path: '/support',
      bgColor: 'from-orange-500 to-red-600'
    }
  ];

  // Upcoming events for logged-in users
  const upcomingEvents = [
    {
      title: 'Technology Symposium',
      date: 'April 15, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Campus, Building A',
      image: '/api/placeholder/300/200',
      description: 'Join us for a day of technological innovation and networking with industry leaders.'
    },
    {
      title: 'Career Development Workshop',
      date: 'April 20, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'Virtual Event',
      image: '/api/placeholder/300/200',
      description: 'Learn essential skills for job searching, resume building, and interview techniques.'
    },
    {
      title: 'Student Wellness Fair',
      date: 'April 25, 2025',
      time: '11:00 AM - 3:00 PM',
      location: 'Student Center',
      image: '/api/placeholder/300/200',
      description: 'Discover resources for mental, physical, and emotional wellness on campus.'
    }
  ];

  // Features for logged-out users
  const features = [
    {
      title: 'Personalized Learning',
      description: 'Get customized education recommendations based on your interests and goals.',
      icon: '🎯',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Career Guidance',
      description: 'Access career counseling, internship opportunities, and job placement services.',
      icon: '💼',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Skill Development',
      description: 'Track your progress and develop the skills employers are looking for.',
      icon: '📈',
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'Community Engagement',
      description: 'Connect with peers, mentors, and industry professionals.',
      icon: '👥',
      color: 'bg-orange-100 text-orange-800'
    }
  ];

  // Testimonials for logged-out users
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Computer Science Student',
      content: 'This platform has transformed my academic journey. The personalized recommendations helped me discover my passion for AI.',
      avatar: '/api/placeholder/100/100'
    },
    {
      name: 'David Chen',
      role: 'Business Administration Student',
      content: 'The career resources available on this platform helped me secure an internship at my dream company.',
      avatar: '/api/placeholder/100/100'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Electrical Engineering Student',
      content: 'The academic tracking tools have helped me stay organized and focused on my goals.',
      avatar: '/api/placeholder/100/100'
    }
  ];

  

  // If student is logged in, render the student home page
  if (student) {
    return (
      <AnimatePresence>
        <motion.div 
          className="min-h-screen pt-20 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Hero section with welcome message */}
          <motion.section 
            className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-16 relative overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated background elements */}
            <motion.div 
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 2 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white bg-opacity-20"
                  style={{
                    width: Math.random() * 300 + 50,
                    height: Math.random() * 300 + 50,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div className="md:flex md:items-center md:justify-between">
                <div className="md:w-1/2">
                  <motion.h1 
                    className="text-4xl font-bold tracking-tight sm:text-5xl mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Welcome back, {student.name}!
                  </motion.h1>
                  <motion.p 
                    className="mt-3 max-w-md text-xl text-indigo-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Your journey to success continues. Ready to excel today?
                  </motion.p>
                  <motion.div 
                    className="mt-8 flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {/* <Link
                      to="/dashboard"
                      className="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-20 px-6 py-3 text-base font-medium text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-300"
                    >
                      <span className="mr-2">📊</span> My Dashboard
                    </Link> */}
                    <Link
                      to="/academic"
                      className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
                    >
                      <span className="mr-2 text-xl ">🎓</span> View Analyses <span className=' ml-3 font-bold text-xl'>-&gt;</span>
                    </Link>
                  </motion.div>
                </div>
                <motion.div 
                  className="hidden md:block md:w-1/2 pl-10"
                  variants={float}
                  initial="hidden"
                  animate="animate"
                >
                  {/* <motion.img
                    src="/api/placeholder/500/400"
                    alt="Student studying"
                    className="h-72 w-full object-cover rounded-lg shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  /> */}
                  <ImageSliderDashboard/>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Main content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Semester info banner */}
            <motion.div 
              className="mb-10 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-indigo-800">Current Semester: {student.semester}</h2>
                  <p className="text-gray-600 mt-1">Course: {student.course ? 'Loading course info...' : 'Not enrolled in a course'}</p>
                </div>
                <Link
                  to="/enrollment"
                  className="mt-4 md:mt-0 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors inline-flex items-center text-sm font-medium"
                >
                  <span className="mr-2">📝</span> Manage Enrollment
                </Link>
              </div>
            </motion.div>

            {/* Quick actions section */}
            <motion.section
              className="mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 
                className="text-2xl font-bold text-gray-900 mb-6"
                variants={staggerItem}
              >
                Quick Actions
              </motion.h2>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  >
                    <Link 
                      to={action.path}
                      className="block h-full"
                    >
                      <div className={`h-full rounded-xl shadow-md overflow-hidden bg-gradient-to-br ${action.bgColor} text-white hover:shadow-lg transition-all duration-300`}>
                        <div className="p-6">
                          <div className="text-4xl mb-4">{action.icon}</div>
                          <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                          <p className="text-sm opacity-90">{action.description}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Upcoming events with image carousel */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                <Link 
                  to="/events"
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                  View All Events
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden" 
                animate="visible"
              >
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    variants={staggerItem}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <motion.div 
                      className="relative h-40 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <p className="font-bold">{event.date}</p>
                        <p className="text-sm">{event.time}</p>
                      </div>
                    </motion.div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{event.location}</p>
                      <p className="text-gray-500 text-sm">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Important notifications */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Notices</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <motion.div 
                  className="border-l-4 border-red-500 pl-4 py-2 mb-4"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-bold text-red-700">Midterm Exams Schedule</h3>
                  <p className="text-gray-600">Midterm examinations will be held from April 12-16, 2025. Check your course portal for specific times and locations.</p>
                </motion.div>
                <motion.div 
                  className="border-l-4 border-yellow-500 pl-4 py-2 mb-4"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-lg font-bold text-yellow-700">Library Hours Extension</h3>
                  <p className="text-gray-600">The main library will extend its hours to 2:00 AM during the exam period to accommodate student study needs.</p>
                </motion.div>
                <motion.div 
                  className="border-l-4 border-green-500 pl-4 py-2"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-lg font-bold text-green-700">Summer Registration Opens</h3>
                  <p className="text-gray-600">Registration for summer courses will open on April 10, 2025. Early registration is recommended as classes fill quickly.</p>
                </motion.div>
              </div>
            </motion.section>

            {/* Upcoming deadlines */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Deadlines</h2>
                <Link 
                  to="/calendar" 
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                  View Calendar
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            Final Project Submission
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">April 15, 2025</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">CS 401</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Upcoming
                          </span>
                        </td>
                      </motion.tr>
                      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            Midterm Exam
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">April 12, 2025</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">MATH 301</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Urgent
                          </span>
                        </td>
                      </motion.tr>
                      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            Career Fair
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">April 20, 2025</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">University Event</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Registered
                          </span>
                        </td>
                      </motion.tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
  
  // If student is NOT logged in, render the landing page
  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen pt-20 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Hero section for non-logged in users */}
        
        <motion.section 
          className="relative bg-gradient-to-r from-indigo-800 to-blue-600 text-white pt-16 pb-32 overflow-hidden"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 z-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white bg-opacity-10"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: Math.random() * 20 + 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="flex flex-col md:flex-row items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="md:w-1/2 mb-10 md:mb-0">
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Shape Your Future<br />
                  <span className="text-indigo-200">Track Your Success</span>
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  The ultimate student portal designed to help you achieve your academic goals and prepare for your future career.
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link
                    to="/login"
                    className="inline-flex items-center px-8 py-4 rounded-md border border-transparent bg-white text-base font-medium text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-md"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center px-8 py-4 rounded-md border border-transparent bg-indigo-500 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-md"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                className="md:w-1/2 ml-0 md:ml-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <ImageSlider/>
              </motion.div>
            </motion.div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#ffffff" fillOpacity="1" d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,234.7C672,245,768,235,864,208C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </motion.section>

        {/* Features section */}
        <motion.section 
          className="py-24 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                The Ultimate Student Experience
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Everything you need to excel in your academic journey and beyond.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg"
                  variants={staggerItem}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center text-2xl mb-5`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        
        {/* Statistics section */}
        <motion.section 
          className="py-24 bg-gradient-to-r from-indigo-50 to-blue-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Making a Difference
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Join thousands of students achieving their academic and career goals.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                className="bg-white rounded-2xl shadow-md p-8 text-center"
                variants={staggerItem}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                  className="text-5xl font-bold text-indigo-600 mb-2"
                >
                  95%
                </motion.div>
                <p className="text-gray-500">Graduation Rate</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-2xl shadow-md p-8 text-center"
                variants={staggerItem}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                  className="text-5xl font-bold text-indigo-600 mb-2"
                >
                  15k+
                </motion.div>
                <p className="text-gray-500">Active Students</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-2xl shadow-md p-8 text-center"
                variants={staggerItem}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
                  className="text-5xl font-bold text-indigo-600 mb-2"
                >
                  86%
                </motion.div>
                <p className="text-gray-500">Employment Rate</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-2xl shadow-md p-8 text-center"
                variants={staggerItem}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                  className="text-5xl font-bold text-indigo-600 mb-2"
                >
                  200+
                </motion.div>
                <p className="text-gray-500">Available Courses</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        
        {/* Testimonials section */}
        <motion.section 
          className="py-24 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                What Our Students Say
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Hear from those who have already transformed their educational journey.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
                  variants={staggerItem}
                  whileHover={{ y: -10 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="text-gray-600 italic">"{testimonial.content}"</div>
                  <div className="mt-4 text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        
        {/* CTA Section */}
        <motion.section 
          className="py-24 bg-gradient-to-r from-indigo-700 to-purple-700 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <motion.div 
                className="mb-10 md:mb-0 md:w-2/3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-xl text-indigo-100 max-w-lg">
                  Join our community of motivated students and take the first step toward your academic success.
                </p>
              </motion.div>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 rounded-md border border-transparent bg-white text-base font-medium text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-md"
                >
                  Sign Up Now
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center px-8 py-4 rounded-md border border-white text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300"
                >
                  Explore Courses
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

       
        {/* Interactive Features section */}
        <motion.section 
          className="py-24 bg-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="flex flex-col md:flex-row md:items-center md:space-x-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div className="md:w-1/2 mb-12 md:mb-0" variants={slideInRight}>
                <motion.img
                  src="/api/placeholder/600/450"
                  alt="Dashboard preview"
                  className="rounded-2xl shadow-2xl"
                  initial={{ opacity: 0, rotateY: 15 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
              
              <motion.div className="md:w-1/2" variants={staggerContainer} initial="hidden" whileInView="visible">
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 mb-6"
                  variants={staggerItem}
                >
                  Modern Academic Tools
                </motion.h2>
                
                <motion.div variants={staggerItem} className="mb-6">
                  <div className="flex items-start mb-3">
                    <div className="flex-shrink-0 h-6 w-6 text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Interactive Learning Dashboard</h3>
                      <p className="mt-1 text-gray-500">Visualize your progress across all courses with intuitive charts and metrics.</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={staggerItem} className="mb-6">
                  <div className="flex items-start mb-3">
                    <div className="flex-shrink-0 h-6 w-6 text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Smart Course Recommendations</h3>
                      <p className="mt-1 text-gray-500">Receive personalized course suggestions based on your interests and career goals.</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={staggerItem} className="mb-6">
                  <div className="flex items-start mb-3">
                    <div className="flex-shrink-0 h-6 w-6 text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Real-time Event Notifications</h3>
                      <p className="mt-1 text-gray-500">Never miss important deadlines, events or announcements with our smart alert system.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <Link
                    to="/features"
                    className="inline-flex items-center px-6 py-3 rounded-md bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Explore All Features
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* App download section */}
        <motion.section 
          className="py-24 bg-gradient-to-r from-gray-900 to-indigo-900 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center">
              <motion.div 
                className="md:w-1/2 mb-12 md:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
                  Take Your Learning On The Go
                </h2>
                <p className="text-xl text-gray-300 max-w-lg mb-8">
                  Access your courses, assignments, and notifications from anywhere with our mobile application.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href="#"
                    className="inline-flex items-center px-6 py-3 rounded-md bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.9,19.8c-0.9,0-1.7-0.2-2.5-0.7c-0.1,0-0.2-0.1-0.4-0.1c-0.1,0-0.3,0-0.4,0.1c-0.8,0.5-1.6,0.7-2.5,0.7c-0.9,0-1.7-0.2-2.5-0.7 C9.5,19,9.4,19,9.2,19c-0.1,0-0.3,0-0.4,0.1c-0.8,0.5-1.6,0.7-2.5,0.7c-0.9,0-1.7-0.2-2.5-0.7C3.7,19,3.5,19,3.4,19 c-0.1,0-0.3,0-0.4,0.1c-0.2,0.1-0.4,0.1-0.5,0.1c-0.2,0-0.3-0.1-0.4-0.2C2,18.9,1.9,18.7,1.9,18.6c0-0.2,0.1-0.4,0.2-0.5 c0.1-0.1,0.3-0.2,0.5-0.2c0.3,0,0.5,0.1,0.8,0.2c0.1,0.1,0.3,0.1,0.4,0.1c0.1,0,0.3,0,0.4-0.1c0.8-0.5,1.6-0.7,2.5-0.7 c0.9,0,1.7,0.2,2.5,0.7C9.3,18.1,9.5,18.2,9.6,18.2c0.1,0,0.3,0,0.4-0.1c0.8-0.5,1.6-0.7,2.5-0.7c0.9,0,1.7,0.2,2.5,0.7 c0.1,0.1,0.3,0.1,0.4,0.1c0.1,0,0.3,0,0.4-0.1c0.8-0.5,1.6-0.7,2.5-0.7c0.9,0,1.7,0.2,2.5,0.7c0.1,0.1,0.3,0.1,0.4,0.1 c0.1,0,0.3,0,0.4-0.1c0.2-0.1,0.5-0.2,0.8-0.2c0.2,0,0.4,0.1,0.5,0.2c0.1,0.1,0.2,0.3,0.2,0.5c0,0.2-0.1,0.3-0.2,0.4 c-0.1,0.1-0.3,0.2-0.4,0.2c-0.2,0-0.4,0-0.5-0.1c-0.1-0.1-0.3-0.1-0.4-0.1c-0.1,0-0.3,0-0.4,0.1C19.6,19.6,18.8,19.8,17.9,19.8z M18.3,15.8c-0.4-0.5-0.6-1.1-0.6-1.7c0-0.7,0.2-1.3,0.6-1.7c0.4-0.5,1-0.7,1.6-0.7c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0 c0.3,0.1,0.5,0.2,0.7,0.5c0.2,0.2,0.3,0.5,0.3,0.8c0,0.2-0.1,0.3-0.2,0.5c-0.1,0.1-0.3,0.2-0.5,0.2c-0.3,0-0.5-0.2-0.5-0.5 c0-0.1,0-0.1,0-0.2c0-0.1-0.1-0.2-0.2-0.3C19.7,12.6,19.6,12.6,19.5,12.6c-0.2,0-0.4,0.1-0.6,0.3c-0.2,0.2-0.3,0.6-0.3,1.2 c0,0.6,0.1,1,0.3,1.2c0.2,0.2,0.4,0.3,0.6,0.3c0.1,0,0.2,0,0.3-0.1c0.1,0,0.1-0.1,0.2-0.2c0-0.1,0.1-0.1,0.1-0.2c0,0,0-0.1,0-0.1 c0-0.3,0.2-0.5,0.5-0.5c0.1,0,0.3,0.1,0.4,0.2c0.1,0.1,0.2,0.2,0.2,0.4c0,0.3-0.1,0.6-0.3,0.8c-0.2,0.2-0.4,0.4-0.7,0.5 c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0C19.3,16.5,18.7,16.3,18.3,15.8z M14.6,15.8c-0.4-0.5-0.6-1.1-0.6-1.7c0-0.7,0.2-1.3,0.6-1.7 c0.4-0.5,1-0.7,1.6-0.7c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0c0.3,0.1,0.5,0.2,0.7,0.5c0.2,0.2,0.3,0.5,0.3,0.8c0,0.2-0.1,0.3-0.2,0.5 c-0.1,0.1-0.3,0.2-0.5,0.2c-0.3,0-0.5-0.2-0.5-0.5c0-0.1,0-0.1,0-0.2c0-0.1-0.1-0.2-0.2-0.3C16,12.6,15.9,12.6,15.9,12.6 c-0.2,0-0.4,0.1-0.6,0.3c-0.2,0.2-0.3,0.6-0.3,1.2c0,0.6,0.1,1,0.3,1.2c0.2,0.2,0.4,0.3,0.6,0.3c0.1,0,0.2,0,0.3-0.1 c0.1,0,0.1-0.1,0.2-0.2c0-0.1,0.1-0.1,0.1-0.2c0,0,0-0.1,0-0.1c0-0.3,0.2-0.5,0.5-0.5c0.1,0,0.3,0.1,0.4,0.2 c0.1,0.1,0.2,0.2,0.2,0.4c0,0.3-0.1,0.6-0.3,0.8c-0.2,0.2-0.4,0.4-0.7,0.5c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0 C15.6,16.5,15,16.3,14.6,15.8z M4.5,15c-0.1-0.1-0.2-0.3-0.2-0.5V8c0-0.2,0.1-0.4,0.2-0.5C4.6,7.4,4.8,7.3,5,7.3h5 c0.2,0,0.4,0.1,0.5,0.2C10.7,7.6,10.8,7.8,10.8,8v6.5c0,0.2-0.1,0.4-0.2,0.5c-0.1,0.1-0.3,0.2-0.5,0.2c-0.2,0-0.4-0.1-0.5-0.2 C9.4,14.9,9.3,14.7,9.3,14.5V8.8H5.8v5.8c0,0.2-0.1,0.4-0.2,0.5C5.4,15.2,5.2,15.3,5,15.3C4.8,15.3,4.6,15.2,4.5,15z M3.8,5.3 c-0.1-0.1-0.2-0.3-0.2-0.5c0-0.2,0.1-0.4,0.2-0.5C3.9,4.1,4.1,4,4.3,4h9c0.2,0,0.4,0.1,0.5,0.2c0.1,0.1,0.2,0.3,0.2,0.5 c0,0.2-0.1,0.4-0.2,0.5c-0.1,0.1-0.3,0.2-0.5,0.2h-9C4.1,5.5,3.9,5.4,3.8,5.3z"/>
                    </svg>
                    App Store
                  </motion.a>
                  <motion.a
                    href="#"
                    className="inline-flex items-center px-6 py-3 rounded-md bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.6,16.6L16.6,16.6c-0.2,0.2-0.4,0.3-0.7,0.4c-0.3,0-0.5-0.1-0.7-0.3l-2.6-2.6l-2.6,2.6c-0.2,0.2-0.4,0.3-0.7,0.3
                      c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l2.6-2.6L8.6,9.9c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l2.6,2.6l2.6-2.6
                      c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-2.6,2.6l2.6,2.6C17,15.6,17,16.2,16.6,16.6z M22.4,5.5V22c0,1.1-0.9,2-2,2H3.6
                      c-1.1,0-2-0.9-2-2V5.5c0-1.1,0.9-2,2-2h16.7C21.4,3.5,22.4,4.4,22.4,5.5z M20.4,9.6c0-0.4-0.3-0.8-0.8-0.8H4.4
                      c-0.4,0-0.8,0.3-0.8,0.8v11.6c0,0.4,0.3,0.8,0.8,0.8h15.1c0.4,0,0.8-0.3,0.8-0.8V9.6z"/>
                    </svg>
                    Google Play
                  </motion.a>
                </div>
              </motion.div>
              <motion.div 
                className="md:w-1/2 md:pl-10"
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
              >
                <img
                  src="/api/placeholder/500/300"
                  alt="Mobile app screens"
                  className="h-auto w-full rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>


        {/* Footer */}
        
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Educational Platform</h3>
                <p className="text-gray-400">
                  Empowering students to achieve their academic and career goals.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Learning Resources</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Career Services</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Student Success</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Academic Calendar</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">System Status</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
                <p className="text-gray-400 mb-4">Stay updated with the latest news and resources.</p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    className="min-w-0 flex-1 px-4 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-800 pt-8">
              <p className="text-gray-400 text-center">
                © {new Date().getFullYear()} Educational Platform. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useStudent } from '../context/userContext';

// const HomePage = () => {

//   const { student } = useStudent();
//   console.log(student)
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.5 }
//     }
//   };

//   // Stats data
//   const stats = [
//     { label: 'Academic Progress', value: '87%', color: 'bg-blue-500' },
//     { label: 'Attendance Rate', value: '92%', color: 'bg-green-500' },
//     { label: 'Career Readiness', value: '75%', color: 'bg-purple-500' },
//     { label: 'Skills Developed', value: '26', color: 'bg-indigo-500' }
//   ];

//   // Quick actions
//   const quickActions = [
//     { 
//       title: 'Academic Analysis', 
//       icon: '📊', 
//       description: 'Review your grades and course performance',
//       path: '/analysis' 
//     },
//     { 
//       title: 'Attendance Log', 
//       icon: '📝', 
//       description: 'Check your attendance records',
//       path: '/attendance' 
//     },
//     { 
//       title: 'Career Paths', 
//       icon: '🛣️', 
//       description: 'Explore career options based on your profile',
//       path: '/career-paths' 
//     },
//     { 
//       title: 'Schedule Meeting', 
//       icon: '📅', 
//       description: 'Book a session with a career counselor',
//       path: '/schedule' 
//     }
//   ];

//   // Recommendation cards
//   const recommendations = [
//     {
//       title: 'Data Science Workshop',
//       description: 'Based on your interest in statistics and programming, we recommend this upcoming workshop.',
//       time: 'Next Tuesday, 2:00 PM',
//       type: 'Workshop',
//       path: '/events/data-science-workshop'
//     },
//     {
//       title: 'Improve Mathematics Skills',
//       description: 'Your recent calculus scores suggest you might benefit from additional practice.',
//       time: 'Ongoing',
//       type: 'Learning Resource',
//       path: '/resources/mathematics'
//     },
//     {
//       title: 'Software Engineering Internship',
//       description: 'This opportunity matches your skills and career interests.',
//       time: 'Application deadline: April 15',
//       type: 'Job Opportunity',
//       path: '/jobs/software-engineering'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20">
//       {/* Hero section with welcome message */}
//       <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div 
//             className="md:flex md:items-center md:justify-between"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="md:w-1/2">
//               <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
//                 Welcome back, John!
//               </h1>
//               <p className="mt-3 max-w-md text-lg">
//                 Your academic journey is on track. Let's continue building your path to success.
//               </p>
//               <div className="mt-8 flex space-x-4">
//                 <Link
//                   to="/analysis"
//                   className="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-20 px-6 py-3 text-base font-medium text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
//                 >
//                   View Progress
//                 </Link>
//                 <Link
//                   to="/schedule"
//                   className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                 >
//                   Schedule Counseling
//                 </Link>
//               </div>
//             </div>
//             <div className="hidden md:block md:w-1/2">
//               <motion.img
//                 src="/api/placeholder/500/300"
//                 alt="Student studying"
//                 className="h-64 w-full object-cover rounded-lg shadow-lg"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               />
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Main content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats cards */}
//         <motion.div 
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               variants={itemVariants}
//               className="bg-white rounded-lg shadow-md p-6 flex flex-col"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
//                 <div className={`${stat.color} w-3 h-3 rounded-full`}></div>
//               </div>
//               <div className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Two column layout for quick actions and recommendations */}
//         <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
//           {/* Quick actions */}
//           <motion.div 
//             className="md:w-1/2 bg-white rounded-lg shadow-md p-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {quickActions.map((action, index) => (
//                 <Link 
//                   key={index} 
//                   to={action.path}
//                   className="group flex flex-col p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
//                 >
//                   <div className="flex items-center mb-2">
//                     <span className="text-2xl mr-2">{action.icon}</span>
//                     <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-700">
//                       {action.title}
//                     </h3>
//                   </div>
//                   <p className="text-sm text-gray-500">{action.description}</p>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>

//           {/* Personalized recommendations */}
//           <motion.div 
//             className="md:w-1/2 bg-white rounded-lg shadow-md p-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended For You</h2>
//             <div className="space-y-4">
//               {recommendations.map((recommendation, index) => (
//                 <Link 
//                   key={index} 
//                   to={recommendation.path}
//                   className="block p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-lg font-medium text-gray-900">{recommendation.title}</h3>
//                       <p className="text-sm text-gray-500 mt-1">{recommendation.description}</p>
//                       <p className="text-xs text-gray-400 mt-2">{recommendation.time}</p>
//                     </div>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
//                       {recommendation.type}
//                     </span>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* Upcoming events and deadlines */}
//         <motion.div 
//           className="mt-8 bg-white rounded-lg shadow-md p-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-900">Upcoming Deadlines</h2>
//             <Link 
//               to="/calendar" 
//               className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
//             >
//               View Calendar
//             </Link>
//           </div>
//           <div className="overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Event
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Due Date
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Course
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       Final Project Submission
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">March 15, 2025</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">CS 401</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
//                       Upcoming
//                     </span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       Midterm Exam
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">March 12, 2025</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">MATH 301</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                       Urgent
//                     </span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       Career Fair
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">March 20, 2025</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">University Event</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                       Registered
//                     </span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;