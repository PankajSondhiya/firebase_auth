import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  initializeAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { createContext, useContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyD_8pg28eKsGyw5qkGo3jKhM86zubuaWuc",
  authDomain: "practice-tutorial-6f55a.firebaseapp.com",
  projectId: "practice-tutorial-6f55a",
  storageBucket: "practice-tutorial-6f55a.appspot.com",
  messagingSenderId: "297403197394",
  appId: "1:297403197394:web:0c77010accbd0a719b0a0b",
  measurementId: "G-QZ27RLZ13K",
};

const FirebaseContext = createContext(null);
const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth(app);

export const useFireBase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  return (
    <FirebaseContext.Provider value={{ signUp, login, resetPassword }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
