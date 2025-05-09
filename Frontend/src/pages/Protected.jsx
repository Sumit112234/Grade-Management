import React, { Children } from 'react'
import { useStudent } from '../context/userContext'
import { Navigate } from 'react-router-dom';


const Protected = ({children}) => {

    const { student } = useStudent();
    console.log('protected')
    
  return (
    <>
    {student ? children : <Navigate to='/login'/> }
    </>
  )
}

export default Protected