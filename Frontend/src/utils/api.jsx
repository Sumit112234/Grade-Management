import axios from "axios";

const API_URL = import.meta.env.VITE_APP_Backend_Url;

export const fetchStudent = async () => {
  // const res = await axios.get(`${API_URL}/students`,{
  //   withCredentials : true
  // });
  // console.log(res)
  // return res.data;
  let data = {
    name: "Aryan Sharma",
    email: "aryan.sharma@example.com",
    phone: "9876543210",
    password: "hashedpassword1",
    age: 20,
    grade: "A",
    profilePic: "https://example.com/profiles/aryan.jpg",
    enrollment: "ENR001",
    type: "Full-time",
    academicRecords: [
      {
        subject: "Mathematics",
        code: "MTH101",
        marks: 65,
        totalMarks: 100,
        grade: "C",
      },
      {
        subject: "Science",
        code: "SCI102",
        marks: 85,
        totalMarks: 100,
        grade: "A",
      },
      {
        subject: "English",
        code: "ENG103",
        marks: 78,
        totalMarks: 100,
        grade: "B",
      },
      {
        subject: "Mathematics",
        code: "MATH101",
        year: 2022,
        marks: 85,
        totalMarks: 100,
        grade: "A",
      },
      {
        subject: "Physics",
        code: "PHYS101",
        year: 2022,
        marks: 78,
        totalMarks: 100,
        grade: "B+",
      },
      {
        subject: "Computer Science",
        code: "CS101",
        year: 2022,
        marks: 92,
        totalMarks: 100,
        grade: "A+",
      },
      {
        subject: "English",
        code: "ENG101",
        year: 2022,
        marks: 75,
        totalMarks: 100,
        grade: "B",
      },
      {
        subject: "Mathematics",
        code: "MATH201",
        year: 2023,
        marks: 88,
        totalMarks: 100,
        grade: "A",
      },
      {
        subject: "Physics",
        code: "PHYS201",
        year: 2023,
        marks: 82,
        totalMarks: 100,
        grade: "A-",
      },
      {
        subject: "Computer Science",
        code: "CS201",
        year: 2023,
        marks: 95,
        totalMarks: 100,
        grade: "A+",
      },
      {
        subject: "English",
        code: "ENG201",
        year: 2023,
        marks: 80,
        totalMarks: 100,
        grade: "B+",
      },
    ],
    skills: [
      {
        skillName: "Python Programming",
        proficiency: "Advanced",
      },
      {
        skillName: "Data Analysis",
        proficiency: "Intermediate",
      },
    ],
    extracurricularActivities: [
      {
        activityName: "Debate Club",
        type: "Public Speaking",
        position: "President",
        achievements: "Won National Debate Championship",
        details:
          "Led a team of 5 to victory in the 2023 National Debate Competition.",
      },
    ],
    courses: [
      {
        courseName: "Computer Science",
        institution: "XYZ University",
        amount: "15000",
        department: "Engineering",
        duration: "4 years",
        completionStatus: "Ongoing",
      },
    ],
    attendance: [
      {
        studentId: "64a1",
        courseId: { id: "c101", code: "CS 401", courseName: "Advanced Programming" },
        date: "2025-03-07",
        timeIn: "09:30 AM",
        timeOut: "11:20 AM",
        status: "Present",
      },
      {
        studentId: "64a1",
        courseId: { id: "c102", code: "CS 402", courseName: "Database Systems" },
        date: "2025-03-06",
        timeIn: "01:15 PM",
        timeOut: "03:00 PM",
        status: "Late",
      },
      {
        studentId: "64b1",
        courseId: { id: "c112", code: "CS 412", courseName: "M.Tech" },
        date: "2025-03-05",
        timeIn: "--:--",
        timeOut: "--:--",
        status: "Absent",
      },
      {
        studentId: "64a2",
        courseId: { id: "c101", code: "CS 401", courseName: "Advanced Programming" },
        date: "2025-03-07",
        timeIn: "10:00 AM",
        timeOut: "11:45 AM",
        status: "Present",
      },
      {
        studentId: "64a3",
        courseId: { id: "c107", code: "CS 407", courseName: "BCA" },
        date: "2025-03-06",
        timeIn: "08:00 AM",
        timeOut: "09:30 AM",
        status: "Present",
      },
      {
        studentId: "64b2",
        courseId: { id: "c111", code: "CS 411", courseName: "B.Tech" },
        date: "2025-03-06",
        timeIn: "11:30 AM",
        timeOut: "12:45 PM",
        status: "Late",
      },
      {
        studentId: "64c1",
        courseId: { id: "c101", code: "CS 401", courseName: "Advanced Programming" },
        date: "2025-03-05",
        timeIn: "--:--",
        timeOut: "--:--",
        status: "Absent",
      },
      {
        studentId: "64c2",
        courseId: { id: "c102", code: "CS 402", courseName: "Database Systems" },
        date: "2025-03-07",
        timeIn: "09:15 AM",
        timeOut: "10:45 AM",
        status: "Present",
      },
      {
        studentId: "64d1",
        courseId: {
          id: "c112", code: "CS 412", courseName: "M.Tech" 
         
        },
        date: "2025-03-04",
        timeIn: "01:30 PM",
        timeOut: "02:45 PM",
        status: "Present",
      },
      {
        studentId: "64d2",
        courseId: {
        id: "c107", code: "CS 407", courseName: "BCA" 
       
        },
        date: "2025-03-04",
        timeIn: "--:--",
        timeOut: "--:--",
        status: "Excused",
      },
      {
        studentId: "64e1",
        courseId: { id: "c101", code: "CS 401", courseName: "Advanced Programming" },
        date: "2025-03-03",
        timeIn: "10:00 AM",
        timeOut: "11:50 AM",
        status: "Present",
      },
      {
        studentId: "64e2",
        courseId: { id: "c110", code: "CS 410", courseName: "MCA" },
        date: "2025-03-02",
        timeIn: "09:00 AM",
        timeOut: "10:30 AM",
        status: "Present",
      },
      {
        studentId: "64f1",
        courseId: { id: "c112", code: "CS 412", courseName: "M.Tech" },
        date: "2025-03-01",
        timeIn: "--:--",
        timeOut: "--:--",
        status: "Absent",
      },
      {
        studentId: "64f2",
        courseId: { id: "c107", code: "CS 407", courseName: "BCA" },
        date: "2025-03-01",
        timeIn: "01:00 PM",
        timeOut: "02:30 PM",
        status: "Present",
      },
      {
        studentId: "64g1",
        courseId: { id: "c102", code: "CS 402", courseName: "Database Systems" },
        date: "2025-02-28",
        timeIn: "09:30 AM",
        timeOut: "11:15 AM",
        status: "Present",
      },
      {
        studentId: "64g2",
        courseId: { id: "c111", code: "CS 411", courseName: "B.Tech" },
        date: "2025-02-27",
        timeIn: "--:--",
        timeOut: "--:--",
        status: "Absent",
      },
      {
        studentId: "64h1",
        courseId: { id: "c101", code: "CS 401", courseName: "Advanced Programming" },
        date: "2025-02-26",
        timeIn: "11:00 AM",
        timeOut: "12:30 PM",
        status: "Late",
      },
      {
        studentId: "64h2",
        courseId: {
         id: "c112", code: "CS 412", courseName: "M.Tech" 
         
        },
        date: "2025-02-25",
        timeIn: "01:45 PM",
        timeOut: "03:00 PM",
        status: "Present",
      },
      {
        studentId: "64i1",
        courseId: {
           id: "c107", code: "CS 407", courseName: "BCA" 
          
        },
        date: "2025-02-24",
        timeIn: "--:--",
        timeOut: "--:--",
        status: "Excused",
      },
      {
        studentId: "64i2",
        courseId: { id: "c110", code: "CS 410", courseName: "MCA" },
        date: "2025-02-23",
        timeIn: "10:30 AM",
        timeOut: "11:50 AM",
        status: "Present",
      },
    ],
  };
  return data;
};

export const fetchAttendance = async (studentId) => {
  const res = await axios.get(`${API_URL}/attendance/${studentId}`);
  return res.data;
};

export const fetchAllStudents = async (studentId) => {
  const res = await axios.get(`${API_URL}/students/all-students`);
  return res.data.data;
};
