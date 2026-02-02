import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    // 🔥 CLEAR OLD SESSION (SAFE SWITCH)
    localStorage.clear();

    axios
      .post("http://localhost:8080/api/student/auth/login", data)
      .then((res) => {
        const token = res.data;

        if (!token) {
          alert("Login failed: token not received");
          return;
        }

        // ✅ REQUIRED FOR YOUR APP
        localStorage.setItem("token", token);
        localStorage.setItem("role", "STUDENT");

        navigate("/student/home");
      })
      .catch((err) => {
        alert(err.response?.data || "Invalid email or password");
      });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h3 className="text-center mb-1">Student Login</h3>
        <p className="text-center text-muted mb-4">
          Sign in to apply for jobs
        </p>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="student@email.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>

          <button className="btn btn-success w-100 py-2 fw-semibold">
            Login
          </button>
        </form>

        <hr className="my-4" />

        <p className="text-center mb-0">
          Are you an employer?{" "}
          <span
            className="text-primary fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/employee/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
