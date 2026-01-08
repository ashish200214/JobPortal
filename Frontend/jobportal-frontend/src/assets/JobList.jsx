import { useEffect, useState } from "react";
import axios from "axios";

function JobList() {

  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [salary, setSalary] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/job/search",
        {
          params: {
            keyword: keyword || null,
            location: location || null,
            industry: industry || null,
            salary: salary || null
          }
        }
      );
      setJobs(res.data || []);
    } catch (err) {
      console.error(err);
      setJobs([]);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [keyword, location, industry, salary]);

  return (
    <div className="container mt-4">

      <h3>Available Jobs</h3>

      <div className="row mb-3">
        <input className="col m-1" placeholder="Keyword" onChange={e => setKeyword(e.target.value)} />
        <input className="col m-1" placeholder="Location" onChange={e => setLocation(e.target.value)} />
        <input className="col m-1" placeholder="Industry" onChange={e => setIndustry(e.target.value)} />
        <input className="col m-1" type="number" placeholder="Salary" onChange={e => setSalary(e.target.value)} />
      </div>

      {jobs.length === 0 && <p>No jobs found</p>}

      <div className="row">
        {jobs.map(job => (
          <div className="col-md-4 mb-3" key={job.id}>
            <div className="card p-3 shadow">
              <h5>{job.jobRole}</h5>
              <p>{job.description}</p>
              <p><b>City:</b> {job.city}</p>
              <p><b>Salary:</b> ₹{job.salary}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default JobList;
