import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Fail.css"

export const UpdateReimbFail:React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate("/employeereimb/pending")
        }, 2000)
    }, [])

    return (
        <div className="body-container">
            <div className="welcome fail">
                Failed to Update Reimbursement!
            </div>
        </div>
    )
}