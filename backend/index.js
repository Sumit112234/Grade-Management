// Shree Ram
import express from 'express';
import cors from 'cors';
import connectDb from './database/connectDB.js';
// import userRouter from './routes/user.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import adminRouter from './routes/admin.js';
import studentRoutes from "./routes/studentRoute.js";
import skillRoutes from "./routes/skillRoute.js";
import extracurricularRoutes from "./routes/extraRoute.js";
import academicRoutes from "./routes/academicRoute.js";
import courseRoutes from "./routes/courseRoute.js";
import attendanceRoute from "./routes/attendenceRoute.js";
import adminRouter from './routes/admin.js';




const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL,'http://localhost:5173'],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json()); // 
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true   
 }));
const PORT = process.env.PORT || 7896;

app.get('/', (req,res)=>{
    console.log(req.body);
    res.status(200).json({
        message : "Everything is okay.",
        error : "No error"
    })

})


// app.use('/api/user', userRouter);
// app.use('/api/admin', adminRouter);
app.use("/api/students", studentRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/extracurricular", extracurricularRoutes);
app.use("/api/academic", academicRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/attendance", attendanceRoute)
app.use("/api", adminRouter);

connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log("server is running on port : ", PORT);
    })
    
})

