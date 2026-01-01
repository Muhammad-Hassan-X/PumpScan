import React from "react";
import { ICONS } from "@/constants/icons";
import { SvgProps } from "react-native-svg";

type IconName = keyof typeof ICONS;

interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "#000",
  ...props
}) => {
  const SvgIcon = ICONS[name];

  if (!SvgIcon) return null;

  return (
    <SvgIcon
      width={size}
      height={size}
      color={color}
      {...props}
    />
  );
};

export default Icon;
