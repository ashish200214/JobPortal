import axios from "axios"

function Login() {
    function submit(e){
     e.preventDefault()
     let data = {
        email : e.target.email.value,
        password: e.target.password.value
     }
     axios.post("http://localhost:8080/api/auth/student/login",data).then((res)=>{
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
        <form method="post" onSubmit={submit}>
            <input type="email" name="email" placeholder="Enter Email: " />
            <input type="password" name="password" placeholder="Enter Password: " />
            <input type="submit" value="Login In" />
        </form>
        </>
    )
}
export default Login