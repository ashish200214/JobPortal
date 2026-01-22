import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios";

function JobApplicants() {

  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/employee/applications/job/${jobId}`)
      .then(res => setApplications(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [jobId]);

  async function updateStatus(appId, status) {
    try {
      await api.put(`/api/employee/applications/${appId}/status`, null, {
        params: { status }
      });

      setApplications(prev =>
        prev.map(a => a.id === appId ? { ...a, status } : a)
      );
    } catch {
      alert("Failed to update status");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>Job Applicants</h3>
      {applications.map(app => (
        <div key={app.id} className="card p-3 mb-3">
          <h5>{app.student?.name}</h5>
          <p>{app.student?.email}</p>
          <p>Status: <b>{app.status}</b></p>

          {app.status === "APPLIED" && (
            <>
              <button onClick={() => updateStatus(app.id, "SELECTED")} className="btn btn-success me-2">Accept</button>
              <button onClick={() => updateStatus(app.id, "REJECTED")} className="btn btn-danger">Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default JobApplicants;
