import axios from "axios";

function EmployeeRegister() {

    function submit(e) {
        e.preventDefault();

        let mobileNo = e.target.mobileNo.value.trim();

        if (isNaN(mobileNo) || mobileNo.length !== 10) {
            alert("Please enter valid mobile number");
            return;
        }

        let data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            mobileNo: mobileNo,
            city: e.target.city.value
        };

        axios.post("http://localhost:8080/api/auth/employee/register", data)
            .then(res => {
                console.log(res.data);
                alert("Employee registered successfully");
            })
            .catch(err => {
                if (err.response) {
                    alert(err.response.data);
                } else {
                    alert("Server not reachable...");
                }
            });
    }

    return (
        <>
        <h1>Employee Registeration</h1>
            <form onSubmit={submit} method="post">

                <input type="text" name="name" placeholder="Enter your name" required />
                <input type="email" name="email" placeholder="Enter your email" required />
                <input type="password" name="password" placeholder="Enter your password" required />
                <input type="text" name="city" placeholder="Enter your city" required />
                <input type="tel" name="mobileNo" placeholder="Enter your mobile number" required />

                <input type="submit" value="Register" />
            </form>
        </>
    );
}

export default EmployeeRegister;
