import Attendance from "../models/Attendence.js";
import Student from "../models/Student.js";

export const addAttendance = async (req, res) => {

  try {
    const attendanceData = req.body; // Expecting an array of attendance objects

    if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
      return res.status(400).json({ message: "Invalid attendance data." });
    }

    // Transform the data to match the schema
    const formattedAttendance = attendanceData.map((entry) => ({
      studentEnroll: entry.studentId,
      courseId: entry.course,
      date: new Date(entry.date), // Ensure it's stored as Date type
      timeIn: entry.timeIn || null,
      timeOut: entry.timeOut || null,
      status: entry.status,
      note: entry.note || "",
      subject: entry.subject,
    }));

    // Save all attendance records in one go
    const savedAttendance = await Attendance.insertMany(formattedAttendance);

    // Update each student's attendance field with the newly created records
    await Promise.all(
      savedAttendance.map(async (record) => {
        await Student.findOneAndUpdate(
          { enrollment: record.studentEnroll }, // Find student by enrollment number
          { $push: { attendance: record._id } }, // Push the attendance ID into the student's attendance array
          { new: true }
        );
      })
    );

    res.status(201).json({ message: "Attendance recorded successfully!" });
  } catch (error) {
    console.error("Error storing attendance:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const getAttendanceByStudent = async (req, res) => {
  const { studentEnroll } = req.params;

  try {
    const attendance = await Attendance.find({ studentEnroll  })
    .populate('subject');

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
