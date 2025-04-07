import express from "express";
import { getStudent,getStudentByFilter,updateStudent,assignCourse,assignMarks,getStudents, loginUser, logoutUser, saveUser, updateStudentDetails } from "../UtilitiFunctions/student.js";
import auth from '../middleware/auth.js';
import {upload} from '../middleware/multer.js';
import { utilityFunction } from "../UtilitiFunctions/userHandler.js";


const router = express.Router();

router.get("/",auth, getStudent);
router.get("/getStudent", getStudentByFilter);
router.get("/all-students", getStudents);
router.post("/assign-course", assignCourse);
router.post("/assign-marks", assignMarks);
router.post("/register", saveUser);
router.post("/login", loginUser);
router.get("/logout", auth,logoutUser);
router.put('/update-details',updateStudentDetails)
router.post('/update-student',updateStudent)


// ---------------

router.post('/post-utility',utilityFunction)
router.get('/get-utility',utilityFunction)

export default router;
