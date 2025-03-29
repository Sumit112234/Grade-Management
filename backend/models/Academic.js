import mongoose from "mongoose";

const academicSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // remove
    subject: { type: String, required: true },
    code : {type :String , required : true},

    subjectType : {type : String, required: true }, // practical , theory
    semester : {type : String , required : true}, // 1st , 2nd , 3rd, 4th, 5th...
    year : { type: Number, required: true }, // 1 , 2, 3,...
  },
  { timestamps: true }
);

const Academic = mongoose.model("Academic", academicSchema);
export default Academic;
