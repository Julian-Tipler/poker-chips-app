import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { onValue } from "firebase/database";
import { RoomProvider, useRoom } from "../../contexts/RoomContext";

export const RoomScreen = () => {
  return (
    <RoomProvider>
      <RoomPage />
    </RoomProvider>
  );
};

const RoomPage = () => {
  const { room } = useRoom();

  if (!room) return null;

  return (
    <View style={styles.container}>
      <Text></Text>
      <Text>Name:</Text>
      <Text>{room.name}</Text>
      <Text></Text>
      <Text>Users:</Text>
      {Object.values(room.users).map((user, i) => {
        return(<Text key={`user-${i}`}>{user.name}</Text>)
      })}
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
