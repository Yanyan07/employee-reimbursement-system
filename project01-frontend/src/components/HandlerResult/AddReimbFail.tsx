import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Fail.css"

export const AddReimbFail:React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate("/employeereimb/add")
        }, 2000)
    }, [])

    return (
        <div className="body-container">
            <div className="welcome fail">
                Failed to add reimbursement!
            </div>
        </div>
    )
}