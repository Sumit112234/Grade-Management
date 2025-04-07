import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStudent } from '../context/userContext';
import { fetchAttendance } from '../utils/api';

const AttendancePage = () => {
  const { student } = useStudent();
  const [currentMonth, setCurrentMonth] = useState('All Months');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [attendanceData, setAttendanceData] = useState([]);
  const [subjects, setSubjects] = useState(['All Subjects']);

  const transformAttendanceData = (attendanceList, subjects) => {

    console.log(attendanceList, subjects)

    
    const calculateDuration = (timeIn, timeOut) => {
      if (timeIn === "--:--" || !timeIn || !timeOut || timeOut === "--:--") return "1h";
  
      const parseTime = (time) => {
        const [hours, minutes] = time.split(/[:\s]/);
        const isPM = time.includes("PM");
        let hour = parseInt(hours);
        const minute = parseInt(minutes);
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
        return hour * 60 + minute;
      };
  
      const diff = parseTime(timeOut) - parseTime(timeIn);
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
  
      return `${hours}h ${minutes}m`;
    };
  
    return attendanceList.map((record, index) => {
      const subject = subjects.find(s => s._id === record.subject?._id);
      // console.log(record)
      
      // Extract month and year from the date for filtering
      const recordDate = new Date(record.date);
      const recordMonth = recordDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      });
      
      return {
        id: index + 1,
        date: recordDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        }),
        monthYear: recordMonth,
        subject: subject ? `${subject.subject} - ${subject.code}` : "Unknown Subject",
        status: record.status,
        percentage: record.status === "Present" ? 100 : record.status === "Late" ? 75 : 0,
        timeIn: record.timeIn,
        timeOut: record.timeOut,
        duration: calculateDuration(record.timeIn, record.timeOut),
        note: record.note
      };
    });
  };

  useEffect(() => {
    if (student) {
      // Extract subject data from attendance records
      const setSubjectsAndAttendance = async () => {
        
      let attendanceData = await fetchAttendance(student.enrollment);
      if (!attendanceData) return;


      let subjectsData = attendanceData.map((data) => {
        return {
          ...data.subject
        }
      });

      // Transform attendance data with subjects
      let ATData = transformAttendanceData(attendanceData, subjectsData);
      setAttendanceData(ATData);
      console.log("ATData" , ATData)

      // Get unique subjects from the attendance data
      setSubjects(['All Subjects', ...new Set(ATData.map(record => record.subject))]);
      }

      setSubjectsAndAttendance();
    }
  }, [student]);

  // Filter the attendance data based on the selected subject and month
  const filteredAttendance = attendanceData.filter(record => {

    // console.log("record", record)
    const subjectMatch = selectedSubject === 'All Subjects' || record.subject === selectedSubject;
    const monthMatch = currentMonth === 'All Months' ? true : record.monthYear === currentMonth;
    return subjectMatch && monthMatch;
  });

  // Calculate attendance statistics based on filtered data
  const calculateStats = () => {
    const total = filteredAttendance.length || 1; // Avoid division by zero
    const present = filteredAttendance.filter(record => record.status === 'Present').length;
    const late = filteredAttendance.filter(record => record.status === 'Late').length;
    const absent = filteredAttendance.filter(record => record.status === 'Absent').length;
    const excused = filteredAttendance.filter(record => record.status === 'Excused').length;
    
    const presentPercent = Math.round((present / total) * 100) || 0;
    const latePercent = Math.round((late / total) * 100) || 0;
    const absentPercent = Math.round((absent / total) * 100) || 0;
    const excusedPercent = Math.round((excused / total) * 100) || 0;
    
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

  // Get unique months from attendance data for the dropdown
  const getAvailableMonths = () => {
    const monthsSet = new Set(attendanceData.map(record => record.monthYear));
    let sortedMonths =  Array.from(monthsSet).sort((a, b) => {
      // Sort in descending order (most recent first)
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB - dateA;
    });
    return ['All Months', ...sortedMonths];
  };

  const months = getAvailableMonths();

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

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Attendance Records</h1>
              <p className="mt-1 text-sm text-gray-500">
                Track your attendance across all your subjects
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
              
              {/* Subject filter */}
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
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
              {selectedSubject === 'All Subjects' ? 'All Attendance Records' : `Attendance for ${selectedSubject}`}
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
                    Subject
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
                      {record.subject}
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
              <h4 className="text-md font-semibold text-gray-800 mb-2">Subject-Specific Insights</h4>
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
                {selectedSubject !== 'All Subjects' && (
                  <li>
                    For {selectedSubject}, your attendance pattern suggests {
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
                        const subjectAttendance = {};
                        subjects.filter(s => s !== 'All Subjects').forEach(subject => {
                          const records = attendanceData.filter(r => r.subject === subject && r.monthYear === currentMonth);
                          if (records.length > 0) {
                            const presentCount = records.filter(r => r.status === 'Present' || r.status === 'Excused').length;
                            subjectAttendance[subject] = (presentCount / records.length) * 100;
                          }
                        });
                        const bestSubject = Object.keys(subjectAttendance).sort((a, b) => subjectAttendance[b] - subjectAttendance[a])[0];
                        return bestSubject || 'your subjects';
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