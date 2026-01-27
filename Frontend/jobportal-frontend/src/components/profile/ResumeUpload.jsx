import { useState } from "react";
import api from "../../axios";

function ResumeUpload({ resumeUrl, onUpdate }) {

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadResume = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    api.post("/api/student/upload-resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        setFile(null);
        onUpdate(); // reload profile data
      })
      .catch(err => {
        console.error("Resume upload failed ❌", err);
      })
      .finally(() => setUploading(false));
  };

  return (
    <div>
      <h5 className="mb-3">Resume</h5>

      {resumeUrl && (
        <p className="mb-2">
          <a
            href={`http://localhost:8080/${resumeUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            View Uploaded Resume
          </a>
        </p>
      )}

      <div className="row g-3 align-items-center">
        <div className="col-md-8">
          <input
            type="file"
            className="form-control"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-success w-100"
            disabled={!file || uploading}
            onClick={uploadResume}
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>
        </div>
      </div>

      <small className="text-muted d-block mt-2">
        Accepted formats: PDF, DOC, DOCX
      </small>
    </div>
  );
}

export default ResumeUpload;
