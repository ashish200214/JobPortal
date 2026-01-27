import { useNavigate } from "react-router-dom";

function StudentHomePage() {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="container mt-5">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="row">
        {/* VIEW JOBS */}
        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Browse Jobs</h5>
              <p className="card-text">Explore and apply for available jobs.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/jobs")}
              >
                View Jobs
              </button>
            </div>
          </div>
        </div>

        {/* APPLIED JOBS */}
        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <p className="card-text">Track jobs you have applied for.</p>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/student/applied-jobs")}
              >
                View Applied Jobs
              </button>

            </div>
          </div>
        </div>

        {/* PROFILE */}
        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h5 className="card-title">My Profile</h5>
              <p className="card-text">View or update your profile details.</p>
               <button
      className="btn btn-primary"
      onClick={() => navigate("/student/profile")}
    >View Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHomePage;
