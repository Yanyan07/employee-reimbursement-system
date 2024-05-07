import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AllUsers:React.FC = () => {
    const [users, setUsers] = useState([])
    const [changed, setChanged] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        //await axios.put(baseUrl+reimbId, null, {withCredentials:true})
        axios.get("http://localhost:8080/users", {withCredentials:true})
        .then((response) => {
            setUsers(response.data)
        })
        .catch((error) => {
            navigate("/managerreimb")
        })
    }, [changed])

    const deleteUser = async (userId:number) => {
        await axios.delete("http://localhost:8080/users/"+userId,
            {withCredentials:true}
        )
        .then((response) => {
            setChanged(!changed)
        })
        .catch((error) => {
            navigate("/managerreimb/allusers")
        })
    }
    const promoteUser = async (userId:number) => {
        await axios.put("http://localhost:8080/users/"+userId, null,
            {withCredentials:true}
        )
        .then((response) => {
            setChanged(!changed)
        })
        .catch((error) => {
            navigate("/managerreimb/allusers")
        })
    }

    return (
        <div>
            {
                users.length===0 ? 
                <div className="welcome">
                    There is no list of users found yet!
                </div> :
                <div className="list-container">
                    <div className="title">
                        <span>first name</span>
                        <span>last name</span>
                        <span>username</span>
                        <span>role</span>
                        <span>operations</span>
                    </div>
                    <div className="items">
                        {
                            users
                            .map((u:any) => <li key={u.userId}>
                                <span>{u.firstName}</span>
                                <span>{u.lastName}</span>
                                <span>{u.username}</span>
                                <span>{u.role}</span>
                                <button className="btn" onClick={()=>deleteUser(u.userId)}>Delete</button>
                                <button className="btn" onClick={()=>promoteUser(u.userId)}>Promote</button>
                            </li>)
                        }
                    </div>
                </div>
            }
        </div>
    )
}