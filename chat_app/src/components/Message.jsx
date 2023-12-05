import React, { useContext } from 'react'
import profileImg from '../img/anass.png'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({message}) => {
  const {currentUser}=useContext(AuthContext)
  const {data}=useContext(ChatContext);

  const date = new Date(message.date.seconds * 1000 + message.date.nanoseconds / 1e6);
  const hours = date.getUTCHours()+1;
  const minutes = date.getUTCMinutes();
  // Format the time
  const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  console.log('message');
  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`} >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid   // ila 
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {time && <span>{time}</span> }
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message