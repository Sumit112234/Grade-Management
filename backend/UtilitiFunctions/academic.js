import Academic from "../models/Academic.js";
import axios from "axios";


export const addAcademicRecord = async (req, res) => {
  const { studentId, subject, marks, grade, year } = req.body;
  try {
    const record = new Academic({ studentId, subject, marks, grade, year });
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const analyzeStudentPerformance = async (req, res) => {

  // console.log(req.body);
  const {data , prompt} = req.body; // Student data is already populated

  const query = `${prompt} ${JSON.stringify(data)}`;
  
  const aiResponse = await axios.get(
    `https://raghav-aiserver.vercel.app/chat?query=${encodeURIComponent(query)}`
  );
  // const aiResponse = await axios.get(
  //   `https://rapidai.vercel.app/chat?prompt=${encodeURIComponent(query)}`
  // );
  
  
  const feedback = aiResponse.data.response || "No feedback available.";
  // const feedback = aiResponse.data.reply || "No feedback available.";
  console.log(aiResponse)

  res.status(200).json({message : "Feedback generated successfully", feedback});
  return ;

  // try {
    // Extract student details
    const { name, grade, academicRecords, skills, extracurricularActivities, courses, attendance } = student;

    // Prepare structured data for AI analysis
    let performanceData = `
      Student Name: ${name}
      Grade: ${grade}
      Academic Records:
      ${academicRecords
        .map((record) => `  - Subject: ${record.subject} (${record.code}), Marks: ${record.marks}/${record.totalMarks}, Grade: ${record.grade}`)
        .join("\n")}
      
      Skills:
      ${skills.map((skill) => `  - ${skill.skillName} (${skill.proficiency})`).join("\n")}

      Extracurricular Activities:
      ${extracurricularActivities.map((activity) => `  - ${activity.activityName}`).join("\n")}

      Courses Enrolled:
      ${courses.map((course) => `  - ${course.courseName} (${course.institution})`).join("\n")}

      Attendance:
      ${attendance
        .map((att) => `  - Date: ${att.date}, Status: ${att.status || "N/A"}`)
        .join("\n")}
    `;

    // Define AI instructions
    const instruction = `You are a student counselor. A student is feeling depressed due to his academic performance.
    Your job is to analyze his academic report and provide **only constructive feedback** in **bullet points**.
    

    ***Response should be in following format*** : 
   {  
    "Identify Weak Subjects": [],
    "Suggest Study Techniques": [],
    "Time Management Tips": [],
    "Motivational Advice": [],
    "Skill & Extracurricular Improvement": [],
    "Consistency & Practice": []
   }
    response should be in such a manner so that i can parse it in json.
    ### **Guidelines for Response:**
    - **Identify Weak Subjects:** Highlight subjects where the student needs improvement.
    - **Suggest Study Techniques:** Provide simple and effective learning strategies.
    - **Time Management Tips:** Help the student manage study schedules.
    - **Motivational Advice:** Encourage the student to stay positive and focused.
    - **Skill & Extracurricular Improvement:** Recommend ways to develop new skills.
    - **Consistency & Practice:** Suggest how to practice effectively.
    - **Avoid Summary:** Do not summarize the student’s report or mention subjects directly.
    - **No Extra Details:** Do not mention grades, marks, or attendance directly. Just provide helpful tips.
    
    **Note:** **Only** return improvement suggestions in bullet points. **Do not include any student information.**`;
    
   
    let cleardata = await axios.get(
      `https://rapidai.vercel.app/clear`
    );
    // Send response with AI-generated analysis
    res.status(200).json({ feedback  });

  // } catch (error) {
  //   res.status(500).json({ message: "Error analyzing student performance", error: error.message });
  // }
};

