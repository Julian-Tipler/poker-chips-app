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

  console.log("IN CONTEXT ROOM:", room);
  console.log("IN CONTEXT CURRENTUSEROBJECT:", currentUserObject);

  useEffect(() => {
    console.log("USE-EFFECT-ACTIVATED")
    const userRoomRef = ref(database, `rooms/${currentUserObject.room}`);
    console.log("REF", userRoomRef);
    onValue(userRoomRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data", data);
      if (data !== null) {
        setRoom(data);
      }
    });
  }, []);

  const value = {
    room,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}
