import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStudentByEnroll } from '../utils/studentUtility';
import { fetchAllCourses } from '../utils/api';
import { assignCourseToStudent } from '../utils/courseUtils';

const AddCourses = () => {
  let stu = {
    name: "Sandeep Malhotra",
    email: "sandeep.malhotra@example.com",
    phone: "9876543218",
    enrollment: "BBA2008",
    password: '123456', // Hash this in production
    age: 22,
    grade: "N/A",
    profilePic: "",
    userType: "student",
    semester: "1st",
    academicRecords: [],
    course: {},
    skills: [],
    extracurricularActivities: [],
    attendance: []
  };

  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Course form state
  const [courseForm, setCourseForm] = useState({
    id : '',
    courseCode: '',
    courseName: '',
    institution: '',
    amount: '',
    department: '',
    duration: '',
    totalSemisters: '',
    headOfDepartment: '',
    completionStatus: 'Ongoing'
  });

  // Extracurricular activity form state
  const [activityForm, setActivityForm] = useState({
    activityName: '',
    type: '',
    position: '',
    achievements: '',
    details: ''
  });

  // Available courses from database
  const [availableCourses, setAvailableCourses] = useState([]);
  
  // Existing courses state
  const [existingCourses, setExistingCourses] = useState([]);
  
  // Existing extracurricular activities
  const [existingActivities, setExistingActivities] = useState([]);

  // Fetch all available courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let res = await fetchAllCourses();
        console.log(res);
        setAvailableCourses(res);
      } catch (err) {
        console.error('Error fetching available courses:', err);
      }
    };

    fetchCourses();
  }, [student]);

  // Handle enrollment number input change
  const handleEnrollmentChange = (e) => {
    setEnrollmentNumber(e.target.value);
    // Reset states when enrollment number changes
    setStudent(null);
    setSearchPerformed(false);
    setError(null);
    setSuccess(null);
  };

  // Handle course selection from dropdown
  const handleCourseSelect = (e) => {
    const selectedCourseCode = e.target.value;
    if (!selectedCourseCode) return;

    const selectedCourse = availableCourses.find(course => 
      course.courseCode === selectedCourseCode
    );

    if (selectedCourse) {
      setCourseForm({
        id : selectedCourse._id,
        courseCode: selectedCourse.courseCode,
        courseName: selectedCourse.courseName,
        institution: selectedCourse.institution,
        amount: selectedCourse.amount,
        department: selectedCourse.department,
        duration: selectedCourse.duration,
        totalSemisters: selectedCourse.totalSemisters,
        headOfDepartment: selectedCourse.headOfDepartment || '',
        completionStatus: 'Ongoing'
      });
    }
  };
  
  // Handle course form input changes
  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setCourseForm(prev => ({
      ...prev,
      [name]: name === 'amount' || name === 'totalSemisters' ? 
        (value === '' ? '' : Number(value)) : value
    }));
  };

  // Handle extracurricular activity form input changes
  const handleActivityInputChange = (e) => {
    const { name, value } = e.target;
    setActivityForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Search for student by enrollment number
  const searchStudent = async () => {
    if (!enrollmentNumber.trim()) {
      setError('Please enter an enrollment number');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    setSearchPerformed(true);
    
    try {
      
      
      const response = await getStudentByEnroll(enrollmentNumber);
      setStudent(response?.user);
      console.log(response.user)
      
      // Fetch existing courses for this student
      // if (response.data && response.data._id) {
      //   const coursesResponse = await axios.get(`/api/courses/student/${response.data._id}`);
        setExistingCourses([response?.user?.course]);
        
        // Fetch existing extracurricular activities
        // const activitiesResponse = await axios.get(`/api/extracurricular/student/${response.data._id}`);

        
        setExistingActivities([response?.user?.extracurricularActivities]);
      // }
      
      setLoading(false);
    } catch (err) {
      console.error('Error searching for student:', err);
      setError(err.response?.data?.message || 'Student not found. Please check the enrollment number.');
      setStudent(null);
      setExistingCourses([]);
      setExistingActivities([]);
      setLoading(false);
    }
  };
  
  // Handle form submission for adding a course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    // console.log(selectedCourse)
    
    if (!student || !student._id) {
      setError('No student selected. Please search for a student first.');
      return;
    }
    
    // Validate form
    if (!courseForm.courseName || !courseForm.institution || 
        !courseForm.amount || !courseForm.department || !courseForm.duration) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Add studentId to the course data
      const courseData = {
        ...courseForm,
        studentId: student._id
      };
      
      // const response = await axios.post('/api/courses', courseData);
      const response = await assignCourseToStudent(courseData,student._id);
      
      // Update the list of existing courses
      setExistingCourses(prev => [...prev, response.data]);
      
      // Reset the form
      setCourseForm({
        courseCode: '',
        courseName: '',
        institution: '',
        amount: '',
        department: '',
        duration: '',
        totalSemisters: '',
        headOfDepartment: '',
        completionStatus: 'Ongoing'
      });
      
      setSuccess('Course added successfully!');
      setLoading(false);
    } catch (err) {
      console.error('Error adding course:', err);
      setError(err.response?.data?.message || 'Failed to add course. Please try again.');
      setLoading(false);
    }
  };

  // Handle form submission for adding an extracurricular activity
  const handleAddActivity = async (e) => {
    e.preventDefault();
    
    if (!student || !student._id) {
      setError('No student selected. Please search for a student first.');
      return;
    }
    
    // Validate form
    if (!activityForm.activityName) {
      setError('Please at least enter the activity name');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Add studentId to the activity data
      const activityData = {
        ...activityForm,
        studentId: student._id
      };
      
      const response = await axios.post('/api/extracurricular', activityData);
      
      // Update the list of existing activities
      setExistingActivities(prev => [...prev, response.data]);
      
      // Reset the form
      setActivityForm({
        activityName: '',
        type: '',
        position: '',
        achievements: '',
        details: ''
      });
      
      setSuccess('Extracurricular activity added successfully!');
      setLoading(false);
    } catch (err) {
      console.error('Error adding activity:', err);
      setError(err.response?.data?.message || 'Failed to add activity. Please try again.');
      setLoading(false);
    }
  };
  
  // Handle course deletion
  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await axios.delete(`/api/courses/${courseId}`);
      
      // Remove the deleted course from the list
      setExistingCourses(prev => prev.filter(course => course._id !== courseId));
      
      setSuccess('Course deleted successfully!');
      setLoading(false);
    } catch (err) {
      console.error('Error deleting course:', err);
      setError(err.response?.data?.message || 'Failed to delete course. Please try again.');
      setLoading(false);
    }
  };

  // Handle activity deletion
  const handleDeleteActivity = async (activityId) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) {
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await axios.delete(`/api/extracurricular/${activityId}`);
      
      // Remove the deleted activity from the list
      setExistingActivities(prev => prev.filter(activity => activity._id !== activityId));
      
      setSuccess('Activity deleted successfully!');
      setLoading(false);
    } catch (err) {
      console.error('Error deleting activity:', err);
      setError(err.response?.data?.message || 'Failed to delete activity. Please try again.');
      setLoading(false);
    }
  };

  // Handle course update (change completion status)
  const handleUpdateCourseStatus = async (courseId, newStatus) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await axios.patch(`/api/courses/${courseId}`, {
        completionStatus: newStatus
      });
      
      // Update the course in the list
      setExistingCourses(prev => 
        prev.map(course => 
          course._id === courseId ? { ...course, completionStatus: newStatus } : course
        )
      );
      
      setSuccess('Course status updated successfully!');
      setLoading(false);
    } catch (err) {
      console.error('Error updating course status:', err);
      setError(err.response?.data?.message || 'Failed to update course status. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl pt-20 font-bold mb-6">Student Courses & Activities</h1>
      
      {/* Student Search Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Find Student by Enrollment Number</h2>
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-grow">
            <label htmlFor="enrollmentNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Enrollment Number
            </label>
            <input
              type="text"
              id="enrollmentNumber"
              value={enrollmentNumber}
              onChange={handleEnrollmentChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter student enrollment number"
            />
          </div>
          <button
            onClick={searchStudent}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-md">
            {success}
          </div>
        )}
      </div>
      
      {/* Student Information */}
      {student && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600">Name:</p>
              <p className="font-medium">{student.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Enrollment:</p>
              <p className="font-medium">{student.enrollment}</p>
            </div>
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-medium">{student.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Grade:</p>
              <p className="font-medium">{student.grade || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone:</p>
              <p className="font-medium">{student.phone || 'N/A'}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Course Form */}
      {student && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
          <form onSubmit={handleAddCourse}>
            {/* Course Selection Dropdown */}
            <div className="mb-6">
              <label htmlFor="courseSelect" className="block text-sm font-medium text-gray-700 mb-1">
                Select from Available Courses
              </label>
              <select
                id="courseSelect"
                onChange={handleCourseSelect}
                className="w-full p-2 border rounded-md"
                defaultValue=""
              >
                <option value="" disabled>Select a course</option>
                {availableCourses.map(course => (
                  <option key={course._id} value={course.courseCode}>
                    {course.courseName} - {course.courseCode}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Selecting a course will auto-fill the form below
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Code*
                </label>
                <input
                  type="text"
                  id="courseCode"
                  name="courseCode"
                  value={courseForm.courseCode}
                  onChange={handleCourseInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name*
                </label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  value={courseForm.courseName}
                  onChange={handleCourseInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                  Institution*
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={courseForm.institution}
                  onChange={handleCourseInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department*
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={courseForm.department}
                  onChange={handleCourseInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration*
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={courseForm.duration}
                  onChange={handleCourseInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., 3 months, 1 year"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (Fee)*
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={courseForm.amount}
                  onChange={handleCourseInputChange}
                  className="w-full p-2 border rounded-md"
                  min="0"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="totalSemisters" className="block text-sm font-medium text-gray-700 mb-1">
                  Total Semesters*
                </label>
                <input
                  type="number"
                  id="totalSemisters"
                  name="totalSemisters"
                  value={courseForm.totalSemisters}
                  onChange={handleCourseInputChange}
                  className="w-full p-2 border rounded-md"
                  min="1"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700 mb-1">
                  Head of Department
                </label>
                <input
                  type="text"
                  id="headOfDepartment"
                  name="headOfDepartment"
                  value={courseForm.headOfDepartment}
                  onChange={handleCourseInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="completionStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="completionStatus"
                  name="completionStatus"
                  value={courseForm.completionStatus}
                  onChange={handleCourseInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:bg-green-300"
              >
                {loading ? 'Adding...' : 'Add Course'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Add Extracurricular Activity Form */}
      {student && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Extracurricular Activity</h2>
          <form onSubmit={handleAddActivity}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="activityName" className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Name*
                </label>
                <input
                  type="text"
                  id="activityName"
                  name="activityName"
                  value={activityForm.activityName}
                  onChange={handleActivityInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={activityForm.type}
                  onChange={handleActivityInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select type</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Technical">Technical</option>
                  <option value="Academic Club">Academic Club</option>
                  <option value="Community Service">Community Service</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Position/Role
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={activityForm.position}
                  onChange={handleActivityInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., Team Captain, Secretary, Member"
                />
              </div>
              
              <div>
                <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-1">
                  Achievements
                </label>
                <input
                  type="text"
                  id="achievements"
                  name="achievements"
                  value={activityForm.achievements}
                  onChange={handleActivityInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., First prize in debate competition"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                  Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={activityForm.details}
                  onChange={handleActivityInputChange}
                  className="w-full p-2 border rounded-md"
                  rows="3"
                  placeholder="Additional details about the activity"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:bg-purple-300"
              >
                {loading ? 'Adding...' : 'Add Activity'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Existing Courses List */}
      {student && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Existing Courses
            {existingCourses.length > 0 && (
              <span className="ml-2 text-sm bg-gray-200 text-gray-700 py-1 px-2 rounded-full">
                {existingCourses.length}
              </span>
            )}
          </h2>
          
          {existingCourses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Course Code</th>
                    <th className="p-2 text-left">Course Name</th>
                    <th className="p-2 text-left">Institution</th>
                    <th className="p-2 text-left">Department</th>
                    <th className="p-2 text-left">Duration</th>
                    <th className="p-2 text-left">Fee</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {existingCourses.map((course) => (
                    <tr key={course?._id} className="border-b">
                      <td className="p-2">{course?.courseCode}</td>
                      <td className="p-2">{course?.courseName}</td>
                      <td className="p-2">{course?.institution}</td>
                      <td className="p-2">{course?.department}</td>
                      <td className="p-2">{course?.duration}</td>
                      <td className="p-2">${course?.amount}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            course?.completionStatus === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {course?.completionStatus}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          {course?.completionStatus === 'Ongoing' ? (
                            <button
                              onClick={() => handleUpdateCourseStatus(course?._id, 'Completed')}
                              className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                            >
                              Mark Complete
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateCourseStatus(course?._id, 'Ongoing')}
                              className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                            >
                              Mark Ongoing
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteCourse(course?._id)}
                            className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No courses found for this student.</p>
          )}
        </div>
      )}
      
      {/* Existing Extracurricular Activities List */}
      {student && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Extracurricular Activities
            {existingActivities.length > 0 && (
              <span className="ml-2 text-sm bg-gray-200 text-gray-700 py-1 px-2 rounded-full">
                {existingActivities.length}
              </span>
            )}
          </h2>
          
          {existingActivities  && existingActivities.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Activity Name</th>
                    <th className="p-2 text-left">Type</th>
                    <th className="p-2 text-left">Position</th>
                    <th className="p-2 text-left">Achievements</th>
                    <th className="p-2 text-left">Details</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {existingActivities.map((activity) => (
                    <tr key={activity._id} className="border-b">
                      <td className="p-2">{activity.activityName}</td>
                      <td className="p-2">{activity.type || 'N/A'}</td>
                      <td className="p-2">{activity.position || 'N/A'}</td>
                      <td className="p-2">{activity.achievements || 'N/A'}</td>
                      <td className="p-2 max-w-xs truncate">{activity.details || 'N/A'}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDeleteActivity(activity._id)}
                          className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No extracurricular activities found for this student.</p>
          )}
        </div>
      )}
      
      {searchPerformed && !student && !loading && (
        <div className="bg-yellow-50 p-6 rounded-lg text-center">
          <h3 className="text-xl font-medium text-yellow-800 mb-2">Student Not Found</h3>
          <p className="text-yellow-700">
            No student was found with the provided enrollment number. Please check the enrollment number and try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default AddCourses;