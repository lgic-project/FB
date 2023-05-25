import React, { useState, useEffect } from 'react'
// hook that use to redirect
import { useNavigate } from "react-router-dom";



const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // to avoid signup after signup sucessful
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })


    const collect = async () => {
        console.warn(name, email, password)
        let result = await fetch('http://localhost:2000/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }), // api used json formate so object need json.stringifly
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json()
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/')
    }

    return (
        <div className='position'>
            <h1 className='text'>Register</h1>
            <input className='input' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
            <input className='input' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button onClick={collect} className='button' type="button">SignUp</button>
        </div>
    )
}

export default SignUp;
