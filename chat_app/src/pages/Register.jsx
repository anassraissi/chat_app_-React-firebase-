import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import '../../src/styles.scss'

const register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Anass Chat</span>
        <span className="title">Register</span>
        <form onSubmit="">
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled="">Sign up</button>

        </form>
  
      </div>
    </div>  )
}

export default register