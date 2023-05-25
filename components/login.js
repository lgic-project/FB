import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Login =() =>{
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    })
    const set = async () =>{
        console.log("mail,password",email,password);

        //Int APi
        let result = await fetch('http://localhost:2000/login',{
            method:"POST", 
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        if(result.name){
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/");

        }else{
            alert("Imvalid Email")
        }
    }
    return(
        <div className="login">
            <h1>Login</h1>
            <input type="text" className="input"placeholder="Enter Email"
            onChange={(e)=>setEmail(e.target.value)} value={email}/>

            <input type="password" className="input"placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button onClick={set} className="btn" type="button">SignIn</button>
        </div>
    )
}

export default Login
