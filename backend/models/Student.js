import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String},
    password: { type: String, required: true },
    age: { type: Number },
    grade: { type: String },
    profilePic : {type : String},
    enrollment : {type : String , required : true},
    type : {type : String , required : true},
    academicRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "Academic" }],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skills" }],
    extracurricularActivities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Extracurricular" }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }], 
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
