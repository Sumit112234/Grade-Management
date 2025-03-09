import express from "express";
import { getStudent, loginUser, logoutUser, saveUser, updateStudentDetails } from "../UtilitiFunctions/student.js";
import auth from '../middleware/auth.js';
import {upload} from '../middleware/multer.js';

const router = express.Router();

router.get("/",auth, getStudent);
router.post("/register", saveUser);
router.post("/login", loginUser);
router.get("/logout", auth,logoutUser);
router.put('/update-details', auth, upload.single('avatar'),updateStudentDetails)

export default router;
