import { useState } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";

function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    try {
      // 🔥 CLEAR STUDENT SESSION
      localStorage.clear();

      const res = await api.post("/api/auth/employee/login", {
        email,
        password,
      });

      const token = res.data;

      if (!token) {
        alert("Login failed: token not received");
        return;
      }

      // ✅ REQUIRED FOR YOUR APP
      localStorage.setItem("token", token);
      localStorage.setItem("role", "EMPLOYEE");

      navigate("/employee/home");
    } catch (err) {
      alert("Invalid email or password");
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h3 className="text-center mb-1">Employer Login</h3>
        <p className="text-center text-muted mb-4">
          Manage jobs & applications
        </p>

        <form onSubmit={login}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="hr@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100 py-2 fw-semibold">
            Login
          </button>
        </form>

        <hr className="my-4" />

        <p className="text-center mb-0">
          Are you a student?{" "}
          <span
            className="text-success fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/student/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default EmployeeLogin;
