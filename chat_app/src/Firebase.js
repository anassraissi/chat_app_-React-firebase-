// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore"; 



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ_4dk1akKcTNk3KZL5pu7uRuH4n9B0QQ",
  authDomain: "appp-c2aa2.firebaseapp.com",
  projectId: "appp-c2aa2",
  storageBucket: "appp-c2aa2.appspot.com",
  messagingSenderId: "655063125975",
  appId: "1:655063125975:web:a9cc45f198b8ecf1784592"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage=getStorage();
export const db=getFirestore();
export const setDoc=getFirestore();
export const doc=getFirestore();
