import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Screen from "@/components/Screen";
import Colors from "@/constants/colors";
import ListView from "@/components/ListView";



const index = () => {
  const onchange = () => {};
  return (
    <Screen>
      <View>
        <ListView></ListView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  tokenText: {
    color: Colors.heading,
    fontFamily: "Ubuntu-Bold",
    marginTop: 10,
    marginBottom: 5,
  },

  counter: {
    fontSize: 48,
    marginTop: 10,
    color: Colors.heading,
    fontFamily: "Ubuntu-Bold",
  },
  wapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default index;
