import React, { useContext } from 'react'
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Chats from '../components/Chats';
import { AuthContext } from '../context/AuthContext';



const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search/>
      <Chats/>
    </div>  )
}

export default Sidebar