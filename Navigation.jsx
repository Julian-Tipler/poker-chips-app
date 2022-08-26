import React from "react";
import { useAuth } from "./src/contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "./src/screens/LoginScreen";
import { HomeScreen } from "./src/screens/HomeScreen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const { currentUser } = useAuth();

  console.log("currentUser", currentUser);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!currentUser ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
