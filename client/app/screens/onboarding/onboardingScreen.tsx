import React, { useState } from "react";
import OnboardingSlide from "@/components/OnboardingSlide";
import {router} from 'expo-router';
import { IconName } from "@/components/Icons";
export const onboardingData = [
  {
    icon: "RiskManagement",
    title: "Reduce Your Investment Risk",
    subtitle: "PumpScan helps you spot risky tokens early to lower your risk.",
  },
  {
    icon: "Seen",
    title: "Analyze Tokens Instantly",
    subtitle: "Get deep insights and red flags before you invest.",
  },
  {
    icon: "Growth",
    title: "Trade With Confidence",
    subtitle: "Make smarter decisions using real-time data.",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLastStep = currentIndex === onboardingData.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      router.replace("/(auth)/login");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    router.replace("/(auth)/login");
  };

  const currentItem = onboardingData[currentIndex];

  return (
    <OnboardingSlide
      iconName={currentItem.icon as IconName}
      title={currentItem.title}
      subtitle={currentItem.subtitle}
      totalSteps={onboardingData.length}
      currentIndex={currentIndex}
      onNext={handleNext}
      onSkip={handleSkip}
      showSkip={!isLastStep}
    />
  );
}
