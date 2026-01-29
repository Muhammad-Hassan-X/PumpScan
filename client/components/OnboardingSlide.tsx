import React, { useRef } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Icon name={iconName} size={350} style={styles.icon} />

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>
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
      </Animated.View>
    </SafeAreaView>
  );
}
