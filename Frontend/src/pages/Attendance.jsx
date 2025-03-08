import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AttendancePage = () => {
  // States for the attendance data and filters
  const [currentMonth, setCurrentMonth] = useState('March 2025');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [attendanceData, setAttendanceData] = useState([
    { 
      id: 1, 
      date: 'March 7, 2025', 
      course: 'CS 401 - Advanced Programming', 
      status: 'Present', 
      percentage: 100,
      timeIn: '09:30 AM',
      timeOut: '11:20 AM',
      duration: '1h 50m'
    },
    { 
      id: 2, 
      date: 'March 6, 2025', 
      course: 'MATH 301 - Applied Calculus', 
      status: 'Late', 
      percentage: 60,
      timeIn: '01:15 PM',
      timeOut: '03:00 PM',
      duration: '1h 45m'
    },
    { 
      id: 3, 
      date: 'March 6, 2025', 
      course: 'CS 401 - Advanced Programming', 
      status: 'Present', 
      percentage: 100,
      timeIn: '09:30 AM',
      timeOut: '11:20 AM',
      duration: '1h 50m'
    },
    { 
      id: 4, 
      date: 'March 5, 2025', 
      course: 'PHYS 201 - Physics II', 
      status: 'Absent', 
      percentage: 0,
      timeIn: '--:--',
      timeOut: '--:--',
      duration: '--'
    },
    { 
      id: 5, 
      date: 'March 5, 2025', 
      course: 'MATH 301 - Applied Calculus', 
      status: 'Present', 
      percentage: 100,
      timeIn: '01:00 PM',
      timeOut: '03:00 PM',
      duration: '2h 00m'
    },
    { 
      id: 6, 
      date: 'March 4, 2025', 
      course: 'CS 401 - Advanced Programming', 
      status: 'Present', 
      percentage: 100,
      timeIn: '09:30 AM',
      timeOut: '11:20 AM',
      duration: '1h 50m'
    },
    { 
      id: 7, 
      date: 'March 3, 2025', 
      course: 'CS 401 - Advanced Programming', 
      status: 'Excused', 
      percentage: 100,
      timeIn: '--:--',
      timeOut: '--:--',
      duration: '--',
      note: 'Medical appointment'
    },
  ]);

  // Filter the attendance data based on the selected course
  const filteredAttendance = selectedCourse === 'All Courses' 
    ? attendanceData
    : attendanceData.filter(record => record.course === selectedCourse);

  // Get unique courses from the attendance data
  const courses = ['All Courses', ...new Set(attendanceData.map(record => record.course))];

  // Calculate attendance statistics
  const calculateStats = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(record => record.status === 'Present').length;
    const late = attendanceData.filter(record => record.status === 'Late').length;
    const absent = attendanceData.filter(record => record.status === 'Absent').length;
    const excused = attendanceData.filter(record => record.status === 'Excused').length;
    
    const presentPercent = Math.round((present / total) * 100);
    const latePercent = Math.round((late / total) * 100);
    const absentPercent = Math.round((absent / total) * 100);
    const excusedPercent = Math.round((excused / total) * 100);
    
    return {
      presentPercent,
      latePercent,
      absentPercent,
      excusedPercent,
      total,
      present,
      late,
      absent,
      excused
    };
  };

  const stats = calculateStats();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Status badge color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Late': return 'bg-yellow-100 text-yellow-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Excused': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Months for the dropdown
  const months = [
    'March 2025', 'February 2025', 'January 2025', 
    'December 2024', 'November 2024'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Attendance Records</h1>
              <p className="mt-1 text-sm text-gray-500">
                Track your attendance across all your courses
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              {/* Month filter */}
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              
              {/* Course filter */}
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Attendance stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Present */}
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-green-100 p-3">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Present</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stats.presentPercent}%</p>
                    <p className="ml-2 text-sm text-gray-600">({stats.present} classes)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 h-1">
              <div className="bg-green-500 h-1" style={{ width: `${stats.presentPercent}%` }}></div>
            </div>
          </motion.div>

          {/* Late */}
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-yellow-100 p-3">
                  <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Late</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stats.latePercent}%</p>
                    <p className="ml-2 text-sm text-gray-600">({stats.late} classes)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 h-1">
              <div className="bg-yellow-500 h-1" style={{ width: `${stats.latePercent}%` }}></div>
            </div>
          </motion.div>

          {/* Absent */}
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-red-100 p-3">
                  <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Absent</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stats.absentPercent}%</p>
                    <p className="ml-2 text-sm text-gray-600">({stats.absent} classes)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 h-1">
              <div className="bg-red-500 h-1" style={{ width: `${stats.absentPercent}%` }}></div>
            </div>
          </motion.div>

          {/* Excused */}
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-blue-100 p-3">
                  <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Excused</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stats.excusedPercent}%</p>
                    <p className="ml-2 text-sm text-gray-600">({stats.excused} classes)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 h-1">
              <div className="bg-blue-500 h-1" style={{ width: `${stats.excusedPercent}%` }}></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Attendance records table */}
        <motion.div 
          className="bg-white shadow-md rounded-lg overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {selectedCourse === 'All Courses' ? 'All Attendance Records' : `Attendance for ${selectedCourse}`}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {currentMonth} - Showing {filteredAttendance.length} records
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time In
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Out
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAttendance.map((record, index) => (
                  <motion.tr 
                    key={record.id}
                    variants={itemVariants}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.timeIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.timeOut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.note || '-'}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Career guidance section based on attendance */}
        <motion.div 
          className="mt-8 bg-white shadow-md rounded-lg overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Attendance Insights & Career Guidance
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personalized recommendations based on your attendance patterns
            </p>
          </div>
          
          <div className="p-6">
            <motion.div variants={itemVariants} className="mb-6">
              <h4 className="text-md font-semibold text-gray-800 mb-2">Attendance Summary</h4>
              <p className="text-sm text-gray-600">
                Your overall attendance rate is {stats.presentPercent + stats.excusedPercent}%, which is 
                {stats.presentPercent + stats.excusedPercent >= 90 
                  ? ' excellent! Regular attendance is strongly correlated with academic success.' 
                  : stats.presentPercent + stats.excusedPercent >= 75 
                    ? ' good, but there\'s room for improvement. Try to attend more classes to maximize your learning potential.' 
                    : ' concerning. Low attendance often leads to poor academic performance. Consider speaking with an academic advisor.'}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <h4 className="text-md font-semibold text-gray-800 mb-2">Course-Specific Insights</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                {stats.absentPercent > 10 && (
                  <li>
                    Your absence rate of {stats.absentPercent}% may impact your academic performance. Research shows that students who miss more than 10% of classes are significantly more likely to fall behind.
                  </li>
                )}
                {stats.latePercent > 15 && (
                  <li>
                    You've been late to {stats.latePercent}% of your classes. Punctuality is an important soft skill valued by employers across all industries.
                  </li>
                )}
                {selectedCourse !== 'All Courses' && (
                  <li>
                    For {selectedCourse}, your attendance pattern suggests {
                      filteredAttendance.filter(r => r.status === 'Present' || r.status === 'Excused').length / filteredAttendance.length >= 0.9
                        ? 'strong engagement and interest. This could indicate a potential career path aligned with this subject area.'
                        : 'some challenges with engagement. Consider speaking with your instructor or a tutor for additional support.'
                    }
                  </li>
                )}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-md font-semibold text-gray-800 mb-2">Career Recommendations</h4>
              <div className="bg-indigo-50 rounded-lg p-4 text-sm text-indigo-800">
                <p className="mb-3">
                  <strong>Based on your attendance patterns:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    {stats.presentPercent >= 90 
                      ? 'Your excellent attendance demonstrates reliability and commitment—soft skills highly valued in fields like healthcare, education, and project management.'
                      : 'Focus on improving your attendance to develop important workplace soft skills like reliability and time management.'}
                  </li>
                  {stats.latePercent > 0 && (
                    <li>
                      {stats.latePercent <= 10 
                        ? 'Your punctuality is generally good. Consider setting up calendar reminders to help eliminate the occasional lateness.'
                        : 'Work on your time management skills by planning to arrive 10-15 minutes early. This habit will serve you well in any professional setting.'}
                    </li>
                  )}
                  <li>
                    Schedule a meeting with a career counselor to discuss how your academic engagement patterns might influence career choices. Your strongest attendance is in {
                      (() => {
                        const courseAttendance = {};
                        courses.filter(c => c !== 'All Courses').forEach(course => {
                          const records = attendanceData.filter(r => r.course === course);
                          const presentCount = records.filter(r => r.status === 'Present' || r.status === 'Excused').length;
                          courseAttendance[course] = (presentCount / records.length) * 100;
                        });
                        const bestCourse = Object.keys(courseAttendance).sort((a, b) => courseAttendance[b] - courseAttendance[a])[0];
                        return bestCourse || 'your courses';
                      })()
                    }, which might indicate where your interests lie.
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AttendancePage;