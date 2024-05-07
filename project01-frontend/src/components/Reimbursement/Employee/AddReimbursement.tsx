import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddReimbursement:React.FC = () => {
    const [reimb, setReimb] = useState({
        "description": "",
        "amount": 0,
        "date": ""
    })
    const navigate = useNavigate()

    const getInfo = (e: any) => {
        setReimb((reimb) => ({
            ...reimb, [e.target.name]:e.target.value
        }))
    }

    const addReimb = async () => {
        await axios.post("http://localhost:8080/reimbs", reimb,
        {withCredentials:true}
        )
        .then((response) => {
            navigate("/employeereimb/addsuccess")
        })
        .catch((error) => {
            navigate("/employeereimb/addfail") 
        })
    }

    return (
        <div className="login">
            <input type="text" name="description" placeholder="description" onChange={getInfo} />
            <input type="number" name="amount" placeholder="amount" onChange={getInfo} />
            <input type="date" name="date" placeholder="date" onChange={getInfo} />
            <button className="btn" onClick={addReimb}>Add Reimbursement</button>
        </div>
    )
}