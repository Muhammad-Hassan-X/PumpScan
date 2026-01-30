import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Container } from "postcss";
import HeartIcon from "@/components/Hearticon";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
const tokenReport = () => {
  return (
    <View  style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.headingTxt}>Token Report </Text>
        <HeartIcon liked={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapper : {
    padding: 20 , 
  
  },
  headingTxt: {
    color: Colors.heading,
    fontSize: 20,
    fontFamily: font.Bold,
  },
});

export default tokenReport;
