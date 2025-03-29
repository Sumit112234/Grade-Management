
import mongoose from "mongoose";


const attendanceSchema = new mongoose.Schema(
  {
    studentId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Student", 
      required: true 
    },
    courseId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Course", 
      required: true 
    },
    date: { 
      type: Date, 
      required: true 
    },
    timeIn: { 
      type: String, // Example: "09:30 AM"
    },
    timeOut: { 
      type: String, // Example: "11:20 AM"
    },
    status: { 
      type: String, 
      enum: ["Present", "Absent", "Late", "Excused"], 
      required: true 
    },
    note: { 
      type: String, // For special cases like "Medical Appointment"
    }
  },
  { timestamps: true }
);


const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
