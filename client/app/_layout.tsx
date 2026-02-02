import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import CustomSplash from "@/components/CustomSplash";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useOnboardingStore } from "@/store/onboardingStore";
import { ModalProvider } from "@/context/ModalContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Medium": require("../assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu-Bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
  });

  const { isFirstLaunch, _hasHydrated } = useOnboardingStore();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const checkAuthAndState = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsLoggedIn(!!token);
      } catch (e) {
        console.error("Failed to check auth state", e);
      } finally {
        setAuthChecked(true);
      }
    };
    checkAuthAndState();
  }, []);

  if (showSplash) {
    return <CustomSplash onFinish={() => setShowSplash(false)} />;
  }

  if (!fontsLoaded || !authChecked || !_hasHydrated) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#242424",
        }}
      >
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#242424" }}>
          <StatusBar style="light" backgroundColor="#242424" />

          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen
              name="(tabs)"
              options={{
                header: () => <Header />,
                headerShown: true,
              }}
            />
          </Stack>
        </SafeAreaView>
      </ModalProvider>
    </QueryClientProvider>
  );
}
