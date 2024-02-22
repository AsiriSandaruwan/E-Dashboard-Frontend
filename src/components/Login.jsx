import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginData,setLoginData] =useState({
        "email": "",
        "password": ""
    })

    const navigate = useNavigate();

    useEffect (()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
    },[])

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setLoginData((prevState) => ({
            ...prevState,
            [name]: value   
        }))
    }

    const handleLogin = async () =>{
        let result = await fetch("http://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify({
                email: loginData.email, 
                password: loginData.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/");
        }else{
            alert("Please Enter Correct Email and Password")
        }
    }


    return (
        <div className="login" >
            <h1 style={{ textAlign: "left",paddingLeft: "130px" }}>Login</h1>
            <input className="inputBox" type="email" name="email"  placeholder="Enter Email" onChange={handleChange} value={loginData.email}/>
            <input className="inputBox" type="password" name="password"  placeholder="Enter Password" onChange={handleChange} value={loginData.password}/>
            <button className="appButton" type="button" onClick={handleLogin}>Login</button>
        </div>
    )
};

export default Login