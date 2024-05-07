import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Register:React.FC = () => {
    const [user,setUser] = useState({
        "firstName": "",
        "lastName": "",
        "username": "",
        "password": "",
        "role": ""
    })
    const navigate = useNavigate()

    const getInfo = (e:any) => {
        setUser((u) => ({
            ...u, [e.target.name]:e.target.value
        }))
    }

    const register = async () => {
        await axios.post("http://localhost:8080/users", user)
        .then((response) => {
            console.log("register data: ", response.data);
            navigate("/regsucceed")
        })
        .catch((error) => {
            console.log("register error", error.message);
            navigate("/regfail")
        })
    }

    return(
        <div className="body-container login">
            <input type="text" name="firstName" placeholder="first name" onChange={getInfo} />
            <input type="text" name="lastName" placeholder="last name" onChange={getInfo} />
            <input type="text" name="username" placeholder="username" onChange={getInfo} />
            <input type="password" name="password" placeholder="password" onChange={getInfo} />
            <input type="text" name="role" placeholder="role" onChange={getInfo} />
            <button className="btn" onClick={register}>Register</button>
        </div>
    )
}