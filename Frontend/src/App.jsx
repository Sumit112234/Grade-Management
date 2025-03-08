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

// I am creating "Student Carrer Counselling using academic performance data analysis" project using MERN.

function App() {
  

  return (
   <>
    <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/attendance' element={<AttendancePage/>}></Route>
        <Route path='/profile' element={<StudentProfile/>}></Route>
        <Route path='/analysis' element={<AcademicAnalysis/>}></Route>

        {/* admin route */}

        <Route path='/A-attendance' element={<CounselorAttendancePage/>}></Route>
        <Route path='/A-addCourses' element={<AddCourses/>}></Route>

      </Routes>
    </BrowserRouter>
    
   </>
  )
}

export default App
