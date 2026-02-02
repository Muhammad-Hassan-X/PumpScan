import Colors from "@/constants/colors";
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { ICONS } from "@/constants/icons";
import { LoaderKitView } from "react-native-loader-kit";

// Keep the native splash visible until we hide it manually
SplashScreen.preventAutoHideAsync();

const CustomSplash = ({ onFinish }: { onFinish: () => void }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0

  useEffect(() => {
    // Fade-in animation for logo and text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Hide splash after 2 seconds and call onFinish
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync(); // hide native splash
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={ICONS.appLogo}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
      <LoaderKitView
        style={{ width: 50, height: 50 }}
        name={"Pacman"}
        animationSpeedMultiplier={1.0}
        color={Colors.heading}
      />
    </View>
  );
};

export default CustomSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back_ground_color,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    color: Colors.heading,
    fontSize: 22,
    fontWeight: "bold",
  },
});
