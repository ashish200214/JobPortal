import { Routes, Route } from "react-router-dom";

/* COMMON */
import Navbar from "./assets/NavBar";
import HomePage from "./assets/HomePage";

/* STUDENT */
import Login from "./assets/Login";
import StudentRegPage from "./StudentRegPage";
import StudentHomePage from "./assets/StudentHomePage";
import StudentDashboard from "./assets/StudentDashboard";
import JobList from "./assets/JobList";

/* EMPLOYEE */
import EmployeeRegister from "./assets/EmployeeRegister";
import EmployeeLogin from "./assets/EmployeeLogin";
import EmployeeHomePage from "./assets/EmployeeHomePage";
import PostJobPage from "./assets/PostJobPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<HomePage />} />

        {/* ===== STUDENT ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<StudentRegPage />} />
        <Route path="/student/home" element={<StudentHomePage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/jobs" element={<JobList />} />

        {/* ===== EMPLOYEE ===== */}
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/home" element={<EmployeeHomePage />} />
        <Route path="/employee/post-job" element={<PostJobPage />} />

      </Routes>
    </>
  );
}

export default App;
  