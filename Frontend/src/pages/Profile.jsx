import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Plus, Edit, Save, X, Camera, Search, Users, Book, FileText, Calendar } from 'lucide-react';
import { useStudent } from '../context/userContext';
import { updateStudent } from '../utils/userHandler';

// Add Skill Modal Component
const AddSkillModal = ({ isOpen, onClose, onSave }) => {
  const [skillName, setSkillName] = useState('');
  const [proficiency, setProficiency] = useState('Beginner');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ skillName, proficiency });
    setSkillName('');
    setProficiency('Beginner');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <h3 className="text-xl font-semibold mb-4 text-purple-800">Add New Skill</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Skill Name</label>
            <input
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Proficiency Level</label>
            <select
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Add Extracurricular Modal Component
const AddExtracurricularModal = ({ isOpen, onClose, onSave }) => {
  const [activityName, setActivityName] = useState('');
  const [type, setType] = useState('');
  const [position, setPosition] = useState('');
  const [achievements, setAchievements] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ activityName, type, position, achievements, details });
    setActivityName('');
    setType('');
    setPosition('');
    setAchievements('');
    setDetails('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <h3 className="text-xl font-semibold mb-4 text-purple-800">Add Extracurricular Activity</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Activity Name</label>
            <input
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Sports, Academic, Cultural, etc."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Team Captain, Member, President, etc."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Achievements</label>
            <input
              type="text"
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// StudentSearchModal Component for Teachers
const StudentSearchModal = ({ isOpen, onClose, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('enrollment');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (searchType === 'enrollment') {
      onSearch({ type: searchType, enrollment: searchTerm });
    } else {
      onSearch({ type: searchType, course, semester });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <h3 className="text-xl font-semibold mb-4 text-purple-800">Search Students</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Search By</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="searchType"
                  value="enrollment"
                  checked={searchType === 'enrollment'}
                  onChange={() => setSearchType('enrollment')}
                  className="mr-2 text-purple-600"
                />
                Enrollment
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="searchType"
                  value="course"
                  checked={searchType === 'course'}
                  onChange={() => setSearchType('course')}
                  className="mr-2 text-purple-600"
                />
                Course & Semester
              </label>
            </div>
          </div>

          {searchType === 'enrollment' ? (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Enrollment Number</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Course</label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Semester</label>
                <input
                  type="text"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  placeholder="e.g. 1st, 2nd, 3rd"
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
            >
              <Search className="w-4 h-4 mr-1" />
              Search
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Teacher Dashboard Component
const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [students, setStudents] = useState([]);

  const handleSearch = (searchParams) => {
    // In a real application, you would make an API call to fetch students based on searchParams
    // For this example, we'll just set some dummy data
    
    setStudents([
      {
        _id: '1',
        name: 'Rahul Sharma',
        enrollment: 'MCA1001',
        semester: '1st',
        course: 'MCA'
      },
      {
        _id: '2',
        name: 'Priya Patel',
        enrollment: 'MCA1002',
        semester: '1st',
        course: 'MCA'
      },
      {
        _id: '3',
        name: 'Amit Kumar',
        enrollment: 'MCA1003',
        semester: '1st',
        course: 'MCA'
      }
    ]);
  };

  return (
    <motion.div 
      className="container mx-auto p-4 bg-white rounded-lg shadow-md px-28 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 pt-20 ">
        <h2 className="text-2xl font-bold text-purple-800 mb-2">Teacher Dashboard</h2>
        <p className="text-gray-600">Manage your students and courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-purple-50 p-6 rounded-lg shadow border border-purple-100 cursor-pointer hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/A-attendance')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-purple-800">Attendance</h3>
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600">Mark and track student attendance</p>
        </motion.div>

        <motion.div
          className="bg-purple-50 p-6 rounded-lg shadow border border-purple-100 cursor-pointer hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/A-addCourses')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-purple-800">Courses</h3>
            <Book className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600">Manage and add courses</p>
        </motion.div>

        <motion.div
          className="bg-purple-50 p-6 rounded-lg shadow border border-purple-100 cursor-pointer hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate('/A-addMarks')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-purple-800">Marks</h3>
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600">Add and update student marks</p>
        </motion.div>
      </div>

      <div className="bg-white border border-purple-100 rounded-lg shadow mb-8">
        <div className="p-4 border-b border-purple-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-purple-800">Students</h3>
          <button 
            onClick={() => setIsSearchModalOpen(true)}
            className="flex items-center px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <Search className="w-4 h-4 mr-1" />
            Search Students
          </button>
        </div>

        {students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-50">
                  <th className="text-left p-4 text-purple-800">Name</th>
                  <th className="text-left p-4 text-purple-800">Enrollment</th>
                  <th className="text-left p-4 text-purple-800">Course</th>
                  <th className="text-left p-4 text-purple-800">Semester</th>
                  <th className="text-center p-4 text-purple-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <motion.tr 
                    key={student._id} 
                    className="border-b border-purple-50 hover:bg-purple-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="p-4">{student.name}</td>
                    <td className="p-4">{student.enrollment}</td>
                    <td className="p-4">{student.course}</td>
                    <td className="p-4">{student.semester}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => navigate(`/student/${student._id}`)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        View Profile
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p>Search for students to see them here</p>
          </div>
        )}
      </div>

      <StudentSearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
        onSearch={handleSearch} 
      />
    </motion.div>
  );
};

// Main Profile Component
const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('skills');
  const { student } = useStudent();
  const [studentData, setStudentData] = useState(null);

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isExtracurricularModalOpen, setIsExtracurricularModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [isHoveringProfilePic, setIsHoveringProfilePic] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImageChange = async(e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("avatar", file);
      let data = await updateStudent(formData);
      if (data) {
        alert(data);
      }
    }
  };

  const handleSaveSkill = async (skillData) => {
    try {
      // API call to save skill would go here
      const newSkill = {
        skillName: skillData.skillName,
        proficiency: skillData.proficiency
      };
      
      setStudentData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill]
      }));
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };
  
  const handleSaveExtracurricular = async (activityData) => {
    try {
      // API call to save extracurricular activity would go here
      const newActivity = {
        activityName: activityData.activityName,
        type: activityData.type,
        position: activityData.position,
        achievements: activityData.achievements,
        details: activityData.details
      };
      
      setStudentData(prev => ({
        ...prev,
        extracurricularActivities: [...(prev.extracurricularActivities || []), newActivity]
      }));
    } catch (error) {
      console.error('Error saving extracurricular activity:', error);
    }
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        // Using the actual student data from the context
        setTimeout(() => {
          setStudentData(student);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to fetch student data');
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id, student]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      <p className="ml-2 text-purple-700">Loading profile...</p>
    </div>
  );
  
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!studentData) return <div className="text-center p-4">No student found with this ID.</div>;

  // Check if user is a teacher to show teacher dashboard
  if (studentData.userType === "teacher") {
    return <TeacherDashboard />;
  }

  // Calculate overall academic performance
  const calculateOverallPerformance = () => {
    if (!studentData.academicRecords || studentData.academicRecords.length === 0) return 0;
    
    const totalPercentage = studentData.academicRecords.reduce((sum, record) => {
      return sum + (record.marks / record.totalMarks) * 100;
    }, 0);
    
    return (totalPercentage / studentData.academicRecords.length).toFixed(2);
  };

  // Calculate attendance percentage
  const calculateAttendancePercentage = () => {
    if (!studentData.attendance || studentData.attendance.length === 0) return 0;
    
    const presentCount = studentData.attendance.filter(
      record => record.status === "Present" || record.timeIn !== null
    ).length;
    
    return ((presentCount / studentData.attendance.length) * 100).toFixed(2);
  };

  // Get attendance status counts
  const getAttendanceStatusCounts = () => {
    if (!studentData.attendance) return {};
    
    return studentData.attendance.reduce((counts, record) => {
      // Using timeIn to determine if present or absent for the provided data structure
      const status = record.timeIn ? "Present" : "Absent";
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {});
  };

  const attendanceStatusCounts = getAttendanceStatusCounts();
  const overallPerformance = calculateOverallPerformance();
  const attendancePercentage = calculateAttendancePercentage();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Custom Card Component
  const Card = ({ children, className }) => (
    <motion.div 
      variants={itemVariants}
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
  
  // Custom CardHeader Component
  const CardHeader = ({ children }) => (
    <div className="px-6 py-4 border-b border-gray-200 bg-purple-50">
      {children}
    </div>
  );
  
  // Custom CardTitle Component
  const CardTitle = ({ children }) => (
    <h3 className="text-xl font-semibold text-purple-800">
      {children}
    </h3>
  );
  
  // Custom CardContent Component
  const CardContent = ({ children, className }) => (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );

  // Custom Progress Component
  const Progress = ({ value, className }) => (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <motion.div 
        className="bg-purple-500 h-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
  
  // Custom Badge Component
  const Badge = ({ children, variant }) => {
    let bgColor = "bg-gray-100 text-gray-800";
    
    if (variant === "default") bgColor = "bg-purple-100 text-purple-800";
    if (variant === "outline") bgColor = "bg-white text-gray-800 border border-gray-300";
    if (variant === "secondary") bgColor = "bg-purple-100 text-purple-800";
    if (variant === "success") bgColor = "bg-green-100 text-green-800";
    if (variant === "destructive") bgColor = "bg-red-100 text-red-800";
    if (variant === "warning") bgColor = "bg-yellow-100 text-yellow-800";
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
        {children}
      </span>
    );
  };

  // Custom Tabs System
  const TabsList = ({ children }) => (
    <div className="flex space-x-1 border-b border-gray-200 mb-4">
      {children}
    </div>
  );
  
  const TabsTrigger = ({ value, active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
        active ? 'bg-white border-b-2 border-purple-500 text-purple-700' : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  );

  return (
    <motion.div 
      className="container mx-auto p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-20 md:px-24">
        {/* Student Basic Info Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div 
                className="relative h-32 w-32 mx-auto rounded-full overflow-hidden flex items-center justify-center text-3xl font-bold text-gray-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                onMouseEnter={() => setIsHoveringProfilePic(true)}
                onMouseLeave={() => setIsHoveringProfilePic(false)}
                onClick={() => fileInputRef.current.click()}
                style={{ cursor: 'pointer' }}
              >
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : studentData.profilePic ? (
                  <img src={studentData.profilePic} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-purple-100 flex items-center justify-center text-purple-700">
                    {studentData?.name?.charAt(0)}
                  </div>
                )}
                
                {/* Camera icon overlay on hover */}
                {isHoveringProfilePic && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Camera className="text-white w-10 h-10" />
                  </div>
                )}
                
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
              </motion.div>
              
              <div className="text-center">
                <motion.h2 
                  className="text-2xl font-bold text-purple-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {studentData.name}
                </motion.h2>
                <motion.p 
                  className="text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {studentData.enrollment || 'No Enrollment'} • {studentData.semester || 'N/A'} Semester
                </motion.p>
              </div>
              
              <div className="pt-4 space-y-2">
                <motion.div 
                  className="flex justify-between"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="font-medium">Email:</span>
                  <span>{studentData.email}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="font-medium">Phone:</span>
                  <span>{studentData.phone || 'Not provided'}</span>
                </motion.div>
                {/* <motion.div 
                  className="flex justify-between"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="font-medium">Course:</span>
                  <span>{studentData.course || 'Not available'}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="font-medium">Date of Birth:</span>
                  <span>{studentData.dob || 'Not provided'}</span>
                </motion.div> */}
              </div>
              
              <motion.div 
                className="pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center justify-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </button>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Academic Performance */}
              <motion.div
                variants={itemVariants}
                className="space-y-2"
              >
                <h4 className="font-semibold text-purple-800">Academic Performance</h4>
                <div className="flex justify-between mb-1">
                  <span>Overall</span>
                  <span>{overallPerformance}%</span>
                </div>
                <Progress value={overallPerformance} className="h-2" />
                
                <div className="mt-4">
                  <h5 className="font-medium text-sm text-gray-600 mb-2">Recent Results</h5>
                  <div className="space-y-3">
                    {studentData.academicRecords && studentData.academicRecords.slice(0, 3).map((record, index) => (
                      <motion.div 
                        key={index}
                        variants={itemVariants}
                        className="flex justify-between items-center bg-purple-50 p-2 rounded"
                      >
                        <span>{record.subject}</span>
                        <div className="flex items-center">
                          <Badge variant={record.marks / record.totalMarks >= 0.7 ? "success" : "warning"}>
                            {record.marks}/{record.totalMarks}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                    
                    {(!studentData.academicRecords || studentData.academicRecords.length === 0) && (
                      <p className="text-gray-500 text-sm italic">No academic records available</p>
                    )}
                  </div>
                </div>
              </motion.div>
              
              {/* Attendance */}
              <motion.div
                variants={itemVariants}
                className="space-y-2"
              >
                <h4 className="font-semibold text-purple-800">Attendance</h4>
                <div className="flex justify-between mb-1">
                  <span>Overall</span>
                  <span>{attendancePercentage}%</span>
                </div>
                <Progress 
                  value={attendancePercentage} 
                  className={`h-2 ${
                    parseFloat(attendancePercentage) >= 75 
                      ? 'bg-green-100' 
                      : parseFloat(attendancePercentage) >= 60 
                        ? 'bg-yellow-100' 
                        : 'bg-red-100'
                  }`}
                />
                
                <div className="mt-4 flex space-x-4">
                  <div className="flex-1 p-3 bg-green-50 rounded-lg text-center">
                    <div className="text-xl font-bold text-green-700">{attendanceStatusCounts.Present || 0}</div>
                    <div className="text-sm text-green-600">Present</div>
                  </div>
                  <div className="flex-1 p-3 bg-red-50 rounded-lg text-center">
                    <div className="text-xl font-bold text-red-700">{attendanceStatusCounts.Absent || 0}</div>
                    <div className="text-sm text-red-600">Absent</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5 className="font-medium text-sm text-gray-600 mb-2">Recent Attendance</h5>
                  <div className="space-y-2">
                    {studentData.attendance && studentData.attendance.slice(0, 3).map((record, index) => (
                      <motion.div 
                        key={index}
                        variants={itemVariants}
                        className="flex justify-between items-center bg-purple-50 p-2 rounded"
                      >
                        <span>{new Date(record.date).toLocaleDateString()}</span>
                        <Badge variant={record.timeIn ? "success" : "destructive"}>
                          {record.timeIn ? "Present" : "Absent"}
                        </Badge>
                      </motion.div>
                    ))}
                    
                    {(!studentData.attendance || studentData.attendance.length === 0) && (
                      <p className="text-gray-500 text-sm italic">No attendance records available</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
        
        {/* Skills & Extracurricular Tabs */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row justify-between items-center">
            <TabsList>
              <TabsTrigger 
                value="skills" 
                active={activeTab === 'skills'}
                onClick={() => setActiveTab('skills')}
              >
                Skills
              </TabsTrigger>
              <TabsTrigger 
                value="extracurricular" 
                active={activeTab === 'extracurricular'}
                onClick={() => setActiveTab('extracurricular')}
              >
                Extracurricular Activities
              </TabsTrigger>
              <TabsTrigger 
                value="academics" 
                active={activeTab === 'academics'}
                onClick={() => setActiveTab('academics')}
              >
                Academic History
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-800">Skills & Proficiencies</h3>
                    <button
                      onClick={() => setIsSkillModalOpen(true)}
                      className="flex items-center text-sm px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Skill
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {studentData.skills && studentData.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-purple-50 p-4 rounded-lg border border-purple-100"
                      >
                        <h4 className="font-semibold text-purple-800">{skill.skillName}</h4>
                        <div className="mt-2">
                          <Badge variant={
                            skill.proficiency === "Advanced" ? "success" : 
                            skill.proficiency === "Intermediate" ? "secondary" : 
                            "default"
                          }>
                            {skill.proficiency}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                    
                    {(!studentData.skills || studentData.skills.length === 0) && (
                      <p className="text-gray-500 text-sm italic col-span-full text-center py-8">No skills added yet</p>
                    )}
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'extracurricular' && (
                <motion.div
                  key="extracurricular"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-purple-800">Extracurricular Activities</h3>
                    <button
                      onClick={() => setIsExtracurricularModalOpen(true)}
                      className="flex items-center text-sm px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Activity
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {studentData.extracurricularActivities && studentData.extracurricularActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-purple-50 p-4 rounded-lg border border-purple-100"
                      >
                        <div className="flex justify-between">
                          <h4 className="font-semibold text-purple-800">{activity.activityName}</h4>
                          <Badge variant="secondary">{activity.type}</Badge>
                        </div>
                        {activity.position && (
                          <p className="text-sm text-purple-600 mt-1">{activity.position}</p>
                        )}
                        {activity.achievements && (
                          <div className="mt-2">
                            <span className="text-sm font-medium">Achievements:</span>
                            <p className="text-sm text-gray-600">{activity.achievements}</p>
                          </div>
                        )}
                        {activity.details && (
                          <p className="mt-2 text-sm text-gray-600">{activity.details}</p>
                        )}
                      </motion.div>
                    ))}
                    
                    {(!studentData.extracurricularActivities || studentData.extracurricularActivities.length === 0) && (
                      <p className="text-gray-500 text-sm italic text-center py-8">No extracurricular activities added yet</p>
                    )}
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'academics' && (
                <motion.div
                  key="academics"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">Academic Records</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-purple-50 text-left text-purple-800">
                          <th className="py-3 px-4 font-semibold">Subject</th>
                          <th className="py-3 px-4 font-semibold">Marks</th>
                          <th className="py-3 px-4 font-semibold">Total</th>
                          <th className="py-3 px-4 font-semibold">Percentage</th>
                          <th className="py-3 px-4 font-semibold">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-100">
                        {studentData.academicRecords && studentData.academicRecords.map((record, index) => {
                          const percentage = (record.marks / record.totalMarks) * 100;
                          let grade = 'F';
                          if (percentage >= 90) grade = 'A+';
                          else if (percentage >= 80) grade = 'A';
                          else if (percentage >= 70) grade = 'B';
                          else if (percentage >= 60) grade = 'C';
                          else if (percentage >= 50) grade = 'D';
                          
                          return (
                            <motion.tr 
                              key={index}
                              variants={itemVariants}
                              className="hover:bg-purple-50"
                            >
                              <td className="py-3 px-4">{record.subject}</td>
                              <td className="py-3 px-4">{record.marks}</td>
                              <td className="py-3 px-4">{record.totalMarks}</td>
                              <td className="py-3 px-4">{percentage.toFixed(2)}%</td>
                              <td className="py-3 px-4">
                                <Badge variant={
                                  percentage >= 70 ? "success" : 
                                  percentage >= 50 ? "warning" : 
                                  "destructive"
                                }>
                                  {grade}
                                </Badge>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                    
                    {(!studentData.academicRecords || studentData.academicRecords.length === 0) && (
                      <p className="text-gray-500 text-sm italic text-center py-8">No academic records available</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
      
      {/* Add Skill Modal */}
      <AddSkillModal 
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        onSave={handleSaveSkill}
      />
      
      {/* Add Extracurricular Modal */}
      <AddExtracurricularModal
        isOpen={isExtracurricularModalOpen}
        onClose={() => setIsExtracurricularModalOpen(false)}
        onSave={handleSaveExtracurricular}
      />
    </motion.div>
  );
};

export default StudentProfile;


// // import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LogOut, Plus, Edit, Save, X, Camera } from 'lucide-react';
// import { useStudent } from '../context/userContext';
// import { updateStudent } from '../utils/userHandler';

// const AddSkillModal = ({ isOpen, onClose, onSave }) => {
//   const [skillName, setSkillName] = useState('');
//   const [proficiency, setProficiency] = useState('Beginner');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({ skillName, proficiency });
//     setSkillName('');
//     setProficiency('Beginner');
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-lg p-6 w-full max-w-md"
//       >
//         <h3 className="text-xl font-semibold mb-4">Add New Skill</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Skill Name</label>
//             <input
//               type="text"
//               value={skillName}
//               onChange={(e) => setSkillName(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Proficiency Level</label>
//             <select
//               value={proficiency}
//               onChange={(e) => setProficiency(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md"
//             >
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advanced">Advanced</option>
//             </select>
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded-md"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded-md"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// // New components for adding/editing extracurricular activities
// const AddExtracurricularModal = ({ isOpen, onClose, onSave }) => {
//   const [activityName, setActivityName] = useState('');
//   const [type, setType] = useState('');
//   const [position, setPosition] = useState('');
//   const [achievements, setAchievements] = useState('');
//   const [details, setDetails] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({ activityName, type, position, achievements, details });
//     setActivityName('');
//     setType('');
//     setPosition('');
//     setAchievements('');
//     setDetails('');
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-lg p-6 w-full max-w-md"
//       >
//         <h3 className="text-xl font-semibold mb-4">Add Extracurricular Activity</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Activity Name</label>
//             <input
//               type="text"
//               value={activityName}
//               onChange={(e) => setActivityName(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Type</label>
//             <input
//               type="text"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md"
//               placeholder="Sports, Academic, Cultural, etc."
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Position</label>
//             <input
//               type="text"
//               value={position}
//               onChange={(e) => setPosition(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md"
//               placeholder="Team Captain, Member, President, etc."
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Achievements</label>
//             <input
//               type="text"
//               value={achievements}
//               onChange={(e) => setAchievements(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Details</label>
//             <textarea
//               value={details}
//               onChange={(e) => setDetails(e.target.value)}
//               className="w-full px-3 py-2 border rounded-md"
//               rows="3"
//             ></textarea>
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded-md"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded-md"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// // StudentSearchModal Component for Teachers
// const StudentSearchModal = ({ isOpen, onClose, onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchType, setSearchType] = useState('enrollment');
//   const [course, setCourse] = useState('');
//   const [semester, setSemester] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (searchType === 'enrollment') {
//       onSearch({ type: searchType, enrollment: searchTerm });
//     } else {
//       onSearch({ type: searchType, course, semester });
//     }
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-lg p-6 w-full max-w-md"
//       >
//         <h3 className="text-xl font-semibold mb-4 text-purple-800">Search Students</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Search By</label>
//             <div className="flex space-x-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="searchType"
//                   value="enrollment"
//                   checked={searchType === 'enrollment'}
//                   onChange={() => setSearchType('enrollment')}
//                   className="mr-2 text-purple-600"
//                 />
//                 Enrollment
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="searchType"
//                   value="course"
//                   checked={searchType === 'course'}
//                   onChange={() => setSearchType('course')}
//                   className="mr-2 text-purple-600"
//                 />
//                 Course & Semester
//               </label>
//             </div>
//           </div>

//           {searchType === 'enrollment' ? (
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Enrollment Number</label>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 required
//               />
//             </div>
//           ) : (
//             <>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Course</label>
//                 <input
//                   type="text"
//                   value={course}
//                   onChange={(e) => setCourse(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Semester</label>
//                 <input
//                   type="text"
//                   value={semester}
//                   onChange={(e) => setSemester(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   required
//                   placeholder="e.g. 1st, 2nd, 3rd"
//                 />
//               </div>
//             </>
//           )}

//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded-md hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
//             >
//               <Search className="w-4 h-4 mr-1" />
//               Search
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// // Teacher Dashboard Component
// const TeacherDashboard = () => {
//   const navigate = useNavigate();
//   const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
//   const [students, setStudents] = useState([]);

//   const handleSearch = (searchParams) => {
//     // In a real application, you would make an API call to fetch students based on searchParams
//     // For this example, we'll just set some dummy data

//     setStudents([
//       {
//         _id: '1',
//         name: 'Rahul Sharma',
//         enrollment: 'MCA1001',
//         semester: '1st',
//         course: 'MCA'
//       },
//       {
//         _id: '2',
//         name: 'Priya Patel',
//         enrollment: 'MCA1002',
//         semester: '1st',
//         course: 'MCA'
//       },
//       {
//         _id: '3',
//         name: 'Amit Kumar',
//         enrollment: 'MCA1003',
//         semester: '1st',
//         course: 'MCA'
//       }
//     ]);
//   };

//   return (
//     <motion.div
//       className="container mx-auto p-4 bg-white rounded-lg shadow-md mt-20"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-purple-800 mb-2">Teacher Dashboard</h2>
//         <p className="text-gray-600">Manage your students and courses</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <motion.div
//           className="bg-purple-50 p-6 rounded-lg shadow border border-purple-100 cursor-pointer hover:shadow-lg transition-shadow"
//           whileHover={{ scale: 1.02 }}
//           onClick={() => navigate('/A-attendance')}
//         >
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-lg font-semibold text-purple-800">Attendance</h3>
//             <Calendar className="w-6 h-6 text-purple-600" />
//           </div>
//           <p className="text-sm text-gray-600">Mark and track student attendance</p>
//         </motion.div>

//         <motion.div
//           className="bg-purple-50 p-6 rounded-lg shadow border border-purple-100 cursor-pointer hover:shadow-lg transition-shadow"
//           whileHover={{ scale: 1.02 }}
//           onClick={() => navigate('/A-addCourses')}
//         >
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-lg font-semibold text-purple-800">Courses</h3>
//             <Book className="w-6 h-6 text-purple-600" />
//           </div>
//           <p className="text-sm text-gray-600">Manage and add courses</p>
//         </motion.div>

//         <motion.div
//           className="bg-purple-50 p-6 rounded-lg shadow border border-purple-100 cursor-pointer hover:shadow-lg transition-shadow"
//           whileHover={{ scale: 1.02 }}
//           onClick={() => navigate('/A-addMarks')}
//         >
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-lg font-semibold text-purple-800">Marks</h3>
//             <FileText className="w-6 h-6 text-purple-600" />
//           </div>
//           <p className="text-sm text-gray-600">Add and update student marks</p>
//         </motion.div>
//       </div>

//       <div className="bg-white border border-purple-100 rounded-lg shadow mb-8">
//         <div className="p-4 border-b border-purple-100 flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-purple-800">Students</h3>
//           <button
//             onClick={() => setIsSearchModalOpen(true)}
//             className="flex items-center px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
//           >
//             <Search className="w-4 h-4 mr-1" />
//             Search Students
//           </button>
//         </div>

//         {students.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-purple-50">
//                   <th className="text-left p-4 text-purple-800">Name</th>
//                   <th className="text-left p-4 text-purple-800">Enrollment</th>
//                   <th className="text-left p-4 text-purple-800">Course</th>
//                   <th className="text-left p-4 text-purple-800">Semester</th>
//                   <th className="text-center p-4 text-purple-800">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((student) => (
//                   <motion.tr
//                     key={student._id}
//                     className="border-b border-purple-50 hover:bg-purple-50 transition-colors"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <td className="p-4">{student.name}</td>
//                     <td className="p-4">{student.enrollment}</td>
//                     <td className="p-4">{student.course}</td>
//                     <td className="p-4">{student.semester}</td>
//                     <td className="p-4 text-center">
//                       <button
//                         onClick={() => navigate(`/student/${student._id}`)}
//                         className="text-purple-600 hover:text-purple-800"
//                       >
//                         View Profile
//                       </button>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="p-8 text-center text-gray-500">
//             <Users className="w-12 h-12 mx-auto text-gray-300 mb-2" />
//             <p>Search for students to see them here</p>
//           </div>
//         )}
//       </div>

//       <StudentSearchModal
//         isOpen={isSearchModalOpen}
//         onClose={() => setIsSearchModalOpen(false)}
//         onSearch={handleSearch}
//       />
//     </motion.div>
//   );
// };

// const StudentProfile = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [studentData, setStudentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('skills');
//   const { student } = useStudent();


//   const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
//   const [isExtracurricularModalOpen, setIsExtracurricularModalOpen] = useState(false);
//   const fileInputRef = React.useRef(null);
//   const [isHoveringProfilePic, setIsHoveringProfilePic] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);



//   const handleProfileImageChange = async (e) => {
//     if (e.target.files && e.target.files[0]) {

//       const file = e.target.files[0];
//       // console.log(file);
//       setProfileImage(URL.createObjectURL(file));
//       const formData = new FormData();
//       formData.append("avatar", file);
//       let data = await updateStudent(formData);
//       if (data) {
//         // toast.success(data);
//         alert(data);
//       }

//     }
//   };
//   const handleSaveSkill = async (skillData) => {
//     try {
//       // API call to save skill would go here
//       // For now, we'll just update the local state to show immediate feedback
//       const newSkill = {
//         skillName: skillData.skillName,
//         proficiency: skillData.proficiency
//       };

//       setStudentData(prev => ({
//         ...prev,
//         skills: [...prev.skills, newSkill]
//       }));

//       // Toast or notification could be added here
//     } catch (error) {
//       console.error('Error saving skill:', error);
//       // Display error message to user
//     }
//   };

//   // Handler for saving new extracurricular activities
//   const handleSaveExtracurricular = async (activityData) => {
//     try {
//       // API call to save extracurricular activity would go here
//       // For now, we'll just update the local state to show immediate feedback
//       const newActivity = {
//         activityName: activityData.activityName,
//         type: activityData.type,
//         position: activityData.position,
//         achievements: activityData.achievements,
//         details: activityData.details
//       };

//       setStudentData(prev => ({
//         ...prev,
//         extracurricularActivities: [...prev.extracurricularActivities, newActivity]
//       }));

//       // Toast or notification could be added here
//     } catch (error) {
//       console.error('Error saving extracurricular activity:', error);
//       // Display error message to user
//     }
//   };

//   // Dummy studentData data for testing StudentProfile component
//   // const studentData = {
//   //   id: "S12345",
//   //   name: "Alex Johnson",
//   //   grade: "11th Grade",
//   //   email: "alex.johnson@school.edu",
//   //   phone: "(555) 123-4567",
//   //   age: 17,

//   //   // Academic records with various subjects and performance
//   //   academicRecords: [
//   //     {
//   //       subject: "Mathematics",
//   //       code: "MATH301",
//   //       marks: 92,
//   //       totalMarks: 100,
//   //       grade: "A",
//   //       year: "2024"
//   //     },
//   //     {
//   //       subject: "Physics",
//   //       code: "PHYS201",
//   //       marks: 85,
//   //       totalMarks: 100,
//   //       grade: "B+",
//   //       year: "2024"
//   //     },
//   //     {
//   //       subject: "English Literature",
//   //       code: "ENG205",
//   //       marks: 88,
//   //       totalMarks: 100,
//   //       grade: "B+",
//   //       year: "2024"
//   //     },
//   //     {
//   //       subject: "Computer Science",
//   //       code: "CS101",
//   //       marks: 95,
//   //       totalMarks: 100,
//   //       grade: "A",
//   //       year: "2024"
//   //     },
//   //     {
//   //       subject: "History",
//   //       code: "HIST103",
//   //       marks: 78,
//   //       totalMarks: 100,
//   //       grade: "C+",
//   //       year: "2024"
//   //     }
//   //   ],

//   //   // Skills with different proficiency levels
//   //   skills: [
//   //     {
//   //       skillName: "Programming",
//   //       proficiency: "Advanced"
//   //     },
//   //     {
//   //       skillName: "Mathematics",
//   //       proficiency: "Advanced"
//   //     },
//   //     {
//   //       skillName: "Public Speaking",
//   //       proficiency: "Intermediate"
//   //     },
//   //     {
//   //       skillName: "Creative Writing",
//   //       proficiency: "Intermediate"
//   //     },
//   //     {
//   //       skillName: "Critical Thinking",
//   //       proficiency: "Advanced"
//   //     },
//   //     {
//   //       skillName: "Graphic Design",
//   //       proficiency: "Beginner"
//   //     }
//   //   ],

//   //   // Courses with varied statuses and details
//   //   courses: [
//   //     {
//   //       courseName: "Advanced Calculus",
//   //       institution: "City High School",
//   //       department: "Mathematics",
//   //       duration: "1 semester",
//   //       completionStatus: "Completed",
//   //       amount: 250
//   //     },
//   //     {
//   //       courseName: "Web Development Fundamentals",
//   //       institution: "Online Learning Platform",
//   //       department: "Computer Science",
//   //       duration: "3 months",
//   //       completionStatus: "Completed",
//   //       amount: 120
//   //     },
//   //     {
//   //       courseName: "Creative Writing Workshop",
//   //       institution: "Community College",
//   //       department: "English",
//   //       duration: "6 weeks",
//   //       completionStatus: "In Progress",
//   //       amount: 80
//   //     },
//   //     {
//   //       courseName: "AP Physics",
//   //       institution: "City High School",
//   //       department: "Science",
//   //       duration: "2 semesters",
//   //       completionStatus: "In Progress",
//   //       amount: 300
//   //     }
//   //   ],

//   //   // Extracurricular activities
//   //   extracurricularActivities: [
//   //     {
//   //       activityName: "Robotics Club",
//   //       type: "Academic Club",
//   //       position: "Team Captain",
//   //       achievements: "1st Place in Regional Competition 2024",
//   //       details: "Led a team of 5 students to design and program a robot for competition tasks."
//   //     },
//   //     {
//   //       activityName: "Debate Team",
//   //       type: "Academic",
//   //       position: "Member",
//   //       achievements: "Semifinalist in State Competition",
//   //       details: "Participated in 12 debates throughout the school year, specializing in political and ethical topics."
//   //     },
//   //     {
//   //       activityName: "Basketball Team",
//   //       type: "Sports",
//   //       position: "Point Guard",
//   //       achievements: "Team MVP 2023",
//   //       details: "Practice 3 times per week, participated in district championship."
//   //     },
//   //     {
//   //       activityName: "Environmental Club",
//   //       type: "Service",
//   //       position: "Secretary",
//   //       achievements: "Organized campus-wide recycling initiative",
//   //       details: "Helped reduce school waste by 30% through educational campaigns and infrastructure improvements."
//   //     }
//   //   ],

//   //   // Attendance records with different statuses
//   //   attendance: [
//   //     {
//   //       date: "2024-02-01",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-02",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-05",
//   //       status: "Absent"
//   //     },
//   //     {
//   //       date: "2024-02-06",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-07",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-08",
//   //       status: "Late"
//   //     },
//   //     {
//   //       date: "2024-02-09",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-12",
//   //       status: "Excused"
//   //     },
//   //     {
//   //       date: "2024-02-13",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-14",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-15",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-16",
//   //       status: "Late"
//   //     },
//   //     {
//   //       date: "2024-02-19",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-20",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-21",
//   //       status: "Absent"
//   //     },
//   //     {
//   //       date: "2024-02-22",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-23",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-26",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-27",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-28",
//   //       status: "Present"
//   //     },
//   //     {
//   //       date: "2024-02-29",
//   //       status: "Excused"
//   //     }
//   //   ]
//   // };

//   // Use this code to load the dummy data in your component
//   // Replace the axios fetch in the useEffect with:

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         setLoading(true);
//         // Using the actual student data from the context
//         setTimeout(() => {
//           setStudentData(student);
//           setLoading(false);
//         }, 500);
//       } catch (err) {
//         setError('Failed to fetch student data');
//         setLoading(false);
//       }
//     };

//     fetchStudentData();
//   }, [id, student]);

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//       <p className="ml-2 text-purple-700">Loading profile...</p>
//     </div>
//   );

//   if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
//   if (!studentData) return <div className="text-center p-4">No student found with this ID.</div>;

//   // Calculate overall academic performance
//   const calculateOverallPerformance = () => {
//     if (!studentData.academicRecords || studentData.academicRecords.length === 0) return 0;

//     const totalPercentage = studentData.academicRecords.reduce((sum, record) => {
//       return sum + (record.marks / record.totalMarks) * 100;
//     }, 0);

//     return (totalPercentage / studentData.academicRecords.length).toFixed(2);
//   };

//   // Calculate attendance percentage
//   const calculateAttendancePercentage = () => {
//     if (!studentData.attendance || studentData.attendance.length === 0) return 0;

//     const presentCount = studentData.attendance.filter(
//       record => record.status === "Present" || record.status === "Late"
//     ).length;

//     return ((presentCount / studentData.attendance.length) * 100).toFixed(2);
//   };

//   // Get attendance status counts
//   const getAttendanceStatusCounts = () => {
//     if (!studentData.attendance) return {};

//     return studentData.attendance.reduce((counts, record) => {
//       counts[record.status] = (counts[record.status] || 0) + 1;
//       return counts;
//     }, {});
//   };



//   const attendanceStatusCounts = getAttendanceStatusCounts();
//   const overallPerformance = calculateOverallPerformance();
//   const attendancePercentage = calculateAttendancePercentage();

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//   };

//   const tabVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
//   };

//   // Custom Card Component
//   const Card = ({ children, className }) => (
//     <motion.div
//       variants={itemVariants}
//       className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
//     >
//       {children}
//     </motion.div>
//   );

//   // Custom CardHeader Component
//   const CardHeader = ({ children }) => (
//     <div className="px-6 py-4 border-b border-gray-200">
//       {children}
//     </div>
//   );

//   // Custom CardTitle Component
//   const CardTitle = ({ children }) => (
//     <h3 className="text-xl font-semibold text-gray-800">
//       {children}
//     </h3>
//   );

//   // Custom CardContent Component
//   const CardContent = ({ children, className }) => (
//     <div className={`p-6 ${className}`}>
//       {children}
//     </div>
//   );

//   // Custom Progress Component
//   const Progress = ({ value, className }) => (
//     <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
//       <motion.div
//         className="bg-blue-500 h-full"
//         initial={{ width: 0 }}
//         animate={{ width: `${value}%` }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       />
//     </div>
//   );

//   // Custom Badge Component
//   const Badge = ({ children, variant }) => {
//     let bgColor = "bg-gray-100 text-gray-800";

//     if (variant === "default") bgColor = "bg-blue-100 text-blue-800";
//     if (variant === "outline") bgColor = "bg-white text-gray-800 border border-gray-300";
//     if (variant === "secondary") bgColor = "bg-purple-100 text-purple-800";
//     if (variant === "success") bgColor = "bg-green-100 text-green-800";
//     if (variant === "destructive") bgColor = "bg-red-100 text-red-800";
//     if (variant === "warning") bgColor = "bg-yellow-100 text-yellow-800";

//     return (
//       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
//         {children}
//       </span>
//     );
//   };

//   // Custom Tabs System
//   const TabsList = ({ children }) => (
//     <div className="flex space-x-1 border-b border-gray-200 mb-4">
//       {children}
//     </div>
//   );

//   const TabsTrigger = ({ value, active, onClick, children }) => (
//     <button
//       onClick={onClick}
//       className={`px-4 py-2 font-medium text-sm rounded-t-lg ${active ? 'bg-white border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
//         }`}
//     >
//       {children}
//     </button>
//   );

//   return (
//     <motion.div
//       className="container mx-auto p-4"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >


//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-20">
//         {/* studentData Basic Info Card */}
//         <Card className="lg:col-span-1">
//           <CardHeader>
//             <CardTitle>Student Information</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {/* Replace the existing profile circle div with this */}
//               <motion.div
//                 className="relative h-32 w-32 mx-auto rounded-full overflow-hidden flex items-center justify-center text-3xl font-bold text-gray-600"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 0.5, type: "spring" }}
//                 onMouseEnter={() => setIsHoveringProfilePic(true)}
//                 onMouseLeave={() => setIsHoveringProfilePic(false)}
//                 onClick={() => fileInputRef.current.click()}
//                 style={{ cursor: 'pointer' }}
//               >
//                 {profileImage ? (
//                   <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
//                 ) : studentData.profilePic ? (
//                   <img src={studentData.profilePic} alt="Profile" className="h-full w-full object-cover" />
//                 ) : (
//                   <div className="h-full w-full bg-gray-200 flex items-center justify-center">
//                     {studentData?.name?.charAt(0)}
//                   </div>
//                 )}

//                 {/* Camera icon overlay on hover */}
//                 {isHoveringProfilePic && (
//                   <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                     <Camera className="text-white w-10 h-10" />
//                   </div>
//                 )}

//                 {/* Hidden file input */}
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleProfileImageChange}
//                 />
//               </motion.div>

//               <div className="text-center">
//                 <motion.h2
//                   className="text-2xl font-bold"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   {studentData.name}
//                 </motion.h2>
//                 <motion.p
//                   className="text-gray-500"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   Grade: {studentData.grade}
//                 </motion.p>
//               </div>

//               <div className="pt-4 space-y-2">
//                 <motion.div
//                   className="flex justify-between"
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.5 }}
//                 >
//                   <span className="font-medium">Email:</span>
//                   <span>{studentData.email}</span>
//                 </motion.div>
//                 <motion.div
//                   className="flex justify-between"
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.6 }}
//                 >
//                   <span className="font-medium">Phone:</span>
//                   <span>{studentData.phone}</span>
//                 </motion.div>
//                 <motion.div
//                   className="flex justify-between"
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.7 }}
//                 >
//                   <span className="font-medium">Age:</span>
//                   <span>{studentData.age} years</span>
//                 </motion.div>
                
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Academic Performance Card */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle>Academic Performance</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="mb-6">
//               <div className="flex justify-between mb-2">
//                 <span className="font-medium">Overall Performance</span>
//                 <motion.span
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   {overallPerformance}%
//                 </motion.span>
//               </div>
//               <Progress value={overallPerformance} className="h-2" />
//             </div>

//             <div className="space-y-4">
//               {studentData.academicRecords && studentData.academicRecords.length > 0 ? (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b">
//                         <th className="text-left p-2">Subject</th>
//                         <th className="text-left p-2">Code</th>
//                         <th className="text-left p-2">Marks</th>
//                         <th className="text-left p-2">Grade</th>
//                         <th className="text-left p-2">Year</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {studentData.academicRecords.map((record, index) => (
//                         <motion.tr
//                           key={index}
//                           className="border-b"
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.1 * index }}
//                         >
//                           <td className="p-2">{record.subject}</td>
//                           <td className="p-2">{record.code}</td>
//                           <td className="p-2">{record.marks}/{record.totalMarks}</td>
//                           <td className="p-2">{record.grade}</td>
//                           <td className="p-2">{record.year}</td>
//                         </motion.tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <p className="text-center text-gray-500">No academic records available.</p>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>







//       {/* Additional Information Tabs */}
//       <div className="mt-6">
//         <TabsList>
//           <TabsTrigger value="skills" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')}>Skills</TabsTrigger>
//           <TabsTrigger value="courses" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')}>Courses</TabsTrigger>
//           <TabsTrigger value="extracurricular" active={activeTab === 'extracurricular'} onClick={() => setActiveTab('extracurricular')}>Extracurricular</TabsTrigger>
//           <TabsTrigger value="attendance" active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')}>Attendance</TabsTrigger>
//         </TabsList>

//         <AnimatePresence mode="wait">
//           {/* Skills Tab */}
//           {activeTab === 'skills' && (
//             <motion.div
//               key="skills"
//               variants={tabVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//               className="p-4 border rounded-md"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-semibold">Skills & Proficiencies</h3>
//                 <button
//                   onClick={() => setIsSkillModalOpen(true)}
//                   className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                   <Plus className="w-4 h-4 mr-1" />
//                   Add Skill
//                 </button>
//               </div>

//               {studentData?.skills && studentData.skills.length > 0 ? (
//                 <motion.div
//                   className="grid grid-cols-1 md:grid-cols-3 gap-4"
//                   variants={containerVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   {studentData.skills.map((skill, index) => (
//                     <Card key={index}>
//                       <CardContent className="p-4">
//                         <div className="flex justify-between items-center">
//                           <h4 className="font-medium">{skill.skillName}</h4>
//                           <Badge variant={
//                             skill.proficiency === "Beginner" ? "outline" :
//                               skill.proficiency === "Intermediate" ? "secondary" :
//                                 "default"
//                           }>
//                             {skill.proficiency}
//                           </Badge>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </motion.div>
//               ) : (
//                 <p className="text-center text-gray-500">No skills recorded yet. Add your first skill!</p>
//               )}
//             </motion.div>
//           )}


//           {/* Courses Tab */}
//           {activeTab === 'courses' && (
//             <motion.div
//               key="courses"
//               variants={tabVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//               className="p-4 border rounded-md"
//             >
//               <h3 className="text-xl font-semibold mb-4">Enrolled Courses</h3>
//               {studentData.courses && studentData.courses.length > 0 ? (
//                 <motion.div
//                   className="space-y-4"
//                   variants={containerVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   {studentData.courses.map((course, index) => (
//                     <Card key={index}>
//                       <CardContent className="p-4">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h4 className="font-semibold text-lg">{course.courseName}</h4>
//                             <p className="text-gray-500">{course.institution} - {course.department}</p>
//                             <p>Duration: {course.duration}</p>
//                           </div>
//                           <div className="text-right">
//                             <Badge variant={course.completionStatus === "Completed" ? "default" : "outline"}>
//                               {course.completionStatus}
//                             </Badge>
//                             <p className="mt-2">Fee: ${course.amount}</p>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </motion.div>
//               ) : (
//                 <p className="text-center text-gray-500">No courses enrolled.</p>
//               )}
//             </motion.div>
//           )}

//           {/* Extracurricular Tab */}
//           {activeTab === 'extracurricular' && (
//             <motion.div
//               key="extracurricular"
//               variants={tabVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//               className="p-4 border rounded-md"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-semibold">Extracurricular Activities</h3>
//                 <button
//                   onClick={() => setIsExtracurricularModalOpen(true)}
//                   className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                   <Plus className="w-4 h-4 mr-1" />
//                   Add Activity
//                 </button>
//               </div>

//               {studentData?.extracurricularActivities && studentData.extracurricularActivities.length > 0 ? (
//                 <motion.div
//                   className="grid grid-cols-1 md:grid-cols-2 gap-4"
//                   variants={containerVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   {studentData.extracurricularActivities.map((activity, index) => (
//                     <Card key={index}>
//                       <CardContent className="p-4">
//                         <h4 className="font-semibold">{activity.activityName}</h4>
//                         {activity.type && <p className="text-sm text-gray-500">Type: {activity.type}</p>}
//                         {activity.position && <p>Position: {activity.position}</p>}
//                         {activity.achievements && (
//                           <div className="mt-2">
//                             <p className="font-medium">Achievements:</p>
//                             <p>{activity.achievements}</p>
//                           </div>
//                         )}
//                         {activity.details && (
//                           <div className="mt-2 text-sm text-gray-600">
//                             <p>{activity.details}</p>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </motion.div>
//               ) : (
//                 <p className="text-center text-gray-500">No extracurricular activities recorded. Add your first activity!</p>
//               )}
//             </motion.div>
//           )}

//           {/* Attendance Tab */}
//           {activeTab === 'attendance' && (
//             <motion.div
//               key="attendance"
//               variants={tabVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//               className="p-4 border rounded-md"
//             >
//               <h3 className="text-xl font-semibold mb-4">Attendance Record</h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Attendance Summary</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="mb-4">
//                       <div className="flex justify-between mb-2">
//                         <span className="font-medium">Attendance Rate</span>
//                         <span>{attendancePercentage}%</span>
//                       </div>
//                       <Progress value={attendancePercentage} className="h-2" />
//                     </div>

//                     <motion.div
//                       className="grid grid-cols-2 gap-2"
//                       variants={containerVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <motion.div className="flex items-center" variants={itemVariants}>
//                         <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
//                         <span>Present: {attendanceStatusCounts.Present || 0}</span>
//                       </motion.div>
//                       <motion.div className="flex items-center" variants={itemVariants}>
//                         <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
//                         <span>Absent: {attendanceStatusCounts.Absent || 0}</span>
//                       </motion.div>
//                       <motion.div className="flex items-center" variants={itemVariants}>
//                         <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
//                         <span>Late: {attendanceStatusCounts.Late || 0}</span>
//                       </motion.div>
//                       <motion.div className="flex items-center" variants={itemVariants}>
//                         <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
//                         <span>Excused: {attendanceStatusCounts.Excused || 0}</span>
//                       </motion.div>
//                     </motion.div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Recent Attendance</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     {studentData.attendance && studentData.attendance.length > 0 ? (
//                       <div className="max-h-64 overflow-y-auto">
//                         <table className="w-full">
//                           <thead>
//                             <tr className="border-b">
//                               <th className="text-left p-2">Date</th>
//                               <th className="text-left p-2">Status</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {studentData.attendance.slice(0, 10).map((record, index) => (
//                               <motion.tr
//                                 key={index}
//                                 className="border-b"
//                                 initial={{ opacity: 0, x: -10 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: index * 0.05 }}
//                               >
//                                 <td className="p-2">{new Date(record.date).toLocaleDateString()}</td>
//                                 <td className="p-2">
//                                   <Badge variant={
//                                     record.status === "Present" ? "success" :
//                                       record.status === "Absent" ? "destructive" :
//                                         record.status === "Late" ? "warning" : "default"
//                                   }>
//                                     {record.status}
//                                   </Badge>
//                                 </td>
//                               </motion.tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     ) : (
//                       <p className="text-center text-gray-500">No attendance records available.</p>
//                     )}
//                   </CardContent>
//                 </Card>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Career Recommendations Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.8, duration: 0.5 }}
//       >
//         <Card className="mt-6">
//           <CardHeader>
//             <CardTitle>Career Path Recommendations</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <motion.div
//               className="p-4 bg-blue-50 rounded-md border border-blue-200 mb-4"
//               initial={{ scale: 0.95 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 1, duration: 0.3 }}
//             >
//               <h4 className="font-medium text-blue-700 mb-2">Based on your academic performance and skills:</h4>
//               <p>The system will analyze your data to provide personalized career recommendations.</p>
//             </motion.div>

//             <motion.div
//               className="grid grid-cols-1 md:grid-cols-3 gap-4"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <Card>
//                 <CardContent className="p-4">
//                   <h4 className="font-semibold mb-2">Recommended Fields</h4>
//                   <p className="text-gray-500 text-sm">Based on your strengths and interests</p>
//                   <p className="italic text-sm mt-2">Analysis will appear here</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="p-4">
//                   <h4 className="font-semibold mb-2">Suggested Courses</h4>
//                   <p className="text-gray-500 text-sm">To enhance your skill set</p>
//                   <p className="italic text-sm mt-2">Recommendations will appear here</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="p-4">
//                   <h4 className="font-semibold mb-2">Development Areas</h4>
//                   <p className="text-gray-500 text-sm">Areas that need improvement</p>
//                   <p className="italic text-sm mt-2">Suggestions will appear here</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </CardContent>
//         </Card>
//       </motion.div>
//       <AddSkillModal
//         isOpen={isSkillModalOpen}
//         onClose={() => setIsSkillModalOpen(false)}
//         onSave={handleSaveSkill}
//       />

//       <AddExtracurricularModal
//         isOpen={isExtracurricularModalOpen}
//         onClose={() => setIsExtracurricularModalOpen(false)}
//         onSave={handleSaveExtracurricular}
//       />
//         {/* Add Skill Modal */}
//         <AddSkillModal 
//         isOpen={isSkillModalOpen}
//         onClose={() => setIsSkillModalOpen(false)}
//         onSave={handleSaveSkill}
//       />
      
//       {/* Add Extracurricular Modal */}
//       <AddExtracurricularModal
//         isOpen={isExtracurricularModalOpen}
//         onClose={() => setIsExtracurricularModalOpen(false)}
//         onSave={handleSaveExtracurricular}
//       />
//     </motion.div>
//   );
// };

// export default StudentProfile;

// this is student format that is coming from useStudent();
// {_id: '67e7fdccb8b78f2d5e874aa1', name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '9876543210', password: '$2a$13$v.8vmVCvP6P.jcCs9alyE.gPpKTs4IaYJkMOy8PdTVBHxPd6L6Ria', …}
// academicRecords
// :
// Array(5)
// 0
// :
// {marks: 90, totalMarks: 100, subjectId: {…}, grade: 'N/A', _id: '67e7fdccb8b78f2d5e874aa2'}
// 1
// :
// {marks: 81, totalMarks: 100, subjectId: {…}, grade: 'N/A', _id: '67e7fdccb8b78f2d5e874aa3'}
// 2
// :
// {marks: 47, totalMarks: 100, subjectId: {…}, grade: 'N/A', _id: '67e7fdccb8b78f2d5e874aa4'}
// 3
// :
// {marks: 99, totalMarks: 100, subjectId: {…}, grade: 'N/A', _id: '67e7fdccb8b78f2d5e874aa5'}
// 4
// :
// {marks: 60, totalMarks: 100, subjectId: {…}, grade: 'N/A', _id: '67e7fdccb8b78f2d5e874aa6'}
// length
// :
// 5
// [[Prototype]]
// :
// Array(0)
// age
// :
// 22
// attendance
// :
// Array(19)
// 0
// :
// {_id: '67ea5da340c0427ecf442f04', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-03-30T18:30:00.000Z', timeIn: '02:40 PM', …}
// 1
// :
// {_id: '67ea5df040c0427ecf442fac', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-03-30T18:30:00.000Z', timeIn: '02:48 PM', …}
// 2
// :
// {_id: '67ea5e4e40c0427ecf443054', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-03-30T18:30:00.000Z', timeIn: '02:50 PM', …}
// 3
// :
// {_id: '67ea5ea140c0427ecf443086', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-03-29T18:30:00.000Z', timeIn: '02:50 PM', …}
// 4
// :
// {_id: '67ea5eab40c0427ecf4430b8', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-03-28T18:30:00.000Z', timeIn: '02:50 PM', …}
// 5
// :
// {_id: '67ea5ec340c0427ecf4430ea', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-03-28T18:30:00.000Z', timeIn: '02:50 PM', …}
// 6
// :
// {_id: '67ea5ecf40c0427ecf44311c', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-03-29T18:30:00.000Z', timeIn: '02:50 PM', …}
// 7
// :
// {_id: '67ede83e77279abcf2061ebe', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-04-02T07:00:00.000Z', timeIn: '06:45 PM', …}
// 8
// :
// {_id: '67ede85b77279abcf2061ef0', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-04-01T07:00:00.000Z', timeIn: '06:45 PM', …}
// 9
// :
// {_id: '67ede86777279abcf2061f18', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-04-05T07:00:00.000Z', timeIn: '06:45 PM', …}
// 10
// :
// {_id: '67f28567a301a25781f05616', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-04-05T18:30:00.000Z', timeIn: null, …}
// 11
// :
// {_id: '67f2856da301a25781f0561e', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-04-05T18:30:00.000Z', timeIn: null, …}
// 12
// :
// {_id: '67f28571a301a25781f0562d', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-04-05T18:30:00.000Z', timeIn: null, …}
// 13
// :
// {_id: '67f28576a301a25781f056ac', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-04-05T18:30:00.000Z', timeIn: null, …}
// 14
// :
// {_id: '67f2857aa301a25781f056de', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-04-05T18:30:00.000Z', timeIn: null, …}
// 15
// :
// {_id: '67f285a9a301a25781f0578f', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-04-04T18:30:00.000Z', timeIn: null, …}
// 16
// :
// {_id: '67f285b1a301a25781f057c1', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-04-04T18:30:00.000Z', timeIn: null, …}
// 17
// :
// {_id: '67f285b6a301a25781f057f3', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-04-04T18:30:00.000Z', timeIn: null, …}
// 18
// :
// {_id: '67f285baa301a25781f05825', studentEnroll: 'MCA1001', courseId: '67e78c853fb39fa1ee791d1a', date: '2025-04-04T18:30:00.000Z', timeIn: null, …}
// length
// :
// 19
// [[Prototype]]
// :
// Array(0)
// course
// :
// amount
// :
// "90000"
// courseCode
// :
// "MCA202"
// courseName
// :
// "MCA"
// createdAt
// :
// "2025-03-29T06:00:37.715Z"
// department
// :
// "Computer Applications"
// duration
// :
// "3 Years"
// headOfDepartment
// :
// "Dr. Pooja Sharma"
// institution
// :
// "MIT University"
// subjects
// :
// (30) ['67e7b0054b651807c98a452b', '67e7b0054b651807c98a452c', '67e7b0054b651807c98a452d', '67e7b0054b651807c98a452e', '67e7b0054b651807c98a452f', '67e7b0054b651807c98a4530', '67e7b0054b651807c98a4531', '67e7b0054b651807c98a4532', '67e7b0054b651807c98a4533', '67e7b0054b651807c98a4534', '67e7b0054b651807c98a4535', '67e7b0054b651807c98a4536', '67e7b0054b651807c98a4537', '67e7b0054b651807c98a4538', '67e7b0054b651807c98a4539', '67e7b0054b651807c98a453a', '67e7b0054b651807c98a453b', '67e7b0054b651807c98a453c', '67e7b0054b651807c98a453d', '67e7b0054b651807c98a453e', '67e7b0054b651807c98a453f', '67e7b0054b651807c98a4540', '67e7b0054b651807c98a4541', '67e7b0054b651807c98a4542', '67e7b0054b651807c98a4543', '67e7b0054b651807c98a4544', '67e7b0054b651807c98a4545', '67e7b0054b651807c98a4546', '67e7b0054b651807c98a4547', '67e7b0054b651807c98a4548']
// totalSemisters
// :
// 6
// updatedAt
// :
// "2025-03-29T08:32:08.263Z"
// __v
// :
// 0
// _id
// :
// "67e78c853fb39fa1ee791d1a"
// [[Prototype]]
// :
// Object
// createdAt
// :
// "2025-03-29T14:03:56.437Z"
// email
// :
// "rahul.sharma@example.com"
// enrollment
// :
// "MCA1001"
// extracurricularActivities
// :
// []
// grade
// :
// "N/A"
// name
// :
// "Rahul Sharma"
// password
// :
// "$2a$13$v.8vmVCvP6P.jcCs9alyE.gPpKTs4IaYJkMOy8PdTVBHxPd6L6Ria"
// phone
// :
// "9876543210"
// profilePic
// :
// ""
// semester
// :
// "1st"
// skills
// :
// []
// updatedAt
// :
// "2025-04-06T13:46:34.843Z"
// userType
// :
// "student"
// __v
// :
// 0
// _id
// :
// "67e7fdccb8b78f2d5e874aa1"
// [[Prototype]]
// :
// Object

// In this  profile page add options to add Skills and extracurricular activities by studentData and also add logout button using following schemas.
// Do not show all the component only show changes that you made.

// I am creating "studentData Carrer Counselling using academic performance data analysis" project using MERN.
// const studentSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String},
//     password: { type: String, required: true },
//     age: { type: Number },
//     grade: { type: String },
//     profilePic : {type : String},
//     enrollment : {type : String , required : true},
//     type : {type : String , required : true},
//     academicRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "Academic" }],
//     skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skills" }],
//     extracurricularActivities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Extracurricular" }],
//     courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
//     attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
//   },
//   { timestamps: true }
// );

// const studentData = mongoose.model("studentData", studentSchema);
// export default studentData;
//   const academicSchema = new mongoose.Schema(   {     studentId: { type: mongoose.Schema.Types.ObjectId, ref: "studentData", required: true },     subject: { type: String, required: true },     code : {type :String , required : true},     marks: { type: Number, required: true },     totalMarks: { type: Number, required: true },     grade: { type: String, required: true },     year: { type: Number, required: true },   }, const attendanceSchema = new mongoose.Schema(   {     studentId: {       type: mongoose.Schema.Types.ObjectId,       ref: "studentData",       required: true,     },     date: {       type: Date,       required: true,     },     status: {       type: String,       enum: ["Present", "Absent", "Late", "Excused"],       required: true,     },   }, const courseSchema = new mongoose.Schema(   {     studentId: { type: mongoose.Schema.Types.ObjectId, ref: "studentData", required: true },     courseName: { type: String, required: true },     institution: { type: String, required: true },     amount: { type: Number, required: true },     department: { type: String, required: true },     duration: { type: String, required: true },     completionStatus: { type: String, enum: ["Ongoing", "Completed"],default: "Ongoing" },   }, const extracurricularSchema = new mongoose.Schema(   {     studentId: { type: mongoose.Schema.Types.ObjectId, ref: "studentData", required: true },     activityName: { type: String, required: true },     type : {type : String},     position: { type: String },     achievements: { type: String },     details : {type : String}   },  const skillsSchema = new mongoose.Schema(   {     studentId: { type: mongoose.Schema.Types.ObjectId, ref: "studentData", required: true },     skillName: { type: String, required: true },     proficiency: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },   },   { timestamps: true } );  const Skills = mongoose.model("Skills", skillsSchema); export default Skills;