import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "@/components/Screen";

import ListView from "@/components/ListView";
import Login from "../(auth)/login";

const index = () => {
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        {/* <TokenReport></TokenReport>
         */}
        <Login></Login>
      </View>
      {/* <ListView></ListView> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  // ... styles if needed
});

export default index;
