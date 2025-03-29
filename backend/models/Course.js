import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseCode : {type : String, required :  true}, // BT101
    courseName: { type: String, required: true },
    institution: { type: String, required: true },
    amount: { type: String, required: true },
    department: { type: String, required: true },
    duration: { type: String, required: true },
    totalSemisters : {type : Number, required : true},
    headOfDepartment : {type : String, default : ""},
    subjects : [{type : mongoose.Schema.Types.ObjectId, ref : "Academic"}],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
