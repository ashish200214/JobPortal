import { useNavigate } from "react-router-dom";

function EmployeeHomePage() {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/employee/login");
  }

  return (
    <div className="container mt-5">
      <h3>Employee Dashboard</h3>

      <button
        className="btn btn-primary me-2"
        onClick={() => navigate("/employee/my-jobs")}
      >
        View My Jobs
      </button>

      <button
        className="btn btn-success me-2"
        onClick={() => navigate("/employee/post-job")}
      >
        Post New Job
      </button>

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default EmployeeHomePage;
