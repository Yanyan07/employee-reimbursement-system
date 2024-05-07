import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import axios from "axios"
import "./Login.css"

export const Login:React.FC = () => {
    const [user, setUser] = useState<UserInterface>({
        "username": "",
        "password": ""
    })
    const [role, setRole] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(()=>{
            console.log("login succeess UI ");
            if(role.toLowerCase() == "employee"){
                navigate("/employeereimb")
            }else if(role.toLowerCase() == "manager"){
                navigate("/managerreimb")
            }
        })
    }, [role])

    const getInfo = (e:any) => {
        setUser((u) => ({
            ...u, [e.target.name]:e.target.value
        }))
    }
    const login = async () => {
        await axios.post("http://localhost:8080/users/login", user,
            {withCredentials:true}
        )
        .then((response) => {
            setRole(response.data.role)
        })
        .catch((error) => {
            navigate("/loginfail")
        })
    }
    const register = () => {
        navigate("/register")
    }
    
    return (
        <div className="body-container login">
            <input type="text" name="username" placeholder="username" onChange={getInfo} />
            <input type="password" name="password" placeholder="password" onChange={getInfo} />
            <button className="btn" onClick={login}>Login</button>
            <button className="btn" onClick={register}>New here? Create an Account!</button>
        </div>
    )
}