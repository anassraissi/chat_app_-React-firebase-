import React, { useContext, useState } from 'react'
import Img from '../img/img.png';
import Attach from "../img/attach.png";
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { storage } from '../Firebase';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db} from '../Firebase'


const Input = () => {
  const [text,setText]=useState('');
  const [img,setImg]=useState(null);

  const {currentUser}=useContext(AuthContext);
  const {data}=useContext(ChatContext);


  //send texts between two users
  const handelSend=async ()=>{

  if (img) {
    const storageRef = ref(storage, uuid());
           //ref(storage, uuid()): This creates a reference to a specific location in Firebase Storage.
          // The ref function takes the storage instance and a path or identifier for the specific file.
         // In this case, it seems to be using a UUID as the file identifier.

    const uploadTask = uploadBytesResumable(storageRef, img);
      //       //uploadBytesResumable: This function is part of the Firebase Storage SDK. 
  //       // It creates an upload task for the specified file bytes (img) to the specified storage reference (storageRef).
  //       // The "Resumable" part implies that the upload can be paused and resumed, which can be useful for large files or situations where the 
  //       // network connection may be unreliable.

    uploadTask.on(
      (error) => {
        //TODO:Handle Error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      }
    );
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
        // update userchat take last date and last message
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
    
        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });

      }

      setImg(null);
      setText("");
  }
  return (
    <div className="input">
    <input
      type="text"
      placeholder="Type something..."  onChange={(e)=>{setText(e.target.value)}}
      value={text}
    />
    <div className="send">
      <img src={Attach} alt="" />
      <input
        type="file"
        style={{ display: "none" }}
        id="file" onChange={(e)=> setImg(e.target.files[0])}
      
      />
      <label htmlFor="file">
        <img src={Img} alt="" />
      </label>
      <button onClick={handelSend} >Send</button>
    </div>
  </div>  )
}

export default Input