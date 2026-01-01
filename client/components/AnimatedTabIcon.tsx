import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { View } from "react-native";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function AnimatedTabIcon({ focused, children }:any) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(focused ? -6 : 0, { duration: 200 }) },
        { scale: withTiming(focused ? 1 : 0.9, { duration: 200 }) },
      ],
      backgroundColor: withTiming(
        focused ? "#6444fe" : "transparent",
        { duration: 250 }
      ),
    };
  });

  return (
    <AnimatedView
      style={[
        {
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        },
        animatedStyle,
      ]}
    >
      {children}
    </AnimatedView>
  );
}
