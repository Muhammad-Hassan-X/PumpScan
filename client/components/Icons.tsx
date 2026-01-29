import React from "react";
import { ICONS } from "@/constants/icons";
import { SvgProps } from "react-native-svg";

export type IconName = keyof typeof ICONS;


export interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "#000",
  ...props
}) => {
  const SvgIcon = ICONS[name as IconName];

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
