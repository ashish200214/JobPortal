import { useState } from 'react'
import StudentRegPage from './StudentRegPage'
import { Routes, Route } from "react-router-dom";
import Login from './assets/Login';
function App() {

  return (
    
    <>
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registeration" element={<StudentRegPage />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
    </>
  )
}

export default App
