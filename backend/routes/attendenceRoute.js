
import express from "express";
import { addAttendance, getAttendanceByStudent } from "../UtilitiFunctions/attendence.js";


const router = express.Router();

router.post("/", addAttendance);
router.get("/:studentEnroll", getAttendanceByStudent);

export default router;
