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
    userType : {type : String , required : true}, // student , teacher
    semister : {type : String, default : "1st"}, // 1st , 2nd , 3rd, 4th, 5th...

    academicRecords: [{
      marks: { type: Number, required: true }, // all marks current + previous
      totalMarks: { type: Number, required: true }, // totol of all marks
      subjectId :{type : mongoose.Schema.Types.ObjectId, ref : "Academic"},
      grade: { type: String },
    }],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skills" }],
    extracurricularActivities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Extracurricular" }],
    courses: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }], 
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
