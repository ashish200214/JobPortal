import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

function JobList() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [salary, setSalary] = useState("");

  const formatCategory = (category) => {
    if (!category) return "";
    return category
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  const fetchJobs = async () => {
    try {
      const params = {};
      if (keyword) params.keyword = keyword;
      if (location) params.location = location;
      if (industry) params.industry = industry;
      if (salary) params.salary = salary;

      const res = await api.get("/api/job/search", { params });
      setJobs(res.data || []);
    } catch {
      alert("Failed to load jobs");
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const res = await api.get("/api/student/applied-jobs");
      setAppliedJobIds(res.data.map(app => app.job.id));
    } catch {}
  };

  useEffect(() => {
    fetchJobs();
  }, [keyword, location, industry, salary]);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const applyForJob = async (jobId) => {
    try {
      const res = await api.post(`/api/student/apply-one-click/${jobId}`);
      alert(res.data);
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
        <input className="col m-1" placeholder="Keyword" value={keyword} onChange={e => setKeyword(e.target.value)} />
        <input className="col m-1" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <input className="col m-1" placeholder="Industry" value={industry} onChange={e => setIndustry(e.target.value)} />
        <input className="col m-1" type="number" placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} />
      </div>

      {jobs.length === 0 && <p>No jobs found</p>}

      <div className="row">
        {jobs.map(job => {
          const isApplied = appliedJobIds.includes(job.id);

          return (
            <div className="col-md-4 mb-3" key={job.id}>
              <div className="card p-3 shadow h-100">
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
                  className={`btn ${isApplied ? "btn-secondary" : "btn-primary"}`}
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
