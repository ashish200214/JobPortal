import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ApplyJob() {

    const { jobId } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "STUDENT") {
            navigate("/student/login");
            return;
        }

        fetchJob();
    }, []);

    async function fetchJob() {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/job/${jobId}`
            );
            setJob(res.data);
        } catch (err) {
            alert("Job not found");
            navigate("/jobs");
        } finally {
            setLoading(false);
        }
    }

    async function applyJob() {
        try {
            setApplying(true);

            await axios.post(
                `http://localhost:8080/api/student/apply/${jobId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert("✅ Job Applied Successfully!");
            navigate("/student/home");

        } catch (err) {
            if (err.response?.status === 400) {
                alert("⚠ You have already applied for this job");
            } else if (err.response?.status === 403) {
                navigate("/student/login");
            } else {
                alert("Something went wrong");
            }
        } finally {
            setApplying(false);
        }
    }

    if (loading) {
        return <div className="container mt-5">Loading job details...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">

                <h3 className="mb-3">{job.jobRole}</h3>

                <p>{job.description}</p>

                <hr />

                <p><b>Company:</b> {job.companyName}</p>
                <p><b>City:</b> {job.city}</p>
                <p><b>Salary:</b> ₹{job.salary}</p>
                <p><b>Openings:</b> {job.openings}</p>

                {job.skills && job.skills.length > 0 && (
                    <div className="mb-3">
                        <b>Skills Required:</b><br />
                        {job.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="badge bg-secondary me-1 mt-1"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                <div className="d-flex gap-2 mt-3">
                    <button
                        className="btn btn-success"
                        onClick={applyJob}
                        disabled={applying}
                    >
                        {applying ? "Applying..." : "Confirm Apply"}
                    </button>

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/jobs")}
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ApplyJob;
