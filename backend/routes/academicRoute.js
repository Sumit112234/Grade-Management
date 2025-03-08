import express from "express";
import { addAcademicRecord } from "../UtilitiFunctions/academic.js";

const router = express.Router();
router.post("/", addAcademicRecord);

export default router;
