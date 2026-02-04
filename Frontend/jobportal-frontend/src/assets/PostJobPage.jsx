import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

function PostJobPage() {
  const navigate = useNavigate();

  // ================= JOB DETAILS =================
  const [jobRole, setJobRole] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [openings, setOpenings] = useState("");

  // ================= CATEGORY & EXPIRY =================
  const [category, setCategory] = useState("");
  const [expiryDays, setExpiryDays] = useState("");

  // ================= SKILLS =================
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  // ================= COMPANY PROFILE =================
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");

  // ================= CONTACT & LOCATION =================
  const [mobileNo, setMobileNo] = useState("");
  const [city, setCity] = useState("");

  // ================= SKILL HANDLERS =================
  function addSkill() {
    if (!skillInput.trim()) return;
    setSkills([...skills, skillInput.trim()]);
    setSkillInput("");
  }

  function removeSkill(index) {
    setSkills(skills.filter((_, i) => i !== index));
  }

  // ================= SUBMIT =================
  async function submitJob(e) {
    e.preventDefault();

    if (!category) {
      alert("Please select job category");
      return;
    }

    try {
      await api.post("/api/job", {
        jobRole,
        description,
        salary,
        openings,
        category,
        expiryDays: expiryDays || null,
        skills,
        companyName,
        companyDescription,
        companyWebsite,
        companyIndustry,
        mobileNo,
        city
      });

      alert("Job posted successfully");
      navigate("/employee/home");

    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Session expired. Please login again.");
        navigate("/employee/login");
      } else {
        alert("Failed to post job");
      }
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-4">Post New Job</h3>

      <form onSubmit={submitJob}>

        {/* ================= JOB DETAILS ================= */}
        <h5 className="mb-3">Job Details</h5>

        <input
          className="form-control mb-2"
          placeholder="Job Role"
          value={jobRole}
          onChange={e => setJobRole(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-3"
          placeholder="Job Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        <div className="row mb-3">
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Salary"
              value={salary}
              onChange={e => setSalary(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Openings"
              value={openings}
              onChange={e => setOpenings(e.target.value)}
              required
            />
          </div>
        </div>

        <hr />

        {/* ================= CATEGORY & EXPIRY ================= */}
        <h5 className="mb-3">Job Type & Expiry</h5>

        <select
          className="form-control mb-2"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="">Select Job Category</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="PART_TIME">Part-time</option>
          <option value="FULL_TIME">Full-time</option>
          <option value="FREELANCE">Freelance</option>
        </select>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Job expires in (days) — default 30"
          value={expiryDays}
          onChange={e => setExpiryDays(e.target.value)}
          min="1"
        />

        <hr />

        {/* ================= SKILLS ================= */}
        <h5 className="mb-3">Required Skills</h5>

        <div className="d-flex mb-2">
          <input
            className="form-control"
            placeholder="Add skill (e.g. Java)"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
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
              className="badge bg-primary me-2 mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => removeSkill(index)}
            >
              {skill} ✕
            </span>
          ))}
        </div>

        <hr />

        {/* ================= COMPANY PROFILE ================= */}
        <h5 className="mb-3">Company Profile</h5>

        <input
          className="form-control mb-2"
          placeholder="Company Name"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="Company Description"
          value={companyDescription}
          onChange={e => setCompanyDescription(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Company Website (optional)"
          value={companyWebsite}
          onChange={e => setCompanyWebsite(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Company Industry"
          value={companyIndustry}
          onChange={e => setCompanyIndustry(e.target.value)}
        />

        <hr />

        {/* ================= CONTACT & LOCATION ================= */}
        <h5 className="mb-3">Contact & Location</h5>

        <input
          className="form-control mb-2"
          placeholder="Mobile Number"
          value={mobileNo}
          onChange={e => setMobileNo(e.target.value)}
          required
        />

        <input
          className="form-control mb-4"
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value)}
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
  