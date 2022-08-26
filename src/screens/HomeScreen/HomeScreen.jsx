import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { uid } from "uid";
import { ref, set } from "firebase/database";
import { useAuth } from "../../contexts/AuthContext";

export const HomeScreen = () => {
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(database, `/${uuid}`), {
      name: "john",
    });
  };

  const { currentUser } = useAuth();
  console.log(currentUser)
  return (
    <View>
      <TouchableOpacity onPress={writeToDatabase}>
        <Text>Write Data</Text>
      </TouchableOpacity>
      <Text>{currentUser.uid}</Text>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({});
