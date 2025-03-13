import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpqLzm2pE_NtaOHUpvpKQPm0lD8IlTpFc",
  authDomain: "test1-fa3ab.firebaseapp.com",
  projectId: "test1-fa3ab",
  storageBucket: "test1-fa3ab.appspot.com",
  messagingSenderId: "1038748729338",
  appId: "1:1038748729338:web:e0ef173f86c0dda870ae43",
  measurementId: "G-RFFZDE6F7C"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };