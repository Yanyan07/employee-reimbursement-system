import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const RegisterSucceed:React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(()=>{
            console.log(" register succeess UI ");
            navigate("/login")
        }, 2000)
    },[])

    return (
        <div className="body-container">
            <div className="welcome">
                reigster successfully!
            </div>
        </div>
    )
}