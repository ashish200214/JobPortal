import { useEffect, useState } from "react";
import axios from "axios";

function StudentAppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/student/applications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h5>Loading applied jobs...</h5>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>My Applied Jobs</h3>

      {applications.length === 0 && (
        <p className="text-muted">You have not applied for any jobs yet.</p>
      )}

      {applications.map((app) => (
        <div key={app.id} className="card p-3 mb-3 shadow">
          <h5>{app.job.jobRole}</h5>
          <p className="mb-1">{app.job.companyName}</p>
          <p className="mb-1">
            Status: <b>{app.status}</b>
          </p>

          {app.status === "REJECTED" && (
            <p className="text-danger mb-0">
              ❌ Unfortunately, your application was rejected.
            </p>
          )}

          {app.status === "SELECTED" && (
            <p className="text-success mb-0">
              🎉 Congratulations! You are selected.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default StudentAppliedJobs;
