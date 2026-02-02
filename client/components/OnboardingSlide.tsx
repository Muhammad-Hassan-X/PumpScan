import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import Icon, { IconProps } from "@/components/Icons";
import styles from "@/app/screens/onboarding/onboardingStyles";
import PaginationDots from "@/components/PaginationDots";

type OnboardingSlideProps = {
  iconName: IconProps["name"];
  title: string;
  subtitle: string;
  totalSteps: number;
  currentIndex: number;
  onNext: () => void;
  onSkip: () => void;
  showSkip?: boolean;
};

export default function OnboardingScreen({
  iconName,
  title,
  subtitle,
  totalSteps,
  currentIndex,
  onNext,
  onSkip,
  showSkip = true,
}: OnboardingSlideProps) {
  return (
    <SafeAreaView style={styles.container}>
      {/* ICON AREA */}
      <Animated.View
        entering={FadeInDown.delay(200).duration(800)}
        style={styles.iconContainer}
      >
        <Icon name={iconName} size={280} color={Colors.primary} />
      </Animated.View>

      {/* TEXT AREA */}
      <View style={styles.textContainer}>
        <Animated.Text
          entering={FadeInRight.delay(400).duration(600)}
          style={styles.title}
        >
          {title}
        </Animated.Text>
        <Animated.Text
          entering={FadeInRight.delay(600).duration(600)}
          style={styles.subtitle}
        >
          {subtitle}
        </Animated.Text>
      </View>

      <View style={styles.pagination}>
        <PaginationDots total={totalSteps} currentIndex={currentIndex} />
      </View>

      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.btnText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Ionicons
            name="arrow-forward-sharp"
            size={28}
            color={Colors.heading}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
