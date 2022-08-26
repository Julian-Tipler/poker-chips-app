import { database } from "./firebase";
import { StyleSheet } from "react-native";
import { ref, onValue } from "firebase/database";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./src/screens/LoginScreen";
import { HomeScreen } from "./src/screens/HomeScreen/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const playerRef = ref(database, "players");

  onValue(playerRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    // setUserWallet(snapshot.val());
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
