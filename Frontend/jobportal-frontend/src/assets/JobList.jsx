import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios"; // ✅ use your interceptor-based axios

function JobList() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [salary, setSalary] = useState("");

  // ===============================
  // FETCH JOBS WITH FILTERS
  // ===============================
  const fetchJobs = async () => {
    try {
      const params = {};

      if (keyword.trim() !== "") params.keyword = keyword;
      if (location.trim() !== "") params.location = location;
      if (industry.trim() !== "") params.industry = industry;
      if (salary !== "") params.salary = salary;

      const res = await api.get("/api/job/search", { params });
      setJobs(res.data || []);
    } catch (err) {
      if (err.response?.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        navigate("/student/login");
      }
    }
  };

  // ===============================
  // FETCH ALREADY APPLIED JOBS
  // ===============================
  const fetchAppliedJobs = async () => {
    try {
      const res = await api.get("/api/student/applied-jobs");
      const ids = res.data.map(app => app.job.id);
      setAppliedJobIds(ids);
    } catch {
      // silent fail
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [keyword, location, industry, salary]);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  // ===============================
  // ONE CLICK APPLY
  // ===============================
  const applyForJob = async (jobId) => {
    try {
      const res = await api.post(
        `/api/student/apply-one-click/${jobId}`
      );

      alert(res.data);

      // update UI instantly
      setAppliedJobIds(prev => [...prev, jobId]);

    } catch (err) {
      alert(err.response?.data || "Failed to apply");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Available Jobs</h3>

      {/* FILTERS */}
      <div className="row mb-3">
        <input
          className="col m-1"
          placeholder="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input
          className="col m-1"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="col m-1"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />

        <input
          className="col m-1"
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>

      {jobs.length === 0 && <p>No jobs found</p>}

      <div className="row">
        {jobs.map((job) => {
          const isApplied = appliedJobIds.includes(job.id);

          return (
            <div className="col-md-4 mb-3" key={job.id}>
              <div className="card p-3 shadow h-100">
                <h5>{job.jobRole}</h5>
                <p>{job.description}</p>

                <p>
                  <b>City:</b> {job.city}
                </p>

                <p>
                  <b>Salary:</b> ₹{job.salary}
                </p>

                <button
                  className={`btn ${
                    isApplied ? "btn-secondary" : "btn-primary"
                  }`}
                  disabled={isApplied}
                  onClick={() => applyForJob(job.id)}
                >
                  {isApplied ? "Applied ✔" : "Apply"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default JobList;
