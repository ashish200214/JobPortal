import { useState } from "react";
import api from "../../axios";

function Accomplishments({ accomplishments, onUpdate }) {

  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addAccomplishment = () => {
    if (!form.title || !form.description) return;

    api.post("/api/student/accomplishment", form)
      .then(() => {
        setForm({ title: "", description: "" });
        onUpdate();
      })
      .catch(err => console.error("Add accomplishment error", err));
  };

  return (
    <div>
      <h5 className="mb-3">Accomplishments</h5>

      {accomplishments.map(a => (
        <div key={a.id} className="border rounded p-3 mb-3">
          <h6>{a.title}</h6>
          <p>{a.description}</p>
        </div>
      ))}

      <hr />

      <div className="row g-3">
        <div className="col-md-6">
          <input
            className="form-control"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <textarea
            className="form-control"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addAccomplishment}
          >
            Add Accomplishment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Accomplishments;
