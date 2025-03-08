import express from "express";
import { addSkill } from "../UtilitiFunctions/skill.js";


const router = express.Router();
router.post("/", addSkill);

export default router;
