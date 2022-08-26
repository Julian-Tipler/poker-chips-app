import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { onValue } from "firebase/database";

export const RoomScreen = () => {
  const [room, SetRoom] = useState(null);
  const roomsRef = ref(database, "rooms/");

  useEffect(() => {
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setRooms(Object.values(data));
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
