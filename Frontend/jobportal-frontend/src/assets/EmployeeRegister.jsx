import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeRegister() {

    const navigate = useNavigate();

    function submit(e) {
        e.preventDefault();

        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        };

        // ✅ FIXED URL
        axios.post("http://localhost:8080/api/auth/employee/register", data)
            .then(() => {
                alert("Employer registered successfully");
                navigate("/employee/login");
            })
            .catch((err) => {
                alert(err.response?.data || "Registration failed");
            });
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
                <h3 className="text-center mb-3">Employer Registration</h3>

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
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EmployeeRegister;
