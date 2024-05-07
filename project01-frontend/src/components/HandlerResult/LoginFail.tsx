import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Fail.css"

export const LoginFail:React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(()=>{
            console.log("login fail UI ");
            navigate("/")
        }, 2000)
    },[])

    return (
        <div className="body-container">
            <div className="welcome fail">
                Failed to Login!
            </div>
        </div>
    )
}