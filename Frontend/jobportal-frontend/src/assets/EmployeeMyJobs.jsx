import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

function EmployeeMyJobs() {
  const [jobs, setJobs] = useState([]);
  const [renewDays, setRenewDays] = useState({});
  const navigate = useNavigate();

  // =========================
  // FORMAT CATEGORY
  // =========================
  const formatCategory = (category) => {
    if (!category) return "";
    return category
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // =========================
  // LOAD MY JOBS
  // =========================
  useEffect(() => {
    loadMyJobs();
  }, []);

  async function loadMyJobs() {
    try {
      const res = await api.get("/api/job/my-jobs");
      setJobs(res.data || []);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Session expired. Please login again.");
        navigate("/employee/login");
      } else {
        alert("Unable to load your jobs");
      }
    }
  }

  // =========================
  // RENEW JOB
  // =========================
  async function renewJob(jobId) {
    const days = renewDays[jobId] || 30;

    try {
      await api.put(
        `/api/job/renew/${jobId}`,
        null,
        { params: { days } }
      );

      alert("✅ Job renewed successfully");
      loadMyJobs(); // reload list
    } catch (err) {
      alert("❌ Failed to renew job");
    }
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="container mt-5">
      <h3>My Posted Jobs</h3>

      {jobs.length === 0 ? (
        <p>No jobs posted yet</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="card p-3 mb-3 shadow">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{job.jobRole}</h5>

              {job.category && (
                <span className="badge bg-info text-dark">
                  {formatCategory(job.category)}
                </span>
              )}
            </div>

            {/* BODY */}
            <p className="mt-2">{job.description}</p>
            <p><b>City:</b> {job.city}</p>
            <p><b>Salary:</b> ₹{job.salary}</p>

            {/* EXPIRY */}
            <p>
              <b>Expires on:</b>{" "}
              <span className={job.expired ? "text-danger fw-bold" : "text-success"}>
                {job.expiryDate}
              </span>
              {job.expired && (
                <span className="badge bg-danger ms-2">EXPIRED</span>
              )}
            </p>

            {/* ACTIONS */}
            <div className="d-flex flex-wrap gap-2 mt-2">

              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  navigate(`/employee/job/${job.id}/applicants`)
                }
              >
                View Applicants
              </button>

              {/* RENEW ONLY IF EXPIRED */}
              {job.expired && (
                <>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    style={{ width: "120px" }}
                    placeholder="Days"
                    value={renewDays[job.id] || ""}
                    onChange={(e) =>
                      setRenewDays({
                        ...renewDays,
                        [job.id]: e.target.value,
                      })
                    }
                  />

                  <button
                    className="btn btn-warning"
                    onClick={() => renewJob(job.id)}
                  >
                    Renew
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EmployeeMyJobs;
