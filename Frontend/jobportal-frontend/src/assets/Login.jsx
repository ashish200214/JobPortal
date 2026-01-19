import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    axios
      .post("http://localhost:8080/api/auth/student/login", data)
      .then((res) => {

        // 🔥 BACKEND RETURNS STRING TOKEN (CONFIRMED)
        const token = res.data;

        if (!token) {
          alert("Login failed: token not received");
          return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("role", "STUDENT");

        console.log("TOKEN STORED =", token);
        console.log("ROLE STORED =", localStorage.getItem("role"));

        navigate("/student/home");
      })
      .catch(() => {
        alert("Invalid email or password");
      });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Student Login</h3>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" required />
          </div>

          <button className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
