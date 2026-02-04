import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios";

function JobApply() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [student, setStudent] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  // ==========================
  // LOAD DATA
  // ==========================
  useEffect(() => {
    if (!jobId) {
      alert("Invalid job");
      navigate("/jobs");
      return;
    }

    fetchData();
  }, [jobId]);

  async function fetchData() {
    try {
      setLoading(true);

      const jobRes = await api.get(`/api/job/${jobId}`);

      if (jobRes.data.expired) {
        alert("This job has expired");
        navigate("/jobs");
        return;
      }

      const studentRes = await api.get("/api/student/me");

      setJob(jobRes.data);
      setStudent(studentRes.data);

    } catch (err) {
      alert("Session expired. Please login again.");
      localStorage.clear();
      navigate("/student/login");
    } finally {
      setLoading(false);
    }
  }

  // ==========================
  // APPLY JOB
  // ==========================
  async function applyJob() {
    console.log("APPLY BUTTON CLICKED");

    if (!resumeFile) {
      alert("Please upload your resume (PDF)");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      setApplying(true);

      await api.post(`/api/job/apply/${jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("✅ Job Applied Successfully");
      navigate("/student/home");

    } catch (err) {
      alert(err.response?.data || "Failed to apply");
    } finally {
      setApplying(false);
    }
  }

  // ==========================
  // UI
  // ==========================
  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (!job || !student) {
    return <div className="container mt-5 text-center">Data not available</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h3>{job.jobRole}</h3>
        <p>{job.description}</p>

        <p><b>Company:</b> {job.companyName}</p>
        <p><b>City:</b> {job.city}</p>
        <p><b>Salary:</b> ₹{job.salary}</p>

        <hr />

        <h5>About the Company</h5>
        <p>{job.companyDescription}</p>

        {job.companyWebsite && (
          <p>
            <b>Website:</b>{" "}
            <a href={job.companyWebsite} target="_blank" rel="noreferrer">
              {job.companyWebsite}
            </a>
          </p>
        )}

        <p><b>Industry:</b> {job.companyIndustry}</p>

        <hr />

        <h5>Your Details</h5>
        <input className="form-control mb-2" value={student.email} disabled />
        <input className="form-control mb-2" value={student.mobileNo} disabled />

        <input
          type="file"
          className="form-control mb-3"
          accept=".pdf"
          onChange={e => setResumeFile(e.target.files[0])}
        />

        {/* ✅ GUARANTEED CLICKABLE BUTTON */}
        <button
          type="button"
          className="btn btn-success w-100"
          onClick={applyJob}
          disabled={applying}
        >
          {applying ? "Applying..." : "Confirm Apply"}
        </button>

      </div>
    </div>
  );
}

export default JobApply;
