import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [regData,setRegData] =useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setRegData((prevState) => ({
            ...prevState,
            [name]: value   
        }))
    }

    useEffect (()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
    },[])

    const collectData = async () => {
        console.warn(regData);
        let result = await fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify({
                name: regData.name, 
                email: regData.email, 
                password: regData.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result));
        navigate("/");
    }
    
    return (
        <div className="register" >
            <h1 style={{ textAlign: "left",paddingLeft: "115px" }}>Register</h1>
            <input className="inputBox" type="text" name="name" value={regData.name} placeholder="Enter Name" onChange={handleChange}/>
            <input className="inputBox" type="email" name="email" value={regData.email} placeholder="Enter Email" onChange={handleChange}/>
            <input className="inputBox" type="password" name="password" value={regData.password} placeholder="Enter Password" onChange={handleChange}/>
            <button className="appButton" type="button" onClick={collectData}>Sign Up</button>
        </div>
    )
}

export default SignUp;