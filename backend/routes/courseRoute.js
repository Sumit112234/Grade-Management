import express from "express";
import { addCourse } from "../UtilitiFunctions/course.js";

const router = express.Router();
router.post("/", addCourse);

export default router;
