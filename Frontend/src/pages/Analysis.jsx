import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const AcademicAnalysis = () => {
  const [student, setStudent] = useState(null);
  const [academicData, setAcademicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [studentList, setStudentList] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [subjectPerformance, setSubjectPerformance] = useState([]);
  const [careerRecommendations, setCareerRecommendations] = useState([]);
  const [extracurricularData, setExtracurricularData] = useState([]);
  
  // Dummy students data
  const studentsData = [
    {
      _id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      password: "hashedpassword123",
      age: 20,
      grade: "A",
      profilePic: "profile1.jpg",
      enrollment: "STU2024001",
      type: "Full-Time",
      academicRecords: [],
      skills: [],
      extracurricularActivities: [],
      courses: [],
      attendance: []
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "0987654321",
      password: "hashedpassword456",
      age: 22,
      grade: "B+",
      profilePic: "profile2.jpg",
      enrollment: "STU2024002",
      type: "Part-Time",
      academicRecords: [],
      skills: [],
      extracurricularActivities: [],
      courses: [],
      attendance: []
    },
    {
      _id: "3",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      phone: "1122334455",
      password: "hashedpassword789",
      age: 21,
      grade: "A-",
      profilePic: "profile3.jpg",
      enrollment: "STU2024003",
      type: "Full-Time",
      academicRecords: [],
      skills: [],
      extracurricularActivities: [],
      courses: [],
      attendance: []
    },
    {
      _id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "6677889900",
      password: "hashedpassword234",
      age: 19,
      grade: "B",
      profilePic: "profile4.jpg",
      enrollment: "STU2024004",
      type: "Full-Time",
      academicRecords: [],
      skills: [],
      extracurricularActivities: [],
      courses: [],
      attendance: []
    },
    {
      _id: "5",
      name: "Daniel Wilson",
      email: "daniel.wilson@example.com",
      phone: "4455667788",
      password: "hashedpassword567",
      age: 23,
      grade: "A+",
      profilePic: "profile5.jpg",
      enrollment: "STU2024005",
      type: "Part-Time",
      academicRecords: [],
      skills: [],
      extracurricularActivities: [],
      courses: [],
      attendance: []
    }
  ];

  // Dummy academic data for each student
  const dummyAcademicData = {
    "1": [
      { subject: "Mathematics", code: "MATH101", year: 2022, marks: 85, totalMarks: 100, grade: "A" },
      { subject: "Physics", code: "PHYS101", year: 2022, marks: 78, totalMarks: 100, grade: "B+" },
      { subject: "Computer Science", code: "CS101", year: 2022, marks: 92, totalMarks: 100, grade: "A+" },
      { subject: "English", code: "ENG101", year: 2022, marks: 75, totalMarks: 100, grade: "B" },
      { subject: "Mathematics", code: "MATH201", year: 2023, marks: 88, totalMarks: 100, grade: "A" },
      { subject: "Physics", code: "PHYS201", year: 2023, marks: 82, totalMarks: 100, grade: "A-" },
      { subject: "Computer Science", code: "CS201", year: 2023, marks: 95, totalMarks: 100, grade: "A+" },
      { subject: "English", code: "ENG201", year: 2023, marks: 80, totalMarks: 100, grade: "B+" }
    ],
    "2": [
      { subject: "Economics", code: "ECON101", year: 2022, marks: 78, totalMarks: 100, grade: "B+" },
      { subject: "Psychology", code: "PSYCH101", year: 2022, marks: 85, totalMarks: 100, grade: "A" },
      { subject: "Sociology", code: "SOC101", year: 2022, marks: 72, totalMarks: 100, grade: "B" },
      { subject: "History", code: "HIST101", year: 2022, marks: 68, totalMarks: 100, grade: "C+" },
      { subject: "Economics", code: "ECON201", year: 2023, marks: 82, totalMarks: 100, grade: "A-" },
      { subject: "Psychology", code: "PSYCH201", year: 2023, marks: 88, totalMarks: 100, grade: "A" },
      { subject: "Sociology", code: "SOC201", year: 2023, marks: 75, totalMarks: 100, grade: "B" },
      { subject: "History", code: "HIST201", year: 2023, marks: 70, totalMarks: 100, grade: "B-" }
    ],
    "3": [
      { subject: "Biology", code: "BIO101", year: 2022, marks: 88, totalMarks: 100, grade: "A" },
      { subject: "Chemistry", code: "CHEM101", year: 2022, marks: 82, totalMarks: 100, grade: "A-" },
      { subject: "Mathematics", code: "MATH101", year: 2022, marks: 75, totalMarks: 100, grade: "B" },
      { subject: "Physics", code: "PHYS101", year: 2022, marks: 78, totalMarks: 100, grade: "B+" },
      { subject: "Biology", code: "BIO201", year: 2023, marks: 92, totalMarks: 100, grade: "A+" },
      { subject: "Chemistry", code: "CHEM201", year: 2023, marks: 85, totalMarks: 100, grade: "A" },
      { subject: "Mathematics", code: "MATH201", year: 2023, marks: 80, totalMarks: 100, grade: "B+" },
      { subject: "Physics", code: "PHYS201", year: 2023, marks: 83, totalMarks: 100, grade: "A-" }
    ],
    "4": [
      { subject: "Computer Science", code: "CS101", year: 2022, marks: 75, totalMarks: 100, grade: "B" },
      { subject: "English", code: "ENG101", year: 2022, marks: 82, totalMarks: 100, grade: "A-" },
      { subject: "Mathematics", code: "MATH101", year: 2022, marks: 68, totalMarks: 100, grade: "C+" },
      { subject: "Physics", code: "PHYS101", year: 2022, marks: 72, totalMarks: 100, grade: "B" },
      { subject: "Computer Science", code: "CS201", year: 2023, marks: 78, totalMarks: 100, grade: "B+" },
      { subject: "English", code: "ENG201", year: 2023, marks: 85, totalMarks: 100, grade: "A" },
      { subject: "Mathematics", code: "MATH201", year: 2023, marks: 72, totalMarks: 100, grade: "B" },
      { subject: "Physics", code: "PHYS201", year: 2023, marks: 75, totalMarks: 100, grade: "B" }
    ],
    "5": [
      { subject: "Mathematics", code: "MATH101", year: 2022, marks: 92, totalMarks: 100, grade: "A+" },
      { subject: "Physics", code: "PHYS101", year: 2022, marks: 90, totalMarks: 100, grade: "A+" },
      { subject: "Computer Science", code: "CS101", year: 2022, marks: 95, totalMarks: 100, grade: "A+" },
      { subject: "English", code: "ENG101", year: 2022, marks: 88, totalMarks: 100, grade: "A" },
      { subject: "Mathematics", code: "MATH201", year: 2023, marks: 95, totalMarks: 100, grade: "A+" },
      { subject: "Physics", code: "PHYS201", year: 2023, marks: 92, totalMarks: 100, grade: "A+" },
      { subject: "Computer Science", code: "CS201", year: 2023, marks: 98, totalMarks: 100, grade: "A+" },
      { subject: "English", code: "ENG201", year: 2023, marks: 90, totalMarks: 100, grade: "A+" }
    ]
  };

  // Dummy skills data for each student
  const dummySkillsData = {
    "1": [
      { skillName: "Programming", proficiency: "Advanced" },
      { skillName: "Data Analysis", proficiency: "Intermediate" },
      { skillName: "Problem Solving", proficiency: "Advanced" },
      { skillName: "Communication", proficiency: "Intermediate" }
    ],
    "2": [
      { skillName: "Research", proficiency: "Advanced" },
      { skillName: "Critical Thinking", proficiency: "Advanced" },
      { skillName: "Public Speaking", proficiency: "Intermediate" },
      { skillName: "Writing", proficiency: "Advanced" }
    ],
    "3": [
      { skillName: "Laboratory Techniques", proficiency: "Advanced" },
      { skillName: "Data Analysis", proficiency: "Intermediate" },
      { skillName: "Research", proficiency: "Advanced" },
      { skillName: "Team Work", proficiency: "Intermediate" }
    ],
    "4": [
      { skillName: "Programming", proficiency: "Intermediate" },
      { skillName: "Web Development", proficiency: "Beginner" },
      { skillName: "Creative Writing", proficiency: "Advanced" },
      { skillName: "Problem Solving", proficiency: "Intermediate" }
    ],
    "5": [
      { skillName: "Programming", proficiency: "Advanced" },
      { skillName: "Mathematics", proficiency: "Advanced" },
      { skillName: "Physics", proficiency: "Advanced" },
      { skillName: "Problem Solving", proficiency: "Advanced" },
      { skillName: "Critical Thinking", proficiency: "Advanced" }
    ]
  };

  // Dummy attendance data for each student
  const dummyAttendanceData = {
    "1": [
      { date: "2023-01-10", status: "Present" },
      { date: "2023-01-11", status: "Present" },
      { date: "2023-01-12", status: "Present" },
      { date: "2023-01-13", status: "Late" },
      { date: "2023-01-16", status: "Present" },
      { date: "2023-01-17", status: "Present" },
      { date: "2023-01-18", status: "Absent" },
      { date: "2023-01-19", status: "Present" },
      { date: "2023-01-20", status: "Present" }
    ],
    "2": [
      { date: "2023-01-10", status: "Present" },
      { date: "2023-01-11", status: "Present" },
      { date: "2023-01-12", status: "Late" },
      { date: "2023-01-13", status: "Present" },
      { date: "2023-01-16", status: "Excused" },
      { date: "2023-01-17", status: "Excused" },
      { date: "2023-01-18", status: "Present" },
      { date: "2023-01-19", status: "Present" },
      { date: "2023-01-20", status: "Present" }
    ],
    "3": [
      { date: "2023-01-10", status: "Present" },
      { date: "2023-01-11", status: "Present" },
      { date: "2023-01-12", status: "Present" },
      { date: "2023-01-13", status: "Present" },
      { date: "2023-01-16", status: "Present" },
      { date: "2023-01-17", status: "Late" },
      { date: "2023-01-18", status: "Present" },
      { date: "2023-01-19", status: "Present" },
      { date: "2023-01-20", status: "Present" }
    ],
    "4": [
      { date: "2023-01-10", status: "Present" },
      { date: "2023-01-11", status: "Absent" },
      { date: "2023-01-12", status: "Absent" },
      { date: "2023-01-13", status: "Present" },
      { date: "2023-01-16", status: "Present" },
      { date: "2023-01-17", status: "Late" },
      { date: "2023-01-18", status: "Present" },
      { date: "2023-01-19", status: "Late" },
      { date: "2023-01-20", status: "Present" }
    ],
    "5": [
      { date: "2023-01-10", status: "Present" },
      { date: "2023-01-11", status: "Present" },
      { date: "2023-01-12", status: "Present" },
      { date: "2023-01-13", status: "Present" },
      { date: "2023-01-16", status: "Present" },
      { date: "2023-01-17", status: "Present" },
      { date: "2023-01-18", status: "Present" },
      { date: "2023-01-19", status: "Present" },
      { date: "2023-01-20", status: "Late" }
    ]
  };

  // Dummy extracurricular activities data for each student
  const dummyExtracurricularData = {
    "1": [
      { 
        activityName: "Coding Club", 
        type: "Club", 
        position: "President", 
        achievements: "Won 1st place in regional hackathon",
        details: "Organized weekly coding sessions and workshops for club members."
      },
      { 
        activityName: "Debate Team", 
        type: "Team", 
        position: "Member", 
        achievements: "Finalist in state-level debate competition",
        details: "Participated in monthly debate competitions."
      }
    ],
    "2": [
      { 
        activityName: "Student Council", 
        type: "Leadership", 
        position: "Secretary", 
        achievements: "Organized successful fundraising campaign",
        details: "Managed meeting minutes and communications for the council."
      },
      { 
        activityName: "Drama Club", 
        type: "Club", 
        position: "Lead Actor", 
        achievements: "Best Performance Award in annual play",
        details: "Participated in two major productions per year."
      }
    ],
    "3": [
      { 
        activityName: "Science Club", 
        type: "Club", 
        position: "Vice President", 
        achievements: "Led team to 2nd place in Science Olympiad",
        details: "Organized science experiments and events for the club."
      },
      { 
        activityName: "Basketball Team", 
        type: "Sports", 
        position: "Team Captain", 
        achievements: "Regional champions 2023",
        details: "Led team practice sessions and strategy meetings."
      }
    ],
    "4": [
      { 
        activityName: "Literary Magazine", 
        type: "Publication", 
        position: "Editor", 
        achievements: "Published award-winning edition",
        details: "Reviewed and edited submissions for the quarterly magazine."
      },
      { 
        activityName: "Volunteer Club", 
        type: "Community Service", 
        position: "Member", 
        achievements: "Completed 100+ hours of community service",
        details: "Participated in weekly community service activities."
      }
    ],
    "5": [
      { 
        activityName: "Robotics Club", 
        type: "Club", 
        position: "Team Lead", 
        achievements: "Won national robotics competition",
        details: "Designed and built championship-winning robot."
      },
      { 
        activityName: "Chess Club", 
        type: "Club", 
        position: "President", 
        achievements: "State chess champion 2023",
        details: "Organized chess tournaments and teaching sessions."
      },
      { 
        activityName: "Math Olympiad", 
        type: "Competition", 
        position: "Participant", 
        achievements: "Gold medalist in International Math Olympiad",
        details: "Represented school in international mathematics competitions."
      }
    ]
  };

  // Fetch students list for dropdown - using dummy data instead of API call
  useEffect(() => {
    // Comment out the API call and use dummy data
    // const fetchStudents = async () => {
    //   try {
    //     const response = await axios.get('/api/students');
    //     setStudentList(response.data);
    //   } catch (err) {
    //     setError('Failed to fetch student list');
    //     console.error(err);
    //   }
    // };
    
    // fetchStudents();
    
    // Using dummy data instead
    setStudentList(studentsData);
  }, []);
  
  // Fetch student data when a student is selected - using dummy data instead of API calls
  useEffect(() => {
    if (!selectedStudentId) return;
    
    setLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      try {
        // Set student profile using dummy data
        const selectedStudent = studentsData.find(student => student._id === selectedStudentId);
        setStudent(selectedStudent);
        
        // Set academic records using dummy data
        const academicRecords = dummyAcademicData[selectedStudentId] || [];
        setAcademicData(academicRecords);
        
        // Set skills using dummy data
        const skills = dummySkillsData[selectedStudentId] || [];
        setSkillsData(skills);
        
        // Set attendance using dummy data
        const attendance = dummyAttendanceData[selectedStudentId] || [];
        setAttendanceData(attendance);
        
        // Set extracurricular activities using dummy data
        const extracurricular = dummyExtracurricularData[selectedStudentId] || [];
        setExtracurricularData(extracurricular);
        
        // Process data for visualizations
        processAcademicData(academicRecords);
        generateCareerRecommendations(
          academicRecords,
          skills,
          extracurricular
        );
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student data');
        setLoading(false);
        console.error(err);
      }
    }, 500); // 500ms delay to simulate API call
    
  }, [selectedStudentId]);
  
  // Process academic data for visualization
  const processAcademicData = (data) => {
    // Group by subject for subject-wise performance analysis
    const subjectGroups = {};
    
    data.forEach(record => {
      if (!subjectGroups[record.subject]) {
        subjectGroups[record.subject] = [];
      }
      
      const percentage = (record.marks / record.totalMarks) * 100;
      subjectGroups[record.subject].push({
        year: record.year,
        percentage: percentage.toFixed(2),
        grade: record.grade
      });
    });
    
    // Convert to array format for charts
    const subjectPerformanceData = Object.keys(subjectGroups).map(subject => {
      return {
        subject,
        data: subjectGroups[subject].sort((a, b) => a.year - b.year),
        averagePerformance: (
          subjectGroups[subject].reduce((sum, item) => sum + parseFloat(item.percentage), 0) / 
          subjectGroups[subject].length
        ).toFixed(2)
      };
    });
    
    setSubjectPerformance(subjectPerformanceData);
  };
  
  // Generate career recommendations based on academic performance, skills, and extracurricular activities
  const generateCareerRecommendations = (academics, skills, extracurricular) => {
    // This is a simplified recommendation engine - in a real system, this would be more sophisticated
    const recommendations = [];
    
    // Get top performing subjects
    const subjectPercentages = {};
    academics.forEach(record => {
      const percentage = (record.marks / record.totalMarks) * 100;
      if (!subjectPercentages[record.subject]) {
        subjectPercentages[record.subject] = [];
      }
      subjectPercentages[record.subject].push(percentage);
    });
    
    const topSubjects = Object.entries(subjectPercentages)
      .map(([subject, percentages]) => ({
        subject,
        average: percentages.reduce((sum, p) => sum + p, 0) / percentages.length
      }))
      .sort((a, b) => b.average - a.average)
      .slice(0, 3);
    
    // Get advanced skills
    const advancedSkills = skills.filter(skill => skill.proficiency === "Advanced")
      .map(skill => skill.skillName);
    
    // Get significant extracurricular activities
    const significantActivities = extracurricular
      .filter(activity => activity.achievements)
      .map(activity => activity.activityName);
    
    // Simple career mapping (in a real app, this would be much more sophisticated)
    const careerMap = {
      "Mathematics": ["Data Scientist", "Statistician", "Financial Analyst"],
      "Physics": ["Engineer", "Research Scientist", "Technical Consultant"],
      "Computer Science": ["Software Developer", "System Analyst", "Cybersecurity Specialist"],
      "English": ["Content Writer", "Editor", "Communications Specialist"],
      "History": ["Historian", "Archivist", "Political Analyst"],
      "Economics": ["Economist", "Business Analyst", "Market Research Analyst"],
      "Biology": ["Biologist", "Healthcare Professional", "Environmental Scientist"],
      "Chemistry": ["Chemist", "Pharmacologist", "Quality Control Specialist"]
    };
    
    // Generate recommendations based on top subjects
    topSubjects.forEach(subject => {
      if (careerMap[subject.subject]) {
        careerMap[subject.subject].forEach(career => {
          if (!recommendations.includes(career)) {
            recommendations.push(career);
          }
        });
      }
    });
    
    // Add recommendations based on skills and extracurricular activities
    if (advancedSkills.includes("Programming") || advancedSkills.includes("Coding")) {
      ["Software Engineer", "Web Developer", "Mobile App Developer"].forEach(career => {
        if (!recommendations.includes(career)) {
          recommendations.push(career);
        }
      });
    }
    
    if (significantActivities.includes("Debate") || significantActivities.includes("Public Speaking")) {
      ["Lawyer", "Public Relations Specialist", "Corporate Trainer"].forEach(career => {
        if (!recommendations.includes(career)) {
          recommendations.push(career);
        }
      });
    }
    
    setCareerRecommendations(recommendations.slice(0, 5)); // Limit to top 5 recommendations
  };
  
  // Calculate attendance statistics
  const calculateAttendanceStats = () => {
    if (!attendanceData.length) return { present: 0, absent: 0, late: 0, excused: 0, percentage: 0 };
    
    const stats = attendanceData.reduce((acc, record) => {
      acc[record.status.toLowerCase()]++;
      return acc;
    }, { present: 0, absent: 0, late: 0, excused: 0 });
    
    const totalDays = attendanceData.length;
    const percentage = ((stats.present + stats.late) / totalDays * 100).toFixed(2);
    
    return { ...stats, percentage, totalDays };
  };
  
  const attendanceStats = calculateAttendanceStats();
  
  // Generate performance data for charts
  const getPerformanceTrendData = () => {
    // Group by year and calculate average performance
    const yearlyPerformance = {};
    
    academicData.forEach(record => {
      if (!yearlyPerformance[record.year]) {
        yearlyPerformance[record.year] = { totalPercentage: 0, count: 0 };
      }
      
      const percentage = (record.marks / record.totalMarks) * 100;
      yearlyPerformance[record.year].totalPercentage += percentage;
      yearlyPerformance[record.year].count += 1;
    });
    
    // Convert to array and calculate averages
    return Object.keys(yearlyPerformance)
      .sort()
      .map(year => ({
        year,
        averagePercentage: (
          yearlyPerformance[year].totalPercentage / yearlyPerformance[year].count
        ).toFixed(2)
      }));
  };
  
  // Format subject performance for chart
  const getSubjectPerformanceData = () => {
    return subjectPerformance.map(subject => ({
      subject: subject.subject,
      average: parseFloat(subject.averagePerformance)
    }));
  };
  
  // Handle student selection
  const handleStudentChange = (e) => {
    setSelectedStudentId(e.target.value);
  };
  
  if (loading && selectedStudentId) {
    return <div className="p-8 text-center">Loading student data...</div>;
  }
  
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl pt-20 font-bold mb-6">Academic Analysis</h1>
      
      {/* Student Selection */}
      <div className="mb-8">
        <label htmlFor="studentSelect" className="block text-lg font-medium mb-2">
          Select Student:
        </label>
        <select
          id="studentSelect"
          className="w-full md:w-1/2 p-2 border rounded-md"
          value={selectedStudentId}
          onChange={handleStudentChange}
        >
          <option value="">-- Select a student --</option>
          {studentList.map(student => (
            <option key={student._id} value={student._id}>
              {student.name} ({student.enrollment})
            </option>
          ))}
        </select>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {student && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Student Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Student Profile</h2>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mr-4">
                {student.profilePic ? (
                  <img 
                    src={student.profilePic} 
                    alt={student.name} 
                    className="w-full h-full rounded-full object-cover" 
                  />
                ) : (
                  <span className="text-2xl">{student.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium">{student.name}</h3>
                <p className="text-gray-600">{student.enrollment}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Grade:</p>
                <p className="font-medium">{student.grade}</p>
              </div>
              <div>
                <p className="text-gray-600">Age:</p>
                <p className="font-medium">{student.age}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{student.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p className="font-medium">{student.phone || "N/A"}</p>
              </div>
            </div>
          </div>
          
          {/* Overall Performance Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Overall Performance</h2>
            {academicData.length > 0 ? (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">Average Grade:</p>
                  <p className="text-3xl font-bold">
                    {(academicData.reduce((sum, record) => {
                      const gradeMap = { 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0 };
                      return sum + (gradeMap[record.grade] || 0);
                    }, 0) / academicData.length).toFixed(2)}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">Average Percentage:</p>
                  <p className="text-3xl font-bold">
                    {(academicData.reduce((sum, record) => {
                      return sum + ((record.marks / record.totalMarks) * 100);
                    }, 0) / academicData.length).toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Total Subjects:</p>
                  <p className="font-medium">
                    {new Set(academicData.map(record => record.subject)).size}
                  </p>
                </div>
              </>
            ) : (
              <p>No academic data available.</p>
            )}
          </div>
          
          {/* Attendance Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Attendance Summary</h2>
            {attendanceData.length > 0 ? (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">Attendance Rate:</p>
                  <p className="text-3xl font-bold">{attendanceStats.percentage}%</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Present:</p>
                    <p className="font-medium">{attendanceStats.present} days</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Absent:</p>
                    <p className="font-medium">{attendanceStats.absent} days</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Late:</p>
                    <p className="font-medium">{attendanceStats.late} days</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Excused:</p>
                    <p className="font-medium">{attendanceStats.excused} days</p>
                  </div>
                </div>
              </>
            ) : (
              <p>No attendance data available.</p>
            )}
          </div>
        </div>
      )}
      
      {student && academicData.length > 0 && (
        <>
          {/* Performance Trends */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Performance Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getPerformanceTrendData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="averagePercentage"
                    name="Average Percentage"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Subject Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Subject-wise Performance */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Subject Performance</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getSubjectPerformanceData()}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="average"
                      name="Average Performance (%)"
                      fill="#8884d8"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Skills Assessment */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Skills Assessment</h2>
              {skillsData.length > 0 ? (
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-left">Skill</th>
                        <th className="p-2 text-left">Proficiency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skillsData.map((skill, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{skill.skillName}</td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded-full text-sm ${
                                skill.proficiency === "Advanced"
                                  ? "bg-green-100 text-green-800"
                                  : skill.proficiency === "Intermediate"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {skill.proficiency}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No skills data available.</p>
              )}
            </div>
          </div>
          
          {/* Career Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Career Recommendations</h2>
              {careerRecommendations.length > 0 ? (
                <ul className="space-y-2">
                  {careerRecommendations.map((career, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No career recommendations available.</p>
              )}
              <div className="mt-6 p-4 bg-yellow-50 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> These recommendations are based on academic performance, skills, and extracurricular activities. Consider consulting with a career counselor for personalized guidance.
                </p>
              </div>
            </div>
            
            {/* Extracurricular Activities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Extracurricular Activities</h2>
              {extracurricularData.length > 0 ? (
                <div className="max-h-80 overflow-y-auto">
                  {extracurricularData.map((activity, index) => (
                    <div key={index} className="mb-4 pb-4 border-b last:border-0">
                      <h3 className="font-medium">{activity.activityName}</h3>
                      <p className="text-sm text-gray-600">
                        {activity.type && <span>Type: {activity.type}</span>}
                        {activity.position && <span> • Position: {activity.position}</span>}
                      </p>
                      {activity.achievements && (
                        <p className="mt-1 text-sm">
                          <strong>Achievements:</strong> {activity.achievements}
                        </p>
                      )}
                      {activity.details && (
                        <p className="mt-1 text-sm text-gray-700">{activity.details}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No extracurricular activities data available.</p>
              )}
            </div>
          </div>
          
          {/* Subject Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Academic Records</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Subject</th>
                    <th className="p-2 text-left">Code</th>
                    <th className="p-2 text-left">Year</th>
                    <th className="p-2 text-left">Marks</th>
                    <th className="p-2 text-left">Total</th>
                    <th className="p-2 text-left">Percentage</th>
                    <th className="p-2 text-left">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {academicData.map((record, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{record.subject}</td>
                      <td className="p-2">{record.code}</td>
                      <td className="p-2">{record.year}</td>
                      <td className="p-2">{record.marks}</td>
                      <td className="p-2">{record.totalMarks}</td>
                      <td className="p-2">
                        {((record.marks / record.totalMarks) * 100).toFixed(2)}%
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            record.grade === "A+" || record.grade === "A"
                              ? "bg-green-100 text-green-800"
                              : record.grade === "B+" || record.grade === "B"
                              ? "bg-blue-100 text-blue-800"
                              : record.grade === "C+" || record.grade === "C"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {record.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      
      {selectedStudentId && !academicData.length && !loading && (
        <div className="bg-yellow-50 p-6 rounded-lg text-center">
          <h3 className="text-xl font-medium text-yellow-800 mb-2">No Academic Data Available</h3>
          <p className="text-yellow-700">
            This student doesn't have any academic records yet. Records need to be added before
            analysis can be performed.
          </p>
        </div>
      )}
      
      {!selectedStudentId && (
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-xl font-medium text-blue-800 mb-2">Select a Student</h3>
          <p className="text-blue-700">
            Please select a student from the dropdown above to view their academic analysis.
          </p>
        </div>
      )}
    </div>
  );
};

export default AcademicAnalysis;
