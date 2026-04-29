import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "@/components/Screen";

import ListView from "@/components/ListView";


const index = () => {
  return (
    <Screen>
      <View style={{ flex: 1 }}>
      <ListView></ListView>
      </View>
    </Screen>
  );
};



export default index;
