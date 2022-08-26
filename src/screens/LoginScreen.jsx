import { database } from "../../firebase";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { uid } from "uid";
import { ref, set } from "firebase/database";

export const LoginScreen = () => {
  const [player, setPlayer] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(database, `/${uuid}`), {
      name: "john",
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntrysdf
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={[styles.button,styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {

  },
  buttonOutline: {

  }
});
