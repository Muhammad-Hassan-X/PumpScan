import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchInput from "@/components/SearchInput";
import Icon from "@/components/Icons";
import { ICONS } from "@/constants/icons";

const SearchScreen = () => {
  function onchange(): any {  }
  return (
    <View style={styles.container}>
      <SearchInput onChange={onchange()} key={""} value="" />
      <Icon name={"Search"} size={350} style={styles.icon} />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: "100%",
    marginTop: 100, 
    height: "100%",
  },
});
