import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginSucceed:React.FC = () => {
    const [role, setRole] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8080/users/session",  {withCredentials:true})
        .then((response) => {
            console.log("login success axios", response.data);
            console.log("typeof: ", response.data);
            setRole(response.data)
        })
        .catch((error) => {
            console.log("login success error ", error.message);
            navigate("/")
        })
    },[])

    useEffect(() => {
        setTimeout(()=>{
            console.log("login succeess UI ");
            if(role.toLowerCase() == "employee"){
                navigate("/employeereimb")
            }else if(role.toLowerCase() == "manager"){
                navigate("/managerreimb")
            }
        }, 2000)
    }, [role])


    return (
        <div className="body-container">
            <div className="welcome">
                Login successfully!
            </div>
        </div>
    )
}