import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

function StudentHomePage() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  // 🔔 POLL NOTIFICATION COUNT
  useEffect(() => {
    const fetchUnread = () => {
      api
        .get("/api/student/notifications/unread-count")
        .then((res) => {
          setUnreadCount(res.data);
        })
        .catch(() => {
          // ignore silently (token expiry etc.)
        });
    };

    fetchUnread(); // initial load

    const interval = setInterval(fetchUnread, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-5">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Dashboard</h2>

        <div className="d-flex align-items-center gap-3">
          {/* 🔔 NOTIFICATION */}
          <button
            className="btn btn-outline-secondary position-relative"
            onClick={() => navigate("/student/notifications")}
          >
            🔔
            {unreadCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {unreadCount}
              </span>
            )}
          </button>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="row">
        {/* VIEW JOBS */}
        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Browse Jobs</h5>
              <p className="card-text">
                Explore and apply for available jobs.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/jobs")}
              >
                View Jobs
              </button>
            </div>
          </div>
        </div>

        {/* APPLIED JOBS */}
        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h5 className="card-title">My Applications</h5>
              <p className="card-text">
                Track jobs you have applied for.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/student/applied-jobs")}
              >
                View Applied Jobs
              </button>
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h5 className="card-title">My Profile</h5>
              <p className="card-text">
                View or update your profile details.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/student/profile")}
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHomePage;
