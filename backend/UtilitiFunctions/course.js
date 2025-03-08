import Course from "../models/Course.js";

export const addCourse = async (req, res) => {
  const { studentId, courseName, institution, duration, completionStatus } = req.body;
  try {
    const course = new Course({ studentId, courseName, institution, duration, completionStatus });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};