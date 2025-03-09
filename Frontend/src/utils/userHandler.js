import axios from "axios";
const API_URL = import.meta.env.VITE_APP_Backend_Url; 

export const updateStudent = async(data)=>{

  const res = await axios.put(`${API_URL}/students/update-details`,data,{
    withCredentials : true
  });
  console.log(res)
  return res.data.message;

}