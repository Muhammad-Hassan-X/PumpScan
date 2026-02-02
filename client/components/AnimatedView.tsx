import React from "react";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  Layout,
} from "react-native-reanimated";

type Direction = "up" | "down" | "left" | "right";

interface AnimatedViewProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  style?: any;
}

const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  delay = 0,
  direction = "down",
  style,
}) => {
  const getEnteringAnimation = () => {
    switch (direction) {
      case "up":
        return FadeInUp.delay(delay).duration(600);
      case "left":
        return FadeInLeft.delay(delay).duration(600);
      case "right":
        return FadeInRight.delay(delay).duration(600);
      case "down":
      default:
        return FadeInDown.delay(delay).duration(600);
    }
  };

  return (
    <Animated.View
      entering={getEnteringAnimation()}
      layout={Layout.springify()}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedView;
