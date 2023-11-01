import React from 'react'
import '../../src/styles.scss'
import { Link } from 'react-router-dom';



const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Anass Chat</span>
        <span className="title">Login</span>
        <form onSubmit="">
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
    
          <button disabled="">Sign In</button>

        </form>
        <p>
          You don't an have an account? <Link to="/register">Login</Link>
        </p>
  
      </div>
    </div>  
    )
}

export default Login