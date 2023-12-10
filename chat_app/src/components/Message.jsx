import React, { useContext, useEffect, useRef, useState } from 'react'
import profileImg from '../img/anass.png'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { ref } from 'firebase/storage'

const Message = ({message}) => {
  const {currentUser}=useContext(AuthContext) 
  const {data}=useContext(ChatContext);
  const ref = useRef(null);
  useEffect(()=>{ 
    ref?.current.scrollIntoView({
      behavior: "smooth",
    });
  })

  function getDaysOfMonthForThisWeek() {
    const today = new Date();
    const currentDay = today.getDate();
    const currentDayIndex = today.getDay(); // Get the current day index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const startDay = currentDay - currentDayIndex + 1; // Calculate the start day of the week
    const endDay = startDay + 6; // Calculate the end day of the week
  
    // Ensure startDay is not less than 1
    const correctedStartDay = startDay > 0 ? startDay : 1;
  
    const daysOfMonthForThisWeek = [];
    for (let i = correctedStartDay; i <= endDay; i++) {
      daysOfMonthForThisWeek.push(i);
    }
  
    return daysOfMonthForThisWeek;
  }
  
  const daysOfMonthForThisWeek = getDaysOfMonthForThisWeek();

//  jbad had nhar mn chhar
function getDayOfMonth() {
  const today = new Date();
  const dayOfMonth = today.getDate();
  return dayOfMonth;
}
const currentDayOfMonth = getDayOfMonth();

// jbad nhar lawal mn had simana

function getFirstDayOfCurrentWeek() {
  const today = new Date();
  const currentDayIndex = today.getDay() -1;
  const firstDay = new Date(today);
  firstDay.setDate(today.getDate()-currentDayIndex);
  // console.log(firstDay)  // monday-lundi
  return firstDay;
}
const firstDayOfCurrentWeek = getFirstDayOfCurrentWeek();


// Given date [6, 'December', 2023, 'Thursday', '12:41 PM']
 // Note: Months are zero-based in JavaScript, so 11 represents December

 //condition of typing timing of mesaages
const givenDate = new Date(message.date);
let time="";
if(currentDayOfMonth-message.date[0]==1){
  time=`yesterday at ${message.date[4]}`
}
  if (givenDate.getTime()< firstDayOfCurrentWeek.getTime()) {
  time=`${message.date[0]}'/'+${message.date[1]}; at ${message.date[4]} `
}
if (currentDayOfMonth === message.date[0]) {
    time=message.date[4];
}
else{
  time=`${message.date[3]} at ${message.date[4]}`  
}

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`} >

      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid   // ila 
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {time && <span>{time}</span> }
      </div>
      <div  className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message