import axios from "axios";

const API_URL = import.meta.env.VITE_APP_Backend_Url; 

export const fetchStudent = async () => {
  const res = await axios.get(`${API_URL}/students`,{
    withCredentials : true
  });
  // console.log(res)
  return res.data;
};

export const fetchAttendance = async (studentId) => {
  const res = await axios.get(`${API_URL}/attendance/${studentId}`);
  return res.data;
};
