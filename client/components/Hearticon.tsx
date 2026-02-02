import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeartIconProps {
  initialLiked?: boolean;
  size?: number;
}

const HeartIcon: React.FC<HeartIconProps> = ({
  initialLiked = false,
  size = 24,
}) => {
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = () => {
    setLiked(prev => !prev);
  };

  return (
    <TouchableOpacity onPress={toggleLike} activeOpacity={0.7}>
      <Ionicons
        name={liked ? "heart" : "heart-outline"}
        size={size}
        color={liked ? "red" : "#fff"}
      />
    </TouchableOpacity>
  );
};

export default HeartIcon;
