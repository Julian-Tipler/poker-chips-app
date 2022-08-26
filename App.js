import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl8w_0OVDkhMNkIY7ZS8gd3y-57F1m_1g",
  authDomain: "poker-chips-app-ff7ea.firebaseapp.com",
  projectId: "poker-chips-app-ff7ea",
  storageBucket: "poker-chips-app-ff7ea.appspot.com",
  messagingSenderId: "707682999455",
  appId: "1:707682999455:web:3c5bcff64bcdc6852e96aa",
  measurementId: "G-0XLC3G5JVS",
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
