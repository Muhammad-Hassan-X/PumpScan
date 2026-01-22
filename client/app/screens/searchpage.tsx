import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import SearchInput from "@/components/SearchInput";
import Icon from "@/components/Icons";
import Colors from "@/constants/colors";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import font from "@/constants/fonts";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={28} color={Colors.heading} />
        </TouchableOpacity>
        {/* CONTENT */}
        <Text style={styles.text}>Search</Text>
      </View>
      <View style={styles.container}>
        <SearchInput onChange={setSearchText} key={""} value={searchText} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log(searchText)}
          activeOpacity={0.7}
        >
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
        <Icon name={"Search"} size={350} style={styles.icon} />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.active_color, // button color
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%", 
    marginTop: 20,
    alignSelf: "flex-start", // aligns button to the left
  },
  btnText: {
    color: Colors.heading,
    fontSize: 16,
    fontFamily: font.Bold,
    

  },
  text: {
    color: Colors.heading,
    fontSize: 28,
    fontFamily: font.Bold,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 10,

    gap: 20,
    marginBottom: 20,
  },
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.back_ground_color,
    padding: 10,
  },
  icon: {
    width: "100%",
    marginTop: 100,
    height: "100%",
  },
  pageWrapper: {
    flex: 1,
    backgroundColor: Colors.back_ground_color,
  },
});
