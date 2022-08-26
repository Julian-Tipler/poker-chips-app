import React, { useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { useAuth } from "./AuthContext";

const RoomContext = React.createContext({});
export const useRoom = () => useContext(RoomContext);

export function RoomProvider({ children }) {
  const [room, setRoom] = useState(null);
  const { currentUserObject } = useAuth();

  const userRoomRef = ref(database, `rooms/${currentUserObject.room}`);
  useEffect(() => {
    onValue(userRoomRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        console.log(data)
        setRoom(data);
      }
    });
  }, []);

  const value = {
    room,
  };
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}
