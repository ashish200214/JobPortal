import { useState } from "react";
import api from "../../axios";

function Languages({ languages, onUpdate }) {
  const [l, setL] = useState({ name: "", proficiency: "" });

  const add = () => {
    api.post("/api/student/language", l)
      .then(() => {
        setL({ name: "", proficiency: "" });
        onUpdate();
      });
  };

  return (
    <div>
      <h5>Languages</h5>

      {languages.map(lang => (
        <div key={lang.id}>{lang.name} – {lang.proficiency}</div>
      ))}

      <input className="form-control mb-1" placeholder="Language"
        value={l.name}
        onChange={e => setL({ ...l, name: e.target.value })}
      />
      <button className="btn btn-success" onClick={add}>Add Language</button>
    </div>
  );
}

export default Languages;
