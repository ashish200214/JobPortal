import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentRegPage() {

    const navigate = useNavigate();

    function submit(e) {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        };

        axios.post("http://localhost:8080/api/students/register", data)
            .then(() => {
                alert("Registration successful");
                navigate("/login");
            })
            .catch((err) => {
                alert(err.response?.data || "Registration failed");
            });
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
                <h3 className="text-center mb-3">Student Registration</h3>

                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" name="name" className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" required />
                    </div>

                    <button className="btn btn-primary w-100">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default StudentRegPage;
