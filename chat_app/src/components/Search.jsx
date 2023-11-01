import React from 'react'
import profileImage from '../img/anass.png'

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown=""
          onChange=""
          value=""
        />
      </div>  
  
        <div className="userChat" onClick="">
          <img src={profileImage} alt="" />
          <div className="userChatInfo">
            <span>Anass</span>
          </div>
        </div>
      
    </div>  )
}

export default Search