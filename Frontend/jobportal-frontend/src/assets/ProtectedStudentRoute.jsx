import { Navigate } from "react-router-dom";

function ProtectedStudentRoute({ children }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "STUDENT") {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedStudentRoute;
