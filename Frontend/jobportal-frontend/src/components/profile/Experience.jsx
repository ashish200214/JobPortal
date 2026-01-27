import { useState } from "react";
import api from "../../axios";

function Experience({ experiences = [], onUpdate }) {

  const [form, setForm] = useState({
    jobTitle: "",
    companyName: "",
    description: "",
    startDate: "",
    endDate: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addExperience = () => {
    api.post("/api/student/experience", form)
      .then(() => {
        setForm({
          jobTitle: "",
          companyName: "",
          description: "",
          startDate: "",
          endDate: ""
        });
        onUpdate();
      });
  };

  return (
    <div>
      <h5 className="mb-3">Experience</h5>

      {experiences.map(exp => (
        <div key={exp.id} className="border rounded p-3 mb-3">
          <h6>{exp.jobTitle} @ {exp.companyName}</h6>
          <p>{exp.description}</p>
          <small className="text-muted">
            {exp.startDate} – {exp.endDate || "Present"}
          </small>
        </div>
      ))}

      <hr />

      <div className="row g-3">
        <div className="col-md-6">
          <input className="form-control"
            name="jobTitle"
            placeholder="Job Title"
            value={form.jobTitle}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input className="form-control"
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <textarea className="form-control"
            name="description"
            placeholder="Work description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input type="date" className="form-control"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input type="date" className="form-control"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button className="btn btn-primary" onClick={addExperience}>
            Add Experience
          </button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
