import React, { useState } from "react"
import "./Register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../Navbar"

const Register = () => {
    let navigate = useNavigate();

    const [ user, setUser] = useState({
        username: "",
        email:"",
        password:"",
        password_confirmation: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const register = () => {
        const { username, email, password, password_confirmation } = user
        if( username && email && password && (password === password_confirmation)){
            axios.post("https://quicknotes-server.onrender.com/user/signup", user)
            .then( res => {
                alert("Registration Successfull! Loging Please!")
                navigate("/login")
            }).catch(error => {
                const errorMessage = error.response.data.message;
                console.log(errorMessage);
                alert(errorMessage) // Output: "Invalid Credentials"
              });
        } else {
            alert("All Fields are Required!")
        }
        
    }

    return (
        <>
        <Navbar/>        
        <div className="register reg">
            {/* {console.log("User", user)} */}
            <h1>Create Account</h1>
            <input type="text" name="username" value={user.username} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="password_confirmation" value={user.password_confirmation} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/login")}>Login</div>
        </div>
        </>

    )
}

export default Register