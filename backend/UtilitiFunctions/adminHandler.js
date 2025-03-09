import Attendance from "../models/Attendence.js";
import Course from "../models/Course.js";

export async function addAttendance(req, res) {

    try {
        let data = req.body;
        const response = await Attendance.create(data);

        res.status(200).json({
            message : "Attendence added successfully.",
            data : response,
            error : false,
        })
        

    } catch (e) {
        res.status(500).json({
                    message: e.message || "Internal server error.",
                    status: false,
                    error: true,
        });
    }
}
export async function addCourse(req, res) {

    try {
        let data = {
            
                courseName: "MCA",
                institution: "MITS",
                amount: "2,15,000",
                department: "CSE",
                duration: "2 years"
              
        }
        const response = await Course.create(data);

        res.status(200).json({
            message : "Course added successfully.",
            data : response,
            error : false,
        })
        

    } catch (e) {
        res.status(500).json({
                    message: e.message || "Internal server error.",
                    status: false,
                    error: true,
        });
    }
}