import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase'
import { AuthContext } from '../context/AuthContext';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
   if(doc.exists()){
    const allMessages = doc.data().messages;
    const last10Messages = allMessages.slice(-10);
    setMessages(last10Messages);

   }
    });
    // console.log(messages)

    return () => {  
      unSub();
    };
  }, [data.chatId]);


  // console.log(messages)
  return (
    <div className='messages'>  
       {messages?.map((m) => (
        <Message message={m} messages={messages} key={m?.id} />
      ))}
    </div>
  )
}
export default Messages