// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore"; 



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4GbjHUaVE9SIXH0HWmsgrwztR66mTZ9M",
  authDomain: "chat-15bc5.firebaseapp.com",
  projectId: "chat-15bc5",
  storageBucket: "chat-15bc5.appspot.com",
  messagingSenderId: "862095782648",
  appId: "1:862095782648:web:a8cb6fb43358b8a3a9010d"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage=getStorage();
export const db=getFirestore();
export const setDoc=getFirestore();
export const doc=getFirestore();
