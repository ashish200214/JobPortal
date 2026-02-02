import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios";

function JobApplicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 TRIGGER TO RELOAD COMPONENT DATA
  const [reload, setReload] = useState(false);

  // ✅ LOAD / RELOAD APPLICANTS
  useEffect(() => {
    fetchApplicants();
  }, [reload]); // 👈 re-run when reload changes

  async function fetchApplicants() {
    try {
      setLoading(true);

      const res = await api.get(
        `/api/employee/applications/job/${jobId}`
      );

      setApplications(res.data);
    } catch (err) {
      console.error("Failed to load applicants", err);
      alert("Unable to load applicants");
    } finally {
      setLoading(false);
    }
  }

  // ✅ UPDATE STATUS
  async function updateStatus(applicationId, status) {
    try {
      await api.put(
        `/api/employee/applications/${applicationId}/status`,
        null,
        { params: { status } }
      );

      // 🔁 trigger reload from DB
      setReload(prev => !prev);

    } catch (err) {
      console.error(
        "Status update failed (response blocked but DB updated):",
        err?.response || err
      );
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
      <div className="container mt-5 text-center">
        <h5>Loading applicants...</h5>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Job Applicants</h3>

      {applications.length === 0 && (
        <p>No applicants for this job yet.</p>
      )}

      {applications.map((app) => (
        <div key={app.id} className="card p-3 mb-3">
          <h5>{app.student?.name}</h5>
          <p>Email: {app.student?.email}</p>

          <p>
            Status:{" "}
            <b
              className={
                app.status === "SELECTED"
                  ? "text-success"
                  : app.status === "REJECTED"
                  ? "text-danger"
                  : "text-secondary"
              }
            >
              {app.status}
            </b>
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
