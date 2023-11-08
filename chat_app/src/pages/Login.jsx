import React, { useState } from 'react'
import '../../src/styles.scss'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';



const Login = () => {
  const Navigate =useNavigate();
  const [err,setErr]=useState(false);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const email=e.target[0].value;
    const password=e.target[1].value;
    console.log(email,password);
    try{
      await signInWithEmailAndPassword(auth, email, password)
      Navigate('/');
    }
    catch(err){
      setErr(true);
    }
  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Anass Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
    
          <button disabled="">Sign In</button>

        </form>
        {err && <span>something went wrong </span>} 
        <p>
          You don't an have an account? <Link to="/register">Register</Link>
        </p>
  
      </div>
    </div>  
    )
}

export default Login