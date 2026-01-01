import { View, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";

export default function Loader() {
  const pacmanAnim = useRef(new Animated.Value(0)).current;
  const dotsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pacman mouth animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pacmanAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(pacmanAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Dots movement animation
    Animated.loop(
      Animated.timing(dotsAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const mouthAngle = pacmanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const dotsTranslate = dotsAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  return (
    <View className="flex-row items-center justify-center gap-3">
      {/* Pac-man */}
      <Animated.View
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#A64D79", // light_background_color
          borderRadius: 100,
          transform: [{ rotate: mouthAngle }],
        }}
      />

      {/* Dots */}
      <Animated.View
        style={{
          transform: [{ translateX: dotsTranslate }],
        }}
        className="flex-row gap-2"
      >
        <View className="w-3 h-3 rounded-full bg-heading" />
        <View className="w-3 h-3 rounded-full bg-heading" />
        <View className="w-3 h-3 rounded-full bg-heading" />
      </Animated.View>
    </View>
  );
}
