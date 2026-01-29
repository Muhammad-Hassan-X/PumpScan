import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface HeartIconProps {
  liked: boolean;
  size?: number;
}

const HeartIcon: React.FC<HeartIconProps> = ({
  liked,
  size = 24,
}) => {
  return (
    <Ionicons
      name={liked ? "heart" : "heart-outline"}
      size={size}
      color={liked ? "red" : "#fff"}
    />
  );
};

export default HeartIcon;
