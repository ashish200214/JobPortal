import { useEffect, useState } from "react";
import api from "../../axios";

function ProfileSummary({ student, onUpdate }) {

  const [editing, setEditing] = useState(false);
  const [summary, setSummary] = useState("");
  const [saving, setSaving] = useState(false);

  // 🔥 IMPORTANT: sync state when profile reloads
  useEffect(() => {
    setSummary(student.profileSummary || "");
  }, [student.profileSummary]);

  const saveSummary = () => {
    setSaving(true);

    api.put("/api/student/profile", {
      name: student.name,
      mobileNo: student.mobileNo,
      workingStatus: student.workingStatus,
      profileSummary: summary
    })
      .then(() => {
        setEditing(false);
        onUpdate(); // reload profile
      })
      .finally(() => setSaving(false));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Profile Summary</h5>

        {!editing && (
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        )}
      </div>

      {/* VIEW MODE */}
      {!editing && (
        summary && summary.trim() !== "" ? (
          <p style={{ whiteSpace: "pre-line" }}>
            {summary}
          </p>
        ) : (
          <p className="text-muted">
            No profile summary added.
          </p>
        )
      )}

      {/* EDIT MODE */}
      {editing && (
        <>
          <textarea
            className="form-control mb-3"
            rows={5}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write a brief professional summary about yourself"
          />

          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              disabled={saving}
              onClick={saveSummary}
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              className="btn btn-secondary"
              disabled={saving}
              onClick={() => {
                setSummary(student.profileSummary || "");
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileSummary;
