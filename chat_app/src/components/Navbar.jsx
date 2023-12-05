import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../Firebase'
import { AuthContext } from '../context/AuthContext'


const Navbar = () => {
  const {currentUser}=useContext(AuthContext);
  console.log(currentUser)
  return (
            <div className='navbar'>
            <span className="logo">Anass Chat</span>
            <div className="user">
            <img src={currentUser.photoURL} />
            <span>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>logout</button>
            </div>
            </div>  
)
}

export default Navbar

