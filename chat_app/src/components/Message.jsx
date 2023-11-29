import React, { useContext } from 'react'
import profileImg from '../img/anass.png'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = () => {
  const {currentUser}=useContext(AuthContext)
  const {data}=useContext(ChatContext);
  return (
    <div>
      <div className="message owner">
      <div className="messageInfo">
        <img src=''/>
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p></p>
      </div>
    </div>   

    </div>
  )
}

export default Message