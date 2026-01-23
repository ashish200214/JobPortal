import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">
                    JobPortal
                </Link>

                {/* MOBILE TOGGLE */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        {/* STUDENT */}
                        {role === "STUDENT" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/student/home">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/jobs">
                                        Jobs
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-danger ms-lg-3 mt-2 mt-lg-0"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}

                        {/* EMPLOYEE */}
                        {role === "EMPLOYEE" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/employee/home">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/employee/post-job">
                                        Post Job
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-danger ms-lg-3 mt-2 mt-lg-0"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}

                        {/* GUEST */}
                        {!role && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Student Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/employee/login">
                                        Employee Login
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
