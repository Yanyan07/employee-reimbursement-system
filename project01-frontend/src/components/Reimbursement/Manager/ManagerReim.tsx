import { Outlet, useNavigate } from "react-router-dom"
import "../Employee/EmployeeReim.css"

export const ManagerReim:React.FC = () => {
    const navigate = useNavigate()

    const getAllReimbs = () => {
        navigate("/managerreimb/all")
    }
    const getPendingReimbs = () => {
        navigate("/managerreimb/pending")
    }
    const getAllUsers = () => {
        navigate("/managerreimb/allusers")
    }

    return (
        <div className="body-container employee">
            <div className="menu"> 
                <button className="btn" onClick={getAllReimbs}>list all reimbursements</button>
                <button className="btn" onClick={getPendingReimbs}>list pending reimbursements</button>
                {/* <button >list approved reimbursements</button>
                <button >list denied reimbursements</button> */}
                <button className="btn" onClick={getAllUsers} >list all users</button>
                {/* <button className="btn">delete a user</button> */}
            </div>
            <div className="content">
                <Outlet></Outlet>
            </div>
        </div>
    )
}