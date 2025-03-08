import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    skillName: { type: String, required: true },
    proficiency: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
  },
  { timestamps: true }
);

const Skills = mongoose.model("Skills", skillsSchema);
export default Skills;
