import React from 'react'
import profileImg from '../img/anass.png'

const Message = (msg) => {
  console.log(msg)
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