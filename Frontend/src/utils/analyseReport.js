import axios from "axios"


let backend_url = import.meta.env.VITE_APP_Backend_Url;

export const analyseReport = async(data)=>{
   try {
    let res = await axios.post(`${backend_url}/academic/analyse`,data);
    console.log(res?.data?.feedback);
    return res?.data.feedback;
   } catch (error) {
    console.log(error);
    return false;
   }
}