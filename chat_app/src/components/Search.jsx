import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../Firebase";
import { ChatContext } from "../context/ChatContext";


const Search = ()=> {
  const {currentUser}=useContext(AuthContext);
  const {dispatch}=useContext(ChatContext)

  const [user,setUser]=useState(null);
  const [err,setErr]=useState(false);
  const [username,setUsername]=useState("");
  const handelSearch=async()=>{
    const q = query(collection(db, "users"), where("displayName", "==", username));
    try{
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot)
      
      querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } 
      catch(error){
        console.log(error);
      }
    }
    const handelSelect=async()=>{
    dispatch({type:'CHANGE_USER',payload:user})   
    console.log('yess');
      //check if the group(chats in firestore) exists, if not create
      const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
        console.log(currentUser.id>user.id);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    }
      catch(err){
        console.log(err)
      }
      setUser(null);
      setUsername("");
  }

  const handelkey=e=>{
      e.code==="Enter" && handelSearch();
  }
  return (
    <div className="search">
      <div className="searchForm">
        <input  
          type="text"
          placeholder="Find a user"
          onChange={e=>setUsername(e.target.value)}
          onKeyDown={handelkey}
          value={username}
        />
      </div> 
      {err && <span>user not found</span>}
      {user && 
        <div className="userChat" onClick={()=>handelSelect()}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
        }
      
    </div>  )
}

export default Search