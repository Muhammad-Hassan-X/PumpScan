import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import HeartIcon from "@/components/Hearticon";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import { router } from "expo-router";

const TokenReport = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.pageWrapper}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back-sharp"
              size={28}
              color={Colors.heading}
            />
          </TouchableOpacity>

          <Text style={styles.text}>Search</Text>
        </View>

        {/* CONTENT */}
        <View style={styles.container}>
          <Text style={styles.headingTxt}>Token Report</Text>
          <HeartIcon size={24} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.back_ground_color,
  },

  pageWrapper: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },

  text: {
    color: Colors.heading,
    fontSize: 28,
    fontFamily: font.Bold,
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headingTxt: {
    color: Colors.heading,
    fontSize: 20,
    fontFamily: font.Bold,
  },
});

export default TokenReport;
