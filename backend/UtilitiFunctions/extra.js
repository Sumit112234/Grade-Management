import Extracurricular from "../models/Extracurricular.js";

export const addActivity = async (req, res) => {
  const { studentId, activityName, position, achievements } = req.body;
  try {
    const activity = new Extracurricular({ studentId, activityName, position, achievements });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
