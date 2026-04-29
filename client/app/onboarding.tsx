import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOnboardingStore } from "@/store/onboardingStore";
import Colors from "@/constants/colors";
import { router } from "expo-router";
import OnboardingScreen from "@/components/OnboardingSlide";

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { completeOnboarding } = useOnboardingStore();

  const handleGetStarted = () => {
    completeOnboarding();
  };
  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
    if (currentIndex === 2) {
      completeOnboarding();
      router.replace("/(auth)/login");
    }
  };
  const slides = [
    {
      iconName: "search",
      title: "Welcome to PumpScan",
      subtitle: "Track your favorite tokens and get detailed reports.",
    },
    {
      iconName: "shield",
      title: "Detect Risk Early",
      subtitle: "Identify potential scams and pump-and-dump tokens instantly.",
    },
    {
      iconName: "bell",
      title: "Real-Time Alerts",
      subtitle: "Get notified when price moves ±10% or risk score changes.",
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
     <OnboardingScreen
        iconName={slides[currentIndex].iconName as any}
        title={slides[currentIndex].title}
        subtitle={slides[currentIndex].subtitle}
        totalSteps={slides.length}
        currentIndex={currentIndex}
        onNext={handleNext}
        onSkip={() => router.replace("/(auth)/login")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back_ground_color,
    justifyContent: "space-between",
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
  },
  footer: {
    paddingBottom: 24,
  },
  button: {
    backgroundColor: Colors.primary || "#0a84ff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
