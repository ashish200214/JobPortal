import axios from "axios";

function JobApply() {

    function submit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            return;
        }

        const data = {
            jobRole: e.target.jobRole.value,
            description: e.target.description.value,
            salary: Number(e.target.salary.value),
            position: Number(e.target.position.value),
            companyName: e.target.companyName.value,
            mobileNo: e.target.mobileNo.value,
            city: e.target.city.value
        };

        axios.post(
            "http://localhost:8080/api/job",
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => {
            alert("Job added successfully");
            console.log(res.data);
        })
        .catch(err => {
            if (err.response) {
                alert(err.response.data);
            } else {
                alert("Server not reachable");
            }
        });
    }

    return (
        <>
            <form onSubmit={submit} method="post">

                <input type="text" name="jobRole" placeholder="Job role" required />
                <input type="text" name="description" placeholder="Description" required />
                <input type="number" name="salary" placeholder="Salary" required />
                <input type="number" name="position" placeholder="Positions" required />
                <input type="text" name="companyName" placeholder="Company name" required />
                <input type="text" name="mobileNo" placeholder="Mobile number" required />
                <input type="text" name="city" placeholder="City" required />

                <input type="submit" value="Add Job" />
            </form>
        </>
    );
}

export default JobApply;
