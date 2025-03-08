import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Plus, Edit, Save, X } from 'lucide-react';

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
        <h3 className="text-xl font-semibold mb-4">Add New Skill</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Skill Name</label>
            <input
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Proficiency Level</label>
            <select
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
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
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// New components for adding/editing extracurricular activities
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
        <h3 className="text-xl font-semibold mb-4">Add Extracurricular Activity</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Activity Name</label>
            <input
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Sports, Academic, Cultural, etc."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Team Captain, Member, President, etc."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Achievements</label>
            <input
              type="text"
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('skills');


  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isExtracurricularModalOpen, setIsExtracurricularModalOpen] = useState(false);
  

  const handleLogout = () => {
    // Clear local storage, cookies, or any auth tokens
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  const handleSaveSkill = async (skillData) => {
    try {
      // API call to save skill would go here
      // For now, we'll just update the local state to show immediate feedback
      const newSkill = {
        skillName: skillData.skillName,
        proficiency: skillData.proficiency
      };
      
      setStudent(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      
      // Toast or notification could be added here
    } catch (error) {
      console.error('Error saving skill:', error);
      // Display error message to user
    }
  };
  
  // Handler for saving new extracurricular activities
  const handleSaveExtracurricular = async (activityData) => {
    try {
      // API call to save extracurricular activity would go here
      // For now, we'll just update the local state to show immediate feedback
      const newActivity = {
        activityName: activityData.activityName,
        type: activityData.type,
        position: activityData.position,
        achievements: activityData.achievements,
        details: activityData.details
      };
      
      setStudent(prev => ({
        ...prev,
        extracurricularActivities: [...prev.extracurricularActivities, newActivity]
      }));
      
      // Toast or notification could be added here
    } catch (error) {
      console.error('Error saving extracurricular activity:', error);
      // Display error message to user
    }
  };

// Dummy student data for testing StudentProfile component
const studentData = {
  id: "S12345",
  name: "Alex Johnson",
  grade: "11th Grade",
  email: "alex.johnson@school.edu",
  phone: "(555) 123-4567",
  age: 17,
  
  // Academic records with various subjects and performance
  academicRecords: [
    {
      subject: "Mathematics",
      code: "MATH301",
      marks: 92,
      totalMarks: 100,
      grade: "A",
      year: "2024"
    },
    {
      subject: "Physics",
      code: "PHYS201",
      marks: 85,
      totalMarks: 100,
      grade: "B+",
      year: "2024"
    },
    {
      subject: "English Literature",
      code: "ENG205",
      marks: 88,
      totalMarks: 100,
      grade: "B+",
      year: "2024"
    },
    {
      subject: "Computer Science",
      code: "CS101",
      marks: 95,
      totalMarks: 100,
      grade: "A",
      year: "2024"
    },
    {
      subject: "History",
      code: "HIST103",
      marks: 78,
      totalMarks: 100,
      grade: "C+",
      year: "2024"
    }
  ],
  
  // Skills with different proficiency levels
  skills: [
    {
      skillName: "Programming",
      proficiency: "Advanced"
    },
    {
      skillName: "Mathematics",
      proficiency: "Advanced"
    },
    {
      skillName: "Public Speaking",
      proficiency: "Intermediate"
    },
    {
      skillName: "Creative Writing",
      proficiency: "Intermediate"
    },
    {
      skillName: "Critical Thinking",
      proficiency: "Advanced"
    },
    {
      skillName: "Graphic Design",
      proficiency: "Beginner"
    }
  ],
  
  // Courses with varied statuses and details
  courses: [
    {
      courseName: "Advanced Calculus",
      institution: "City High School",
      department: "Mathematics",
      duration: "1 semester",
      completionStatus: "Completed",
      amount: 250
    },
    {
      courseName: "Web Development Fundamentals",
      institution: "Online Learning Platform",
      department: "Computer Science",
      duration: "3 months",
      completionStatus: "Completed",
      amount: 120
    },
    {
      courseName: "Creative Writing Workshop",
      institution: "Community College",
      department: "English",
      duration: "6 weeks",
      completionStatus: "In Progress",
      amount: 80
    },
    {
      courseName: "AP Physics",
      institution: "City High School",
      department: "Science",
      duration: "2 semesters",
      completionStatus: "In Progress",
      amount: 300
    }
  ],
  
  // Extracurricular activities
  extracurricularActivities: [
    {
      activityName: "Robotics Club",
      type: "Academic Club",
      position: "Team Captain",
      achievements: "1st Place in Regional Competition 2024",
      details: "Led a team of 5 students to design and program a robot for competition tasks."
    },
    {
      activityName: "Debate Team",
      type: "Academic",
      position: "Member",
      achievements: "Semifinalist in State Competition",
      details: "Participated in 12 debates throughout the school year, specializing in political and ethical topics."
    },
    {
      activityName: "Basketball Team",
      type: "Sports",
      position: "Point Guard",
      achievements: "Team MVP 2023",
      details: "Practice 3 times per week, participated in district championship."
    },
    {
      activityName: "Environmental Club",
      type: "Service",
      position: "Secretary",
      achievements: "Organized campus-wide recycling initiative",
      details: "Helped reduce school waste by 30% through educational campaigns and infrastructure improvements."
    }
  ],
  
  // Attendance records with different statuses
  attendance: [
    {
      date: "2024-02-01",
      status: "Present"
    },
    {
      date: "2024-02-02",
      status: "Present"
    },
    {
      date: "2024-02-05",
      status: "Absent"
    },
    {
      date: "2024-02-06",
      status: "Present"
    },
    {
      date: "2024-02-07",
      status: "Present"
    },
    {
      date: "2024-02-08",
      status: "Late"
    },
    {
      date: "2024-02-09",
      status: "Present"
    },
    {
      date: "2024-02-12",
      status: "Excused"
    },
    {
      date: "2024-02-13",
      status: "Present"
    },
    {
      date: "2024-02-14",
      status: "Present"
    },
    {
      date: "2024-02-15",
      status: "Present"
    },
    {
      date: "2024-02-16",
      status: "Late"
    },
    {
      date: "2024-02-19",
      status: "Present"
    },
    {
      date: "2024-02-20",
      status: "Present"
    },
    {
      date: "2024-02-21",
      status: "Absent"
    },
    {
      date: "2024-02-22",
      status: "Present"
    },
    {
      date: "2024-02-23",
      status: "Present"
    },
    {
      date: "2024-02-26",
      status: "Present"
    },
    {
      date: "2024-02-27",
      status: "Present"
    },
    {
      date: "2024-02-28",
      status: "Present"
    },
    {
      date: "2024-02-29",
      status: "Excused"
    }
  ]
};

// Use this code to load the dummy data in your component
// Replace the axios fetch in the useEffect with:

useEffect(() => {
  const fetchStudentData = async () => {
    try {
      setLoading(true);
      // Simulating API delay
      setTimeout(() => {
        setStudent(studentData);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to fetch student data');
      setLoading(false);
    }
  };

  fetchStudentData();
}, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading student profile...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!student) return <div className="text-center p-4">No student found with this ID.</div>;

  // Calculate overall academic performance
  const calculateOverallPerformance = () => {
    if (!student.academicRecords || student.academicRecords.length === 0) return 0;
    
    const totalPercentage = student.academicRecords.reduce((sum, record) => {
      return sum + (record.marks / record.totalMarks) * 100;
    }, 0);
    
    return (totalPercentage / student.academicRecords.length).toFixed(2);
  };

  // Calculate attendance percentage
  const calculateAttendancePercentage = () => {
    if (!student.attendance || student.attendance.length === 0) return 0;
    
    const presentCount = student.attendance.filter(
      record => record.status === "Present" || record.status === "Late"
    ).length;
    
    return ((presentCount / student.attendance.length) * 100).toFixed(2);
  };

  // Get attendance status counts
  const getAttendanceStatusCounts = () => {
    if (!student.attendance) return {};
    
    return student.attendance.reduce((counts, record) => {
      counts[record.status] = (counts[record.status] || 0) + 1;
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
    <div className="px-6 py-4 border-b border-gray-200">
      {children}
    </div>
  );
  
  // Custom CardTitle Component
  const CardTitle = ({ children }) => (
    <h3 className="text-xl font-semibold text-gray-800">
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
        className="bg-blue-500 h-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
  
  // Custom Badge Component
  const Badge = ({ children, variant }) => {
    let bgColor = "bg-gray-100 text-gray-800";
    
    if (variant === "default") bgColor = "bg-blue-100 text-blue-800";
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
        active ? 'bg-white border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
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
    <div className="fixed top-4 right-4 z-10">
        <button 
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-20">
        {/* Student Basic Info Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div 
                className="h-32 w-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {student.name.charAt(0)}
              </motion.div>
              
              <div className="text-center">
                <motion.h2 
                  className="text-2xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {student.name}
                </motion.h2>
                <motion.p 
                  className="text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Grade: {student.grade}
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
                  <span>{student.email}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="font-medium">Phone:</span>
                  <span>{student.phone}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="font-medium">Age:</span>
                  <span>{student.age} years</span>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Performance Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Overall Performance</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {overallPerformance}%
                </motion.span>
              </div>
              <Progress value={overallPerformance} className="h-2" />
            </div>
            
            <div className="space-y-4">
              {student.academicRecords && student.academicRecords.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Subject</th>
                        <th className="text-left p-2">Code</th>
                        <th className="text-left p-2">Marks</th>
                        <th className="text-left p-2">Grade</th>
                        <th className="text-left p-2">Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.academicRecords.map((record, index) => (
                        <motion.tr 
                          key={index} 
                          className="border-b"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <td className="p-2">{record.subject}</td>
                          <td className="p-2">{record.code}</td>
                          <td className="p-2">{record.marks}/{record.totalMarks}</td>
                          <td className="p-2">{record.grade}</td>
                          <td className="p-2">{record.year}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-500">No academic records available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information Tabs */}
      <div className="mt-6">
        <TabsList>
          <TabsTrigger value="skills" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')}>Skills</TabsTrigger>
          <TabsTrigger value="courses" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')}>Courses</TabsTrigger>
          <TabsTrigger value="extracurricular" active={activeTab === 'extracurricular'} onClick={() => setActiveTab('extracurricular')}>Extracurricular</TabsTrigger>
          <TabsTrigger value="attendance" active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')}>Attendance</TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          {/* Skills Tab */}
            {activeTab === 'skills' && (
            <motion.div 
              key="skills"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="p-4 border rounded-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Skills & Proficiencies</h3>
                <button 
                  onClick={() => setIsSkillModalOpen(true)}
                  className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Skill
                </button>
              </div>
              
              {student?.skills && student.skills.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {student.skills.map((skill, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{skill.skillName}</h4>
                          <Badge variant={
                            skill.proficiency === "Beginner" ? "outline" : 
                            skill.proficiency === "Intermediate" ? "secondary" : 
                            "default"
                          }>
                            {skill.proficiency}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              ) : (
                <p className="text-center text-gray-500">No skills recorded yet. Add your first skill!</p>
              )}
            </motion.div>
          )}
          
          
          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <motion.div 
              key="courses"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="p-4 border rounded-md"
            >
              <h3 className="text-xl font-semibold mb-4">Enrolled Courses</h3>
              {student.courses && student.courses.length > 0 ? (
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {student.courses.map((course, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-lg">{course.courseName}</h4>
                            <p className="text-gray-500">{course.institution} - {course.department}</p>
                            <p>Duration: {course.duration}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={course.completionStatus === "Completed" ? "default" : "outline"}>
                              {course.completionStatus}
                            </Badge>
                            <p className="mt-2">Fee: ${course.amount}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              ) : (
                <p className="text-center text-gray-500">No courses enrolled.</p>
              )}
            </motion.div>
          )}
          
          {/* Extracurricular Tab */}
 {activeTab === 'extracurricular' && (
            <motion.div 
              key="extracurricular"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="p-4 border rounded-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Extracurricular Activities</h3>
                <button 
                  onClick={() => setIsExtracurricularModalOpen(true)}
                  className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Activity
                </button>
              </div>
              
              {student?.extracurricularActivities && student.extracurricularActivities.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {student.extracurricularActivities.map((activity, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{activity.activityName}</h4>
                        {activity.type && <p className="text-sm text-gray-500">Type: {activity.type}</p>}
                        {activity.position && <p>Position: {activity.position}</p>}
                        {activity.achievements && (
                          <div className="mt-2">
                            <p className="font-medium">Achievements:</p>
                            <p>{activity.achievements}</p>
                          </div>
                        )}
                        {activity.details && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p>{activity.details}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              ) : (
                <p className="text-center text-gray-500">No extracurricular activities recorded. Add your first activity!</p>
              )}
            </motion.div>
          )}
          
          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <motion.div 
              key="attendance"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="p-4 border rounded-md"
            >
              <h3 className="text-xl font-semibold mb-4">Attendance Record</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Attendance Rate</span>
                        <span>{attendancePercentage}%</span>
                      </div>
                      <Progress value={attendancePercentage} className="h-2" />
                    </div>
                    
                    <motion.div 
                      className="grid grid-cols-2 gap-2"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div className="flex items-center" variants={itemVariants}>
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span>Present: {attendanceStatusCounts.Present || 0}</span>
                      </motion.div>
                      <motion.div className="flex items-center" variants={itemVariants}>
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span>Absent: {attendanceStatusCounts.Absent || 0}</span>
                      </motion.div>
                      <motion.div className="flex items-center" variants={itemVariants}>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span>Late: {attendanceStatusCounts.Late || 0}</span>
                      </motion.div>
                      <motion.div className="flex items-center" variants={itemVariants}>
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span>Excused: {attendanceStatusCounts.Excused || 0}</span>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {student.attendance && student.attendance.length > 0 ? (
                      <div className="max-h-64 overflow-y-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Date</th>
                              <th className="text-left p-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {student.attendance.slice(0, 10).map((record, index) => (
                              <motion.tr 
                                key={index} 
                                className="border-b"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <td className="p-2">{new Date(record.date).toLocaleDateString()}</td>
                                <td className="p-2">
                                  <Badge variant={
                                    record.status === "Present" ? "success" :
                                    record.status === "Absent" ? "destructive" :
                                    record.status === "Late" ? "warning" : "default"
                                  }>
                                    {record.status}
                                  </Badge>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">No attendance records available.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Career Recommendations Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Career Path Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="p-4 bg-blue-50 rounded-md border border-blue-200 mb-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
            >
              <h4 className="font-medium text-blue-700 mb-2">Based on your academic performance and skills:</h4>
              <p>The system will analyze your data to provide personalized career recommendations.</p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Recommended Fields</h4>
                  <p className="text-gray-500 text-sm">Based on your strengths and interests</p>
                  <p className="italic text-sm mt-2">Analysis will appear here</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Suggested Courses</h4>
                  <p className="text-gray-500 text-sm">To enhance your skill set</p>
                  <p className="italic text-sm mt-2">Recommendations will appear here</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Development Areas</h4>
                  <p className="text-gray-500 text-sm">Areas that need improvement</p>
                  <p className="italic text-sm mt-2">Suggestions will appear here</p>
                </CardContent>
              </Card>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
            <AddSkillModal 
        isOpen={isSkillModalOpen} 
        onClose={() => setIsSkillModalOpen(false)} 
        onSave={handleSaveSkill} 
      />
      
      <AddExtracurricularModal 
        isOpen={isExtracurricularModalOpen} 
        onClose={() => setIsExtracurricularModalOpen(false)} 
        onSave={handleSaveExtracurricular} 
      />
    </motion.div>
  );
};

export default StudentProfile;



// In this  profile page add options to add Skills and extracurricular activities by student and also add logout button using following schemas.
// Do not show all the component only show changes that you made. 

// I am creating "Student Carrer Counselling using academic performance data analysis" project using MERN.
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

// const Student = mongoose.model("Student", studentSchema);
// export default Student;
//   const academicSchema = new mongoose.Schema(   {     studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },     subject: { type: String, required: true },     code : {type :String , required : true},     marks: { type: Number, required: true },     totalMarks: { type: Number, required: true },     grade: { type: String, required: true },     year: { type: Number, required: true },   }, const attendanceSchema = new mongoose.Schema(   {     studentId: {       type: mongoose.Schema.Types.ObjectId,       ref: "Student",       required: true,     },     date: {       type: Date,       required: true,     },     status: {       type: String,       enum: ["Present", "Absent", "Late", "Excused"],       required: true,     },   }, const courseSchema = new mongoose.Schema(   {     studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },     courseName: { type: String, required: true },     institution: { type: String, required: true },     amount: { type: Number, required: true },     department: { type: String, required: true },     duration: { type: String, required: true },     completionStatus: { type: String, enum: ["Ongoing", "Completed"],default: "Ongoing" },   }, const extracurricularSchema = new mongoose.Schema(   {     studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },     activityName: { type: String, required: true },     type : {type : String},     position: { type: String },     achievements: { type: String },     details : {type : String}   },  const skillsSchema = new mongoose.Schema(   {     studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },     skillName: { type: String, required: true },     proficiency: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },   },   { timestamps: true } );  const Skills = mongoose.model("Skills", skillsSchema); export default Skills;