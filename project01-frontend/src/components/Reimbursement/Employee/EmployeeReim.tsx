import { Outlet, useNavigate } from "react-router-dom"
import { AddReimbursement } from "./AddReimbursement"
import "./EmployeeReim.css"

export const EmployeeReim:React.FC = () => {
    const navigate = useNavigate()

    const getAllReimbs = () => {
        navigate("/employeereimb/all")
    }
    const getPendingReimbs = () => {
        navigate("/employeereimb/pending")
    }
    const getApprovedReimbs = () => {
        navigate("/employeereimb/approved")
    }
    const getDeniedReimbs = () => {
        navigate("/employeereimb/denied")
    }
    const AddReimb = () => {
        navigate("/employeereimb/add")
    }
    const updateReimb = () => {
        navigate("/employeereimb/update")
    }

    return (
        <div className="body-container employee">
            <div className="menu">
                <button className="btn" onClick={AddReimb}>add a reimbursement</button>
                <button className="btn" onClick={updateReimb}>update a reimbursement</button>
                <button className="btn" onClick={getAllReimbs}>list all reimbursements</button>
                <button className="btn" onClick={getPendingReimbs}>list pending reimbursements</button>
                <button className="btn" onClick={getApprovedReimbs}>list approved reimbursements</button>
                <button className="btn" onClick={getDeniedReimbs}>list denied reimbursements</button>
            </div>
            <div className="content">
                <Outlet></Outlet>
            </div>
            
        </div>
    )
}