import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";

const BottomTabIcon = ({ name, focused, color }: any ) => {
  return (
    <View
      className={clsx(
        "rounded-full items-center justify-center w-[50px] h-[50px]",
        focused ? "bg-red-500" : "bg-back_ground_color"
      )}
    >
      <Ionicons name={name} size={26} color={color} />
    </View>
  );
};

export default BottomTabIcon;
