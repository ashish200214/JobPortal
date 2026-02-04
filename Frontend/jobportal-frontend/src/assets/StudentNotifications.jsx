import { useEffect, useState } from "react";
import api from "../axios";

function StudentNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const res = await api.get("/api/student/notifications");
      setNotifications(res.data);
    } catch {
      alert("Failed to load notifications");
    }
  }

  async function markAsRead(id) {
    try {
      await api.put(`/api/student/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n =>
          n.id === id ? { ...n, read: true } : n
        )
      );
    } catch {
      alert("Failed to mark notification as read");
    }
  }

  return (
    <div className="container mt-4">
      <h4>Notifications</h4>

      {notifications.length === 0 && <p>No notifications</p>}

      <ul className="list-group">
        {notifications.map(n => (
          <li
            key={n.id}
            className={`list-group-item d-flex justify-content-between ${
              n.read ? "" : "fw-bold"
            }`}
          >
            <span>{n.message}</span>

            {!n.read && (
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => markAsRead(n.id)}
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentNotifications;
