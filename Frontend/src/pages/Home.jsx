import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStudent } from '../context/userContext';

const HomePage = () => {

  const { student } = useStudent();
  console.log(student)
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Stats data
  const stats = [
    { label: 'Academic Progress', value: '87%', color: 'bg-blue-500' },
    { label: 'Attendance Rate', value: '92%', color: 'bg-green-500' },
    { label: 'Career Readiness', value: '75%', color: 'bg-purple-500' },
    { label: 'Skills Developed', value: '26', color: 'bg-indigo-500' }
  ];

  // Quick actions
  const quickActions = [
    { 
      title: 'Academic Analysis', 
      icon: '📊', 
      description: 'Review your grades and course performance',
      path: '/analysis' 
    },
    { 
      title: 'Attendance Log', 
      icon: '📝', 
      description: 'Check your attendance records',
      path: '/attendance' 
    },
    { 
      title: 'Career Paths', 
      icon: '🛣️', 
      description: 'Explore career options based on your profile',
      path: '/career-paths' 
    },
    { 
      title: 'Schedule Meeting', 
      icon: '📅', 
      description: 'Book a session with a career counselor',
      path: '/schedule' 
    }
  ];

  // Recommendation cards
  const recommendations = [
    {
      title: 'Data Science Workshop',
      description: 'Based on your interest in statistics and programming, we recommend this upcoming workshop.',
      time: 'Next Tuesday, 2:00 PM',
      type: 'Workshop',
      path: '/events/data-science-workshop'
    },
    {
      title: 'Improve Mathematics Skills',
      description: 'Your recent calculus scores suggest you might benefit from additional practice.',
      time: 'Ongoing',
      type: 'Learning Resource',
      path: '/resources/mathematics'
    },
    {
      title: 'Software Engineering Internship',
      description: 'This opportunity matches your skills and career interests.',
      time: 'Application deadline: April 15',
      type: 'Job Opportunity',
      path: '/jobs/software-engineering'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero section with welcome message */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="md:flex md:items-center md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back, John!
              </h1>
              <p className="mt-3 max-w-md text-lg">
                Your academic journey is on track. Let's continue building your path to success.
              </p>
              <div className="mt-8 flex space-x-4">
                <Link
                  to="/analysis"
                  className="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-20 px-6 py-3 text-base font-medium text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                >
                  View Progress
                </Link>
                <Link
                  to="/schedule"
                  className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Schedule Counseling
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
              <motion.img
                src="/api/placeholder/500/300"
                alt="Student studying"
                className="h-64 w-full object-cover rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                <div className={`${stat.color} w-3 h-3 rounded-full`}></div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two column layout for quick actions and recommendations */}
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          {/* Quick actions */}
          <motion.div 
            className="md:w-1/2 bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link 
                  key={index} 
                  to={action.path}
                  className="group flex flex-col p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{action.icon}</span>
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-700">
                      {action.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Personalized recommendations */}
          <motion.div 
            className="md:w-1/2 bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended For You</h2>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <Link 
                  key={index} 
                  to={recommendation.path}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{recommendation.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{recommendation.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{recommendation.time}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {recommendation.type}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Upcoming events and deadlines */}
        <motion.div 
          className="mt-8 bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Deadlines</h2>
            <Link 
              to="/calendar" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              View Calendar
            </Link>
          </div>
          <div className="overflow-hidden">
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
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Final Project Submission
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">March 15, 2025</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">CS 401</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Upcoming
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Midterm Exam
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">March 12, 2025</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">MATH 301</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Urgent
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Career Fair
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">March 20, 2025</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">University Event</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Registered
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;