import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import { onValue, ref, set, update } from "firebase/database";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  const { currentUser, logout } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const navigation = useNavigation();

  const roomsRef = ref(database, "rooms");
  useEffect(() => {
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setRooms(Object.values(data));
      }
    });
  }, []);

  const createRoom = () => {
    const uuid = uid();
    set(ref(database, `rooms/${uuid}`), {
      name: roomName,
      users: [currentUser.uid],
    })
      .then(() => {
        update(ref(database, `users/${currentUser.uid}`), {
          room: uuid,
        });
      })
      .catch(() => console.log("error with room creation"));
  };

  const handleJoinExistingRoom = () => {
    navigation.navigate("Room");
  };
  const userHasRoom = !!rooms.length
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text></Text>
      <TextInput
        value={roomName}
        onChangeText={setRoomName}
        styles={styles.roomNameInput}
      />
      <TouchableOpacity onPress={createRoom}>
        <Text>Create New Room</Text>
      </TouchableOpacity>
      {userHasRoom && (
        <TouchableOpacity onPress={handleJoinExistingRoom}>
          <Text>Join Existing Room</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={logout}>
        <Text>logout</Text>
      </TouchableOpacity>
      <Text>MY ROOM:</Text>
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
  roomNameInput: {
    borderWidth: "1",
    borderColor: "red",
  },
});
