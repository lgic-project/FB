import React,{useState} from 'react'


const SignUp =()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const collect=()=>{
        console.warn(name,email,password)
    }
    return(
        <div className='position'>
            <h1 className='text'>Register</h1>
            <input className='input' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
            <input className='input' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
            <input className='input' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
            <button onClick={collect} className='button'type="button">SignUp</button>
        </div>
    )
}

export default SignUp;