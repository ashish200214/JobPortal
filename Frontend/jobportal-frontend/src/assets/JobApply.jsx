import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function JobApply() {

  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [student, setStudent] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  // ==================================================
  // 🔐 AUTH CHECK + LOAD DATA
  // ==================================================
  useEffect(() => {

    if (!jobId || jobId === "undefined") {
      alert("Invalid job");
      navigate("/jobs");
      return;
    }

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "STUDENT") {
      navigate("/student/login");
      return;
    }

    fetchData(token);

    // eslint-disable-next-line
  }, [jobId]);

  // ==================================================
  // 📡 FETCH JOB + STUDENT (SAFE)
  // ==================================================
  async function fetchData(token) {
    try {
      setLoading(true);

      // ✅ JOB DETAILS (PUBLIC BUT TOKEN SAFE)
      const jobRes = await axios.get(
        `http://localhost:8080/api/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // ✅ STUDENT PROFILE (JWT REQUIRED)
      const studentRes = await axios.get(
        "http://localhost:8080/api/student/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("JOB DATA =", jobRes.data);
      console.log("STUDENT DATA =", studentRes.data);

      setJob(jobRes.data);
      setStudent(studentRes.data);

    } catch (err) {
      console.error("FETCH ERROR =", err.response || err);

      if (err.response?.status === 403) {
        localStorage.clear();
        navigate("/student/login");
      } else {
        alert("Unable to load job / student details");
        navigate("/jobs");
      }

    } finally {
      setLoading(false);
    }
  }

  // ==================================================
  // 📤 APPLY JOB (PDF UPLOAD)
  // ==================================================
  async function applyJob() {

    if (!resumeFile) {
      alert("Please upload your resume (PDF)");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/student/login");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      setApplying(true);

      await axios.post(
        `http://localhost:8080/api/job/apply/${jobId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("✅ Job Applied Successfully");
      navigate("/student/home");

    } catch (err) {
      console.error("APPLY ERROR =", err.response || err);

      if (err.response?.status === 400) {
        alert("⚠ You have already applied for this job");
      } else if (err.response?.status === 403) {
        localStorage.clear();
        navigate("/student/login");
      } else {
        alert("❌ Something went wrong while applying");
      }
    } finally {
      setApplying(false);
    }
  }

  // ==================================================
  // ⏳ LOADING
  // ==================================================
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h5>Loading job details...</h5>
      </div>
    );
  }

  // ==================================================
  // 🧱 SAFETY
  // ==================================================
  if (!job || !student) {
    return (
      <div className="container mt-5 text-center">
        <h5>Data not available</h5>
      </div>
    );
  }

  // ==================================================
  // 🖥️ UI
  // ==================================================
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        {/* JOB DETAILS */}
        <h3>{job.jobRole}</h3>
        <p>{job.description}</p>

        <hr />

        <p><b>Company:</b> {job.companyName}</p>
        <p><b>City:</b> {job.city}</p>
        <p><b>Salary:</b> ₹{job.salary}</p>
        <p><b>Openings:</b> {job.openings ?? "Not specified"}</p>

        {job.skills && job.skills.length > 0 && (
          <div className="mb-3">
            <b>Skills Required:</b><br />
            {job.skills.map((skill, index) => (
              <span key={index} className="badge bg-secondary me-1 mt-1">
                {skill}
              </span>
            ))}
          </div>
        )}

        <hr />

        {/* STUDENT DETAILS */}
        <h5>Applicant Details</h5>

        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" value={student.email || ""} disabled />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            className="form-control"
            value={student.mobileNo ?? "Not provided"}
            disabled
          />
        </div>

        {/* RESUME UPLOAD */}
        <div className="mb-3">
          <label>Upload Resume (PDF only)</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf"
            onChange={e => setResumeFile(e.target.files[0])}
          />
        </div>

        <div className="d-flex gap-2">
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

export default JobApply;
