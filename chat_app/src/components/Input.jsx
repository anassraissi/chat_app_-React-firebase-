import React, { useContext, useState } from 'react'
import Img from '../img/img.png';
import Attach from "../img/attach.png";
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../Firebase'


const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  //send texts between two users
  const handelSend = async () => {

    ///
    function formatCurrentDate() {
      const today = new Date();
      const formattedDate = [
        today.getDate(), // Day of the month
        today.toLocaleString('en-GB', { month: 'long' }),  // Full month name
        today.getFullYear(), // Year
        today.toLocaleString('en-US', { weekday: 'long' }), // Full day name
        today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) // Time
      ];
    
      return formattedDate;
    }
    
    const currentDateArray = formatCurrentDate();
    console.log(currentDateArray);
    

    if (img) {
      const storageRef = ref(storage, uuid());
      
      // Create the upload task
      const uploadTask = uploadBytesResumable(storageRef, img);
    
      // Use the upload task's promise to handle the completion
      uploadTask.then(() => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: currentDateArray,
              img: downloadURL,
            }),
          });
        });
      }).catch((error) => {
        console.error("Error during upload:", error);
      });
    }
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date:currentDateArray,
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
        placeholder="Type something..."   onChange={(e) => setText(e.target.value)} onKeyDown={(e)=>{
          if (e.key === 'Enter') {
            handelSend();
          }
        }}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file" onChange={(e) => setImg(e.target.files[0])}

        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handelSend} >Send</button>
      </div>
    </div>)
}

export default Input