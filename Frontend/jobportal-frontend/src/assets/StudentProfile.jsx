import { useEffect, useState } from "react";
import api from "../axios";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSummary from "../components/profile/ProfileSummary";
import Skills from "../components/profile/Skills";
import Education from "../components/profile/Education";
import Projects from "../components/profile/Projects";
import Internships from "../components/profile/Internships";
import Languages from "../components/profile/Languages";
import Accomplishments from "../components/profile/Accomplishments";
import ResumeUpload from "../components/profile/ResumeUpload";

function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = () => {
    api.get("/api/student/profile")
      .then(res => setStudent(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!student) return <p className="text-center mt-5">No profile</p>;

  return (
    <div className="container mt-4 mb-5">

      <div className="card p-3 mb-4">
        <ProfileHeader student={student} />
      </div>

      <div className="card p-3 mb-4">
        <ResumeUpload
          resumeUrl={student.resumeUrl}
          onUpdate={loadProfile}
        />
      </div>

      <div className="card p-3 mb-4">
        <ProfileSummary student={student} />
      </div>

      <div className="card p-3 mb-4">
        <Skills skills={student.skills || []} onUpdate={loadProfile} />
      </div>

      <div className="card p-3 mb-4">
        <Education educationList={student.educationList || []} onUpdate={loadProfile} />
      </div>

      <div className="card p-3 mb-4">
        <Projects projects={student.projects || []} onUpdate={loadProfile} />
      </div>

      <div className="card p-3 mb-4">
        <Internships internships={student.internships || []} onUpdate={loadProfile} />
      </div>

      <div className="card p-3 mb-4">
        <Languages languages={student.languages || []} onUpdate={loadProfile} />
      </div>

      <div className="card p-3 mb-4">
        <Accomplishments accomplishments={student.accomplishments || []} onUpdate={loadProfile} />
      </div>

    </div>
  );
}

export default StudentProfile;
