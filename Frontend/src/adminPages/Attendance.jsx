import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { addAttendance, addCourses } from '../adminUtils/addAttendance';
import { fetchAllStudents } from '../utils/api';

const CounselorAttendancePage = () => {
  // States for filters and data
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // States for data
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  
  function transformStudentData(studentData) {
    const coursesMap = new Map();
    const semestersMap = new Map();
    const subjectsMap = new Map();
    const students = [];
    
    studentData.forEach(student => {
      // Extract and store unique courses
      if (student.course && !coursesMap.has(student.course._id)) {
        coursesMap.set(student.course._id, {
          id: student.course._id,
          code: student.course.courseCode,
          name: student.course.courseName,
        });
      }
      
      // Extract and store unique semesters
      if (student.semester && !semestersMap.has(student.semester)) {
        semestersMap.set(student.semester, {
          id: semestersMap.size + 1,
          name: student.semester,
        });
      }
      
      // Extract and store unique subjects from academicRecords
      if (student.academicRecords && Array.isArray(student.academicRecords)) {
        student.academicRecords.forEach(record => {
          if (record.subjectId && !subjectsMap.has(record.subjectId._id)) {
            subjectsMap.set(record.subjectId._id, {
              id: record.subjectId._id,
              code: record.subjectId.code,
              name: record.subjectId.subject,
              semester: record.subjectId.semester,
              courseId: record.subjectId.courseId
            });
          }
        });
      }
      
      // Add student details
      const studentWithSubjects = {
        id: student._id,
        _id: student._id,
        studentId: student.enrollment,
        name: student.name,
        email: student.email,
        profilePic: student.profilePic || '/api/placeholder/100/100',
        semester: student.semester,
        courseId: student.course?._id,
        subjects: student.academicRecords?.map(record => record.subjectId?._id) || [],
        attendanceStatus: null
      };
      
      students.push(studentWithSubjects);
    });
    
    return {
      courses: Array.from(coursesMap.values()),
      semesters: Array.from(semestersMap.values()),
      subjects: Array.from(subjectsMap.values()),
      students,
    };
  }
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log('Fetching students data...');
        const data = await fetchAllStudents();
        const transformedData = transformStudentData(data);
        
        setCourses(transformedData.courses);
        setStudents(transformedData.students);
        setSemesters(transformedData.semesters);
        setSubjects(transformedData.subjects);
        
        console.log('Transformed data:', transformedData, data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setErrorMessage('Failed to load student data. Please try again.');
      }
    };
    
    fetchStudents();
  }, []);
  
  // Filter subjects based on selected course and semester
  const filteredSubjects = subjects.filter(subject => {
    const matchesCourse = selectedCourse ? subject.courseId === selectedCourse : true;
    const matchesSemester = selectedSemester ? subject.semester === selectedSemester : true;
    return matchesCourse && matchesSemester;
  });
  
  // Filter students based on course, semester, subject, and search query
  const filteredStudents = students.filter(student => {
    const matchesCourse = selectedCourse ? student.courseId === selectedCourse : true;
    const matchesSemester = selectedSemester ? student.semester === selectedSemester : true;
    const matchesSubject = selectedSubject ? student.subjects.includes(selectedSubject) : true;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCourse && matchesSearch && matchesSemester && matchesSubject;
  });
  
  // Update attendance status for a student
  const handleAttendanceChange = (studentId, status) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student._id === studentId ? { ...student, attendanceStatus: status } : student
      )
    );
  };
  
  // Record time in for a student
  const recordTimeIn = (studentId) => {
    const now = new Date();
    const timeIn = format(now, 'hh:mm a');
    
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student._id === studentId ? { ...student, timeIn: timeIn, timeOut: '', attendanceStatus: 'Present' } : student
      )
    );
  };
  
  // Record time out for a student
  const recordTimeOut = (studentId) => {
    const now = new Date();
    const timeOut = format(now, 'hh:mm a');
    
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student._id === studentId) {
          const updatedStudent = { ...student, timeOut: timeOut };
          // Calculate duration if timeIn exists
          if (student.timeIn) {
            // This is a simplified calculation - in production, use a proper time difference calculation
            updatedStudent.duration = 'Recorded';
          }
          return updatedStudent;
        }
        return student;
      })
    );
  };
  
  // Handle notes change
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  
  // Submit attendance for all students
  const submitAttendance = async() => {
    // Validate that all students have an attendance status
    const unrecordedStudents = filteredStudents.filter(student => student.attendanceStatus === null);
    
    if (unrecordedStudents.length > 0) {
      setErrorMessage(`${unrecordedStudents.length} students still need attendance recorded.`);
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    
    // Prepare attendance records according to the new schema
    const attendanceRecords = filteredStudents.map((student) => ({
      studentId: student.studentId, // Assuming this is now an ObjectId string
      course: selectedCourseId || student.courseId, // Use selected course or student's course
      subject: selectedSubject, // Add the selected subject
      date: parseISO(selectedDate), // Convert date string to Date object
      timeIn: student.timeIn || null,
      timeOut: student.timeOut || null,
      status: student.attendanceStatus || 'Absent', // Default to Absent if no status
      note: notes // Include the notes for each student record
    }));
    
    
      console.log("Submitting attendance records:", attendanceRecords);
     addAttendance(attendanceRecords)
     .then((data)=>{
      setSuccessMessage('Attendance successfully recorded!');
      setTimeout(() => setSuccessMessage(''), 5000); 
      setNotes('');
     })
     .catch((e)=>{
      console.error("Error submitting attendance:", error);
      setErrorMessage('Failed to submit attendance. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
     })
      

    
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Get status badge color based on attendance status
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
              <h1 className="text-2xl font-bold text-gray-900">Record Attendance</h1>
              <p className="mt-1 text-sm text-gray-500">
                Mark attendance for students in your courses
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={submitAttendance}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Attendance
              </button>
            </div>
          </div>
        </div>
        
        {/* Success/Error messages */}
        {successMessage && (
          <div className="mb-4 p-4 rounded-md bg-green-50 border border-green-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Filters - Reorganized */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Date selection in its own box */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Date Selection</h3>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block py-2 px-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          {/* Course, semester, subject, and search in one box */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Course & Student Filters</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
                <select
                  id="semester"
                  name="semester"
                  value={selectedSemester}
                  onChange={(e) => {
                    setSelectedSemester(e.target.value);
                    // Reset subject when semester changes
                    setSelectedSubject('');
                  }}
                  className="mt-1 py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">All Semesters</option>
                  {semesters.map((semester) => (
                    <option key={semester.id} value={semester.name}>{semester.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
                <select
                  id="course"
                  name="course"
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    // Also store the course ID for submission
                    const course = courses.find(c => c.id === e.target.value);
                    setSelectedCourseId(course ? course.id : '');
                    // Reset subject when course changes
                    setSelectedSubject('');
                  }}
                  className="mt-1 py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">All Courses</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>
              
              {/* New Subject dropdown */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="mt-1 py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">All Subjects</option>
                  {filteredSubjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>{subject.name} ({subject.code})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search Students</label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Name or ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Students list */}
        <motion.div 
          className="bg-white shadow-md rounded-lg overflow-hidden mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {selectedCourse 
                ? `Students in ${courses.find(c => c.id === selectedCourse)?.name || 'Selected Course'}`
                : 'All Students'}
              {selectedSubject && ` - ${subjects.find(s => s.id === selectedSubject)?.name || 'Selected Subject'}`}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {format(new Date(selectedDate), 'MMMM d, yyyy')} - Showing {filteredStudents.length} students
            </p>
          </div>
          
          {filteredStudents.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <motion.li key={student._id} variants={itemVariants} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img className="h-12 w-12 rounded-full" src={student.profilePic} alt={student.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.studentId}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col sm:flex-row items-end sm:items-center gap-2">
                      {/* Time in/out buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => recordTimeIn(student._id)}
                          disabled={student.timeIn}
                          className={`inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                            student.timeIn ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Time In {student.timeIn && `(${student.timeIn})`}
                        </button>
                        
                        <button
                          onClick={() => recordTimeOut(student._id)}
                          disabled={!student.timeIn || student.timeOut}
                          className={`inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                            !student.timeIn || student.timeOut ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Time Out {student.timeOut && `(${student.timeOut})`}
                        </button>
                      </div>
                      
                      {/* Attendance status buttons */}
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleAttendanceChange(student._id, 'Present')}
                          className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                            student.attendanceStatus === 'Present' 
                              ? 'bg-green-100 text-green-800 font-semibold' 
                              : 'bg-gray-100 text-gray-800 hover:bg-green-50'
                          }`}
                        >
                          Present
                        </button>
                        
                        <button
                          onClick={() => handleAttendanceChange(student._id, 'Late')}
                          className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                            student.attendanceStatus === 'Late' 
                              ? 'bg-yellow-100 text-yellow-800 font-semibold' 
                              : 'bg-gray-100 text-gray-800 hover:bg-yellow-50'
                          }`}
                        >
                          Late
                        </button>
                        
                        <button
                          onClick={() => handleAttendanceChange(student._id, 'Absent')}
                          className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                            student.attendanceStatus === 'Absent' 
                              ? 'bg-red-100 text-red-800 font-semibold' 
                              : 'bg-gray-100 text-gray-800 hover:bg-red-50'
                          }`}
                        >
                          Absent
                        </button>
                        
                        <button
                          onClick={() => handleAttendanceChange(student._id, 'Excused')}
                          className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                            student.attendanceStatus === 'Excused' 
                              ? 'bg-blue-100 text-blue-800 font-semibold' 
                              : 'bg-gray-100 text-gray-800 hover:bg-blue-50'
                          }`}
                        >
                          Excused
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try changing your search criteria or select a different course or subject.
              </p>
            </div>
          )}
          
          {filteredStudents.length > 0 && (
            <div className="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-700">
                  Total students: <span className="font-medium">{filteredStudents.length}</span>
                </p>
                <div>
                  <span className="mx-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Present: {filteredStudents.filter(s => s.attendanceStatus === 'Present').length}
                  </span>
                  <span className="mx-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Late: {filteredStudents.filter(s => s.attendanceStatus === 'Late').length}
                  </span>
                  <span className="mx-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Absent: {filteredStudents.filter(s => s.attendanceStatus === 'Absent').length}
                  </span>
                  <span className="mx-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Excused: {filteredStudents.filter(s => s.attendanceStatus === 'Excused').length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Notes section - now connected to state */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Additional Notes</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Add any relevant information about today's attendance
            </p>
          </div>
          <div className="p-6">
            <textarea
              rows={4}
              value={notes}
              onChange={handleNotesChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Add notes about special circumstances, class events, etc."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorAttendancePage;