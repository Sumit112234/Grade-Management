import Academic from "../models/Academic.js";

export const addAcademicRecord = async (req, res) => {
  const { studentId, subject, marks, grade, year } = req.body;
  try {
    const record = new Academic({ studentId, subject, marks, grade, year });
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
