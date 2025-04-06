import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchAllStudents, fetchAllCourses } from '../utils/api';
import { assignMarksToStudents } from '../utils/studentUtility';


const AssignMarksPage = () => {
  // State for selections and data
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [totalMarks, setTotalMarks] = useState('');
  
  // State for student marks (to be edited by teacher)
  const [studentMarks, setStudentMarks] = useState({});
  
  // Available semesters
  const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
  
  // Fetch courses on component mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await fetchAllCourses();
        console.log(res)
        setCourses(res || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to fetch courses');
        setCourses([]);
      }
    };
    
    loadCourses();
  }, []);
  
  // Fetch subjects based on selected semester and course
  // useEffect(() => {
    
  //   if (selectedSemester && selectedCourse) {
  //     // setLoading(true);
  //     setSelectedSubject('');
  //     // setStudents([]);
  //     setSearchPerformed(false);

      
      
  //     axios.get(`/api/academics/subjects?semester=${selectedSemester}&courseId=${selectedCourse}`)
  //       .then(response => {
  //         setSubjects([]);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching subjects:', error);
  //         toast.error('Failed to fetch subjects');
  //         setSubjects([]);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // }, [selectedSemester, selectedCourse]);
  
  // Handle search for students enrolled in selected course and semester
  const handleSearchStudents = async (e) => {
    e.preventDefault();
    
    console.log('Selected Semester:', selectedSemester);
    if (!selectedSemester || !selectedCourse ) {
      toast.error('Please select semester, course, and subject');
      return;
    }
    
    setLoading(true);
    setSearchPerformed(true);
    
    try {
      const response = await fetchAllStudents(selectedSemester, selectedCourse);
      const studentsData = response || [];
      
      
      // Initialize marks object with student IDs as keys
      const initialMarks = {};

      if(!studentsData.length) {
        toast.error('No students found for the selected semester and course');  
        return ;
      }
      const sub = studentsData[0].academicRecords?.map(record => record.subjectId);
      console.log(sub)
      setSubjects(sub || []);


      studentsData.forEach(student => {
        // Find the academic record for this subject
        const record = student.academicRecords?.find(record => 
          record.subjectId?._id === selectedSubject
        );
        
        initialMarks[student._id] = {
          currentMarks: record?.marks || 0,
          newMarks: '',
          recordId: record?._id
        };
      });
      console.log(studentsData)
      setStudents(studentsData);
      setStudentMarks(initialMarks);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle marks input change for a student
  const handleMarksChange = (studentId, value) => {
    setStudentMarks(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        newMarks: value
      }
    }));
  };
  
  // Submit marks for all students
  const handleSubmitAllMarks = async (e) => {
    e.preventDefault();
    
    if (!totalMarks) {
      toast.error('Please enter total marks');
      return;
    }

    if(selectedSubject == '') {
      toast.error('Please select subject');
      return;
    }
    
    // Validate marks entries
    const totalMarksValue = parseInt(totalMarks);
    let hasErrors = false;
    
    // Check if any entered marks exceed total marks
    Object.entries(studentMarks).forEach(([studentId, data]) => {
      if (data.newMarks && parseInt(data.newMarks) > totalMarksValue) {
        toast.error(`Marks for a student cannot exceed total marks (${totalMarksValue})`);
        hasErrors = true;
      }
    });
    
    if (hasErrors) return;
    
    // console.log(studentMarks , students)
    // Prepare data for submission
    const marksData = Object.entries(studentMarks)
      .filter(([_, data]) => data.newMarks !== '') // Only submit for students with new marks
      .map(([studentId, data]) => ({
        studentId,
        subjectId: selectedSubject,
        marks: parseInt(data.newMarks),
        totalMarks: totalMarksValue
      }));
    
    if (marksData.length === 0) {
      toast.error('Please enter marks for at least one student');
      return;
    }
    
    setLoading(true);
    console.log(marksData)


    assignMarksToStudents(marksData)
    .then(()=>{
      toast.success('Marks assigned successfully');
    })
    .catch((error) => {
      console.error('Error assigning marks:', error);
      toast.error('Failed to assign marks');
    })
    .finally(() => {
      setLoading(false);
    })

   
      
     
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 to-white p-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-blue-800">Assign Student Marks</h1>
        <p className="text-blue-600">Select semester, course, and subject to assign marks to multiple students</p>
      </motion.div>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          {/* Selection Form */}
          <motion.form 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={handleSearchStudents}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
          >
            {/* Semester Selection */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Select Semester
              </label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Semester</option>
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester} Semester
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Course Selection - New */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Select Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                   {course.courseName} ({course.courseCode})
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Subject Selection */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Select Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={!selectedSemester || !selectedCourse || loading}
                required = {false}
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.subject} ({subject.code}) - {subject.subjectType}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Search Button */}
            <motion.div variants={itemVariants} className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!selectedSemester || !selectedCourse  || loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
              >
                {loading ? 'Searching...' : 'Find Students'}
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Student List and Marks Form */}
          {searchPerformed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1,
                height: 'auto'
              }}
              transition={{ duration: 0.3 }}
              className="border-t border-blue-100 pt-6"
            >
              {students.length > 0 ? (
                <motion.form
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  onSubmit={handleSubmitAllMarks}
                >
                  {/* Total Marks Input */}
                  <motion.div variants={itemVariants} className="mb-6">
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      Total Marks for {subjects.find(s => s._id === selectedSubject)?.subject || 'Selected Subject'}
                    </label>
                    <div className="max-w-xs">
                      <input
                        type="number"
                        min="1"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                        className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        placeholder="Enter total marks"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Students Table */}
                  <motion.div variants={itemVariants} className="overflow-x-auto bg-white rounded-lg shadow mb-6">
                    <table className="min-w-full divide-y divide-blue-100">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Student</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Enrollment</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Current Marks</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">New Marks</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-blue-100">
                        {students.map((student, index) => (
                          <motion.tr 
                            key={student._id}
                            variants={itemVariants}
                            className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center">
                                  {student.profilePic ? (
                                    <img 
                                      src={student.profilePic} 
                                      alt={student.name} 
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-lg text-blue-700">{student.name.charAt(0)}</span>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{student.enrollment}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {studentMarks[student._id]?.currentMarks || 0}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                min="0"
                                max={totalMarks || 100}
                                value={studentMarks[student._id]?.newMarks}
                                onChange={(e) => handleMarksChange(student._id, e.target.value)}
                                className="w-24 p-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Marks"
                              />
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                  
                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70"
                    >
                      {loading ? 'Submitting...' : 'Submit All Marks'}
                    </motion.button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div 
                  variants={itemVariants}
                  className="text-center py-8"
                >
                  <svg className="w-16 h-16 mx-auto text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-700">No Students Found</h3>
                  <p className="text-gray-500">There are no students enrolled in this subject for the selected semester and course</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignMarksPage;