import React, { useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "../../firebase";
import { ref, set } from "firebase/database";

const AuthContext = React.createContext({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(database, `users/${user.uid}`), {
          email: user.email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signUp,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
