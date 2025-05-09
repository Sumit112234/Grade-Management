import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import AttendancePage from './pages/Attendance'
import StudentProfile from './pages/Profile'
import CounselorAttendancePage from './adminPages/Attendance'
import AcademicAnalysis from './pages/Analysis'
import AddCourses from './adminPages/AddCourse'
import Protected from './pages/Protected'
import AcademicReport from './pages/Academics'
import AssignMarksPage from './adminPages/AddMarks'
import { ToastContainer } from 'react-toastify'
import Temp from './pages/Temp'
import ForgotPassword from './pages/ForgotPassword'
import Chatbot from './pages/Chatbot'


// Academic k Subject-Specific Improvement Plans ko dekhna h error kyu aa raha h
// Analysis ko dekhna h
//  Resourse page ko banana h

// Admin ka dekhna h
// I am creating "Student Carrer Counselling using academic performance data analysis" project using MERN with tailwindcss and framer-motion with a blue and white theme.

// Create Admin page by which admin can create courses and other things provided below.




function App() {
  

  // login mai bhi type ho sakta h
  return (
   <>
    <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/-' element={<Temp/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/attendance' element={<Protected><AttendancePage/></Protected>}></Route>
        <Route path='/profile' element={<Protected><StudentProfile/></Protected>}></Route>
        <Route path='/analysis' element={<Protected><AcademicAnalysis/></Protected>}></Route>
        <Route path='/academic' element={<Protected><AcademicReport/></Protected>}></Route>
        <Route path='/password-reset' element={<ForgotPassword/>}></Route>
        <Route path='/chat' element={<Protected><Chatbot/></Protected>}></Route>

        {/* admin route */}

        <Route path='/A-attendance' element={<CounselorAttendancePage/>}></Route>
        <Route path='/A-addCourses' element={<AddCourses/>}></Route>
        <Route path='/A-addMarks' element={<AssignMarksPage/>}></Route>

      </Routes>
      <ToastContainer position='top-center'/>
    </BrowserRouter>
    
   </>
  )
}

export default App
