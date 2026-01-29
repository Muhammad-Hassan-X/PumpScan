import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import CustomSplash from "@/components/CustomSplash";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Medium": require("../assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu-Bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
  });

  const [authChecked, setAuthChecked] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showSplash, setShowSplash] = useState(true);
  React.useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
      setAuthChecked(true);
    };
    checkAuth();
  }, []);
  if (showSplash) {
    return <CustomSplash onFinish={() => setShowSplash(false)} />;
  }

  if (!fontsLoaded || !authChecked) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#242424" }}>
      <StatusBar style="light" backgroundColor="#242424" />

      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen
            name="(tabs)"
            options={{
              header: () => <Header />,
              headerShown: true,
            }}
          />
        ) : (
          <Stack.Screen name="(auth)" />
        )}
      </Stack>
    </SafeAreaView>
  );
}
