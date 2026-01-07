import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function JobList() {

    const [jobs, setJobs] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [industry, setIndustry] = useState("");
    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");

    const [searchParams] = useSearchParams();

    // 🔁 Load params from HomePage search
    useEffect(() => {
        setKeyword(searchParams.get("keyword") || "");
        setLocation(searchParams.get("location") || "");
    }, []);

    // 🔍 Fetch jobs from backend
 const fetchJobs = async () => {
    try {
        const res = await axios.get(
            "http://localhost:8080/api/job/search",
            {
                params: {
                    keyword: keyword || null,
                    location: location || null,
                    industry: industry || null,
                    minSalary: minSalary || null,
                    maxSalary: maxSalary || null
                }
            }
        );

        // ✅ SAFETY CHECK
        if (Array.isArray(res.data)) {
            setJobs(res.data);
        } else {
            setJobs([]); // prevent crash
        }

    } catch (err) {
        console.error("Error fetching jobs", err);
        setJobs([]); // prevent crash
    }
};


    // 🔥 Auto-fetch when filters change
    useEffect(() => {
        fetchJobs();
    }, [keyword, location, industry, minSalary, maxSalary]);

    return (
        <div className="container mt-4">

            <h3 className="mb-3">Available Jobs</h3>

            {/* 🔍 FILTER SECTION */}
            <div className="card p-3 mb-4 shadow-sm">
                <div className="row g-2">

                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Keyword (Java, React)"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>

                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Industry"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                        />
                    </div>

                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Min Salary"
                            value={minSalary}
                            onChange={(e) => setMinSalary(e.target.value)}
                        />
                    </div>

                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Max Salary"
                            value={maxSalary}
                            onChange={(e) => setMaxSalary(e.target.value)}
                        />
                    </div>

                    <div className="col-md-1 d-grid">
                        <button
                            className="btn btn-primary"
                            onClick={fetchJobs}
                            title="Search"
                        >
                            🔍
                        </button>
                    </div>

                </div>
            </div>

            {/* 📄 JOB LIST */}
            <div className="row">

                {jobs.length === 0 && (
                    <p className="text-muted text-center">
                        No jobs found
                    </p>
                )}

                {jobs.map((job) => (
                    <div className="col-md-4 mb-3" key={job.id}>
                        <div className="card shadow h-100">
                            <div className="card-body">

                                <h5 className="card-title">
                                    {job.jobRole}
                                </h5>

                                <p className="card-text">
                                    {job.description}
                                </p>

                                <p><b>Location:</b> {job.city}</p>
                                <p><b>Company:</b> {job.companyName}</p>
                                <p><b>Salary:</b> ₹{job.salary}</p>

                                {/* SKILLS */}
                                <div className="mb-2">
                                    {job.skills?.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="badge bg-secondary me-1"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>

                                <button className="btn btn-outline-primary w-100">
                                    Apply Job
                                </button>

                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default JobList;
