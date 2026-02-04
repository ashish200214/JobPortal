import { useState } from "react";
import api from "../../axios";

function Languages({ languages, onUpdate }) {
  const [lang, setLang] = useState({
    name: "",
    proficiency: ""
  });

  // =====================
  // ADD LANGUAGE
  // =====================
  const addLanguage = async () => {
    if (!lang.name || !lang.proficiency) {
      alert("Please enter language and proficiency");
      return;
    }

    try {
      await api.post("/api/student/language", lang);
      setLang({ name: "", proficiency: "" });
      onUpdate();
    } catch (err) {
      console.error(err);
      alert("Failed to add language");
    }
  };

  return (
    <div>
      <h5 className="mb-3">Languages</h5>

      {/* 🔥 BADGE LIST */}
      {languages.length === 0 && (
        <p className="text-muted">No languages added</p>
      )}

      <div className="mb-3">
        {languages.map((l) => (
          <span
            key={l.id}
            className="badge bg-primary me-2 mb-2"
            style={{
              fontSize: "0.9rem",
              padding: "8px 12px",
              borderRadius: "20px"
            }}
          >
            {l.name} • {l.proficiency}
          </span>
        ))}
      </div>

      {/* 🔥 INPUTS */}
      <input
        className="form-control mb-2"
        placeholder="Language (e.g. English)"
        value={lang.name}
        onChange={(e) =>
          setLang({ ...lang, name: e.target.value })
        }
      />

      <select
        className="form-control mb-2"
        value={lang.proficiency}
        onChange={(e) =>
          setLang({ ...lang, proficiency: e.target.value })
        }
      >
        <option value="">Select Proficiency</option>
        <option value="Basic">Basic</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Fluent">Fluent</option>
        <option value="Native">Native</option>
      </select>

      <button className="btn btn-success" onClick={addLanguage}>
        Add Language
      </button>
    </div>
  );
}

export default Languages;
