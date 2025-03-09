import { Router } from 'express';
import auth from '../middleware/auth.js';
import { addAttendance ,addCourse} from '../UtilitiFunctions/adminHandler.js';



const adminRouter = Router();

adminRouter.post('/add-attendance',auth, addAttendance);
adminRouter.post('/add-course', addCourse);


export default adminRouter;