import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { uid } from "uid";
import { onValue, ref, remove, set, update } from "firebase/database";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import { RoomProvider } from "../../contexts/RoomContext";

export const HomeScreen = () => {
  const { currentUser, currentUserObject, logout } = useAuth();
  const [room, setRoom] = useState(null);
  const [roomName, setRoomName] = useState("");
  const navigation = useNavigation();

  const userRoomRef = ref(database, `users/${currentUser.uid}/room`);
  useEffect(() => {
    onValue(userRoomRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setRoom(data);
      }
    });
  }, []);

  const createRoom = () => {
    const uuid = uid();
    set(ref(database, `rooms/${uuid}`), {
      name: roomName,
      users: {
        [currentUser.uid]: {
          name:currentUser.email
        },
      },
    })
      .then(() => remove(ref(database, `rooms/${currentUserObject.room}`)))
      .then(() => {
        update(ref(database, `users/${currentUser.uid}`), {
          room: uuid,
        });
      })
      .catch(() => console.log("error with room creation"))
      .then(() => handleJoinExistingRoom());
  };

  const handleJoinExistingRoom = () => {
    navigation.navigate("Room");
  };

  const userHasRoom = !!room;
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text></Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={roomName}
          onChangeText={setRoomName}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={createRoom}>
        <Text>Create New Room</Text>
      </TouchableOpacity>
      {userHasRoom && (
        <TouchableOpacity onPress={handleJoinExistingRoom}>
          <Text>Join Existing Room</Text>
        </TouchableOpacity>
      )}
      <Text>MY ROOM:</Text>
      <Text>{room}</Text>
      <Text></Text>
      <TouchableOpacity onPress={logout}>
        <Text>logout</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#800080",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#800080",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#800080",
    fontWeight: "700",
    fontSize: 16,
  },
});
