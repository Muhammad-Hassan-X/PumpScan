import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import Colors from "@/constants/colors";
import font from "@/constants/fonts";

interface Inputprops {
  iconName: string | any;
  isPassword: boolean;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}
const InputField = ({
  iconName,
  isPassword,
  placeholder,
  value,
  onChangeText,
}: Inputprops) => {
  return (
    <View>
      <View style={styles.wrapper}>
        <SimpleLineIcons
          name={iconName}
          size={20}
          color={Colors.heading}
          style={{ marginRight: 5 }}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.sub_heading}
          secureTextEntry={isPassword}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    color: Colors.sub_heading,
    margin: 10,
    alignItems: "center",
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: "#333",
    borderTopColor: "#333",
    shadowColor: Colors.dark,
  },
  container: { flex: 1, padding: 20 },
  text: {
    fontFamily: font.Bold,
    color: Colors.heading,
    fontSize: 36,
  },
  input: {
    color: Colors.sub_heading,
    fontFamily: font.Regular,
    flex: 1,
  },
});

export default InputField;
