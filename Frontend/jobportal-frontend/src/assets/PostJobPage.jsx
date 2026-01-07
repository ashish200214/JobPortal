import { useState } from "react";
import axios from "axios";

function PostJobPage() {

    const [skillInput, setSkillInput] = useState("");
    const [skills, setSkills] = useState([]);

    function addSkill() {
        const trimmedSkill = skillInput.trim();
        if (trimmedSkill !== "" && !skills.includes(trimmedSkill)) {
            setSkills([...skills, trimmedSkill]);
            setSkillInput("");
        }
    }

    function removeSkill(skillToRemove) {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    }

    function submitJob(e) {
        e.preventDefault();

        const data = {
            jobRole: e.target.jobRole.value,
            description: e.target.description.value,
            salary: e.target.salary.value,
            position: e.target.position.value,
            companyName: e.target.companyName.value,
            mobileNo: e.target.mobileNo.value,
            city: e.target.city.value,
            skills: skills.map(skill => ({ name: skill }))
        };

        axios.post("http://localhost:8080/api/job", data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(() => {
            alert("Job posted successfully");
            e.target.reset();
            setSkills([]);
        })
        .catch(() => {
            alert("Error posting job");
        });
    }

    return (
        <div className="container mt-4">

            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Post a Job</h4>
                </div>

                <div className="card-body">
                    <form onSubmit={submitJob}>

                        <div className="mb-3">
                            <label className="form-label">Job Role</label>
                            <input type="text" name="jobRole" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Job Description</label>
                            <textarea name="description" className="form-control" rows="3" required></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Skills Required</label>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder="Type skill"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                />
                                <button type="button" className="btn btn-success" onClick={addSkill}>
                                    Add
                                </button>
                            </div>

                            <div className="mt-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="badge bg-secondary me-2">
                                        {skill}
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white ms-2"
                                            onClick={() => removeSkill(skill)}
                                        ></button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Salary</label>
                                <input type="number" name="salary" className="form-control" required />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Positions</label>
                                <input type="number" name="position" className="form-control" required />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Company Name</label>
                            <input type="text" name="companyName" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mobile Number</label>
                            <input type="tel" name="mobileNo" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <input type="text" name="city" className="form-control" required />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Post Job
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostJobPage;
