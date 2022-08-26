import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { uid } from "uid";

export const LoginScreen = () => {
  const [player, setPlayer] = useState(0);

  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(database, `/${uuid}`), {
      name: "john",
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={writeToDatabase}>
        <Text>Fetch data</Text>
      </TouchableOpacity>
      <Text>Wallet:</Text>
      <Text>{player}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
