import './StudentRegPage.css'

function StudentRegPage() {
    function submit(e) {
          e.preventDefault()
        let mobileNo=e.target.mobileNo.value.trim();

          if(isNaN(mobileNo)||(mobileNo.length!==10 && mobileNo.length!==11)){
            alert("Please enter valid mobile no.")
        console.log(mobileNo)
        return
        }

        let data={
             name: e.target.name.value,
             email: e.target.email.value,
             password: e.target.password.value,
             mobileNo: e.target.mobileNo.value,
             workingStatus: e.target.workingStatus.value
        }
        
      axios.post("http://localhost:8080/api/students",data).
      then(res =>{
        console.log(res.data)
        alert("Student registered successfully")
      })
      .catch(err =>{
        if(err.response){
            alert(err.response.data)
        }
        else{
            alert("Server not reachable...")
        }
      })

    }
  return (
    <div id="main-div" >
        <h1>Student Registeration</h1>
      <form method="post" onSubmit={submit}>
        <input name="name" placeholder="Enter your Name" required/>
        <input type="email" name="email" placeholder="Enter email" required/>
        <input required type="password" name="password" placeholder="Enter Password"  />
        <input required type="tel" name="mobileNo" placeholder="Enter Mobile No: " />
        <div>
            Fresher<input required type="radio" name="workingStatus" value="fresher" />
        Experience<input required type="radio" name="workingStatus" value="experience" />
        </div>
        <input type="submit" value="Register Now" />
      </form>

    </div>
  )
}

export default StudentRegPage
