import React, { useState, useEffect, useContext } from "react";
import { database } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { useAuth } from "./AuthContext";

const RoomContext = React.createContext({});
export const useRoom = () => useContext(RoomContext);

export function RoomProvider({ children }) {
  const [room, setRoom] = useState(null);
  const { currentUserObject } = useAuth();

  useEffect(() => {
    console.log("USE-EFFECT-ACTIVATED")
    const userRoomRef = ref(database, `rooms/${currentUserObject.room}`);
    console.log("REF", userRoomRef);
    onValue(userRoomRef, (snapshot) => {
      const data = snapshot.val();
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
