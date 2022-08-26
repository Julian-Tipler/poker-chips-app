import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

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
export const auth = getAuth()