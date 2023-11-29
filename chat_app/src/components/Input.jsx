import React, { useContext, useState } from 'react'
import Img from '../img/img.png';
import Attach from "../img/attach.png";
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { storage } from '../Firebase';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db} from '../Firebase'


const Input = () => {
  const {currentUser}=useContext(AuthContext);
  const {data}=useContext(ChatContext);

  const [text,setText]=useState('');
  const [img,setImg]=useState(null);

  //send texts between two users
  const handelSend=async()=>{
      if(img){
        const storageRef = ref(storage,uuid());
 
        const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on( 
      (error) => {
        // setErr(true);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
            }),
          });
        });
      }
  )

      }
      else{
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
  }
  return (
    <div className="input">
    <input
      type="text"
      placeholder="Type something..."  onChange={(e)=>{setText(e.target.value)}}
    />
    <div className="send">
      <img src={Attach} alt="" />
      <input
        type="file"
        style={{ display: "none" }}
        id="file" onChange={(e)=>{setImg(e.target.value)}}
      
      />
      <label htmlFor="file">
        <img src={Img} alt="" />
      </label>
      <button onClick={handelSend} >Send</button>
    </div>
  </div>  )
}

export default Input