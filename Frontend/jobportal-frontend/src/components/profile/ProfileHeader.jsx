function ProfileHeader({ student }) {
  return (
    <div>
      <h4 className="mb-1">{student.name}</h4>
      <p className="mb-1">{student.email}</p>
      <p className="mb-1">{student.mobileNo}</p>
      <p className="text-muted">{student.workingStatus}</p>
    </div>
  );
}

export default ProfileHeader;
