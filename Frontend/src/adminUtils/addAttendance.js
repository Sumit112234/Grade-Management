import axios from "axios"

let backend_url = import.meta.env.VITE_APP_Backend_Url;

export const addAttendance = async(data)=>{

    return new Promise((resolve,rej)=>{
        try {
            let res = axios.post(`${backend_url}/attendance`, data)
            console.log(res);
            resolve();
        } catch (e) {
            console.log('some internal error', e);
            rej(e);
        }    
    })
    
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