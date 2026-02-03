import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

function EmployeeMyJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const formatCategory = (category) => {
    if (!category) return "";
    return category
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  useEffect(() => {
    loadMyJobs();
  }, []);

  async function loadMyJobs() {
    try {
      const res = await api.get("/api/job/my-jobs");
      setJobs(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/employee/login");
      } else {
        alert("Unable to load your jobs");
      }
    }
  }

  return (
    <div className="container mt-5">
      <h3>My Posted Jobs</h3>

      {jobs.length === 0 ? (
        <p>No jobs posted yet</p>
      ) : (
        jobs.map(job => (
          <div key={job.id} className="card p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5>{job.jobRole}</h5>
              {job.category && (
                <span className="badge bg-info text-dark">
                  {formatCategory(job.category)}
                </span>
              )}
            </div>

            <p>{job.description}</p>
            <p><b>City:</b> {job.city}</p>
            <p><b>Salary:</b> ₹{job.salary}</p>

            <button
              className="btn btn-outline-primary mt-2"
              onClick={() =>
                navigate(`/employee/job/${job.id}/applicants`)
              }
            >
              View Applicants
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default EmployeeMyJobs;
