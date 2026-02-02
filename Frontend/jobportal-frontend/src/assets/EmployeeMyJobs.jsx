import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

function EmployeeMyJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadMyJobs();
  }, []);

  async function loadMyJobs() {
    try {
      const res = await api.get("/api/job/my-jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("MY JOBS ERROR =", err);

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
        jobs.map((job) => (
          <div key={job.id} className="card p-3 mb-3">
            <h5>{job.jobRole}</h5>
            <p>{job.description}</p>
            <p><b>City:</b> {job.city}</p>
            <p><b>Salary:</b> ₹{job.salary}</p>

            {/* ✅ NEW BUTTON */}
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
