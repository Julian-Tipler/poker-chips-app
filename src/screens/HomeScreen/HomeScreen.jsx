import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import { onValue, ref, set } from "firebase/database";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../../firebase";

export const HomeScreen = () => {
  const { currentUser, logout } = useAuth();
  const [rooms, setRooms] = useState([])

  
  const roomsRef = ref(database, 'rooms')
  useEffect(() => {
    onValue(roomsRef, snapshot => {
      const data = snapshot.val()
      if(data!==null){
        setRooms(Object.values(data))
      }
    })
  }, [])
  
  const createRoom = () => {
    const uuid = uid();
    set(ref(database, `rooms/${uuid}`), {
      name: "Room name",
      users: [currentUser.uid],
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text></Text>
      <TouchableOpacity onPress={createRoom}>
        <Text>Create New Room</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text>logout</Text>
      </TouchableOpacity>
      {rooms.map((room, i) => {
        return <Text key={`room-${i}`}>{room.name}</Text>;
      })}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
