import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useState } from "react";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl8w_0OVDkhMNkIY7ZS8gd3y-57F1m_1g",
  authDomain: "poker-chips-app-ff7ea.firebaseapp.com",
  projectId: "poker-chips-app-ff7ea",
  storageBucket: "poker-chips-app-ff7ea.appspot.com",
  messagingSenderId: "707682999455",
  appId: "1:707682999455:web:3c5bcff64bcdc6852e96aa",
  measurementId: "G-0XLC3G5JVS",
  databaseURL: "https://poker-chips-app-ff7ea-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export default function App() {
  const [userWallet, setUserWallet] = useState(0)

  const playerWallet = ref(
    database,
    'players'
  );
  console.log(database)
  onValue(playerWallet, (snapshot) => {
    const data = snapshot.val()
    console.log(snapshot)
    console.log(data)
    // setUserWallet(snapshot.val());
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>Fetch data</Text>
      </TouchableOpacity>
      <Text>Wallet:</Text>
      <Text>{userWallet}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
