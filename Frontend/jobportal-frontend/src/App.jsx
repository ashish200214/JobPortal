import { Routes, Route } from "react-router-dom";

/* ===== COMMON ===== */
import Navbar from "./assets/NavBar";
import HomePage from "./assets/HomePage";

/* ===== STUDENT ===== */
import Login from "./assets/Login";
import StudentRegPage from "./StudentRegPage";
import StudentHomePage from "./assets/StudentHomePage";
import JobList from "./assets/JobList";
import JobApply from "./assets/JobApply";
import StudentAppliedJobs from "./assets/StudentAppliedJob";
import ProtectedStudentRoute from "./assets/ProtectedStudentRoute";

/* ===== EMPLOYEE ===== */
import EmployeeRegister from "./assets/EmployeeRegister";
import EmployeeLogin from "./assets/EmployeeLogin";
import EmployeeHomePage from "./assets/EmployeeHomePage";
import EmployeeMyJobs from "./assets/EmployeeMyJobs";
import PostJobPage from "./assets/PostJobPage";
import JobApplicants from "./assets/JobApplicants";
import ProtectedEmployeeRoute from "./assets/ProtectedEmployeeRoute";
import StudentProfile from "./assets/StudentProfile";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<HomePage />} />

        {/* ===== STUDENT AUTH ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/student/login" element={<Login />} />
        <Route path="/registration" element={<StudentRegPage />} />

        {/* ===== STUDENT PAGES ===== */}
        <Route
          path="/student/home"
          element={
            <ProtectedStudentRoute>
              <StudentHomePage />
            </ProtectedStudentRoute>
          }
        />

        <Route path="/jobs" element={<JobList />} />

        <Route
          path="/jobapply/:jobId"
          element={
            <ProtectedStudentRoute>
              <JobApply />
            </ProtectedStudentRoute>
          }
        />

        <Route
          path="/student/applied-jobs"
          element={
            <ProtectedStudentRoute>
              <StudentAppliedJobs />
            </ProtectedStudentRoute>
          }
        />

        <Route path="/student/profile" element={<StudentProfile />} />


        {/* ===== EMPLOYEE AUTH ===== */}
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />

        {/* ===== EMPLOYEE PAGES ===== */}
        <Route
          path="/employee/home"
          element={
            <ProtectedEmployeeRoute>
              <EmployeeHomePage />
            </ProtectedEmployeeRoute>
          }
        />

        <Route
          path="/employee/my-jobs"
          element={
            <ProtectedEmployeeRoute>
              <EmployeeMyJobs />
            </ProtectedEmployeeRoute>
          }
        />

        <Route
          path="/employee/post-job"
          element={
            <ProtectedEmployeeRoute>
              <PostJobPage />
            </ProtectedEmployeeRoute>
          }
        />

        <Route
          path="/employee/job/:jobId/applicants"
          element={
            <ProtectedEmployeeRoute>
              <JobApplicants />
            </ProtectedEmployeeRoute>
          }
        />

        {/* ===== FALLBACK ===== */}
        {/* <Route
          path="*"
          element={
            <div className="container mt-5 text-center">
              <h3>404 - Page Not Found</h3>
            </div>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
