import mongoose from "mongoose";

const extracurricularSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    activityName: { type: String, required: true },
    type : {type : String},
    position: { type: String },
    achievements: { type: String },
    details : {type : String}
  },
  { timestamps: true }
);

const Extracurricular = mongoose.model("Extracurricular", extracurricularSchema);
export default Extracurricular;
