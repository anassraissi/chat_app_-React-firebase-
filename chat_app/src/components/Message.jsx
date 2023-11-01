import React from 'react'
import profileImg from '../img/anass.png'

const Message = () => {
  return (
    <div>
      <div className="message owner">
      <div className="messageInfo">
        <img 
          src={profileImg}
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>Anass</p>
      </div>
    </div>   

    </div>
  )
}

export default Message