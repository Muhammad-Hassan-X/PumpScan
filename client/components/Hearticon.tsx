import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeartIconProps {
  liked?: boolean;
  fill?: boolean; // Support the prop name used in [id].tsx
  size?: number;
  onPress?: () => void;
}

const HeartIcon: React.FC<HeartIconProps> = ({
  liked,
  fill,
  size = 24,
  onPress,
}) => {
  const isLiked = liked ?? fill ?? false;

  const content = (
    <Ionicons
      name={isLiked ? "heart" : "heart-outline"}
      size={size}
      color={isLiked ? "red" : "#fff"}
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

export default HeartIcon;
