import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import { AuthContext } from '../context/AuthContext';


const Home = () => {
  return (
    <div className='home'>
    <div className="container">
     <Sidebar></Sidebar>
     <Chat></Chat>
    </div>
  </div>
  )
}

export default Home

