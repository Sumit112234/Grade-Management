import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    courseName: { type: String, required: true },
    institution: { type: String, required: true },
    amount: { type: String, required: true },
    department: { type: String, required: true },
    duration: { type: String, required: true },
    completionStatus: { type: String, enum: ["Ongoing", "Completed"],default: "Ongoing" },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
