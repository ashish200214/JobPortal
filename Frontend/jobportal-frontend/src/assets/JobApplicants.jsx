import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios";

function JobApplicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 FILTERS
  const [statusFilter, setStatusFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [degreeFilter, setDegreeFilter] = useState("");

  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchApplicants();
  }, [reload]);

  async function fetchApplicants() {
    try {
      setLoading(true);
      const res = await api.get(
        `/api/employee/applications/job/${jobId}`
      );
      setApplications(res.data || []);
      setFilteredApps(res.data || []);
    } catch {
      alert("Unable to load applicants");
    } finally {
      setLoading(false);
    }
  }

  // ================= APPLY FILTERS =================
  useEffect(() => {
    let data = [...applications];

    if (statusFilter) {
      data = data.filter(app => app.status === statusFilter);
    }

    if (skillFilter) {
      data = data.filter(app =>
        app.student?.skills?.some(
          s => s.name.toLowerCase().includes(skillFilter.toLowerCase())
        )
      );
    }

    if (degreeFilter) {
      data = data.filter(app =>
        app.student?.educations?.some(
          e => e.degree === degreeFilter
        )
      );
    }

    setFilteredApps(data);
  }, [statusFilter, skillFilter, degreeFilter, applications]);

  async function updateStatus(applicationId, status) {
    try {
      await api.put(
        `/api/employee/applications/${applicationId}/status`,
        null,
        { params: { status } }
      );
      setReload(prev => !prev);
    } catch {
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
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  // 🔥 collect unique degrees
  const degrees = [
    ...new Set(
      applications.flatMap(app =>
        app.student?.educations?.map(e => e.degree) || []
      )
    )
  ];

  return (
    <div className="container mt-4">
      <h3>Job Applicants</h3>

      {/* FILTERS */}
      <div className="row mb-3">
        <select className="col form-control m-1"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="APPLIED">Applied</option>
          <option value="SHORTLISTED">Shortlisted</option>
          <option value="SELECTED">Selected</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <input className="col form-control m-1"
          placeholder="Skill (Java, React)"
          value={skillFilter}
          onChange={e => setSkillFilter(e.target.value)}
        />

        <select className="col form-control m-1"
          value={degreeFilter}
          onChange={e => setDegreeFilter(e.target.value)}>
          <option value="">All Qualifications</option>
          {degrees.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {filteredApps.length === 0 && <p>No matching candidates</p>}

      {filteredApps.map(app => (
        <div key={app.id} className="card p-3 mb-3 shadow-sm">
          <h5>{app.student?.name}</h5>
          <p>{app.student?.email}</p>

          <p>
            <b>Qualification:</b>{" "}
            {app.student?.educations?.map(e => e.degree).join(", ")}
          </p>

          <p>
            <b>Status:</b>{" "}
            <span className="fw-bold">{app.status}</span>
          </p>

          <div className="d-flex gap-2 flex-wrap">
            <button
              className="btn btn-outline-secondary"
              onClick={() => downloadResume(app.id)}>
              Resume
            </button>

            <button
              className="btn btn-warning"
              onClick={() => updateStatus(app.id, "SHORTLISTED")}>
              Shortlist
            </button>

            <button
              className="btn btn-success"
              onClick={() => updateStatus(app.id, "SELECTED")}>
              Select
            </button>

            <button
              className="btn btn-danger"
              onClick={() => updateStatus(app.id, "REJECTED")}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobApplicants;
