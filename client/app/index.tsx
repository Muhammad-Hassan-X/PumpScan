import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Text, View, ActivityIndicator } from "react-native";
import Loader from "@/components/Loader";
import "./global.css";

export default function App() {
  const router = useRouter();
  const { isFirstLaunch, _hasHydrated } = useOnboardingStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!_hasHydrated) return;

    const checkState = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (isFirstLaunch) {
          router.replace("/onboarding");
        } else if (token) {
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)");
        }
        setIsReady(true);
      } catch (e) {
        console.error("Redirection error:", e);
      }
    };

    checkState();
  }, [_hasHydrated, isFirstLaunch]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#242424",
      }}
    >
      <ActivityIndicator size="large" color="#6444fe" />
      <Text style={{ color: "#fff", marginTop: 10 }}>Loading...</Text>
    </View>
  );
}
