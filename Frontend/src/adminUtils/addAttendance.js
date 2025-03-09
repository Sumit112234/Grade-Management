import axios from "axios"

let backend_url = import.meta.env.VITE_APP_Backend_Url;

export const addAttendance = async(data)=>{

    try {
        let res = axios.post(`${backend_url}/add-attendance`, data, {
            withCredentials : true,
        })
        console.log(res);
        return true;
    } catch (e) {
        console.log('some internal error', e);
    }
}

export const addCourses = async(data)=>{

    try {
        console.log("adding courses....")
        let res = axios.post(`${backend_url}/add-course`, {
            withCredentials : true,
        })
        console.log(res);
        return true;
    } catch (e) {
        console.log('some internal error', e);
    }
}