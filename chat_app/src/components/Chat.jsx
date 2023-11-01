import React from 'react'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import Messages from './Messages'



const chat = () => {
  return (
    <div className='chat'>
         <div className="chat">
      <div className="chatInfo">
        <span>Anass</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
    </div>
    <Messages></Messages>
    </div>
  )
}

export default chat