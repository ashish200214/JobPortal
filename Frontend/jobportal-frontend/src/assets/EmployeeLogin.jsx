import axios from "axios"

function EmployeeLogin() {
    function submit(e){
     e.preventDefault()
     let data = {
        email : e.target.email.value,
        password: e.target.password.value
     }
     axios.post("http://localhost:8080/api/auth/employee/login",data).then((res)=>{
          localStorage.setItem("token", res.data);
        console.log(res.data)
        console.log("welcome")
     }).catch((err)=>{
        if(err.response){
            alert(err.response.data)
        }
        else{
            alert("Server not reachable...")
        }
     })

    }
    return(

        <>
        <h1>Employee Login</h1>
        <form method="post" onSubmit={submit}>
            <input type="email" name="email" placeholder="Enter Email: " />
            <input type="password" name="password" placeholder="Enter Password: " />
            <input type="submit" value="Login In" />
        </form>
        </>
    )
}
export default EmployeeLogin