import { StyleSheet } from "react-native";
import { AuthProvider } from "./src/contexts/AuthContext";
import { Navigation } from "./Navigation";
import { RoomProvider } from "./src/contexts/RoomContext";

export default function App() {
  return (
    <AuthProvider>
      <RoomProvider>
        <Navigation />
      </RoomProvider>
    </AuthProvider>
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
