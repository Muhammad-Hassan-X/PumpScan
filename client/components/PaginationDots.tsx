import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import Colors from "@/constants/colors";

type Props = {
  total: number;          // total slides
  currentIndex: number;   // current active slide
};

export default function PaginationDots({ total, currentIndex }: Props) {
  const animValues = useRef<Animated.Value[]>(
    Array.from({ length: total }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    animValues.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: currentIndex === index ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => {
        const scale = animValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.5], // active dot bigger
        });
        const opacity = animValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1], // active dot more visible
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { transform: [{ scale }], opacity },
              currentIndex === index && { backgroundColor: Colors.active_color },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.sub_heading,
    marginHorizontal: 6,
  },
});
      