import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeLogin() {

    const navigate = useNavigate();

    function submit(e) {
        e.preventDefault();

        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        };

        axios.post("http://localhost:8080/api/auth/employee/login", data)
            .then((res) => {
                localStorage.setItem("token", res.data);
                localStorage.setItem("role", "EMPLOYEE");
                navigate("/employee/home");
            })
            .catch((err) => {
                alert(err.response?.data || "Login failed");
            });
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-3">Employer Login</h3>

                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" required />
                    </div>

                    <button className="btn btn-success w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EmployeeLogin;
