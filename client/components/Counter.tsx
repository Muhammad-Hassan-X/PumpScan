import React, { useEffect, useRef, useState } from "react";
import { Text, Animated, StyleProp, TextStyle } from "react-native";
import { formatNumber } from "@/utils/formateNumber";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  style?: StyleProp<TextStyle>;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  style
}) => {
  const animatedValue = useRef<Animated.Value>(
    new Animated.Value(0)
  ).current;

  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    const listenerId = animatedValue.addListener(
      ({ value }: { value: number }) => {
        setDisplayValue(Math.floor(value));
      }
    );

    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: false
    }).start();

    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [value, duration]);

  return (
    <Text style={style}>
      ${formatNumber(displayValue)}
    </Text>
  );
};

export default AnimatedCounter;
