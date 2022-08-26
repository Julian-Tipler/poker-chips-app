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
import { onValue, ref, set, update } from "firebase/database";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  const { currentUser, logout } = useAuth();
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
        [currentUser.uid]: true,
      },
    })
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

  const userHasRoom = !!room
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
      <TouchableOpacity onPress={logout}>
        <Text>logout</Text>
      </TouchableOpacity>
      <Text>MY ROOM:</Text>
      <Text>{room}</Text>
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
