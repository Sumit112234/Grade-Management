import Attendance from "../models/Attendence.js";
import Student from "../models/Student.js";

export const addAttendance = async (req, res) => {
  const { studentId, date, status } = req.body;

  try {
    const attendance = new Attendance({ studentId, date, status });
    await attendance.save();

    // Add attendance ID to the student record
    await Student.findByIdAndUpdate(studentId, {
      $push: { attendance: attendance._id },
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAttendanceByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const attendance = await Attendance.find({ studentId });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
