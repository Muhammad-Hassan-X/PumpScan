import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOnboardingStore } from "@/store/onboardingStore";
import Colors from "@/constants/colors";
import { router } from "expo-router";
import OnboardingScreen from "@/components/OnboardingSlide";

export default function Onboarding() {
  const { completeOnboarding } = useOnboardingStore();

  const handleGetStarted = () => {
    completeOnboarding();
    // Navigation will be handled by the reactive state change in _layout or we can push
    // For smoother experience with the layout logic, simple state change might trigger re-render
    // But usually explicit navigation is good too if the layout doesn't automatically switch immediately
    // relying on layout state change is better for "auth flow" style switching
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingScreen
        iconName="Search"
        title="Welcome to PumpScan"
        subtitle="Track your favorite tokens and get detailed reports."
        totalSteps={3}
        currentIndex={0}
        onNext={() => {}}
        onSkip={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
    backgroundColor: Colors.primary || "#0a84ff", // Fallback if Colors.primary undefined
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
