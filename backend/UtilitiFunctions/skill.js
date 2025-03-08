import Skills from "../models/Skills.js";

export const addSkill = async (req, res) => {
  const { studentId, skillName, proficiency } = req.body;
  try {
    const skill = new Skills({ studentId, skillName, proficiency });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
