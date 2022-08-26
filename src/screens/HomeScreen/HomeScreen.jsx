import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const HomeScreen = () => {
  return (
    <View>
      <TouchableOpacity onPress={writeToDatabase}>
        <Text>Write Data</Text>
      </TouchableOpacity>
      <Text>Wallet:</Text>
      <Text>{player}</Text>
    </View>
  );
}

const styles = StyleSheet.create({})