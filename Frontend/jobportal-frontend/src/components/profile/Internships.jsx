import { useState } from "react";
import api from "../../axios";

function Internships({ internships, onUpdate }) {

  const [form, setForm] = useState({
    role: "",
    companyName: "",
    description: "",
    startDate: "",
    endDate: "",
    companyWebsite: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addInternship = () => {
    api.post("/api/student/internship", form)
      .then(() => {
        setForm({
          role: "",
          companyName: "",
          description: "",
          startDate: "",
          endDate: "",
          companyWebsite: ""
        });
        onUpdate();
      });
  };

  return (
    <div>
      <h5 className="mb-3">Internships</h5>

      {internships.map(i => (
        <div key={i.id} className="border rounded p-3 mb-3">
          <h6>{i.role} @ {i.companyName}</h6>
          <p className="mb-1">{i.description}</p>
          <small className="text-muted">
            {i.startDate} – {i.endDate}
          </small>

          {i.companyWebsite && (
            <div>
              <a href={i.companyWebsite} target="_blank" rel="noreferrer">
                Company Website
              </a>
            </div>
          )}
        </div>
      ))}

      <hr />

      <div className="row g-3">
        <div className="col-md-6">
          <input className="form-control"
            name="role"
            placeholder="Role"
            value={form.role}
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
            placeholder="Internship Description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input className="form-control"
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input className="form-control"
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <input className="form-control"
            name="companyWebsite"
            placeholder="Company Website (optional)"
            value={form.companyWebsite}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button className="btn btn-primary" onClick={addInternship}>
            Add Internship
          </button>
        </div>
      </div>
    </div>
  );
}

export default Internships;
