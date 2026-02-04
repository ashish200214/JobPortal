import { useState } from "react";
import api from "../../axios";

function Projects({ projects, onUpdate }) {
  const [project, setProject] = useState({
    title: "",
    description: ""
  });

  const addProject = async () => {
    if (!project.title || !project.description) return;

    await api.post("/api/student/project", project);
    setProject({ title: "", description: "" });
    onUpdate();
  };

  return (
    <div>
      <h5>Projects</h5>

      {projects.length === 0 && (
        <p className="text-muted">No projects added</p>
      )}

      {projects.map(p => (
        <div key={p.id} className="border p-2 mb-2">
          <b>{p.title}</b>
          <p className="mb-0">{p.description}</p>
        </div>
      ))}

      <input
        className="form-control mb-2"
        placeholder="Project Title"
        value={project.title}
        onChange={e => setProject({ ...project, title: e.target.value })}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Project Description"
        value={project.description}
        onChange={e =>
          setProject({ ...project, description: e.target.value })
        }
      />

      <button className="btn btn-success" onClick={addProject}>
        Add Project
      </button>
    </div>
  );
}

export default Projects;
