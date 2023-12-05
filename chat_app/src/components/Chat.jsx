import React, { useContext } from 'react'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import '../../src/styles.scss'




const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chat">
        <div className="chatInfo">
          {data.user.displayName &&
            <span>{data?.user.displayName}     <img className='img_chat' src={data?.user.photoURL} /></span>
          }
          <div className="chatIcons">
            <img src={Cam} alt="" />
            <img src={Add} alt="" />
            <img src={More} alt="" />
          </div>
        </div>
      </div>
      <Messages></Messages>
      <Input />
    </div>
  )
}

export default Chat