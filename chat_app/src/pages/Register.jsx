import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Add from "../img/addAvatar.png";
import '../../src/styles.scss'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../Firebase';
import { storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../Firebase'



const Register = () => {
  const Navigate = useNavigate();
  const [err, setErr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(displayName, email, password, file);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res.user);
      const storageRef = ref(storage, e.target[0].value);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            Navigate("/");
          });
        }
      );
      Navigate('/');
    }
    catch (err) {
      setErr(true);
    };

  }
  //  {err && <span>something went wrong </span>}  it says same... if err has true value

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Anass Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>something went wrong </span>}

        </form>
        <p>
          You do have an account? <Link to="/register">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default Register