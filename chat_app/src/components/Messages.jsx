import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase'
import { AuthContext } from '../context/AuthContext';

const Messages = () => {
  const {data}=useContext(ChatContext);
  const[message,setMessage]=useState([""]);
  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      setMessage(doc.data())});
      return()=>{
        unsub();
      }
    },[data.chatId])
    console.log(message)
  return (
    <div className='messages'>
   {/* {message?.map((msg) => (
      ))} */}
    </div>
  )
  }
export default Messages