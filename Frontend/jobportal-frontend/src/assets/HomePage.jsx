import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");

    function searchJobs() {
        navigate(
            `/jobs?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`
        );
    }

    return (
        <>

            {/* 🔷 HERO SECTION */}
            <section
                className="text-white"
                style={{
                    background: "linear-gradient(135deg, #0d6efd, #6610f2)"
                }}
            >
                <div className="container py-5 text-center">
                    <h1 className="fw-bold display-4">
                        Find your dream job now
                    </h1>

                    <p className="fs-5 mt-3 opacity-75">
                        Search thousands of jobs from top companies
                    </p>

                    {/* 🔍 SEARCH BAR */}
                    <div className="row justify-content-center mt-4">
                        <div className="col-lg-9">
                            <div className="card shadow-lg border-0 rounded-4">
                                <div className="card-body">
                                    <div className="row g-2 align-items-center">

                                        <div className="col-md-5">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Skills, designation, company"
                                                value={keyword}
                                                onChange={(e) => setKeyword(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-md-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Location"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-md-3 d-grid">
                                            <button
                                                className="btn btn-primary btn-lg"
                                                onClick={searchJobs}
                                            >
                                                Search Jobs
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* REGISTER CTA */}
                    <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
                        <button
                            className="btn btn-outline-light btn-lg px-4"
                            onClick={() => navigate("/registration")}
                        >
                            🎓 Student Register
                        </button>

                        <button
                            className="btn btn-warning btn-lg px-4"
                            onClick={() => navigate("/employee/register")}
                        >
                            🧑‍💼 Employer Register
                        </button>
                    </div>
                </div>
            </section>

            {/* 📊 FEATURES / STATS */}
            <section className="container py-5">
                <div className="row text-center">

                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm border-0 rounded-4">
                            <div className="card-body">
                                <div className="fs-1 text-primary">💼</div>
                                <h4 className="fw-bold mt-2">1000+ Jobs</h4>
                                <p className="text-muted">
                                    Latest job openings updated daily
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm border-0 rounded-4">
                            <div className="card-body">
                                <div className="fs-1 text-success">🏢</div>
                                <h4 className="fw-bold mt-2">500+ Companies</h4>
                                <p className="text-muted">
                                    Trusted employers hiring actively
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm border-0 rounded-4">
                            <div className="card-body">
                                <div className="fs-1 text-warning">👨‍🎓</div>
                                <h4 className="fw-bold mt-2">10K+ Candidates</h4>
                                <p className="text-muted">
                                    Students & professionals finding jobs
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 👣 FOOTER */}
            <footer className="bg-dark text-light text-center py-3">
                <small>
                    © {new Date().getFullYear()} JobPortal | Built with React & Spring Boot
                </small>
            </footer>

        </>
    );
}

export default HomePage;
