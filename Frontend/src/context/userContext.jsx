import { createContext, useState, useEffect, useContext } from "react";
import { fetchStudent } from "../utils/api";
import axios from "axios";


let backend_url = import.meta.env.VITE_APP_Backend_Url;
export const StudentContext = createContext();


export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);

  const signup = async(data)=>{
    try {
      console.log(data , backend_url)
      let res = await axios.post(`${backend_url}/students/register`,{data},
        {
          withCredentials : true,
        }
      )
      console.log(res);
      return true;
    } catch (e) {
      console.log(e);
      return false
    }
  }
  const login = async(data)=>{
    try {
      console.log(data , backend_url)
      let res = await axios.post(`${backend_url}/students/login`,{data},
        {
          withCredentials : true,
        }
      )
      console.log(res);
      setStudent(res.data.user);

      return true;
    } catch (e) {
      console.log(e);
      return false
    }
  }
  const logout = async()=>{
    try {
     
      let res = await fetch(`${backend_url}/students/logout`, {
        credentials: "include",
      });
      res = await res.json();
      console.log(res);
      setStudent(null)
      return true;
    } catch (e) {
      console.log(e);
      return false
    }

  }

  useEffect(() => {
    const getStudent = async () => {
      const data = await fetchStudent();
      console.log(data)
      setStudent(data);
    };
    getStudent();
  }, []);

  return (
    <StudentContext.Provider value={{ student ,setStudent,signup,login,logout}}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

