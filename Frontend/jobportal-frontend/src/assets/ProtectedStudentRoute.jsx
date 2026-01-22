import { Navigate } from "react-router-dom";

function ProtectedStudentRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔥 BOTH REQUIRED
  if (!token || role !== "STUDENT") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedStudentRoute;
