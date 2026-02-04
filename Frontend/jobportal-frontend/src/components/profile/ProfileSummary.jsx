function ProfileSummary({ student }) {
  return (
    <div>
      <h5>Profile Summary</h5>

      {student.profileSummary ? (
        <p>{student.profileSummary}</p>
      ) : (
        <p className="text-muted">No profile summary added</p>
      )}
    </div>
  );
}

export default ProfileSummary;
