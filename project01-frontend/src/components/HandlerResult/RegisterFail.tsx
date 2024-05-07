import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Fail.css"

export const RegisterFail:React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(()=>{
            console.log(" register fail UI ");
            navigate("/")
        }, 2000)
    },[])

    return (
        <div className="body-container">
            <div className="welcome fail">
                register failed!
            </div>
        </div>
    )
}