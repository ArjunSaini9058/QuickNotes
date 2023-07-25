import React, {useState} from "react"
import "./Login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../Navbar"
const Login = ({setLoginUser}) => {
    let navigate = useNavigate();

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        const { email, password } = user
        if(email && password){
                    axios.post("https://quicknotes-server.onrender.com/user/signin", user)
        .then(res => {
            // alert("login success ")
            const jwtToken = res.data.token;
            const usr=res.data.user;
            // console.log(jwtToken)
            // console.log(usr)
            setLoginUser(usr)
            // Save the JWT token in local storage
            localStorage.setItem('jwtToken',JSON.stringify(jwtToken));
            localStorage.setItem('user',JSON.stringify(usr));
            navigate("/")
        }).catch(error => {
            const errorMessage = error.response.data.message;
            console.log(errorMessage);
            alert(errorMessage) // Output: "Invalid Credentials"
          });
        }else{
            alert("All Fields are Required!")
        }

    }

    return (
        <>
        <Navbar setLoginUser={setLoginUser}/>
                <div className="login">
            <h1>Sign In</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/register")}>Create Account</div>
        </div>
        </>

    )
}

export default Login