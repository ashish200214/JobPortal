import { useNavigate } from "react-router-dom";

function EmployeeHomePage() {

    const navigate = useNavigate();

    function goToPostJobPage() {
        navigate("/employee/post-job");
    }

    function logout() {
        localStorage.clear();
        navigate("/employee/login");
    }

    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Employee Dashboard</h2>
                <button className="btn btn-danger" onClick={logout}>
                    Logout
                </button>
            </div>

            <div className="row">

                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">Post a New Job</h5>
                            <p className="card-text">
                                Create and publish a new job opening.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={goToPostJobPage}
                            >
                                Post Job
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">My Jobs</h5>
                            <p className="card-text">
                                View jobs posted by you.
                            </p>
                            <button className="btn btn-secondary" disabled>
                                Coming Soon
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default EmployeeHomePage;
