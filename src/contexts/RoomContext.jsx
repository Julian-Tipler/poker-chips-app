import React, { useState, useEffect, useContext } from "react";
import { database } from "../../firebase";
import { onValue, ref, set, update, remove} from "firebase/database";
import { useAuth } from "./AuthContext";
import { uid } from "uid";

const RoomContext = React.createContext({});
export const useRoom = () => useContext(RoomContext);

export function RoomProvider({ children }) {
  const [room, setRoom] = useState(null);
  const { currentUser, currentUserObject } = useAuth();

  // creates a new room, updates the user's room, deletes the old room
  const createRoom = (roomName) => {
    const uuid = uid()
    const oldRoom = currentUserObject.room || false
    return set(ref(database, `rooms/${uuid}`), {
      name: roomName,
      users: {
        [currentUser.uid]: {
          name: currentUserObject.email,
        },
      },
    })
      .then(() => {
        return update(ref(database, `users/${currentUser.uid}`), {
          room: uuid,
        });
      })
      .then(() => {
        if (oldRoom) return deleteRoom(oldRoom);
        return
      })
      .then(() => {
        watchRoom()
      })
      .catch((err) => console.log("error with room creation", err));
  };

  //deletes a room based on id
  const deleteRoom = (oldRoom) => {
    return remove(ref(database, `rooms/${oldRoom}`));
  };

  const watchRoom = () => {
    const userRoomRef = ref(database, `rooms/${currentUserObject.room}`);

    onValue(userRoomRef, (snapshot) => {
      console.log("A change in room has happened");
      const data = snapshot.val();
      if (data !== null) {
        setRoom({data});
      }
    });
  }
  console.log('CONTEXT', room)

  useEffect(() => {
    watchRoom()
  }, []);

  const value = {
    room,
    createRoom,
    deleteRoom,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}
