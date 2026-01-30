import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "@/components/Screen";
import Colors from "@/constants/colors";
import TokenReport from "../screens/token/tokenReport";
import ListView from "@/components/ListView";

const index = () => {
 

  return (
    <Screen>
      <View style={{ flex: 1 }}>
       {/* <TokenReport></TokenReport>
        */}
      </View>
      <ListView></ListView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  // ... styles if needed
});

export default index;
