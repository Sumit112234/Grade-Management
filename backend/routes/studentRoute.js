import express from "express";
import { getStudent, loginUser, saveUser } from "../UtilitiFunctions/student.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get("/",auth, getStudent);
router.post("/register", saveUser);
router.post("/login", loginUser);

export default router;
