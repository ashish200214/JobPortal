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
        <>
            <h2>Post a Job</h2>

            <form onSubmit={submitJob}>

                <input type="text" name="jobRole" placeholder="Job Role" required />

                <textarea
                    name="description"
                    placeholder="Job Description"
                    required
                ></textarea>

                <h4>Skills Required</h4>

                <input
                    type="text"
                    placeholder="Type skill and click Add"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                />

                <button type="button" onClick={addSkill}>Add Skill</button>

                <div style={{ marginTop: "10px" }}>
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            style={{
                                border: "1px solid #000",
                                padding: "5px",
                                margin: "5px",
                                display: "inline-block"
                            }}
                        >
                            {skill}
                            <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                style={{ marginLeft: "5px" }}
                            >
                                ❌
                            </button>
                        </span>
                    ))}
                </div>

                <br />

                <input type="number" name="salary" placeholder="Salary" required />
                <input type="number" name="position" placeholder="No. of Positions" required />
                <input type="text" name="companyName" placeholder="Company Name" required />
                <input type="tel" name="mobileNo" placeholder="Mobile Number" required />
                <input type="text" name="city" placeholder="City" required />

                <br /><br />

                <input type="submit" value="Post Job" />

            </form>
        </>
    );
}

export default PostJobPage;
