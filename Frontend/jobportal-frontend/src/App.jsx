import { Routes, Route } from "react-router-dom";

/* ===== COMMON ===== */
import Navbar from "./assets/NavBar";
import HomePage from "./assets/HomePage";

/* ===== STUDENT ===== */
import Login from "./assets/Login";
import StudentRegPage from "./StudentRegPage";
import StudentHomePage from "./assets/StudentHomePage";
import StudentDashboard from "./assets/StudentDashboard";
import JobList from "./assets/JobList";
import JobApply from "./assets/JobApply";
import StudentAppliedJobs from "./assets/StudentAppliedJob";

/* ===== EMPLOYEE ===== */
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

        {/* ===== STUDENT AUTH ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/student/login" element={<Login />} /> {/* 🔥 FIX */}
        <Route path="/registration" element={<StudentRegPage />} />

        {/* ===== STUDENT PAGES ===== */}
        <Route path="/student/home" element={<StudentHomePage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/jobs" element={<JobList />} />

        {/* ===== JOB APPLY ===== */}
        <Route path="/jobapply/:jobId" element={<JobApply />} />

        {/* ===== EMPLOYEE ===== */}
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/home" element={<EmployeeHomePage />} />
        <Route path="/employee/post-job" element={<PostJobPage />} />
<Route
  path="/student/applied-jobs"
  element={<StudentAppliedJobs />}
/>

        {/* ===== FALLBACK ===== */}
        <Route
          path="*"
          element={
            <div className="container mt-5 text-center">
              <h3>404 - Page Not Found</h3>
            </div>
          }
        />

      </Routes>
    </>
  );
}

export default App;
