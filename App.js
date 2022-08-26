import { StyleSheet } from "react-native";
import { AuthProvider } from "./src/contexts/AuthContext";
import { Navigation } from "./Navigation";

export default function App() {

  return (
    <AuthProvider>
      <Navigation/>
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
