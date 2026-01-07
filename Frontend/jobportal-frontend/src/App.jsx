import { Routes, Route } from "react-router-dom";

// COMMON

// STUDENT
import Login from "./assets/Login";
import StudentRegPage from "./StudentRegPage";
import JobList from "./assets/JobList";
import StudentDashboard from "./assets/StudentDashboard";

// EMPLOYEE
import EmployeeRegister from "./assets/EmployeeRegister";
import EmployeeLogin from "./assets/EmployeeLogin";
import EmployeeHomePage from "./assets/EmployeeHomePage";
import PostJobPage from "./assets/PostJobPage";
import HomePage from "./assets/HomePage";
import Navbar from "./assets/NavBar";
import StudentHomePage from "./assets/StudentHomePage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* STUDENT ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/student/home" element={<StudentHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<StudentRegPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/jobs" element={<JobList />} />

        {/* EMPLOYEE ROUTES */}
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/home" element={<EmployeeHomePage />} />
        <Route path="/employee/post-job" element={<PostJobPage />} />

      </Routes>
    </>
  );
}

export default App;
