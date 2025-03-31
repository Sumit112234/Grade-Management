import bcryptjs from "bcryptjs";
import Academic from "../models/Academic.js";
import Courses from "../models/Course.js"
import Student from "../models/Student.js";

const coursesData = [
    {
        "courseCode": "BT101",
        "courseName": "B.Tech",
        "institution": "MIT University",
        "amount": "120000",
        "department": "Engineering",
        "duration": "4 Years",
        "totalSemisters": 8,
        "headOfDepartment": "Dr. Rajesh Kumar",
        "subjects": []
      },
      {
        "courseCode": "MCA202",
        "courseName": "MCA",
        "institution": "MIT University",
        "amount": "90000",
        "department": "Computer Applications",
        "duration": "3 Years",
        "totalSemisters": 6,
        "headOfDepartment": "Dr. Pooja Sharma",
        "subjects": []
      },
      {
        "courseCode": "MBA303",
        "courseName": "MBA",
        "institution": "MIT University",
        "amount": "150000",
        "department": "Management",
        "duration": "2 Years",
        "totalSemisters": 4,
        "headOfDepartment": "Dr. Anil Mehta",
        "subjects": []
      },
      {
        "courseCode": "BBA404",
        "courseName": "BBA",
        "institution": "MIT University",
        "amount": "100000",
        "department": "Business Administration",
        "duration": "3 Years",
        "totalSemisters": 6,
        "headOfDepartment": "Dr. Sandeep Yadav",
        "subjects": []
      }
  ];

const subjects =   [
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Computer Fundamentals", "code": "MCA101", "subjectType": "Theory", "semester": "1st", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Mathematical Foundations", "code": "MCA102", "subjectType": "Theory", "semester": "1st", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "C Programming", "code": "MCA103", "subjectType": "Practical", "semester": "1st", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Database Management Systems", "code": "MCA104", "subjectType": "Theory", "semester": "1st", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Operating Systems", "code": "MCA105", "subjectType": "Theory", "semester": "1st", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Object-Oriented Programming", "code": "MCA201", "subjectType": "Practical", "semester": "2nd", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Software Engineering", "code": "MCA202", "subjectType": "Theory", "semester": "2nd", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Computer Networks", "code": "MCA203", "subjectType": "Theory", "semester": "2nd", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Web Technologies", "code": "MCA204", "subjectType": "Practical", "semester": "2nd", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Cloud Computing", "code": "MCA205", "subjectType": "Theory", "semester": "2nd", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Java Programming", "code": "MCA301", "subjectType": "Practical", "semester": "3rd", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Data Mining", "code": "MCA302", "subjectType": "Theory", "semester": "3rd", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Advanced DBMS", "code": "MCA303", "subjectType": "Theory", "semester": "3rd", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Artificial Intelligence", "code": "MCA304", "subjectType": "Theory", "semester": "3rd", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Machine Learning", "code": "MCA305", "subjectType": "Theory", "semester": "3rd", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Big Data Analytics", "code": "MCA401", "subjectType": "Theory", "semester": "4th", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Cyber Security", "code": "MCA402", "subjectType": "Theory", "semester": "4th", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Cloud Computing", "code": "MCA403", "subjectType": "Theory", "semester": "4th", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Python Programming", "code": "MCA404", "subjectType": "Practical", "semester": "4th", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Advanced JavaScript", "code": "MCA405", "subjectType": "Practical", "semester": "4th", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "IoT and Embedded Systems", "code": "MCA501", "subjectType": "Theory", "semester": "5th", "year": 3 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Blockchain Technology", "code": "MCA502", "subjectType": "Theory", "semester": "5th", "year": 3 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Software Testing", "code": "MCA503", "subjectType": "Theory", "semester": "5th", "year": 3 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Full Stack Development", "code": "MCA504", "subjectType": "Practical", "semester": "5th", "year": 3 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Mobile App Development", "code": "MCA505", "subjectType": "Practical", "semester": "5th", "year": 3 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Industrial Training", "code": "MCA601", "subjectType": "Practical", "semester": "6th", "year": 3 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Major Project", "code": "MCA602", "subjectType": "Practical", "semester": "6th", "year": 3 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Entrepreneurship Development", "code": "MCA603", "subjectType": "Theory", "semester": "6th", "year": 3 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "Ethical Hacking", "code": "MCA604", "subjectType": "Theory", "semester": "6th", "year": 3 },
    { "courseId" : "67e78c853fb39fa1ee791d1a", "subject": "IT Law and Governance", "code": "MCA605", "subjectType": "Theory", "semester": "6th", "year": 3 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Principles of Management", "code": "MBA101", "subjectType": "Theory", "semester": "1st", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Financial Accounting", "code": "MBA102", "subjectType": "Theory", "semester": "1st", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Business Communication", "code": "MBA103", "subjectType": "Theory", "semester": "1st", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Quantitative Methods", "code": "MBA104", "subjectType": "Theory", "semester": "1st", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Business Law", "code": "MBA105", "subjectType": "Theory", "semester": "1st", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Marketing Management", "code": "MBA201", "subjectType": "Theory", "semester": "2nd", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Human Resource Management", "code": "MBA202", "subjectType": "Theory", "semester": "2nd", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Operations Management", "code": "MBA203", "subjectType": "Theory", "semester": "2nd", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Strategic Management", "code": "MBA204", "subjectType": "Theory", "semester": "2nd", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Corporate Finance", "code": "MBA205", "subjectType": "Theory", "semester": "2nd", "year": 1 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Consumer Behavior", "code": "MBA301", "subjectType": "Theory", "semester": "3rd", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Financial Management", "code": "MBA302", "subjectType": "Theory", "semester": "3rd", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "International Business", "code": "MBA303", "subjectType": "Theory", "semester": "3rd", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Supply Chain Management", "code": "MBA304", "subjectType": "Theory", "semester": "3rd", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Business Analytics", "code": "MBA305", "subjectType": "Theory", "semester": "3rd", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Entrepreneurship and Innovation", "code": "MBA401", "subjectType": "Theory", "semester": "4th", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Leadership and Change Management", "code": "MBA402", "subjectType": "Theory", "semester": "4th", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "E-Commerce", "code": "MBA403", "subjectType": "Theory", "semester": "4th", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Corporate Governance", "code": "MBA404", "subjectType": "Theory", "semester": "4th", "year": 2 },
    { "courseId" : "67e78c853fb39fa1ee791d1b", "subject": "Internship & Project", "code": "MBA405", "subjectType": "Practical", "semester": "4th", "year": 2 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Engineering Mathematics", code: "BT101", subjectType: "Theory", semester: "1st", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Physics", code: "BT102", subjectType: "Theory", semester: "1st", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Chemistry", code: "BT103", subjectType: "Theory", semester: "1st", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "C Programming", code: "BT104", subjectType: "Practical", semester: "1st", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Basic Electrical Engineering", code: "BT105", subjectType: "Theory", semester: "1st", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Data Structures", code: "BT201", subjectType: "Theory", semester: "2nd", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Digital Logic Design", code: "BT202", subjectType: "Theory", semester: "2nd", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Object-Oriented Programming", code: "BT203", subjectType: "Theory", semester: "2nd", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Engineering Drawing", code: "BT204", subjectType: "Practical", semester: "2nd", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Communication Skills", code: "BT205", subjectType: "Theory", semester: "2nd", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Database Management Systems", code: "BT301", subjectType: "Theory", semester: "3rd", year: 2 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Computer Networks", code: "BT302", subjectType: "Theory", semester: "3rd", year: 2 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Software Engineering", code: "BT303", subjectType: "Theory", semester: "3rd", year: 2 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Operating Systems", code: "BT304", subjectType: "Theory", semester: "3rd", year: 2 },
    { courseId: "67e78c853fb39fa1ee791d19", subject: "Web Development", code: "BT305", subjectType: "Practical", semester: "3rd", year: 2 },
    { courseId: "67e78c853fb39fa1ee791d1c", subject: "Business Economics", code: "BBA101", subjectType: "Theory", semester: "1st", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d1c", subject: "Principles of Management", code: "BBA102", subjectType: "Theory", semester: "1st", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d1c", subject: "Financial Accounting", code: "BBA103", subjectType: "Theory", semester: "1st", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d1c", subject: "Business Statistics", code: "BBA104", subjectType: "Theory", semester: "1st", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d1c", subject: "Marketing Management", code: "BBA105", subjectType: "Theory", semester: "1st", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d1c", subject: "Organizational Behavior", code: "BBA201", subjectType: "Theory", semester: "2nd", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d1c", subject: "Business Communication", code: "BBA202", subjectType: "Theory", semester: "2nd", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d1c", subject: "Cost Accounting", code: "BBA203", subjectType: "Theory", semester: "2nd", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d1c", subject: "Business Law", code: "BBA204", subjectType: "Theory", semester: "2nd", year: 1 },
    { courseId: "67e78c853fb39fa1ee791d1c", subject: "Corporate Finance", code: "BBA205", subjectType: "Theory", semester: "2nd", year: 1 }
  ]
    

  const courseIds = {
    BTECH: "67e78c853fb39fa1ee791d19",
    MCA: "67e78c853fb39fa1ee791d1a", // done
    MBA: "67e78c853fb39fa1ee791d1b",
    BBA: "67e78c853fb39fa1ee791d1c",
  };


  export const utilityFunction = async (req, res) => {

    try {
      // Fetch all subjects from MCA's 1st semester
      const mcaFirstSemSubjects = await Academic.find({ 
        courseId: courseIds.BBA, 
        semester: "1st" 
      });

      console.log(mcaFirstSemSubjects);
  
      if (!mcaFirstSemSubjects.length) {
        return res.status(404).json({ error: "No subjects found for MCA 1st semester" });
      }
  
      // Prepare academic records for each student
      const academicRecords = mcaFirstSemSubjects.map(sub => ({
        subjectId: sub._id,
        marks: 0,
        totalMarks: 100, // Assuming total marks is 100 for each subject
        grade: "N/A",
      }));
  
      // Student data array
      const studentsData = [
        { name: "Ritika Jain", email: "ritika.jain@example.com", phone: "9876543211", enrollment: "BBA2001" },
        { name: "Varun Tiwari", email: "varun.tiwari@example.com", phone: "9876543212", enrollment: "BBA2002" },
        { name: "Simran Kaur", email: "simran.kaur@example.com", phone: "9876543213", enrollment: "BBA2003" },
        { name: "Kunal Roy", email: "kunal.roy@example.com", phone: "9876543214", enrollment: "BBA2004" },
        { name: "Sonia Das", email: "sonia.das@example.com", phone: "9876543215", enrollment: "BBA2005" },
        { name: "Rajesh Nair", email: "rajesh.nair@example.com", phone: "9876543216", enrollment: "BBA2006" },
        { name: "Neetu Bansal", email: "neetu.bansal@example.com", phone: "9876543217", enrollment: "BBA2007" },
        { name: "Sandeep Malhotra", email: "sandeep.malhotra@example.com", phone: "9876543218", enrollment: "BBA2008" },
      ];

      
      let salt = await bcryptjs.genSalt(13);
      let hashPass = await bcryptjs.hash("securepassword",salt);
        
  
      // Add common fields
      const studentsToInsert = studentsData.map(student => ({
        ...student,
        password: hashPass, // Hash this in production
        age: 22,
        grade: "N/A",
        profilePic: "",
        userType: "student",
        semester: "1st",
        academicRecords,
        course: courseIds.BBA,
        skills: [],
        extracurricularActivities: [],
        attendance: []
      }));
  
      // Insert students into the database
      const insertedStudents = await Student.insertMany(studentsToInsert);
      console.log("Students Inserted:", insertedStudents);
  
      res.status(201).json({ message: "Students created successfully!", students: insertedStudents });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Something went wrong!" });
    }
    // res.json({'hello ji' : 'okay'});
    // let response = await 
    // try {


      // Insert subjects into the database
    //   const insertedSubjects = await Academic.insertMany(subjects);
    //   console.log("Subjects Inserted:", insertedSubjects);
  
    //   // Hardcoded course IDs
      // const courseIds = {
      //   BTECH: "67e78c853fb39fa1ee791d19",
      //   MCA: "67e78c853fb39fa1ee791d1a",
      //   MBA: "67e78c853fb39fa1ee791d1b",
      //   BBA: "67e78c853fb39fa1ee791d1c",
      // };
  
    //   // Filtering subjects based on their assigned courseId
    //   const btechSubjects = insertedSubjects
    //     .filter(sub => sub.courseId.toString() === courseIds.BTECH)
    //     .map(sub => sub._id);
  
    //   const mcaSubjects = insertedSubjects
    //     .filter(sub => sub.courseId.toString() === courseIds.MCA)
    //     .map(sub => sub._id);
  
    //   const mbaSubjects = insertedSubjects
    //     .filter(sub => sub.courseId.toString() === courseIds.MBA)
    //     .map(sub => sub._id);
  
    //   const bbaSubjects = insertedSubjects
    //     .filter(sub => sub.courseId.toString() === courseIds.BBA)
    //     .map(sub => sub._id);
  
    //   // Update courses with the respective subjects
    //   await Courses.findByIdAndUpdate(courseIds.BTECH, { $push: { subjects: { $each: btechSubjects } } });
    //   await Courses.findByIdAndUpdate(courseIds.MCA, { $push: { subjects: { $each: mcaSubjects } } });
    //   await Courses.findByIdAndUpdate(courseIds.MBA, { $push: { subjects: { $each: mbaSubjects } } });
    //   await Courses.findByIdAndUpdate(courseIds.BBA, { $push: { subjects: { $each: bbaSubjects } } });
  
    //   console.log("Subjects linked to courses successfully!");
    //   res.status(200).json({ message: "Subjects stored and linked!" });
    // } catch (error) {
    //   console.error("Error:", error);
    //   res.status(500).json({ error: "Something went wrong!" });
    // }
  };

// const Academic = require("./models/Academic"); // Adjust path
// const mongoose = require("mongoose");

// async function insertSubjects() {
//   // Fetch course IDs
//   const mcaCourse = await Course.findOne({ courseCode: "MCA202" });
//   const mbaCourse = await Course.findOne({ courseCode: "MBA303" });

//   if (!mcaCourse || !mbaCourse) {
//     console.error("Courses not found!");
//     return;
//   }

//   const subjectsData = [
//     // MCA Subjects (6 Semesters, 5 each)
//     { courseId: mcaCourse._id, subject: "Computer Fundamentals", code: "MCA101", subjectType: "Theory", semester: "1st", year: 1 },
//     { courseId: mcaCourse._id, subject: "Mathematical Foundations", code: "MCA102", subjectType: "Theory", semester: "1st", year: 1 },
//     { courseId: mcaCourse._id, subject: "C Programming", code: "MCA103", subjectType: "Practical", semester: "1st", year: 1 },
//     { courseId: mcaCourse._id, subject: "Database Management Systems", code: "MCA104", subjectType: "Theory", semester: "1st", year: 1 },
//     { courseId: mcaCourse._id, subject: "Operating Systems", code: "MCA105", subjectType: "Theory", semester: "1st", year: 1 },

//     { courseId: mcaCourse._id, subject: "Object-Oriented Programming", code: "MCA201", subjectType: "Practical", semester: "2nd", year: 1 },
//     { courseId: mcaCourse._id, subject: "Software Engineering", code: "MCA202", subjectType: "Theory", semester: "2nd", year: 1 },
    
//     // MBA Subjects (4 Semesters, 5 each)
//     { courseId: mbaCourse._id, subject: "Principles of Management", code: "MBA101", subjectType: "Theory", semester: "1st", year: 1 },
//     { courseId: mbaCourse._id, subject: "Financial Accounting", code: "MBA102", subjectType: "Theory", semester: "1st", year: 1 },
//     { courseId: mbaCourse._id, subject: "Business Communication", code: "MBA103", subjectType: "Theory", semester: "1st", year: 1 },
//     { courseId: mbaCourse._id, subject: "Quantitative Methods", code: "MBA104", subjectType: "Theory", semester: "1st", year: 1 },
//     { courseId: mbaCourse._id, subject: "Business Law", code: "MBA105", subjectType: "Theory", semester: "1st", year: 1 },
//   ];

//   // Insert subjects
//   const insertedSubjects = await Academic.insertMany(subjectsData);
//   console.log("Subjects Inserted:", insertedSubjects);

//   // Update courses with subject IDs
//   const subjectIds = insertedSubjects.map(sub => sub._id);
//   await Course.findByIdAndUpdate(mcaCourse._id, { $push: { subjects: { $each: subjectIds } } });
//   await Course.findByIdAndUpdate(mbaCourse._id, { $push: { subjects: { $each: subjectIds } } });

//   console.log("Subjects linked to courses successfully!");
// }

// insertSubjects();


// const insertSubjects = async () => {
//     const btechCourse = await Course.findOne({ courseCode: "BT101" });
//     const bbaCourse = await Course.findOne({ courseCode: "BBA404" });
  
//     if (!btechCourse || !bbaCourse) {
//       console.error("Courses not found!");
//       return;
//     }
  
//     const subjectsData = [
//       // B.Tech Subjects (8 Semesters, 5 each)
  
//       // Continue similarly for 4th to 8th semesters...
  
//       // BBA Subjects (6 Semesters, 5 each)
  
//       // Continue similarly for 3rd to 6th semesters...
//     ];
  
//     // Insert subjects
//     const insertedSubjects = await Academic.insertMany(subjectsData);
//     console.log("Subjects Inserted:", insertedSubjects);
  
//     // Update courses with subject IDs
//     const subjectIds = insertedSubjects.map(sub => sub._id);
//     await Course.findByIdAndUpdate(btechCourse._id, { $push: { subjects: { $each: subjectIds } } });
//     await Course.findByIdAndUpdate(bbaCourse._id, { $push: { subjects: { $each: subjectIds } } });
  
//     console.log("Subjects linked to courses successfully!");
//   };
  
//   insertSubjects();
  