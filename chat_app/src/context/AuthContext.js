import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "../Firebase";
export const AuthContext=createContext();

export const AuthContextPr=({children})=>{
    const [currentUser,setCurrentUser]=useState('false');
    useEffect(()=>{
          const unsub = onAuthStateChanged(auth,(user)=>{
                setCurrentUser(user);
                console.log(user);
            })
            return ()=>{
                unsub();
            }
    } 
    ,[]);
return (
            <AuthContext.Provider value={{currentUser}}>
            {children}
            </AuthContext.Provider>
)
  

}