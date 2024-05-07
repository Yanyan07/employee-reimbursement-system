import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ReimbInterface } from "../../../interfaces/ReimbInterface"

export const AllReimbursements:React.FC = () => {
    const [reimbs, setReimbs] = useState([])
    const navigate = useNavigate()
    const [changed, setChanged] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8080/reimbs/manager", {withCredentials:true})
        .then((response) => {
            setReimbs(response.data)
        })
        .catch((error) => {
            navigate("/employeereimb/*")
        })
    }, [changed])

    const changeStatus = async (r:any, status:string) => {
        if("pending" === r.status){
            let baseUrl = "http://localhost:8080/reimbs/"
            if("approved"===status){
                baseUrl += "approved/"
            }else if("denied"===status){
                baseUrl += "denied/"
            }
            console.log("base: ", baseUrl);
            await axios.put(baseUrl+r.reimbId, null, {withCredentials:true})
            .then((response) => {
                console.log("change status ok:");
                setChanged(!changed)
                // navigate("/managerreimb/all")
            })
            .catch((error) => {
                console.log("fail to change status");
                // navigate("/managerreimb/all")
            })
        }
    }

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
                    There is no list of reimbursements found yet!
                </div> :
                <div className="list-container">
                    <div className="title">
                        <span>description</span>
                        <span>amount</span>
                        <span>date</span>
                        <span>username</span>
                        <span>status</span>
                        <span>operations</span>
                    </div>
                    <div className="items">
                        {
                            reimbs.sort((a:ReimbInterface,b:ReimbInterface) => (a.reimbId - b.reimbId))
                            .map((r:any) => <li key={r.reimbId} className={getColor(r.status)}>
                                <span>{r.description}</span>
                                <span>{r.amount}</span>
                                <span>{r.date.substr(0,10)}</span>
                                <span>{r.user.username}</span>
                                <span>{r.status}</span>
                                <span>
                                    <button className="btn" onClick={()=>changeStatus(r,"approved")}>Approve</button>
                                    <button className="btn" onClick={()=>changeStatus(r,"denied")}>Deny</button>
                                </span>
                                
                            </li>)
                        }
                    </div>
                </div>
            }
        </div>
    )
}