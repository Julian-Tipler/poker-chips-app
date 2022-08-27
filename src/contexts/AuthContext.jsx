import React, { useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "../../firebase";
import { onValue, ref, set } from "firebase/database";

const AuthContext = React.createContext({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserObject, setCurrentUserObject] = useState(null);

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

  useEffect(() => {
    if (currentUser) {
      onValue(ref(database, `users/${currentUser.uid}`), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          setCurrentUserObject(data);
          if (initializing) setInitializing(false);
        }
      });
    }
  }, [currentUser]);

  const value = {
    initializing,
    currentUser,
    currentUserObject,
    login,
    signUp,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
