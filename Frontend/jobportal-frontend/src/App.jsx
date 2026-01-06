import { useState } from 'react'
import StudentRegPage from './StudentRegPage'
import { Routes, Route } from "react-router-dom";
import JobApply from './assets/JobApply';
import Login from './assets/Login';
import EmployeeRegister from './assets/EmployeeRegister'
import EmployeeLogin from './assets/EmployeeLogin';
import PostJobPage from './assets/PostJobPage';
function App() {

  return (
    
    <>
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registeration" element={<StudentRegPage />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/job" element={<JobApply />}></Route>
      <Route path='/registerEmployee' element={<EmployeeRegister />}></Route>
      <Route path="/loginE" element={<EmployeeLogin />}></Route>
      <Route path='/addjob' element={<JobApply />}></Route>
      <Route path='/employee/postJob/' element={<PostJobPage />}></Route>
    </Routes>
    </>
  )
}

export default App
