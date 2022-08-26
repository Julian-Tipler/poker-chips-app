import { database } from "./firebase";
import { StyleSheet} from "react-native";
import { ref, set, onValue } from "firebase/database";
import { uid } from "uid";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./src/Screens/LoginScreen/LoginScreen";

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
        <Stack.Screen name="Login" component={LoginScreen} />
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
