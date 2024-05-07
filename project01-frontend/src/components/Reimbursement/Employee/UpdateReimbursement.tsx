import axios from "axios";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const UpdateReimbursement:React.FC = () => {
    const [desc, setDesc] = useState("")
    const {reimbId} = useParams();
    const navigate = useNavigate()

    const getInfo = (e:any) => {
        setDesc(e.target.value)
    }
    const updateDescription = async () => { 
        console.log("update reimb: ", reimbId);
        
        // await axios.put(`http://localhost:8080/reimbs/description/${reimbId}`, JSON.stringify(desc), {
        //     withCredentials: true
        // })
        axios.put(`http://localhost:8080/reimbs/description/${reimbId}`, desc, {
            withCredentials: true,
            headers: {
                'Content-Type': 'text/plain' // Specify the content type as text/plain
            }
        })
        .then((response) => {
            navigate("/employeereimb/updatesuccess")
        })
        .catch((error) => {
            navigate("/employeereimb/updatefail")
        })
    }

    return (
        <div className="body-container login">
            <input type="text" name="description" placeholder="update description" onChange={getInfo} />
            <button className="btn" onClick={updateDescription}>update</button>
        </div>
    )
}