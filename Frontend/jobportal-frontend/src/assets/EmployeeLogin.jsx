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
      // 🔥 IMPORTANT: clear student session
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

      // ✅ REQUIRED
      localStorage.setItem("token", token);
      localStorage.setItem("role", "EMPLOYEE");

      alert("Employee login successful");
      navigate("/employee/home");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  }

  return (
    <div className="container mt-5">
      <h3>Employee Login</h3>

      <form onSubmit={login}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default EmployeeLogin;
