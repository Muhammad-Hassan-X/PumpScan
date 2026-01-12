import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import Header from "@/components/Header";
import { useRoute } from "@react-navigation/native";

export default function RootLayout() {
  const route = useRoute();
  const hideHeaderScreens = ["profile", "login"]; 

  const shouldShowHeader = !hideHeaderScreens.includes(route.name);

  const [fontsLoaded] = useFonts({
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Medium": require("../assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu-Bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
  });
  if (!fontsLoaded) {
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
      {/* {shouldShowHeader && <Header />} */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="index" />
        <Stack.Screen name="contact" />
        <Stack.Screen name="login" />
      </Stack>
    </SafeAreaView>
  );
}
