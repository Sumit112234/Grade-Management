
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    students: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        timeIn: {
          type: String, 
        },
        timeOut: {
          type: String, 
        },
        status: {
          type: String,
          enum: ["Present", "Absent", "Late", "Excused"],
          required: true,
        },
      },
    ],
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
