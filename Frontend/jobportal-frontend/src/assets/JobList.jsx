import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function JobList() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [salary, setSalary] = useState("");

  const fetchJobs = async () => {
    try {
      // ✅ build params dynamically (IMPORTANT FIX)
      const params = {};

      if (keyword.trim() !== "") params.keyword = keyword;
      if (location.trim() !== "") params.location = location;
      if (industry.trim() !== "") params.industry = industry;
      if (salary !== "") params.salary = salary;

      const res = await axios.get(
        "http://localhost:8080/api/job/search",
        { params }
      );

      setJobs(res.data || []);
    } catch (err) {
      console.error("FETCH ERROR =", err.response || err);

      if (err.response?.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        navigate("/student/login");
      }
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [keyword, location, industry, salary]);

  function applyForJob(jobId) {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/student/login");
      return;
    }

    navigate(`/jobapply/${jobId}`);
  }

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
        {jobs.map((job) => (
          <div className="col-md-4 mb-3" key={job.id}>
            <div className="card p-3 shadow">
              <h5>{job.jobRole}</h5>
              <p>{job.description}</p>
              <p>
                <b>City:</b> {job.city}
              </p>
              <p>
                <b>Salary:</b> ₹{job.salary}
              </p>

              <button
                className="btn btn-primary"
                onClick={() => applyForJob(job.id)}
              >
                Apply For Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;
