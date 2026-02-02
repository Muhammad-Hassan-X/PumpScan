import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const SocialsRow = () => {
  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };
 

  return (
    <View style={styles.container}>
      <View style={styles.iconsRow}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => openLink("https://x.com")}
        >
          <Ionicons name="close" size={14} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => openLink("https://www.reddit.com")}
        >
          <FontAwesome name="reddit-alien" size={14} color="#ff4500" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => openLink("https://github.com")}
        >
          <FontAwesome name="github" size={14} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => openLink("https://facebook.com")}
        >
          <FontAwesome name="facebook" size={14} color="#1877F2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialsRow;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  title: {
    color: "#8e8e93",
    fontSize: 14,
    fontWeight: "600",
  },
  iconsRow: {
    flexDirection: "row",
    gap: 8,
  },
  icon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#1c1c1e",
    justifyContent: "center",
    alignItems: "center",
  },
});
