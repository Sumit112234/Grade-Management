import axios from "axios";
const API_URL = import.meta.env.VITE_APP_Backend_Url; 

export const updateStudent = async(data)=>{

  const res = await axios.post(`${API_URL}/students/update-student`,data,{
    withCredentials : true
  });
  console.log(res)
  return res.data.message;

}