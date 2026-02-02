import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios";

function JobApplicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplicants();
  }, []);

  async function loadApplicants() {
    try {
      const res = await api.get(
        `/api/employee/applications/job/${jobId}`
      );
      setApplications(res.data);
    } catch (err) {
      alert("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(applicationId, status) {
    try {
      await api.put(
        `/api/employee/applications/${applicationId}/status`,
        null,
        { params: { status } }
      );

      // ✅ update UI immediately
      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId
            ? { ...app, status }
            : app
        )
      );
    } catch (err) {
      alert("Failed to update status");
    }
  }

  function downloadResume(applicationId) {
    window.open(
      `http://localhost:8080/api/employee/resume/${applicationId}`,
      "_blank"
    );
  }

  if (loading) {
    return (
      <h5 className="text-center mt-5">
        Loading applicants...
      </h5>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Job Applicants</h3>

      {applications.length === 0 && (
        <p>No applicants for this job yet.</p>
      )}

      {applications.map(app => (
        <div key={app.id} className="card p-3 mb-3">
          <h5>{app.student?.name}</h5>
          <p>Email: {app.student?.email}</p>
          <p>
            Status: <b>{app.status}</b>
          </p>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => downloadResume(app.id)}
            >
              Download Resume
            </button>

            <button
              className="btn btn-success"
              disabled={app.status === "SELECTED"}
              onClick={() => updateStatus(app.id, "SELECTED")}
            >
              Select
            </button>

            <button
              className="btn btn-danger"
              disabled={app.status === "REJECTED"}
              onClick={() => updateStatus(app.id, "REJECTED")}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobApplicants;
