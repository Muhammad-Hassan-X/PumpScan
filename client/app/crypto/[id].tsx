import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { Circle, useFont } from "@shopify/react-native-skia";
import * as Haptics from "expo-haptics";
import { CartesianChart, Line, useChartPressState } from "victory-native";
// import font from "@/constants/fonts";
const Crypto = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const font = useFont(require(font.Bold), 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  const { token } = useLocalSearchParams();

  const parsedToken = JSON.parse(token as string);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backIcon}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back-sharp"
              size={28}
              color={Colors.heading}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.headerWrapper}>
          <Image source={{ uri: parsedToken.image }} style={styles.image} />
          <Text style={styles.text}>{parsedToken.id}</Text>
        </View>
        <View style={styles.icons}>
          {/* Notification Icon */}
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => router.push("screens/notification")}
          >
            <Ionicons name="notifications-outline" style={styles.icon} />

            {/* Badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>

          {/* Search Icon */}
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => router.push("screens/searchpage")}
          >
            <Ionicons name="search-outline" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.text}>Hi how are you </Text>
      </View>
    </View>
  );
};

export default Crypto;

const styles = StyleSheet.create({
  block: {
    backgroundColor: Colors.light_background_color,
    padding: 5,
    borderRadius: 20,
    margin: 5,
    height: 200,
    width: "98%",
  },
  backIcon: {
    // position: "absolute",
    left: 10,
  },
  icons: {
    position: "absolute",
    right: 10,
    flexDirection: "row",
    gap: 15,
  },

  image: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.back_ground_color,
    padding: 5,
  },
  backBtn: {
    color: Colors.heading,
  },
  text: {
    color: Colors.heading,
    fontSize: 28,
    fontFamily: font.Bold,
    alignSelf: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 20,
    position: "relative",
  },

  icon: {
    color: Colors.heading,
    fontSize: 25,
    fontWeight: "bold",
    textShadowColor: Colors.heading,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },

  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  iconWrapper: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "red",
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
