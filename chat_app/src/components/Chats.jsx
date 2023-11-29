import React, { useEffect, useState } from 'react'
import profileImage from '../img/anass.png'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'


const Chats = () => {
  const {currentUser}=useContext(AuthContext);
  const {dispatch}=useContext(ChatContext)
  const [chats,setChats]=useState();
  // console.log(currentUser.uid);
  let array;
  useEffect(() => {
    const getChats = () => {
     // Set up a real-time listener for changes to the userChats document
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        array=(doc.data());
        setChats(Object.entries(array))
      });
      return () => {      // Unsubscribe from the listener when the component unmounts or when currentUser.uid changes
        unsub();
      };  
    };
  // Check if currentUser.uid exists before calling getChats
 currentUser.uid && getChats();
  }, [currentUser.uid]);
  const handleSelect=(data)=>{
      dispatch({type:'CHANGE_USER',payload:data})   
  }
// console.log(chats)
  return (
      <div className='chats'>
        {chats && chats?.map((chat) => (
        <div className="userChat" key={chat[1].userInfo.uid} onClick={()=>handleSelect(chat[1].userInfo)}>  
           <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1]?.lastMessage?.text}</p>
          </div>
        </div>
         ))} 

       </div>

  )
}

export default  Chats