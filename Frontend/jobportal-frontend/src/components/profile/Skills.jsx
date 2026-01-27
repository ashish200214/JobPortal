import { useState } from "react";
import api from "../../axios";

function Skills({ skills, onUpdate }) {
  const [skillName, setSkillName] = useState("");

  const addSkill = () => {
    if (!skillName.trim()) return;

    api.post("/api/student/add-skill", null, {
      params: { skillName }
    })
    .then(() => {
      setSkillName("");
      onUpdate();
    })
    .catch(err => console.error(err));
  };

  const removeSkill = (id) => {
    api.delete(`/api/student/remove-skill/${id}`)
      .then(onUpdate);
  };

  return (
    <div>
      <h5>Key Skills</h5>

      {/* SHOW SKILLS */}
      <div className="mb-3">
        {skills.length === 0 && (
          <p className="text-muted">No skills added</p>
        )}

        {skills.map(skill => (
          <span key={skill.id} className="badge bg-primary me-2 mb-2">
            {skill.name}
            <button
              className="btn btn-sm btn-light ms-1"
              onClick={() => removeSkill(skill.id)}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* ADD SKILL */}
      <div className="d-flex gap-2">
        <input
          className="form-control"
          placeholder="Add skill (e.g. Java, React)"
          value={skillName}
          onChange={e => setSkillName(e.target.value)}
        />
        <button className="btn btn-success" onClick={addSkill}>
          Add
        </button>
      </div>
    </div>
  );
}

export default Skills;
