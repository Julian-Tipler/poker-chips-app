import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { onValue } from "firebase/database";

export const RoomScreen = () => {
  const { currentUser, logout } = useAuth();
  const userRoomRef = ref(database, `users/${currentUser.uid}/room`);
  useEffect(() => {
    onValue(userRoomRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setRoom(data);
      }
    });
  }, []);

  return (
    <View>
      <Text>RoomScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
