import { Navigate } from "react-router-dom";

function ProtectedEmployeeRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/employee/login" replace />;
  }

  return children;
}

export default ProtectedEmployeeRoute;
