import React, { useContext, useEffect, useRef, useState } from 'react'
import profileImg from '../img/anass.png'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { ref } from 'firebase/storage'
import { db } from '../Firebase'
import { count, doc, onSnapshot } from 'firebase/firestore'
import { updateDoc, deleteDoc, getDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { arrayRemove, collection } from "firebase/firestore";
import ConfirmationModal from './Confirmation_model'


  

const Message = ({ message ,messages}) => {

  
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext);

const ref = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    // Scroll into view when the component mounts
    ref?.current.scrollIntoView({
      behavior: "smooth",
    });
  });

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
    const currentDayIndex = today.getDay() - 1;
    const firstDay = new Date(today);
    firstDay.setDate(today.getDate() - currentDayIndex);
    // console.log(firstDay)  // monday-lundi
    return firstDay;
  }
  const firstDayOfCurrentWeek = getFirstDayOfCurrentWeek();


  // Given date [6, 'December', 2023, 'Thursday', '12:41 PM']
  // Note: Months are zero-based in JavaScript, so 11 represents December

  //condition of typing timing of mesaages
  const givenDate = new Date(message.date);
  let time = "";
  if (currentDayOfMonth - message.date[0] == 1) {
    time = `yesterday at ${message.date[4]}`
  }
  if (givenDate.getTime() < firstDayOfCurrentWeek.getTime()) {
    time = `${message.date[0]}'/'+${message.date[1]}; at ${message.date[4]} `
  }
  if (currentDayOfMonth === message.date[0]) {
    time = message.date[4];
  }
  else {
    time = `${message.date[3]} at ${message.date[4]}`
  }
  
  // DeleteMessage
  const deleteMessage = async (MessageId) => {
    onSnapshot(doc(db, "chats", data.chatId), (snapshot) => {
      if (snapshot.exists()) {
        const allMessages = snapshot.data().messages;
        // Find the index of the message with id="12"
        const messageIndex = allMessages.findIndex(message => message.id === MessageId);

        if (messageIndex !== -1) {
          // Use arrayRemove to update the messages array without the specified message
          const updatedMessages = arrayRemove(allMessages[messageIndex]);

          // Update the document with the modified messages array
          updateDoc(doc(db, "chats", data.chatId), { messages: updatedMessages });
        }
      }
    });
    let array = [];
    onSnapshot(doc(db, "userChats",currentUser.uid), (snapshot) => {
      if (snapshot.exists()) {
        const allMessages = snapshot.data();

        array = Object.entries(allMessages)
      const filteredMessages = array.filter(message => message.includes(data.chatId));
            if (message.text === filteredMessages[0][1].lastMessage.text) {
              // Find the index of the message with id="12"
              const messageIndex = array.findIndex(message => message===filteredMessages[0]);
              if (messageIndex !== -1) {
               let text=messages[messages.length-2].text;
                
                  // update userchat take last date and last message
                    updateDoc(doc(db, "userChats", currentUser.uid), {
                        [data.chatId + ".lastMessage"]: {
                          text,
                        },
                        [data.chatId + ".date"]: serverTimestamp(),
                      });
                       updateDoc(doc(db, "userChats", data.user.uid), {
                        [data.chatId + ".lastMessage"]: {
                          text,
                        },
                        [data.chatId + ".date"]: serverTimestamp(),
                      });
                      

              }
      }
      }
    });

    closeModal();

  }

  const showModel = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`} onDoubleClick={showModel}>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={() => deleteMessage(message.id)}
        onCancel={closeModal}
      />
      <div className="messageInfo" >
        <img
          src={
            message.senderId === currentUser.uid   // ila 
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {time && <span>{time}</span>}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message