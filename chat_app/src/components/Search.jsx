import React, { useState } from 'react'
import profileImage from '../img/anass.png'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../Firebase';


const Search = ()=> {
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
        />
      </div> 
      {err && <span>user not found</span>}
      {user && 
        <div className="userChat">
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
        }
      
    </div>  )
}

export default Search