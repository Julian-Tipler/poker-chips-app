import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { onValue } from "firebase/database";
import { useRoom } from "../../contexts/RoomContext";

export const RoomScreen = () => {
  const { room } = useRoom();
  console.log(room)
  return (
    <View style={styles.container}>
      <Text>RoomScreen</Text>
      <Text>{room.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
