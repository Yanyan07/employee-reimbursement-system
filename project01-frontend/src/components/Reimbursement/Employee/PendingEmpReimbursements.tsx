import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./EmpReimbList.css"

export const PendingEmpReimbursements:React.FC = () => {
    const [reimbs, setReimbs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8080/reimbs/pending", {withCredentials:true})
        .then((response) => {
            setReimbs(response.data)
        })
        .catch((error) => {
            navigate("/employeereimb/*")
        })
    }, [])

    const UpdateReimbursement = (r:any) => {
        navigate("/employeereimb/update/"+r.reimbId)
    }
    
    return (
        <div>
            {
                reimbs.length===0 ? 
                <div className="welcome">
                    There are no pending reimbursements found yet!
                </div> :
                <div className="list-container">
                    <div className="title">
                        <span>description</span>
                        <span>amount</span>
                        <span>date</span>
                        <span>status</span>
                        <span>operations</span>
                    </div>
                    <div className="items">
                        {
                            reimbs.map((r:any) => <li key={r.reimbId}>
                                <span>{r.description}</span>
                                <span>{r.amount}</span>
                                <span>{r.date.substr(0,10)}</span>
                                <span>{r.status}</span>
                                <button className="btn" onClick={() => UpdateReimbursement(r)} disabled={r.status!=="pending"}>Update</button>
                                {/* <button className="btn" >Delete</button> */}
                            </li>)
                        }
                    </div>
                </div>
            }
        </div>
    )
}