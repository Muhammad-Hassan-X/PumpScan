import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useOnboardingStore } from "@/store/onboardingStore";
import "./global.css";
import CustomSplash from "@/components/CustomSplash";

export default function App() {
  const router = useRouter();
  const { isFirstLaunch, _hasHydrated } = useOnboardingStore();
  const [targetRoute, setTargetRoute] = useState<string | null>(null);
  const [splashFinished, setSplashFinished] = useState(false);

  // Check state to determine where to go
  useEffect(() => {
    if (!_hasHydrated) return;

    const checkState = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (isFirstLaunch) {
          setTargetRoute("/onboarding");
        } else if (token) {
          setTargetRoute("/(tabs)");
        } else {
          setTargetRoute("/(auth)");
        }
      } catch (e) {
        console.error("Redirection error:", e);
        setTargetRoute("/(auth)");
      }
    };

    checkState();
  }, [_hasHydrated, isFirstLaunch]);

  // Handle redirection once splash is finished AND target route is known
  useEffect(() => {
    if (splashFinished && targetRoute) {
      console.log("Redirecting to:", targetRoute);
      router.replace(targetRoute as any);
    }
  }, [splashFinished, targetRoute]);

  return <CustomSplash onFinish={() => setSplashFinished(true)} />;
}
