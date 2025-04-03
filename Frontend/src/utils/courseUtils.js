import axios from "axios";

const API_URL = import.meta.env.VITE_APP_Backend_Url;


export const assignCourseToStudent = async (course, studentId)=>{
    try {
        let res = await axios.post(`${API_URL}/students/assign-course?id=${studentId}`,course);
        console.log(res)        ;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}