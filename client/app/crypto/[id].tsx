import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Colors from "@/constants/colors";

const Crypto = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>{id}</Text>
    </View>
  );
};

export default Crypto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back_ground_color,
  },
});
