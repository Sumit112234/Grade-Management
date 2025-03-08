import mongoose from "mongoose";

const academicSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // remove
    subject: { type: String, required: true },
    code : {type :String , required : true},
    marks: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    grade: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

const Academic = mongoose.model("Academic", academicSchema);
export default Academic;
