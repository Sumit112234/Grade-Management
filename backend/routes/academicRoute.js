import express from "express";
import { addAcademicRecord, analyzeStudentPerformance } from "../UtilitiFunctions/academic.js";

const router = express.Router();
router.post("/add-records", addAcademicRecord);
router.post("/analyse", analyzeStudentPerformance);

export default router;
