import { useEffect, useState } from "react";
import axios from "axios";

function StudentAppliedJobs() {

  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/student/applications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => setApps(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Applied Jobs</h3>

      {apps.map(app => (
        <div key={app.id} className="card p-3 mb-3">
          <h5>{app.job.jobRole}</h5>
          <p>{app.job.companyName}</p>
          <p>Status: <b>{app.status}</b></p>

          {app.status === "REJECTED" && (
            <p className="text-danger">
              ❌ Unfortunately, your application was rejected.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default StudentAppliedJobs;
