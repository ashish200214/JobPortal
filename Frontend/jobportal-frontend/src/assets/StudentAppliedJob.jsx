import { useEffect, useState } from "react";
import api from "../axios";

function StudentAppliedJobs() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/student/applications")
      .then(res => setApplications(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h5 className="text-center mt-5">Loading...</h5>;

  return (
    <div className="container mt-4">
      <h3>My Applied Jobs</h3>
      {applications.map(app => (
        <div key={app.id} className="card p-3 mb-3">
          <h5>{app.job.jobRole}</h5>
          <p>{app.job.companyName}</p>
          <p>Status: <b>{app.status}</b></p>
        </div>
      ))}
    </div>
  );
}

export default StudentAppliedJobs;
