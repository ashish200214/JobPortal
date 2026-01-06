import { useNavigate } from "react-router-dom";

function EmployeeHomePage(){
    const navigate = useNavigate();

    function goToPostJobPage(){
        //go to the PostJobPage.jsx
        navigate("/employee/postJob")
        
    }
    return(
        <>
            <button onClick={goToPostJobPage}>Post a Job</button>

        </>
    )
}

export default EmployeeHomePage;