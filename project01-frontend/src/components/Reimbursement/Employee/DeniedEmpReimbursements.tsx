import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./EmpReimbList.css"

export const DeniedEmpReimbursements:React.FC = () => {
    const [reimbs, setReimbs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8080/reimbs/denied", {withCredentials:true})
        .then((response) => {
            setReimbs(response.data)
        })
        .catch((error) => {
            navigate("/employeereimb/*")
        })
    }, [])

    //className={getColor(r.status)}
    const getColor = (status:string) => {
        if(status === "approved"){
            return "green-bgc"
        }
        if(status === "denied"){
            return "red-bgc"
        }
    }
    
    return (
        <div>
            {
                reimbs.length===0 ? 
                <div className="welcome">
                    There are no denied reimbursements found yet!
                </div> :
                <div className="list-container">
                    <div className="title">
                        <span>description</span>
                        <span>amount</span>
                        <span>date</span>
                        <span>status</span>
                        <span>operations</span>
                    </div>
                    <div  className="items">
                        {
                            reimbs.map((r:any) => <li key={r.reimbId} className={getColor(r.status)}>
                                <span>{r.description}</span>
                                <span>{r.amount}</span>
                                <span>{r.date.substr(0,10)}</span>
                                <span>{r.status}</span>
                                <button className="btn" disabled={r.status!=="pending"}>Update</button>
                            </li>)
                        }
                    </div>
                </div>
            }
        </div>
    )
}