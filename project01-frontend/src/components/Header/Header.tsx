import { useNavigate } from "react-router-dom"
import "./Header.css"
import { useState } from "react"

export const Header:React.FC = () => {
    const navigate = useNavigate()

    const login = () => {
        navigate("/login")
    }
    const register = () => {
        navigate("/register")
    }
    const goHome = () => {
        navigate("/")
    }

    return (
        <div className="header">
            <p>Employee Reimbursement System</p>
            <button className="btn" onClick={goHome}>Home</button>
            <button className="btn" onClick={login}>Login</button>
            <button className="btn" onClick={register}>Register</button>   
        </div>
    )
}