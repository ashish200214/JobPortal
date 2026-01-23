import { Navigate } from "react-router-dom";

function ProtectedStudentRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
    console.log("I am in ProtectedStudentRoute")

  // 🔥 BOTH REQUIRED
  if (!token || role !== "STUDENT") {
    console.log("I am in ProtectedStudentRoute if condition")
    return <Navigate to="/login" replace />;
  }
  console.log(children)
  return children;
}

export default ProtectedStudentRoute;
