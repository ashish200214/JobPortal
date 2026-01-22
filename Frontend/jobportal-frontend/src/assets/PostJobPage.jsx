import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

function PostJobPage() {
  const navigate = useNavigate();

  const [jobRole, setJobRole] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [openings, setOpenings] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [city, setCity] = useState("");

  // ✅ SKILLS
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  function addSkill() {
    if (!skillInput.trim()) return;

    setSkills([...skills, skillInput.trim()]);
    setSkillInput("");
  }

  function removeSkill(index) {
    setSkills(skills.filter((_, i) => i !== index));
  }

  async function submitJob(e) {
    e.preventDefault();

    try {
      await api.post("/api/job", {
        jobRole,
        description,
        skills,      // ✅ ARRAY
        salary,
        openings,
        companyName,
        mobileNo,
        city,
      });

      alert("Job posted successfully");
      navigate("/employee/home");

    } catch (err) {
      console.error("POST JOB ERROR =", err.response || err);

      if (err.response?.status === 403 || err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/employee/login");
      } else {
        alert("Failed to post job");
      }
    }
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Post New Job</h3>

      <form onSubmit={submitJob}>
        {/* JOB ROLE */}
        <input
          className="form-control mb-2"
          placeholder="Job Role"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          required
        />

        {/* DESCRIPTION */}
        <textarea
          className="form-control mb-3"
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* SKILLS */}
        <label className="form-label fw-semibold">Skills</label>
        <div className="d-flex mb-2">
          <input
            className="form-control"
            placeholder="Add skill (e.g. Java)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={addSkill}
          >
            Add
          </button>
        </div>

        <div className="mb-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="badge bg-primary me-2"
              style={{ cursor: "pointer" }}
              onClick={() => removeSkill(index)}
            >
              {skill} ✕
            </span>
          ))}
        </div>

        {/* SALARY */}
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        {/* OPENINGS */}
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Openings"
          value={openings}
          onChange={(e) => setOpenings(e.target.value)}
          required
        />

        {/* COMPANY */}
        <input
          className="form-control mb-2"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />

        {/* MOBILE */}
        <input
          className="form-control mb-2"
          placeholder="Mobile Number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          required
        />

        {/* CITY */}
        <input
          className="form-control mb-3"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJobPage;
