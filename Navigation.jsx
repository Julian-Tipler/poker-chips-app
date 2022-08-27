import React from "react";
import { useAuth } from "./src/contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "./src/screens/LoginScreen";
import { HomeScreen } from "./src/screens/HomeScreen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoomScreen } from "./src/screens/RoomScreen/RoomScreen";
import { RoomProvider } from "./src/contexts/RoomContext";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const { currentUserObject, currentUser, initializing } = useAuth();

  if (initializing)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!currentUserObject | !currentUser ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Room" component={RoomScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
