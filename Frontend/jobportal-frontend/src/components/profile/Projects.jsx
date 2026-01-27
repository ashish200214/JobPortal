import { useState } from "react";
import api from "../../axios";

function Projects({ projects, onUpdate }) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    projectLink: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProject = () => {
    if (!form.title || !form.description) return;

    api.post("/api/student/project", form)
      .then(() => {
        setForm({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          projectLink: ""
        });
        onUpdate();
      })
      .catch(err => console.error("Add project error", err));
  };

  return (
    <div>
      <h5 className="mb-3">Projects</h5>

      {projects.map(p => (
        <div key={p.id} className="border rounded p-3 mb-3">
          <h6>{p.title}</h6>
          <p>{p.description}</p>
          <small className="text-muted">
            {p.startDate} – {p.endDate}
          </small>

          {p.projectLink && (
            <div>
              <a href={p.projectLink} target="_blank" rel="noreferrer">
                View Project
              </a>
            </div>
          )}
        </div>
      ))}

      <hr />

      <div className="row g-3">
        <div className="col-md-6">
          <input
            className="form-control"
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            name="projectLink"
            placeholder="Project Link (optional)"
            value={form.projectLink}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <textarea
            className="form-control"
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addProject}
          >
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default Projects;
