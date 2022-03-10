import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import auth from "../firebase.js";
const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //User logged in
        console.log("User logged in");
        setCurrentUser(userCredential.user);
      })
      .catch((error) => {
        console.log("Error logging in: " + error.toString());
        return false;
      });
    return true;
  }

  onAuthStateChanged(auth, (user) => {
    console.log("Auth State changed");
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });
  const value = {
    currentUser,
    login,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
