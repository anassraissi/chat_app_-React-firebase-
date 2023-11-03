import React from 'react'
import profileImage from '../img/anass.png'


const chats = () => {
  return (
    <div>
        <div className="userChat">
          <img src={profileImage} alt="" />
          <div className="userChatInfo">
            <span>Anass</span>
            <p>Hello</p>
          </div>
        </div>
        <div className="userChat">
          <img src={profileImage} alt="" />
          <div className="userChatInfo">
            <span>Anass</span>
            <p>Hello</p>
          </div>
        </div>
        <div className="userChat">
          <img src={profileImage} alt="" />
          <div className="userChatInfo">
            <span>Anass</span>
            <p>Hello</p>
          </div>
        </div>
    </div>
  )
}

export default chats