import express from "express";
import { addCourse, getCourses } from "../UtilitiFunctions/course.js";

const router = express.Router();
router.post("/", addCourse);
router.get("/", getCourses);

export default router;
