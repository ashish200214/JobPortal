import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobApplicants() {

  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(
      `http://localhost:8080/api/employee/applications/job/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => setApplications(res.data))
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, [jobId]);

  async function updateStatus(appId, status) {
    try {
      await axios.put(
        `http://localhost:8080/api/employee/applications/${appId}/status?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setApplications(prev =>
        prev.map(app =>
          app.id === appId ? { ...app, status } : app
        )
      );

    } catch (err) {
      alert("Failed to update status");
    }
  }

  if (loading) {
    return <p className="text-center mt-5">Loading applicants...</p>;
  }

  return (
    <div className="container mt-4">
      <h3>Job Applicants</h3>

      {applications.length === 0 && (
        <p className="text-muted">No applications yet.</p>
      )}

      {applications.map(app => (
        <div key={app.id} className="card p-3 mb-3 shadow">
          <h5>{app.student?.name}</h5>
          <p>Email: {app.student?.email}</p>
          <p>Status: <b>{app.status}</b></p>

          {app.status === "APPLIED" && (
            <div className="d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={() => updateStatus(app.id, "SELECTED")}
              >
                Accept
              </button>

              <button
                className="btn btn-danger"
                onClick={() => updateStatus(app.id, "REJECTED")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default JobApplicants;
