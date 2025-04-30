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
      name: 'Ranchhod Das Chanchad',
      role: 'Engineering Student',
      content: 'Marks ke peechhe mat bhaago, excellence ke peechhe bhaago. Ye website wahi sikhaata hai — tumhare interest, tumhare performance ke hisaab se tumhein guide karta hai. Mind-blowing yaar!',
      avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTO8X9yqKzoDWdXy7g7cgZmRZVJKv7eWCdMDLabNUOm3u-JW0OcjwnIQXO78UCasDut7QnXyAskfB1dwgqu9qsOEbo8JrajKWVujFw4PA'
    },
    {
      name: 'Raju Rastogi',
      role: 'Engineering Student',
      content: 'Main hamesha darr ke saath padhai karta tha, par is platform ke personalized reports ne mujhe confidence diya. Ab future ko lekar zyada clarity hai… aur mummy-papa bhi khush hain!',
      avatar: 'https://ninesilos.wordpress.com/wp-content/uploads/2013/07/raju-rastogi.jpg'
    },
    {
      name: 'Farhan Qureshi',
      role: 'Engineering Student',
      content: 'Main photography mein career banana chahta tha, par kabhi sure nahi tha. Is platform ke interest analysis ne meri aankhein khol di. Ab main apna passion follow kar raha hoon, bina regret ke. Aur ha "Abba maan gye hain!"',
      avatar: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRQGRgSjvcVpPz5eGcKOzPGBAum1XSsJ1raAFWp1PsbDQoEs3f5WOxj17LEHZ49RG7jS1LI6EFpddORoXMEpUa_4CjiaPHIfkCrmsCO6UI'
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
        <motion.section 
          className="py-24 bg-gradient-to-b from-indigo-600 to-purple-700 text-white relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative background patterns */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="mandala" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#FFF" strokeWidth="0.5" />
                  <circle cx="25" cy="25" r="15" fill="none" stroke="#FFF" strokeWidth="0.5" />
                  <circle cx="25" cy="25" r="10" fill="none" stroke="#FFF" strokeWidth="0.5" />
                  <circle cx="25" cy="25" r="5" fill="none" stroke="#FFF" strokeWidth="0.5" />
                  <path d="M 5 25 L 45 25 M 25 5 L 25 45" stroke="#FFF" strokeWidth="0.5" />
                  <path d="M 10 10 L 40 40 M 10 40 L 40 10" stroke="#FFF" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mandala)" />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6">
                  Take Your Learning Anywhere
                </h2>
                <p className="text-xl text-indigo-100 mb-8 max-w-lg">
                  Download our mobile app and access all your academic resources on the go. Study anytime, anywhere.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <motion.a
                    href="#"
                    className="flex items-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                      <path fillRule="evenodd" d="M10 4a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="text-xs">Download on the</div>
                      <div className="text-xl font-semibold">App Store</div>
                    </div>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="flex items-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-xl font-semibold">Google Play</div>
                    </div>
                  </motion.a>
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2 relative"
                variants={float}
                animate="animate"
              >
                <motion.div
                  className="relative mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Mobile app mockup with Indian design elements */}
                  <div className="bg-white p-2 rounded-3xl shadow-2xl w-64 mx-auto overflow-hidden border-4 border-indigo-300">
                    <div className="rounded-2xl overflow-hidden">
                      <img 
                        src="/api/placeholder/250/500" 
                        alt="Mobile app" 
                        className="w-full"
                      />
                    </div>
                    <div className="mt-4 h-3 w-16 bg-black rounded-full mx-auto"></div>
                  </div>
                  
                  {/* Decorative floating elements */}
                  <motion.div 
                    className="absolute -top-8 -right-8 w-24 h-24 bg-yellow-400 rounded-full opacity-20"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                    }}
                  />
                  <motion.div 
                    className="absolute -bottom-8 -left-8 w-16 h-16 bg-green-400 rounded-full opacity-20"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [360, 180, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Footer with Indian-inspired design */}
        <footer className="bg-purple-700 text-amber-100">
          {/* Wave divider with Indian colors */}
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-amber-50">
              <path d="M0,96L48,106.7C96,117,192,139,288,144C384,149,480,139,576,128C672,117,768,107,864,122.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-amber-300 mb-4">Student Success Portal</h3>
                <p className="text-amber-200 mb-6 max-w-md">
                  Empowering students across India with the tools and resources they need to succeed in academics and beyond.
                </p>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map(platform => (
                    <a 
                      key={platform} 
                      href="#" 
                      className="w-10 h-10 bg-orange-700 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors"
                    >
                      <span className="sr-only">{platform}</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-amber-300 mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  {['Home', 'About Us', 'Courses', 'Resources', 'Career Services'].map(link => (
                    <li key={link}>
                      <a href="#" className="text-amber-200 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-amber-300 mb-4">Support</h3>
                <ul className="space-y-3">
                  {['Help Center', 'Contact Us', 'FAQs', 'Terms of Service', 'Privacy Policy'].map(link => (
                    <li key={link}>
                      <a href="#" className="text-amber-200 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-amber-300 mb-4">Contact Info</h3>
                <ul className="space-y-3 text-amber-200">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    123 Education Lane, Mumbai 400001
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    +91 123 456 7890
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    contact@studentportal.edu
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-orange-800 flex flex-col md:flex-row justify-between items-center">
              <p className="text-amber-300">© 2025 StudyCare Portal. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                  <p>Created by Sumit Baghel</p>
              </div>
            </div>
          </div>
          
          {/* Decorative footer border with Indian tricolor inspiration */}
          <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
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