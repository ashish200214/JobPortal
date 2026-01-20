import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function EmployeeHomePage() {
  const navigate = useNavigate();

  const [showMyJobs, setShowMyJobs] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  function goToPostJobPage() {
    navigate("/employee/post-job");
  }

  function logout() {
    localStorage.clear();
    navigate("/employee/login");
  }

  async function toggleMyJobs() {
    if (showMyJobs) {
      setShowMyJobs(false);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8080/api/job/my-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(res.data || []);
      setShowMyJobs(true);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
      alert("Unable to load your jobs");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-5">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {/* ACTION CARDS */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Post a New Job</h5>
              <p className="card-text">
                Create and publish a new job opening.
              </p>
              <button
                className="btn btn-primary"
                onClick={goToPostJobPage}
              >
                Post Job
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5 className="card-title">My Jobs</h5>
              <p className="card-text">
                View jobs posted by you.
              </p>
              <button
                className="btn btn-secondary"
                onClick={toggleMyJobs}
              >
                {showMyJobs ? "Hide My Jobs" : "View My Jobs"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MY JOBS SECTION */}
      {showMyJobs && (
        <div className="mt-4">
          <h4 className="mb-3">My Posted Jobs</h4>

          {loading && <p>Loading jobs...</p>}

          {!loading && jobs.length === 0 && (
            <p className="text-muted">
              You haven’t posted any jobs yet.
            </p>
          )}

          <div className="row">
            {jobs.map((job) => (
              <div className="col-md-4 mb-3" key={job.id}>
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h5 className="card-title">{job.jobRole}</h5>
                    <p className="card-text">{job.description}</p>

                    <p><b>City:</b> {job.city}</p>
                    <p><b>Salary:</b> ₹{job.salary}</p>
                    <p><b>Openings:</b> {job.openings}</p>

                    {job.skills && (
                      <div className="mb-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="badge bg-secondary me-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      className="btn btn-outline-primary mt-2"
                      onClick={() =>
                        navigate(`/employee/job/${job.id}/applicants`)
                      }
                    >
                      View Applicants
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeHomePage;
