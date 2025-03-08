
import express from "express";
import { addAttendance, getAttendanceByStudent } from "../UtilitiFunctions/attendence.js";


const router = express.Router();

router.post("/", addAttendance);
router.get("/:studentId", getAttendanceByStudent);

export default router;
