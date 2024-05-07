import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const UpdateReimbSuccess:React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate("/employeereimb/pending")
        }, 2000)
    }, [])

    return (
        <div className="body-container">
            <div className="welcome">
                Update Reimbursement Successfully!
            </div>
        </div>
    )
}