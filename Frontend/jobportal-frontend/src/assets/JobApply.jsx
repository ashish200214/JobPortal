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

  useEffect(() => {
    if (!jobId || jobId === "undefined") {
      alert("Invalid job");
      navigate("/jobs");
      return;
    }

    const token = localStorage.getItem("token");
    fetchData(token);
  }, [jobId]);

  async function fetchData(token) {
    try {
      setLoading(true);

      const jobRes = await axios.get(
        `http://localhost:8080/api/job/${jobId}`
      );

      const studentRes = await axios.get(
        "http://localhost:8080/api/student/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setJob(jobRes.data);
      setStudent(studentRes.data);

    } catch (err) {
      console.error("FETCH ERROR =", err.response || err);

      // if (err.response?.status === 401 || err.response?.status === 403) {
      //   alert("Session expired. Please login again.");
      //   navigate("/student/login");
      // } else {
      //   alert("Unable to load job details");
      //   navigate("/jobs");
      // }
    } finally {
      setLoading(false);
    }
  }

  async function applyJob() {
    if (!resumeFile) {
      alert("Please upload your resume (PDF)");
      return;
    }

    const token = localStorage.getItem("token");

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
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Session expired. Please login again.");
        navigate("/student/login");
      } else {
        alert("❌ Something went wrong while applying");
      }
    } finally {
      setApplying(false);
    }
  }

  if (loading) {
    return <div className="container mt-5 text-center">Loading job details...</div>;
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

        <h5>Applicant Details</h5>
        <input className="form-control mb-2" value={student.email} disabled />
        <input className="form-control mb-2" value={student.mobileNo} disabled />

        <input
          type="file"
          className="form-control mb-3"
          accept=".pdf"
          onChange={e => setResumeFile(e.target.files[0])}
        />

        <button
          className="btn btn-success"
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
