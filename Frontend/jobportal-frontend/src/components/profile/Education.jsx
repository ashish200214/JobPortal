import { useState } from "react";
import api from "../../axios";

function Education({ educationList, onUpdate }) {
  const [edu, setEdu] = useState({
    degree: "",
    college: "",
    startYear: "",
    endYear: ""
  });

  const add = () => {
    api.post("/api/student/education", edu)
      .then(() => {
        setEdu({ degree: "", college: "", startYear: "", endYear: "" });
        onUpdate();
      });
  };

  return (
    <div>
      <h5>Education</h5>

      {educationList.length === 0 && <p>No education added</p>}

      {educationList.map(e => (
        <div key={e.id} className="border p-2 mb-2">
          <b>{e.degree}</b>
          <div>{e.college}</div>
          <small>{e.startYear} - {e.endYear}</small>
        </div>
      ))}

      <input className="form-control mb-1" placeholder="Degree"
        value={edu.degree}
        onChange={e => setEdu({ ...edu, degree: e.target.value })}
      />
      <input className="form-control mb-1" placeholder="College"
        value={edu.college}
        onChange={e => setEdu({ ...edu, college: e.target.value })}
      />
      <button className="btn btn-success" onClick={add}>Add Education</button>
    </div>
  );
}

export default Education;
