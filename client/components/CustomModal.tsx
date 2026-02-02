import React from "react";
import { View, Text, Pressable } from "react-native";
import RNModal from "react-native-modal";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons"; // Using Expo Ionicons

type ModalType = "success" | "error" | "info";

type Props = {
  visible: boolean;
  message: string;
  type?: ModalType; // success = tick, error = cross
  onClose: () => void;
};

const CustomModal: React.FC<Props> = ({
  visible,
  message,
  type = "info",
  onClose,
}) => {
  // Choose Ionicon name and color
  const iconName =
    type === "success"
      ? "checkmark-circle-outline"
      : type === "error"
      ? "close-circle-outline"
      : "information-circle-outline";

  const iconColor =
    type === "success"
      ? Colors.success // green
      : type === "error"
      ? Colors.error // red
      : Colors.active_color; // info color

  return (
    <RNModal isVisible={visible} onBackdropPress={onClose}>
      <View
        style={{
          backgroundColor: Colors.back_ground_color,
          padding: 20,
          borderRadius: 14,
          alignItems: "center",
        }}
      >
        {/* Icon */}
        <Ionicons
          name={iconName}
          size={50}
          color={iconColor}
          style={{ marginBottom: 16 }}
        />

        {/* Message */}
        <Text
          style={{
            fontFamily: font.Bold,
            color: Colors.heading,
            fontSize: 16,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {message}
        </Text>

        {/* OK Button */}
        <Pressable onPress={onClose} style={{ alignSelf: "stretch" }}>
          <View
            style={{
              backgroundColor: Colors.active_color,
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: Colors.heading,
                fontFamily: font.Bold,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              OK
            </Text>
          </View>
        </Pressable>
      </View>
    </RNModal>
  );
};

export default CustomModal;
